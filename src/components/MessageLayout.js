import { useEffect, useState } from "react";
import DateGroup from "./DateGroup";
import { FaPaperPlane } from "react-icons/fa";
import { api } from "../requests/Api";
import { API_URL } from "../constants";

const MessageLayout = ({ peerId, onSendMsg }) => {
    var messagesEnd;
    const [dateMessages, setDateMessages] = useState([]);
    const [messageText, setMessageText] = useState("");
    const userId = window.localStorage.getItem("user_id");

    useEffect(() => {
        if (peerId) {
            const getMessagesApi = async (id) => {
                const resp = await api.get(`${API_URL}/chat-history`, {
                    params: { user_id: userId, peer_id: peerId },
                });
                return Promise.resolve(resp);
            };
            getMessagesApi(peerId)
                .then((resp) => {
                    if (resp.data) {
                        setDateMessages(resp.data);
                    } else {
                        setDateMessages();
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setDateMessages([]);
                });
        }
    }, [peerId, userId]);

    const onSendMessage = async () => {
        onSendMsg({
            from: userId,
            to: peerId,
            text: messageText,
            read: false,
        });
    };

    useEffect(() => {
        const scrollToBottom = () => {
            messagesEnd.scrollIntoView();
        };
        scrollToBottom();
    });
    return (
        <div id="MessageLayout">
            <div className="MessageList custom-scroll">
                <div className="message-container">
                    {dateMessages.map((msg) => {
                        return (
                            <DateGroup
                                key={msg.date}
                                dateMessages={msg.messages}
                                date={msg.date}
                            />
                        );
                    })}
                    <div
                        style={{ float: "left", clear: "both" }}
                        ref={(el) => {
                            messagesEnd = el;
                        }}
                    ></div>
                </div>
                <div
                    className="input-area"
                    style={{ display: peerId ? "" : "none" }}
                >
                    <textarea
                        value={messageText}
                        onChange={(event) => {
                            setMessageText(event.target.value);
                        }}
                    />
                    <button onClick={onSendMessage}>
                        <FaPaperPlane fontSize={"25px"} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessageLayout;
