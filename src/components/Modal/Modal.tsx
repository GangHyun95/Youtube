import React, { useEffect, useState } from "react";
import styles from "./Modal.module.css";
import { BsMicFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onVoiceCommand: (command: string) => void;
}

export default function Modal({ isOpen, onClose, onVoiceCommand }: ModalProps) {
    const [listening, setListening] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            startListening();
        } else {
            stopListening();
        }

        return () => {
            stopListening();
        };
    }, [isOpen]);

    const startListening = () => {
        const SpeechRecognition =
            (window as any).SpeechRecognition ||
            (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.lang = "ko-KR";
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.onstart = () => setListening(true);
            recognition.onend = () => setListening(false);
            recognition.onerror = (event: any) => {
                console.error("Speech recognition error", event.error);
            };
            recognition.onresult = (event: any) => {
                const command = event.results[0][0].transcript;
                onVoiceCommand(command);
                onClose();
            };

            recognition.start();
        } else {
            console.warn("이 브라우저에서는 음성 인식이 지원되지 않습니다.");
        }
    };

    const stopListening = () => {
        const SpeechRecognition =
            (window as any).SpeechRecognition ||
            (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.stop();
        }
    };

    if (!isOpen) return null;

    const handleBgClick = (e: React.MouseEvent<HTMLElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles["modal-overlay"]} onClick={handleBgClick}>
            <div
                className={styles["modal-content"]}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles["modal-header"]}>
                    <p className={styles.text}>
                        {listening
                            ? "듣는 중..."
                            : "음성을 인식할 수 없습니다. 다시 시도해 주세요"}
                    </p>
                    <button className={styles.close} onClick={onClose}>
                        <IoMdClose/>
                    </button>
                </div>
                <div className={styles["modal-body"]}>
                    <button
                        className={`${styles.mic} ${
                            listening ? styles.active : ""
                        }`}
                        onClick={startListening}
                    >
                        <BsMicFill />
                    </button>
                    {!listening && <p className={styles.alert}>다시 시도하려면 마이크를 탭하세요.</p>}
                </div>
            </div>
        </div>
    );
}