<template>
  <div class="parent">

    <!--    <div style="position: absolute;width: 200px;height: 200px;background-color: #42b983;color: red;font-size: 20px"> {{ chatTxt }} {{userLoggedIn}}</div>-->


    <div v-if="userLoggedIn">

      <div v-if="userLoggedIn" class="">
        <img :src="WImgUrl+'chat.png'" style="position: relative">
        <chats  ref="chatList" :messageList="messageList" :userId="getUserInfo().userId"></chats>
      </div>

      <div class="errorMdg">{{ errorMessage }}</div>
      <div class="fixedBottom" v-if="userLoggedIn">
        <div :class="[((yPage == 1 && activeRoute==1 && xPage == 0 && userLoggedIn) ?'inpParentHover':''),'inpParent']">
                    <textarea style="display: none" :value="chatTxt" placeholder="اینجا بنویسید" class="chatInp input"
                              id="chatArea"
                              name="chatTxt" type="text" @input="onInputChange"
                              ref="contentTextArea"
                              autofocus
                              v-on:click="removeHover()">{{chatTxt}}</textarea>
          <div class="chatInp input" style="overflow: auto" id="chatTxtDiv">{{ chatTxt }}</div>
        </div>

        <div :class="[((yPage == 1 && activeRoute==1 && xPage == 1 && userLoggedIn) ?'inpParentHover':''),'submitBtn']">
          <img src="../assets/images/Pm/sendBtn.png"></div>

      </div>

      <div class="keyboardParent" v-if="userLoggedIn">
        <SimpleKeyboard @onChange="onChange" @onKeyPress="onKeyPress" :input="chatTxt" ref="SimpleKeyboard"/>
      </div>

    </div>


  </div>
</template>

<script>
// import registering from '../components/pm/Registering'
import chats from '../components/pm/chats'
import func from '../mixins/mixin'
import {mapGetters, mapMutations, mapActions} from 'vuex'
import api from '../api/api'
import SimpleKeyboard from "../components/pm/SimpleKeyboard";
import {ROAST_CONFIG} from "../js/config";

