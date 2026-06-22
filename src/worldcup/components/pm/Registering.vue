<template>
  <div class="registerParent">
    <input :class="[((yPos == 0 && activeRoute == 1) ? 'inpHover':''),'content']" :value="contentTxt"
           :placeholder="placeHolders[type]"
           type="text"
           readonly
           tabindex="-1"
           :id="'content_'+type" v-on:click="onContentClick" ref="content" v-if="osType== 1">

    <div v-else>
      <div :class="[((yPos == 0 && activeRoute == 1) ? 'inpHover':''),'content']"
           :id="'content_'+type" v-on:click="onContentClick" ref="content" tabindex="-1">
        {{ showContentTxt }}
      </div>
    </div>

    <div :class="[((yPos == 1 && activeRoute == 1) ? 'submitBtnHover':''),'submitBtn']"
         v-on:click="submitBtn()">
      <span style="padding-left: 15px">{{ btnTxt[type] }}</span>
      <img :src="wImg(icons[type])" >
    </div>

    <div class="keyboardParent" v-if="isNumericType">
      <numeric-keyboard
        ref="numericKeyboard"
        @digit="appendDigit"
        @backspace="onKeyboardBackspace"
      />
    </div>

    <div v-if="des[type]" class="des" :class="{ desBelowKeyboard: isNumericType }">{{ des[type] }}</div>
    <div class="errorMdg" :class="{ errorWithKeyboard: isNumericType }">{{ errorMessage }}</div>

<!--    <div class="keyboardParent" v-if="type == 2">-->
<!--      <SimpleKeyboard @onChange="onChange" @onKeyPress="onKeyPress" :input="contentTxt" ref="SimpleKeyboard"/>-->
<!--    </div>-->
  </div>
</template>

<script>
import func from "../../mixins/mixin";
import SimpleKeyboard from "./SimpleKeyboard";
import NumericKeyboard from "./NumericKeyboard";
import {ROAST_CONFIG} from "../../js/config";

