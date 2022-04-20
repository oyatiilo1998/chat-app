import { useState } from "react";

const AddTask = ({ onAdd }) => {
    const [text, setText] = useState("");
    const [day, setDay] = useState("");
    const [reminder, setReminder] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        if (!text) {
            alert("Please add text");
            return;
        }

        onAdd({ text, day, reminder });
        setDay("");
        setText("");
        setReminder(false);
    };

    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label htmlFor="">Task</label>
                <input
                    type="text"
                    placeholder="Add task"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <div className="form-control">
                <label htmlFor="">Day & time</label>
                <input
                    type="text"
                    placeholder="Add day&time"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                />
            </div>
            <div className="form-control form-control-check">
                <label htmlFor="">Task</label>
                <input
                    type="checkbox"
                    checked={reminder}
                    value={reminder}
                    onChange={(e) => setReminder(e.currentTarget.checked)}
                />
            </div>
            <input type="submit" value="Save Task" className="btn btn-block" />
        </form>
    );
};

export default AddTask;