export default {
  name: "chat",
  mixins: [func],
  deactivated() {
    // console.log("disconnectSocket")
    this.disconnectSocketW();
  },
  data() {
    return {
      WImgUrl:ROAST_CONFIG.WImgUrl,
      activeRoute: 1,
      chatTxt: "",
      userKey: "",
      userLoggedIn: true,
      registrationType: 0,//0->phone , 1->verifycode , 2->username
      yPage: 1,//0->chatList , 1->input&submit , 2->keyboard
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
  components: {chats, SimpleKeyboard},
  destroyed() {
    // this.disconnectSocket();
  },

  mounted() {

    setTimeout(() => {
      this.userLoggedIn = true
    }, 2000)
  },
  watch: {

    chatTxt: function () {
      // alert("chatTxt changed")
      let element = document.getElementById("chatTxtDiv");
      element.scrollTop = element.scrollHeight;
      // this.$refs.contentTextArea.focus()
      // let inp = document.getElementById('chatTxt');
      // inp.focus().val('stuff').setCaretPosition(0,0);
      // this.setCaretPosition(inp, inp.value.length - 1);
    },
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
    this.roomName = "اتاق گفتگوی جام جهانی";
    // this.getToken()

    this.errorMessage = ""
    //  this.setToken(JSON.stringify(param));
    // this.setUserInfo(param);
    this.startSocketW();


    this.$root.$on("remove_Hover", (index) => {
      this.yPage = index;
    });

    this.$root.$on("set_error_msg", data => {
      this.errorMessage = data
    })


  },
  methods: {
    ...mapGetters(["getUserTv", "getUserInfo", "getSocketW", "getTcChannel"]),
    ...mapMutations(["setUserInfo", "startSocketW", "setUserNameID", "disconnectSocketW"]),
    ...mapActions(["setUserName", "sendUserMessage"]),


    setCaretPosition(start, end) {

      if (!end) end = start;
      return this.each(function () {
        if (this.setSelectionRange) {
          this.focus();
          this.setSelectionRange(start, end);
        } else if (this.createTextRange) {
          var range = this.createTextRange();
          range.collapse(true);
          range.moveEnd('character', end);
          range.moveStart('character', start);
          range.select();
        }
      });

    },
    setInpFocus() {
      setTimeout(() => {
        // console.log("setInpFocus !!!")
        document.getElementById('chatArea').focus();
        // document.body.focus();
        // console.log("contentTextArea!!!!gldkfgkdfng")
        // this.$refs.contentTextArea.focus();
        // this.$refs.contentTextArea.click();
      }, 2000)

    },
    reconnectSocket() {
      // console.log("11")
      this.registrationType = 0;
      this.userLoggedIn = false;
    },
    enter() {
      // alert('enter : ' + this.userLoggedIn + '**' + this.yPage + '**' + this.xPage)
      if (this.userLoggedIn) {

        if (this.yPage == 2) {
          this.$refs.SimpleKeyboard.enter();
          return false;
        }

        if (this.yPage == 1) {
          if (this.xPage == 0) {
            // console.log('enter');
            this.$refs.contentTextArea.focus();
            this.showIme('chatTxt');
          } else {
            this.sendMessage()
          }
        }

      } else {
        // this.$refs.registering.enter()
      }
    },
    up() {
      if (this.userLoggedIn) {
        if (this.yPage == 2) {
          // console.log(this.$refs.SimpleKeyboard.up())
          if (!this.$refs.SimpleKeyboard.up()) {
            this.$refs.SimpleKeyboard.toggleHover(0)
            this.yPage = 1;
          }
          return false
        }
        if (this.yPage == 1) {
          this.yPage--;
          return false
        }
        if (this.yPage == 0) {
          if (!this.$refs.chatList.up()) {
          }
        }

      } else {
        this.$refs.registering.up()
      }
    },
    right() {
      if (this.userLoggedIn) {
        if (this.yPage == 2) {
          if (!this.$refs.SimpleKeyboard.right()) {
            this.$refs.SimpleKeyboard.toggleHover(0)
            this.activeRoute = 0
            this.$root.$emit('active_slide');
          }
          return false
        }

        if (this.yPage == 1) {
          if (this.xPage == 1) {
            // this.xPage = 0;
            // return false
            // this.activeRoute = 0
            // this.$root.$emit('active_slide');
          }
          if (this.yPage == 1) {
            // this.activeRoute = 0
            // this.$root.$emit('active_slide');
          }
        }
        if (this.yPage == 0) {
          this.activeRoute = 0
          this.$root.$emit('active_slide');
          return false
        }
      }

      if (!this.userLoggedIn) {
        if (this.registrationType == 2) {
          if (!this.$refs.registering.right()) {
            this.$root.$emit('active_slide');
            this.activeRoute = 0
            return false
          }
          return false
        }
        this.$root.$emit('active_slide');
        this.activeRoute = 0

      }
    },
    left() {

      if (this.userLoggedIn) {
        if (this.yPage == 2) {
          this.$refs.SimpleKeyboard.left();
          return false
        }
        if (this.yPage == 1 && this.xPage == 0) {

          // this.activeRoute = 0
          // this.$root.$emit('active_slide');
          // this.xPage = 1;
          // this.hideIme('chatTxt');
        }
      }

      if (!this.userLoggedIn) {
        this.$refs.registering.left()
      }

    },
    down() {
      // console.log(this.userLoggedIn , this.yPage )
      if (this.userLoggedIn) {
        if (this.yPage == 2) {
          this.$refs.SimpleKeyboard.down();
          return false
        }

        if (this.yPage == 1) {
          this.$refs.SimpleKeyboard.toggleHover(1)
          this.yPage = 2;
          return false
        }
        if (this.yPage == 0) {
          if (!this.$refs.chatList.down()) {
            this.yPage = 1
          }
        }

      } else {
        this.$refs.registering.down();
      }
    },
    showNum(num) {
      if (this.userLoggedIn == false) {
        this.numberShow += num;
      } else {
        this.chatTxt += num;
      }
    },
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

    removeHover() {
      if (this.userLoggedIn) {
        this.yPage = 1;
        this.xPage = 0;
        this.$refs.SimpleKeyboard.toggleHover(0)
      }
    },
    sendMessage() {
      if (this.chatTxt == "")
        return false


      this.yPage = 1;
      this.xPage = 1;
      this.$refs.SimpleKeyboard.toggleHover(0)
      this.sendUserMessage(this.chatTxt);
      let d = new Date();
      let showDate = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDay() + '  ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
      let newMessage = {
        created_at: showDate,
        text: this.chatTxt,
        user: {name: this.getUserInfo().userName},
        user_id: this.getUserInfo().userId
      }
      this.chatTxt = "";
      this.$refs.SimpleKeyboard.clearTxtInp();
      // this.$refs.chatList.testing()
      this.$refs.chatList.showNewMessage(newMessage)
    },
    hasNameBefore(type) {
      // console.log(type)
      if (typeof type == "undefined") {
        this.registrationType = 2;
        this.userLoggedIn = false;
      }
      // this.userHasNameBefore = type;
    },
    // manageSetName(data) {
    //   if (data.success == false) {
    //     this.errorMessage = data.message;
    //     this.registrationType = 2;
    //     this.userLoggedIn = false;
    //     return false;
    //   } else {
    //     this.userLoggedIn = true
    //   }
    // },
    canJoinRoom(data) {
      this.userLoggedIn = data.success;
      (this.userLoggedIn) ? (setTimeout(() => {
        this.setInpFocus()
      }, 2000)) : (this.errorMessage = "در حال حاضر اتاق فعالی وجود ندارد")
    },
    chatList(data) {

      this.messageList = this.reversArray(data);
      // console.log("chatList!!!!!!!!!!!!!!!!!!!" ,   this.messageList)
    },
    receivedMessage(data) {
      this.$refs.chatList.showNewMessage(data)
    },
    saveUserChatDetail(data) {
      this.setUserNameID({item: "userName", amount: data.data.name});
      this.setUserNameID({item: "userId", amount: data.data.user_id});
    },
    back() {
      // this.exitAndroidApp();
    },
    onChange(input) {

      this.chatTxt = input;

    },
    onKeyPress(button) {
      // console.log("button", button);
    },
    onInputChange(input) {
      this.chatTxt = input.target.value;
    },
    done() {
    },
    cancel() {
    },

    changingInpVal(inputTxt) {
      this.chatTxt = inputTxt;
    }
    // getTokenData() {
    //   // setTimeout(() => {
    //   //   console.log("chat getTokenData" ,)
    //   //   // this.DeleteFile()
    //   //   //  this.manageTokenGet(this.getToken());//baraye local & tizen miad inja vali baraye andriod event sader mishe
    //   // }, 10000);
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


.fixedBottom {
  /*width: 95%; */
  width: 350px;
  height: 110px;
  right: 5px;
  position: absolute;
  /*bottom: 246px;*/
  top: 740px;
  /* border-top: 1px solid #3b3a3f; */
  display: flex;
  align-items: center;
  justify-content: center;
  display: -webkit-flex !important;;
  /*!* padding: 10px;*/
}

.keyboardParent {
  width: 350px;
  height: 225px;
  right: 0px;
  position: absolute;
  top: 843px;
  /* bottom: 0px; */
  border-top: 1px solid #3b3a3f;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  display: -webkit-flex !important;
  /* padding: 10px; */
  direction: ltr;
}

.inpParent {
  height: 56px;
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  display: -webkit-flex !important;;
  margin-left: 10px;
}

.inpParentHover {
  border: 1px solid #116DFF !important;
  background-color: #116DFF !important;
}

.chatInp {
  line-height: 60px;
  height: 56px;
  width: 250px;
  border: 2px solid #FFFFFF;
  border-radius: 7px;
  /*direction: rtl;*/
  font-size: 24px;
  background-color: transparent;
  color: #ffffff;
  text-indent: 5px;
  /*overflow: auto;*/
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.chatInp::-webkit-scrollbar {
  display: none;
}

.submitBtn {
  margin-left: 16px;
  float: left;
  width: 90px;
  height: 56px;
  -ms-flex-pack: center;
  justify-content: center;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 7px;
  background-color: transparent;
  color: #FFFFFF;
  border: 1px solid #FFFFFF;
  display: -webkit-flex !important;;

}

#chatTxt:focus {
  border-color: transparent !important;
}

.errorMdg {
  width: 350px;
  height: 60px;
  right: 0px;
  position: absolute;
  top: 630px;
  /*border-top: 1px solid #3b3a3f;*/
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: #FF3939;
  display: -webkit-flex !important;;

}

.roomTitle {
  /*width: 95%;*/
  width: 350px;
  height: 80px;
  right: 0px;
  position: absolute;
  top: 0px;
  border-bottom: 1px solid #3b3a3f;
  display: flex;
  align-items: center;
  justify-content: center;
  direction: rtl;
  /*padding: 10px;*/
  font-size: 20px;
  color: #ffffff;
}

a {
  display: none !important;
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
