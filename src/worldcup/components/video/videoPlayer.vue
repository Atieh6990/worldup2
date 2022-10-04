<template>
  <div class="videoParent">

    <object v-if="url != ''" id="av-player" type="application/avplayer" ></object>

  </div>
</template>

<script>

import Player from "../../js/player"


export default {
  name: "player",
  data(){
    return{
      Player: "",url:"https://content.jwplatform.com/manifests/vM7nH0Kl.m3u8",
      playerObj:""
    }
  },
  created() {

    this.playerObj = new Player.VideoPlayer();//this.channel 104->aiofilm , 100->aiotoon
    this.playerObj.open(this.url);
    this.playerObj.play();
  }
}
</script>

<style scoped>
.videoParent{
  position: absolute;
  width: 1920px;height: 1080px;
  top: 0px;left: 0px;
  border: 1px solid red;
}
</style>
