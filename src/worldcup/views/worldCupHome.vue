<template>
  <div class="routParent">

    <videoPlayer v-if="!showPlayer"></videoPlayer>

    <div v-show="!showOnlinePlay" class="nestedRoutParent">
      <div class="nestedRoutBackground"></div>
      <routHeader></routHeader>
      <router-view :key="$route.fullPath" ref="routeview"></router-view>

    </div>


  </div>
</template>

<script>
import videoPlayer from '../components/video/videoPlayer'
import func from '../mixins/mixin'
import {mapMutations, mapGetters} from 'vuex'
import {ROAST_CONFIG} from "../js/config";
import router from '../router/index'
import axios from 'axios'
import routHeader from "../components/header/header";

export default {
  name: "worldCupHome",
  components: {videoPlayer, routHeader},
  mixins: [func],
  data() {
    return {
      showPlayer: ROAST_CONFIG.DEVELOP_MODE,
      currentName: 'menuRout',
      loading: false,
      getResponse: 0,
      showOnlinePlay: this.getOnlinePlay(),
      osType: ROAST_CONFIG.OS_TYPE
    }
  },
  computed: {
    computedSocket() {
      return this.getSocket();
    }
  },
  watch: {
    computedSocket: function (val, oldVal) {
      this.onSocket(this.getSocket())
    }
  },
  created() {
    router.beforeEach((to, from, next) => {
      this.currentName = to.name;
      console.log("this.currentName", this.currentName)


      if ( this.currentName == 'menuRout') {

        this.setMenu({id: '', name: '', des: '', rout: ''})

      }
      next();
    });
    setTimeout(() => {
      this.setUserTv(this.UserTVInfo())
      this.setTvChannel(ROAST_CONFIG.TV_CHANNEL);
    }, 50)
    // this.manageInterceptor()
    this.$root.$on("tokenFindInStore", data => {
      // console.log('tokenFindInStore', data)
      this.$refs.routeview.manageTokenGet(data);//baraye local & tizen miad inja vali baraye andriod event sader mishe(PostMessages)
    })
    this.$root.$on("registerData", (data) => {
      // alert("in registerData !!!"+data)
      this.$refs.routeview.manageRegisterData(data)
    });
    this.$root.$on("press_submit", () => {
      this.$refs.routeview.sendMessage()
    })

  }, activated() {
    if (ROAST_CONFIG.OS_TYPE) {
      this.$root.$emit('sideMenu_deactive');
      this.$root.$emit('sideMenu_hide');
      this.$root.$emit('leftside_hide');
      this.$root.$emit('header_hide');
    }
  },
  methods: {

    ...mapMutations(['setUserTv', "setTvChannel", "disconnectSocket", "setMenu", "setOnlinePlay"]),
    ...mapGetters(["getSocket", "getUserInfo", "getOnlinePlay"]),
    manageTokenGet(data) {
      this.$refs.routeview.manageTokenGet(data)
    },


    up() {
      this.$refs.routeview.up();
    },
    down() {
      this.$refs.routeview.down();
    },
    left() {
      this.$refs.routeview.left();
    },
    right() {
      this.$refs.routeview.right();
    },
    enter() {

      if (this.showOnlinePlay) {
        console.log("----------")
        this.setOnlinePlay(false);
        this.setMenu({id: '', name: '', des: '', rout: ''});
        this.$router.push('/worldCupHome/menuRout');
        if (this.osType == 0)
          setTimeout(function () {
            window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({
              type: "fullscreen",
              data: false
            }))
          }, 200);

      } else
        this.$refs.routeview.enter();
    },
    back() {
      // console.log('back', this.currentName)

      if (ROAST_CONFIG.OS_TYPE && this.$route.name == 'menuRout') {
        this.$root.$emit('sideMenu_show');
        this.$root.$emit('leftside_show');
        this.$root.$emit('header_show');
      }

      if (this.currentName == 'Pm') {
        this.disconnectSocket();
      }
      // alert(ROAST_CONFIG.OS_TYPE + this.currentName +this.$route.name)
      if (ROAST_CONFIG.OS_TYPE == 0 && this.$route.name == "menuRout") {
        this.exitAndroidApp()
      } else {
        if (this.showOnlinePlay) {
          this.setOnlinePlay(false);
        }
        this.$router.go(-1);

      }

      // this.$router.go(-1);
    },
    done() {
    },
    cancel() {
    },
    typeNumber(num) {
      this.$refs.routeview.typeNumber(num);
    },
    exit() {
      this.handleExit();
    },
    numberShow(num) {
      this.$refs.routeview.showNum(num)
    },
    onSocket(socket) {
      socket.on("disconnect", (data) => {
        console.log('disconnect ->', data); // not authorized
      });
      socket.on("connect_error", (err) => {
        console.log('message ->', err.message, 'data ->', err.data); // not authorized
        this.DeleteFile()
        this.disconnectSocket();
        this.$refs.routeview.reconnectSocket()
      });
      socket.on("get_name", (data) => {
        console.log('get_name', data);
        this.$refs.routeview.hasNameBefore(data)
      })
      socket.on("set_name", (data) => {
        console.log('set_name', data);
        this.$refs.routeview.manageSetName(data)
      })
      socket.on("join_in_room", (data) => {
        console.log('join_in_room', data);
        this.$refs.routeview.canJoinRoom(data)
      })
      socket.on("room_chats", (data) => {
        console.log('room_chats', data)
        this.$refs.routeview.chatList(data)
      })
      socket.on("send_chat", (data) => {
        console.log('send_chat', data)
        this.$refs.routeview.receivedMessage(data)
      });
      socket.on("user_detail", (data) => {
        console.log('user_detail', data)
        this.$refs.routeview.saveUserChatDetail(data)
      })
      socket.on("typing", (data) => {
        console.log('typing', data)
      })
    },
    manageInterceptor() {
      axios.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ` + this.getParam("Token");
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

            this.setParam("Token", "")
            this.$router.push('/worldCupHome/login/')

          }
        }
      })
    }
  }
}
</script>

<style scoped>
@import "../styles/styles.css";
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
  right: 0px;
  top: 0px;
  border-radius: 0px;
  position: relative;
  box-shadow: 0px 4px 20px 0px #00000073;
  z-index: 10000000;
}

.nestedRoutBackground {
  height: 1080px;
  width: 350px;
  right: 0px;
  top: 0px;
  border-radius: 0px;
  position: absolute;
  background-color: #11151A;
  opacity: 0.8;
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