export default {
  name: "Registering",
  props: ["type", "activeRoute", "yPage", "numberShow"],
  mixins: [func],
  data() {
    return {
      icons: ['sendBtn.png', 'dashicons_cloud-saved.png', 'sendBtn.png'],
      placeHolders: ['شماره تلفن همراه خود را وارد کنید', 'کد چهار رقمی را وارد کنید', 'نام مستعار خود را انتخاب کنید.'],
      btnTxt: ["ارسال", "ثبت", "ثبت"],
      des: ["", "بعد از ارسال شماره تلفن همراه کد فعال سازی 4 رقمی برای شما پیامک خواهد شد", ""],
      contentTxt: "",
      yPos: 0,//0->input 1->btn , 2->keyboard
      contentDivTxt: ['شماره تلفن همراه خود را وارد کنید', 'کد چهار رقمی را وارد کنید', 'نام مستعار خود را انتخاب کنید.'],
      errorMessage:'',
      osType:ROAST_CONFIG.OS_TYPE,
      _keyboardInputLock: false,
    };
  },
  computed: {
    isNumericType() {
      return this.type === 0 || this.type === 1
    },
    maxInputLength() {
      if (this.type === 0) return 11
      if (this.type === 1) return 4
      return 64
    },
    showContentTxt: function () {
      this.contentDivTxt[this.type] = (this.contentTxt != '') ? (this.contentTxt) : (this.placeHolders[this.type]);
      return this.contentDivTxt[this.type]
    },
  },
  created() {
    this.yPos = 0;
    if (this.shouldAutoShowIme()) {
      this.showIme("content_" + this.type);
    }

    this.$root.$on("set_error_msgL", data => {
      this.errorMessage = data
    })
  },
  mounted() {
    this._contentClickGuard = (event) => {
      if (!this.isNumericType || this.yPos !== 2) return
      event.preventDefault()
      event.stopPropagation()
      event.stopImmediatePropagation()
    }
    this.$nextTick(() => this.attachContentGuards())
  },
  beforeDestroy() {
    this.detachContentGuards()
    clearTimeout(this._keyboardInputUnlockTimer)
  },
  watch: {
    type: function () {
      this.detachContentGuards()
      this.contentTxt = "";
      this.yPos = 0;
      this.deactivateNumericKeyboard();
      this.hideIme("content_" + this.type);
      this.$nextTick(() => this.attachContentGuards())
    },
    numberShow: function (val) {
      const sanitized = this.sanitizeNumeric(val)
      if (sanitized === this.contentTxt) return
      if (this.yPos === 2 && this.isNumericType) return
      this.contentTxt = sanitized
    },
    errorMessage:function (){
      let _self = this
      setTimeout(function (){
        _self.errorMessage = ''
      },3500)
    }
  },
  components: { SimpleKeyboard, NumericKeyboard },
  methods: {
    shouldAutoShowIme() {
      if (ROAST_CONFIG.OS_TYPE === 0 || ROAST_CONFIG.WEBVIEW_MODE) return false
      if (this.isNumericType) return false
      if (ROAST_CONFIG.DEVELOP_MODE === 1) return false
      return true
    },
    sanitizeNumeric(value) {
      const digits = String(value == null ? '' : value).replace(/\D/g, '')
      return digits.slice(0, this.maxInputLength)
    },
    appendDigit(digit) {
      if (!this.isNumericType) return
      this.lockKeyboardInput()
      const next = this.sanitizeNumeric(String(this.contentTxt || '') + String(digit))
      this.contentTxt = next
      this.$emit('syncNumber', next)
      this.ensureKeyboardFocus()
    },
    onKeyboardBackspace() {
      if (!this.isNumericType) return
      this.lockKeyboardInput()
      this.contentTxt = String(this.contentTxt || '').slice(0, -1)
      this.$emit('syncNumber', this.contentTxt)
      this.ensureKeyboardFocus()
    },
    lockKeyboardInput() {
      this._keyboardInputLock = true
      clearTimeout(this._keyboardInputUnlockTimer)
      this._keyboardInputUnlockTimer = setTimeout(() => {
        this._keyboardInputLock = false
      }, 120)
    },
    attachContentGuards() {
      const el = document.getElementById('content_' + this.type)
      if (!el || !this._contentClickGuard) return
      el.addEventListener('click', this._contentClickGuard, true)
    },
    detachContentGuards() {
      const el = document.getElementById('content_' + this.type)
      if (!el || !this._contentClickGuard) return
      el.removeEventListener('click', this._contentClickGuard, true)
    },
    blurContentField() {
      const el = document.getElementById('content_' + this.type)
      if (!el) return
      if (typeof el.blur === 'function') {
        el.blur()
      }
      if (document.activeElement === el && document.body && document.body.focus) {
        document.body.focus()
      }
    },
    activateNumericKeyboard() {
      this.yPos = 2
      this.blurContentField()
      this.$nextTick(() => {
        if (this.$refs.numericKeyboard) {
          this.$refs.numericKeyboard.activate()
        }
      })
    },
    ensureKeyboardFocus() {
      if (!this.isNumericType) return
      this.yPos = 2
      this.blurContentField()
      this.$nextTick(() => {
        if (this.$refs.numericKeyboard) {
          this.$refs.numericKeyboard.ensureActive()
        }
      })
    },
    deactivateNumericKeyboard() {
      if (this.$refs.numericKeyboard) {
        this.$refs.numericKeyboard.deactivate()
      }
    },
    cancel(){
      this.deactivateNumericKeyboard();
      this.hideIme("content_" + this.type);
    },
    down() {
      if (this.yPos == 0) {
        this.deactivateNumericKeyboard();
        this.hideIme("content_" + this.type);
        this.yPos = 1;
        return false
      }

      if (this.yPos == 1) {
        if (this.isNumericType) {
          this.yPos = 2;
          this.activateNumericKeyboard();
          return false
        }
        if (this.type == 2) {
          this.yPos = 2;
          this.$refs.SimpleKeyboard.toggleHover(1);
          return false
        }
      }

      if (this.yPos == 2) {
        if (this.isNumericType) {
          this.$refs.numericKeyboard.down();
          return false
        }
        this.$refs.SimpleKeyboard.down();
        return false
      }
    },

    enter() {
      if (this.type == 2) {
        if (this.yPos == 2) {
          this.$refs.SimpleKeyboard.enter();
          return false
        }
      }

      if (this.yPos == 2 && this.isNumericType) {
        this.lockKeyboardInput()
        if (this.$refs.numericKeyboard) {
          this.$refs.numericKeyboard.enter();
        }
        this.ensureKeyboardFocus()
        return true;
      }

      if (this.yPos == 0) {
        if (this.isNumericType) {
          this.yPos = 2;
          this.activateNumericKeyboard();
          return true;
        }
        this.showIme("content_" + this.type);
        return true;
      } else {
        this.nextStep();
        return true;
      }
    },

    up() {
      if (this.yPos == 2) {
        if (this.isNumericType) {
          if (!this.$refs.numericKeyboard.up()) {
            this.deactivateNumericKeyboard();
            this.yPos = 1;
          }
          return false
        }
        if (!this.$refs.SimpleKeyboard.up()) {
          this.$refs.SimpleKeyboard.toggleHover(0);
          this.yPos = 1;
        }
        return false
      }

      if (this.yPos == 1) {
        this.yPos = 0;
        this.deactivateNumericKeyboard();
        return false;
      }
    },

    right() {
      if (this.yPos == 2) {
        if (this.isNumericType) {
          return this.$refs.numericKeyboard.right()
        }
        if (!this.$refs.SimpleKeyboard.right()) {
          this.$refs.SimpleKeyboard.toggleHover(0)
          return false
        }
        return true
      }
      return false
    },

    left() {
      if (this.yPos == 2) {
        if (this.isNumericType) {
          return this.$refs.numericKeyboard.left()
        }
        this.$refs.SimpleKeyboard.left();
      }
      return false
    },

    clearContent() {
      this.contentTxt = '';
      this.$emit('syncNumber', '');
      this.$set(this.contentDivTxt, this.type, this.placeHolders[this.type]);
      this.$emit('clearNumber');
    },
    submitBtn() {
      this.deactivateNumericKeyboard();
      this.hideIme("content_" + this.type);
      if (this.type == 2)
        this.$refs.SimpleKeyboard.toggleHover(0);
      this.yPos = 1;
      this.nextStep();
    },
    nextStep() {
      this.deactivateNumericKeyboard();
      this.hideIme("content_" + this.type);
      this.$emit("set_error_msgL", "");
      this.yPos = 0;

      if(this.type == 0 && this.contentTxt.length < 11){
        this.errorMessage = 'تلفن همراه نباید کمتر از 11 کاراکتر باشد';
        return false
      }

      if(this.type == 1 && this.contentTxt.length < 4){
        this.errorMessage = 'کد نباید کمتر از 4 کاراکتر باشد.';
        return false
      }

      if (this.contentTxt != "") {
        let send = {type: this.type, content: this.contentTxt};
        setTimeout(() => {
          this.$emit("manageRegisterData", send);
        }, 600)
      } else {
        this.errorMessage = "فیلد هارا پر کنید."
      }
    },
    onContentClick() {
      if (this.isNumericType && (this.yPos === 2 || this._keyboardInputLock)) return
      if (ROAST_CONFIG.OS_TYPE === 0 && this.isNumericType) return
      this.removeHover()
    },
    removeHover() {
      if (this._keyboardInputLock || (this.isNumericType && this.yPos === 2)) return
      this.$emit("set_error_msgL", "");
      if (this.type == 2)
        this.$refs.SimpleKeyboard.toggleHover(0);
      this.deactivateNumericKeyboard();
      this.yPos = 0;
    },
    keyboardAddHover() {
      this.$refs.SimpleKeyboard.toggleHover(1);
    },
    onChange(input) {
      this.contentTxt = input;
    },
    onKeyPress(button) {
    },
    onInputChange(input) {
      this.contentTxt = input.target.value;
    },
  }
};
</script>

