<template>

  <div class="parent">

    <img class="icon" :src="`${WImgUrl}menuSlide.png`">
    <div class="line"></div>

    <div class="menuItem" v-for="(item, index) in menuItem" :class="[(index == select) ? 'over':'']">
      <div class="child" style="width: 30%;float: right">
        <img :src="WImgUrl+'menuHover_'+item.id+'.png'" style="margin-top: 15%" v-if="index == select">
        <img :src="WImgUrl+'menu_'+item.id+'.png'" style="margin-top: 15%" v-else>
      </div>
      <div class="child" style="width: 70%;float: left">
        <div class="title" style="font-size: 16px;margin-top: 8%"><b>{{ item.name }}</b></div>
        <div v-if="index!=1" class="title" style="font-size: 12px;margin-top: 0%">{{ item.des }}</div>
        <div v-if="!pmErr && index==1" class="title" style="font-size: 12px;margin-top: 0%">{{ item.des }}</div>
        <div v-if="pmErr && index==1" class="title-err" style="font-size: 12px;margin-top: 0%">بر روی بازی زنده چت امکان پذیر است</div>
      </div>

    </div>

    <div class="showScore" v-if="hasLoggedIn">
      <myRank :user-score="myScoreNum"></myRank>
    </div>

  </div>

</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import func from "../mixins/mixin";
import {ROAST_CONFIG} from "../js/config";
import myRank from '../components/score/myRank'
import api from '../api/api'

export default {
  name: "menuRout",
  components: {myRank},
  mixins: [func],
  data() {
    return {
      WImgUrl: ROAST_CONFIG.WImgUrl,
      osType: ROAST_CONFIG.OS_TYPE,
      select: 0,
      menuItem: [],
      loginItem: {id: 0, name: 'ثبت نام', des: 'ثبت نام', rout: '/worldCupHome/login/'},
      hasLoggedIn: false, myScoreNum: '',pmErr:false
    }
  },
  created() {

    this.$root.$on("doFullScreenVideo", () => {
      // alert('doFullScreenVideo')
      this.enter()
    });

    this.menuItem = ROAST_CONFIG.menuItems


    if (this.getParam("Tokenw")) {
      let json = JSON.parse(this.getParam("Tokenw"));
      if (json && json.access_token) {
        this.hasLoggedIn = true
        api.scores().then(data => {
          if (data.success == 'true') {
            let find = data.data.find(element => element.self == 1).ranking;
            this.myScoreNum = find
          }

        })
      }
    }


  },
  methods: {

    ...mapMutations(['setMenu', 'setOnlinePlay']),
    ...mapGetters(['getMenu', 'getOnlinePlay']),
hidePM(){
 setTimeout(()=>{
   this.pmErr=false
 }, 3000);

},
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
      // console.log("enter menuRout")
      if(this.osType == 1){
        if(this.menuItem[this.select]['id']==2){
          this.pmErr=true
          this.hidePM()
          return
        }

      }
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
        // console.log("-----0",this.getMenu());
        this.setMenu(this.loginItem);
        // console.log("-----1",this.getMenu() , this.loginItem.rout , this.select);
        this.$router.push({path: this.loginItem.rout, query: {path: this.select}})
        // this.$router.replace({ path:this.loginItem.rout, query: {path: this.select}})
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
  height: 1080px;
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
.title-err{
  color: red;
  text-align: right;
  direction: rtl;
  width: 100%;
  height: 40%;
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

.showScore {
  position: absolute;
  width: 100%;
  right: 0px;
  bottom: 0px;
}
</style>
