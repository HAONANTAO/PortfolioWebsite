# Blog brief — DocuMind case study

> Paste this entire document into a fresh Claude conversation. The output is an MDX file ready to drop into `src/content/writings/documind.mdx` of my portfolio.

---

## 1. Your task

You are writing a long-form engineering case study about **DocuMind**, a production RAG SaaS I shipped. The output is a single MDX file.

**Target reader.** Senior engineers and engineering hiring managers. They already know what RAG, embeddings, Pinecone, SSE, and JWT are. **Do not** explain those terms. **Do** explain the trade-offs I made when picking between options.

**The reader should finish thinking:** "this person ships, debugs, and reasons about systems." Not "this person built a tutorial."

**Do NOT:**

- Write a tutorial. ("First we install LangChain. Then…")
- Write marketing copy. ("DocuMind revolutionizes…")
- Use emoji.
- Stack nouns. ("the comprehensive RAG pipeline architecture overview")
- Use weasel words ("might", "could", "potentially") for facts that are stated below.
- Invent numbers. If a number isn't in this brief, omit it or say "not measured."
- Pad with adjectives. "Fast." beats "blazingly fast."
- Use the words *robust*, *seamless*, *cutting-edge*, *leverage*, *utilize*, *delve*, *holistic*, *empower*, *unlock*.

**Do:**

- First person, conversational but technical.
- Short sentences. Short paragraphs (4 sentences max).
- Specific numbers from the facts below.
- Code blocks where a trade-off only makes sense with code.
- Be honest about limitations — there is a dedicated section for them.

---

## 2. Output format

A single MDX file with this frontmatter (copy verbatim, then fill in the summary):

```yaml
---
title: "Building DocuMind: a production RAG case study"
slug: "documind"
date: "2026-04-29"
summary: "<one sentence, max 160 chars, focused on a concrete trade-off or number — not 'I built a RAG app'>"
tags: ["RAG", "LangChain", "Pinecone", "Express", "React"]
category: "project"
project: "DocuMind"
cover: "/images/Projects/documind.png"
readingTime: "12 min"
---
```

- **Length:** 2,500–3,500 words of prose (excluding code blocks and frontmatter).
- **Language:** English.
- **Code language:** JavaScript (matches the codebase).
- **No emoji anywhere.**
- Code blocks use ` ```js ` fences. ASCII diagrams use ` ``` ` (no language).

---

## 3. Style

- First person.
- Average sentence length under 24 words.
- One idea per paragraph.
- Specific numbers wherever a vague word would fit. ("12 seconds" not "slow"; "5 of 7" not "most".)
- One pull-quote, max. None is fine.
- No noun stacking.
- Don't end every section with a one-liner takeaway. Vary the rhythm.

---

## 4. Article structure

Nine sections, in this order. Word counts are targets, not hard limits — total must land in 2,500–3,500.

1. **Hook** (~100 words). **Use the existing v1-was-embarrassing opening as the foundation** — see "Existing draft excerpts" in section 5. Keep the first two sentences verbatim ("The first version of DocuMind worked. It also embarrassed me."), then expand the failure narrative with one or two more concrete numbers from v1 (12-second response, hallucinated citations, re-embedding on re-upload). *Don't* name the project before that opening. Pull the reader into a problem first.
2. **What DocuMind is** (~150 words). One paragraph: who it's for, what it does, what it costs. Live demo link inline.
3. **Architecture at a glance** (~250 words including diagrams). Both ASCII pipelines (provided below). One paragraph of prose between them.
4. **The seven decisions that mattered** (~1,400 words — the spine). For each of the 7 decisions in section 5: two short paragraphs. *What I picked and why* / *What happens if you pick the other thing.* Use a third- or fourth-level heading per decision so the reader can scan.
5. **Security on a side-project budget** (~300 words). The 5 practices listed below.
6. **The honest list of things still wrong** (~250 words). Don't hide these.
7. **What I'd do differently next time** (~200 words). 3–4 bullets. Concrete. **The four bullets from the existing draft are the spine** (eval set on day one / smallest model / citations are the product / stream from first byte) — see "Existing draft excerpts" in section 5. Keep them; tighten or expand each by one sentence if it adds something specific. Do not invent new bullets that aren't grounded in the project.
8. **Roadmap** (~150 words). Ordered list, 1-line each.
9. **CTA** (~50 words). Repo link, demo link, "happy to talk about any of this".

