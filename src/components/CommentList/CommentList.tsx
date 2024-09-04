import YoutubeApi from "../../api/youtubeApi";
import { Comment } from "../../../public/types";
import styles from "./CommentList.module.css";
import CommentItem from "../CommentItem/CommentItem";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

export default function CommentList({ videoId, commentCount }: { videoId: string, commentCount: string }) {
    const { data: comments, lastElementRef, isFetchingNextPage } = useInfiniteScroll<{
        items: Comment[],
        nextPageToken?: string
    }>({
        queryKey: ["comments", videoId],
        queryFn: async ({ pageParam }) => {
            return YoutubeApi.getComments(videoId, pageParam);
        },
        getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
    });

    const formattedCommentCount = parseInt(commentCount, 10).toLocaleString();
    return (
        <>
            <p className={styles['comment-count']}>댓글 {formattedCommentCount}개</p>
            <ul className={styles.list}>
                {comments?.pages.map((page, pageIndex) => 
                    page.items.map((comment: Comment, index: number) => {
                        if (pageIndex === comments.pages.length - 1 && index === page.items.length - 1) {
                            return (
                                <CommentItem ref={lastElementRef} key={comment.id} comment={comment}/>
                            );
                        } else {
                            return <CommentItem key={comment.id} comment={comment}/>;
                        }
                    })
                )}
            </ul>
            {isFetchingNextPage && <p>Loading...</p>}
        </>
    );
}
