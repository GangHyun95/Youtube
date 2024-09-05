import React, { forwardRef } from "react";
import { Comment } from "../../../public/types";
import ChannelImage from "../ChannelImage/ChannelImage";
import styles from './CommentItem.module.css'
import { formatDateTime } from "../../util";

const CommentItem = forwardRef<HTMLLIElement, { comment: Comment, isPreview?: boolean }>(({ comment, isPreview }, ref) => {
    const {
        authorChannelUrl,
        authorDisplayName,
        authorProfileImageUrl,
        likeCount,
        publishedAt,
        textDisplay,
        textOriginal,
        updatedAt,
    } = comment.snippet.topLevelComment.snippet;

    return (
        <li className={styles.list} ref={ref}>
            <ChannelImage src={authorProfileImageUrl} alt={authorDisplayName} />
            <div>
                <div className={styles.flex}>
                    <p className={styles.author}>{authorDisplayName}</p>
                    <span className={styles.published}>{formatDateTime(publishedAt)}</span>
                </div>
                <p className={`${styles.text} ${styles.preview}`}>{textOriginal}</p>
            </div>
        </li>
    );
});

export default CommentItem;
