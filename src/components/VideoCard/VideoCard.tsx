import React, { forwardRef } from "react";
import { Video } from "../../../public/types";
import styles from "./VideoCard.module.css";
import { formatDateTime, formatViewCount } from "../../util";
import { useParams } from "react-router-dom";

const VideoCard = forwardRef<HTMLLIElement, { video: Video }>(({ video }, ref) => {
    const { channelThumbnail }: { channelThumbnail: string } = video;
    const { title, channelTitle, thumbnails, publishedAt, description } = video.snippet;
    const viewCount = parseInt(video.statistics?.viewCount || "0", 10);
    const { keyword } = useParams();
    const cardClassName = keyword ? styles['card-search'] : styles.card;

    return (
        <li className={cardClassName} ref={ref}>
            <section className={styles['img-container']}>
                <img
                    className={styles.img}
                    src={keyword ? thumbnails.high.url : thumbnails.medium.url}
                    alt={title}
                />
            </section>
            <section className={styles.right}>
                {!keyword && (
                    <img className={styles['channel-img']} src={channelThumbnail} alt={channelTitle} />
                )}
                <div className={keyword ? styles['content-container'] : ''}>
                    <div>
                        <h3 className={styles.title}>{title}</h3>
                        <div className={styles.flex}>
                            {keyword && (
                                <img className={styles['channel-img']} src={channelThumbnail} alt={channelTitle} />
                            )}
                            <p className={styles.text}>{channelTitle}</p>
                        </div>
                    </div>
                    <div className={styles.flex}>
                        <p className={styles.text}>
                            조회수 {formatViewCount(viewCount)}
                        </p>
                        <p className={styles.text}>{formatDateTime(publishedAt)}</p>
                    </div>
                    {keyword && (
                        <p className={`${styles.text} ${styles.desc}`}>{description}</p>
                    )}
                </div>
            </section>
        </li>
    );
});

export default VideoCard;