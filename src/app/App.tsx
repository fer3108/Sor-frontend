import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import RootLayout from "@/RootLayout";
import HomePage from "@/page/home/HomePage";
import RouteTwoPage from "@/page/routeTwo/RouteTwoPage";
import RouteThreePage from "@/page/routeThree/RouteThreePage";
import RouteFourPage from "@/page/routeFour/RouteFourPage";
import RouteFivePage from "@/page/routeFive/RouteFivePage";
import RouteSixPage from "@/page/routeSix/RouteSixPage";
import LoginPage from "@/page/login/LoginPage";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/routeTwo" element={<RouteTwoPage />} />
            <Route path="/routeThree" element={<RouteThreePage />} />
            <Route path="/routeFour" element={<RouteFourPage />} />
            <Route path="/routeFive" element={<RouteFivePage />} />
            <Route path="/routeSix" element={<RouteSixPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
