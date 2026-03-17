# GrowthAgent 🥐🚀

> **The Autonomous Social Media Manager for Small & Medium Businesses**

GrowthAgent is a premium AI-powered platform designed to replace the need for high-cost social media managers for Small and Medium Businesses (SMBs). It uses autonomous agents to learn a brand's unique identity and generate contextually relevant content daily, ensuring a professional social presence without the overhead.

## 🔴 The Problem
Small and Medium Businesses (SMBs) face a tough choice:
1. **High Costs**: Hiring a professional Social Media Manager (SMM) is expensive and often out of reach for local bakeries, gyms, or startups.
2. **Time Drain**: Business owners trying to do it themselves spend hours on content instead of running their business.
3. **Inconsistency**: Without a dedicated manager, social feeds often go dark, losing customer engagement and trust.

## 🟢 The Solution
**GrowthAgent** is your autonomous content partner. It functions as an "AI Employee" that:
- **Learns Your Brand**: Deeply understands your niche, tone, and audience through historical analysis.
- **Generates Daily**: Uses a 9-step logic chain to create content that looks and feels human-made.
- **Automates Strategy**: Continuously refines its approach based on what your audience actually likes.

### 🌟 The 9-Step AI Generation Chain
When you click **"Generate with AI"**, GrowthAgent doesn't just call an LLM; it triggers a sophisticated sequence:
1. **Context Fetching**: Retrieves the last 6 posts from MongoDB.
2. **Historical Analysis**: Agents analyze what hooks and formats worked in those posts.
3. **Voice Refinement**: Your **n8n Profile Agent** updates your brand strategy in real-time.
4. **Strategy Persistence**: The refined profile is saved for future contextual use.
5. **Creative Direction**: Your **n8n Content Agent** drafts a targeted post based on the *updated* profile.
6. **Polish & Formatting**: The agent refines captions and selects high-converting hashtags.
7. **Production**: A final post object is assembled with high-quality visual placeholders.
8. **Live Sync**: The post is persisted and broadcasted via **Socket.io**.
9. **Real-time Feed**: The UI updates instantly across all connected clients.

---

## 🛠 Tech Stack

### Frontend
- **React 18** | **Vite** | **Tailwind CSS**
- **Lucide React** (Icons) | **Framer Motion** (Subtle Animations)
- **Socket.io Client** (Real-time synchronization)
- **React Router** (Client-side routing)

### Backend
- **Node.js** | **Express**
- **MongoDB** via **Mongoose**
- **Socket.io** (Production-grade WebSockets)
- **Axios** (Webhooks to n8n)
- **bcryptjs** (Password hashing)

### Automation & Agents
- **n8n** (Advanced agentic workflow orchestration)
- **Profile Agent** (Brand voice logic)
- **Content Agent** (Creative generation logic)

---

## 📋 Prerequisites

Before running this project, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **Git**
- **MongoDB Atlas** account (or local MongoDB)
- **n8n** (Active account for agent orchestration)

---

## 📦 Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/deltay-deltax/byte_X_Unlox_Hackathon.git
cd byte_X_Unlox_Hackathon
```

### 2. Install Dependencies
```bash
# Install Backend Dependencies
cd growthagent/server
npm install

# Install Frontend Dependencies
cd ../client
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the `growthagent/server` directory:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
N8N_PROFILE_WEBHOOK=https://your-n8n.cloud/webhook/build-profile
N8N_CONTENT_WEBHOOK=https://your-n8n.cloud/webhook/generate-post
```

Create a `.env` file in the `growthagent/client` directory:
```bash
VITE_API_BASE_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

### 4. Seed Demo Data (Optional)
```bash
cd growthagent/server
node seed/seedUsers.js
```
**Demo Credentials:**
- **Handle:** `thecrumbstory` | **Password:** `demo1234`
- **Handle:** `fitmovebangalore` | **Password:** `demo1234`

---

## 🚀 Running the Project

### Start Backend
```bash
cd growthagent/server
npm run dev
```

### Start Frontend
```bash
cd growthagent/client
npm run dev
```

---

## 🎨 Premium Features
- **Glassmorphism UI**: A sleek, dark-themed dashboard with blurred surfaces and vibrant gradients.
- **Real-time Process Indicator**: A high-fidelity status bar showing the AI's 9-step creative process as it happens.
- **Tester's Mission Control**: Built-in guide on the dashboard for quick verification.
- **Autonomous Analytics**: Real-time engagement tracking with per-post performance breakdowns.

## 📄 License
MIT License. Created by Aaditya for the **Unlox Hackathon**. 🥐🚀
