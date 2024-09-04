import React, { forwardRef } from "react";
import { PlaylistItem, Video } from "../../../public/types";
import styles from './RelatedVideoItem.module.css'
import { formatDateTime } from "../../util";

interface RelatedVideoItemProps {
    video: PlaylistItem;
}

const RelatedVideoItem = forwardRef<HTMLLIElement, { video: PlaylistItem }>(({ video }, ref) => {
    const { channelTitle, publishedAt, thumbnails, title} = video.snippet;
    
    return (
        <li className={styles.flex} ref={ref}>
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
}
);

export default RelatedVideoItem;
