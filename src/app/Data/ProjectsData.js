const ProjectsData = [
  {
    id: 0,
    title: "Money Recorder",
    description: `A modern, feature-rich personal finance management app for iOS, designed to help you effortlessly track expenses, set budgets, and achieve your savings goals-all within an intuitive, visually appealing interface.
    Built independently with React Native (Expo), AppWrite, and NativeWind, Money Recorder delivers a seamless, cross-platform experience with real-time sync, interactive analytics, and robust privacy features.`,
    tag: ["All", "React", "ReactNative"],
    imgUrl: "/images/Projects/Money.png",
    gitUrl: "https://github.com/HAONANTAO/Money_Recorder",
    preview: "https://apps.apple.com/us/app/moneyrecorder/id6744058988",
    Tech: ["React", "ReactNative", "AppWrite", "TailWindCss"],
  },
  {
    id: 1,
    title: "The E-Commerce Website",
    description: `E-Commerce Rabbit is a full-stack e-commerce platform designed for seamless online shopping.
    The React-based frontend delivers a responsive, user-friendly interface for browsing products, managing carts, and processing payments via PayPal.
    The Express backend powers a robust API, with MongoDB for data storage and Cloudinary for image management.
    Built with scalability and developer experience in mind, this project is ideal for businesses and developers alike.`,
    tag: ["All", "React", "MongoDB"],
    imgUrl: "/images/Projects/ECommerce.png",
    gitUrl: "https://github.com/HAONANTAO/E-Commerce-Rabbit",
    preview: "https://www.wanyancanrui.com/",
    Tech: ["React", "NodeJs", "MongoDB", "TailWindCss", "Redux", "TailWindCss"],
  },

  {
    id: 2,
    title: "Mock Threads ",
    description: `A dynamic, interactive social media platform inspired by real-world threaded discussion apps.
    Built with Next.js 13+, MongoDB, and Clerk authentication, it features SSR/SSG, advanced API routing, nested threads, community management, and direct messaging (in development). Provides a modern, scalable, and performant user experience.`,
    tag: ["All", "NextJS", "MongoDB"],
    imgUrl: "/images/Projects/MockThreads.png",
    gitUrl: "https://github.com/HAONANTAO/threads_app",
    preview: "http://www.taohaonan.com/",
    Tech: ["React", "NodeJs", "MongoDB", "TailWindCss", "Redux"],
  },
  {
    id: 3,
    title: "Mock AI ChatBot",
    description:
      "MockAI Chat-Bot is an intelligent chatbot application powered by OpenAI's GPT-3.5 Turbo API. It provides users with a personalized chat experience, supporting user registration (signup), login, and logout. Whether you're seeking quick answers, detailed explanations, or casual conversation, MockAI Chat-Bot is designed to help.",
    tag: ["All", "React", "TypeScript"],
    imgUrl: "/images/Projects/MockAIChatBot.png",
    gitUrl: "https://github.com/HAONANTAO/Mock_AI_ChatBot",
    preview: "https://www.wanyancanrui.com/",
    Tech: [
      "React",
      "NodeJs",
      "MongoDB",
      "TailWindCss",
      "TypeScript",
      "Clerk",
      "Zod",
    ],
  },
  {
    id: 4,
    title: "Evently",
    description: `Evently is an event management platform built on Next.js, which supports users to register, create, browse, edit and delete events.
    The platform integrates Stripe payment and Clerk user verification, and supports order management, search filtering and classification functions.
    The project adopts a modular architecture, focuses on code reuse and maintainability, and is suitable for expansion and deployment.`,
    tag: ["All", "NextJS", "TypeScript"],
    imgUrl: "/images/Projects/Evently.png",
    gitUrl: "https://github.com/HAONANTAO/evently",
    preview: "https://evently-three-kohl.vercel.app/",
    Tech: [
      "React",
      "NodeJs",
      "MongoDB",
      "TailWindCss",
      "TypeScript",
      "Clerk",
      "Stripe",
      "uploadthing",
    ],
  },
  {
    id: 5,
    title: "Game Hub",
    description:
      "GameHub is a video game discovery web app that helps you find new and interesting games to play. ",
    imgUrl: "/images/Projects/GameHub.png",
    tag: ["All", "React", "TypeScript"],
    gitUrl: "https://github.com/HAONANTAO/GameHub",
    preview: "https://game-hub-iota-three.vercel.app/",
    Tech: ["React", "ChakraUI", "emotion", "framer-motion"],
  },

  {
    id: 6,
    title: "Personal Blog",
    description: `Personal Blog is a responsive personal blog website that supports user registration, login, and article publishing.
    It is built using React, Redux, and Express, with data stored in MongoDB and JWT used for user authentication.`,
    tag: ["All", "React", "MongoDB"],
    imgUrl: "/images/Projects/Blog.png",
    gitUrl: "https://github.com/HAONANTAO/BlogWeb",
    preview: "https://www.aaronblog.top/",
    Tech: ["React", "JWT", "redux", "Express", "bcrypt", "MongoDB"],
  },
  {
    id: 7,
    title: "Issue Tracker",
    description: `An issue tracker web application built with Next.js, which supports creating, editing, deleting and assigning issues, with statuses including Open, In Progress and Closed.
    Integrated with Google login (NextAuth), form management (React Hook Form), data validation (Zod) and real-time notifications (react-hot-toast).
The backend uses Prisma + MySQL as the database, and the frontend uses Tailwind CSS and Radix UI to achieve a beautiful UI.
Data visualization uses Recharts to present issue statistics charts, supporting efficient query and status tracking.`,
    imgUrl: "/images/Projects/IssueTracker.png",
    tag: ["All", "NextJS", "MySQL"],
    gitUrl: "https://github.com/HAONANTAO/IssueTracker",
    preview: "/",
    Tech: ["React", "NextJs", "Zod", "TailWindCss", "TypeScript", "MongoDB"],
  },

  // {
  //   id: 5,
  //   title: "TopRecipe",
  //   description: "Mock Top Recipe Maker",
  //   imgUrl: "/images/Projects/TopRecipe.png",
  //   tag: ["All", "React"],
  //   gitUrl: "https://github.com/HAONANTAO/TopRecipe",
  //   preview: "https://top-recipe-ht6n03agd-haonantaos-projects.vercel.app/",
  // },
  // {
  //   id: 5,
  //   title: "MERNRecipe",
  //   description: "Mock MERN Recipe Maker",
  //   imgUrl: "/images/Projects/MERN.png",
  //   tag: ["All", "Web"],
  //   gitUrl: "https://github.com/HAONANTAO/MERN_Recipe",
  //   preview: "/",
  // },
  // {
  //   id: 6,
  //   title: "SimpleWebCalculator",
  //   description: "Mock SimpleWebCalculator",
  //   imgUrl: "/images/Projects/SimpleWebCalculator.png",
  //   tag: ["All", "ThreeJS"],
  //   gitUrl: "https://github.com/HAONANTAO/SimpleWebCalculator",
  //   preview:
  //     "https://simple-web-calculator-2lbqba2nx-haonantaos-projects.vercel.app/",
  // },

  {
    id: 8,
    title: "TopSocial",
    description: "Responsive Mock Top Social Media Website",
    imgUrl: "/images/Projects/TopSocial.png",
    tag: ["All", "React"],
    gitUrl: "https://github.com/HAONANTAO/TopSocial",
    preview: "top-social-q6r851tbu-haonantaos-projects.vercel.app",
    Tech: ["HTML", "CSS", "Json-server", "JavaScript"],
  },
  // {
  //   id: 8,
  //   title: "World Clock",
  //   description:
  //     "Using the React + Vite technology stack to create a front-end dynamic page that Showing clocks from four different regions: Melbourne, China, London, and New York.",
  //   imgUrl: "/images/Projects/WorldClock.png",
  //   tag: ["All", "React"],
  //   gitUrl: "https://github.com/HAONANTAO/World-Clock",
  //   preview: "https://iridescent-gaufre-dce53f.netlify.app",
  // },
  // {
  //   id: 8,
  //   title: "Personal Static Resume",
  //   description: "Simple Personal Resume",
  //   imgUrl: "/images/Projects/PersonalWeb.png",
  //   tag: ["All"],
  //   gitUrl: "https://github.com/HAONANTAO/PersonalResume",
  //   preview: "http://aaron-resume-web.s3-website-us-east-1.amazonaws.com/",
  // },
];

export default ProjectsData;
