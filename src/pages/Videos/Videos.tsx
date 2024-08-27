import { useParams } from "react-router-dom";
import styles from "./Videos.module.css";

export default function Videos() {
    const { keyword } = useParams();

    return <div>Videos {keyword ? `${keyword}` : ""}</div>;
}
