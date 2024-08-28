import { useParams } from "react-router-dom";
import styles from "./Videos.module.css";
import { useQuery } from "@tanstack/react-query";
import VideoCard from "../../components/VideoCard/VideoCard";
import { Video } from "../../../public/types";
import YoutubeApi from "../../api/youtubeApi";

export default function Videos() {
    const { keyword } = useParams();
    const {
        isLoading,
        error,
        data: videos,
    } = useQuery<Video[]>({
        queryKey: ["videos", keyword],
        queryFn: () => YoutubeApi.search(keyword),
        staleTime: 60000,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });

    return (
        <>
            {videos && (
                <ul>
                    {videos.map((video: Video) => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </ul>
            )}
        </>
    );
}
