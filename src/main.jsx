import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import "./fonts/ChampionsIcons.ttf";
import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import App from "./App.jsx";
import Cards from "./routes/Cards.jsx";
import RandomHero from "./routes/RandomHero.jsx";
import Login from "./routes/Login.jsx";
import AuthCallback from "./routes/AuthCallback.jsx";
import MyCollection from "./routes/MyCollection.jsx";
import MyStats from "./routes/MyStats.jsx";
import NotFound from "./routes/NotFound.jsx";
import SpecificCard from "./routes/SpecificCard.jsx";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route index element={<App />} />
                        <Route path="cards" element={<Cards />} />
                        <Route path="cards/:code" element={<SpecificCard />} />
                        <Route path="random-hero" element={<RandomHero />} />
                        <Route path="login" element={<Login />} />
                        <Route path="auth/callback" element={<AuthCallback />} />
                        
                        {/* Protected Routes */}
                        <Route element={<ProtectedRoute />}>
                            <Route path="my-collection" element={<MyCollection />} />
                            <Route path="my-stats" element={<MyStats />} />
                        </Route>

                        {/* 404 Route - must be last */}
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </StrictMode>
);

