# Portfolio 

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Nav.jsx / Nav.css
│   │   ├── Hero.jsx / Hero.css
│   │   ├── Ticker.jsx / Ticker.css
│   │   ├── About.jsx / About.css
│   │   ├── Projects.jsx / Projects.css
│   │   ├── Experience.jsx / Experience.css
│   │   ├── Skills.jsx / Skills.css
│   │   ├── Footer.jsx / Footer.css
│   │   └── StatusBar.jsx / StatusBar.css
│   ├── data/
│   │   └── portfolio.json   ← Edit all your content here
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Customizing Your Portfolio

**All content lives in `src/data/portfolio.json`.**

Edit these sections:

| Key | What it controls |
|-----|-----------------|
| `meta` | Name, title, tagline, email, location |
| `social` | Nav links (GitHub, LinkedIn, etc.) |
| `ticker` | The scrolling tech ticker bar |
| `specializations` | Tags on hero section |
| `about` | About section heading + CTA buttons |
| `projects` | Project cards with tags, category, description |
| `experience` | Work history timeline |
| `skills` | Technical skills grid |
| `personalProjects` | Side projects at the bottom |

### Adding your resume

Drop your `resume.pdf` into the `public/` folder. The download button will auto-link to it.

## Design Tokens

Edit CSS variables in `src/styles/global.css`:

```css
:root {
  --bg: #0d0d0d;        /* page background */
  --text: #e8e8e8;      /* primary text */
  --text-muted: ...;    /* secondary text */
  --border: ...;        /* subtle borders */
  --mono: 'JetBrains Mono', monospace;
  --sans: 'Inter', sans-serif;
}
```
