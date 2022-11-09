<template>
  <div class="scoresBox">
    <div class="scoreParent">
      <div class="numScore">{{ userScore }}</div>
      <div class="titleScore">مجموع امتیازات من:</div>
      <div class="verLine"></div>
      <div style="width: 20%; margin: auto;">
        <img style="width: 35px;height: 31.11px" :src="WImgUrl+'myScore.png'">
      </div>
    </div>
  </div>
</template>

<script>
import {ROAST_CONFIG} from "@/worldcup/js/config";

export default {
  name: "myScore",
  props:["userScore"],
  data(){
    return{
      WImgUrl: ROAST_CONFIG.WImgUrl,
    }
  }
}
</script>

<style scoped>

.scoresBox {
  box-sizing: border-box;
  width: 90%;
  height: 56px;
  line-height: 56px;
  background: #F9F9F9;
  border: 1px solid #FFFFFF;
  box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
  border-radius: 11px;
  margin: auto;
  margin-bottom: 15px;
}

.scoreParent {
  width: 100%;
  height: 100%;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  overflow: hidden;
  display: -webkit-flex !important;
  -ms-flex-direction: column;
  flex-direction: row-reverse;
  text-align: center;
  margin: auto;
}

.numScore {
  width: 25%;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  color: #4A4A4B;
  font-size: 30px;
  line-height: 60px;
}

.titleScore {
  padding-right: 5px;
  width: 55%;
  text-align: center;
  font-size: 18px;
}

.verLine {
  width: 0px;
  height: 36px;
  border: 1px solid #8E8C8C;
  margin: auto;
}

</style>
