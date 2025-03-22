
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Check if environment variables are available
if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  console.warn("Missing Clerk Publishable Key. Authentication will not work properly.");
}

createRoot(document.getElementById("root")!).render(<App />);
