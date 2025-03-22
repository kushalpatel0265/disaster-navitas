
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';
import Index from "./pages/Index";
import Resources from "./pages/Resources";
import Alerts from "./pages/Alerts";
import Response from "./pages/Response";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import Team from "./pages/Team";
import Maps from "./pages/Maps";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

// Your Clerk publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "temp_key_for_development";

// Create a fallback behavior when Clerk key is missing
const isClerkConfigured = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const queryClient = new QueryClient();

// Define a basic app wrapper when authentication is not configured
const AppWithoutAuth = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="max-w-md w-full p-8 rounded-lg border shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Authentication Not Configured</h1>
            <p className="mb-4">
              Please set the <code className="bg-muted px-1 py-0.5 rounded">VITE_CLERK_PUBLISHABLE_KEY</code> environment 
              variable to enable authentication features.
            </p>
            <p className="text-sm text-muted-foreground">
              You can get your key from the Clerk dashboard.
            </p>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

const App = () => {
  // Return a simple app with a message when authentication is not configured
  if (!isClerkConfigured) {
    return <AppWithoutAuth />;
  }

  // Normal app with authentication when configured properly
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      clerkJSVersion="5.56.0-snapshot.v20250312225817"
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/"
      afterSignOutUrl="/"
    >
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              
              <Route path="/" element={
                <SignedIn>
                  <Index />
                </SignedIn>
              }>
                <Route path="/" element={<Navigate to="/dashboard" />} />
              </Route>
              
              <Route path="/dashboard" element={
                <SignedIn>
                  <Index />
                </SignedIn>
              } />
              <Route path="/resources" element={
                <SignedIn>
                  <Resources />
                </SignedIn>
              } />
              <Route path="/alerts" element={
                <SignedIn>
                  <Alerts />
                </SignedIn>
              } />
              <Route path="/response" element={
                <SignedIn>
                  <Response />
                </SignedIn>
              } />
              <Route path="/analytics" element={
                <SignedIn>
                  <Analytics />
                </SignedIn>
              } />
              <Route path="/team" element={
                <SignedIn>
                  <Team />
                </SignedIn>
              } />
              <Route path="/maps" element={
                <SignedIn>
                  <Maps />
                </SignedIn>
              } />
              <Route path="/settings" element={
                <SignedIn>
                  <Settings />
                </SignedIn>
              } />
              <Route path="/profile" element={
                <SignedIn>
                  <Profile />
                </SignedIn>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default App;
