import { ValidCategory, ValidExpType, ValidSkills } from "./constants";

interface PagesInfoInterface {
  title: string;
  imgArr: string[];
  description?: string;
}

interface DescriptionDetailsInterface {
  paragraphs: string[];
  bullets: string[];
}

export interface ProjectInterface {
  id: string;
  type: ValidExpType;
  companyName: string;
  category: ValidCategory[];
  shortDescription: string;
  websiteLink?: string;
  githubLink?: string;
  techStack: ValidSkills[];
  startDate: Date;
  endDate: Date;
  companyLogoImg: any;
  descriptionDetails: DescriptionDetailsInterface;
  pagesInfoArr: PagesInfoInterface[];
}

export const Projects: ProjectInterface[] = [
  {
    id: "cosearch",
    companyName: "CoSearch",
    type: "Personal",
    category: ["Web Dev","Full Stack","UI/UX"],
    shortDescription: "A customizable search engine that allows users to organize and manage their favorite search sites across different categories with a clean, modern interface.",
    websiteLink: "https://co-search-frontend.vercel.app",
    githubLink: "https://github.com/jayeshvegda/cosearch",
    techStack: ["React","Node.js","MongoDB","express.js","Mongoose","Cloudinary","JWT","Mantine","Docker"],
    startDate: new Date("2025-06-01"),
    endDate: new Date("2025-07-01"),
    companyLogoImg: "/projects/cosearch/1.png",
    pagesInfoArr: [
      {
        title: "Search Engine Interface",
        description: "Customizable search engine with drag-and-drop category organization",
        imgArr: ["/projects/cosearch/1.png"],
      }
    ],
    descriptionDetails: {
      paragraphs: ["CoSearch is a powerful, customizable search engine that I engineered to enable users to organize and manage their favorite search sites across different categories. The application features a clean, modern interface built with React and Mantine UI, providing an intuitive user experience.","The platform includes custom category management, allowing users to create and organize their own search categories. Site management functionality enables users to add, edit, and organize their favorite search sites with ease. I implemented user preferences to deliver a personalized search experience for each user.","Real-time updates are implemented using WebSocket technology, providing instant changes to search configurations across all devices. The application includes an admin dashboard for managing users and system settings, demonstrating my ability to build comprehensive administrative features.","I integrated Cloudinary for seamless image uploads, allowing users to upload custom icons for their search sites. The application features beautiful dark/light mode support, enhancing user experience. The backend is built with Node.js and Express, using MongoDB with Mongoose for data storage, and JWT for secure authentication. The entire application is containerized with Docker for easy deployment and scalability."],
      bullets: ["Built a customizable search engine with category management and site organization features","Implemented user authentication with JWT tokens and real-time updates for enhanced user experience","Integrated Cloudinary CDN for optimized image uploads with custom icon support","Developed admin dashboard for user and system management with role-based access","Created responsive UI with Mantine components and dark/light mode support","Deployed using Docker containers with automated CI/CD pipeline for reliable deployment"],
    },
  },
  {
    id: "geeksforgeeks-api",
    companyName: "GeeksForGeeks Unofficial API",
    type: "Personal",
    category: ["Backend","Web Dev"],
    shortDescription: "A powerful RESTful API service for accessing GeeksForGeeks user data including profiles, solved problems, contest history, and submission calendars.",
    websiteLink: "https://mygfg-api.vercel.app",
    githubLink: "https://github.com/jayeshvegda/geeksforgeeks-api",
    techStack: ["Python","Flask","Flask-RESTful","Flask-Limiter","BeautifulSoup4","Vercel"],
    startDate: new Date("2025-03-01"),
    endDate: new Date("2025-04-01"),
    companyLogoImg: "/projects/mygfg/2.png",
    pagesInfoArr: [
      {
        title: "API Documentation",
        description: "Comprehensive REST API for GeeksForGeeks data with rate limiting and error handling",
        imgArr: ["/projects/mygfg/2.png"],
      }
    ],
    descriptionDetails: {
      paragraphs: ["I designed and built a powerful, unofficial RESTful API service for accessing GeeksForGeeks user data. The API provides comprehensive information about coding profiles, solved problems, contest history, and submission calendars through a simple, well-documented interface.","The API features multiple endpoints including user profile data retrieval, solved problems categorized by difficulty level, detailed contest participation and ratings, and submission calendar tracking for coding activity patterns. I implemented built-in rate limiting using Flask-Limiter to protect against API abuse and ensure fair usage.","The service is optimized for performance and reliability, serving users with fast response times and high uptime. I used BeautifulSoup4 for web scraping to extract data from GeeksForGeeks, and Flask with Flask-RESTful to create a clean, RESTful API structure. The API is deployed on Vercel with comprehensive error handling and proper HTTP status codes (200, 400, 404, 429, 500).","This project demonstrates my expertise in API design, web scraping, backend development, and production deployment. The API is fully documented with clear endpoint descriptions, parameters, and example usage, making it easy for developers to integrate into their applications."],
      bullets: ["Built RESTful API to fetch user profiles, solved problems, contest history, and submission calendars","Implemented rate limiting with Flask-Limiter to protect against API abuse and ensure fair usage","Used BeautifulSoup4 for web scraping and Flask-RESTful for clean API structure","Deployed on Vercel with comprehensive error handling and proper HTTP status codes","Created detailed API documentation with endpoint descriptions and examples","Optimized for performance and reliability with fast response times and high uptime"],
    },
  },
  {
    id: "thronelang",
    companyName: "ThroneLang",
    type: "Personal",
    category: ["Web Dev","Full Stack"],
    shortDescription: "A simple toy language inspired by Game of Thrones, designed to help users learn basic concepts of programming languages, syntax, and language processing.",
    
    githubLink: "https://github.com/JayeshVegda/ThroneLang",
    techStack: ["React","Django","Python"],
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-03-01"),
    companyLogoImg: "/logo.png",
    pagesInfoArr: [
      {
        title: "Language Interpreter",
        description: "Toy programming language with Game of Thrones theme for learning language processing",
        imgArr: ["/logo.png"],
      }
    ],
    descriptionDetails: {
      paragraphs: ["ThroneLang is a simple toy language inspired by Game of Thrones that I designed to help users learn basic concepts of programming languages, syntax, and language processing. The project combines creative theming with educational programming concepts.","I built the language interpreter using Python and Django for the backend, creating a robust parsing and execution engine. The frontend is developed with React, providing an interactive interface where users can write and execute ThroneLang code.","The project demonstrates my understanding of language design principles, including lexical analysis, parsing, and interpretation. The Game of Thrones theme makes learning programming concepts more engaging and fun for beginners.","This project showcases my ability to work on creative programming projects while maintaining code quality and educational value. The implementation includes proper error handling and user-friendly feedback for debugging code."],
      bullets: ["Designed and implemented a toy programming language with Game of Thrones theme","Built language interpreter with Python and Django backend","Created interactive React frontend for writing and executing code","Implemented lexical analysis, parsing, and interpretation engine","Designed educational tool for learning programming language concepts"],
    },
  },
  {
    id: "apna-food",
    companyName: "Apna Food",
    type: "Personal",
    category: ["Web Dev","Full Stack","UI/UX"],
    shortDescription: "An academic project based on an online food ordering system with dynamic menu browsing, cart management, and order processing.",
    
    githubLink: "https://github.com/JayeshVegda/Food-Order",
    techStack: ["PHP","MySQL","HTML 5","CSS 3","Bootstrap","Javascript"],
    startDate: new Date("2022-07-01"),
    endDate: new Date("2022-11-01"),
    companyLogoImg: "/projects/apnafood/1.png",
    pagesInfoArr: [
      {
        title: "Home & Menu Browsing",
        description: "Main interface with menu browsing and food item display",
        imgArr: ["/projects/apnafood/1.png","/projects/apnafood/2.png"],
      },
      {
        title: "Cart & Checkout",
        description: "Shopping cart management and order processing interface",
        imgArr: ["/projects/apnafood/3.png","/projects/apnafood/4.png"],
      },
      {
        title: "User Dashboard",
        description: "User account management and order tracking features",
        imgArr: ["/projects/apnafood/5.png","/projects/apnafood/6.png"],
      }
    ],
    descriptionDetails: {
      paragraphs: ["Apna Food is an academic project based on an online food ordering system that I created as a comprehensive full-stack application. The platform features dynamic menu browsing, allowing users to explore available food items with detailed descriptions and pricing.","I implemented a complete cart management system where users can add, remove, and modify items before checkout. The order processing system handles order placement, confirmation, and tracking. I built the entire application using PHP for server-side logic, MySQL for database management, and HTML, CSS, and Bootstrap for the frontend.","The application features a responsive user interface using Bootstrap, ensuring a seamless experience across desktop and mobile devices. I implemented secure user authentication and session management to protect user data and orders. The system includes user registration, login, and profile management functionality.","This project demonstrates my foundational skills in web development, including database design, server-side programming, and frontend development. The application showcases practical implementation of e-commerce concepts in a food delivery context."],
      bullets: ["Built full-stack online food ordering system with PHP and MySQL","Implemented dynamic menu browsing and cart management functionality","Created responsive UI with Bootstrap for cross-device compatibility","Developed secure user authentication and session management","Designed database schema for users, orders, and menu items","Implemented order processing and tracking system"],
    },
  },
  {
    id: "SecretGuard",
    companyName: "SecretGuard",
    type: "Personal",
    category: ["Web Dev","Full Stack","Privacy","Security","UI/UX"],
    shortDescription: "A client-side privacy tool that automatically detects and masks sensitive data before sharing text with LLMs using real-time pattern detection and modern UI.",
    websiteLink: "https://secret-guard-ai.vercel.app/",
    githubLink: "https://github.com/JayeshVegda/SecretGuard",
    techStack: ["React","TypeScript","Vite","TailwindCSS"],
    startDate: new Date("2025-10-01"),
    endDate: new Date("2025-11-16"),
    companyLogoImg: " https://secret-guard-nu.vercel.app/favicon.svg",
    pagesInfoArr: [

    ],
    descriptionDetails: {
      paragraphs: ["SecretGuard is a client-side tool that detects and masks sensitive data in real time before it reaches any AI model. It handles emails, passwords, API keys, credit cards, and similar patterns entirely within the browser.","The system is structured as a monorepo with a reusable detection library and a sleek web interface. Web Workers carry out the heavy processing so the UI remains smooth even with long text.","The frontend follows a clean SaaS design using React, TailwindCSS, and Framer Motion, keeping the experience simple and fast.","The core library, secretguard-core, exposes detection and masking functions that developers can use directly in their own projects.","The entire project runs locally with no data collection or network calls, ensuring full privacy for users who work with AI tools."],
      bullets: ["Built a fully client-side system for detecting and masking sensitive data","Separated the detection logic into a reusable core library","Added support for common patterns like emails, API keys, and financial data","Used Web Workers for low-latency, real-time text processing","Designed a clean, minimal interface with React and TailwindCSS","Implemented dark/light mode and instant masking feedback","Published the core library for programmatic use","Kept the system completely offline for maximum privacy","Deployed the web app through Vercel"],
    },
  }
];

// Featured projects (exclude ThroneLang from home page as requested)
export const featuredProjects = Projects.filter(p => p.id !== "thronelang").slice(0, 3);
