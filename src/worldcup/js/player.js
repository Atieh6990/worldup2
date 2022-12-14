export default {
    // VideoPlayer(epg, channellId = '', contentId = '') {
    VideoPlayer() {
        var urlPlayNow = ""
        var player = document.getElementById('av-player');


        /**
         * HTML controls div
         */
            //var controls = config.controls;
        var controls = ""
        /**
         * Fullscreen flag
         * @type {Boolean}
         */
        var isFullscreen = false;

        /**
         * HTML element o display stream properties.
         */
            //var info = config.info;

        var defaultResolutionWidth = 1920;
        // var resolutionWidth = config.resolutionWidth;
        var resolutionWidth = '';

        var playerCoords = {
            x: Math.floor(0 * resolutionWidth / defaultResolutionWidth),
            y: Math.floor(0 * resolutionWidth / defaultResolutionWidth),
            width: Math.floor(1920 * resolutionWidth / defaultResolutionWidth),
            height: Math.floor(1080 * resolutionWidth / defaultResolutionWidth)
        };

        /**
         * 4k flag
         * @type {Boolean}
         */
        var isUhd = false;

        return {
            /**
             * Function to initialize the playback.
             * @param {String} url - content url, if there is no value then take url from config
             */
            open: function (url, baseseek = '') {
                console.log(url);
                /* Create listener object. */
                this.currentTimePlay = 0
                urlPlayNow = url;
                var pPlayer = this
                this.contBackward = 0;
                this.contForward = 0;


                var listener = {
                    onbufferingstart: function () {
                        console.log("Buffering start.");
                    },
                    onbufferingprogress: function (percent) {
                        console.log("Buffering progress data : " + percent);
                    },
                    onbufferingcomplete: function () {
                        console.log("Buffering complete.");

                    },

                    oncurrentplaytime: function (currentTime) {
                        // console.log("Current Playtime : " + currentTime);
                    },
                    onevent: function (eventType, eventData) {
                        console.log("event type: " + eventType + ", data: " + eventData);
                    },
                    onstreamcompleted: function () {
                        console.log("Stream Completed");
                        //clearInterval(window.setPinTIME);

                        this.stop();
                    }.bind(this),
                    onerror: function (eventType) {
                        console.log("event type error : " + eventType);
                    }
                };

                if (!url) {
                    var urlPlayer = '';
                    url = urlPlayer;
                }
                //log('videoPlayer open: ' + url);
                try {

                    webapis.avplay.open(url);
                    webapis.avplay.setDisplayRect(
                        0,
                        0,
                        1920,
                        1080
                    );
                    webapis.avplay.setListener(listener);
                } catch (e) {
                    //  log(e);
                }


            },
            getBaseSeek: function (seek) {
                // seekedTime = seek
            },
            play: function () {

                console.log('play', webapis.avplay.getState())
                //console.log('oftaaaaaaaaaaad too on playyyyyyyyyyyyyyyyyyyyyyyyyyy !!!! gaeedi manooooooooooo')
                //set 4k
                // if (isUhd) {
                //     this.set4K();
                // }


                if (webapis.avplay.getState() === 'IDLE') {
                    webapis.avplay.prepare();
                    webapis.avplay.play();
                } else if (webapis.avplay.getState() === 'PAUSED') {
                    webapis.avplay.play();
                }

                // if (lastPlayPos > 0) {
                //
                //     this.ff(lastPlayPos);
                //     lastPlayPos = 0;
                //
                // }
            },


            /**
             * Function to stop current playback.
             */
            stop: function () {
                webapis.avplay.stop();

                //switch back from fullscreen to window if stream finished playing
                if (isFullscreen === true) {
                    this.toggleFullscreen();
                }
                //clear stream information window
                //info.innerHTML = '';
            },
            /**
             * Function to pause/resume playback.
             * @param {String} url - content url, if there is no value then take url from config
             */
            pause: function (url) {
                /*if (!url) {
                    url = urlPlayNow;
                }*/
                webapis.avplay.pause();
            },
            /**
             * Jump forward 3 seconds (3000 ms).
             */
            ff: function (num) {
                // console.log('FFFF');
                // alert((num / 1000) | 0)
                webapis.avplay.jumpForward(num);
            },
            /**
             * Rewind 3 seconds (3000 ms).
             */
            rew: function (num) {
                console.log('REW');
                webapis.avplay.jumpBackward(num);
            },
            /**
             * Set flag to play UHD content.
             * @param {Boolean} isEnabled - Flag to set UHD.
             */
            setUhd: function (isEnabled) {
                isUhd = isEnabled;
            },
            /**
             * Set to TV to play UHD content.
             */
            set4K: function () {
                webapis.avplay.setStreamingProperty("SET_MODE_4K", "true");
            },
            /**
             * Function to set specific bitrates used to play the stream.
             * In case of Smooth Streaming STARTBITRATE and SKIPBITRATE values 'LOWEST', 'HIGHEST', 'AVERAGE' can be set.
             * For other streaming engines there must be numeric values.
             *
             * @param {Number} from  - Lower value of bitrates range.
             * @param {Number} to    - Higher value of the bitrates range.
             * @param {Number} start - Bitrate which should be used for initial chunks.
             * @param {Number} skip  - Bitrate that will not be used.
             */
            setBitrate: function (from, to, start, skip) {
                var bitrates = '|BITRATES=' + from + '~' + to;

                if (start !== '' && start !== undefined) {
                    bitrates += '|STARTBITRATE=' + start;
                }
                if (to !== '' && to !== undefined) {
                    bitrates += '|SKIPBITRATE=' + skip;
                }

                webapis.avplay.setStreamingProperty("ADAPTIVE_INFO", bitrates);
            },
            /**
             * Function to change current VIDEO/AUDIO/TEXT track
             * @param {String} type  - Streaming type received with webapis.avplay.getTotalTrackInfo(), possible values
             *     are: VIDEO, AUDIO, TEXT.
             * @param {Number} index - Track id received with webapis.avplay.getTotalTrackInfo().
             */
            setTrack: function (type, index) {
                webapis.avplay.setSelectTrack(type, index);
            },
            /**
             * Show information about all available stream tracks on the screen.
             */
            getTracks: function () {
                var trackInfo = webapis.avplay.getTotalTrackInfo();
                var text = 'type of track info: ' + typeof trackInfo + '<br />';
                text += 'length: ' + trackInfo.length + '<br />';
                for (var i = 0; i < trackInfo.length; i++) {
                    text += 'index: ' + trackInfo[i].index + ' ';
                    text += 'type: ' + trackInfo[i].type + ' ';
                    text += 'extra_info: ' + trackInfo[i].extra_info + '<br />';
                }
                //info.innerHTML = text;
            },
            /**
             * Show streaming properties on the screen.
             */
            getProperties: function () {
                var text = 'AVAILABLE_BITRATE: ' + webapis.avplay.getStreamingProperty("AVAILABLE_BITRATE") + '<br />';
                text += 'CURRENT_BANDWIDTH: ' + webapis.avplay.getStreamingProperty("CURRENT_BANDWITH") + '<br />';
                text += 'DURATION: ' + webapis.avplay.getStreamingProperty("DURATION") + '<br />';
                text += 'BUFFER_SIZE: ' + webapis.avplay.getStreamingProperty("BUFFER_SIZE") + '<br />';
                text += 'START_FRAGMENT: ' + webapis.avplay.getStreamingProperty("START_FRAGMENT") + '<br />';
                text += 'COOKIE: ' + webapis.avplay.getStreamingProperty("COOKIE") + '<br />';
                text += 'CUSTOM_MESSAGE: ' + webapis.avplay.getStreamingProperty("CUSTOM_MESSAGE");
                //info.innerHTML = text;
            },
            /**
             * Switch between full screen mode and normal windowed mode.
             */
            toggleFullscreen: function () {
                if (isFullscreen === false) {
                    webapis.avplay.setDisplayRect(0, 0, 1920, 1080);
                    player.classList.add('fullscreenMode');
                    //controls.classList.add('fullscreenMode');
                    isFullscreen = true;
                } else {
                    //log('Fullscreen off');
                    try {
                        webapis.avplay.setDisplayRect(
                            playerCoords.x,
                            playerCoords.y,
                            playerCoords.width,
                            playerCoords.height
                        );
                    } catch (e) {
                        //log(e);
                    }
                    player.classList.remove('fullscreenMode');
                    //controls.classList.remove('fullscreenMode');
                    isFullscreen = false;
                }
            },

            closeVideo() {
                webapis.avplay.close();
            },
            playPause: function () {

                if (webapis.avplay.getState() == "PAUSED" || webapis.avplay.getState() == "READY") {
                    this.play();
                } else if (webapis.avplay.getState() == "PLAYING") {
                    this.pause();
                }
            },


        };
    }
}
