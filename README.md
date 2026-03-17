# GrowthAgent

> **AI-Powered Growth Orchestration Platform for Content Creators**

GrowthAgent is a premium SaaS platform designed to help content creators, brands, and agencies build high-converting campaigns at startup speed. It combines intelligent content ideation, real-time analytics, and autonomous agents to streamline your content creation workflow.

## 🎯 Key Features

- **AI Campaign Studio** - Generate premium content directions, hooks, and visuals with branded consistency
- **Live Growth Insights** - Track content performance with boardroom-ready analytics and smart alerts
- **Brand Safety Control** - Enforce voice, compliance, and quality with AI checks before publishing
- **Real-Time Feed** - Monitor live posts and engagement metrics across your content portfolio
- **Socket.io Integration** - Instant updates when new posts are created or metrics change
- **Beautiful Dashboard** - Premium UI with glassmorphism effects, smooth animations, and responsive design
- **Multi-User Support** - Manage multiple brand accounts and team members

## 🛠 Tech Stack

### Frontend
- **React** 18.3 - UI library
- **Vite** 5.4 - Lightning-fast build tool
- **Tailwind CSS** 3.4 - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client
- **Socket.io Client** - Real-time communication
- **React Router** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Socket.io** - WebSocket library for real-time events
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Database
- **MongoDB** - Document-oriented database for flexible data storage

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (v8 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **MongoDB** (v4.4 or higher) - Local or MongoDB Atlas account
- **Git account** - For cloning the repository

### Verify Installation

```bash
node --version
npm --version
git --version
```

## 📦 Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/byte_X_Unlox_Hackathon.git
cd byte_X_Unlox_Hackathon
```

### 2. Install Backend Dependencies

```bash
cd growthagent/server
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
cd ..
```

### 4. Setup Environment Variables

Create a `.env` file in the `growthagent/server` directory:

```bash
# Server Port
PORT=5000

# MongoDB Connection
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/growthagent?retryWrites=true&w=majority

# Node Environment
NODE_ENV=development
```

**For Local MongoDB**, use:
```
MONGO_URI=mongodb://localhost:27017/growthagent
```

Create a `.env` file in the `growthagent/client` directory (optional):

```bash
# API URL
VITE_API_BASE_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

### 5. Seed Demo Data (Optional)

To populate the database with demo users and sample data:

```bash
cd growthagent/server
node seed/seedUsers.js
```

**Demo Credentials:**
- **Handle:** `thecrumbstory` | **Password:** `demo1234`
- **Handle:** `fitmovebangalore` | **Password:** `demo1234`
- **Handle:** `techlabnest` | **Password:** `demo1234`

## 🚀 Running the Project

### Start Backend Server

```bash
cd growthagent/server
npm run dev
```

Server will run on `http://localhost:5000`

You should see:
```
Connected to MongoDB
Server running on port 5000
```

### Start Frontend Development Server

In a new terminal:

```bash
cd growthagent/client
npm run dev
```

Frontend will run on `http://localhost:5173`

Open your browser and navigate to: `http://localhost:5173`

### Build for Production

**Frontend:**
```bash
cd growthagent/client
npm run build
```

**Backend:**
No build step needed for backend (Node.js runs directly)

## 📁 Folder Structure

```
byte_X_Unlox_Hackathon/
├── growthagent/
│   ├── client/                 # React Frontend
│   │   ├── src/
│   │   │   ├── pages/         # Page components (Login, Feed, Dashboard, etc.)
│   │   │   ├── components/    # Reusable components (PostCard, NavBar, etc.)
│   │   │   ├── context/       # React Context (Auth, Agent)
│   │   │   ├── services/      # API & Socket clients
│   │   │   ├── App.jsx        # Main App component
│   │   │   ├── main.jsx       # Entry point
│   │   │   └── index.css      # Global styles
│   │   ├── package.json
│   │   ├── vite.config.js
│   │   └── tailwind.config.js
│   │
│   └── server/                 # Node.js Backend
│       ├── routes/            # API endpoints (auth, posts, analytics)
│       ├── models/            # MongoDB schemas
│       ├── middleware/        # Auth & error handlers
│       ├── socket/            # Socket.io handlers
│       ├── seed/              # Database seeding scripts
│       ├── index.js           # Server entry point
│       └── package.json
│
└── README.md
```

### Key Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main routing and auth logic |
| `src/pages/Login.jsx` | Authentication page |
| `src/pages/Feed.jsx` | Main content feed |
| `src/pages/Dashboard.jsx` | Analytics dashboard |
| `src/pages/Onboarding.jsx` | Create new posts |
| `routes/auth.js` | Authentication endpoints |
| `routes/posts.js` | Post CRUD operations |
| `routes/analytics.js` | Analytics endpoints |

## 🎨 Features in Detail

### 🔐 Authentication
- Email/handle-based login
- bcryptjs password hashing
- Session-based auth with JWT tokens

### 📝 Post Management
- Create posts with caption, type, hashtags, and image URL
- View all posts in a beautiful feed
- Real-time post updates via Socket.io
- Image preview with fallback handling

### 📊 Analytics Dashboard
- View total metrics: views, likes, comments, shares, saves
- Per-post analytics breakdown
- Visual metric cards with icons
- Engagement rate calculations

### 🎯 Real-Time Updates
- Socket.io for instant notifications
- Live feed updates when posts are created
- Connected to both frontend and backend

### 🎨 Premium UI/UX
- Glassmorphism design pattern
- Gradient backgrounds and animations
- Responsive design (mobile-first)
- Dark theme with cyan/violet accents
- Smooth transitions and hover effects
- Loading skeletons and error states

## 🔧 Troubleshooting

### Issue: `Cannot find module 'express'`
**Solution:**
```bash
cd growthagent/server
npm install
```

### Issue: MongoDB connection error
**Solution:**
- Ensure MongoDB is running locally or check your MongoDB Atlas credentials
- Verify `MONGO_URI` in `.env` is correct
- Check MongoDB connection string format

### Issue: Port 5000 or 5173 already in use
**Solution:**
```bash
# Kill process on port 5000
lsof -ti tcp:5000 | xargs kill -9

# Kill process on port 5173
lsof -ti tcp:5173 | xargs kill -9
```

### Issue: CORS errors when frontend calls backend
**Solution:**
- Verify backend is running on `http://localhost:5000`
- Check `VITE_API_BASE_URL` in frontend `.env` matches backend URL
- Ensure CORS is enabled in backend (`index.js`)

### Issue: Frontend shows blank page
**Solution:**
- Check browser console for errors (F12)
- Ensure backend server is running
- Clear browser cache: `Ctrl+Shift+Delete`
- Restart development server: `npm run dev`

### Issue: Real-time updates not working
**Solution:**
- Verify Socket.io connection in browser DevTools
- Check that both frontend and backend are running
- Ensure `VITE_SOCKET_URL` points to correct backend

## 👥 Contribution Guidelines

We welcome contributions! Here's how to contribute:

### 1. Fork the Repository
Click the "Fork" button on GitHub to create your own copy.

### 2. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 3. Make Your Changes
- Write clear, descriptive commit messages
- Follow the existing code style
- Test your changes locally

### 4. Commit Your Changes
```bash
git add .
git commit -m "Add: Brief description of changes"
```

### 5. Push to Your Fork
```bash
git push origin feature/your-feature-name
```

### 6. Create a Pull Request
- Go to the original repository
- Click "New Pull Request"
- Describe your changes clearly
- Wait for review and feedback

### Code Style Guidelines
- Use `const` by default, `let` when needed
- Follow existing naming conventions
- Add comments for complex logic
- Keep functions small and focused

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support & Contact

- **Issues:** Report bugs via GitHub Issues
- **Discussions:** Start a discussion for feature requests
- **Email:** contact@growthagent.io (if applicable)

## 🚀 Deployment

### Deploy Backend (Heroku/Railway/Render)
```bash
# Push to deployment platform
git push heroku main
```

### Deploy Frontend (Vercel/Netlify)
```bash
# Build and deploy
npm run build
# Deploy the `dist` folder
```

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Express Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Socket.io Documentation](https://socket.io/docs)

## ✨ Roadmap

- [ ] Multi-brand management
- [ ] Advanced AI-powered content generation
- [ ] Team collaboration features
- [ ] Email notifications
- [ ] Mobile app
- [ ] Integration with social media APIs

---

**Happy coding! 🎉** If you have any questions, feel free to open an issue or reach out to the team.
