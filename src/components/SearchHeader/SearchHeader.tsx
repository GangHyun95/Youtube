import { useEffect, useState } from "react";
import styles from "./SearchHeader.module.css";
import { BsYoutube, BsSearch, BsMicFill } from "react-icons/bs";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { PiMoon, PiSun } from "react-icons/pi";
import { useDarkMode } from "../../context/DarkModeContext";
import Modal from "../Modal/Modal";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function SearchHeader() {
    const { keyword } = useParams();
    const [text, setText] = useState("");
    const { darkMode, toggleDarkMode } = useDarkMode();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [isChrome, setIsChrome] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!text.trim().length) {
            alert("검색어를 입력해주세요.");
            return;
        }
        navigate(`/videos/${text}`);
        setText("");
        if (isMobile) setIsSearchOpen(false);
    };

    const handleVoiceCommand = (command: string) => {
        setText(command);
        navigate(`/videos/${command}`);
    };

    const handleLogoClick = () => {
        if (location.pathname === "/") {
            window.location.reload();
        } else {
            navigate("/");
        }
    };

    const toggleSearch = () => {
        setIsSearchOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 576);
            if (window.innerWidth > 576) {
                setIsSearchOpen(false);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const agent = window.navigator.userAgent.toLowerCase();
        const isChrome = agent.includes("chrome") && !agent.includes("edg");
        setIsChrome(isChrome);
    }, []);

    useEffect(() => {
        setText(keyword || "");
    }, [keyword]);

    return (
        <>
            <header className={styles.header}>
                {isMobile && isSearchOpen ? (
                    <div className={styles.back} onClick={toggleSearch}>
                        <IoIosArrowRoundBack />
                    </div>
                ) : (
                    <div className={styles.logo} onClick={handleLogoClick}>
                        <BsYoutube />
                        <h1>Youtube</h1>
                    </div>
                )}
                <div
                    className={`${styles.center} ${
                        isSearchOpen ? styles.open : ""
                    }`}
                >
                    <form className={`${styles.form} ${isChrome ? styles.chrome : ''}`} onSubmit={handleSubmit}>
                        {isMobile && !isSearchOpen ? (
                            <button
                                type="button"
                                onClick={toggleSearch}
                                className={styles.button}
                            >
                                <BsSearch />
                            </button>
                        ) : (
                            <>
                                <input
                                    type="text"
                                    placeholder="검색"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    className={styles.input}
                                />
                                <button
                                    type="submit"
                                    className={styles.submit}
                                >
                                    <BsSearch />
                                </button>
                            </>
                        )}
                    </form>
                    {isChrome && (
                        <button className={styles.mic} onClick={openModal}>
                            <BsMicFill />
                        </button>
                    )}
                </div>
                <button className={styles.icon} onClick={toggleDarkMode}>
                    {!darkMode ? <PiMoon /> : <PiSun />}
                </button>
            </header>
            {isChrome && (
                <Modal
                    isOpen={modalOpen}
                    onClose={closeModal}
                    onVoiceCommand={handleVoiceCommand}
                />
            )}
        </>
    );
}
