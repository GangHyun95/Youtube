import { useParams } from "react-router-dom";
import styles from "./Videos.module.css";
import VideoCard from "../../components/VideoCard/VideoCard";
import { Video } from "../../../public/types";
import YoutubeApi from "../../api/youtubeApi";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import Loading from "../../components/Loading/Loading";

export default function Videos() {
    const { keyword } = useParams();

    const { 
        data: videos, 
        lastElementRef, 
        isFetchingNextPage,
        isLoading
    } = useInfiniteScroll<{
        items: Video[],
        nextPageToken?: string,
    }>({
        queryKey: ["videos", keyword || ""],
        queryFn: async ({ pageParam }) => {
            return YoutubeApi.search(keyword || "", pageParam);
        },
        getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
    });

    const listStyle = keyword ? styles.list : styles.grid;

    if (isLoading) {
        return <Loading className="full-screen" />;
    }
    return (
        <>
            <ul className={listStyle}>
                {videos?.pages.map((page, pageIndex) => 
                    page.items.map((video: Video, index: number) => {
                        if (pageIndex === videos.pages.length - 1 && index === page.items.length - 1) {
                            return (
                                <VideoCard ref={lastElementRef} key={video.id} video={video} />
                            );
                        } else {
                            return <VideoCard key={video.id} video={video} />;
                        }
                    })
                )}
            </ul>
            {isFetchingNextPage && <Loading className="bottom"/>}
        </>
    );
}
