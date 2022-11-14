<template>
  <div class="champParent">
    <div class="champChild">

      <div class="countryItem" v-for="(item,index) in teams" :id="'country_' + index">

        <div class="flagParent">

          <div class="countryHover" v-if="index == select"></div>
          <div class="flagBack">
            <img style="width: 90%" :src="item.pic">
          </div>
        </div>

        <div class="nameParent">{{ item.name }}</div>

      </div>

    </div>

    <div class="popUpParent" v-if="popup">
      <div class="blurBack"></div>
      <div class="popBox">
        <div class="flagBack">
          <img style="width: 90%" :src="teams[select].pic">
        </div>
        <div class="selectName">{{ teams[select].name }}</div>
        <div class="selectName">
          شما تیم
          <span>{{ teams[select].name }}</span>
          را به عنوان قهرمان جام پیش بینی کردید.
        </div>
        <div class="buttonParent">
          <div class="submit" :class="[(popup && xpos == 0) ? 'hover':'']">تایید</div>
          <div class="back" :class="[(popup &&xpos == 1) ? 'hover':'']"><img src="../assets/images/champ/back.png">
          </div>
        </div>
      </div>
    </div>


    <div class="popUpParent" v-if="showSuccessPopup == true">
      <div class="blurBack"></div>
      <div :class="[(Erstatus) ?'success':'loose']" class="popBox">{{ Errmsg }}</div>
    </div>

  </div>
</template>

<script>
import IScroll from '../js/iscroll';
import api from '../api/api'

export default {
  name: "champ",
  data() {
    return {
      select: 0,
      myScroll: '',
      columnCount: 3,
      xpos: 0,
      popup: false, showSuccessPopup: false, Errmsg: '', Erstatus: '',
      teams: [],
      // teams: [
      //   {id: 0, name: 'ایران', icon: require('../assets/images/champ/B-3-IRAN-2 1.png')},
      //   {id: 1, name: 'سنگال', icon: require('../assets/images/champ/B-3-IRAN-2 1.png')},
      //   {id: 2, name: 'عربستان', icon: require('../assets/images/champ/B-3-IRAN-2 1.png')},
      //   {id: 3, name: 'لهستان', icon: require('../assets/images/champ/B-3-IRAN-2 1.png')},
      //   {id: 4, name: 'مکزیک', icon: require('../assets/images/champ/B-3-IRAN-2 1.png')},
      //   {id: 5, name: 'تونس', icon: require('../assets/images/champ/B-3-IRAN-2 1.png')},
      //   {id: 6, name: 'ژاپن', icon: require('../assets/images/champ/B-3-IRAN-2 1.png')},
      //   {id: 7, name: 'بلژیک', icon: require('../assets/images/champ/B-3-IRAN-2 1.png')},
      //   {id: 8, name: 'کاستاریکا', icon: require('../assets/images/champ/B-3-IRAN-2 1.png')},
      //   {id: 9, name: 'سنگال', icon: require('../assets/images/champ/B-3-IRAN-2 1.png')},
      //   {id: 10, name: 'عربستان', icon: require('../assets/images/champ/B-3-IRAN-2 1.png')},
      //   {id: 11, name: 'لهستان', icon: require('../assets/images/champ/B-3-IRAN-2 1.png')},
      //   {id: 12, name: 'ایران', icon: require('../assets/images/champ/B-3-IRAN-2 1.png')},
      //   {id: 13, name: 'مکزیک', icon: require('../assets/images/champ/B-3-IRAN-2 1.png')},
      //   {id: 14, name: 'ژاپن', icon: require('../assets/images/champ/B-3-IRAN-2 1.png')},
      //   {id: 15, name: 'بلژیک', icon: require('../assets/images/champ/B-3-IRAN-2 1.png')},
      //   {id: 16, name: 'تونس', icon: require('../assets/images/champ/B-3-IRAN-2 1.png')},
      //   {id: 17, name: 'عربستان', icon: require('../assets/images/champ/B-3-IRAN-2 1.png')},
      //   {id: 18, name: 'ایران', icon: require('../assets/images/champ/B-3-IRAN-2 1.png')},
      //   {id: 19, name: 'سنگال', icon: require('../assets/images/champ/B-3-IRAN-2 1.png')},
      //   {id: 20, name: 'ایران', icon: require('../assets/images/champ/B-3-IRAN-2 1.png')},
      //   {id: 21, name: 'ایران', icon: require('../assets/images/champ/B-3-IRAN-2 1.png')},
      // ],
    }
  },
  created() {

    api.allteams().then(data => {
      if (data.success) {
        this.teams = data.data;
        this.scrollInit();
      }
    })

  },
  methods: {
    right() {

      if (!this.popup) {
        if ((this.select % this.columnCount != parseInt(this.columnCount) - 1) && (this.select + 1 < this.teams.length)) {
          this.select++;
          return true
        }
        return false
      } else {
        this.xpos = 0
      }

    },

    left() {
      if (!this.popup) {
        if ((this.select % this.columnCount != 0)) {
          this.select--;
          return true
        }
        return false
      } else {
        this.xpos = 1
      }

    },

    down() {
      if (!this.popup) {
        if (((this.select + parseInt(this.columnCount)) < (this.teams.length))) {
          this.select += parseInt(this.columnCount);
          this.myScroll.scrollToElement('#country_' + this.select, 1000, false, true, '');
          return true
        }
        return false
      }

    },

    up() {
      if (!this.popup) {
        if (((this.select) >= this.columnCount)) {
          this.select -= parseInt(this.columnCount);
          this.myScroll.scrollToElement('#country_' + this.select, 1000, false, true, '');
          return true
        }
        return false;
      }

    },
    enter() {
      if (!this.popup) {
        this.popup = true;
      } else {

        if (this.xpos == 0) {//submit
          this.forecastChamp()
        } else if (this.xpos == 1) {//back
          this.popup = false
        }

      }
    },


    forecastChamp() {
      api.champForecast(this.teams[this.select].id).then(data => {
        this.popup = false;
        this.showSuccessPopup = true;
        this.Erstatus = data.success;
        this.Errmsg = data.data.message;
        this.hideSuccessPopUp();
      })
    },

    hideSuccessPopUp(){
      setTimeout(()=>{
        this.showSuccessPopup = false;
        this.Erstatus = '';
        this.Errmsg = '';
      } , 3000)
    },

    scrollInit() {
      let self = this;
      this.myScroll = '';
      if (this.myScroll == '' && this.teams.length > 0) {
        setTimeout(() => {
          this.myScroll = new IScroll(".champParent", {
            scrollY: true,
            momentum: true,
            preventDefault: false,
            scrollbars: false,
            mouseWheel: true,
            interactiveScrollbars: true,
            shrinkScrollbars: "none",
            fadeScrollbars: false,
            mouseMove: true,
            bounce: false,
          });

        }, 10);
      }
    },
  }
}
</script>

