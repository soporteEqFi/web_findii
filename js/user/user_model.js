import config from "../supabase/keys.js";

const Model = {

    async getUserInfo(id) {
        const res = axios({
            method: "GET",
            url: "http://127.0.0.1:5000/get-user-info/" + id,
            headers: config.headers,
        });
       
        return res
    },

    async get_agent_info(id) {
        const res = axios({
            method: "GET",
            url: "http://127.0.0.1:5000/get-agent-info/" + id,
            headers: config.headers,
        });
        return res
    }
}
export default Model;