---

## 5. Project context (FACTS — use these, do not invent)

### One-liner + links

DocuMind is a document Q&A SaaS: upload a PDF, ask questions in natural language, get streamed answers with the source chunks they came from.

- **Live:** https://docu-mind-neon.vercel.app
- **Repo:** https://github.com/HAONANTAO/DocuMind

### Tech stack

| Layer | Stack |
|---|---|
| Frontend | React 19.2 (Create React App, **not** Next.js), react-router-dom 6.30, Tailwind 3.4, axios, marked + DOMPurify (custom Markdown render) |
| Backend | Node + Express 5, Mongoose 8, Helmet 8, express-rate-limit 8, zod 3.25 |
| RAG layer | LangChain 0.3 + @langchain/openai 0.6 + @langchain/pinecone 0.2; Pinecone SDK 5.1 used directly when LangChain's wrapper is too thin |
| LLM | OpenAI `gpt-4o-mini`, `temperature: 0`, `streaming: true` |
| Embeddings | OpenAI `text-embedding-3-small` (1,536 dims) |
| Vector DB | Pinecone, index name `documind`, cosine, 1,536 dims |
| App DB | MongoDB Atlas |
| Hosting | Vercel (frontend), Render (backend) |
| Auth | bcryptjs (cost 10) + jsonwebtoken (HS256, 7-day expiry, JWT in localStorage) |

### Two pipelines (include both diagrams verbatim)

**Indexing — happens in the background after upload:**

```
PDF (multer)  ->  pdf-parse  ->  RecursiveCharacterTextSplitter
                                   |  (1,000 chars, 200 overlap)
                                   v
                                chunks  ->  text-embedding-3-small
                                              |  (1,536-dim vectors)
                                              v
                                       Pinecone  (namespace: user_<userId>,
                                                 metadata: { documentId })
                                              |
                                              v
                                MongoDB: Document.status = 'ready', chunkCount = N
```

**Query — happens on every user question:**

```
question  ->  Pinecone.similaritySearch(top-k = 5,
                                        namespace: user_<userId>,
                                        filter: { documentId })
                  |
                  v
              top 5 chunks
                  |
                  v
       prompt = system  +  last 6 messages  +  context (5 chunks)  +  question
                  |
                  v
              gpt-4o-mini (streaming)
                  |
                  v
              SSE: data: { token }   x N
                  |
                  v
              SSE: data: { done: true, sources: [...] }
                  |
                  v
              Mongo: Conversation.messages.push({user}, {assistant})
```

### The seven technical decisions

For each decision, the article should expand into **two paragraphs**: (1) what I picked and why; (2) what happens if you pick the other option. Use the answers below as the source of truth — do not invent additional rationale.

#### Decision 1. Chunk size: 1,000 characters / 200 character overlap

- **What:** `RecursiveCharacterTextSplitter`, `chunkSize: 1000`, `chunkOverlap: 200`. Top-k retrieval is 5.
- **Why:** `text-embedding-3-small` accepts ~8K tokens, but quality degrades on big chunks because the embedding "averages out" specific facts. At 1,000 chars (~250 tokens) one chunk usually fits one paragraph idea. The 200-char overlap means a sentence cut by the splitter is whole in at least one of the two neighbouring chunks.
- **If you pick smaller** (e.g. 256 chars): retrieval gets noisier — you fetch 5 fragments, the model has to reconstruct context, latency goes up, citations become useless because each cited passage is too short to read.
- **If you pick larger** (e.g. 4,000 chars): top-5 × 4,000 = 20K chars in the prompt. You either pay much more, or hit context limits, or both.

#### Decision 2. Multi-tenancy: Pinecone namespace + metadata filter (defense in depth)

- **What:** every user's vectors live in `namespace: user_<userId>`. Every chunk also carries `metadata: { documentId }`. Retrieval filters on both.
- **Why:** the namespace is the hard wall — a wrong query in code can never cross tenants. The `documentId` filter narrows a search to one document at a time. Two layers because security mistakes happen at the application boundary, not the infrastructure boundary; the namespace is the airbag for when application code is wrong.
- **If you only use the namespace:** one user querying document A may retrieve from document B. Quietly broken UX, embarrassing in a demo screenshot.
- **If you only use metadata:** a single forgotten filter clause leaks one user's data into another user's response. Catastrophic and silent.

#### Decision 3. SSE over WebSocket for streaming

