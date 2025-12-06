# Nassau County

A modern, React-based web portal for Nassau County services, government information, and community resources.

## 🚀 Features
- **Department Directory**: Contact info and links for county agencies.
- **Service Portal**: Categories for residents, businesses, and visitors.
- **Interactive Map**: Explore parks, beaches, and museums using Leaflet.
- **Live News**: Integration with Gemini AI to fetch real-time news headlines.
- **AI Assistant**: A "Nassau AI" helper for finding forms and planning trips.

## 🛠️ Installation & Local Development

1.  **Clone the repository**
    ```bash
    git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    cd YOUR_REPO_NAME
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**
    Create a `.env` file in the root directory:
    ```
    API_KEY=your_google_gemini_api_key_here
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

## 📦 Deployment to GitHub Pages

This project is configured to deploy automatically using GitHub Actions.

1.  Push your code to the `main` branch.
2.  Go to **Settings > Secrets and variables > Actions** in your repository.
3.  Add a New Repository Secret:
    *   Name: `API_KEY`
    *   Value: Your Google Gemini API Key.
4.  The Action defined in `.github/workflows/deploy.yml` will run, build the project, and deploy it to the `gh-pages` branch.
5.  Ensure **Settings > Pages** is set to serve from the `gh-pages` branch.

## 🏗️ Tech Stack
- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Leaflet Maps**
- **Google GenAI SDK**