<style scoped>
.champParent {
  width: 350px;
  height: 980px;
  overflow: hidden;
  position: absolute;
  top: 100px;
  right: 0px;
  direction: ltr;
  /*border: 1px solid red;*/
}

.champChild {
  width: 350px;
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  align-content: flex-start;
  display: -webkit-flex !important;
}

.countryItem {
  height: 130px;
  width: 92px;
  float: left;
  margin-left: 23px;
  margin-top: 23px;
  /*border: 1px solid green;*/
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  align-content: flex-start;
  display: -webkit-flex !important;
}

.flagParent {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  display: -webkit-flex !important;
  width: 92px;
  height: 92px;
  /*border: 1px solid blue;*/
}

.nameParent {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  display: -webkit-flex !important;
  width: 92px;
  height: 35px;
  /*border: 1px solid blue;*/
}

.countryHover {
  height: 92px;
  width: 92px;
  border-radius: 50%;
  position: absolute;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  display: -webkit-flex !important;
  border: 3px solid #4DCD2C;
  background-color: rgba(64, 191, 33, 0.39);
}

.flagBack {
  height: 72px;
  width: 72px;
  border-radius: 50%;
  /*position: absolute;*/
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  display: -webkit-flex !important;
  box-shadow: 2px 4px 5px 0px #00000040;
  background-color: #FFFFFF;
  z-index: 1;
}

.nameParent {
  width: 92px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  display: -webkit-flex !important;
  color: #FFFFFF;
  font-size: 18px;
  text-align: center;
  white-space: nowrap;
}

.popUpParent {
  position: absolute;
  height: 980px;
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

.blurBack {
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

.popBox {
  padding: 15px;
  height: 310px;
  width: 303px;
  border-radius: 15px;
  background: #FFFFFF;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  align-content: center;
  display: -webkit-flex !important;
  direction: rtl;
}

.selectName {
  width: 100%;
  font-size: 20px;
  color: #000000;
  text-align: center;

}

.buttonParent {
  width: 100%;
  height: 45px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;

  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -ms-flex-pack: center;
  justify-content: space-around;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-line-pack: center;
  align-content: center;
  display: -webkit-flex !important;
}

.submit {
  height: 45px;
  width: 166px;
  border-radius: 8px;
  background: #116DFF;
  color: #FFFFFF;
  font-size: 18px;
  text-align: center;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  display: -webkit-flex !important;
}

.back {
  height: 45px;
  width: 69px;
  border-radius: 8px;
  background: #C94747;
  font-size: 18px;
  text-align: center;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  display: -webkit-flex !important;
}

.hover {
  border: 1px solid red;
}

.success {
  color: #40BF21;
}

.loose {
  color: #F82F43;
}

/*.popBoxErr {*/
/*  box-sizing: border-box;*/
/*  width: 290px;*/
/*  height: 170px;*/
/*  background: #FFFFFF;*/
/*  border-radius: 11px;*/
/*  z-index: 10;*/
/*  display: flex;*/
/*  display: -webkit-flex !important;*/
/*  flex-direction: row;*/
/*  flex-wrap: nowrap;*/
/*  justify-content: center;*/
/*  -webkit-justify-content: center;*/

/*  align-items: center;*/
/*  -webkit-align-items: center;*/
/*  align-content: stretch;*/
/*  color: red;*/
/*  font-size: 20px;*/

/*}*/
</style>
