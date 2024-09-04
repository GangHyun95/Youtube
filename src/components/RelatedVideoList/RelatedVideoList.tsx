import React from "react";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import YoutubeApi from "../../api/youtubeApi";
import { PlaylistItem } from "../../../public/types";
import RelatedVideoItem from "../RelatedVideoItem/RelatedVideoItem";
import styles from './RelatedVideoList.module.css'
import Loading from "../Loading/Loading";

export default function RelatedVideoList({ playlistId, currentId }: { playlistId: string, currentId: string }) {
    const { data, lastElementRef, isFetchingNextPage, isLoading } = useInfiniteScroll({
        queryKey: ["playlists", playlistId],
        queryFn: async ({ pageParam }) => {
            return YoutubeApi.getPlaylistItems(playlistId, pageParam);
        },
        getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined
    });
    
    if (isLoading) {
        return <Loading className="full-screen"/>
    }
    return (
        <>
            <ul className={styles.list}>
                {data?.pages.map((page, pageIndex) => {
                    const filteredVideos = page.items.filter((video: PlaylistItem) => video.snippet.resourceId.videoId !== currentId);

                    return filteredVideos.map((video: PlaylistItem, index: number) => {
                        if (pageIndex === data.pages.length - 1 && index === filteredVideos.length - 1) {
                            return (
                                <RelatedVideoItem ref={lastElementRef} key={video.id} video={video} />
                            );
                        } else {
                            return <RelatedVideoItem key={video.id} video={video} />;
                        }
                    });
                })}
            </ul>
            {isFetchingNextPage && <Loading className="bottom"/>}
        </>
    );
}
