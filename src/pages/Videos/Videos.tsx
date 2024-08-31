import { useParams } from "react-router-dom";
import styles from "./Videos.module.css";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import VideoCard from "../../components/VideoCard/VideoCard";
import { Video } from "../../../public/types";
import YoutubeApi from "../../api/youtubeApi";
import { useCallback, useRef } from "react";

export default function Videos() {
    const { keyword } = useParams();
    const {
        data: videos,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["videos", keyword],
        queryFn: async ({ pageParam }) => {
            return YoutubeApi.search(keyword, pageParam);
        },
        getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
        staleTime: 60000,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        initialPageParam: "",
    });

    const observer = useRef<IntersectionObserver | null>(null);
    const lastVideoElementRef = useCallback(
        (node: HTMLElement | null) => {
            if (isFetchingNextPage) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            });
            if (node) observer.current.observe(node);
        },
        [isFetchingNextPage, fetchNextPage, hasNextPage]
    );
    console.log(videos);
    return (
        <>
            <ul className={styles.grid}>
                {videos?.pages.map((page, pageIndex) => 
                    page.items.map((video: Video, index: number) => {
                        console.log(index);
                        if (pageIndex === videos.pages.length - 1 && index === page.items.length - 1) {
                            return (
                                <VideoCard ref={lastVideoElementRef} key={video.id} video={video}/>
                            );
                        } else {
                            return <VideoCard key={video.id} video={video}/>
                        }
                    })
                )}
                {isFetchingNextPage && <p>Loading</p>}
            </ul>
        </>
    );
}
