import { Outlet } from "react-router-dom";
import SearchHeader from "./components/SearchHeader/SearchHeader";
import { DarkModeProvider } from "./context/DarkModeContext";

function App() {
    return (
        <DarkModeProvider>
            <SearchHeader />
            <Outlet />
        </DarkModeProvider>
    );
}

export default App;
