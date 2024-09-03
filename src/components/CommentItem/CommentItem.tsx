import React from "react";
import { Comment } from "../../../public/types";
import ChannelImage from "../ChannelImage/ChannelImage";
import styles from './CommentItem.module.css'
import { formatDateTime } from "../../util";

export default function CommentItem({ comment }: { comment: Comment }) {
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
        <li className={styles.list}>
            <ChannelImage src={authorProfileImageUrl} alt={authorDisplayName}/>
            <div>
                <div className={styles.flex}>
                    <p className={styles.author}>{authorDisplayName}</p>
                    <span className={styles.published}>{formatDateTime(publishedAt)}</span>
                </div>
                <p className={styles.text}>{textOriginal}</p>
            </div>
        </li>
    );
}
