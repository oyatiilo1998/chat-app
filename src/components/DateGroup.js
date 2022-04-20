import MessageListItem from "./MessageListItem";
import moment from "moment";

const DateGroup = ({ dateMessages, date }) => {
    const userId = window.localStorage.getItem("user_id");
    return (
        <div className="message-date-group">
            <div className="sticky-date">
                <span>{date}</span>
            </div>
            {dateMessages.map((message, ind) => {
                let time = message.created_at;
                const strTime = moment(
                    message.created_at,
                    "YYYY-MM-DDThh:mm:ssZ"
                )
                    .utcOffset(0)
                    .format("hh:mm a");
                return (
                    <MessageListItem
                        key={ind}
                        message={message.text}
                        own={message.from === userId ? true : false}
                        time={strTime}
                    />
                );
            })}
        </div>
    );
};

export default DateGroup;
