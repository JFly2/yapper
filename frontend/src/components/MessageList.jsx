import { Fragment, useEffect, useRef } from "react";
import { Message } from "./Message.jsx";
import "../styles/MessageList.css";

function formatMessageDate(timestamp) {
    const messageDate = new Date(timestamp);
    const today = new Date();

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (messageDate.toDateString() === today.toDateString()) {
        return "Today";
    }

    if (messageDate.toDateString() === yesterday.toDateString()) {
        return "Yesterday";
    }

    return messageDate.toLocaleDateString([], {
        month: "long",
        day: "numeric",
        year: "numeric"
    });
}

export function MessageList({ messageList, currentUsername }) {
    const messageChatRef = useRef(null);

    useEffect(() => {
        const containerElem = messageChatRef.current;

        if (containerElem) {
            containerElem.scrollTop = containerElem.scrollHeight;
        }
    }, [messageList]);

    if (messageList.length === 0) {
        return (
            <div
                className="messages-container"
                ref={messageChatRef}
            >
                <p className="empty-room-message">
                    No messages yet. Start the conversation.
                </p>
            </div>
        );
    }

    return (
        <div
            className="messages-container"
            ref={messageChatRef}
        >
            {messageList.map((message, index) => {
                const currentDate = new Date(
                    message.timestamp
                ).toDateString();

                const previousDate =
                    index > 0
                        ? new Date(
                            messageList[index - 1].timestamp
                        ).toDateString()
                        : null;

                const showDateDivider =
                    currentDate !== previousDate;

                return (
                    <Fragment key={message.id}>
                        {showDateDivider && (
                            <div className="message-date-divider">
                                <span>
                                    {formatMessageDate(message.timestamp)}
                                </span>
                            </div>
                        )}

                        <Message
                            sender={message.sender}
                            content={message.content}
                            timestamp={message.timestamp}
                            isOwnMessage={
                                message.sender?.toLowerCase() ===
                                currentUsername?.toLowerCase()
                            }
                        />
                    </Fragment>
                );
            })}
        </div>
    );
}
