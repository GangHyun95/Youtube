import React, { forwardRef } from "react";
import { Video } from "../../../public/types";
import styles from "./VideoCard.module.css";
import { formatDateTime, formatViewCount } from "../../util";

const VideoCard = forwardRef<HTMLLIElement, { video: Video }>(({ video }, ref) => {
    const { title, channelTitle, thumbnails, publishedAt } = video.snippet;
    const viewCount = parseInt(video.statistics?.viewCount || "0", 10);

    return (
        <li className={styles.card} ref={ref}>
            <div className={styles['img-container']}>
                <img
                    className={styles.img}
                    src={thumbnails.medium.url}
                    alt={title}
                />
            </div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.text}>{channelTitle}</p>
            <div className={styles.flex}>
                <p className={styles.text}>
                    조회수 {formatViewCount(viewCount)}
                </p>
                <p className={styles.text}>{formatDateTime(publishedAt)}</p>
            </div>
        </li>
    );
});

export default VideoCard;