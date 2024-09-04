import React from "react";
import SearchHeader from "../components/SearchHeader/SearchHeader";
import styles from "./Layout.module.css";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
            <SearchHeader />
            <main className={styles.content}>
                <Outlet />
            </main>
        </>
    );
}
