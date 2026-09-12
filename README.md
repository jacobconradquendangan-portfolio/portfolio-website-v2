# Jacob Conrad Quendangan — Portfolio

Information Systems student focused on data analytics, machine learning, and UI/UX — currently exploring Agentic AI with Cline.

Live: https://your-portfolio.vercel.app  
GitHub: https://github.com/jacobconradquendangan-portfolio

## Stack
Next.js 16 (App Router) • TypeScript • Tailwind CSS 4 • Framer Motion • Lucide

## Develop
```bash
npm install
npm run dev  # http://localhost:3000
npm run build
npm run lint
```

## Structure
- `src/app` — layout, page, globals
- `src/components` — Navbar, Hero, About, Skills, Projects, Certifications, Contact, Footer
- `src/data/portfolio.ts` — single source for profile, skills, projects, certifications
- `public/profile.jpg` — headshot (1200×1200)

## Before deploy
- Replace `allowedDevOrigins` in `next.config.ts` with your deployment host or remove the dev-only entry.
- Update `links.cvBuilder` / social URLs in `src/data/portfolio.ts` if needed.

## Deploy
Push to GitHub and import to Vercel — no env vars required.
