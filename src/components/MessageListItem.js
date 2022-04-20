const MessageListItem = ({ message, own, time }) => {
    return (
        <div className={`Message message-list-item ${own ? "own" : ""}`}>
            <div className="message-content-wrapper">
                <div className="message-content">{message}</div>
                <p className="time">{time}</p>
            </div>
        </div>
    );
};

export default MessageListItem;
