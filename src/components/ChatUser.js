const ChatUser = ({
    unreadMessages,
    username,
    lastMessage,
    onUserSelect,
    userId,
    active,
}) => {
    return (
        <div className="ListItem Chat">
            <div
                className={`ListItem-button ${active && "active"}`}
                role={"button"}
                onClick={() => {
                    onUserSelect(userId);
                }}
            >
                {username}
                {lastMessage}
                {unreadMessages}
            </div>
        </div>
    );
};

export default ChatUser;
