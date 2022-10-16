<template>


  <div class="headerParent" v-if="menuData.id != ''">


    <div class="logo child">
      <img :src="require('../../assets/images/menu/menu_'+menuData.id+'.png')">
      <!--      <img src="../../assets/images/menu/menu.png">-->
    </div>


    <div class="des child">
      <div class="title" style="  font-size: 18px;"><b>{{ menuData.name }}</b></div>
      <div class="title" style="  font-size: 14px;">{{ menuData.des }}</div>
    </div>


    <div class="back child">
      <div class="circle">
        <img src="../../assets/images/menu/backArrow.svg">
      </div>
    </div>


  </div>
</template>
<script>
import {mapMutations, mapGetters} from 'vuex'

export default {
  name: "header",
  data() {
    return {
      menuData: ''
    }
  },
  created() {
    this.menuData = this.getMenu()
    console.log('header created', this.menuData, 'len', this.menuData.length)
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

  /*border: 1px solid red;*/
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
  height: 40%;
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
