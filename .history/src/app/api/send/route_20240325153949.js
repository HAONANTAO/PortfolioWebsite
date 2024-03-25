import { Resend } from "resend";

const resend = new Resend("re_ZAgrwbNQ_9nkxy4zTrhV8EerTEAy1ShGk");

resend.emails.send({
  from: "onboarding@resend.dev",
  to: "taoaaron5@gmail.com",
  subject: "Hello World",
  html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
});
