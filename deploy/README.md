# Vedya Anaparthi — Portfolio

A modern, responsive personal portfolio for **Vedya Anaparthi**, a Backend Software Engineer specializing in Java, Spring Boot, and healthcare platforms.

[![Live Demo](https://img.shields.io/badge/Live_Demo-vedya--portfolio-CDE7F0?style=for-the-badge)](https://vedyachoudhary.github.io/vedya-portfolio/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/vedya-anaparthi/)
[![GitHub](https://img.shields.io/badge/GitHub-vedyachoudhary-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/vedyachoudhary)

---

## Live Demo

**[https://vedyachoudhary.github.io/vedya-portfolio/](https://vedyachoudhary.github.io/vedya-portfolio/)**

---

## About

This portfolio showcases my work as a Backend Software Engineer — experience at **Trinova Technologies**, healthcare projects (**ARB MedManage**, **PreCert**), skills, education, featured projects, and a direct way to get in touch or download my resume.

Built as a **single-page application** with vanilla HTML, CSS, and JavaScript — no frameworks, fast to load, and easy to host on GitHub Pages.

---

## Features

### Design & UI
- **Frosted Berry** color palette with glassmorphism cards and navigation
- **Berry Frost Drift** — animated canvas background (falling petals & crystals)
- **Dark / Night mode** toggle with preference saved in `localStorage`
- **Bento-style layouts** for About and Projects sections
- **Custom cursor** with hover effects on interactive elements
- **Scroll progress** indicator at the top of the page
- **Animated page loader** with developer-themed boot messages

### Interactions
- **Decrypt text effect** on the hero — rotating role titles (Backend Engineer, Spring Boot Developer, etc.)
- **Magnetic buttons** and smooth scroll-to-section navigation
- **Animated stat counters** (experience, projects, certifications, GitHub repos)
- **Skills logo marquee** — scrolling tech stack icons
- **Return visitor toast** — “Welcome back” for repeat visitors
- **Playful tab title** — switches to `throw new MissingVisitorException();` when the tab is inactive

### Sections
| # | Section | Highlights |
|---|---------|------------|
| 01 | **Home** | Hero, terminal-style dossier panel, CTA buttons |
| 02 | **About** | Bio, photo, healthcare & backend focus cards |
| 03 | **Skills** | Languages, Spring Boot, cloud, testing, AI-assisted dev tools |
| 04 | **Experience** | Software Engineer @ Trinova Technologies |
| 05 | **Education** | B.E. CSE, certifications |
| 06 | **Projects** | ARB MedManage, PreCert, Iris Recognition CNN + GitHub link |
| 07 | **Contact** | Form, social links, resume download |

### Functionality
- **AI chat assistant** — answers questions about skills, experience, and projects
- **Contact form** — powered by [Web3Forms](https://web3forms.com) with FormSubmit & mailto fallbacks
- **Resume download** — PDF included in the repo
- **Fully responsive** — desktop nav, mobile hamburger menu, tested across breakpoints
- **Accessible touches** — ARIA labels, semantic HTML, keyboard-friendly nav

---

## Built With

| Category | Tools & Technologies |
|----------|---------------------|
| **Markup & Style** | HTML5, CSS3 (custom properties, flexbox, grid, animations) |
| **Scripting** | Vanilla JavaScript (ES6+) |
| **Fonts** | [Google Fonts](https://fonts.google.com/) — Syne, DM Sans, DM Mono |
| **Icons** | [Simple Icons](https://simpleicons.org), [Devicons](https://devicon.dev), [Iconify](https://iconify.design) |
| **Contact API** | [Web3Forms](https://web3forms.com) |
| **Hosting** | [GitHub Pages](https://pages.github.com/) |
| **Testing** *(dev repo)* | [Playwright](https://playwright.dev/) — responsive & cross-viewport tests |

No React, Vue, or build step required for production — just static files.

---

## Project Structure

```
├── index.html              # Main portfolio page
├── css/
│   └── styles.css          # All styles (themes, layout, animations)
├── js/
│   ├── icons.js            # Icon URLs, social links, Web3Forms key
│   ├── effects.js          # Canvas drift, toast, tilt, scroll effects
│   └── script.js           # Loader, nav, contact form, chatbot, counters
├── images/
│   └── vedya-photo.jpg     # Profile photo
├── logo-pastel.svg         # Site logo & favicon
├── vedya-resume.pdf        # Downloadable resume
└── README.md
```

---

## Getting Started

### Run locally

```bash
# Python
python3 -m http.server 8080

# Or Node (npx)
npx serve .
```

Open **http://localhost:8080** in your browser.

### Deploy to GitHub Pages

1. Create a repo named **`vedya-portfolio`** and push this folder’s contents to it
2. Go to **Settings → Pages**
3. Set **Source** to `main` branch, root `/`
4. Your site will be live at **https://vedyachoudhary.github.io/vedya-portfolio/**

---

## Contact

| | |
|---|---|
| **Email** | [vedyachowdary5533@gmail.com](mailto:vedyachowdary5533@gmail.com) |
| **LinkedIn** | [vedya-anaparthi](https://www.linkedin.com/in/vedya-anaparthi/) |
| **GitHub** | [@vedyachoudhary](https://github.com/vedyachoudhary) |
| **Location** | Hyderabad, India |

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Crafted with care by <strong>Vedya Anaparthi</strong><br>
  Backend Software Engineer · Java · Spring Boot · Healthcare Tech
</p>