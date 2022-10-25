<template>
  <div class="videoParent">

    <object v-if="url != '' && osType == 1" id="av-player" type="application/avplayer" class="playBox"></object>

  </div>
</template>

<script>

import Player from "../../js/player"
import {ROAST_CONFIG} from "../../js/config";
import {mapGetters} from 'vuex'

export default {
  name: "player",
  data() {
    return {
      Player: "",
      // url:"https://content.jwplatform.com/manifests/vM7nH0Kl.m3u8",
      url: "http://92.42.50.29/PLTV/88888888/224/3221226689/index.m3u8?rrsip=92.42.50.29&zoneoffset=0&devkbps=462-3000&servicetype=1&icpid=&accounttype=1&limitflux=-1&limitdur=-1&tenantId=9802&accountinfo=Xrt3KWcoCI5FlXhu5Zv8JxQnVoci7noamwPvHTQ6SQVrjR7xZ7nipIwU5pQG2f%2Bq%2BLz9EbXMj63mpUXJp%2FZIaRvnmpBPEQUyO0R0FdMse4fmq8sYw5cYLN6nrtr9fsgeGDFF6nwQdXBE5pZvI4SAYoRcSWuBLLH0De9WBPjgyJ8%3D%3A20211207150036%3AUTC%2C10001007206428%2C77.81.151.194%2C20211207150036%2Curn%3AHuawei%3AliveTV%3AXTV231927993%2C10001007206428%2C-1%2C0%2C1%2C%2C%2C2%2C%2C%2C%2C2%2C10000506368856%2C0%2C10500006361944%2C384af8f5386e59cb%2C%2C%2C1%2C1%2CEND&GuardEncType=2&it=H4sIAAAAAAAAADWOwW7CMBBE_8ZHy14S1zn4BKqEhEKlBK7Vxt64EU4MdoLUvy-hcJjLzLzRzAkt7XdmAyStKkF99LIoKuiICkShe0cKQXUs062OBpjFEIbJ19Gt2LnZfkvBASQHsYq16-BnQG_Es1svY0fJlG-woXQfLBmXe37HzNH7RB7nIU78K-DvKYVXhVH7OifVRmtdVboQAti8ui3myyNhP5i3cbxiIneI_gmYHkMmdkV7QU81jmSmJYR_7pjc480fcQ_gavYAAAA",
      // url:"http://92.42.50.29/PLTV/88888888/224/3221226614/index.m3u8?rrsip=92.42.50.29&zoneoffset=0&devkbps=462-3000&servicetype=1&icpid=&accounttype=1&limitflux=-1&limitdur=-1&tenantId=9805&accountinfo=Xrt3KWcoCI5FlXhu5Zv8JxQnVoci7noamwPvHTQ6SQVrjR7xZ7nipIwU5pQG2f%2Bq%2BLz9EbXMj63mpUXJp%2FZIaRvnmpBPEQUyO0R0FdMse4cLPyll2NC5rjL0Q3a2xsb1SI7KHdCxszTDM7fXkNro04RcSWuBLLH0De9WBPjgyJ8%3D%3A20211207150049%3AUTC%2C10001007206428%2C77.81.151.194%2C20211207150049%2Curn%3AHuawei%3AliveTV%3AXTV100000922%2C10001007206428%2C-1%2C0%2C1%2C%2C%2C2%2C%2C%2C%2C2%2C10000506368856%2C0%2C10500006361944%2C384af8f5386e59cb%2C%2C%2C1%2C1%2CEND&GuardEncType=2&it=H4sIAAAAAAAAADWOyw7CIBRE_4YlAUotXbDSmJiYamJ1a27hFhtpqVBN_Hutj8VsZuZMZopgcLPS3ArWSM4ky6VsRdbYUkmwBZeZWhgDJOGtCloQA953g6uCnbHTYXnmjArBqWCzSD0Prj04zT7d6t43GHX-Bw8YH51BbVNLH5AoOBfRwdSFge49PI_R_yoE6_-5RaaUKsuyYIKTaXZrSNd3Qi6QlqEfIaLdBvcBdAs-IRnBXMFhBT3q4e79l9tF-37zAmu9M432AAAA",
      playerObj: "",
      osType: ROAST_CONFIG.OS_TYPE
    }
  },
  created() {

    this.playVideo()


  },
  methods: {
    playVideo() {
      let _self = this
      if (this.osType == 1) {//tizen
        this.playerObj = new Player.VideoPlayer();//this.channel 104->aiofilm , 100->aiotoon
        this.playerObj.open(this.url);
        this.playerObj.play();
      } else {
        setTimeout(function () {
          window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'playVideo',
            data: {video: _self.url, poster: ''}
          }))
        }, 200);
      }
      ;
    },
  }
}
</script>

<style scoped>
.videoParent {
  position: absolute;
  width: 1920px;
  height: 1080px;
  top: 0px;
  left: 0px;
  z-index: 10;
  border: 1px solid red;
}

.playBox {
  position: absolute;
  width: 1920px;
  height: 1080px;
  top: 0px;
  left: 0px;
}
</style>
