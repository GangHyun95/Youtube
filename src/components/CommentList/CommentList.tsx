import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React, { useCallback, useRef } from "react";
import YoutubeApi from "../../api/youtubeApi";
import { Comment } from "../../../public/types";
import styles from "./CommentList.module.css";
import CommentItem from "../CommentItem/CommentItem";

export default function CommentList({ videoId, commentCount }: { videoId: string, commentCount: string }) {
    const {
        data: comments,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["comments", videoId],
        queryFn: async ({ pageParam }) => {
            return YoutubeApi.getComments(videoId, pageParam);
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
    const lastCommentElementRef = useCallback(
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

    console.log(comments);
    const formattedCommentCount = parseInt(commentCount, 10).toLocaleString();
    return (
        <>
            <p className={styles['comment-count']}>댓글 {formattedCommentCount}개</p>
            <ul className={styles.list}>
                {comments?.pages.map((page, pageIndex) => 
                    page.items.map((comment: Comment, index: number) => {
                        console.log(comment);
                        if (pageIndex === comments.pages.length - 1 && index === page.items.length - 1) {
                            return (
                                <CommentItem ref={lastCommentElementRef} key={comment.id} comment={comment}/>
                            );
                        } else {
                            return <CommentItem key={comment.id} comment={comment}/>
                        }
                    })
                )}
            </ul>
            {isFetchingNextPage && <p>Loading</p>}

            {/* {comments && (
                <ul className={styles.list}>
                    {comments.map((comment: Comment) => (
                        <CommentItem key={comment.id} comment={comment}/>
                    ))}
                </ul>
            )} */}
            
        </>
    );
}
