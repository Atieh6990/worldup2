<template>
  <div class="parent">

    <!--    <div style="position: absolute;width: 200px;height: 200px;background-color: #42b983"></div>-->

    <div >
      <registering   v-on:set_error_msgL="set_error_msg"  v-on:manageRegisterData="manageRegisterData"  :type="registrationType" ref="registering" :activeRoute="activeRoute"
                   :yPage="yPage" :numberShow="numberShow"></registering>
    </div>

<!--    <div v-else>-->

<!--      <div v-if="userLoggedIn && messageList.length>0" class="">-->
<!--        <chats ref="chats" :messageList="messageList" :userId="getUserInfo().userId"></chats>-->
<!--      </div>-->

<!--      <div class="errorMdg">{{ errorMessage }}</div>-->
<!--      <div class="fixedBottom" v-if="userLoggedIn">-->
<!--        <div :class="[((yPage == 1 && activeRoute==1 && xPage == 0 && userLoggedIn) ?'inpParentHover':''),'inpParent']">-->
<!--                    <textarea style="display: none" :value="chatTxt" placeholder="اینجا بنویسید" class="chatInp input"-->
<!--                              id="chatArea"-->
<!--                              name="chatTxt" type="text" @input="onInputChange"-->
<!--                              ref="contentTextArea"-->
<!--                              autofocus-->
<!--                              v-on:click="removeHover()"></textarea>-->
<!--          <div class="chatInp input" style="overflow: auto" id="chatTxtDiv">{{ chatTxt }}</div>-->
<!--        </div>-->
<!--        <div :class="[((yPage == 1 && activeRoute==1 && xPage == 1 && userLoggedIn) ?'inpParentHover':''),'submitBtn']"-->
<!--             v-on:click="sendMessage()"><img src="../assets/images/Pm/sendBtn.svg"></div>-->
<!--      </div>-->

<!--      <div class="keyboardParent" v-if="userLoggedIn">-->
<!--        <SimpleKeyboard @onChange="onChange" @onKeyPress="onKeyPress" :input="chatTxt" ref="SimpleKeyboard"/>-->
<!--      </div>-->

<!--    </div>-->



  </div>
</template>

<script>
import registering from '../components/pm/Registering'
// import chats from '../components/pm/chats'
import func from '../mixins/mixin'
import {mapGetters, mapMutations, mapActions} from 'vuex'
import api from '../api/api'
// import SimpleKeyboard from "../components/pm/SimpleKeyboard";

