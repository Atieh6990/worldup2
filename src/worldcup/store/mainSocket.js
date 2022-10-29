// import io from 'socket.io-client';
import {User} from '../store/store'
import {ROAST_CONFIG} from "../js/config";
import io from '../js/socket'

export const MainSocket = {
    state: {
        socket: "",
    },
    getters: {
        getSocket(state) {
            return state.socket;
        },

    },

    mutations: {
        startSocket(state) {
         let userToken = JSON.parse(localStorage.getItem("Token"));
          //   console.log(userToken.access_token )
            if(!userToken || !userToken.access_token){
                return
            }
            state.socket = new io(ROAST_CONFIG.SOCKET_URL,{
                   auth:{
                    token: "Bearer " + userToken.access_token,
                    room: User.getters.getTcChannel(User.state),
                }
            })


        },
        disconnectSocket(state) {

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
