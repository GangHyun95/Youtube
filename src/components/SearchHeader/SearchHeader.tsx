import { useEffect, useState } from "react";
import styles from "./SearchHeader.module.css";
import { BsYoutube, BsSearch } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { PiMoon, PiSun } from "react-icons/pi";
import { useDarkMode } from "../../context/DarkModeContext";

export default function SearchHeader() {
    const { keyword } = useParams();
    const [text, setText] = useState("");
    const { darkMode, toggleDarkMode } = useDarkMode();
    const navigate = useNavigate();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!text.trim().length) {
            alert("검색어를 입력해주세요.");
            return;
        }
        navigate(`/videos/${text}`);
        setText("");
    };

    useEffect(() => {
        setText(keyword || "");
    }, [keyword]);
    return (
        <header className={styles.header}>
            <div className={styles.logo} onClick={() => navigate("/")}>
                <BsYoutube />
                <h1>Youtube</h1>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="검색"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button>
                    <BsSearch />
                </button>
            </form>
            <button className={styles.icon} onClick={toggleDarkMode}>
                {!darkMode ? <PiMoon /> : <PiSun />}
            </button>
        </header>
    );
}
