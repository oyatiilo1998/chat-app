import { createContext, useEffect, useState } from "react";
import ChatList from "../components/ChatList";
import { api } from "../requests/Api";
import { API_URL } from "../constants";
import MessageLayout from "../components/MessageLayout";

const Chatroom = () => {
    const userId = window.localStorage.getItem("user_id");
    const [peerId, setPeerId] = useState();
    const [users, setUsers] = useState([]);

    const access_token = window.localStorage.getItem("access_token");
    const websocket = new WebSocket(
        `ws://localhost:8080/ws?Authorization=${access_token}`
    );

    websocket.onmessage = (event) => {
        console.log(event.data);
        getUserApi(userId)
            .then((resp) => {
                console.log(resp.data);
                setUsers(resp.data.users);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onUserSelect = (userId) => {
        setUsers(
            users.map((user) => {
                if (user.id === userId) {
                    return {
                        ...user,
                        active: true,
                    };
                } else {
                    return {
                        ...user,
                        active: false,
                    };
                }
            })
        );
        setPeerId(userId);
    };

    const onReceiveMsg = () => {
        
    }

    const onSendMessage = (obj) => {
        console.log(obj, JSON.stringify(obj));
        websocket.send(JSON.stringify(obj));
    };

    const getUserApi = async (id) => {
        const resp = await api.get(`${API_URL}/chat-users/${userId}`);
        return Promise.resolve(resp);
    };

    useEffect(() => {
        const getUserApi = async (id) => {
            const resp = await api.get(`${API_URL}/chat-users/${userId}`);
            return Promise.resolve(resp);
        };
        getUserApi(userId)
            .then((resp) => {
                setUsers(resp.data.users);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div id="main-window">
            <ChatList users={users} onUserSelect={onUserSelect} />
            <MessageLayout peerId={peerId} onSendMsg={onSendMessage} onRcvMsg={onReceiveMsg}/>
        </div>
    );
};

export default Chatroom;
