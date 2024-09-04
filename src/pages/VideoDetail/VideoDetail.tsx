import React from "react";
import styles from "./VideoDetail.module.css";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import YoutubeApi from "../../api/youtubeApi";
import VideoInfo from "../../components/VideoInfo/VideoInfo";
import CommentList from "../../components/CommentList/CommentList";
import RelatedVideoList from "../../components/RelatedVideoList/RelatedVideoList";

export default function VideoDetail() {
    const { videoId } = useParams();
    const location = useLocation();
    const stateVideo = location.state?.video;

    const { data: fetchedVideo, isLoading } = useQuery({
        queryKey: ["video", videoId],
        queryFn: () => YoutubeApi.getVideoById(videoId || ""),
        staleTime: 60000,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        enabled: !stateVideo,
    });

    const video = stateVideo || fetchedVideo;

    return (
        <section className={styles.flex}>
            <article className={styles.left}>
                <section className={styles["video-container"]}>
                    <iframe
                        id="player"
                        src={`http://www.youtube.com/embed/${videoId}`}
                        frameBorder="0"
                        allowFullScreen
                    />
                </section>
                {video && (
                    <>
                        <VideoInfo video={video} />
                        <CommentList
                            videoId={videoId || ""}
                            commentCount={video.statistics.commentCount}
                        />
                    </>
                )}
            </article>
            <section className={styles.right}>
                {video && (
                    <RelatedVideoList
                        currentId={video.id}
                        playlistId={
                            video.channelDetails.contentDetails.relatedPlaylists
                                .uploads
                        }
                    />
                )}
            </section>
        </section>
    );
}
