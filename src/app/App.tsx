import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import RootLayout from "@/app/RootLayout";
import HomePage from "@/infrastructure/page/home/HomePage";
import RouteThreePage from "@/infrastructure/page/routeThree/RouteThreePage";
import RouteFourPage from "@/infrastructure/page/routeFour/RouteFourPage";
import RouteFivePage from "@/infrastructure/page/routeFive/RouteFivePage";
import RouteSixPage from "@/infrastructure/page/routeSix/RouteSixPage";
import LoginPage from "@/infrastructure/page/login/LoginPage";
import UserPage from "@/features/users/insfrastructure/framework/UserPage";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/user" element={<UserPage />} />
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
