# 🌍 Full-Stack Global Weather Dashboard

A secure, high-performance, edge-hosted weather dashboard built to demonstrate full-stack deployment capabilities on **Cloudflare Pages** using automatic Git integration.

This project showcases a modern decoupled architecture: a lightning-fast static frontend that routes calls to an obfuscated serverless backend API handler. This approach keeps your sensitive third-party API keys completely hidden from the client browser.

---

## 🚀 Live Demo Architecture

*   **Frontend:** HTML5, Tailwind CSS (for modern UI components), and raw JavaScript.
*   **Backend Runtime:** Cloudflare Pages Functions (Serverless Node.js architecture running on V8 Isolates).
*   **Upstream Provider:** OpenWeatherMap Current Weather Data API.

---

## 🛠️ Local Project Structure

```text
weather-dashboard/
├── functions/
│   └── api/
│       └── weather.js      # Serverless Backend API Endpoint
├── public/
│   └── index.html          # Frontend User Interface
├── package.json            # Node.js Build Script Settings
├── LICENSE                 # Project License File
└── README.md               # Documentation
```

---

## ⚙️ How to Deploy via Cloudflare Dashboard (Git Integration)

Cloudflare Pages watches your repository and deploys every commit automatically.

### 1. Push Code to Git
Initialize your local project folder and push it to a public or private repository on **GitHub** or **GitLab**:
```bash
git init
git add .
git commit -m "feat: initial commit of fullstack application"
git branch -M main
git remote add origin <YOUR_GIT_REPOSITORY_URL>
git push -u origin main
```

### 2. Connect Your Repository
1. Log into your **Cloudflare Dashboard** and navigate to **Workers & Pages**.
2. Click **Create** -> Select the **Pages** tab -> Click **Connect to Git**.
3. Install and authorize Cloudflare for the specific repository hosting this project.

### 3. Build & Build Setting Requirements
On the configuration screen, apply the following variables precisely to ensure successful initialization:
*   **Framework Preset:** `None`
*   **Build Command:** `npm run build`
*   **Build Output Directory:** `public`

### 4. Inject Environment Variables (Crucial Step)
Your serverless function will crash if it cannot find an API key. 
1. Before clicking deploy, expand the **Environment variables (advanced)** menu.
2. Click **Add variable** and configure the key-value pair as follows:
    *   **Variable Name:** `WEATHER_API_KEY`
    *   **Value:** *(Paste your unique API key obtained from [OpenWeatherMap](https://openweathermap.org))*
3. Click **Save and Deploy**. Cloudflare will build and host your app on a free `*.pages.dev` subdomain.

---

## 🧑‍💻 Local Emulation and Testing (Optional)

If you wish to test the backend API locally on your computer with your environment variables before pushing to Git, use Cloudflare's **Wrangler CLI**:

1. Open your terminal in the project directory and install Wrangler:
   ```bash
   npm install -g wrangler
   ```
2. Run the local emulator while passing your API secret directly in the command:
   ```bash
   npx wrangler pages dev public --binding WEATHER_API_KEY="YOUR_ACTUAL_API_KEY_HERE"
   ```
3. Open `http://localhost:8788` in your browser to test your local site.

---

## 📄 License

This project is open-source and available under the terms of the **MIT License**. See the `LICENSE` file for details.
