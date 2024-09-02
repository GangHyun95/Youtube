import styles from "./VideoDetail.module.css";
import { useLocation } from "react-router-dom";
import ChannelImage from "../ChannelImage/ChannelImage";
import { FaHeart } from "react-icons/fa";

export default function VideoDetail() {
    const {
        state: { video },
    } = useLocation();

    console.log(video);
    const { title, description, channelTitle, publishedAt } = video.snippet;
    const { commentCount, viewCount, likeCount } = video.statistics;


    return (
        <section className={styles.temp}>
            <article>
                <iframe
                    id="player"
                    width="100%"
                    height="560"
                    src={`http://www.youtube.com/embed/${video.id}`}
                    frameBorder="0"
                ></iframe>
                <section>
                    <h2>{title}</h2>
                    <div>
                        <ChannelImage src={video.channelDetails.snippet.thumbnails.default.url} alt={channelTitle}/>
                        {channelTitle}
                        <p>구독자 {video.channelDetails.statistics.subscriberCount}</p>
                    </div>
                    <pre>{description}</pre>
                </section>
            </article>
            <section>
                Temp
            </section>
        </section>
    );
}
