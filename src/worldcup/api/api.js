import axios from 'axios';
import {ROAST_CONFIG} from '../js/config';

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default {
    code(phone) {
        let Url = ROAST_CONFIG.API_URL + '/code'
        let Orgdata = {'mobile': phone}
        return axios({
            method: "POST",
            url: Url,
            data: Orgdata,
        }).then(response => {
            let data = response['data'];
            return data
        }).catch(response => {
            console.log("code catch", response)
        });
    },
    signup(key, code, mobile, mac, uid, version) {
        let Url = ROAST_CONFIG.API_URL + '/signup'

        // console.log('key', key, 'code', code, 'mobile', mobile, 'mac', mac, 'uid', uid, 'version', version)
        let Orgdata = {'key': key, 'code': code, 'mobile': mobile, 'mac': mac, 'uid': uid, 'version': version}
        return axios({
            method: "POST",
            url: Url,
            data: Orgdata,
        }).then(response => {
            let data = response['data'];
            return data
        }).catch(response => {
            console.log("signup catch", response)
        });
    },


    groupteams() {
        let Url = 'https://samyar.rasgames.ir/samyarpishbini/api/groupteams';
        return axios({
            method: "POST",
            url: Url,
            headers: {"Authorization": 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjE5ZWYzMTU4NmRkZGViZjE5ZDU1YjY1ZWIwYmFlMDU5Zjg4NmRmNWJmZWRhNzY3ZWM4NDc4M2NkMWIxMmM4YmI3MTMxMzI4N2VlMTNkMmJmIn0.eyJhdWQiOiIxIiwianRpIjoiMTllZjMxNTg2ZGRkZWJmMTlkNTViNjVlYjBiYWUwNTlmODg2ZGY1YmZlZGE3NjdlYzg0NzgzY2QxYjEyYzhiYjcxMzEzMjg3ZWUxM2QyYmYiLCJpYXQiOjE2NjY0MjA4MjgsIm5iZiI6MTY2NjQyMDgyOCwiZXhwIjoxNjY2NTA3MjI4LCJzdWIiOiIyNzY1Iiwic2NvcGVzIjpbXX0.rstV3oulzGbM2x-fOapBoQEuE1EzaKjnl5YUxiU_hg84cNPuUB1kMPfbtGWhndtrOs-Lzn28rpsj93KcYD6NXMLDQTqbHpZrP5s0_cYZx1DBwQOd7iilYN1ldCT4-afIu5YL8RO8Dua87KojwaOg-ohNmTRK2P1RP7WfeZOEAaCeJBXFHVCOk_vt7WLtEgSpApIS5YLixIdXUA6pa6d5jHx3fCXEHbtk_1D8kmvrP53gL7lA1oKX8h1Jj19elADa2ID23p86KmQzzbVKwZJZP2oIrzKp6xuZ9qAXedc_jjiPWkWOQNWIgD-azDHYuKIccsb-s6_M7IysFeDDiLS2ci_OTVi0hysYqhf_aB3kvP48283HUjC4NgVztpnD6oUJ2qAknxzWIqKnr1PhYOgsPa6-CqKNFkPmMMYaPGkpTpfeGaFCcz0d91kIz7Gt4h5XSnMa67HP81EGKhfV_TYB3pBkqpD8JhH2wOQFBAQ6aiBmuct6Tc5nEhGj6qE5jtQTOu0ydnfjrFQomFngbISi1_4GRhddHmvc7eFXZieAcSs6lHvUd7sW3kvdRLgHc7Ibw5pmtei2GcuRC9UNMRuRw0CfN55BG58kiNUeIs5qFWbD9ffz8YBaH17596lErRul7oc2BesaeqLbgcT-usdK7VTboz5v0Le1YSPxfA4XXOk'}
        }).then(response => {
            let data = response['data'];
            return data
        }).catch(response => {
            console.log("signup catch", response)
        });
    },


    //
    // getCurrency(url) {
    //     let Url = url
    //     return axios({
    //         method: "GET",
    //         url: Url,
    //     }).then(response => {
    //         let data = response['data'];
    //         return data
    //     }).catch(response => {
    //         console.log("getCurrency catch")
    //     });
    // },
    //
    // getTime(url) {
    //     let Url = url
    //     return axios({
    //         method: "GET",
    //         url: Url,
    //     }).then(response => {
    //         let data = response['data'];
    //         return data
    //     }).catch(response => {
    //         console.log("getTime catch")
    //     });
    // },
    //
    // getNews() {
    //     return axios({
    //         method: "GET",
    //         url: ROAST_CONFIG.NEWS_URL,
    //     }).then(response => {
    //         let data = response['data'];
    //         return data
    //     }).catch(response => {
    //         console.log("getNews catch")
    //     });
    // },
    // getNewsDetail(id) {
    //     return axios({
    //         method: "GET",
    //         url: ROAST_CONFIG.NEWS_DETAIL + id,
    //     }).then(response => {
    //         let data = response['data'];
    //         return data
    //     }).catch(response => {
    //         console.log("getNewsDetail catch")
    //     });
    // }

}
