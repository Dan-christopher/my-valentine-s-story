import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro";
import Quiz from "./pages/Quiz";
import Gift from "./pages/Gift";
import Letter from "./pages/Letter";
import Final from "./pages/Final";
import NotFound from "./pages/NotFound";
import PageNav from "./components/PageNav";

const queryClient = new QueryClient();

/**
 * Valentine's Day Story App
 * A romantic, story-driven experience with 5 chapters
 * Flow: Intro → Quiz → Gift → Letter → Final Song
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PageNav />
        <Routes>
          {/* Story Flow Pages */}
          <Route path="/" element={<Intro />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/gift" element={<Gift />} />
          <Route path="/letter" element={<Letter />} />
          <Route path="/final" element={<Final />} />
          
          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
