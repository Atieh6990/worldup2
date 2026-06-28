import {ROAST_CONFIG} from '../js/config'
import api from '../api/api'
import { buildHamsamPlayPayload, fetchISport6Live } from '../js/hamsamLiveService'
import { saveToken, loadTokenRaw, clearStoredToken, isTokenValid, loadToken, getAccessToken } from '../js/tokenCookie'

var isImeFocused;
var keyBoardIME;
var isFile = 0;
var FileSelected = "";
var documentsDir = "";
var lastPlayVideoSignature = '';
var initialLiveStreamPromise = null;
var initialLiveStreamDone = false;

var androidTvDevelop = {
    // android_id: 'f24e46cfec5a98e2',
    // mac: "44:D8:78:EB:A2:AD",
    // android_version: 9,
    // model: "SAMTV",
    // ver: "1.0",

    mac: "49:D8:78:EB:A5:AD",
    mac_lan: "49:D8:78:EB:A5:AD",
    uid: "",//for andriod is empty
    version: 9,
    tv_type: 1//android
}
var tizenTvDevelop = {
    // mac: "KLpr4eeerdddd33Q22",
    // uid: "KLpr4eeerdddd33Q22",
    // year: "17",
    // isOld: "0",
    // ps: "dummy value",
    // real: "dummy value, eg. UN65JS9500",
    // model: "dummy value",
    // firmware: "dummy value",
    // // IsCompletePrf: "1",
    // version: "17"
    mac: "",//for tizen is empty
    mac_lan: "",//for tizen is empty
    uid: "KLpdvskgn54f",//for andriod is empty
    version: "17",
    tv_type: 0//tizen
}


