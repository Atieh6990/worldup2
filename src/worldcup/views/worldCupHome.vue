<template>
  <div class="routParent">
<!--    <div class="videoParent"></div>-->
    <videoPlayer></videoPlayer>
    <!--    <sideMenu ref="sideMenu"></sideMenu>-->

    <router-view :key="$route.fullPath" ref="routeview"></router-view>

  </div>
</template>

<script>

// import sideMenu from '../components/sideMenu/SideMenu'
import videoPlayer from '../components/video/videoPlayer'
import func from '../mixins/mixin'
import {mapMutations, mapGetters} from 'vuex'
import {ROAST_CONFIG} from "@/worldcup/js/config";
// import {ROAST_CONFIG} from "../js/config";
import router from '../router/index'
import axios from 'axios'

export default {
  name: "worldCupHome",
  components: {videoPlayer},
  mixins: [func],
  data() {
    return {
      currentName: '',   loading: false, getResponse: 0,
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
    console.log("worldCupHome Created")
    this.$router.push('/worldCupHome/Pm')
    router.beforeEach((to, from, next) => {
      this.currentName = to.name
      if (to.name == 'pm') {
        next();
      } else next()
    });


    this.setUserTv(this.UserTVInfo())
    this.setTvChannel(ROAST_CONFIG.TV_CHANNEL);
    // this.manageInterceptor()


    this.$root.$on("registerData", (data) => {
      // console.log("in registerData !!!")
      this.$refs.routeview.manageRegisterData(data)
    });

    this.$root.$on("press_submit", () => {
      this.$refs.routeview.sendMessage()
    })

    this.$root.$on('PostMessages', (data) => {
      // alert("PostMessages" + data.type)

      if (data.type && data.type == 'userData') {
        // this.$root.$emit('loginUserData', data);
        // alert(data.data)
        this.$refs.routeview.manageTokenGet(data.data)
      }

      if (data.type && data.type == 'returnPage') {
        this.back();
        return false
      }
    });
  },
  methods: {
    ...mapMutations(['setUserTv', "setTvChannel","disconnectSocket"]),
    ...mapGetters(["getSocket"]),
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

      this.$refs.routeview.enter();
    },
    back() {

        this.$router.go(-1);
        if(ROAST_CONFIG.DEVELOP_MODE == 0 && ROAST_CONFIG.OS_TYPE == 0 && this.currentName == "Pm"){//TODO currentName bayad beshe esme safe avale app
          this.exitAndroidApp()
        }

      // this.$router.go(-1);
    },
    done() {
    },
    cancel() {
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
        this.loading = false
      })
    }

  }

}
</script>

<style scoped>

@import "../styles/styles.css";

.routParent {
  position: fixed;
  top: 0px;
  right: 0px;
  width: 1920px;
  height: 1080px;
  direction: rtl;
  border: 1px solid green;
}

:focus {
  outline: -webkit-focus-ring-color auto 0px !important;
}

.simple-keyboard {
  max-width: 390px !important;
  position: absolute;
  left: 0px !important;
  direction: ltr !important;
}

</style>
