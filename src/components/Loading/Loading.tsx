import styles from "./Loading.module.css";

export default function Loading({ className }: { className: string }) {
    return <div className={`${styles.loader} ${styles[className]}`}></div>;
}
