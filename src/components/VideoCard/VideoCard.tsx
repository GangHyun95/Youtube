import React from "react";
import { Video } from "../../../public/types";
import styles from './VideoCard.module.css'

export default function VideoCard({ video }: { video: Video }) {
    return <div>{video.snippet.title}</div>;
}
