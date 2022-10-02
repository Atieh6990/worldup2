import {ROAST_CONFIG} from '../js/config'

var keyBoardIME;
var isImeFocused;
var isFile = 0;
var FileSelected = "";
var documentsDir = "";
var androidTvDevelop = {
    android_id: 'f24e46cfec5a98e2',
    mac: "44:D8:78:EB:A2:AD",
    android_version: 9,
    model: "SAMTV",
    ver: "1.0"
}
var tizenTvDevelop = {
    mac: "KLpr4eeerdddd33Q22",
    year: "17",
    isOld: "0",
    ps: "dummy value",
    real: "dummy value, eg. UN65JS9500",
    model: "dummy value",
    firmware: "dummy value",
    IsCompletePrf: "1"
}

export default {
    methods: {

        UserTVInfo() {
            let urlParams;
            let url_string = window.location.href;
            console.log(ROAST_CONFIG.OS_TYPE , ROAST_CONFIG.DEVELOP_MODE)
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
                    var real = webapis.productinfo.getRealModel();
                    var modelTV = webapis.productinfo.getModelCode();
                    var firmware = webapis.productinfo.getFirmware();
                    var psID = webapis.productinfo.getFirmware();
                    var Duid = webapis.productinfo.getDuid();
                    var year = modelTV.split("_", 1);
                    urlParams = {
                        mac: Duid,
                        year: year,
                        isOld: 0,
                        ps: psID,
                        real: real,
                        model: modelTV,
                        firmware: firmware,
                        IsCompletePrf: "1"
                    };
                }
            }
            console.log(urlParams)
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
            return params;
        },
        setParam(key, value) {
            localStorage.setItem(key, value);
        },
        clearParam() {
            localStorage.clear();
        },
        getParam(key) {
            return localStorage.getItem(key);
        },
        removeParam: function (key) {
            localStorage.removeItem(key);
        },
        showIme: function (inputName) {
            keyBoardIME = setTimeout(function () {
                // var elIme = document.querySelector('#' + inputName);
                // console.log("inputName")
                var elIme = document.getElementById("" + inputName)
                //document.body.focus();
                elIme.focus();
                // console.log("getFocuse")
                isImeFocused = true;
            }, 500);

        }
        ,
        hideIme: function (inputName) {
            clearTimeout(keyBoardIME);
            setTimeout(() => {
                // var elIme = document.querySelector('#' + inputName);
                // elIme.blur();
                document.getElementById("" + inputName).blur();
                document.body.focus();
                isImeFocused = false;
            }, 500)

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
            let savedToken;
            let type;
            if (ROAST_CONFIG.DEVELOP_MODE == 1) {

                savedToken = this.getParam(ROAST_CONFIG.FILE_NAME)
                type = 0
            } else {
                if (ROAST_CONFIG.OS_TYPE == 0) {//android
                    savedToken = window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({
                        type: 'getToken',
                        data: ''
                    }))
                    type = 1
                } else {//tizen
                    savedToken = this.loadFile()
                    type = 2
                }

            }
            return {type: type, savedToken: savedToken}

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
                this.FileWrite(jsonObj.token, jsonObj.refresh_token, jsonObj.expires_in)
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

            // setTimeout(() => {
            //     console.log(" exitAndroidApp !!!! ")
            //     window.AndroidFunction.minimizeApp();
            // }, 0);
        },


        loadFile() {
            let _this = this

            function onsuccess(files) {

                for (var i = 0; i < files.length; i++) {
                    if (files[i].name == ROAST_CONFIG.FILE_NAME) {
                        isFile = 1
                        FileSelected = files[i]
                    }
                }

                if (_this.isFile) {//
                    return _this.FileRead()
                } else {

                }
            }

            function onerror(error) {
                console.log("The error " + error.message + " occurred when listing the files in the selected folder");
            }

            tizen.filesystem.resolve(
                'documents',
                function (dir) {
                    documentsDir = dir;
                    dir.listFiles(onsuccess, onerror);
                }, function (e) {
                    console.log("Error" + e.message);
                }, "rw"
            );


        },
        FileWrite(token, refresh_token, expires_in) {
            var _this = this


            var json = {
                expires_in: (expires_in * 1000) + (new Date).getTime(),
                access_token: token,
                refresh_token: refresh_token
            };
            var testFile = _this.documentsDir.createFile(ROAST_CONFIG.FILE_NAME);
            //    console.log("++++++++++++testFile", _this.testFile)
            json = JSON.stringify(json)


            if (testFile != null) {


                testFile.openStream(
                    "w",
                    function (fs) {
                        fs.write(json);
                        fs.close();

                    }, function (e) {
                        console.log("Error " + e.message);
                    }, "UTF-8"
                );
            }
        },
        FileRead() {

            var file = documentsDir.resolve(ROAST_CONFIG.FILE_NAME);
            file.openStream(
                "r",
                function (fs) {
                    var text = fs.read(file.fileSize);
                    fs.close();
                    var data = JSON.parse(text)
                    return data
                    // _this.checkTocken(data);
                }, function (e) {
                    console.log("Error " + e.message);
                }, "UTF-8");

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
