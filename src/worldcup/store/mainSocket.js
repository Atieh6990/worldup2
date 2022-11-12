// import io from 'socket.io-client';
import {User} from '../store/store'
import {ROAST_CONFIG} from "../js/config";
import io from '../js/socket'

export const MainSocket = {
    state: {
        socket: "",
    },
    getters: {
        getSocketW(state) {
            return state.socket;
        },

    },

    mutations: {
        startSocketW(state) {
         let userToken = JSON.parse(localStorage.getItem("Tokenw"));
            console.log(userToken.access_token )
            if(!userToken || !userToken.access_token){
                return
            }
            state.socket = new io(ROAST_CONFIG.SOCKET_URL,{
                   auth:{
                    // token: "Bearer " + userToken.access_token,
                    token: "Bearer " +'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNWRjYmMxYzJmODkyYjg4ZTk4OTMyOWY2ZWE5ZjI2ZDg2ODBlNmNiM2Y5NWM0MWVjMThjNzE1YmJlNzdkYzJmZjBlM2RkODMyZjc5MTdmMzAiLCJpYXQiOjE2Njc5MDMxMjIuNDA4NzQ2LCJuYmYiOjE2Njc5MDMxMjIuNDA4NzUyLCJleHAiOjE2OTk0MzkxMjIuMzk2MDQxLCJzdWIiOiIzNjIzIiwic2NvcGVzIjpbXX0.HFW8LVY_qk7FX3-t0lbR7PDG8L-0YU1MoxsekHqhOlmEMTPh0Cgi6eQ8fJvrkWSOjbuGKfDYArM_FXDSbureZIcpuxyJ7gNKH56Yj4uPAD5Om-emQCbXsfZduVIO6vKeqqYHmsagS0290znc6g4q2w9OXyngtvDwVVv8ceYYgpgZjVJ8ey5lHlLmgPSVjzTAO4il-Uykp5QGlfvQv9FGl0YMB5RT35GyK8TiptYZx3sK0xM_G5_3p1KcichhHTF-yH3A2VGgOQyYWyUq_bz0dD3YsR7fs23gXQNFcS-Jsw1o-afRpY8dT8twCvIwB5SuXiSfKPDjlOWW_l_pkKuhm7CczGP2X5IkKqe-7PxSRh3h8_SORY6bJ5cPADQf-fQc8TkpSzZ34y8PIuKXR-NpwyYajVpuXAXjves-tqA59Jc7fLx1d6Ak-mAW_cLA_V53uOdxIf2MeOJKpm1EZqDS38mH3x0bNGeb6T3mFip2Xqw94k8LF14185FS18uA3MoL8nDcSl5ab6AbuYXoMT8SkSmf9VoicFR-vTKApXuSROgD7L4VP3jH0-ycAUQJa5kdeQmDNK1BnhpSg85kTiFLhjkXT9JjP9w06yNTGrENSab4Ma4Dh6XHtbi2ZQ36W5p8vM2FgQQpnmbDUQDJ9TE8gF-F1bO56HkQAj9WouqQ-58',
                    room: User.getters.getTcChannel(User.state),
                }
            })


        },
        disconnectSocketW(state) {

            if (state.socket != "") {
                state.socket.disconnect();
                state.socket = ""
                // console.log("disconnectSocket", state.socket)
            }
        },


        emptySocketVar(state){
            state.socket = "";
        }
    },


    actions: {
        setUserName: (state, data) => {
            // console.log("******8setUserName*******")
            let sendData = {'data': data}
            state.state.socket.emit("set_name", sendData)
        },

        sendUserMessage: (state, data) => {
            let sendData = {'type': 'text', 'text': data}
            state.state.socket.emit("messages", sendData)
        },

        loginSocket: state => {
            // let socketConnect = state.state.socket.emit("check login", userId, private_key, hashKey, timeConnect);
        },
    }

};
