import { api } from "./Api";

const Login = async (data) => {
    try {
        const res = await api.post("localhost:5000/login", data);
        return Promise.resolve(res);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
};

export default Login;
