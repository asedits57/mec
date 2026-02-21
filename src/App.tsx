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
import { supabase } from "./lib/leaderboard-supabase";

const queryClient = new QueryClient();

// Prefetch leaderboard data immediately when the app loads.
// By the time the user clicks "Leaderboard", the data is already in cache → zero wait.
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
  staleTime: 5 * 60_000, // treat as fresh for 5 minutes
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/task" element={<TaskDashboard />} />
          <Route path="/task/practice/:level" element={<PracticeTest />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
