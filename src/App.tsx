import { Outlet } from "react-router-dom";
import SearchHeader from "./components/SearchHeader/SearchHeader";
import { DarkModeProvider } from "./context/DarkModeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
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