<style scoped>
.registerParent {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.content {
  height: 56px;
  width: 301px;
  right: 17px;
  top: 10px;
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
  top: 91px;
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

.keyboardParent {
  width: 301px;
  position: absolute;
  top: 171px;
  right: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  display: -webkit-flex !important;
  -webkit-justify-content: center;
  direction: ltr;
}

.des {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  line-height: 28px;
  direction: rtl;
  font-size: 18px;
  color: #ffffff;
  position: absolute;
  top: 343px;
  width: 100%;
  padding: 40px;
  box-sizing: border-box;
}

.desBelowKeyboard {
  width: 301px;
  right: 17px;
  top: 355px;
  padding: 12px 0;
  text-align: center;
}

.submitBtnHover {
  border: 2px solid #ffffff;
}

.inpHover {
  border: 2px solid #ffffff;
}

.errorMdg {
  width: 350px;
  height: 60px;
  right: 0px;
  position: absolute;
  top: 301px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  color: #FF3939;
  display: -webkit-flex !important;
}

.errorWithKeyboard {
  top: 460px;
}

::placeholder {
  color: #2B2B2B;
  opacity: 1;
}

:-ms-input-placeholder {
  color: #2B2B2B;
}

::-ms-input-placeholder {
  color: #2B2B2B;
}
</style>
