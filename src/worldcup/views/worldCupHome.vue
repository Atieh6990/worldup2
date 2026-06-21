<template>
  <div class="routParent" :class="{ webviewLayout: isWebViewMode }">

    <videoPlayer ref="player" v-if="showInternalPlayer"></videoPlayer>

    <div v-show="!showOnlinePlay" class="nestedRoutParent">

      <div class="nestedRoutBackground appGlassBg"></div>
      <loading v-if="loading == true && osType == 0"></loading>
<!--      <loading v-if="loading == true"></loading>-->
      <router-view :key="$route.fullPath" ref="routeview" class="nestedRoutContent"></router-view>

    </div>

  </div>
</template>

<script>
import videoPlayer from '../components/video/videoPlayer'
import func from '../mixins/mixin'
import {mapGetters, mapMutations, mapActions} from 'vuex'
import {ROAST_CONFIG} from "../js/config";
import router from '../router/index'
import axios from 'axios'
import loading from '../components/loading/loading'

export default {
  name: "worldCupHome",
  components: {videoPlayer, loading},
  mixins: [func],
  computed: {
    isWebViewMode() {
      return ROAST_CONFIG.WEBVIEW_MODE
    },
    showInternalPlayer() {
      return !this.showPlayer && !this.isWebViewMode
    },
  },
  data() {
    return {
      showPlayer: ROAST_CONFIG.DEVELOP_MODE,
      currentName: 'menuRout',
      loading: false,
      getResponse: 0,
      showOnlinePlay: this.getOnlinePlay(),
      osType: ROAST_CONFIG.OS_TYPE,

    }
  },
  // computed: { // چت آنلاین - غیرفعال
  //   computedSocket() {
  //     return this.getSocketW();
  //   }
  // },
  // watch: {
  //   computedSocket: function (val, oldVal) {
  //     this.onSocket(this.getSocketW())
  //   }
  // },
  created() {
    if (ROAST_CONFIG.OS_TYPE) {
      this.$root.$emit('sideMenu_deactive');
      this.$root.$emit('sideMenu_hide');
      this.$root.$emit('leftside_hide');
      this.$root.$emit('header_hide');
    }
    router.beforeEach((to, from, next) => {
      this.currentName = to.name;
      if (this.currentName == 'menuRout') {

        this.setMenu({id: '', name: '', des: '', rout: ''})

      }
      next();
    });
    setTimeout(() => {
      this.setUserTvW(this.UserTVInfo())
      this.setTvChannel(ROAST_CONFIG.TV_CHANNEL);
    }, 50);
    this.manageInterceptor()
    this.$root.$on("tokenFindInStore", data => {
      this.$refs.routeview.manageTokenGet(data);//baraye local & tizen miad inja vali baraye andriod event sader mishe(PostMessages)
    })

    this.$root.$on("registerData", (data) => {

      this.$refs.routeview.manageRegisterData(data)
    });

    this.$root.$on("playLiveStream", (uuid) => {
      this.loadInitialLiveStream(uuid);
    });

    // چت آنلاین - غیرفعال
    // this.$root.$on("press_submit", () => {
    //   this.$refs.routeview.sendMessage()
    // })



  },

  mounted() {
    this.loadInitialLiveStream();
  },

  methods: {

    ...mapMutations(['setUserTvW', "setTvChannel", "setMenu", "setOnlinePlay"]),
    // "disconnectSocketW" - چت آنلاین - غیرفعال
    ...mapGetters(["getOnlinePlay",'getMenu']),
    // "getSocketW", "getUserInfo" - چت آنلاین - غیرفعال
    manageTokenGet(data) {
      this.$refs.routeview.manageTokenGet(data)
    },

    // onchangeChatInp(inp){ // چت آنلاین - غیرفعال
    //   this.$refs.routeview.onChange(inp);
    // },
    keysAllowed() {
      return this.loading == false || ROAST_CONFIG.DEVELOP_MODE == 1
    },
    up() {
      if(this.osType == 0){
        if (this.keysAllowed()){
          this.$refs.routeview.up();
        }
      }else{
        this.$refs.routeview.up();
      }

    },
    down() {

      if(this.osType == 0){
        if (this.keysAllowed()){
          this.$refs.routeview.down();
        }
      }else{
        this.$refs.routeview.down();
      }


    },
    left() {
      if(this.osType == 0){
        if (this.keysAllowed()){
          this.$refs.routeview.left();
        }
      }else{
        this.$refs.routeview.left();
      }

    },
    right() {
      if(this.osType == 0){
        if (this.keysAllowed()){
          this.$refs.routeview.right();
        }
      }else{
        this.$refs.routeview.right();
      }

    },
    enter() {

      // console.log("enter worldcuphome" + this.osType , this.loading , this.$route.name)
      if (this.osType == 0 ) {

        if (this.keysAllowed()){

          if(this.$route.name == 'menuRout'){
            if(ROAST_CONFIG.DEVELOP_MODE == 1){//age mode develop hastesh enter too local kar kone.
              this.$refs.routeview.enter();
              return false
            }
            this.checkFullScreen();//just android ke event sader kone
          }else{
            this.$refs.routeview.enter();
          }


        }

      }else{
        if (this.showOnlinePlay) {

          this.setMenu({id: '', name: '', des: '', rout: ''});
         // this.$router.replace({path:'/worldCupHome/menuRout'});
          this.$router.go(-1);
          this.setOnlinePlay(false);
          // if (this.osType == 0)
          //   setTimeout(function () {
          //     window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({
          //       type: "fullscreen",
          //       data: false
          //     }))
          //   }, 200);
        } else {
          this.$refs.routeview.enter();
        }
      }




    },
    back() {
      // console.log('back', this.currentName , this.$route.name)
      //
      if(this.$route.name == 'onlinePlay'){
        if (this.showOnlinePlay) {
          this.setMenu({id: '', name: '', des: '', rout: ''});
          this.$router.replace({path:'/worldCupHome/menuRout'});
          this.setOnlinePlay(false);
          return false
        }
      }

      if (ROAST_CONFIG.OS_TYPE && this.$route.name == 'menuRout') {
        this.$root.$emit('sideMenu_show');
        this.$root.$emit('leftside_show');
        this.$root.$emit('header_show');
        if(!ROAST_CONFIG.DEVELOP_MODE && this.$refs.player){
          this.$refs.player.stop()
        }


      }


      // چت آنلاین - غیرفعال
      // if (this.currentName == 'Pm') {
      //   this.disconnectSocketW();
      // }

      if (!ROAST_CONFIG.OS_TYPE && this.$route.name == "menuRout") {
        this.handleExit()
      } else {
        this.$router.replace({path:'/worldCupHome/menuRout'});
        // this.$router.go(-1);
      }

    },
    done() {
    },
    cancel() {
      if(ROAST_CONFIG.OS_TYPE){
        this.$refs.routeview.cancel();
      }
    },
    showNumber(num) {
      const view = this.$refs.routeview
      if (view && typeof view.showNumber === 'function') {
        view.showNumber(num)
      }
    },
    exit() {
      this.handleExit();
    },
    numberShow(num) {
      this.$refs.routeview.showNum(num)
    },
    // onSocket(socket) { // چت آنلاین - غیرفعال
    //
    //   socket.on("disconnect", (data) => {
    //     console.log('disconnect ->', data);
    //   });
    //   socket.on("connect_error", (err) => {
    //     console.log('message ->', err.message, 'data ->', err.data);
    //     this.disconnectSocketW();
    //     this.$refs.routeview.reconnectSocket()
    //   });
    //   socket.on("get_name", (data) => {
    //     console.log('get_name', data);
    //     this.$refs.routeview.hasNameBefore(data)
    //   })
    //   socket.on("set_name", (data) => {
    //     console.log('set_name', data);
    //     this.$refs.routeview.manageSetName(data)
    //   })
    //   socket.on("join_in_room", (data) => {
    //     console.log('join_in_room', data);
    //     this.$refs.routeview.canJoinRoom(data)
    //   })
    //   socket.on("room_chats", (data) => {
    //     console.log('room_chats', data)
    //     this.$refs.routeview.chatList(data)
    //   })
    //   socket.on("send_chat", (data) => {
    //     console.log('send_chat', data)
    //     this.$refs.routeview.receivedMessage(data)
    //   });
    //   socket.on("user_detail", (data) => {
    //     console.log('user_detail', data)
    //     this.$refs.routeview.saveUserChatDetail(data)
    //   })
    //   socket.on("typing", (data) => {
    //     console.log('typing', data)
    //   })
    // },
    manageInterceptor() {
      axios.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ` + this.getBearerToken();
        this.getResponse = 0
        this.loading = true;
        return config
      }, error => {
        this.loading = false;
        return Promise.reject(error)
      });
      axios.interceptors.response.use((response) => {
        this.loading = false;
        this.getResponse = 1
        return response;
      }, error => {
        this.loading = false;
        if (typeof error.response == "object") {//TODO
          if (error.response.status == 401) {

            this.setParam("Tokenw", "")
            this.$router.push('/worldCupHome/login/')

          }
        }
      })
    },

    exitFullscreenAndroid() {
      this.setMenu({id: '', name: '', des: '', rout: ''});
      this.$router.push('/worldCupHome/menuRout');
      this.setOnlinePlay(false);
      this.fullScreenVideo(false)

    },

  }
}
</script>

<style scoped>
@import "../styles/bootstrap.min.css";

.routParent {
  position: fixed;
  top: 0px;
  right: 0px;
  width: 1920px;
  direction: rtl;
  display: flex;
  display: -webkit-flex !important;
  height: 100%;

}

.nestedRoutParent {
  overflow: hidden;
  height: 100%;
  width: 350px;
  top: 0px;
  border-radius: 16px;
  position: relative;
  box-shadow: 0px 4px 20px 0px #00000073;
  z-index: 10000000;
}

.nestedRoutBackground {
  height: 1080px;
  width: 350px;
  right: 0px;
  top: 0px;
  position: absolute;
  z-index: 0;
}

.nestedRoutContent {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  z-index: 1;
}

:focus {
  outline: -webkit-focus-ring-color auto 0px !important;
}

.simple-keyboard {
  max-width: 350px !important;
  position: absolute;
  left: 0px !important;
  direction: ltr !important;
}

.iScrollLoneScrollbar {
  right: 0px !important;
}

@font-face {
  font-family: 'BYekan';
  font-weight: normal;
  font-style: normal;
  /*font-size: 18px;*/
  src: url('../assets/font/BYekan.ttf');
}

body, input, select, label, div, span, p {
  font-family: "BYekan" !important;
}

:focus {
  outline: -webkit-focus-ring-color auto 0px !important;
}

.hg-theme-default .hg-row {
  display: -webkit-flex !important;;
}

.hg-row {
  display: -webkit-flex !important;;
}
</style>
