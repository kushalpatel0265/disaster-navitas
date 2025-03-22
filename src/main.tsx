
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Check if environment variables are available
const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!clerkPublishableKey) {
  console.warn("Missing Clerk Publishable Key. Authentication will not work properly. Please add your VITE_CLERK_PUBLISHABLE_KEY to your environment variables.");
}

createRoot(document.getElementById("root")!).render(<App />);
