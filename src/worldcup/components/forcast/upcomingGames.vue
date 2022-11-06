<template>
  <div style="  direction: rtl !important;">
    <div class="popupParent" v-if="showSuccessPopup == true">
      <div class="popupBack"></div>
      <div    :class="[(Erstatus) ?'popBox':'popBoxErr']"   >{{Errmsg}}</div>
    </div>
    <tabs :y-pos="yPos" ref="tabs"></tabs>
    <groups v-on:selectItem="selectItem" :y-pos="yPos"  :groups="groups" ref="groups"></groups>
    <games v-on:dopredict="dopredict" :y-pos="yPos" :selectedIndex="selectedIndex" :groups="groups" :matches="predictable" ref="games" v-if="type == 0 && predictable[0]"></games>
    <myforcasts ref="myforcasts" :mypredict="mypredict" :selectedIndex="selectedIndex" v-if="type == 1 && mypredict[0]" ></myforcasts>

  </div>
</template>

<script>

import api from "../../api/api";
import tabs from '../forcast/tabs'
import groups from '../forcast/groups'
import games from '../forcast/games'
import myforcasts from "../forcast/myforcasts";

export default {
  name: "UpcomingGames",
  data() {
    return {
      data:"",
      matches: '',
      predictable:[],
      mypredict:[],
      groups: [],
      yPos: 0,
      type: 0,//0 -> bazi haye pishe roo , 1 -> pishbini haye man
      selectedIndex:0,
      showSuccessPopup:false,
      Erstatus:false,
      Errmsg:"",
    }
  },
  components: {tabs, groups, games, myforcasts},
  created() {

    this.matchesApi();
  },
  methods: {
    hidePopUp() {
      setTimeout(()=>{
        this.showSuccessPopup = false
      },1000)

    },
    dopredict(status,msg){
      this.showSuccessPopup = true
      this.Erstatus=status
      this.Errmsg=msg
      this.matchesApi();
    },
    selectItem(index){
      this.selectedIndex=index
    },
    up() {


      if (this.yPos == 1) {
        this.yPos--;
        return false
      }

      if (this.yPos == 2) {
        if (this.type == 0) {//games
          if (!this.$refs.games.up()) {
            this.yPos = 1
          }
        } else {//myforcasts
          if (!this.$refs.myforcasts.up()) {
            this.yPos = 1
          }
        }

      }

    },

    down() {

      if (this.yPos == 0 || this.yPos == 1) {
        console.log("--------0000009999999",this.predictable[this.selectedIndex].length)
        if(this.yPos == 1 && ((this.type == 0 && !this.predictable[this.selectedIndex].length) ||  (this.type == 1 && !this.mypredict[this.selectedIndex].length))){
return
        }
        this.yPos++;
        return false
      }

      if (this.yPos == 2) {
        if (this.type == 0) {//games
          this.$refs.games.down()
        } else {//myforcasts
          this.$refs.myforcasts.down()
        }

      }

    },

    right() {
      if (this.yPos == 0) {
        this.$refs.tabs.right()
      }
      if (this.yPos == 1) {
        this.$refs.groups.right()
      }
      if (this.yPos == 2) {
        this.$refs.games.right()
      }
    },

    left() {
      if (this.yPos == 0) {
        this.$refs.tabs.left()
      }

      if (this.yPos == 1) {
        this.$refs.groups.left()
      }

      if (this.yPos == 2) {
        this.$refs.games.left()
      }
    },

    enter() {

      if (this.yPos == 0) {//tabs
        this.type = this.$refs.tabs.enter()
      }

      if (this.yPos == 1) {//groups
        this.$refs.groups.enter()
      }

      if (this.yPos == 2) {//games or myforcast
        if (this.type == 0) {//game
          this.$refs.games.enter() //TODO sabte pishbini
        } else {//myforcast

        }
      }

    },

    showNumber(number) {
      if (this.yPos == 2 && this.type == 0) {
        this.$refs.games.showNumber(number)
      }
    },
      createGroups(arr){
      let groups=[]
      let predictable=[]
      let mypredict=[]
      let i = 0, len = Object.keys(arr).length;
      while (i < len) {
     // your code
        groups.push(arr[i].title)
      //  console.log("----",groups)
    let predictableitem=arr[i].match.filter( ( item ) => {
      return item.predictable==0;
    })
    predictable.push(predictableitem)
    let mypredictitem=arr[i].match.filter( ( item ) => {
     // return item.predictable==1 && item.is_forecast==1;
      return item.is_forecast==1;
    })
        mypredict.push(mypredictitem)
        i++
   }


   this.groups= groups
  this.predictable= predictable
  this.mypredict=mypredict
  console.log("this.groups",this.groups)
  console.log("this.predictable",this.predictable)
  //console.log("this.mypredict", this.$refs.groups.resetParams())
       // this.$refs.groups.up()
  },


    matchesApi() {
     // this.data ={
     //   "0": {
     //     "title": "shamsi date1",
     //     "match": [
     //       {
     //         "id": "1",
     //         "goala": "",
     //         "goalb": "",
     //         "starttime": "",
     //         "percent_teama": "",
     //         "percent_teamb": "",
     //         "percent_equal": "",
     //         "maxresult": {
     //           "result": "",
     //           "persent": ""
     //         },
     //         "level_id": "",
     //         "group_id": "",
     //         "status": "",
     //         "teama": {
     //           "id": 4,
     //           "name": "قطر",
     //           "orginalname": "Qatar",
     //           "status": 0,
     //           "pic": "",
     //           "pic2": ""
     //         },
     //         "teamb": {
     //           "id": 5,
     //           "name": "اکوادور",
     //           "orginalname": "Ecuador",
     //           "status": 0,
     //           "pic": "",
     //           "pic2": ""
     //         },
     //         "is_forecast": 0,
     //         "forecasts": [
     //           {
     //             "id": 1,
     //             "goala": 1,
     //             "goalb": 3,
     //             "score": 0,
     //             "ball_score": 0
     //           }
     //         ],
     //         "predictable": 1,
     //         "level": {
     //           "id": 6,
     //           "name": "گروه F",
     //           "active": 1,
     //           "order": 0,
     //           "time": null
     //         }
     //       },
     //       {
     //         "id": "1",
     //         "goala": "",
     //         "goalb": "",
     //         "starttime": "",
     //         "percent_teama": "",
     //         "percent_teamb": "",
     //         "percent_equal": "",
     //         "maxresult": {
     //           "result": "",
     //           "persent": ""
     //         },
     //         "level_id": "",
     //         "group_id": "",
     //         "status": "",
     //         "teama": {
     //           "id": 4,
     //           "name": "قطر",
     //           "orginalname": "Qatar",
     //           "status": 0,
     //           "pic": "",
     //           "pic2": ""
     //         },
     //         "teamb": {
     //           "id": 5,
     //           "name": "اکوادور",
     //           "orginalname": "Ecuador",
     //           "status": 0,
     //           "pic": "",
     //           "pic2": ""
     //         },
     //         "is_forecast": 0,
     //         "forecasts": [
     //           {
     //             "id": 1,
     //             "goala": 1,
     //             "goalb": 3,
     //             "score": 0,
     //             "ball_score": 0
     //           }
     //         ],
     //         "predictable": 1,
     //         "level": {
     //           "id": 6,
     //           "name": "گروه F",
     //           "active": 1,
     //           "order": 0,
     //           "time": null
     //         }
     //       },
     //       {
     //         "id": "2",
     //         "goala": "",
     //         "goalb": "",
     //         "starttime": "",
     //         "percent_teama": "",
     //         "percent_teamb": "",
     //         "percent_equal": "",
     //         "maxresult": {
     //           "result": "",
     //           "persent": ""
     //         },
     //         "level_id": "",
     //         "group_id": "",
     //         "status": "",
     //         "teama": {
     //           "id": 4,
     //           "name": "قطر9",
     //           "orginalname": "Qatar",
     //           "status": 0,
     //           "pic": "",
     //           "pic2": ""
     //         },
     //         "teamb": {
     //           "id": 5,
     //           "name": "اکوادور",
     //           "orginalname": "Ecuador",
     //           "status": 0,
     //           "pic": "",
     //           "pic2": ""
     //         },
     //         "is_forecast": 1,
     //         "forecasts": [
     //           {
     //             "id": 1,
     //             "goala": 1,
     //             "goalb": 3,
     //             "score": 0,
     //             "ball_score": 0
     //           }
     //         ],
     //         "predictable": 1,
     //         "level": {
     //           "id": 6,
     //           "name": "گروه F",
     //           "active": 1,
     //           "order": 0,
     //           "time": null
     //         }
     //       },
     //       {
     //         "id": "3",
     //         "goala": "",
     //         "goalb": "",
     //         "starttime": "",
     //         "percent_teama": "",
     //         "percent_teamb": "",
     //         "percent_equal": "",
     //         "maxresult": {
     //           "result": "",
     //           "persent": ""
     //         },
     //         "level_id": "",
     //         "group_id": "",
     //         "status": "",
     //         "teama": {
     //           "id": 4,
     //           "name": "قطر",
     //           "orginalname": "Qatar",
     //           "status": 0,
     //           "pic": "",
     //           "pic2": ""
     //         },
     //         "teamb": {
     //           "id": 5,
     //           "name": "اکوادور",
     //           "orginalname": "Ecuador",
     //           "status": 0,
     //           "pic": "",
     //           "pic2": ""
     //         },
     //         "is_forecast": 0,
     //         "forecasts": [
     //           {
     //             "id": 1,
     //             "goala": 1,
     //             "goalb": 3,
     //             "score": 0,
     //             "ball_score": 0
     //           }
     //         ],
     //         "predictable": 0,
     //         "level": {
     //           "id": 6,
     //           "name": "گروه F",
     //           "active": 1,
     //           "order": 0,
     //           "time": null
     //         }
     //       }
     //     ]
     //   },
     //   "1": {
     //     "title": "shamsi date2",
     //     "match": [
     //       {
     //         "id": "2",
     //         "goala": "",
     //         "goalb": "",
     //         "starttime": "",
     //         "percent_teama": "",
     //         "percent_teamb": "",
     //         "percent_equal": "",
     //         "maxresult": {
     //           "result": "",
     //           "persent": ""
     //         },
     //         "level_id": "",
     //         "group_id": "",
     //         "status": "",
     //         "teama": {
     //           "id": 4,
     //           "name": "قطر",
     //           "orginalname": "Qatar",
     //           "status": 0,
     //           "pic": "",
     //           "pic2": ""
     //         },
     //         "teamb": {
     //           "id": 5,
     //           "name": "اکوادور",
     //           "orginalname": "Ecuador",
     //           "status": 0,
     //           "pic": "",
     //           "pic2": ""
     //         },
     //         "is_forecast": 1,
     //         "forecasts": [
     //           {
     //             "id": 1,
     //             "goala": 1,
     //             "goalb": 3,
     //             "score": 0,
     //             "ball_score": 0
     //           }
     //         ],
     //         "predictable": 1,
     //         "level": {
     //           "id": 6,
     //           "name": "گروه F",
     //           "active": 1,
     //           "order": 0,
     //           "time": null
     //         }
     //       }
     //     ]
     //   },
     //   "2": {
     //     "title": "shamsi date 3",
     //     "match": [
     //       {
     //         "id": "1",
     //         "goala": 2,
     //         "goalb": 3,
     //         "starttime": "",
     //         "percent_teama": "",
     //         "percent_teamb": "",
     //         "percent_equal": "",
     //         "maxresult": {
     //           "result": "",
     //           "persent": ""
     //         },
     //         "level_id": "",
     //         "group_id": "",
     //         "status": "",
     //         "teama": {
     //           "id": 4,
     //           "name": "قطر",
     //           "orginalname": "Qatar",
     //           "status": 0,
     //           "pic": "",
     //           "pic2": ""
     //         },
     //         "teamb": {
     //           "id": 5,
     //           "name": "اکوادور",
     //           "orginalname": "Ecuador",
     //           "status": 0,
     //           "pic": "",
     //           "pic2": ""
     //         },
     //         "is_forecast": 1,
     //         "forecasts": [
     //           {
     //             "id": 1,
     //             "goala": 1,
     //             "goalb": 3,
     //             "score": 6,
     //             "ball_score": 3
     //           }
     //         ],
     //         "predictable": 0,
     //         "level": {
     //           "id": 6,
     //           "name": "گروه F",
     //           "active": 1,
     //           "order": 0,
     //           "time": null
     //         }
     //       }
     //     ]
     //   }
     // }
     this.createGroups(this.data)



      api.matches().then((data) => {
        if (data.success) {

          console.log(data.data)
          this.createGroups(data.data)
         // this.createGroups(this.data)
          // console.log("data",data.data)
          // this.data =data.data
          // this.groups = Object.keys(this.matches);
          // this.matches=this.data[this.groups[this.selectedIndex]]
          // // console.log("this.groups",this.groups)
          // console.log("this.selectedIndex",this.selectedIndex)
          // console.log("this.groups[this.selectedIndex]",this.groups[this.selectedIndex])
          // console.log("this.matches",this.matches);
          this.$refs.groups.resetParams()
        } else {
          //this.matches = {};
        }
      this.hidePopUp()
        // if (data.success)
        //   this.scrollInit();
      });

    }
  }
}
</script>

<style scoped>


.popupParent {
  width: 350px;
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  display: flex;
  display: -webkit-flex !important;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  -webkit-justify-content: center;
  align-items: center;
  align-content: stretch;
  z-index:999999;
  -webkit-align-items:center;
}
.popupBack {
  z-index:9;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: #000000;
  opacity: 0.8;

}

.popBox {
  box-sizing: border-box;
  width: 290px;
  height: 170px;
  background: #FFFFFF;
  border-radius: 11px;
  z-index: 10;
  display: flex;
  display: -webkit-flex !important;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  -webkit-justify-content: center;
position: relative;
  padding: 10px;
  align-items: center;
  -webkit-align-items:center;
  align-content: stretch;
  color: rgba(77, 205, 44, 1);
  font-size: 20px;

}
.popBoxErr{
  box-sizing: border-box;
  width: 290px;
  height: 170px;
  background: #FFFFFF;
  border-radius: 11px;
  z-index: 10;
  display: flex;
  display: -webkit-flex !important;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  -webkit-justify-content: center;

  align-items: center;
  -webkit-align-items:center;
  align-content: stretch;
  color: red;
  font-size: 20px;

}
</style>
