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
          //   console.log(userToken.access_token )
            if(!userToken || !userToken.access_token){
                return
            }
            state.socket = new io(ROAST_CONFIG.SOCKET_URL,{
                   auth:{
                    // token: "Bearer " + userToken.access_token,
                    token: "Bearer " +'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiOTc3YjRkNmMwNDQyNDZiYWM1MzNlNWNkMDQyNDIzMjdkNzcxZGIyOGE3NGNjMTZlNGM0MDQ3ZDA1YjA2OTA2N2RiYTk0ZDRkYzhiYmY4ZDIiLCJpYXQiOjE2Njc4OTAzMTAuNjE2MzIxLCJuYmYiOjE2Njc4OTAzMTAuNjE2MzI3LCJleHAiOjE2OTk0MjYzMTAuNTk5MDE1LCJzdWIiOiIzNjIzIiwic2NvcGVzIjpbXX0.klDJnYFwm8egiVTBLzAp6xgyHoeHiaA5O7cl5LzDD4onGRcf929GqZE_SF-Lq9GmW_QHfdr6reFWjQf7T02kn5qGaA-IOSuzplF0aSIxtx82PUF7Ek0QRpz0-VVZSEbxi3rPe2UAvMHvf8mFcrzNymVRKMuyxXH5NcukKWkx6MTw7MDi0DmbO8Z4p4fWnFl5Dlvj1nPKEpPbINsyXYgjwGmWRpPOcrnjI_LRj_B62voKwRN_ws4jTBIQZC9tj8PjJ9Ctc-VK8FEb13U5TPFGNa5hYV0BnaT3GM26dQplbdqi5c61uhURDA55s9in16eVry_D5S_nZxA8n7GMBHgVFRo3vz4odAfJBjVVJs1h_DNVqRDmfW_H5R0C4JzG-knzAJsyZxIDDE65I5OzzTQVgqzoKrPnIS0w9B_6tZcilZLVmgorAsfcChtJmk4lC9uOqAJ4nNVMuU-M2vtEyAiW-xho8ejk8FL0crXoNwX48L3UQGPyC-kIMx6RqnDq00N4Zmocc5FOgRJtlisnbONmlWdIgS2YMyD5K54iewSnZuWxYIJpNJgVcFSwzeq5n2a-_84B_XG5bSIreNSO-nsDbXy4qUI3bvnZwhMmfXbaGJvtAzDQ_TKFDboOuuuZQXnwzDIvRtIvTJbxCK_0QkQboNm7grExFn3pBqVlIhlRUZI',
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
