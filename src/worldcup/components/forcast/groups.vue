<template>
  <div class="groupParent">
    <flickity class="flickity suggestedProgram" ref="flickity" :options="flickityOptions" v-if="groups.length>0">

      <div v-for="(item,index) in groups" :id="'groupItem_'+index"
           :class="['items', (yPos==1&&xItem==index) ? 'colorNav' : '',(selectedTab==index) ? 'selectedNav' : '']">
        {{ item }}
      </div>

    </flickity>

  </div>
</template>

<script>
import Flickity from 'vue-flickity';

export default {
  props: ['yPos', 'groups'],
  name: "groups",
  components: {Flickity},
  data() {
    return {
      // items: ['گروهی ، دوشنبه،30آبان', 'گروهی، سه شنبه ، 1آذر', 'گروهی ، چهارشنبه ، 2آذر', 'گروهی ، پنجشنبه ، 3آذر', 'گروهی ، چهارشنبه ، 2آذر'],
      xItem: 0,
      selectedTab:0,
      flickityOptions: {
        accessibility: false,
        contain: true,
        draggable: false,
        freeScroll: false,
        adaptiveHeight: true,
        prevNextButtons: false,
        pageDots: false,
        rightToLeft: true
      },
    }
  },
  created() {
    let self = this;
    this.activeRoute = 1
    // this.refreshScroll();
    setTimeout(() => {
      // self.scrollInit();
      // console.log("groups comprrr",this.groups)
    }, 60)
  },


  methods: {


    left() {

      if (this.xItem < this.groups.length - 1) {
        this.$refs.flickity.next();
        this.xItem++

        return true
      }

    },
    right() {
      if (this.xItem > 0) {
        // alert('if')
        this.$refs.flickity.previous();
        this.xItem--
        return true
      }

    },
    down() {
      return false
    },
    up() {
      return false
    },
    enter() {
      this.$emit("selectItem", this.xItem);
      this.selectedTab=this.xItem
      return this.xItem
    }
  }
}
</script>

<style scoped>

.groupParent {
  width: 332px;
  right: 7px;
  height: 35px;
  top: 30px;
  position: relative;
  direction: rtl;
  display: flex;
  justify-content: center;
  overflow: hidden;
  /*border: 1px solid red;*/
  display: -webkit-flex !important;;

}

.flickity {
  height: 35px;
  width: 100%;
}

.items {
  float: right;
  height: 35px;
  line-height: 24px;
  color: #ffffff;
  font-size: 16px;
  z-index: 1;
  border-radius: 36px;
  margin-left: 15px;
  padding: 5px 15px 5px 15px;
  text-align: center;
  /*white-space: nowrap;*/
  background-color: #FFFFFF26;
  color: #FFFFFF;
  direction: rtl !important;
  width: 150px;
}

.colorNav {
  /*background: rgba(17, 109, 255, 1);*/
  border: 3px solid rgba(77, 205, 44, 1);
  /*color: #116DFF;;*/
}
.selectedNav{
  background: rgba(17, 109, 255, 1);
}
</style>
