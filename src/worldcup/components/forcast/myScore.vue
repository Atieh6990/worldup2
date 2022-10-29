<template>
  <div class="scoresBox">
    <div class="scoreParent">
      <div class="numScore" style="font-size: 30px;">788</div>
      <div class="titleScore" style="font-size: 12px;">امتیاز من</div>
    </div>
<!--    <div class="verLine"></div>-->
<!--    <div class="scoreParent" style="float:left;">-->
<!--      <div class="numScore" style="font-size: 30px;">200</div>-->
<!--      <div class="titleScore" style="font-size: 12px;">رتبه من</div>-->
<!--    </div>-->
  </div>
</template>

<script>
export default {
  name: "myScore"
}
</script>

<style scoped>
.scoresBox {
  box-sizing: border-box;
  width: 170px;
  height: 72px;
  background: #F9F9F9;
  border: 1px solid #FFFFFF;
  box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
  border-radius: 11px;
  top: 60px;
  position: relative;
  margin: auto;
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

.verLine {
  width: 0px;
  height: 52px;
  border: 1px solid rgba(142, 140, 140, 0.58);
  float: right;
  position: relative;
  right: 10px;
  top: 10px;
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

</style>