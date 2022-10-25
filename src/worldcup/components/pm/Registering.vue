<template>
  <div class="registerParent">

    <img class="icon" src="../../assets/images/Pm/vorteile-live-chat 2.png">
    <input :class="[((yPos == 0 && activeRoute == 1) ? 'inpHover':''),'content']" :value="contentTxt"
           :placeholder="placeHolders[type]"
           type="text"
           @input="onInputChange"
           :id="'content_'+type" v-on:click="removeHover()" ref="content">
    <div :class="[((yPos == 1 && activeRoute == 1) ? 'submitBtnHover':''),'submitBtn']"
         v-on:click="submitBtn()">
      <span style="padding-left: 15px">{{ btnTxt[type] }}</span>
      <img :src="require('../../assets/images/Pm/'+icons[type]+'')">
    </div>


    <div :class="[((yPos == 3 && activeRoute == 1) ? 'clearBtnHover':''),'clearBtn']"
         v-if="type == 0 || type == 1"
         v-on:click="clearBtn()">
      پاک کردن
    </div>

    <div class="des">{{ des[type] }}</div>


    <div class="keyboardParent" v-if="type == 2">
      <SimpleKeyboard @onChange="onChange" @onKeyPress="onKeyPress" :input="contentTxt" ref="SimpleKeyboard"/>
    </div>
  </div>
</template>

<script>
import func from "../../mixins/mixin";
import SimpleKeyboard from "./SimpleKeyboard";

export default {
  name: "Registering",
  props: ["type", "activeRoute", "yPage", "numberShow"],
  mixins: [func],
  data() {
    return {
      icons:['majesticons_send.svg','dashicons_cloud-saved.svg','dashicons_cloud-saved.svg'],
      placeHolders: ['شماره تلفن همراه خود را وارد کنید', 'کد چهار رقمی را وارد کنید','نام مستعار خود را انتخاب کنید.'],
      btnTxt: ["ارسال", "ثبت", "ثبت"],
      des: ["", "بعد از ارسال شماره تلفن همراه کد فعال سازی 4 رقمی برای شما پیامک خواهد شد", ""],
      contentTxt: "",
      yPos: 0,//0->input 1->btn , 2->keyboard , 3->clear btn
    };
  },
  created() {
    this.yPos = 0;
    this.showIme("content_" + this.type);
  },
  watch: {
    type: function () {
      this.contentTxt = "";
      this.yPos = 0;
      this.hideIme("content_" + this.type);
    }, numberShow: function () {
      this.contentTxt = this.numberShow;
    }
  },
  components: {SimpleKeyboard},
  methods: {
    down() {
      if (this.yPos == 0) {
        this.hideIme("content_" + this.type);
        // this.$refs.content.blur()
        this.yPos = 1;
        return false
      }

      if (this.yPos == 1) {
        if (this.type == 0 || this.type == 1) {
          this.yPos = 3;
          return false
        }
        if (this.type == 2) {
          this.yPos = 2;
          this.$refs.SimpleKeyboard.toggleHover(1);
          return false
        }

      }

      if (this.yPos == 2) {
        this.$refs.SimpleKeyboard.down();
        return false
      }
    }, enter() {
console.log("this.type",this.type)
      console.log("this.yPos",this.yPos)
      if (this.type == 2) {
        if (this.yPos == 2) {
          this.$refs.SimpleKeyboard.enter();
          return false
        }

      }

      if (this.yPos == 3) {//pak kardan
        this.contentTxt = '';
        return false
      }

      if (this.yPos == 0) {
        // this.$refs.content.focus();
        this.showIme("content_" + this.type);
        return true;
      } else {

        this.nextStep();
        return true;
      }
      return false;
    }, up() {

      if (this.yPos == 2) {
        if (!this.$refs.SimpleKeyboard.up()) {
          this.$refs.SimpleKeyboard.toggleHover(0);
          this.yPos = 1;
          // console.log("dkfjgkfjgk", this.yPos, this.activeRoute, this.yPage)
        }
        return false
      }
      if (this.yPos == 1) {
        this.yPos = 0;
        return false;
      }

      if (this.yPos == 3) {
        if (this.type == 0 || this.type == 1) {
          this.yPos = 1;
          return false
        }
      }

    },

    right() {
      if (this.yPos == 2) {
        if (!this.$refs.SimpleKeyboard.right()) {
          this.$refs.SimpleKeyboard.toggleHover(0)
          return false
        }
        return true
      }
    },
    left() {

      if (this.yPos == 2) {
        if (!this.$refs.SimpleKeyboard.left()) {
        }
      }
    },
    clearBtn() {
      this.contentTxt = '';
    },
    submitBtn() {
      this.hideIme("content_" + this.type);
      if (this.type == 2)
        this.$refs.SimpleKeyboard.toggleHover(0);
      this.yPos = 1;
      this.nextStep();
    },
    nextStep() {

      this.hideIme("content_" + this.type);
      this.$emit("set_error_msgL", "");
      this.yPos = 0;

      if (this.contentTxt != "") {
        let send = {type: this.type, content: this.contentTxt};
        setTimeout(() => {
          this.$emit("manageRegisterData", send);
        }, 600)

      } else {
        this.$emit("set_error_msgL", "فیلد هارا پر کنید.");
      }
    },
    removeHover() {
      this.$emit("set_error_msgL", "");
      if (this.type == 2)
        this.$refs.SimpleKeyboard.toggleHover(0);
      this.yPos = 0;
    },
    keyboardAddHover() {
      this.$refs.SimpleKeyboard.toggleHover(1);
    },
    onChange(input) {
      this.contentTxt = input;
    },
    onKeyPress(button) {
      // console.log("button", button);
    },
    onInputChange(input) {
      this.contentTxt = input.target.value;
    },
  }
};
</script>

