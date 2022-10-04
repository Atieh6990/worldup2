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
    uid: "KLpr4eeerdddd33Q22",
    year: "17",
    isOld: "0",
    ps: "dummy value",
    real: "dummy value, eg. UN65JS9500",
    model: "dummy value",
    firmware: "dummy value",
    // IsCompletePrf: "1",
    version: "17"
}


export default {

    methods: {

        UserTVInfo() {
            let urlParams;
            let url_string = window.location.href;
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
                    var real = webapis.productinfo.getRealModel();
                    var modelTV = webapis.productinfo.getModelCode();
                    var firmware = webapis.productinfo.getFirmware();
                    var psID = webapis.productinfo.getFirmware();
                    var Duid = webapis.productinfo.getDuid();
                    var year = modelTV.split("_", 1)[0];
                    urlParams = {
                        mac: Duid,
                        uid: Duid,
                        year: year,
                        isOld: 0,
                        ps: psID,
                        real: real,
                        model: modelTV,
                        firmware: firmware,
                        // IsCompletePrf: "1",
                        version: year,
                        android_id: "",
                        android_version: "",
                        ver: ""
                    };
                }
            }
            // console.log('urlParams',urlParams)
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
            let savedToken = '';
            let type = '';
            if (ROAST_CONFIG.DEVELOP_MODE == 1) {

                savedToken = this.getParam(ROAST_CONFIG.FILE_NAME)
                type = 0

                let sendData = {type: type, savedToken: savedToken}
                return sendData
            } else {
                if (ROAST_CONFIG.OS_TYPE == 0) {//android
                    savedToken = window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({
                        type: 'getToken',
                        data: ''
                    }))
                    type = 1

                    let sendData = {type: type, savedToken: savedToken}
                    return sendData
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
                console.log("sare setToken", jsonObj.token, jsonObj.refresh_token, jsonObj.expires_in)
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

            // setTimeout(() => {
            //     console.log(" exitAndroidApp !!!! ")
            //     window.AndroidFunction.minimizeApp();
            // }, 0);
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
                // console.log("loadFile ghable iiiiiiiiiiiiif", isFile)
                if (isFile) {//
                    // console.log("in iiiiiiiiiiiiiiiiiiiiiiiiiiif",_this.FileRead())
                    return _this.FileRead()

                    // return tokenObj
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

        FileWrite(jsonObj) {

            console.log('sare writ', jsonObj)


            var _this = this


            // var json = {
            //     expires_in: (expires_in * 1000) + (new Date).getTime(),
            //     access_token: token,
            //     refresh_token: refresh_token
            // };
            var testFile = documentsDir.createFile(ROAST_CONFIG.FILE_NAME);
            // console.log("++++C++++++++testFile", testFile)
            // json = JSON.stringify(json)


            if (testFile != null) {


                testFile.openStream(
                    "w",
                    function (fs) {
                        fs.write(jsonObj);
                        fs.close();
                        // console.log("what is write?????????",jsonObj)
                    }, function (e) {
                        console.log("Error " + e.message);
                    }, "UTF-8"
                );
            }
        },
        FileRead() {
            // console.log("sare FileRead")
            //  console.log("FileRead0000000000000000000000000000000000000000000000000")
            var _this = this
            var file = documentsDir.resolve(ROAST_CONFIG.FILE_NAME);
            // console.log("FileRead0000000000000000000000000000000000000000000000000", file)

            file.openStream(
                "r",
                function (fs) {

                    var text = fs.read(file.fileSize);

                    fs.close();
                    var data = (text)
                    // console.log("openStream 000000", data)
                    return _this.tokenFind(data)

                }, function (e) {
                    console.log("Error " + e.message);
                }, "UTF-8");

        },

        tokenFind(tk) {

            let type = 2
            let sendData = {type: type, savedToken: JSON.parse(tk)}

            this.$root.$emit("tokenFindInStore", sendData)
            return sendData

        },


        DeleteFile() {
            console.log("DeleteFile0000000000000000000000000000000000000000000000000")
            let _this = this

            function onsuccess(files) {
                console.log("oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo", files)
                for (var i = 0; i < files.length; i++) {
                    if (files[i].name == ROAST_CONFIG.FILE_NAME) {
                        isFile = 1
                        FileSelected = files[i]
                    }

                }
                //    console.log("oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo", _this.isFile)
                if (isFile) {
                    if (!FileSelected.isDirectory) {
                        documentsDir.deleteFile(
                            FileSelected.fullPath,
                            function () {
                                isFile = 0
                                FileSelected = ""
                            }, function (e) {
                                console.log("Error" + e.message);
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
                    console.log("Error" + e.message);
                }, "rw"
            );


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
