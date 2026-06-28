import axios from 'axios';
import {ROAST_CONFIG} from '../js/config';

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default {
    code(phone) {
        let Url = ROAST_CONFIG.main_api_url + 'code'
        let Orgdata = {'mobile': phone}
        // console.log("000000000", Orgdata)
        return axios({
            method: "POST",
            url: Url,
            data: Orgdata,
        }).then(response => {
            let data = response['data'];
            return data
        }).catch(response => {
            // console.log("code catch", response)
        });
    },
    signup(key, code, mobile, mac, uid, version, mac_lan, tv_type) {
        let Url = ROAST_CONFIG.main_api_url + 'signup'
        let Orgdata = ''
        // console.log('key', key, 'code', code, 'mobile', mobile, 'mac', mac, 'uid', uid, 'version', version, 'mac_lan', mac_lan, 'tv_type', tv_type)

        if (ROAST_CONFIG.OS_TYPE == 0) {//android
            Orgdata = {
                'key': key,
                'code': code,
                'mobile': mobile,
                'mac': mac,
                'version': ""+version+"",
                "tv_type": tv_type,
                'mac_lan': mac_lan
            }
        } else {
            Orgdata = {
                'key': key,
                'code': code,
                'mobile': mobile,
                'mac': mac,
                'uid': uid,
                'version': version,
                "tv_type": tv_type,
                'mac_lan': mac_lan
            }
        }


        return axios({
            method: "POST",
            url: Url,
            data: Orgdata,
        }).then(response => {
            let data = response;
            return data
        }).catch(response => {
            // console.log("signup catch", response)
            return response
        });
    },

    scores() {
        let Url = ROAST_CONFIG.main_api_url + 'ranking';
        return axios({
            method: "POST",
            url: Url,
        }).then(response => {
            let data = response['data'];
            return data
        }).catch(response => {
            // console.log("signup catch", response)
        });
    },

    // ranking() {
    //     let Url = 'https://samyar.rasgames.ir/pishbini/api/ranking';
    //     return axios({
    //         method: "POST",
    //         url: Url,
    //         headers: {"Authorization": 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjdkZWU3Nzg4ZmZkNGRhMjAxMzlmZWJjYWFlODJmNmJlYmFiODViMGVjMTkxMmU1MTY3MDgwZGVlZTNkNjhhZGNlYzM3YmRjZGYzYzVkODI5In0.eyJhdWQiOiIxIiwianRpIjoiN2RlZTc3ODhmZmQ0ZGEyMDEzOWZlYmNhYWU4MmY2YmViYWI4NWIwZWMxOTEyZTUxNjcwODBkZWVlM2Q2OGFkY2VjMzdiZGNkZjNjNWQ4MjkiLCJpYXQiOjE2NjY1OTQ3NzcsIm5iZiI6MTY2NjU5NDc3NywiZXhwIjoxNjY2NjgxMTc3LCJzdWIiOiIyNzY1Iiwic2NvcGVzIjpbXX0.eci1dxnh2IMk-IxwQ3GaxSzrknOczbS7kXdWr53G1pG0ty7__13tZNBPl6FormhKIEXT07bnryLYH7j1jqhcrA166vbbYe-prPEAETRSPjDCJe2KxFXKzJnwEZnFvBmIwR4AxFWu6-z0srvVfJlCDXiMIrHriOJjZPfcUL42Gt1uDDxXCn4JkPaowFAzmCURV1bS_dh3WcHVN_aDAevtamQbVYkWobYW61tq7amz4wjqn0zXN2YcBxHmFyeNPQ7PZSNsMDbGWkB9jhIiU1ZOIPRMxv0oLY8eeTNIXjyOc3yoDYdeIVDAFnpO4qPOk6XRDcOoQrBz8yVUo_d4uh7c4Lc0t1NR1ATDOgx4i2msLKfE1PxErBoxVsKE3pykNKw1YSBSJ5qxAOg1P_mQZ-rvD-yuyHhYRWi5CX0vbOUZjJyuUq-vxP3ORfoei5WY-gFPCqolO8xAAFF-JYrrFcJJh7eYLucKkkjTQUXhDumbDuu79guHhqgApt4REVh1_tXuCWylMo-4zbcvBRKMBsDvmr3pL2Ei_DLR5rFP4mRLkTWOx0JB4aynGrraGk7e2R05esraYq3LRP-yMrWiieElinnw0SW6ktrGPtaHOyTromG-QxdvcBsaEOlVvhTg93ctqzJFByykOclc0oPx9kwgUS040lWFCswYu8ugoqtp-mY'}
    //     }).then(response => {
    //         let data = response['data'];
    //         return data
    //     }).catch(response => {
    //         console.log("signup catch", response)
    //     });
    // },
    winners() {
        let Url = ROAST_CONFIG.main_api_url + 'winner/daily'
        return axios({
            method: "GET",
            url: Url,
        }).then(response => {
            let data = response['data'];
            return data
        }).catch(response => {
            // console.log("winner catch", response)
        });
    },
    userScore() {
        let Url = ROAST_CONFIG.main_api_url + 'user/score'
        return axios({
            method: "GET",
            url: Url,
        }).then(response => {
            let data = response['data'];
            return data
        }).catch(response => {
            // console.log("user catch", response)
        });
    },
    matches() {
        let Url = ROAST_CONFIG.main_api_url + 'match/daily'
        return axios({
            method: "GET",
            url: Url,
        }).then(response => {
            let data = response['data'];
            return data
        }).catch(response => {
            // console.log("matches catch", response)
        });
    },
    predict(data) {
        let Url = ROAST_CONFIG.main_api_url + 'forecast'
        return axios({
            method: "POST",
            url: Url,
            data: data,
        }).then(response => {
            let data = response['data'];
            return data
        }).catch(response => {
            // console.log("predict catch", response)
        });
    },

    allteams() {
        let Url = ROAST_CONFIG.main_api_url + 'allteams'

        return axios({
            method: "GET",
            url: Url,
        }).then(response => {
            let data = response['data'];
            return data
        }).catch(response => {
            // console.log("code catch", response)
        });
    },


    champForecast(id) {
        let Url = ROAST_CONFIG.main_api_url + 'forecast/champ'
        let Orgdata = {'team_id': id,}
        return axios({
            method: "POST",
            url: Url,
            data: Orgdata
        }).then(response => {
            let data = response['data'];
            return data
        }).catch(response => {
            // console.log("code catch", response)
        });
    },

    aparatSportVideoList() {
        return axios({
            method: "GET",
            url: ROAST_CONFIG.APARAT_SPORT_VIDEO_LIST_URL,
        }).then(response => response['data'] || {}).catch(response => {
            // console.log("aparatSportVideoList catch", response)
            return {}
        });
    },

    aparatLeagueMatchesByType(sectionType) {
        return axios({
            method: "GET",
            url: ROAST_CONFIG.APARAT_SPORT_LEAGUE_URL,
        }).then(response => {
            let data = response['data'];
            let attributes = data && data.data && data.data.attributes ? data.data.attributes : [];
            let section = attributes.find(item => item.type === sectionType);
            return section && section.data ? section.data : []
        }).catch(response => {
            // console.log("aparatLeagueMatchesByType catch", sectionType, response)
            return []
        });
    },

    aparatLiveMatches() {
        return this.aparatLeagueMatchesByType('live_matches');
    },

    aparatFirstLiveMatchUuid() {
        const extractUuidFromUrl = (url) => {
            if (!url) return '';
            let match = url.match(/\/m\/([A-Za-z0-9]+)/);
            return match ? match[1] : '';
        };
        const findUuidInList = (list) => {
            if (!Array.isArray(list)) return '';
            for (let i = 0; i < list.length; i++) {
                if (list[i] && list[i].uuid) return list[i].uuid;
                let fromUrl = extractUuidFromUrl(list[i] && list[i].url);
                if (fromUrl) return fromUrl;
            }
            return '';
        };
        const liveSectionKeys = ['live_matches', 'live_match', 'playing_matches', 'aparat_sport_live'];

        return this.aparatSportVideoList().then(listData => {
            for (let k = 0; k < liveSectionKeys.length; k++) {
                let uuid = findUuidInList(listData[liveSectionKeys[k]]);
                if (uuid) return uuid;
            }
            let keys = Object.keys(listData || {});
            for (let i = 0; i < keys.length; i++) {
                let uuid = findUuidInList(listData[keys[i]]);
                if (uuid) return uuid;
            }
            return this.aparatLiveMatches().then(matches => {
                return matches.length > 0 && matches[0].uuid ? matches[0].uuid : '';
            });
        });
    },

    aparatMatchByUuid(uuid) {
        if (!uuid) return Promise.resolve(null);
        let Url = ROAST_CONFIG.APARAT_MATCH_WITH_UUID_URL + encodeURIComponent(uuid);
        return axios({
            method: "GET",
            url: Url,
        }).then(response => response['data'] || null).catch(response => {
            // console.log("aparatMatchByUuid catch", response)
            return null;
        });
    },

    aparatUpcomingMatches() {
        return this.aparatLeagueMatchesByType('upcoming_matches');
    },

    hamsamLives() {
        return axios({
            method: 'GET',
            url: ROAST_CONFIG.HAMSAM_LIVES_URL,
        }).then(response => {
            const body = response['data'] || {}
            if (body.status === 'success' && Array.isArray(body.data)) {
                return body.data
            }
            return []
        }).catch(response => {
            // console.log('hamsamLives catch', response)
            return []
        });
    },


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
