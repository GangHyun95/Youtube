import React, { useState, useEffect, useRef } from "react";
import styles from "./VideoDetail.module.css";
import { useLocation } from "react-router-dom";
import ChannelImage from "../ChannelImage/ChannelImage";
import { formatDateTime, formatSubscriberCount, formatViewCount } from "../../util";
import CommentList from "../CommentList/CommentList";
import RelatedVideos from "../RelatedVideos/RelatedVideos";

export default function VideoDetail() {
    const {
        state: { video },
    } = useLocation();

    const [expanded, setExpanded] = useState(false);
    const [isTruncated, setIsTruncated] = useState(false);
    const descRef = useRef<HTMLPreElement>(null);

    const { title, description, channelTitle, publishedAt } = video.snippet;
    const { viewCount } = video.statistics;
    const subscriberCount = parseInt(video.channelDetails.statistics.subscriberCount || "0", 10);

    useEffect(() => {
        if (descRef.current) {
            setIsTruncated(descRef.current.scrollHeight > descRef.current.clientHeight);
        }
    }, [description]);

    const toggleDesc = () => {
        setExpanded(!expanded);
    };

    return (
        <section className={styles.flex}>
            <article className={styles.left}>
                <section className={styles['video-container']}>
                    <iframe
                        id="player"
                        src={`http://www.youtube.com/embed/${video.id}`}
                        frameBorder="0"
                        allowFullScreen
                    />
                </section>
                <section className={styles['channel-details']}>
                    <h2 className={styles.title}>{title}</h2>
                    <div className={styles['channel-info']}>
                        <ChannelImage 
                            src={video.channelDetails.snippet.thumbnails.default.url} 
                            alt={channelTitle}
                        />
                        <div>
                            <h3 className={styles['channel-title']}>{channelTitle}</h3>
                            <span className={styles['sub-count']}>
                                구독자 {formatSubscriberCount(subscriberCount)}
                            </span>
                        </div>
                    </div>
                    <div className={`${styles.desc} ${isTruncated ? styles.cursor : ''}`} onClick={isTruncated ? toggleDesc : undefined}>
                        <div className={styles.count}>
                            <span className={styles.bold}>조회수 {formatViewCount(viewCount)}</span>
                            <span className={styles.bold}>{formatDateTime(publishedAt)}</span>
                        </div>
                        <pre
                            ref={descRef}
                            className={expanded ? styles.expanded : styles.collapsed}
                        >
                            {description}
                        </pre>
                        {isTruncated && (
                            <span className={styles.toggle}>
                                {expanded ? '간략히' : '더보기'}
                            </span>
                        )}
                    </div>
                </section>
                <CommentList/>
            </article>
            <section className={styles.right}>
                <RelatedVideos/>
            </section>
        </section>
    );
}
