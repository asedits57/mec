import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TaskDashboard from "./pages/TaskDashboard";
import PracticeTest from "./pages/PracticeTest";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import HelpSupportPage from "./pages/HelpSupportPage";
import PrivacyPage from "./pages/PrivacyPage";
import AuthPage from "./pages/AuthPage";
import AuthGuard from "./components/AuthGuard";
import { supabase } from "./lib/leaderboard-supabase";

const queryClient = new QueryClient();

// Prefetch leaderboard data immediately when the app loads.
queryClient.prefetchQuery({
  queryKey: ["leaderboard"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("leaderboard_users")
      .select("*")
      .order("weekly_xp", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },
  staleTime: 5 * 60_000,
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route path="/" element={<AuthGuard><Index /></AuthGuard>} />
          <Route path="/task" element={<AuthGuard><TaskDashboard /></AuthGuard>} />
          <Route path="/task/practice/:level" element={<AuthGuard><PracticeTest /></AuthGuard>} />
          <Route path="/leaderboard" element={<AuthGuard><Leaderboard /></AuthGuard>} />
          <Route path="/profile" element={<AuthGuard><ProfilePage /></AuthGuard>} />
          <Route path="/settings" element={<AuthGuard><SettingsPage /></AuthGuard>} />
          <Route path="/help" element={<AuthGuard><HelpSupportPage /></AuthGuard>} />
          <Route path="/privacy" element={<AuthGuard><PrivacyPage /></AuthGuard>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
