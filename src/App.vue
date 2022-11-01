<template>
  <div id="app" class="">
    <router-view :key="$route.fullPath" ref="routeview"></router-view>
  </div>
</template>


<script>


import axios from "axios";
import func from "./worldcup/mixins/mixin";
import {mapGetters, mapMutations} from "vuex";

export default {
  mixins: [func],
  created() {

    //pouria
   //  let token={
   //    "token_type": "Bearer",
   //    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMWNlMmYwNDEwMDFlOWZmOGFhMDc0MWVhNGE4ZDY4NTJjN2VmYjRjYWUzNTBmNDc0YWNlMjMzNzI3OGExNjQ5OWZlYzRhMWQ5ZjkxMzY0MGIiLCJpYXQiOjE2NjcyMDQyMTEuMDYzMjM1LCJuYmYiOjE2NjcyMDQyMTEuMDYzMjQsImV4cCI6MTY5ODc0MDIxMS4wNTM3OCwic3ViIjoiNCIsInNjb3BlcyI6W119.i2X4Yc2NHD4cTu6TfTgbvAs1ambr82VkTbjUwk7N6wvgZr2JEfobeTZzXrRxzDl08m0TYW6sEjFeZIWN7I8BIAUd2GfZcaLudtEIqta6r3bgq6ecUUPha-4czbSntCzQGY729UYuIFSI0_yjD3_7y-8D3tCsWlTgyBEs0HdmGJDGNAd1gZj71Udy7Y-a-1hekgSAXueRxl_np5OLzqcK0WUttL2CK5SD2JaphSTfgpORSc0-9Trasds-vTV2C6D1I5LDwGghqpkt7GVW_AS_1lJmesHhA1xWzgqlDOAGmSHsJO-IbxYxute_53f2dmbenCmqjAtodTTnhmDn1UJpxTpUvLP5tTVlyTlmpK8uL_w24McihvDTVdUmih4cswpgbSDDqgOeYQkUN_KrObpJzBe8KjVJLtLZF9WdL7b1VKPxwvmJ2h5vePeAx6zltorbKkDcBoWVIsum9r6bP0hW4E8J03lDOtjYPaTy7RuUkQCvdqqzJt6POdp811al5g5I59XEj1di8SObrHCIH-sbVoKLz12s80RR6PZKIbm3NV_ns82q6y41ZOQpsSi-y5jod3w9QC9xP5P4mSYlHEF1Yx0TL98S98uje46ASf-7ORSW7XleXx_4v2k70LsgMgITwI-TZ0kaveQOwqFb5-ZgPtm8bv-8ioVQK-91NULzThw"
   //  }
   // this.setParam("Tokenw", JSON.stringify(token))


    // this.clearParam()

    //atie
      //this.setParam("Tokenw", `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYThlYWRhMzUyOTk2NWM4OTQzMjUxMTcxZjUwZjU0NzU3Y2ExODNkNTZhNDliNDNlNDMwMWRhYTM4NDg1MWM0YjNhYzgyMGM3NDg1NWZjZTUiLCJpYXQiOjE2NjcxOTc5MTMuMTU1OTQ5LCJuYmYiOjE2NjcxOTc5MTMuMTU1OTU5LCJleHAiOjE2OTg3MzM5MTMuMTM5NTMxLCJzdWIiOiI1Iiwic2NvcGVzIjpbXX0.Dc-ZMfCF_xXYaiQy3aAIhiDjM38KRC1hLNnq4xssSoRDMds9uQZh4GX7-_4PhCLXRIF4lj7O0KbiD23_vaGI6jJNStqvPgeaBsDJqR6y2HzUaCAeoVd5LjClihMp3Gq55VqNe1hpcAGPh6ST1mkVg1N8eqDARxXJkKhpN35sV1QKI5bPgFjrT6FgHH1iZ6mUkDjQfD-M81G2ZVNxLkGwuslnK5oBlBSsx8eCxZsaUjevKufNyvdRMw4XC4QNqfLiMHYEiBXl1uqt1dVrazr-M4NVe3l3258tm57u9cuwrK43fMGKzIc2B-VKru2BZ-u_hsdhR5kfhDCZayhyKindX2aKMVehWIw3oKHIpub1OwdqFSYUqXa0kEEvD8OECgXWkCCr1SOe5HNWpWK4_xp-pKV7YKJu9kyEXGxg9g-sonx7JWQX1jdwQTlu9rj6L9gAfqtJysarmE3k2pfR9ZX5uNcEC4yjCrKq4GkADXvUXvoFXGWnUjFCwJm2okH7jSaL4bwN8ewl8pcum6skCNuR3fOjxr2Pbq7QyEO9gMQu4ERCQf7YZiQ0dqA7MvA7PMvS1PLxAInYpLid6tszzO0ebIMGWnWuE47AzvNvmhZn698vsrtdhiycmGylzMxifOmGq1J6XTZtfHasyvsrX-bZXrtXtYeIpiguiPN4qI9I9bA`)

    console.log("app vue Created")

    window.addEventListener("keydown", this.keyEvent);
    this.$router.push('/worldCupHome/menuRout').catch(err => {
    })


    axios.interceptors.request.use((config) => {
      let userToken = "";
      if( this.getParam("Tokenw")){
        let json = JSON.parse( this.getParam("Tokenw"));
        //   console.log(userToken.access_token )
        if(json && json.access_token){
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
        }else{
          this.$root.$emit("doFullScreenVideo",'')
        }
        return false
      }
    })

  },
  methods: {
    ...mapMutations(['setOnlinePlay']),
    ...mapGetters(['getOnlinePlay']),

    handleOnlinePlay() {

    },


    keyEvent(event) {
      const keyCode = event.keyCode;
      // console.log("keyCode = " + keyCode);
      switch (keyCode) {

        case 38://Up
        case 29460://Up
          this.$refs.routeview.up();

          break;
        case 39://Right
        case 5://Right

          this.$refs.routeview.right();

          break;
        case 37://Left
        case 4://Left

          this.$refs.routeview.left();
          break;
        case 40://Down
        case 29461://Down

          this.$refs.routeview.down();
          break;
        case 13://Enter
        case 29443://Enter
          this.$refs.routeview.enter();

          break;
        case 10009://Return
        case 187:

          this.$refs.routeview.back();


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

          this.$refs.routeview.done();

          break;
        case 65385: //key cancel

          this.$refs.routeview.cancel();

          break;
        case 10182: // Exit
          this.$refs.routeview.exit();
          // tizen.application.getCurrentApplication().exit();

          break;
        case 427:
          // alert("app")
          // this.$refs.routeview.channelUp();
          break;
        case 428:
          // this.$refs.routeview.channelDown();
          break;
        case 48: //key 0
        case 49: //key 1
        case 50: //key 2
        case 51: //key 3
        case 52: //key 4
        case 53: //key 5
        case 54: //key 6
        case 55: //key 7
        case 56: //key 8
        case 57: //key 9
          this.$refs.routeview.typeNumber(parseInt(keyCode) - 48)

          break;
        case 10190: //key PRE-CH

          // this.$refs.routeview.showNumber(parseInt(keyCode) - 48);

          break;
          // case 8: //key Backspace
          //     this.$refs.routeview.showNumber(parseInt(keyCode) - 48);
          //     break;
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
