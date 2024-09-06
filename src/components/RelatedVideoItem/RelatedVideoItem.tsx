import React, { forwardRef } from "react";
import { PlaylistItem } from "../../../public/types";
import styles from './RelatedVideoItem.module.css'
import { formatDateTime } from "../../util";
import { useNavigate } from "react-router-dom";

const RelatedVideoItem = forwardRef<HTMLLIElement, { video: PlaylistItem }>(({ video }, ref) => {
    const { channelTitle, publishedAt, thumbnails, title } = video.snippet;
    const navigate = useNavigate();

    return (
        <li className={styles.flex} ref={ref} onClick={() => navigate(`/videos/watch/${video.snippet.resourceId.videoId}`)}>
            <section className={styles['img-container']}>
                <img
                    className={styles.img}
                    src={thumbnails?.maxres?.url || thumbnails.medium.url}
                    alt={title}
                />
            </section>
            <section className={styles.right}>
                <p className={styles.title}>{title}</p>
                <p className={styles.channel}>{channelTitle}</p>
                <p className={styles.date}>{formatDateTime(publishedAt)}</p>
            </section>
        </li>
    );
});

export default RelatedVideoItem;
