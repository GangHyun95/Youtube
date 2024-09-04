import { Outlet, useLocation } from "react-router-dom";
import SearchHeader from "./components/SearchHeader/SearchHeader";
import { DarkModeProvider } from "./context/DarkModeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";

const queryClient = new QueryClient();

function App() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <DarkModeProvider>
            <SearchHeader />
            <QueryClientProvider client={queryClient}>
                <Outlet />
            </QueryClientProvider>
        </DarkModeProvider>
    );
}

export default App;
