import { useState } from "react";
import ChatUser from "./ChatUser";

const ChatList = ({ websocket, users, onUserSelect }) => {
    return (
        <div id="LeftColumn">
            <div className="ChatFolders">
                <div className="chat-list">
                    {users.map((user) => (
                        <ChatUser
                            key={user.id}
                            unreadMessages={user.unreadMessages}
                            username={user.username}
                            onUserSelect={onUserSelect}
                            lastMessage={user.lastMessage}
                            userId={user.id}
                            active={user.active}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChatList;
