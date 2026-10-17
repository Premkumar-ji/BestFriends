# BestFriend.exe 🤝

An interactive, playful friendship proposal web application built with React, Vite, and CSS animations. Features a typewriter chat dialogue, floating animated hearts, celebratory confetti, and an evasive "No" button that playfully dodges clicks.

---

## 🚀 Features

- **Typewriter Dialogue**: Progressive message revealing with natural pauses and reduced-motion support.
- **Dodging "No" Button**: The "No" button playfully moves away on hover/click and cycles through humorous persuasive lines while the "YES" button grows.
- **Celebratory Finale**: Full-screen confetti and floating celebration cards upon saying "YES".
- **Responsive & Accessible**: Optimized for mobile and desktop screens, keyboard navigation, and `prefers-reduced-motion`.

---

## 🛠️ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open `http://localhost:3000` to view the app.

### 3. Build for Production
```bash
npm run build
```
Production assets are generated in the `dist/` directory.

## 👥 Personalizing Names for Different Friends (URL Parameters)

You can send a personalized link to anyone without editing code! Simply add `from` and `to` (or `sender` and `receiver`) query parameters to the URL:

```text
https://your-site/?from=Rahul&to=Pooja
```
or
```text
https://your-site/?sender=Aman&receiver=Simran
```

- **`from` / `sender`**: Name displayed on outgoing chat bubbles (right side).
- **`to` / `receiver`**: Name displayed on response chat bubbles (left side).
- **Default Fallback**: If no parameters are provided, it smoothly defaults to `Prem` and `XYZ`.

After clicking "YES 🤝", a one-click **"Share on WhatsApp"** button appears, pre-filled with the customized names and link ready to send!

---

## 🎨 Customizing Default Messages


You can easily customize the conversation names, chat messages, dodging button lines, and celebratory text in:
`src/data/messages.js`

- `introText`: The introductory prompt.
- `chatMessages`: The dialog bubbles (`name`, `text`, `type: 'you' | 'them'`).
- `noLines`: Humorous lines shown when dodging the "No" button.
- `celebrationText`: Message shown after accepting.

---

## 🌐 Deploy to GitHub Pages

This repository is pre-configured with a GitHub Actions workflow in `.github/workflows/deploy.yml`:

1. Push this repository to GitHub on `main` or `master`.
2. In your GitHub repository, go to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. The deployment will automatically run on every push and publish your site!
