import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";

import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Users from "./pages/Users";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import Booking from "./pages/Booking";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";
import BookingView from "./pages/BookingView";
import Specialists from "./pages/Specialists";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // staleTime: 60 * 1000,
            staleTime: 0,
        },
    },
});

function App() {
    return (
        <DarkModeProvider>
            <QueryClientProvider client={queryClient}>
                {import.meta.env.MODE === "development" && (
                    <ReactQueryDevtools initialIsOpen={false} />
                )}

                <GlobalStyles />
                <BrowserRouter>
                    <Routes>
                        <Route
                            element={
                                <ProtectedRoute>
                                    <AppLayout />
                                </ProtectedRoute>
                            }>
                            <Route
                                index
                                element={<Navigate replace to='dashboard' />}
                            />
                            <Route path='dashboard' element={<Dashboard />} />
                            <Route path='bookings' element={<Bookings />} />
                            <Route
                                path='bookings/:bookingId'
                                element={<Booking />}
                            />
                            <Route
                                path='view/:bookingId'
                                element={<BookingView />}
                            />
                            <Route path='users' element={<Users />} />
                            <Route
                                path='specialists'
                                element={<Specialists />}
                            />

                            <Route path='account' element={<Account />} />
                        </Route>

                        <Route path='login' element={<Login />} />
                        <Route path='*' element={<PageNotFound />} />
                    </Routes>
                </BrowserRouter>

                <Toaster
                    position='top-center'
                    gutter={12}
                    containerStyle={{ margin: "8px" }}
                    toastOptions={{
                        success: {
                            duration: 3000,
                        },
                        error: {
                            duration: 5000,
                        },
                        style: {
                            fontSize: "16px",
                            maxWidth: "500px",
                            padding: "16px 24px",
                            backgroundColor: "var(--color-grey-0)",
                            color: "var(--color-grey-700)",
                        },
                    }}
                />
            </QueryClientProvider>

            <Analytics />
        </DarkModeProvider>
    );
}

export default App;
