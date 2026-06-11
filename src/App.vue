<template>
  <div id="app" class="">
    <router-view :key="rootRouteKey" ref="routeview"></router-view>
  </div>
</template>


<script>


import axios from "axios";
import func from "./worldcup/mixins/mixin";
import {mapGetters, mapMutations} from "vuex";
import { consumeNumericKey } from "./worldcup/js/keyUtils";

export default {
  mixins: [func],
  computed: {
    rootRouteKey() {
      const root = this.$route.matched[0]
      return root ? (root.name || root.path) : this.$route.path
    },
  },
  created() {
    this._keyEventHandler = this.keyEvent.bind(this);
    window.addEventListener("keydown", this._keyEventHandler);
    this.$router.push('/worldCupHome/menuRout').catch(err => {
    })


    axios.interceptors.request.use((config) => {
      let userToken = "";
      if (this.getParam("Tokenw")) {
        let json = JSON.parse(this.getParam("Tokenw"));
        //   console.log(userToken.access_token )
        if (json && json.access_token) {
          userToken = json.access_token;
        }
      }
      //console.log("-----",userToken)
      config.headers.Authorization = `Bearer ` + userToken;
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


    this.$root.$on('PostMessages', (data) => {
      // console.log(data.type, data.type)
      if (data.type && data.type == 'userData') {
        this.$refs.routeview.manageTokenGet(data.data)
      }

      if (data.type && data.type == 'returnPage') {

        this.$refs.routeview.back();
        return false
      }

      if (data.type && data.type == 'checkFullScreen') {
        // alert('checkFullScreen' + data.data )
        if (data.data == true) {
          this.$refs.routeview.exitFullscreenAndroid()
        } else {
          this.$root.$emit("doFullScreenVideo", '')
        }
        return false
      }
    })

  },
  beforeDestroy() {
    if (this._keyEventHandler) {
      window.removeEventListener("keydown", this._keyEventHandler);
    }
  },
  methods: {
    ...mapMutations(['setOnlinePlay']),
    ...mapGetters(['getOnlinePlay']),

    handleOnlinePlay() {

    },


    keyEvent(event) {
      const view = this.$refs.routeview
      if (!view) return

      const keyCode = event.keyCode;
      // console.log("keyCode = " + keyCode);
      switch (keyCode) {

        case 38://Up
        case 29460://Up
          view.up();

          break;
        case 39://Right
        case 5://Right

          view.right();

          break;
        case 37://Left
        case 4://Left

          view.left();
          break;
        case 40://Down
        case 29461://Down

          view.down();
          break;
        case 13://Enter
        case 29443://Enter
          view.enter();

          break;
        case 10009://Return
        case 187:

          view.back();


          break
          /* case 187://Return
             //alert(this.$refs.menu.active + ' ** ' + this.$refs.menu.show + ' ** ' + this.$refs.routeview.activeRoute)
             if (this.modalOn) {
               this.$refs.routeview.back();
             } else if (this.$refs.menu.active && this.$refs.menu.show) {
               // else
               if (this.$refs.routeview.activeRoute == 0) {
                 this.$refs.menu.back();
                 this.$refs.routeview.activeRoute = 1;
               } else {
                 this.$refs.routeview.back();
                 // this.$refs.routeview.activeRoute = 0;
               }

             } else if (this.$refs.sideLeft.active && this.$refs.sideLeft.show) {
               if (this.$refs.routeview.activeRoute == 0) {
                 this.$refs.sideLeft.back();
                 this.$refs.routeview.activeRoute = 1;
               } else {
                 this.$refs.routeview.back();
                 // this.$refs.routeview.activeRoute = 0;
               }
             } else if (this.$refs.popup.show) {
               this.$refs.popup.back();
             } else {
               this.$refs.routeview.back();
             }

             break;*/


        case 35:


          break;
        case 65376: //key done

          view.done();

          break;
        case 65385: //key cancel

          view.cancel();

          break;
        case 10182: // Exit
          view.exit();
          // tizen.application.getCurrentApplication().exit();

          break;
        case 427:
          // alert("app")
          // this.$refs.routeview.channelUp();
          break;
        case 428:
          // this.$refs.routeview.channelDown();
          break;
        case 10190: //key PRE-CH
          break;
        default: {
          const numeric = consumeNumericKey(event)
          if (numeric !== null) {
            view.showNumber(numeric)
          }
        }
      }

    }
  }
}

</script>

<style>


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  /*color: #42b983;*/
}

:focus {
  outline: -webkit-focus-ring-color auto 0px !important; /*remove input border focuse*/
}

</style>
