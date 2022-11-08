<template>
  <div class="backImg">
    <div class="profileParent">
      <img :src="WImgUrl+'profile.png'" class="imgPro"/>
      <div class="mobPro">{{userMob}}</div>
    </div>
    <div class="scoresBox">
      <div class="scoreParent">
        <div class="numScore" style="font-size: 30px;">{{ userScoreNum }}</div>
        <div  style="font-size: 12px;">
          <img :src="WImgUrl+'ballActive.png'" >
          <span class="titleScore">امتیاز من</span>
        </div>
      </div>
      <!--    <div class="scoreParent" style="float:left;">-->
      <!--      <div class="numScore" style="font-size: 30px;">200</div>-->
      <!--      <div class="titleScore" style="font-size: 12px;">رتبه من</div>-->
      <!--    </div>-->
    </div>
  </div>

</template>

<script>
import {ROAST_CONFIG} from "../../js/config";

export default {
  name: "myScore",
  props:['userMob','userScoreNum'],
  data() {
    return {
      WImgUrl:ROAST_CONFIG.WImgUrl,

    }
  },
  methods:{
  }
}
</script>

<style scoped>
.backImg {
  background: url('../../assets/images/winner/background.png');
  width: 100%;
  height: 202px;
  position: relative;
  top: 60px;
  display: -ms-flexbox;
  display: flex;
  display: -webkit-flex !important;
  margin: auto;
  flex-direction: column;
}

.profileParent {
  width: 90%;
  height: 72px;
  display: -ms-flexbox;
  display: flex;
  display: -webkit-flex !important;
  margin: auto;
  flex-direction: column;
  align-items: center;
}
.imgPro{
  width: 36px !important;
  height: 40px !important;
}
.mobPro{
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 38px;
  color: #FFFFFF;
  direction: ltr;
}

.scoresBox {
  box-sizing: border-box;
  width: 90%;
  height: 72px;
  background: #F9F9F9;
  border: 1px solid #FFFFFF;
  box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
  border-radius: 11px;
  margin: auto;
  margin-top: 0px;
}

.scoreParent {
  width: 150px;
  height: 100%;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  overflow: hidden;
  display: -webkit-flex !important;
  -ms-flex-direction: column;
  flex-direction: column;
  text-align: center;
  margin: auto;
}

.numScore {
  width: 100%;
  height: 50%;
  font-style: normal;
  font-weight: 400;
  line-height: 51px;
  text-align: center;
  color: #4A4A4B;
}
.titleScore{
  padding-right: 5px;
  line-height: 30px;
}

</style>
