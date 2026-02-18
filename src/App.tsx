import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthGate } from "@/components/AuthGate";
import AuthRequired from "./pages/AuthRequired";
import Index from "./pages/Index";
import Videos from "./pages/Videos";
import Athletes from "./pages/Athletes";
import AthleteProfile from "./pages/AthleteProfile";
import AthletePartnerships from "./pages/AthletePartnerships";
import Partners from "./pages/Partners";
import Apparel from "./pages/Apparel";
import ProductDetail from "./pages/ProductDetail";
import Recruiting from "./pages/Recruiting";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import Scholarships from "./pages/Scholarships";
import MessageBoard from "./pages/MessageBoard";
import Donate from "./pages/Donate";
import FootballTraining from "./pages/FootballTraining";
import CoachProfile from "./pages/CoachProfile";
import TrenchAcademy from "./pages/TrenchAcademy";
import OurProgram from "./pages/OurProgram";
import GeorgiaMedia from "./pages/GeorgiaMedia";
import MediaDevelopment from "./pages/MediaDevelopment";
import DCHSTraining from "./pages/DCHSTraining";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthGate fallback={<AuthRequired />}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/athletes" element={<Athletes />} />
              <Route path="/athletes/:id" element={<AthleteProfile />} />
              <Route path="/athlete-partnerships" element={<AthletePartnerships />} />
              <Route path="/stories" element={<Videos />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/apparel" element={<Apparel />} />
              <Route path="/apparel/:handle" element={<ProductDetail />} />
              <Route path="/recruiting" element={<Recruiting />} />
              <Route path="/scholarships" element={<Scholarships />} />
              <Route path="/community" element={<MessageBoard />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/training" element={<FootballTraining />} />
              <Route path="/coach/:coachId" element={<CoachProfile />} />
              <Route path="/trench-iq" element={<TrenchAcademy />} />
              <Route path="/defensive-line-specialist" element={<TrenchAcademy />} />
              <Route path="/our-program" element={<OurProgram />} />
              <Route path="/georgia-media" element={<GeorgiaMedia />} />
              <Route path="/media-development" element={<MediaDevelopment />} />
              <Route path="/dchs-training" element={<DCHSTraining />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/account" element={<Account />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthGate>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
