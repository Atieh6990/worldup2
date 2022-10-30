import {ROAST_CONFIG} from "../../worldcup/js/config";

export const User = {
    state: {
        test: "121221",
        userTv: {
            android_id: '', mac: "", android_version: "", model: "", ver: "", uid: "", version: ""
        },
        menuInfo: {id: '', name: '', des: '', rout: ''},
        userTv2: "",
        userInfo: {
            expires_in: "",
            // access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImVjOWQxYzNlZGFiY2U1ZjE5YWY4MTdkNjlhZTYzYzNlOWY2ZjQ2MzlmMzQ3MTY3NTYyYjFjODA3YmJmZWUzNjZkZjQ5Njc3ZTY2ZGY4NzNiIn0.eyJhdWQiOiIzIiwianRpIjoiZWM5ZDFjM2VkYWJjZTVmMTlhZjgxN2Q2OWFlNjNjM2U5ZjZmNDYzOWYzNDcxNjc1NjJiMWM4MDdiYmZlZTM2NmRmNDk2NzdlNjZkZjg3M2IiLCJpYXQiOjE2MTU3MTM0MzksIm5iZiI6MTYxNTcxMzQzOSwiZXhwIjoxNjQ3MjQ5NDM5LCJzdWIiOiI2MzY0Iiwic2NvcGVzIjpbXX0.DE9cJgY2HxmT1ymkYBrVbT2QqX7ziZS8wkr2G-SG1HtXdV0TqX08D9XrlRCAEXgj9vlUhrsXzFi3_KeEtLZpd2BsDxF1l_VnvzM-OHX2atjki4MKuEK1Gwjq_8GW2W48iwQhimppg-GZlec-tIUa4SQRYOprbysMgj3EcEhZpYfDXVqSbr3MnOF10wAPvOrAPUAls0ydyhP48R4hfWl8zhqutnNWxfWx4AP9WC2utOee-8vgmTSiUFGDJZO-D0eZMC41yq81IgGNK2X1wk-owneTQs5Xj_8XI-mgRkvYHWtv2ulnro3X213yIP0vPG9P5iFi11NlOB_G_YQgeryJYFXurlIAvPg3HYDxiVlijsIJTWkTqEzZpgutMEQegggCaa4V_-aypJ8A4f8Q3wTGnhNpsymfz0cduQ3McBUD5q2Ow1AMImSJ-KXMAKLXI2gRG6tLb__wJ-Jf5dzT5UbAdUjKYhQ3NSCF_L1u5VRlr4VbHR_ugPFkuzfVdjgft1WTxwux_a5B9C-HNvFnCa_D48Xv3C3-lSlnezL6KBJeEz195LsjhqWCQBpcacThRU35YQLaMSQzYUfDzA17qghygfk7Cu2VsxDWZl4CHsAAWnhFky8JT8zZZYWReHQdz8TFuvQ4TiZOG1QDE40nNVMLiMLvs3lblmwyANm5mshQCgk",
            access_token: "",
            refresh_token: "",
            userName: "", userId: "",
        },
        tvChannel: "",
        timeInfo:
            {
                timeData1: "", timeData2: ""
            },
        showOnlinePlay: false
    },

    getters: {
        getUserTv: (state) => {
            if (ROAST_CONFIG.OS_TYPE == 0) {
                // alert("ingetter uid :" + state.userTv2)
                // alert("ingetter uid :" + JSON.stringify(state.userTv2))

                let data = {
                    mac: state.userTv2.mac,
                    version: state.userTv2.ver,
                    uid: state.userTv2.android_id,
                };


                return data
            } else {
                let data = {
                    mac: state.userTv2.mac,
                    uid: state.userTv2.uid,
                    year: state.userTv2.year,
                    isOld: state.userTv2.isOld,
                    ps: state.userTv2.ps,
                    real: state.userTv2.real,
                    model: state.userTv2.model,
                    firmware: state.userTv2.firmware,
                    // IsCompletePrf: "1",
                    version: state.userTv2.year,
                    android_id: state.userTv2.android_id,
                    android_version: state.userTv2.android_version,
                    ver: state.userTv2.ver
                };
                // console.log("getter ---------------data", data)

                return data
            }


            // console.log("getter ---------------2", this.state.userTv2)
            // console.log("getter ---------------3", this.state.userTv2.mac)
        },
        getUserInfo(state) {
            return state.userInfo;
        }
        ,
        getTimeInfo(state) {
            return state.timeInfo;
        }
        ,
        getTcChannel(state) {
            return state.tvChannel;
        },
        getMenu(state) {
            return state.menuInfo
        },
        getOnlinePlay(state) {
            return state.showOnlinePlay
        },
    }
    ,


    mutations: {

        setUserTvW(state, param) {
            // alert("in setUserTv : " + param)
            // alert("in setUserTv : " + JSON.stringify(param))
            state.userTv2 = param
        },

        setUserInfo(state, param) {

            // console.log(param.expires_in)
            state.userInfo.expires_in = param.expires_in;
            state.userInfo.access_token = param.access_token;
            state.userInfo.refresh_token = param.refresh_token;


            // console.log( state.userInfo.access_token)
        }
        ,
        setUserNameID(state, data) {
            state.userInfo[data["item"]] = data["amount"];
        }
        ,
        setTimeInfo(state, data) {
            state.timeInfo[data["item"]] = data["amount"];
        }
        ,
        setTvChannel(state, index) {
            state.tvChannel = index;
        },
        setMenu(state, info) {
            state.menuInfo.id = info.id
            state.menuInfo.name = info.name
            state.menuInfo.des = info.des
            state.menuInfo.rout = info.rout
        },
        setOnlinePlay(state, index) {
            state.showOnlinePlay = index
        },
    }
    ,

    modules: {}
}