<style scoped>
.registerParent {
  width: 350px;
  height: 760px;
  right: 0px;
  position: absolute;
  top: 0px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.icon {
  top: 103px;
  position: absolute;
  right: 0px;
}

.content {
  height: 56px;
  width: 301px;
  right: 17px;
  top: 339px;
  border-radius: 7px;
  position: absolute;
  background-color: #FFFFFF;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  padding-right: 7px;
  padding-left: 7px;
  line-height: 60px;
  direction: rtl;
  font-size: 18px;
  text-align: center;


}

.submitBtn {
  position: absolute;
  height: 56px;
  width: 301px;
  right: 17px;
  top: 413px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 60px;
  direction: rtl;
  font-size: 18px;
  background-color: #116DFF;
  color: #ffffff;
  text-indent: 25px;

}
.clearBtn{
  height: 56px;
  width: 119px;
  right: 194px;
  top: 487px;
  border-radius: 7px;
  position: absolute;
  background-color: transparent;
  color: #FFFFFF;
  border: 1px solid #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 60px;
  direction: rtl;
  font-size: 18px;
}
.clearBtnHover{
  border: 1px solid #116DFF !important;
  background-color: #116DFF !important;
}


.des {
  width: 100%;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  line-height: 60px;
  direction: rtl;
  font-size: 18px;
  color: #ffffff;
  position: absolute;
  top: 672px;
  /* left: 10px; */
  padding: 40px;
}

.submitBtnHover {
  border: 2px solid #ffffff;
}

.inpHover {
  border: 2px solid #ffffff;
}

.keyboardParent {
  width: 350px;
  height: 225px;
  right: 0px;
  position: absolute;
  /* bottom: 0px; */
  border-top: 1px solid #3b3a3f;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  top: 820px;
  direction: ltr;
}

::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #2B2B2B;
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: #2B2B2B;
}

::-ms-input-placeholder { /* Microsoft Edge */
  color: #2B2B2B;
}
</style>
