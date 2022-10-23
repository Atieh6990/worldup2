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
            headers: {"Authorization": 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjUwNmZmMmFiYzdhOGZlMTdiZmE0ZTkxNGQwZjAyN2Q4MGMzYzA1NTlmYzhkOTUwOTQ2MGY3NWY2ZTVjYWUyZjVjNDNjZjA3Njc5ZTg3YjgyIn0.eyJhdWQiOiIxIiwianRpIjoiNTA2ZmYyYWJjN2E4ZmUxN2JmYTRlOTE0ZDBmMDI3ZDgwYzNjMDU1OWZjOGQ5NTA5NDYwZjc1ZjZlNWNhZTJmNWM0M2NmMDc2NzllODdiODIiLCJpYXQiOjE2NjY1MDc4MjcsIm5iZiI6MTY2NjUwNzgyNywiZXhwIjoxNjY2NTk0MjI3LCJzdWIiOiIyNzY1Iiwic2NvcGVzIjpbXX0.Bz266UseAI7Sc-hwaLRecKJKbtXR5r9eDG0lbbqQE38MZetBghlo55RZxYKYJN5iNQ-BuAHvmrA9Y5PmxmcLqN7lkq5mNLBuP7Gxttt7mG5evA_i2XWDMHP_FSJQ0rdOuDGMmDCmsYsrvJ0pVA1ZLK9LRbxBiWqRUJ6WKp0greYIT21FxNwfmDlYQ6xmpGRb_GL9txR6pYJveMmmVVJsTXtNGA8BipWWI28Dcvfl66iueOcwWvvlw27pAvA5PO9seikJfBPFnP6V7u8jM6sT7B9EpMHd7xGBd0PkQQA4tp6cGsRV3SUsDBY7oU-sfRnvcz4Ge2GwDbbZxpXZdHn4DHA7GDTjemUCiSGtggiXCjq-jx9hk2vyrKZ9ZRlbjWCbTzF_d7BYmbHa2mS5uE3HesuZ2udbTJe4td-GwCX14tOLPxN6Yzj7cI0X6hb8xpBp6YNT0XaDny8R_llHIHRiWY3PIEkHDyPU4qPG-hAukgUvl6aaimAymlrMXLoAqMX_B6kUC2tg_NOC_j9u6tgZcfjwqQdNe22z0zjle3Px3E7i_ih33o9bace5tECZFtRwwr6geKfzxhxkMkYWwrDtNMcU-wj89co_y-A-mrymFgmHaI_bj_T-pcYHV6UKue1DOMozyJ9RCKQLUhveqMkwxM61Vz3W0eTOlwHNat0QzZs'}
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
