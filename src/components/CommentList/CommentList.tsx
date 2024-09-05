import YoutubeApi from "../../api/youtubeApi";
import { Comment } from "../../../public/types";
import styles from "./CommentList.module.css";
import CommentItem from "../CommentItem/CommentItem";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import Loading from "../Loading/Loading";
import { useEffect, useState } from "react";

export default function CommentList({ videoId, commentCount }: { videoId: string, commentCount: string }) {
    const [isMobileView, setIsMobileView] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    const { data: comments, lastElementRef, isFetchingNextPage, isLoading } = useInfiniteScroll<{
        items: Comment[],
        nextPageToken?: string
    }>({
        queryKey: ["comments", videoId],
        queryFn: async ({ pageParam }) => {
            return YoutubeApi.getComments(videoId, pageParam);
        },
        getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
    });

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 992);
            
            if (window.innerWidth > 992) {
                setIsExpanded(false);
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const formattedCommentCount = parseInt(commentCount, 10).toLocaleString();

    if (isLoading) {
        return <Loading className="full-screen" />;
    }

    const handleExpandClick = () => {
        if (isExpanded) {
            window.scrollTo(0, scrollPosition);
        } else {
            setScrollPosition(window.scrollY);
        }
        setIsExpanded((prev) => !prev);
    };

    return (
        <section className={styles.container}>
            <div className={styles.flex}>
                <p className={styles['comment-count']}>댓글 {formattedCommentCount}개</p>
                {isMobileView && isExpanded && (
                    <button onClick={handleExpandClick} className={styles['close-button']}>
                        닫기
                    </button>
                )}
            </div>

            {isMobileView && !isExpanded ? (
                <div className={styles['comment-preview']} onClick={handleExpandClick}>
                    {comments?.pages[0]?.items[0] && (
                        <CommentItem key={comments.pages[0].items[0].id} comment={comments.pages[0].items[0]} isPreview />
                    )}
                    <button className={styles['expand-button']}>댓글 더보기</button>
                </div>
            ) : (
                <>
                    <ul className={styles.list}>
                        {comments?.pages.map((page, pageIndex) =>
                            page.items.map((comment: Comment, index: number) => {
                                if (pageIndex === comments.pages.length - 1 && index === page.items.length - 1) {
                                    return (
                                        <CommentItem ref={lastElementRef} key={comment.id} comment={comment} />
                                    );
                                } else {
                                    return <CommentItem key={comment.id} comment={comment} />;
                                }
                            })
                        )}
                    </ul>
                    {isFetchingNextPage && <Loading className="bottom" />}
                </>
            )}
        </section>
    );
}
