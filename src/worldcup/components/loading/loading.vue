<template>
    <div class="loadingParent">
      <div class="blurBack"></div>
      <img :src="WImgUrl+'loading_final_2.gif'"  style="z-index: 1001;width: 50%;border-radius: 20px">
    </div>
</template>

<script>
import {ROAST_CONFIG} from "../../js/config";

export default {
  name: "loading",
  data() {
    return {

      WImgUrl:ROAST_CONFIG.WImgUrl,
    }
  },
}
</script>

<style scoped>

.loadingParent{
  position: absolute;
  height: 1080px;
  width: 350px;
  right: 0px;
  top: 0px;
  /*border: 1px solid red;*/
  z-index: 1000;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  display: -webkit-flex !important;
}
.blurBack{
  height: 1080px;
  width: 350px;
  right: 0px;
  top: 0px;
  z-index: 1000;
  border-radius: 0px;
  position: absolute;
  background-color: #11151A;
  opacity: 0.8;
}

</style>