export default {
    methods: {

        UserTVInfo() {
            let urlParams;
            let url_string = window.location.href;
            // alert('url_string' + url_string)
            // console.log(ROAST_CONFIG.OS_TYPE, ROAST_CONFIG.DEVELOP_MODE)
            if (ROAST_CONFIG.OS_TYPE == 0) {//android

                if (ROAST_CONFIG.DEVELOP_MODE == 1) {
                    urlParams = androidTvDevelop;
                } else {
                    urlParams = this.getUrlParams(url_string);
                }
            } else { // tizen
                if (ROAST_CONFIG.DEVELOP_MODE == 1) {
                    urlParams = tizenTvDevelop
                } else {
                    var modelTV = webapis.productinfo.getModelCode();
                    var Duid = webapis.productinfo.getDuid();
                    var year = modelTV.split("_", 1)[0];
                    urlParams = {
                        mac: "",//for tizen is empty
                        mac_lan: "",//for tizen is empty
                        uid: Duid,//for andriod is empty
                        version: year,
                        tv_type: 0
                    };
                }
            }
            // alert('urlParams'+urlParams)
            return urlParams;
        },
        getUrlParams(url) {
            var params = {};
            var parser = document.createElement('a');
            parser.href = url;
            var query = parser.search.substring(1);
            var vars = query.split('&');
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split('=');
                params[pair[0]] = decodeURIComponent(pair[1]);
            }

            // alert('getUrlParams' + JSON.stringify(params))
            return params;
        },
        setParam(key, value) {
            if (key === 'Tokenw') {
                if (value) {
                    saveToken(value)
                } else {
                    clearStoredToken()
                }
                return
            }
            localStorage.setItem(key, value);
        },
        clearParam() {
            clearStoredToken()
            try {
                const keys = Object.keys(localStorage)
                for (let i = 0; i < keys.length; i++) {
                    if (keys[i] !== 'Tokenw') {
                        localStorage.removeItem(keys[i])
                    }
                }
            } catch (e) {}
        },
        getParam(key) {
            if (key === 'Tokenw') {
                return loadTokenRaw()
            }
            return localStorage.getItem(key);
        },
        removeParam: function (key) {
            if (key === 'Tokenw') {
                clearStoredToken()
                return
            }
            localStorage.removeItem(key);
        },
        checkStoredToken() {
            return isTokenValid(loadToken())
        },
        getBearerToken() {
            return getAccessToken()
        },
        showIme: function (inputName) {
            if (ROAST_CONFIG.OS_TYPE === 0 || ROAST_CONFIG.WEBVIEW_MODE) return

            keyBoardIME = setTimeout(function () {
                var elIme = document.getElementById("" + inputName)
                if (!elIme || !/^(INPUT|TEXTAREA)$/i.test(elIme.tagName)) return
                elIme.focus();
                keyBoardIME = true;
                isImeFocused = true;
            }, 500);
        },

        hideIme: function (inputName) {
            clearTimeout(keyBoardIME);

            if (ROAST_CONFIG.OS_TYPE == 1) {
                var elIme = document.querySelector('#' + inputName);
                document.body.focus();
                elIme.blur();
                isImeFocused = false;
            } else {
                setTimeout(() => {
                    // var elIme = document.querySelector('#' + inputName);
                    // elIme.blur();
                    document.getElementById("" + inputName).blur();
                    document.body.focus();
                    isImeFocused = false;
                }, 500)
            }

        },
        xmlParser(data) {
            let xmlDoc = $.parseXML(data);
            let $xml = $(xmlDoc);
            return $xml;
        },
        reversArray: function (value) {
            return value.slice().reverse();
        },

        getToken: function () {
            let savedToken = '';
            let type = '';
            if (ROAST_CONFIG.DEVELOP_MODE == 1) {

                savedToken = this.getParam(ROAST_CONFIG.FILE_NAME)
                return this.tokenFind(savedToken, 0)
            } else {
                if (ROAST_CONFIG.OS_TYPE == 0) {//android
                    savedToken = window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({
                        type: 'getToken',
                        data: ''
                    }))
                    type = 1
                    //TODO
                    // let sendData = {type: type, savedToken: savedToken}
                    // return sendData
                } else {//tizen
                    return this.loadFile();
                }

            }

        },

        setToken: function (jsonObj) {

            if (ROAST_CONFIG.DEVELOP_MODE == 1) {
                this.setParam(ROAST_CONFIG.FILE_NAME, jsonObj)
                return false
            }

            if (ROAST_CONFIG.OS_TYPE == 0) {//android
                window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({
                    type: ROAST_CONFIG.FILE_NAME,
                    data: jsonObj
                }))
            } else {//tizen
                // console.log("sare setToken", jsonObj.token, jsonObj.refresh_token, jsonObj.expires_in)
                // this.DeleteFile();
                this.FileWrite(jsonObj)
            }

        },
        exitAndroidApp() {
            // alert(" exitAndroidApp !!!! ")
            setTimeout(function () {
                // alert(" exitAndroidApp in setTimeout!!!! ")
                // alert(window.ReactNativeWebView)
                window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({
                    type: 'exit',
                    data: ''
                }))
            }, 100);

        },

        loadFile() {
            let _this = this

            // console.log("loadFile", ROAST_CONFIG.FILE_NAME)

            function onsuccess(files) {

                for (var i = 0; i < files.length; i++) {
                    // console.log(i, files[i].name)
                    if (files[i].name == ROAST_CONFIG.FILE_NAME) {
                        isFile = 1
                        FileSelected = files[i]
                    }
                }
                // console.log("loadFile ghable iiiiiiiiiiiiif", isFile,FileSelected)
                if (isFile) {
                    return _this.FileRead()
                } else {

                }
            }

            function onerror(error) {
                // console.log("The error " + error.message + " occurred when listing the files in the selected folder");
            }

            tizen.filesystem.resolve(
                'documents',
                function (dir) {
                    documentsDir = dir;
                    dir.listFiles(onsuccess, onerror);
                }, function (e) {
                    // console.log("Error" + e.message);
                }, "rw"
            );


        },

        FileWrite(jsonObj) {

            // console.log('sare writ', jsonObj)
            var testFile = documentsDir.createFile(ROAST_CONFIG.FILE_NAME);
            if (testFile != null) {
                testFile.openStream(
                    "w",
                    function (fs) {
                        fs.write(jsonObj);
                        fs.close();
                        // console.log("what is write?????????", jsonObj)
                    }, function (e) {
                        // console.log("Error " + e.message);
                    }, "UTF-8"
                );
            }
        },
        FileRead() {
            var _this = this
            var file = documentsDir.resolve(ROAST_CONFIG.FILE_NAME);
            // console.log("FileRead0000000000000000000000000000000000000000000000000", file)

            file.openStream(
                "r",
                function (fs) {

                    var text = fs.read(file.fileSize);

                    fs.close();
                    var data = (text)

                    return _this.tokenFind(data, 2)

                }, function (e) {
                    // console.log("Error " + e.message);
                }, "UTF-8");

        },

        tokenFind(tk, tkType) {

            let type = tkType
            let sendData = {type: type, savedToken: JSON.parse(tk)}
            this.$root.$emit("tokenFindInStore", sendData)
            return sendData

        },


        DeleteFile() {
            // console.log("DeleteFile0000000000000000000000000000000000000000000000000")
            let _this = this

            function onsuccess(files) {
                // console.log("oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo", files)
                for (var i = 0; i < files.length; i++) {
                    if (files[i].name == ROAST_CONFIG.FILE_NAME) {
                        isFile = 1
                        FileSelected = files[i]
                    }

                }
                // console.log("_this.isFile", isFile, FileSelected)
                if (isFile) {
                    if (!FileSelected.isDirectory) {
                        documentsDir.deleteFile(
                            FileSelected.fullPath,
                            function () {
                                isFile = 0
                                FileSelected = ""
                                // console.log("done!!!!")
                            }, function (e) {
                                // console.log("Error" + e.message);
                            });
                    }
                } else {

                }
            }

            function onerror(error) {
                //       console.log("The error " + error.message + " occurred when listing the files in the selected folder");
            }

            tizen.filesystem.resolve(
                'documents',
                function (dir) {

                    _this.documentsDir = dir;
                    dir.listFiles(onsuccess, onerror);


                    //   CompressPath = dir.path + compressFileName;
                }, function (e) {
                    // console.log("Error" + e.message);
                }, "rw"
            );


        },
        handleExit() {
            // (ROAST_CONFIG.OS_TYPE == 0) ? (this.exitAndroidApp()) : (tizen.application.getCurrentApplication().exit())
            (ROAST_CONFIG.OS_TYPE == 0) ? (this.exitAndroidApp()) : ('');
        },


        fullScreenVideo(status) {
            setTimeout(function () {
                window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({
                    type: "fullscreen",
                    data: status
                }))
            }, 100)
        },


        checkFullScreen() {
            // this.$root.$emit('doFullScreenVideo' , JSON.stringify( { type: 'doFullScreenVideo', data: false }))

            setTimeout(function () {
                window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({
                    type: "checkFullScreen",
                    data: ''
                }))
            }, 100)
        },

        sendPlayVideoToReact(payload) {
            const messageText = payload.message != null ? payload.message : ''
            const signature = (payload.video || '') + '|' + messageText
            if (signature === lastPlayVideoSignature) return
            lastPlayVideoSignature = signature
            const message = {
                type: 'playVideo',
                data: {
                    video: payload.video || '',
                    poster: payload.poster || '',
                    message: messageText,
                }
            }
            // console.log('[ReactNative] postMessage playVideo:', message)
            setTimeout(function () {
                window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify(message))
            }, 200);
        },

        playLiveStream(uuid) {
            let _self = this;
            return api.aparatMatchByUuid(uuid).then(function (match) {
                if (!match || !match.m3u8) {
                    // console.log('playLiveStream: m3u8 not found', uuid);
                    return null;
                }
                let payload = {
                    video: match.m3u8,
                    poster: match.thumb_website || '',
                    uuid: match.uuid || uuid,
                };
                _self.$root.$emit('liveStreamPayload', payload);
                if (ROAST_CONFIG.OS_TYPE == 0) {
                    _self.sendPlayVideoToReact(payload);
                }
                return payload;
            });
        },

        playHamsamLiveStream(live) {
            if (!live || !live.link) {
                // console.log('playHamsamLiveStream: link not found');
                return Promise.resolve(null);
            }
            const payload = buildHamsamPlayPayload(live);
            // console.log('[initialLiveStream] hamsam live item:', live)
            // console.log('[initialLiveStream] play payload:', payload)
            this.$root.$emit('liveStreamPayload', payload);
            if (ROAST_CONFIG.OS_TYPE == 0 || (typeof window !== 'undefined' && window.ReactNativeWebView)) {
                this.sendPlayVideoToReact(payload);
            }
            return Promise.resolve(payload);
        },

        loadInitialLiveStream(uuid) {
            if (!uuid && initialLiveStreamPromise) {
                return initialLiveStreamPromise
            }
            const request = (uuid
                ? this.playLiveStream(uuid)
                : fetchISport6Live().then((live) => this.playHamsamLiveStream(live))
            ).then(function (result) {
                if (!uuid) initialLiveStreamDone = true
                return result
            });
            if (!uuid) {
                initialLiveStreamPromise = request
            }
            return request
        },


    },
    filters: {
        substr: function (value, count) {
            // console.log("value",value)
            if (value != undefined) {
                if (value.length > count) {
                    return value.substring(0, count) + "...";
                } else {
                    return value;
                }
            }
        },

    }
}
