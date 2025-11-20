<div align="center">

# **Jayesh’s Portfolio**

<img src="./public/logo.png" alt="Portfolio logo" width="140" />

Crafted for showcasing projects, experience, and story with motion-first design.


<img src="https://img.shields.io/badge/Views-250%2B-blueviolet?style=for-the-badge&logo=google-analytics&logoColor=white" alt="View count" />
<img src="https://img.shields.io/badge/License-MIT-10B981?style=for-the-badge&logo=open-source-initiative&logoColor=white" alt="License Badge" />
<img src="https://img.shields.io/github/stars/JayeshVegda/jayesh-vegda-portfolio?style=for-the-badge&logo=github" alt="GitHub stars" />

</div>

---

## Project Overview

Minimal Next Portfolio is a modern, animated portfolio template built with Next.js 14, TypeScript, and Tailwind CSS. It showcases projects, experience, and contributions with polished micro-interactions, dark/light theming, and an API-ready contact workflow.

## Key Features

- ✨ Motion-rich hero with VS Code–style layout and magnetic cursor effects
- 🌓 Instant theme switching powered by `next-themes` and Radix primitives
- 🧱 Modular sections for skills, projects, experience, contributions, and résumé
- 📬 Serverless contact form with validation, rate-limiting, and email delivery
- 📊 Dynamically rendered stats, timeline, and project detail modals
- 🛡️ Admin-ready API routes for managing content without redeploys

## Tech Stack / Tools Used

![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI-111?logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&logoColor=white)
![SendGrid](https://img.shields.io/badge/SendGrid-0085CA?logo=sendgrid&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)

## Demo

https://github.com/user-attachments/assets/e3cdad5e-5239-40a3-b482-f5b17ee58292

## Installation

```bash
git clone https://github.com/JayeshVegda/jayesh-vegda-portfolio.git
cd jayesh-vegda-portfolio
npm install
```

## Run & Usage

```bash
# Start dev server
npm run dev

# Production build
npm run build
npm run start
```

- Create a `.env.local` file for SendGrid/Nodemailer credentials and optional admin routes.
- Update content under `config/*.ts` (projects, skills, socials, site metadata).
- Drop resume or media assets into `public/` and update references as needed.



## Folder Structure

```bash
minimal-next-portfolio
├─ app/                # Next.js app router pages + API routes
├─ components/         # Reusable UI, sections, and motion primitives
├─ config/             # Content sources (projects, skills, routes, site meta)
├─ hooks/              # Custom hooks (modal store, mouse tracking, etc.)
├─ providers/          # Theme, animation, modal providers
├─ public/             # Static assets, logos, screenshots, résumé
└─ information/        # Docs for site overview and structure
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/awesome`
3. Commit changes: `git commit -m "feat: add awesome module"`
4. Push the branch and open a PR

> For content-only tweaks (projects, stats, socials), update files inside `config/` and include screenshots when relevant.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

- Portfolio: [jayeshvegda.dev](https://jayeshvegda.vercel.app)
- GitHub: [@jayeshvegda](https://github.com/jayeshvegda)
- LinkedIn: [Jayesh Vegda](https://www.linkedin.com/in/jayeshvegda/)