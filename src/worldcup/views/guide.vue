<template>
  <div class="parent">
    <img :src="WImgUrl+'rahnama.png'" style="z-index: 10">
  </div>
</template>

<script>
import {ROAST_CONFIG} from "../js/config";

export default {
  name: "guide",
  data(){
    return{
      WImgUrl:ROAST_CONFIG.WImgUrl,
    }

  },
  methods:{

  }
}
</script>

<style scoped>
.parent {
  width: 350px;
  height: 950px;
  overflow: hidden;
  position: absolute;
  top: 100px;
  right: 0px;
}
</style>
