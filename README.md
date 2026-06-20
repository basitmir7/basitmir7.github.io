# Portfolio — Alex Rivera

A breathtaking personal portfolio built with React + Vite + CSS Modules.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server (opens at http://localhost:3000)
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

## ✏️ Customising Your Info

**Everything about you lives in one file:**

```
src/data/portfolio.js
```

Open it and update:
- `PERSON` — your name, role, location, email, bio
- `STATS` — your headline numbers
- `TIMELINE` — your career milestones
- `PROJECTS` — your work (title, desc, tech stack, impact)
- `SKILLS` — your skill categories
- `SOCIALS` — your social links
- `TICKER_ITEMS` — the scrolling marquee text

### Adding a real photo

Replace the initials placeholder in `src/sections/About.jsx`:

```jsx
// Change this block inside .portraitInner:
<img
  src="/your-photo.jpg"
  alt="Your Name"
  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
/>
```

Put your photo in the `public/` folder.

## 📁 Project Structure

```
portfolio/
├── public/
│   └── favicon.svg          # Edit with your initials
├── src/
│   ├── components/
│   │   ├── Cursor.jsx        # Custom cursor
│   │   ├── Nav.jsx           # Sticky navigation
│   │   ├── Nav.module.css
│   │   ├── Ticker.jsx        # Scrolling marquee
│   │   └── Ticker.module.css
│   ├── sections/
│   │   ├── Hero.jsx          # Landing section with ASCII bg
│   │   ├── Hero.module.css
│   │   ├── About.jsx         # About + timeline
│   │   ├── About.module.css
│   │   ├── Work.jsx          # Project cards
│   │   ├── Work.module.css
│   │   ├── Skills.jsx        # Skill grid
│   │   ├── Skills.module.css
│   │   ├── Contact.jsx       # Contact + footer
│   │   └── Contact.module.css
│   ├── hooks/
│   │   └── useReveal.js      # Scroll reveal hook
│   ├── data/
│   │   └── portfolio.js      # ← ALL YOUR CONTENT HERE
│   ├── styles/
│   │   └── global.css        # Design tokens + base styles
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

## 🎨 Changing Colors

Open `src/styles/global.css` and edit the `:root` variables:

```css
:root {
  --ink:    #0D0D0F;   /* Main dark color */
  --paper:  #F2EDE4;   /* Background warm white */
  --orange: #FF3D00;   /* Accent color — change this! */
}
```

## 🌐 Deploying

**Netlify (drag & drop):**
1. Run `npm run build`
2. Drag the `dist/` folder to [netlify.com/drop](https://netlify.com/drop)

**Vercel:**
```bash
npx vercel
```

**GitHub Pages:**
```bash
npm install --save-dev gh-pages
# Add to package.json scripts: "deploy": "gh-pages -d dist"
npm run build && npm run deploy
```

## Tech Stack

- **React 18** — UI
- **Vite 5** — Build tool
- **CSS Modules** — Scoped styles
- **Google Fonts** — Playfair Display + Space Grotesk + JetBrains Mono
- **Canvas API** — ASCII background animation
- **IntersectionObserver** — Scroll reveal
- Zero external animation libraries — pure CSS + JS
