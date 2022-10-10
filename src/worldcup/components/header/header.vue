<template>
  <div class="headerParent">


    <div class="logo child">
      <img :src="require('../../assets/images/menu/menu_'+getMenu().id+'.svg')">
    </div>


    <div class="des child">
      <div class="title" style="  font-size: 18px;"><b>{{ getMenu().name }}</b></div>
      <div class="title" style="  font-size: 14px;">{{ getMenu().des }}</div>
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

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.child {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  /*border: 1px solid red;*/
}

.logo {
  width: 20%;
}

.des {
  width: 60%;
}

.back {
  width: 20%;
}

.circle {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  height: 48px;
  width: 48px;
  background-color: #D9D9D9;
  border-radius: 50px;
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
}
</style>