export default {
  name: "chat",
  mixins: [func],
  deactivated() {
    // console.log("disconnectSocket")
    this.disconnectSocket();
  },
  data() {
    return {
      path:"",
      activeRoute: 1,
      chatTxt: "",
      userKey: "",
      userLoggedIn: false,
      registrationType: 0,//0->phone , 1->verifycode , 2->username
      yPage: 0,//0->chatList , 1->input&submit , 2->keyboard
      xPage: 1,
      phoneNumber: "",
      verifyCode: "",
      errorMessage: "",
      userHasNameBefore: "",//agar to sambazar name set nashode bashe
      messageList: "",
      newMessage: "",
      numberShow: "", input: "",
      tokenData: "", roomName: '',
    };
  },
  components: {registering},
  destroyed() {
    // this.disconnectSocket();
  },

  mounted() {
    this.path=this.$route.query.path
    setTimeout(() => {
      this.$nextTick(() => {
      })
    }, 2000)
  },
  watch: {

    // chatTxt: function () {
    //   // console.log("chatTxt changed")
    //   let element = document.getElementById("chatTxtDiv");
    //   element.scrollTop = element.scrollHeight;
    //   // this.$refs.contentTextArea.focus()
    //   // let inp = document.getElementById('chatTxt');
    //   // inp.focus().val('stuff').setCaretPosition(0,0);
    //   // this.setCaretPosition(inp, inp.value.length - 1);
    // },
    userHasNameBefore: function () {
      // console.log('lksfdkj')
      this.userHasNameBefore = false;
      this.userLoggedIn = false
      this.registrationType = 2;
    },
    activeRoute: function () {

      if (this.activeRoute == 1) {
        if ((this.userLoggedIn && this.yPage == 2)) {
          this.$refs.SimpleKeyboard.toggleHover(1);
        }

        if ((!this.userLoggedIn && this.registrationType == 2 && this.$refs.registering.yPos == 2)) {
          this.$refs.registering.keyboardAddHover();
        }
      }

    }
  },
  created() {

    // this.roomName = "اتاق گفتگوی " + this.getTcChannel();
    // this.roomName = "اتاق گفتگوی جام جهانی";
    // this.getToken()

    // setTimeout(() => {
    //   // console.log("lkgdkjghaaaaaan")
    //   this.getToken()
    // }, 1000)

    // // this.setToken("");
    // if (ROAST_CONFIG.LOCAL_TEST == true) {
    //     this.setUserNameID({item: "access_token", amount: ROAST_CONFIG.TEST_TOKEN})
    //     this.startSocket();//for test
    // } else {
    //     // this.$root.$emit("show_loading")
    //     this.getTokenData();
    // }


    // this.$root.$on('loginUserData', (data) => {
    //   // alert('loginUserData'+data.data)
    //   if (data.data == null || data.data == 'null' || data.data == '') {
    //     // alert("00")
    //     this.registrationType = 0;
    //     this.userLoggedIn = false;
    //   } else {
    //     // alert("111")
    //     this.checkToken(data.data);
    //   }
    // });

    // this.$root.$on("remove_Hover", (index) => {
    //   this.yPage = index;
    // });
    //
    // this.$root.$on("set_error_msg", data => {
    //   this.errorMessage = data
    // })


  },
  methods: {
    ...mapGetters(["getUserTv", "getUserInfo", "getSocket", "getTcChannel"]),
    ...mapMutations(["setUserInfo", "startSocket", "setUserNameID", "disconnectSocket"]),
    ...mapActions(["setUserName", "sendUserMessage"]),
    manageRegisterData(data) {
      // alert('manageRegisterData' + data.type)
      this.errorMessage = "";
      this.numberShow = "";
      if (data.type == 0) {//enter phone & get verify code
        this.phoneNumber = data.content;
        this.getCode();
        return false
      }

      if (data.type == 1) {//enter verify code ang get token
        this.verifyCode = data.content;
        this.doSignUp();
        return false
      }

      if (data.type == 2) {//enter name
        // console.log(data)
        this.setUserName(data.content);
      }
    },
    goPages(path){
      this.$router.push({path:

        path})
    },
    // saveUserChatDetail(data) {
    //   this.setUserNameID({item: "userName", amount: data.data.name});
    //   this.setUserNameID({item: "userId", amount: data.data.user_id});
    // },
    enter() {
        console.log("----------out")
        this.$refs.registering.enter()
    },
    up() {

        this.$refs.registering.up()

    },
    right() {


      return false


    },
    left() {

      return false

    },
    down() {
      this.$refs.registering.down();
    },
    // showNum(num) {
    //   if (this.userLoggedIn == false) {
    //     this.numberShow += num;
    //   } else {
    //     this.chatTxt += num;
    //   }
    // },

    set_error_msg(data){
      this.errorMessage = data
    },

    getCode() {
      api.code(this.phoneNumber).then((data) => {
        if (data.success) {
          this.userKey = data.data.key;
          this.registrationType = 1
        } else {
          if (typeof data.data.message == "string") {
            this.errorMessage = data.data.message
          } else {
            for (let key in data.data.message) {
              if (data.data.message.hasOwnProperty(key)) {
                this.errorMessage = data.data.message[key][0];
                break;
              }
            }
          }
        }
      })
    },
    doSignUp() {


    // alert('mac : '+ this.getUserTv().mac + '  uid : ' + this.getUserTv().uid + '  version :' +this.getUserTv().version)
      api.signup(this.userKey, this.verifyCode, this.phoneNumber, this.getUserTv().mac, this.getUserTv().uid, this.getUserTv().version).then(data => {
        if (data.success == false) {
          this.errorMessage = data.data.message;
          return false
        }
        let param = {
          expires_in: (data.expires_in * 1000) + (new Date).getTime(),
          access_token: data.access_token,
          refresh_token: data.refresh_token
        }
        // alert("param" + param)
        // this.DeleteFile()
        this.errorMessage = ""
        this.setParam("Token",param)
       // this.setToken(JSON.stringify(param));
       // this.setUserInfo(param);
       //this.startSocket();
        this.goPages(this.path);
      })
    },
    checkToken(key) {
      let keyJson = (key);
      let param = {
        expires_in: (keyJson.expires_in * 1000) + (new Date).getTime(),
        access_token: keyJson.access_token,
        refresh_token: keyJson.refresh_token
      }
      if ((new Date).getTime() >= keyJson.expires_in) {
        return false
      } else {
        return true
      }
    },


    // hasNameBefore(type) {
    //   // console.log(type)
    //   if (typeof type == "undefined") {
    //     this.registrationType = 2;
    //     this.userLoggedIn = false;
    //   }
    //   // this.userHasNameBefore = type;
    // },


    // manageTokenGet(data) {
    //   this.tokenData = (data.savedToken)
    //   let Token = (data.savedToken).access_token
    //   // alert(Token)
    //   // if (this.tokenData == null || this.tokenData == 'null' || this.tokenData == '' || typeof this.tokenData == "undefined") {
    //   if (Token == null || Token == 'null' || Token == '' || typeof Token == "undefined") {
    //     this.registrationType = 0;
    //     this.userLoggedIn = false;
    //   } else {
    //     this.checkToken(this.tokenData);
    //   }
    // }
  }
}
</script>

<style scoped>
.parent {
  width: 350px;
  height: 100%;
  /*background-color: #000000;*/
  /*opacity: 0.2;*/
  /*right: 110px;*/
  /*position: a  bsolute;*/
  overflow: hidden;
  /*box-shadow: 0px 4px 20px 0px #00000073;*/

}
</style>