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
                    token: "Bearer " +'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiNmM1OWUyMWIzMjBhMjMxNTMxNWFjOWM3NDgxOWU0YWQ4NGMwODU0ZDkwYTRhNmM3ODNiMzE0NzY0MTlhNTNhMTIzMzBlMWM1YmRhZjJhZDQiLCJpYXQiOjE2Njc4MTg2ODEuMzY2NjA3LCJuYmYiOjE2Njc4MTg2ODEuMzY2NjE4LCJleHAiOjE2OTkzNTQ2ODEuMzQ4Njc5LCJzdWIiOiIzNjIzIiwic2NvcGVzIjpbXX0.amw8LklsXG9euSSWy91g-mCNGBgFi_ZvFHeffYXMeMdnJvdpjay4ky3s9qbVhBdLxlqYo0IeDKnPh-1iax1Nrz4UJhOgabYxuLy899YVJZAvl4Y_8tb5AvOQq1lc9kPSYkoXbFtANkzw2_spY9yZkLn1F2f5s8YPuZ204P4grZtspcdSpo4iBMOQ-x8MaejjQsXDTEL1T1jDFKU_w35MK4-EapgS6laQKPQaSXHagfCxNgAiM1znZiCmPLMumEFLxeYRKQqVS4K1vQc5ppgfATM5dWOgwkQtvZBw3DRGOyshHBqQAD22tl39J25G451KcJswT49nYFC7kfYuJlLpUN8duZ0nd1pdNmrNTECcQr45iY28FaX60UmaQT_UDmND14WhhSz0CH2nYqc3VWs8SONGBupFZ8QzEJsjtJBcroIUkW1Gf6hRtpKwro04lDhuPK8505SlYOOAPBCwUZkhXD6P1y3MrzptgtheHNQ6m09VI3fKcHZeIshdIxVHqmTu36y0Br7t_lQPeWmRBCJhYWcHlW2FEGdSubV8q72OrcPyTh4x9kx_P5p-uWyVUlIWAi20E6zG-fXz1QmDtNBQCZqhpEMmfVuhCVMblhUR6Uj4hORBx38__vaVk-qzhNjad_gR-yRiiQ7eWEIXI-wShNvOx06NOxDTkE_GRrzLVVE',
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
