import React from "react";
import { useQuery } from "@tanstack/react-query";
import YoutubeApi from "../../api/youtubeApi";
import { PlaylistItem } from "../../../public/types";
import RelatedVideoItem from "../RelatedVideoItem/RelatedVideoItem";
import styles from './RelatedVideoList.module.css';
import Loading from "../Loading/Loading";

export default function RelatedVideoList({ playlistId, currentId }: { playlistId: string, currentId: string }) {
    const { data, isLoading } = useQuery({
        queryKey: ['playlists', playlistId],
        queryFn: () => YoutubeApi.getPlaylistItems(playlistId),
    });

    if (isLoading) {
        return <Loading className="full-screen" />;
    }

    const filteredVideos = data?.items.filter((video: PlaylistItem) => video.snippet.resourceId.videoId !== currentId);

    return (
        <>
            <ul className={styles.list}>
                {filteredVideos?.map((video: PlaylistItem) => (
                    <RelatedVideoItem key={video.id} video={video} />
                ))}
            </ul>
        </>
    );
}
