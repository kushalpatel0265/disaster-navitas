
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Check if environment variables are available
const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!clerkPublishableKey) {
  console.warn(
    "%cMissing Clerk Publishable Key", 
    "color: white; background-color: #f59e0b; padding: 4px 8px; border-radius: 4px; font-weight: bold;"
  );
  console.warn(
    "%cAuthentication will not work properly. Please add your VITE_CLERK_PUBLISHABLE_KEY to your environment variables.",
    "color: #f59e0b;"
  );
  console.info("You can get your key from: https://dashboard.clerk.com/last-active?path=api-keys");
}

createRoot(document.getElementById("root")!).render(<App />);
