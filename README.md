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
│   │   └── portfolio.json
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

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
