import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Videos from "./pages/Videos";
import Athletes from "./pages/Athletes";
import AthleteProfile from "./pages/AthleteProfile";
import AthletePartnerships from "./pages/AthletePartnerships";
import Partners from "./pages/Partners";
import Recruiting from "./pages/Recruiting";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import Scholarships from "./pages/Scholarships";
import MessageBoard from "./pages/MessageBoard";
import Donate from "./pages/Donate";
import DonateUSAA from "./pages/DonateUSAA";
import FootballTraining from "./pages/FootballTraining";
import CoachProfile from "./pages/CoachProfile";
import TrenchAcademy from "./pages/TrenchAcademy";
import OurProgram from "./pages/OurProgram";
import GeorgiaMedia from "./pages/GeorgiaMedia";
import MediaDevelopment from "./pages/MediaDevelopment";
import DCHSTraining from "./pages/DCHSTraining";
import ArticleDetail from "./pages/ArticleDetail";
import Volunteer from "./pages/Volunteer";
import AcademyLanding from "./pages/AcademyLanding";
import AcademyDashboard from "./pages/AcademyDashboard";
import AcademyMissions from "./pages/AcademyMissions";
import AcademyMissionDetail from "./pages/AcademyMissionDetail";
import AcademyLeaderboard from "./pages/AcademyLeaderboard";
import AcademyAdmin from "./pages/AcademyAdmin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/athletes" element={<Athletes />} />
            <Route path="/athletes/:id" element={<AthleteProfile />} />
            <Route path="/athlete-partnerships" element={<AthletePartnerships />} />
            <Route path="/stories" element={<Videos />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/recruiting" element={<Recruiting />} />
            <Route path="/scholarships" element={<Scholarships />} />
            <Route path="/community" element={<MessageBoard />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/donate/usaa" element={<DonateUSAA />} />
            <Route path="/training" element={<FootballTraining />} />
            <Route path="/coach/:coachId" element={<CoachProfile />} />
            <Route path="/trench-iq" element={<TrenchAcademy />} />
            <Route path="/defensive-line-specialist" element={<TrenchAcademy />} />
            <Route path="/our-program" element={<OurProgram />} />
            <Route path="/georgia-media" element={<GeorgiaMedia />} />
            <Route path="/georgia-media/article/:slug" element={<ArticleDetail />} />
            <Route path="/media-development" element={<MediaDevelopment />} />
            <Route path="/dchs-training" element={<DCHSTraining />} />
            <Route path="/academy" element={<Volunteer />} />
            <Route path="/academy/dashboard" element={<AcademyDashboard />} />
            <Route path="/academy/missions" element={<AcademyMissions />} />
            <Route path="/academy/mission/:id" element={<AcademyMissionDetail />} />
            <Route path="/academy/leaderboard" element={<AcademyLeaderboard />} />
            <Route path="/academy/admin" element={<AcademyAdmin />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/account" element={<Account />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
