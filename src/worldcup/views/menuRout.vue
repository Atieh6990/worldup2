<template>

  <div class="parent">

    <img class="icon" src="../assets/images/menu/menuSlide.png">
    <div class="line"></div>

    <div class="menuItem" v-for="(item, index) in menuItem" :class="[(index == select) ? 'over':'']">
      <div class="child" style="width: 30%;float: right">
        <img :src="require('../assets/images/menu/menu_'+item.id+'.png')" style="margin-top: 15%">
      </div>
      <div class="child" style="width: 70%;float: left">
        <div class="title" style="font-size: 16px;margin-top: 8%"><b>{{ item.name }}</b></div>
        <div class="title" style="font-size: 12px;margin-top: 0%">{{ item.des }}</div>
      </div>

    </div>

  </div>

</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import func from "../mixins/mixin";
import {ROAST_CONFIG} from "../js/config";

export default {
  name: "menuRout",
  mixins: [func],
  data() {
    return {
      osType: ROAST_CONFIG.OS_TYPE,
      select: 0,
      menuItem: [],
      loginItem: {id: 0, name: 'ثبت نام', des: 'ثبت نام', rout: '/worldCupHome/login/'},

    }
  },
  created() {

    this.$root.$on("doFullScreenVideo", () => {
      this.enter()
    });

    this.menuItem=ROAST_CONFIG.menuItems

  },
  methods: {

    ...mapMutations(['setMenu', 'setOnlinePlay']),
    ...mapGetters(['getMenu', 'getOnlinePlay']),

    down() {
      if (this.select < this.menuItem.length - 1) {
        this.select++
      }
    },
    up() {
      if (this.select > 0) {
        this.select--
      }
    },
    enter() {
      // alert("enter menu rout")
      if (this.menuItem[this.select]['id'] == 3) {

        this.setMenu(this.menuItem[this.select]);

        this.$router.push(this.menuItem[this.select].rout);

        this.setOnlinePlay(true);


        if (this.osType == 0) {

          this.fullScreenVideo(true)

        }

      } else if (this.checkToken()) {
        this.setMenu(this.menuItem[this.select]);
        this.$router.push(this.menuItem[this.select].rout)
      } else {
        console.log("-----0",this.getMenu());
        this.setMenu(this.loginItem);
        console.log("-----1",this.getMenu());
        this.$router.push({path: this.loginItem.rout, query: {path: this.select}})

      }

    },
    checkToken() {
      let key = this.getParam("Tokenw")

      if (key == null || key == 'null' || key == '' || typeof key == "undefined") {
        return false
      }
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
    }
    ,
  }
}
</script>

<style scoped>
.parent {
  position: absolute;
  /*float: right;*/
  margin-right: 0px;
  margin-top: 0px;
  width: 350px;

  /*border:3px solid green;*/

  /*display: flex;*/
  /*flex-direction: column;*/
  /*flex-wrap: nowrap;*/
  /*justify-content: flex-start;*/
  /*align-items: center;*/
  /*align-content: center;*/
  z-index: 100;
}

.icon {
  width: 100%;
}

.line {
  width: 100%;
  height: 4px;
  background-color: #FFFFFF;
}

.menuItem {
  position: relative;
  /*display: flex;*/
  /*flex-direction: row;*/
  /*flex-wrap: nowrap;*/
  /*justify-content: center;*/
  /*align-items: center;*/
  /*align-content: center;*/
  width: 100%;
  height: 89px;
  border-bottom: 2px solid #4A4A4B;
}

.child {
  /*display: flex;*/
  /*flex-direction: column;*/
  /*flex-wrap: nowrap;*/
  /*justify-content: center;*/
  /*align-items: center;*/
  /*align-content: space-between;*/
  position: relative;
  height: 100%;
  /*border: 1px solid red;*/
}

.title {
  color: #FFFFFF;
  text-align: right;
  direction: rtl;
  width: 100%;
  height: 40%;
  /*display: flex;*/
  /*flex-direction: column;*/
  /*flex-wrap: nowrap;*/
  /*justify-content: center;*/
  /*align-content: center;*/
}

.over {
  background-color: #4DCD2C;
}
</style>
