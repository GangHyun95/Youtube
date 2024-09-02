import { useLocation } from 'react-router-dom';
import styles from "./ChannelImage.module.css";

export default function ChannelImage({
    src,
    alt,
}: {
    src: string;
    alt: string;
}) {
    const location = useLocation();

    const isDetailPage = location.pathname.includes('/videos/watch/');
    const sizeClass = isDetailPage ? styles.large : styles.small;

    return (
        <div className={`${styles["channel-img-container"]} ${sizeClass}`}>
            <img
                className={styles.img}
                src={src}
                alt={alt}
            />
        </div>
    );
}
