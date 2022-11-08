<template>


  <div class="headerParent" v-if="getMenu().id !== ''">


    <div class="logo child">
      <img :src="WImgUrl+'menu_'+getMenu().id+'.png'">
      <!--      <img src="../../assets/images/menu/menu.png">-->
    </div>


    <div class="des child">
      <div class="title" style="  font-size: 18px;"><b>{{ getMenu().name }}</b></div>
      <div class="title" style="  font-size: 14px;">{{ getMenu().des }}</div>
    </div>


    <!--    <div class="back child">-->
    <!--      <div class="circle">-->
    <!--        <img src="../../assets/images/menu/backArrow.svg">-->
    <!--      </div>-->
    <!--    </div>-->


  </div>
</template>
<script>
import {mapMutations, mapGetters} from 'vuex'
import {ROAST_CONFIG} from "../../js/config";

export default {
  name: "header",
  data() {
    return {
      menuData: '',
      WImgUrl: ROAST_CONFIG.WImgUrl,
    }
  },
  created() {
    this.menuData = this.getMenu()
    // console.log('header created', this.getMenu(), 'len', this.getMenu().length)
  },
  methods: {
    ...mapGetters(['getMenu'])
  }
}
</script>

<style scoped>
.headerParent {
  position: relative;
  top: 0px;
  right: 0px;
  width: 100%;
  height: 100px;
  border-bottom: 3px solid #4A4A4B;
  /*display: flex;*/
  /*flex-direction: row;*/
  /*flex-wrap: nowrap;*/
  /*justify-content: center;*/
  /*align-items: center;*/
  /*align-content: center;*/
}

.child {
  position: relative;
  height: 100%;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  display: -webkit-flex !important;
  text-indent: 10px;
}

.logo {
  float: right;
  width: 20%;
}

.des {
  float: right;
  width: 60%;
}

.back {
  float: right;
  width: 20%;
}

.circle {
  /*display: flex;*/
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  height: 48px;
  width: 48px;
  background-color: #D9D9D9;
  border-radius: 50px;
  display: -webkit-flex !important;
}

.title {

  color: #FFFFFF;
  text-align: right;
  direction: rtl;
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: center;
  display: -webkit-box !important;
  display: -webkit-flex !important;
  display: -ms-flexbox !important;
  display: flex !important;
}
</style>
