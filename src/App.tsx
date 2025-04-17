
import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingScreen from "./components/LoadingScreen";

// Lazy load pages for better performance
const SplashScreen = lazy(() => import("./pages/SplashScreen"));
const Auth = lazy(() => import("./pages/Auth"));
const Home = lazy(() => import("./pages/Home"));
const Explore = lazy(() => import("./pages/Explore"));
const PlanTrip = lazy(() => import("./pages/PlanTrip"));
const Map = lazy(() => import("./pages/Map"));
const Community = lazy(() => import("./pages/Community"));
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));
const ChatBot = lazy(() => import("./pages/ChatBot"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  // Check for user's preferred color scheme and set dark mode accordingly
  useEffect(() => {
    // Check if the user prefers dark mode
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Check if there's a saved preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Apply the appropriate theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkMode)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                <Route path="/" element={<SplashScreen />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/home" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/plan" element={<PlanTrip />} />
                <Route path="/map" element={<Map />} />
                <Route path="/community" element={<Community />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/chat" element={<ChatBot />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