- **What:** Server-Sent Events. The frontend uses native `fetch()` with `body.getReader()` (not the built-in `EventSource`, because `EventSource` doesn't support custom `Authorization` headers and the API is JWT-protected).
- **Why:** chat is one-way — server to client. WebSocket gives you bidirectional and charges you reconnection logic, heartbeats, framing, and auth-on-connect. SSE is just chunked HTTP: every proxy, CDN, and load balancer already handles it; auth flows through the existing `Authorization` header; reconnection is a second `fetch`.
- **If you pick WebSocket:** you write reconnection. You write heartbeat. You handle proxies that strip `Upgrade`. You debug "why does the connection drop in production every 60 seconds" for a week. None of that buys you a feature.

#### Decision 4. Async indexing: return 201 immediately, embed in the background

- **What:** `POST /documents` writes the upload to disk, creates a Mongo `Document` with `status: 'uploading'`, returns 201, and then an `IIFE` on the same Node process runs the embed pipeline and updates the doc to `'processing'` then `'ready'` (or `'error'`).
- **Why:** a 50-page PDF takes ~30 seconds to embed. If the HTTP request blocks, the spinner gives the user no progress, browsers timeout, and a frustrated refresh re-uploads the same file. Returning fast turns "is this hung?" into "I can see it's processing."
- **If you pick synchronous:** dropped requests, accidental duplicates, bad UX, and your users hate you in 30 seconds.
- **The catch:** an IIFE is not a job queue. If the API process crashes mid-embed, the doc is stuck at `'processing'` forever. The current mitigation is a boot-time janitor (decision #7's neighbour, code below). A real fix is BullMQ + Redis; on the roadmap.

#### Decision 5. Model choice: gpt-4o-mini, not gpt-4

- **What:** `gpt-4o-mini` for the streamed completion. `temperature: 0`. Embeddings on `text-embedding-3-small`.
- **Why:** I started on gpt-4. On retrieval-grounded document Q&A, the model's job is reading comprehension over passages I just handed it — not reasoning from scratch. gpt-4o-mini hits the same answer quality at roughly **10× lower cost and ~2× the speed** on this task. Big-model "reasoning" is wasted when the answer is already in the retrieved text.
- **If you pick gpt-4 (or gpt-4o):** you pay 10× for outcomes you can't measure in your eval set. The answers are no better; they're just slower and more expensive.

#### Decision 6. Conversation memory: last 6 messages (3 turns)

- **What:** `conversation.messages.slice(-6)` becomes the chat history fed in front of the new question.
- **Why:** real follow-ups reference 1–2 turns back ("what about clause 4.2?" → "is that different from the original draft?"). 6 messages = 3 user-assistant pairs, which covers natural follow-up depth without dragging stale context in.
- **If you pick longer (last 20):** prompt cost goes up linearly, latency goes up, and quality often goes *down* — the model anchors on early context that no longer matters and drifts off the current question.
- **If you pick shorter (last 2):** the user has to repeat themselves every turn. They will not. They will leave.

#### Decision 7. Composite unique index on `Conversation`: `{ userId, documentId }`

- **What:** Mongoose `Conversation.index({ userId: 1, documentId: 1 }, { unique: true })`.
- **Why:** a chat session is per-(user, document). The first-message handler does `findOne()` then `create()` if missing. Without the unique index, two requests racing on the very first message both pass `findOne()` (sees nothing), both `create()`, and the user ends up with two Conversation rows splitting their history.
- **If you don't have it:** the second message of a fast first turn lands in a different conversation document than the first. Memory is silently broken. You'll only notice when a user tells you the bot "forgot what we just talked about."

### Security practices (5 things)

The article should cover these in the security section — one short paragraph each.

1. **Boot-time CORS validation.** In production, the server `throw`s at startup if `ALLOWED_ORIGIN` is not set. Reason: a missing CORS env in production usually means default-allow-everything. Refusing to boot is safer than booting in an insecure default.

2. **Two-tier rate limit, keyed appropriately.**
   - Auth (login + register): 10 requests / 15 minutes, **IP-keyed** (the attacker is the IP).
   - Chat (`POST /api/chat`): 30 requests / minute, **userId-keyed** (the attacker — or the runaway script — already has a token; multiple users behind one NAT shouldn't share a budget).

3. **Anti-enumeration on login.** Same error string ("Invalid email or password") for unknown email and wrong password. Without this, a probe can confirm which emails are registered.

4. **zod validation on every state-changing route.** A small `validate(schema)` middleware runs `safeParse` on `req.body`, returns 400 with the first error message, and replaces `req.body` with the parsed (normalized) data on success. Bad password rules, oversized questions, malformed `documentId`s all 400 before they touch business logic.

5. **Tenant isolation defense-in-depth.** Pinecone namespace AND metadata filter (decision #2). The namespace is the hard wall; the metadata filter is the precision tool. If the application code is wrong, the namespace still saves you.

### Honest limitations (be explicit; do not soften)

- **JWT in localStorage.** XSS-readable. Mitigated by Helmet's CSP and DOMPurify-sanitized Markdown rendering, but a real fix is httpOnly cookie + CSRF token. On the roadmap.
- **No automated tests.** Manual testing only. The README admits this. Adding an integration suite is the next priority.
- **Async indexing is an IIFE on the API process, not a real job queue.** If the server crashes mid-embed, the doc is stuck at `'processing'`. Mitigation: a boot-time `Document.updateMany({status: ['uploading','processing']}, {status: 'error'})` (code below). Real fix: BullMQ + Redis.
- **Free plan limits hardcoded in three places.** `2 docs / 10 questions per 7 days` is duplicated across `routes/documents.js`, `routes/chat.js`, and `routes/auth.js`. A constants file or env vars would be cleaner; small refactor debt.

### Free plan quotas (verbatim)

- 2 documents max per user
- 10 questions per rolling 7 days
- Pro plan: unlimited (Stripe billing on the roadmap; not yet wired)

### Roadmap (verbatim, in priority order, from the README)

1. **PDF viewer with highlighted citations** — clicking a source jumps to the page and highlights the matched passage.
2. **Stripe billing for Pro** — upgrade flow, webhooks, subscription state.
3. **Agent mode** — let the LLM decide when to retrieve vs. answer directly.
4. **Team workspaces** — shared library, owner/editor/viewer roles.
5. **More file types** — DOCX, TXT, Markdown, web URLs.
6. **Mobile client** — React Native.

### Existing draft excerpts — PRESERVE VOICE AND KEY LINES

There is an earlier short draft of this article live on the portfolio. It's a 600-word reflective piece. I'm replacing it with the long-form case study you're writing, but two pieces of it are too good to lose. They are below. Use them as anchors.

#### Excerpt A — the opening hook (use first two sentences verbatim)

> The first version of DocuMind worked. It also embarrassed me.
>
> A user could upload a PDF, ask a question, and get an answer back. On paper that's a RAG app. In practice it hallucinated half its citations, took twelve seconds to respond, and re-embedded the same document if you re-uploaded it. The code path for "answer a question" touched eight files and three services. I had built the demo, not the product.

The first two sentences are the hook. Keep them word-for-word in your section 1. The rest of this paragraph is good supporting detail; you can keep it, tighten it, or rewrite the supporting numbers — but the "12 seconds / hallucinated citations / re-embedded on re-upload / eight files, three services / demo not product" beats are what set up the rest of the article.

#### Excerpt B — the four "What I'd do differently" bullets

These are already strong. Keep all four as the spine of section 7. You can tighten the prose and add at most one sentence of context per bullet — but do not drop any, and do not add new ones that aren't grounded in the project facts above.

> - **Build the eval set on day one.** Twenty Q&A pairs with known-good answers. Run them every time you change chunking, k, or the prompt. I built this in week six. Should've been week zero.
> - **Pick the smallest model that works.** I started on GPT-4. GPT-4o-mini hits the same quality on this task at ~10× lower cost. The "use the big model" instinct is wrong if you haven't measured.
> - **Citations are the product.** Users don't trust AI answers — they trust AI answers *with sources they can click*. I treated citations as a UI feature; they're actually the trust mechanism the whole thing rides on.
> - **Stream from the first byte.** Even if the backend isn't ready, fake the streaming. Perceived latency is the difference between "this is slow" and "this is alive."

#### Optional excerpt C — the LangChain rant (incorporate if it fits naturally)

The earlier draft has a paragraph about ripping out ~60% of LangChain in favor of direct OpenAI + Pinecone SDK calls. The current backend still uses `@langchain/openai` and `@langchain/pinecone` (see decision #1's `PineconeStore.fromExistingIndex`), but uses the native Pinecone SDK directly for delete-by-filter (snippet F) — exactly the kind of "where LangChain abstracts the wrong thing" example the rant gestures at. **If you can fit a one-paragraph version of this point inside decision #1 or decision #2 without disrupting the flow, do it.** If it doesn't fit cleanly, drop it. Don't add a separate section for it.

Reference text from the earlier draft (do not reproduce verbatim; rephrase to fit the case-study tone):

> LangChain is great until it isn't. The chains compose beautifully when you're following a tutorial. The moment you need to debug why a specific retrieval returned a specific chunk, you're three abstraction layers deep in callbacks and the stack trace is a wall of `RunnableSequence`. […] for prototyping it's unmatched. But for something you're going to operate, the abstractions hide the wrong things.

### Data model

- **`User`**: `{ email (unique), passwordHash, plan: 'free' | 'pro' (default 'free') }`. Single index on email.
- **`Document`**: `{ userId, fileName, fileSize, status: 'uploading'|'processing'|'ready'|'error', chunkCount, errorMessage, createdAt }`. Compound index `{ userId: 1, createdAt: -1 }` (non-unique) for fast dashboard listing.
- **`Conversation`**: `{ userId, documentId, messages: [{ role, content, sources, createdAt }] }`. **Compound unique index `{ userId: 1, documentId: 1 }`** — see decision #7.

---

## 6. Code snippets (real code — pick the ones that fit your prose)

The article should include **at least 3** of the following. They are real excerpts; reproduce them verbatim or trim them, but do not fabricate alternatives.

### A. Pinecone retriever — `backend/src/config/retriever.js`

```js
const retrieveChunks = async (question, documentId, userId) => {
  const pineconeIndex = getPineconeIndex();
  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    namespace: `user_${userId}`,
    filter: { documentId: documentId.toString() },
  });
  return vectorStore.similaritySearch(question, 5);
};

const ragQuery = async (question, documentId, userId, chatHistory = [], onToken) => {
  const relevantChunks = await retrieveChunks(question, documentId, userId);
  const context = relevantChunks
    .map((chunk, i) => `[Chunk ${i + 1}]\n${chunk.pageContent}`)
    .join("\n\n");

  const messages = [
    new SystemMessage(`You are a professional document Q&A assistant.
Answer questions ONLY based on the provided document content.
If the answer cannot be found in the document, respond with:
"I couldn't find specific information about that..."
Keep your answers concise and accurate.`),
    ...chatHistory,
    new HumanMessage(
      `Please answer based on the document content below:
[Document Content]\n${context}\n[Question]\n${question}`
    ),
  ];

  const stream = await llm.stream(messages);
  let fullResponse = "";
  for await (const chunk of stream) {
    const token = chunk.content;
    if (token) {
      fullResponse += token;
      if (onToken) onToken(token);
    }
  }
  return {
    answer: fullResponse,
    sources: relevantChunks.map((c) => ({ content: c.pageContent, metadata: c.metadata })),
  };
};
```

### B. SSE backend — `backend/src/routes/chat.js`

```js
router.post("/", auth, chatLimiter, validate(chatSchema), async (req, res) => {
  const { documentId, question } = req.body;
  // ...quota check (10 questions / 7 days), document ownership + status === 'ready'

  let conversation = await Conversation.findOne({ userId: req.userId, documentId });
  if (!conversation) {
    conversation = await Conversation.create({ userId: req.userId, documentId, messages: [] });
  }

  const chatHistory = conversation.messages
    .slice(-6)
    .map((m) => (m.role === "user" ? new HumanMessage(m.content) : new AIMessage(m.content)));

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  let fullAnswer = "";
  const result = await ragQuery(question, documentId, req.userId, chatHistory, (token) => {
    res.write(`data: ${JSON.stringify({ token })}\n\n`);
    fullAnswer += token;
  });
  res.write(`data: ${JSON.stringify({ done: true, sources: result.sources })}\n\n`);
  res.end();

  conversation.messages.push(
    { role: "user", content: question },
    { role: "assistant", content: fullAnswer, sources: result.sources }
  );
  await conversation.save();
});
```

### C. SSE frontend (uses `fetch`, not `EventSource`) — `frontend/src/pages/Chat.jsx`

```jsx
// EventSource doesn't allow custom Authorization headers, so we use fetch + getReader.
const response = await fetch(`${process.env.REACT_APP_API_URL}/chat`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  body: JSON.stringify({ documentId, question: userMessage.content }),
});

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  const lines = decoder.decode(value).split("\n").filter((l) => l.startsWith("data: "));
  for (const line of lines) {
    const data = JSON.parse(line.replace("data: ", ""));
    if (data.token) {
      setMessages((prev) => /* append token to last assistant message */);
    }
    if (data.done && data.sources) {
      /* attach sources to the just-finished message */
    }
    if (data.error) {
      /* replace placeholder with error UI */
    }
  }
}
```

### D. Async indexing job — `backend/src/routes/documents.js` (POST /upload)

```js
// Return immediately; embed in the background. The IIFE shares the API process —
// not a real job queue, but enough for current scale. See the boot-time janitor below.
res.status(201).json({ message: "File uploaded, processing started", document });

(async () => {
  try {
    await Document.findByIdAndUpdate(document._id, { status: "processing" });
    const chunkCount = await processDocument(req.file.buffer, document._id, req.userId);
    await Document.findByIdAndUpdate(document._id, { status: "ready", chunkCount });
  } catch (err) {
    await Document.findByIdAndUpdate(document._id, {
      status: "error",
      errorMessage: err.message,
    });
  }
})();
```

### E. Boot-time stuck-document janitor — `backend/src/index.js`

```js
// If the server crashed mid-embed, docs are stuck at 'uploading' or 'processing'.
// On boot, mark them as error so the UI shows a clear state and the user can re-upload.
const { modifiedCount } = await Document.updateMany(
  { status: { $in: ["uploading", "processing"] } },
  { status: "error", errorMessage: "Server restarted during processing — please re-upload." }
);
if (modifiedCount > 0) {
  console.log(`Marked ${modifiedCount} stuck document(s) as error`);
}
```

### F. Pinecone delete by metadata filter — `backend/src/routes/documents.js` (DELETE /:id)

```js
// LangChain's PineconeStore.delete() only supports {ids} or {deleteAll}, not {filter}.
// Drop into the native SDK to delete by metadata.
await pineconeIndex
  .namespace(`user_${req.userId}`)
  .deleteMany({ documentId: document._id.toString() });
// wrapped in try/catch — non-critical: the Mongo doc is already gone
```

### G. zod validation middleware — `backend/src/lib/validators.js`

```js
const passwordSchema = z
  .string()
  .min(8)
  .max(128)
  .regex(/[A-Za-z]/, "Password must contain at least one letter")
  .regex(/[0-9]/, "Password must contain at least one digit");

const chatSchema = z.object({
  documentId: z.string().min(1),
  question: z.string().min(1).max(2000),
});

function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.errors[0].message });
    }
    req.body = result.data; // replaces with normalized parsed data
    next();
  };
}
```

---

## 7. Self-check before declaring done

Run through this list against your draft. Fail any item → fix and re-check.

- [ ] Word count between **2,500 and 3,500** (excluding code blocks and frontmatter).
- [ ] Frontmatter is exactly the template above; `summary` is filled in with one specific sentence under 160 characters.
- [ ] **Hook (section 1) opens with the verbatim two-sentence "v1 was embarrassing" line from Excerpt A.**
- [ ] **Section 7 keeps all four bullets from Excerpt B** (eval set / smallest model / citations / stream from first byte). No new bullets that aren't grounded in the brief.
- [ ] Both ASCII pipeline diagrams are included verbatim.
- [ ] All 7 technical decisions appear, each with two paragraphs (the choice + the alternative's failure mode).
- [ ] At least **3 of the 7 code snippets** are included, with file path comments.
- [ ] The honest-limitations section names all 4 limitations from the brief.
- [ ] No emoji.
- [ ] None of these words appear: *robust*, *seamless*, *cutting-edge*, *leverage*, *utilize*, *delve*, *holistic*, *empower*, *unlock*, *blazingly*.
- [ ] At least **8 specific numbers** in the prose (e.g. "1,000 chars", "200 overlap", "top-5", "10 q / 7 days", "6 messages", "1,536 dims", "10× lower cost", "30-second embed").
- [ ] CTA links work: `https://docu-mind-neon.vercel.app` and `https://github.com/HAONANTAO/DocuMind`.
- [ ] Sentence length: average under 24 words. (Spot check 5 random paragraphs.)
- [ ] No section ends with a one-liner takeaway. Vary the closes.

When all boxes are checked, output the MDX file and only the MDX file — no commentary, no preamble, no trailing notes.
