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
 //   this.setParam("Tokenw", `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNjUwY2Y4M2Q3ODNlZTk3YjIyNWMzODI1MmMxNzYzMjk4ODJjZTEwZWIyZGNmMzQxYjkzZDU2NmU2ZDNlYTJhZTYyYjI2ODM4NGVmM2RjM2EiLCJpYXQiOjE2NjcxOTczNDIuNjczNDY1LCJuYmYiOjE2NjcxOTczNDIuNjczNDc1LCJleHAiOjE2OTg3MzMzNDIuNjU4NzE1LCJzdWIiOiI0Iiwic2NvcGVzIjpbXX0.qltB3SAhxclgU3dR07GMIUmjCOhAUUuovAdxit6n3aIrMFNCGlqfRgOhuDoRAtEPzz-Mv6rp1DoXuIsQT8JD8ehmfcgWeL54cWJRht5uF9nlxRZ8DuqgAUWtVJbyGX-qbdJzifSVoZaiqF5aMgH49cfCGI5REpoIOJCUqnssmnyc_VKogRr0KtXL8y05Mw7BrVEa-SZvmbFF1P4NftxdN3W2ldFlcOSzOyK8qHjWr7w-5g1AtUpQBzNhiS3ZlQRroD3XNYJniS0VZ8aF-CuBaukrRYiQ9TArxV1-xe0uGtWsFEa2I5To_tfwsmqyAeg4NLtfMlrNzDsVB8vuD5MhcUHto86qZ8D89PRCAiH1GaqP4W4MDRY28nHA4rV3r7ZM0lwemmaHJTRFuVcvA9RB6Md2PtuOwfyqhq338RjnfDckMy6KZvu1nagArgco9m0hZ4bjHgNpyZObLyGPdyDLXv2GQ8djpVK8JTsRCM07csA23gUeMq4U75NiZeB7Lh1cUPGB4SrbRpo96KZN0Eu8y1B-kywMFZ__lZAkMWjyYqQ1Lo8rNdxC_A7Ejnr_CguzLpTEnb0S3khjhxWOLB_CY1-84dFDw5xSF0wS8dQwQPAPdwcx9xYhng3WE8-aqn9bOpH3i-ovNIQBdLSEorq94H7Afs8GE2IukQWRxHdOY4E`)
    //atie
      this.setParam("Tokenw", `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYThlYWRhMzUyOTk2NWM4OTQzMjUxMTcxZjUwZjU0NzU3Y2ExODNkNTZhNDliNDNlNDMwMWRhYTM4NDg1MWM0YjNhYzgyMGM3NDg1NWZjZTUiLCJpYXQiOjE2NjcxOTc5MTMuMTU1OTQ5LCJuYmYiOjE2NjcxOTc5MTMuMTU1OTU5LCJleHAiOjE2OTg3MzM5MTMuMTM5NTMxLCJzdWIiOiI1Iiwic2NvcGVzIjpbXX0.Dc-ZMfCF_xXYaiQy3aAIhiDjM38KRC1hLNnq4xssSoRDMds9uQZh4GX7-_4PhCLXRIF4lj7O0KbiD23_vaGI6jJNStqvPgeaBsDJqR6y2HzUaCAeoVd5LjClihMp3Gq55VqNe1hpcAGPh6ST1mkVg1N8eqDARxXJkKhpN35sV1QKI5bPgFjrT6FgHH1iZ6mUkDjQfD-M81G2ZVNxLkGwuslnK5oBlBSsx8eCxZsaUjevKufNyvdRMw4XC4QNqfLiMHYEiBXl1uqt1dVrazr-M4NVe3l3258tm57u9cuwrK43fMGKzIc2B-VKru2BZ-u_hsdhR5kfhDCZayhyKindX2aKMVehWIw3oKHIpub1OwdqFSYUqXa0kEEvD8OECgXWkCCr1SOe5HNWpWK4_xp-pKV7YKJu9kyEXGxg9g-sonx7JWQX1jdwQTlu9rj6L9gAfqtJysarmE3k2pfR9ZX5uNcEC4yjCrKq4GkADXvUXvoFXGWnUjFCwJm2okH7jSaL4bwN8ewl8pcum6skCNuR3fOjxr2Pbq7QyEO9gMQu4ERCQf7YZiQ0dqA7MvA7PMvS1PLxAInYpLid6tszzO0ebIMGWnWuE47AzvNvmhZn698vsrtdhiycmGylzMxifOmGq1J6XTZtfHasyvsrX-bZXrtXtYeIpiguiPN4qI9I9bA`)

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
