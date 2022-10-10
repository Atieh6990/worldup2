<template>

  <div class="parent">

    <img class="icon" src="../assets/images/menu/menuSlide.svg">
    <div class="line"></div>

    <div class="menuItem" v-for="(item, index) in menuItem" :class="[(index == select) ? 'over':'']">
      <div class="child" style="width: 30%">
        <img :src="require('../assets/images/menu/menu_'+item.id+'.svg')">
      </div>
      <div class="child" style="width: 70%">
        <div class="title" style="  font-size: 16px;"><b>{{ item.name }}</b></div>
        <div class="title" style="  font-size: 12px;">{{ item.des }}</div>
      </div>
    </div>

  </div>

</template>

<script>
import {mapMutations, mapGetters} from 'vuex'

export default {
  name: "menu",

  data() {
    return {
      select: 0,
      menuItem: [
        {id: 0, name: 'گردونه شانس', des: 'گردونه رو بچرخون و شانست رو امتحان کن', rout: 'Pm'},
        {id: 1, name: 'پیش بینی', des: 'پیش بینی لحظه ای مسابقات فوتبال', rout: 'Pm'},
        {id: 2, name: 'چت آنلاین', des: 'چت آنلاین حین تماشای فوتبال', rout: 'Pm'},
        {id: 3, name: 'پخش آنلاین', des: 'پخش آنلاین مسابقات جام جهانی', rout: 'Pm'},
        {id: 4, name: 'اسامی برندگان', des: 'معرفی بردنگاندوره های پیش بینی', rout: 'Pm'},
        {id: 5, name: 'امتیازات', des: 'محاسبه امتیاز', rout: 'Pm'},
        {id: 6, name: 'دیجی کلاب بت', des: 'سفارش آنلاین غذا و تنقلات', rout: 'Pm'},
      ],
    }
  },
  created() {

  },
  methods: {
    ...mapMutations(['setMenu']),
    down() {
      if (this.select < this.menuItem.length - 1) {
        this.select++
      }
    },
    up() {
      if (this.select > 0) {
        this.select--
      }
    },
    enter() {
      this.setMenu(this.menuItem[this.select]);
      this.$router.push(this.menuItem[this.select].rout)
    }
  }
}
</script>

<style scoped>
.parent {
  position: relative;
  width: 350px;
  /*height: 100%;*/
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  z-index: 100;

}

.line {
  width: 100%;
  height: 4px;
  background-color: #FFFFFF;
}

.menuItem {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;
  height: 89px;
  border-bottom: 2px solid #4A4A4B;
}

.child {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: space-between;
  height: 100%;
  /*border: 1px solid red;*/
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

.over {
  background-color: #4DCD2C;
}
</style>
