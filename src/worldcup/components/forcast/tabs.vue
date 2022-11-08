<template>
  <div class="itemsParent">
    <div v-for="(item,i) in items" :class="['items', (yPos==0&&xItem==i) ? 'colorNav' : '',(selectedTab==i) ? 'selectedNav' : '']">{{ item }}</div>
  </div>
</template>

<script>
export default {
  name: "tabs",
  props: ['yPos'],
  data() {
    return {
      xItem: 0,
      items: ['بازیهای پیش رو', 'پیش بینی های من'],
      selectedTab:0
    }
  },
  methods: {
    right() {
      if (this.xItem > 0)
        this.xItem--;
    },
    left() {
      // console.log(this.xItem , this.items.length)
      if (this.xItem < this.items.length-1)
        this.xItem++;
    },
    down(){
      return false
    },
    up(){
      return false
    },
    enter(){
      this.selectedTab=this.xItem
      return this.xItem;
    }
  }
}
</script>

<style scoped>

.itemsParent {
  width: 350px;
  height: 48px;
  display: flex;
  display: -webkit-flex !important;
  position: relative;
  top: 15px;
  /*position: relative;*/
  /*top: 20px;*/

}

.items {
  width: 156px;
  height: 48px;
  line-height: 45px;
  color: #ffffff;
  font-size: 16px;
  text-align: center;
  z-index: 1;
  background: rgba(74, 74, 75, 1);
  border-radius: 36px;
  margin: auto;
  border: 3px solid transparent;
  /*float: right;*/
  /*margin-right: 12px;*/
}

.colorNav {
  /*background: rgba(17, 109, 255, 1);*/
  border: 3px solid rgba(77, 205, 44, 1);
}
.selectedNav{
  background: rgba(17, 109, 255, 1);
}

</style>
