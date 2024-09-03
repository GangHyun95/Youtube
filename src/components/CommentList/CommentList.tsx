import { useQuery } from "@tanstack/react-query";
import React from "react";
import YoutubeApi from "../../api/youtubeApi";
import { Comment } from "../../../public/types";
import styles from "./CommentList.module.css";
import CommentItem from "../CommentItem/CommentItem";

export default function CommentList({ videoId, commentCount }: { videoId: string, commentCount: string }) {
    const {
        isLoading,
        error,
        data: comments,
    } = useQuery<Comment[]>({
        queryKey: ["comments", videoId],
        queryFn: () => YoutubeApi.getComments(videoId),
        staleTime: 60000,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });

    const formattedCommentCount = parseInt(commentCount, 10).toLocaleString();
    return (
        <>
            <p className={styles['comment-count']}>댓글 {formattedCommentCount}개</p>
            {comments && (
                <ul className={styles.list}>
                    {comments.map((comment: Comment) => (
                        <CommentItem key={comment.id} comment={comment}/>
                    ))}
                </ul>
            )}
        </>
    );
}
