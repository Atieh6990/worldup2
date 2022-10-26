<template>
  <div style="direction: rtl !important;">
    <groups :y-pos="yPos" :groups="groups" ref="groups"></groups>
    <my-score></my-score>
    <div class="winnerParent" style="top: 90px;">
      <div style="width: 50%;float: right;">برنده مستقیم</div>
      <div style="width: 33%;float:left;">امتیاز</div>
    </div>
    <div class="scoreItem" style="top: 105px;">
      <div class="nameBox innerItem">
        <img src="../assets/images/scores/name.png" style="padding-left: 10px">
        <div class="nameTxt">مهسا همتی</div>
      </div>
      <div class="rankBox innerItem">
        <div class="scoreTxt">5000</div>
        <img src="../assets/images/scores/score.png" style="padding-right: 10px">
      </div>
    </div>
    <div class="winnerParent" style="top: 140px;">
      <div style="width: 55%;float: right;">برنده قرعه کشی</div>
      <div style="width: 33%;float:left;">امتیاز</div>
    </div>
    <div class="scoreItem" style="top: 155px;">
      <div class="nameBox innerItem">
        <img src="../assets/images/scores/name.png" style="padding-left: 10px">
        <div class="nameTxt">مهسا همتی</div>
      </div>
      <div class="rankBox innerItem">
        <div class="scoreTxt">5000</div>
        <img src="../assets/images/scores/score.png" style="padding-right: 10px">
      </div>
    </div>
  </div>

</template>

<script>
import groups from "../components/forcast/groups";
import api from "../api/api";
import MyScore from "../components/forcast/myScore";

export default {
  name: "winners",
  data() {
    return {
      yPos: 1,
      groups: '',
    }
  },
  created() {
    this.groupTeams();
  },
  components: {MyScore, groups},
  methods: {
    groupTeams: function () {
      let dataTest = {
        "success": "true", "data": {
          "levels": [{
            "id": 13,
            "name": "\u0647\u0641\u062a\u0647 11",
            "active": 0,
            "order": 12,
            "pic": "images\/levels\/2.png"
          }, {
            "id": 12,
            "name": "\u0647\u0641\u062a\u0647 10",
            "active": 0,
            "order": 11,
            "pic": "images\/levels\/2.png"
          }, {
            "id": 11,
            "name": "\u0647\u0641\u062a\u0647 9",
            "active": 0,
            "order": 10,
            "pic": "images\/levels\/2.png"
          }, {
            "id": 10,
            "name": "\u0647\u0641\u062a\u0647 8",
            "active": 0,
            "order": 9,
            "pic": "images\/levels\/2.png"
          }, {
            "id": 9,
            "name": "\u0647\u0641\u062a\u0647 7",
            "active": 0,
            "order": 8,
            "pic": "images\/levels\/2.png"
          }, {
            "id": 7,
            "name": "\u0647\u0641\u062a\u0647 6",
            "active": 0,
            "order": 6,
            "pic": "images\/levels\/2.png"
          }, {
            "id": 6,
            "name": "\u0647\u0641\u062a\u0647 5",
            "active": 0,
            "order": 5,
            "pic": "images\/levels\/2.png"
          }, {
            "id": 5,
            "name": "\u0647\u0641\u062a\u0647 4",
            "active": 0,
            "order": 4,
            "pic": "images\/levels\/2.png"
          }, {
            "id": 4,
            "name": "\u0647\u0641\u062a\u0647 3",
            "active": 0,
            "order": 3,
            "pic": "images\/levels\/2.png"
          }, {
            "id": 3,
            "name": "\u0647\u0641\u062a\u0647 2",
            "active": 0,
            "order": 2,
            "pic": "images\/levels\/2.png"
          }, {
            "id": 2,
            "name": "\u0647\u0641\u062a\u0647 1",
            "active": 1,
            "order": 1,
            "pic": "images\/levels\/2.png"
          }, {
            "id": 1,
            "name": "\u067e\u06cc\u0634 \u0628\u06cc\u0646\u06cc \u0647\u0627\u06cc \u0645\u0646",
            "active": 1,
            "order": 0,
            "pic": "images\/levels\/1.png"
          }],
          "Groups": [{
            "id": 1,
            "name": "\u067e\u06cc\u0634 \u0628\u06cc\u0646\u06cc \u0647\u0627\u06cc \u0645\u0646",
            "level_id": 1,
            "pic": "images\/groups\/1.png",
            "teams": []
          }, {
            "id": 2,
            "name": "\u0647\u0641\u062a\u0647 1",
            "level_id": 2,
            "pic": "images\/groups\/2.png",
            "teams": [{
              "id": 1,
              "name": "\u0627\u0633\u062a\u0642\u0644\u0627\u0644",
              "orginalname": "Esteghlal",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/esteghlal.png"
            }, {
              "id": 2,
              "name": "\u0627\u0633\u062a\u0642\u0644\u0627\u0644 \u062e\u0648\u0632\u0633\u062a\u0627\u0646",
              "orginalname": "Esteghlal.KH",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/arjantin.png"
            }, {
              "id": 3,
              "name": "\u067e\u0627\u0631\u0633 \u062c\u0646\u0648\u0628\u06cc \u062c\u0645",
              "orginalname": "Pars Jonoubi",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/pars-jonobi.png"
            }, {
              "id": 4,
              "name": "\u067e\u062f\u06cc\u062f\u0647",
              "orginalname": "Padideh",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/padideh.png"
            }, {
              "id": 5,
              "name": "\u067e\u0631\u0633\u067e\u0648\u0644\u06cc\u0633",
              "orginalname": "Persepolis",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/perspolis.png"
            }, {
              "id": 6,
              "name": "\u067e\u06cc\u06a9\u0627\u0646",
              "orginalname": "Paykan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/peykan.png"
            }, {
              "id": 7,
              "name": "\u062a\u0631\u0627\u06a9\u062a\u0648\u0631\u0633\u0627\u0632\u06cc",
              "orginalname": "Tractor Sazi",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/traktor-sazi.png"
            }, {
              "id": 8,
              "name": "\u0630\u0648\u0628 \u0622\u0647\u0646",
              "orginalname": "Zob Ahan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/zob-ahan.png"
            }, {
              "id": 9,
              "name": "\u0633\u0627\u06cc\u067e\u0627",
              "orginalname": "Saipa",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/sipa.png"
            }, {
              "id": 10,
              "name": "\u0633\u067e\u0627\u0647\u0627\u0646",
              "orginalname": "Sepahan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/sepahan.png"
            }, {
              "id": 11,
              "name": "\u0633\u067e\u06cc\u062f\u0631\u0648\u062f \u0631\u0634\u062a",
              "orginalname": "Sepidrood Rasht",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/sepid-rod-rasht.png"
            }, {
              "id": 12,
              "name": "\u0635\u0646\u0639\u062a \u0646\u0641\u062a \u0622\u0628\u0627\u062f\u0627\u0646",
              "orginalname": "Naft Abadan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/naft-abadan.png"
            }, {
              "id": 13,
              "name": "\u06af\u0633\u062a\u0631\u0634 \u0641\u0648\u0644\u0627\u062f \u062a\u0628\u0631\u06cc\u0632",
              "orginalname": "Gostaresh Foulad F.C.",
              "status": 1,
              "pic": "images\/"
            }, {
              "id": 14,
              "name": "\u0641\u0648\u0644\u0627\u062f \u062e\u0648\u0632\u0633\u062a\u0627\u0646",
              "orginalname": "Foolad.KH",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/foolad.png"
            }, {
              "id": 15,
              "name": "\u0645\u0627\u0634\u06cc\u0646 \u0633\u0627\u0632\u06cc \u062a\u0628\u0631\u06cc\u0632",
              "orginalname": "Machine Sazi",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/mashin-sazi.png"
            }, {
              "id": 16,
              "name": "\u0646\u0633\u0627\u062c\u06cc \u0645\u0627\u0632\u0646\u062f\u0631\u0627\u0646",
              "orginalname": "Nassaji Mazandaran",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/nasaji-mazandaran.png"
            }, {
              "id": 17,
              "name": "\u0646\u0641\u062a\u200c \u0645.\u0633\u0644\u06cc\u0645\u0627\u0646",
              "orginalname": "Naft M.Soleym",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/naft-masjed-soleyman.png"
            }, {
              "id": 43,
              "name": "\u0634\u0647\u0631 \u062e\u0648\u062f\u0631\u0648",
              "orginalname": "Shahr KHodro",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/shahr-khodro_7070.png"
            }, {
              "id": 44,
              "name": "\u06af\u0644 \u06af\u0647\u0631\u0633\u06cc\u0631\u062c\u0627\u0646",
              "orginalname": "Golgohar",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Golgohar-logo-LimooGraphic_7070.png"
            }, {
              "id": 46,
              "name": "\u0645\u0633 \u0631\u0641\u0633\u0646\u062c\u0627\u0646",
              "orginalname": "Mes Rafsanjan",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Rafsanjan70.png"
            }, {
              "id": 47,
              "name": "\u0622\u0644\u0648\u0645\u06cc\u0646\u06cc\u0648\u0645 \u0627\u0631\u0627\u06a9",
              "orginalname": "Aluminium Arak",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Aluminium70.jpg"
            }, {
              "id": 48,
              "name": "\u0641\u062c\u0631 \u0633\u067e\u0627\u0633\u06cc\t\r\n",
              "orginalname": "fajr sepasi\t",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/fajrsepasi70.png"
            }, {
              "id": 49,
              "name": "\u0647\u0648\u0627\u062f\u0627\u0631",
              "orginalname": "Havadar",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Havadar70.png"
            }, {
              "id": 50,
              "name": "\u0645\u0644\u0648\u0627\u0646 \u0628\u0646\u062f\u0631 \u0627\u0646\u0632\u0644\u06cc",
              "orginalname": "Malavan",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/malavan70.png"
            }, {
              "id": 51,
              "name": "\u0645\u0633 \u06a9\u0631\u0645\u0627\u0646",
              "orginalname": "Sanat Mes Kerman",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/mes-kerman70.png"
            }, {
              "id": 52,
              "name": "\u062a\u0633\u062a 2",
              "orginalname": "Test 2",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/New\/62f20fe616ef2.jpg"
            }]
          }, {
            "id": 3,
            "name": "\u0647\u0641\u062a\u0647 2",
            "level_id": 3,
            "pic": "images\/groups\/3.png",
            "teams": [{
              "id": 18,
              "name": "sdsds",
              "orginalname": "sdcsfd",
              "status": 1,
              "pic": "images\/teams\/League\/esteghlal-khozestan.png"
            }]
          }, {
            "id": 4,
            "name": "\u0647\u0641\u062a\u0647 3",
            "level_id": 4,
            "pic": "images\/groups\/4.png",
            "teams": []
          }, {
            "id": 5,
            "name": "\u0647\u0641\u062a\u0647 4",
            "level_id": 5,
            "pic": "images\/groups\/5.png",
            "teams": []
          }, {
            "id": 6,
            "name": "\u0647\u0641\u062a\u0647 5",
            "level_id": 6,
            "pic": "images\/groups\/6.png",
            "teams": []
          }, {
            "id": 7,
            "name": "\u0647\u0641\u062a\u0647 6",
            "level_id": 7,
            "pic": "images\/groups\/7.png",
            "teams": []
          }, {
            "id": 8,
            "name": "\u0647\u0641\u062a\u06477",
            "level_id": 8,
            "pic": "images\/groups\/8.png",
            "teams": []
          }, {
            "id": 9,
            "name": "\u0647\u0641\u062a\u0647 7",
            "level_id": 9,
            "pic": "images\/groups\/9.png",
            "teams": []
          }, {
            "id": 10,
            "name": "\u0647\u0641\u062a\u0647 8",
            "level_id": 10,
            "pic": "images\/groups\/10.png",
            "teams": []
          }, {
            "id": 11,
            "name": "\u0647\u0641\u062a\u0647 9",
            "level_id": 11,
            "pic": "images\/groups\/11.png",
            "teams": []
          }, {
            "id": 12,
            "name": "\u0647\u0641\u062a\u0647 10",
            "level_id": 12,
            "pic": "images\/groups\/12.png",
            "teams": []
          }, {
            "id": 13,
            "name": "\u0647\u0641\u062a\u0647 11",
            "level_id": 13,
            "pic": "images\/groups\/13.png",
            "teams": []
          }],
          "Matchs": [{
            "id": 1,
            "goala": 1,
            "goalb": 0,
            "starttime": "\u06f1\u06f9:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f5\/\u06f2\u06f1",
            "percent_teama": "51.4",
            "percent_teamb": "4.76",
            "percent_equal": "43.8",
            "maxresult": {"result": "1-0", "persent": "36.1"},
            "level_id": 2,
            "group_id": 2,
            "teama": {
              "id": 6,
              "name": "\u067e\u06cc\u06a9\u0627\u0646",
              "orginalname": "Paykan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/peykan.png",
              "pic2": "images\/teams\/League\/peykan.png"
            },
            "teamb": {
              "id": 50,
              "name": "\u0645\u0644\u0648\u0627\u0646 \u0628\u0646\u062f\u0631 \u0627\u0646\u0632\u0644\u06cc",
              "orginalname": "Malavan",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/malavan70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/malavan195.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 2,
            "goala": 0,
            "goalb": 2,
            "starttime": "\u06f1\u06f9:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f5\/\u06f2\u06f1",
            "percent_teama": "38.8",
            "percent_teamb": "21.2",
            "percent_equal": "39.8",
            "maxresult": {"result": "1-1", "persent": "31.4"},
            "level_id": 2,
            "group_id": 2,
            "teama": {
              "id": 1,
              "name": "\u0627\u0633\u062a\u0642\u0644\u0627\u0644",
              "orginalname": "Esteghlal",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/esteghlal.png",
              "pic2": "images\/teams\/League\/esteghlal.png"
            },
            "teamb": {
              "id": 10,
              "name": "\u0633\u067e\u0627\u0647\u0627\u0646",
              "orginalname": "Sepahan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/sepahan.png",
              "pic2": "images\/teams\/League\/sepahan.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 3,
            "goala": 0,
            "goalb": 1,
            "starttime": "\u06f2\u06f0:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f5\/\u06f2\u06f1",
            "percent_teama": "40.7",
            "percent_teamb": "8.33",
            "percent_equal": "50.9",
            "maxresult": {"result": "1-0", "persent": "28.7"},
            "level_id": 2,
            "group_id": 2,
            "teama": {
              "id": 47,
              "name": "\u0622\u0644\u0648\u0645\u06cc\u0646\u06cc\u0648\u0645 \u0627\u0631\u0627\u06a9",
              "orginalname": "Aluminium Arak",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Aluminium70.jpg",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Aluminium.jpg"
            },
            "teamb": {
              "id": 49,
              "name": "\u0647\u0648\u0627\u062f\u0627\u0631",
              "orginalname": "Havadar",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Havadar70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Havadar138.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 4,
            "goala": 1,
            "goalb": 1,
            "starttime": "\u06f2\u06f0:\u06f3\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f5\/\u06f2\u06f1",
            "percent_teama": "20.1",
            "percent_teamb": "13.7",
            "percent_equal": "66.0",
            "maxresult": {"result": "1-1", "persent": "41.2"},
            "level_id": 2,
            "group_id": 2,
            "teama": {
              "id": 16,
              "name": "\u0646\u0633\u0627\u062c\u06cc \u0645\u0627\u0632\u0646\u062f\u0631\u0627\u0646",
              "orginalname": "Nassaji Mazandaran",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/nasaji-mazandaran.png",
              "pic2": "images\/teams\/League\/nasaji-mazandaran.png"
            },
            "teamb": {
              "id": 46,
              "name": "\u0645\u0633 \u0631\u0641\u0633\u0646\u062c\u0627\u0646",
              "orginalname": "Mes Rafsanjan",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Rafsanjan70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Rafsanjan195.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 5,
            "goala": 3,
            "goalb": 2,
            "starttime": "\u06f2\u06f0:\u06f3\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f5\/\u06f2\u06f1",
            "percent_teama": "26.6",
            "percent_teamb": "9.17",
            "percent_equal": "64.2",
            "maxresult": {"result": "0-0", "persent": "37.6"},
            "level_id": 2,
            "group_id": 2,
            "teama": {
              "id": 17,
              "name": "\u0646\u0641\u062a\u200c \u0645.\u0633\u0644\u06cc\u0645\u0627\u0646",
              "orginalname": "Naft M.Soleym",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/naft-masjed-soleyman.png",
              "pic2": "images\/teams\/League\/naft-masjed-soleyman.png"
            },
            "teamb": {
              "id": 51,
              "name": "\u0645\u0633 \u06a9\u0631\u0645\u0627\u0646",
              "orginalname": "Sanat Mes Kerman",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/mes-kerman70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/mes-kerman195.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 6,
            "goala": 0,
            "goalb": 0,
            "starttime": "\u06f1\u06f9:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f5\/\u06f2\u06f2",
            "percent_teama": "3.33",
            "percent_teamb": "75",
            "percent_equal": "21.6",
            "maxresult": {"result": "0-1", "persent": "38.3"},
            "level_id": 2,
            "group_id": 2,
            "teama": {
              "id": 8,
              "name": "\u0630\u0648\u0628 \u0622\u0647\u0646",
              "orginalname": "Zob Ahan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/zob-ahan.png",
              "pic2": "images\/teams\/League\/zob-ahan.png"
            },
            "teamb": {
              "id": 5,
              "name": "\u067e\u0631\u0633\u067e\u0648\u0644\u06cc\u0633",
              "orginalname": "Persepolis",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/perspolis.png",
              "pic2": "images\/teams\/League\/perspolis.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 7,
            "goala": 2,
            "goalb": 1,
            "starttime": "\u06f2\u06f0:\u06f3\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f5\/\u06f2\u06f2",
            "percent_teama": "51.2",
            "percent_teamb": "9.91",
            "percent_equal": "38.8",
            "maxresult": {"result": "1-0", "persent": "29.7"},
            "level_id": 2,
            "group_id": 2,
            "teama": {
              "id": 44,
              "name": "\u06af\u0644 \u06af\u0647\u0631\u0633\u06cc\u0631\u062c\u0627\u0646",
              "orginalname": "Golgohar",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Golgohar-logo-LimooGraphic_7070.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Golgohar-logo-LimooGraphic.png"
            },
            "teamb": {
              "id": 7,
              "name": "\u062a\u0631\u0627\u06a9\u062a\u0648\u0631\u0633\u0627\u0632\u06cc",
              "orginalname": "Tractor Sazi",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/traktor-sazi.png",
              "pic2": "images\/teams\/League\/traktor-sazi.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 8,
            "goala": 0,
            "goalb": 0,
            "starttime": "\u06f2\u06f0:\u06f3\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f5\/\u06f2\u06f2",
            "percent_teama": "86.8",
            "percent_teamb": "1.75",
            "percent_equal": "11.4",
            "maxresult": {"result": "2-0", "persent": "38.5"},
            "level_id": 2,
            "group_id": 2,
            "teama": {
              "id": 14,
              "name": "\u0641\u0648\u0644\u0627\u062f \u062e\u0648\u0632\u0633\u062a\u0627\u0646",
              "orginalname": "Foolad.KH",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/foolad.png",
              "pic2": "images\/teams\/League\/foolad.png"
            },
            "teamb": {
              "id": 12,
              "name": "\u0635\u0646\u0639\u062a \u0646\u0641\u062a \u0622\u0628\u0627\u062f\u0627\u0646",
              "orginalname": "Naft Abadan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/naft-abadan.png",
              "pic2": "images\/teams\/League\/naft-abadan.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 9,
            "goala": 1,
            "goalb": 3,
            "starttime": "\u06f1\u06f9:\u06f3\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f5\/\u06f2\u06f7",
            "percent_teama": "1.6",
            "percent_teamb": "77.6",
            "percent_equal": "20.8",
            "maxresult": {"result": "0-1", "persent": "37.6"},
            "level_id": 3,
            "group_id": 3,
            "teama": {
              "id": 50,
              "name": "\u0645\u0644\u0648\u0627\u0646 \u0628\u0646\u062f\u0631 \u0627\u0646\u0632\u0644\u06cc",
              "orginalname": "Malavan",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/malavan70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/malavan195.png"
            },
            "teamb": {
              "id": 1,
              "name": "\u0627\u0633\u062a\u0642\u0644\u0627\u0644",
              "orginalname": "Esteghlal",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/esteghlal.png",
              "pic2": "images\/teams\/League\/esteghlal.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 10,
            "goala": 0,
            "goalb": 0,
            "starttime": "\u06f2\u06f0:\u06f3\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f5\/\u06f2\u06f7",
            "percent_teama": "1.61",
            "percent_teamb": "60.4",
            "percent_equal": "37.9",
            "maxresult": {"result": "0-1", "persent": "26.6"},
            "level_id": 3,
            "group_id": 3,
            "teama": {
              "id": 46,
              "name": "\u0645\u0633 \u0631\u0641\u0633\u0646\u062c\u0627\u0646",
              "orginalname": "Mes Rafsanjan",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Rafsanjan70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Rafsanjan195.png"
            },
            "teamb": {
              "id": 44,
              "name": "\u06af\u0644 \u06af\u0647\u0631\u0633\u06cc\u0631\u062c\u0627\u0646",
              "orginalname": "Golgohar",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Golgohar-logo-LimooGraphic_7070.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Golgohar-logo-LimooGraphic.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 11,
            "goala": 2,
            "goalb": 1,
            "starttime": "\u06f2\u06f1:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f5\/\u06f2\u06f7",
            "percent_teama": "96.8",
            "percent_teamb": "0",
            "percent_equal": "3.2",
            "maxresult": {"result": "2-0", "persent": "60.8"},
            "level_id": 3,
            "group_id": 3,
            "teama": {
              "id": 10,
              "name": "\u0633\u067e\u0627\u0647\u0627\u0646",
              "orginalname": "Sepahan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/sepahan.png",
              "pic2": "images\/teams\/League\/sepahan.png"
            },
            "teamb": {
              "id": 16,
              "name": "\u0646\u0633\u0627\u062c\u06cc \u0645\u0627\u0632\u0646\u062f\u0631\u0627\u0646",
              "orginalname": "Nassaji Mazandaran",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/nasaji-mazandaran.png",
              "pic2": "images\/teams\/League\/nasaji-mazandaran.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 12,
            "goala": 1,
            "goalb": 1,
            "starttime": "\u06f1\u06f8:\u06f3\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f5\/\u06f2\u06f8",
            "percent_teama": "31.2",
            "percent_teamb": "7.03",
            "percent_equal": "61.7",
            "maxresult": {"result": "1-1", "persent": "39.8"},
            "level_id": 3,
            "group_id": 3,
            "teama": {
              "id": 7,
              "name": "\u062a\u0631\u0627\u06a9\u062a\u0648\u0631\u0633\u0627\u0632\u06cc",
              "orginalname": "Tractor Sazi",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/traktor-sazi.png",
              "pic2": "images\/teams\/League\/traktor-sazi.png"
            },
            "teamb": {
              "id": 8,
              "name": "\u0630\u0648\u0628 \u0622\u0647\u0646",
              "orginalname": "Zob Ahan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/zob-ahan.png",
              "pic2": "images\/teams\/League\/zob-ahan.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 13,
            "goala": 1,
            "goalb": 1,
            "starttime": "\u06f1\u06f9:\u06f3\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f5\/\u06f2\u06f8",
            "percent_teama": "58.5",
            "percent_teamb": "7.03",
            "percent_equal": "34.3",
            "maxresult": {"result": "1-0", "persent": "42.9"},
            "level_id": 3,
            "group_id": 3,
            "teama": {
              "id": 49,
              "name": "\u0647\u0648\u0627\u062f\u0627\u0631",
              "orginalname": "Havadar",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Havadar70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Havadar138.png"
            },
            "teamb": {
              "id": 17,
              "name": "\u0646\u0641\u062a\u200c \u0645.\u0633\u0644\u06cc\u0645\u0627\u0646",
              "orginalname": "Naft M.Soleym",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/naft-masjed-soleyman.png",
              "pic2": "images\/teams\/League\/naft-masjed-soleyman.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 14,
            "goala": 3,
            "goalb": 0,
            "starttime": "\u06f1\u06f9:\u06f3\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f5\/\u06f2\u06f8",
            "percent_teama": "11.6",
            "percent_teamb": "22.4",
            "percent_equal": "65.8",
            "maxresult": {"result": "0-0", "persent": "35.6"},
            "level_id": 3,
            "group_id": 3,
            "teama": {
              "id": 51,
              "name": "\u0645\u0633 \u06a9\u0631\u0645\u0627\u0646",
              "orginalname": "Sanat Mes Kerman",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/mes-kerman70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/mes-kerman195.png"
            },
            "teamb": {
              "id": 6,
              "name": "\u067e\u06cc\u06a9\u0627\u0646",
              "orginalname": "Paykan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/peykan.png",
              "pic2": "images\/teams\/League\/peykan.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 15,
            "goala": 0,
            "goalb": 0,
            "starttime": "\u06f2\u06f0:\u06f3\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f5\/\u06f2\u06f8",
            "percent_teama": "68.4",
            "percent_teamb": "3.75",
            "percent_equal": "27.8",
            "maxresult": {"result": "1-0", "persent": "41.3"},
            "level_id": 3,
            "group_id": 3,
            "teama": {
              "id": 5,
              "name": "\u067e\u0631\u0633\u067e\u0648\u0644\u06cc\u0633",
              "orginalname": "Persepolis",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/perspolis.png",
              "pic2": "images\/teams\/League\/perspolis.png"
            },
            "teamb": {
              "id": 14,
              "name": "\u0641\u0648\u0644\u0627\u062f \u062e\u0648\u0632\u0633\u062a\u0627\u0646",
              "orginalname": "Foolad.KH",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/foolad.png",
              "pic2": "images\/teams\/League\/foolad.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 16,
            "goala": 0,
            "goalb": 1,
            "starttime": "\u06f2\u06f0:\u06f3\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f5\/\u06f2\u06f8",
            "percent_teama": "20",
            "percent_teamb": "12",
            "percent_equal": "68",
            "maxresult": {"result": "1-1", "persent": "35.2"},
            "level_id": 3,
            "group_id": 3,
            "teama": {
              "id": 12,
              "name": "\u0635\u0646\u0639\u062a \u0646\u0641\u062a \u0622\u0628\u0627\u062f\u0627\u0646",
              "orginalname": "Naft Abadan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/naft-abadan.png",
              "pic2": "images\/teams\/League\/naft-abadan.png"
            },
            "teamb": {
              "id": 47,
              "name": "\u0622\u0644\u0648\u0645\u06cc\u0646\u06cc\u0648\u0645 \u0627\u0631\u0627\u06a9",
              "orginalname": "Aluminium Arak",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Aluminium70.jpg",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Aluminium.jpg"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 19,
            "goala": 1,
            "goalb": 2,
            "starttime": "\u06f1\u06f9:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f6\/\u06f0\u06f3",
            "percent_teama": "31.5",
            "percent_teamb": "10",
            "percent_equal": "58.4",
            "maxresult": {"result": "1-1", "persent": "32.3"},
            "level_id": 4,
            "group_id": 4,
            "teama": {
              "id": 17,
              "name": "\u0646\u0641\u062a\u200c \u0645.\u0633\u0644\u06cc\u0645\u0627\u0646",
              "orginalname": "Naft M.Soleym",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/naft-masjed-soleyman.png",
              "pic2": "images\/teams\/League\/naft-masjed-soleyman.png"
            },
            "teamb": {
              "id": 6,
              "name": "\u067e\u06cc\u06a9\u0627\u0646",
              "orginalname": "Paykan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/peykan.png",
              "pic2": "images\/teams\/League\/peykan.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 18,
            "goala": 2,
            "goalb": 2,
            "starttime": "\u06f1\u06f9:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f6\/\u06f0\u06f3",
            "percent_teama": "70.7",
            "percent_teamb": "6.15",
            "percent_equal": "23.0",
            "maxresult": {"result": "1-0", "persent": "36.1"},
            "level_id": 4,
            "group_id": 4,
            "teama": {
              "id": 16,
              "name": "\u0646\u0633\u0627\u062c\u06cc \u0645\u0627\u0632\u0646\u062f\u0631\u0627\u0646",
              "orginalname": "Nassaji Mazandaran",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/nasaji-mazandaran.png",
              "pic2": "images\/teams\/League\/nasaji-mazandaran.png"
            },
            "teamb": {
              "id": 50,
              "name": "\u0645\u0644\u0648\u0627\u0646 \u0628\u0646\u062f\u0631 \u0627\u0646\u0632\u0644\u06cc",
              "orginalname": "Malavan",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/malavan70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/malavan195.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 17,
            "goala": 0,
            "goalb": 0,
            "starttime": "\u06f1\u06f9:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f6\/\u06f0\u06f3",
            "percent_teama": "37.9",
            "percent_teamb": "9.30",
            "percent_equal": "52.7",
            "maxresult": {"result": "1-1", "persent": "29.4"},
            "level_id": 4,
            "group_id": 4,
            "teama": {
              "id": 8,
              "name": "\u0630\u0648\u0628 \u0622\u0647\u0646",
              "orginalname": "Zob Ahan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/zob-ahan.png",
              "pic2": "images\/teams\/League\/zob-ahan.png"
            },
            "teamb": {
              "id": 46,
              "name": "\u0645\u0633 \u0631\u0641\u0633\u0646\u062c\u0627\u0646",
              "orginalname": "Mes Rafsanjan",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Rafsanjan70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Rafsanjan195.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 20,
            "goala": 1,
            "goalb": 0,
            "starttime": "\u06f1\u06f9:\u06f3\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f6\/\u06f0\u06f3",
            "percent_teama": "90",
            "percent_teamb": "3.84",
            "percent_equal": "6.15",
            "maxresult": {"result": "2-0", "persent": "46.9"},
            "level_id": 4,
            "group_id": 4,
            "teama": {
              "id": 1,
              "name": "\u0627\u0633\u062a\u0642\u0644\u0627\u0644",
              "orginalname": "Esteghlal",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/esteghlal.png",
              "pic2": "images\/teams\/League\/esteghlal.png"
            },
            "teamb": {
              "id": 51,
              "name": "\u0645\u0633 \u06a9\u0631\u0645\u0627\u0646",
              "orginalname": "Sanat Mes Kerman",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/mes-kerman70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/mes-kerman195.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 21,
            "goala": 0,
            "goalb": 1,
            "starttime": "\u06f1\u06f9:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f6\/\u06f0\u06f4",
            "percent_teama": "42.9",
            "percent_teamb": "5.92",
            "percent_equal": "51.1",
            "maxresult": {"result": "1-0", "persent": "33.3"},
            "level_id": 4,
            "group_id": 4,
            "teama": {
              "id": 49,
              "name": "\u0647\u0648\u0627\u062f\u0627\u0631",
              "orginalname": "Havadar",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Havadar70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Havadar138.png"
            },
            "teamb": {
              "id": 12,
              "name": "\u0635\u0646\u0639\u062a \u0646\u0641\u062a \u0622\u0628\u0627\u062f\u0627\u0646",
              "orginalname": "Naft Abadan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/naft-abadan.png",
              "pic2": "images\/teams\/League\/naft-abadan.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 22,
            "goala": 0,
            "goalb": 1,
            "starttime": "\u06f1\u06f9:\u06f3\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f6\/\u06f0\u06f4",
            "percent_teama": "2.94",
            "percent_teamb": "77.2",
            "percent_equal": "19.8",
            "maxresult": {"result": "0-1", "persent": "35.2"},
            "level_id": 4,
            "group_id": 4,
            "teama": {
              "id": 47,
              "name": "\u0622\u0644\u0648\u0645\u06cc\u0646\u06cc\u0648\u0645 \u0627\u0631\u0627\u06a9",
              "orginalname": "Aluminium Arak",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Aluminium70.jpg",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Aluminium.jpg"
            },
            "teamb": {
              "id": 5,
              "name": "\u067e\u0631\u0633\u067e\u0648\u0644\u06cc\u0633",
              "orginalname": "Persepolis",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/perspolis.png",
              "pic2": "images\/teams\/League\/perspolis.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 24,
            "goala": 2,
            "goalb": 2,
            "starttime": "\u06f2\u06f1:\u06f3\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f6\/\u06f0\u06f4",
            "percent_teama": "8.27",
            "percent_teamb": "47.3",
            "percent_equal": "44.3",
            "maxresult": {"result": "1-1", "persent": "30.0"},
            "level_id": 4,
            "group_id": 4,
            "teama": {
              "id": 44,
              "name": "\u06af\u0644 \u06af\u0647\u0631\u0633\u06cc\u0631\u062c\u0627\u0646",
              "orginalname": "Golgohar",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Golgohar-logo-LimooGraphic_7070.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Golgohar-logo-LimooGraphic.png"
            },
            "teamb": {
              "id": 10,
              "name": "\u0633\u067e\u0627\u0647\u0627\u0646",
              "orginalname": "Sepahan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/sepahan.png",
              "pic2": "images\/teams\/League\/sepahan.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 23,
            "goala": 3,
            "goalb": 2,
            "starttime": "\u06f2\u06f1:\u06f3\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f6\/\u06f0\u06f4",
            "percent_teama": "68.6",
            "percent_teamb": "5.10",
            "percent_equal": "26.2",
            "maxresult": {"result": "1-0", "persent": "39.4"},
            "level_id": 4,
            "group_id": 4,
            "teama": {
              "id": 14,
              "name": "\u0641\u0648\u0644\u0627\u062f \u062e\u0648\u0632\u0633\u062a\u0627\u0646",
              "orginalname": "Foolad.KH",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/foolad.png",
              "pic2": "images\/teams\/League\/foolad.png"
            },
            "teamb": {
              "id": 7,
              "name": "\u062a\u0631\u0627\u06a9\u062a\u0648\u0631\u0633\u0627\u0632\u06cc",
              "orginalname": "Tractor Sazi",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/traktor-sazi.png",
              "pic2": "images\/teams\/League\/traktor-sazi.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 25,
            "goala": 1,
            "goalb": 1,
            "starttime": "\u06f1\u06f9:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f6\/\u06f0\u06f8",
            "percent_teama": "18.6",
            "percent_teamb": "22.5",
            "percent_equal": "58.8",
            "maxresult": {"result": "1-1", "persent": "30.3"},
            "level_id": 5,
            "group_id": 5,
            "teama": {
              "id": 50,
              "name": "\u0645\u0644\u0648\u0627\u0646 \u0628\u0646\u062f\u0631 \u0627\u0646\u0632\u0644\u06cc",
              "orginalname": "Malavan",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/malavan70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/malavan195.png"
            },
            "teamb": {
              "id": 8,
              "name": "\u0630\u0648\u0628 \u0622\u0647\u0646",
              "orginalname": "Zob Ahan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/zob-ahan.png",
              "pic2": "images\/teams\/League\/zob-ahan.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 26,
            "goala": 0,
            "goalb": 0,
            "starttime": "\u06f1\u06f9:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f6\/\u06f0\u06f8",
            "percent_teama": "38.2",
            "percent_teamb": "9.80",
            "percent_equal": "51.9",
            "maxresult": {"result": "1-1", "persent": "34.3"},
            "level_id": 5,
            "group_id": 5,
            "teama": {
              "id": 6,
              "name": "\u067e\u06cc\u06a9\u0627\u0646",
              "orginalname": "Paykan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/peykan.png",
              "pic2": "images\/teams\/League\/peykan.png"
            },
            "teamb": {
              "id": 16,
              "name": "\u0646\u0633\u0627\u062c\u06cc \u0645\u0627\u0632\u0646\u062f\u0631\u0627\u0646",
              "orginalname": "Nassaji Mazandaran",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/nasaji-mazandaran.png",
              "pic2": "images\/teams\/League\/nasaji-mazandaran.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 27,
            "goala": 2,
            "goalb": 2,
            "starttime": "\u06f1\u06f9:\u06f3\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f6\/\u06f0\u06f8",
            "percent_teama": "1.92",
            "percent_teamb": "85.5",
            "percent_equal": "12.5",
            "maxresult": {"result": "0-1", "persent": "36.5"},
            "level_id": 5,
            "group_id": 5,
            "teama": {
              "id": 51,
              "name": "\u0645\u0633 \u06a9\u0631\u0645\u0627\u0646",
              "orginalname": "Sanat Mes Kerman",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/mes-kerman70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/mes-kerman195.png"
            },
            "teamb": {
              "id": 44,
              "name": "\u06af\u0644 \u06af\u0647\u0631\u0633\u06cc\u0631\u062c\u0627\u0646",
              "orginalname": "Golgohar",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Golgohar-logo-LimooGraphic_7070.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Golgohar-logo-LimooGraphic.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 28,
            "goala": 0,
            "goalb": 0,
            "starttime": "\u06f2\u06f0:\u06f3\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f6\/\u06f0\u06f8",
            "percent_teama": "2.85",
            "percent_teamb": "81.9",
            "percent_equal": "15.2",
            "maxresult": {"result": "0-1", "persent": "42.8"},
            "level_id": 5,
            "group_id": 5,
            "teama": {
              "id": 17,
              "name": "\u0646\u0641\u062a\u200c \u0645.\u0633\u0644\u06cc\u0645\u0627\u0646",
              "orginalname": "Naft M.Soleym",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/naft-masjed-soleyman.png",
              "pic2": "images\/teams\/League\/naft-masjed-soleyman.png"
            },
            "teamb": {
              "id": 1,
              "name": "\u0627\u0633\u062a\u0642\u0644\u0627\u0644",
              "orginalname": "Esteghlal",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/esteghlal.png",
              "pic2": "images\/teams\/League\/esteghlal.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 31,
            "goala": 2,
            "goalb": 0,
            "starttime": "\u06f1\u06f8:\u06f3\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f6\/\u06f0\u06f9",
            "percent_teama": "96.6",
            "percent_teamb": "0",
            "percent_equal": "3.38",
            "maxresult": {"result": "2-0", "persent": "48.3"},
            "level_id": 5,
            "group_id": 5,
            "teama": {
              "id": 5,
              "name": "\u067e\u0631\u0633\u067e\u0648\u0644\u06cc\u0633",
              "orginalname": "Persepolis",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/perspolis.png",
              "pic2": "images\/teams\/League\/perspolis.png"
            },
            "teamb": {
              "id": 12,
              "name": "\u0635\u0646\u0639\u062a \u0646\u0641\u062a \u0622\u0628\u0627\u062f\u0627\u0646",
              "orginalname": "Naft Abadan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/naft-abadan.png",
              "pic2": "images\/teams\/League\/naft-abadan.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 29,
            "goala": 0,
            "goalb": 0,
            "starttime": "\u06f1\u06f8:\u06f3\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f6\/\u06f0\u06f9",
            "percent_teama": "71.4",
            "percent_teamb": "2.52",
            "percent_equal": "26.0",
            "maxresult": {"result": "1-0", "persent": "42.0"},
            "level_id": 5,
            "group_id": 5,
            "teama": {
              "id": 7,
              "name": "\u062a\u0631\u0627\u06a9\u062a\u0648\u0631\u0633\u0627\u0632\u06cc",
              "orginalname": "Tractor Sazi",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/traktor-sazi.png",
              "pic2": "images\/teams\/League\/traktor-sazi.png"
            },
            "teamb": {
              "id": 49,
              "name": "\u0647\u0648\u0627\u062f\u0627\u0631",
              "orginalname": "Havadar",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Havadar70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Havadar138.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 32,
            "goala": 0,
            "goalb": 1,
            "starttime": "\u06f1\u06f9:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f6\/\u06f0\u06f9",
            "percent_teama": "44.3",
            "percent_teamb": "6.95",
            "percent_equal": "48.6",
            "maxresult": {"result": "1-1", "persent": "29.5"},
            "level_id": 5,
            "group_id": 5,
            "teama": {
              "id": 10,
              "name": "\u0633\u067e\u0627\u0647\u0627\u0646",
              "orginalname": "Sepahan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/sepahan.png",
              "pic2": "images\/teams\/League\/sepahan.png"
            },
            "teamb": {
              "id": 14,
              "name": "\u0641\u0648\u0644\u0627\u062f \u062e\u0648\u0632\u0633\u062a\u0627\u0646",
              "orginalname": "Foolad.KH",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/foolad.png",
              "pic2": "images\/teams\/League\/foolad.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 30,
            "goala": 0,
            "goalb": 0,
            "starttime": "\u06f1\u06f9:\u06f3\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f6\/\u06f0\u06f9",
            "percent_teama": "29.9",
            "percent_teamb": "5.98",
            "percent_equal": "64.1",
            "maxresult": {"result": "1-1", "persent": "34.1"},
            "level_id": 5,
            "group_id": 5,
            "teama": {
              "id": 46,
              "name": "\u0645\u0633 \u0631\u0641\u0633\u0646\u062c\u0627\u0646",
              "orginalname": "Mes Rafsanjan",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Rafsanjan70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Rafsanjan195.png"
            },
            "teamb": {
              "id": 47,
              "name": "\u0622\u0644\u0648\u0645\u06cc\u0646\u06cc\u0648\u0645 \u0627\u0631\u0627\u06a9",
              "orginalname": "Aluminium Arak",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Aluminium70.jpg",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Aluminium.jpg"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 33,
            "goala": 0,
            "goalb": 2,
            "starttime": "\u06f1\u06f9:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f6\/\u06f1\u06f4",
            "percent_teama": "12.0",
            "percent_teamb": "32.7",
            "percent_equal": "55.1",
            "maxresult": {"result": "1-1", "persent": "29.3"},
            "level_id": 6,
            "group_id": 6,
            "teama": {
              "id": 47,
              "name": "\u0622\u0644\u0648\u0645\u06cc\u0646\u06cc\u0648\u0645 \u0627\u0631\u0627\u06a9",
              "orginalname": "Aluminium Arak",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Aluminium70.jpg",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Aluminium.jpg"
            },
            "teamb": {
              "id": 7,
              "name": "\u062a\u0631\u0627\u06a9\u062a\u0648\u0631\u0633\u0627\u0632\u06cc",
              "orginalname": "Tractor Sazi",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/traktor-sazi.png",
              "pic2": "images\/teams\/League\/traktor-sazi.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 34,
            "goala": 2,
            "goalb": 0,
            "starttime": "\u06f1\u06f9:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f6\/\u06f1\u06f4",
            "percent_teama": "47.3",
            "percent_teamb": "8.77",
            "percent_equal": "43.8",
            "maxresult": {"result": "1-0", "persent": "34.2"},
            "level_id": 6,
            "group_id": 6,
            "teama": {
              "id": 16,
              "name": "\u0646\u0633\u0627\u062c\u06cc \u0645\u0627\u0632\u0646\u062f\u0631\u0627\u0646",
              "orginalname": "Nassaji Mazandaran",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/nasaji-mazandaran.png",
              "pic2": "images\/teams\/League\/nasaji-mazandaran.png"
            },
            "teamb": {
              "id": 51,
              "name": "\u0645\u0633 \u06a9\u0631\u0645\u0627\u0646",
              "orginalname": "Sanat Mes Kerman",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/mes-kerman70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/mes-kerman195.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 35,
            "goala": 1,
            "goalb": 3,
            "starttime": "\u06f1\u06f9:\u06f3\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f6\/\u06f1\u06f4",
            "percent_teama": "1.70",
            "percent_teamb": "91.4",
            "percent_equal": "6.83",
            "maxresult": {"result": "0-2", "persent": "41.0"},
            "level_id": 6,
            "group_id": 6,
            "teama": {
              "id": 49,
              "name": "\u0647\u0648\u0627\u062f\u0627\u0631",
              "orginalname": "Havadar",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Havadar70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Havadar138.png"
            },
            "teamb": {
              "id": 5,
              "name": "\u067e\u0631\u0633\u067e\u0648\u0644\u06cc\u0633",
              "orginalname": "Persepolis",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/perspolis.png",
              "pic2": "images\/teams\/League\/perspolis.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 36,
            "goala": 1,
            "goalb": 0,
            "starttime": "\u06f2\u06f0:\u06f3\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f6\/\u06f1\u06f4",
            "percent_teama": "88.1",
            "percent_teamb": "3.38",
            "percent_equal": "8.47",
            "maxresult": {"result": "2-0", "persent": "43.2"},
            "level_id": 6,
            "group_id": 6,
            "teama": {
              "id": 44,
              "name": "\u06af\u0644 \u06af\u0647\u0631\u0633\u06cc\u0631\u062c\u0627\u0646",
              "orginalname": "Golgohar",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Golgohar-logo-LimooGraphic_7070.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Golgohar-logo-LimooGraphic.png"
            },
            "teamb": {
              "id": 50,
              "name": "\u0645\u0644\u0648\u0627\u0646 \u0628\u0646\u062f\u0631 \u0627\u0646\u0632\u0644\u06cc",
              "orginalname": "Malavan",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/malavan70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/malavan195.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 37,
            "goala": 1,
            "goalb": 1,
            "starttime": "\u06f2\u06f1:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f6\/\u06f1\u06f4",
            "percent_teama": "0",
            "percent_teamb": "68.3",
            "percent_equal": "31.6",
            "maxresult": {"result": "1-2", "persent": "28.3"},
            "level_id": 6,
            "group_id": 6,
            "teama": {
              "id": 8,
              "name": "\u0630\u0648\u0628 \u0622\u0647\u0646",
              "orginalname": "Zob Ahan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/zob-ahan.png",
              "pic2": "images\/teams\/League\/zob-ahan.png"
            },
            "teamb": {
              "id": 10,
              "name": "\u0633\u067e\u0627\u0647\u0627\u0646",
              "orginalname": "Sepahan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/sepahan.png",
              "pic2": "images\/teams\/League\/sepahan.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 38,
            "goala": 0,
            "goalb": 0,
            "starttime": "\u06f2\u06f1:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f6\/\u06f1\u06f4",
            "percent_teama": "81.6",
            "percent_teamb": "2.5",
            "percent_equal": "15.8",
            "maxresult": {"result": "1-0", "persent": "48.3"},
            "level_id": 6,
            "group_id": 6,
            "teama": {
              "id": 14,
              "name": "\u0641\u0648\u0644\u0627\u062f \u062e\u0648\u0632\u0633\u062a\u0627\u0646",
              "orginalname": "Foolad.KH",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/foolad.png",
              "pic2": "images\/teams\/League\/foolad.png"
            },
            "teamb": {
              "id": 46,
              "name": "\u0645\u0633 \u0631\u0641\u0633\u0646\u062c\u0627\u0646",
              "orginalname": "Mes Rafsanjan",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Rafsanjan70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Rafsanjan195.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 39,
            "goala": 1,
            "goalb": 2,
            "starttime": "\u06f2\u06f1:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f6\/\u06f1\u06f4",
            "percent_teama": "16.8",
            "percent_teamb": "11.7",
            "percent_equal": "71.4",
            "maxresult": {"result": "0-0", "persent": "37.8"},
            "level_id": 6,
            "group_id": 6,
            "teama": {
              "id": 12,
              "name": "\u0635\u0646\u0639\u062a \u0646\u0641\u062a \u0622\u0628\u0627\u062f\u0627\u0646",
              "orginalname": "Naft Abadan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/naft-abadan.png",
              "pic2": "images\/teams\/League\/naft-abadan.png"
            },
            "teamb": {
              "id": 17,
              "name": "\u0646\u0641\u062a\u200c \u0645.\u0633\u0644\u06cc\u0645\u0627\u0646",
              "orginalname": "Naft M.Soleym",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/naft-masjed-soleyman.png",
              "pic2": "images\/teams\/League\/naft-masjed-soleyman.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 40,
            "goala": 0,
            "goalb": 0,
            "starttime": "\u06f1\u06f9:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f6\/\u06f1\u06f5",
            "percent_teama": "86.5",
            "percent_teamb": "3.36",
            "percent_equal": "10.0",
            "maxresult": {"result": "1-0", "persent": "41.1"},
            "level_id": 6,
            "group_id": 6,
            "teama": {
              "id": 1,
              "name": "\u0627\u0633\u062a\u0642\u0644\u0627\u0644",
              "orginalname": "Esteghlal",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/esteghlal.png",
              "pic2": "images\/teams\/League\/esteghlal.png"
            },
            "teamb": {
              "id": 6,
              "name": "\u067e\u06cc\u06a9\u0627\u0646",
              "orginalname": "Paykan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/peykan.png",
              "pic2": "images\/teams\/League\/peykan.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 42,
            "goala": 1,
            "goalb": 0,
            "starttime": "\u06f1\u06f7:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f6\/\u06f1\u06f9",
            "percent_teama": "79.3",
            "percent_teamb": "2.58",
            "percent_equal": "18.1",
            "maxresult": {"result": "1-0", "persent": "51.7"},
            "level_id": 7,
            "group_id": 7,
            "teama": {
              "id": 7,
              "name": "\u062a\u0631\u0627\u06a9\u062a\u0648\u0631\u0633\u0627\u0632\u06cc",
              "orginalname": "Tractor Sazi",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/traktor-sazi.png",
              "pic2": "images\/teams\/League\/traktor-sazi.png"
            },
            "teamb": {
              "id": 12,
              "name": "\u0635\u0646\u0639\u062a \u0646\u0641\u062a \u0622\u0628\u0627\u062f\u0627\u0646",
              "orginalname": "Naft Abadan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/naft-abadan.png",
              "pic2": "images\/teams\/League\/naft-abadan.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 44,
            "goala": 3,
            "goalb": 1,
            "starttime": "\u06f1\u06f7:\u06f3\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f6\/\u06f1\u06f9",
            "percent_teama": "84.4",
            "percent_teamb": "3.44",
            "percent_equal": "12.0",
            "maxresult": {"result": "1-0", "persent": "50"},
            "level_id": 7,
            "group_id": 7,
            "teama": {
              "id": 1,
              "name": "\u0627\u0633\u062a\u0642\u0644\u0627\u0644",
              "orginalname": "Esteghlal",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/esteghlal.png",
              "pic2": "images\/teams\/League\/esteghlal.png"
            },
            "teamb": {
              "id": 16,
              "name": "\u0646\u0633\u0627\u062c\u06cc \u0645\u0627\u0632\u0646\u062f\u0631\u0627\u0646",
              "orginalname": "Nassaji Mazandaran",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/nasaji-mazandaran.png",
              "pic2": "images\/teams\/League\/nasaji-mazandaran.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 43,
            "goala": 0,
            "goalb": 0,
            "starttime": "\u06f1\u06f7:\u06f3\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f6\/\u06f1\u06f9",
            "percent_teama": "94.1",
            "percent_teamb": "0.84",
            "percent_equal": "5.04",
            "maxresult": {"result": "1-0", "persent": "37.8"},
            "level_id": 7,
            "group_id": 7,
            "teama": {
              "id": 10,
              "name": "\u0633\u067e\u0627\u0647\u0627\u0646",
              "orginalname": "Sepahan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/sepahan.png",
              "pic2": "images\/teams\/League\/sepahan.png"
            },
            "teamb": {
              "id": 47,
              "name": "\u0622\u0644\u0648\u0645\u06cc\u0646\u06cc\u0648\u0645 \u0627\u0631\u0627\u06a9",
              "orginalname": "Aluminium Arak",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Aluminium70.jpg",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Aluminium.jpg"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 47,
            "goala": 0,
            "goalb": 1,
            "starttime": "\u06f1\u06f7:\u06f3\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f6\/\u06f1\u06f9",
            "percent_teama": "5.93",
            "percent_teamb": "53.3",
            "percent_equal": "40.6",
            "maxresult": {"result": "0-1", "persent": "33.0"},
            "level_id": 7,
            "group_id": 7,
            "teama": {
              "id": 6,
              "name": "\u067e\u06cc\u06a9\u0627\u0646",
              "orginalname": "Paykan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/peykan.png",
              "pic2": "images\/teams\/League\/peykan.png"
            },
            "teamb": {
              "id": 44,
              "name": "\u06af\u0644 \u06af\u0647\u0631\u0633\u06cc\u0631\u062c\u0627\u0646",
              "orginalname": "Golgohar",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Golgohar-logo-LimooGraphic_7070.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Golgohar-logo-LimooGraphic.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 48,
            "goala": null,
            "goalb": null,
            "starttime": "\u06f1\u06f9:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f6\/\u06f1\u06f9",
            "percent_teama": "5.88",
            "percent_teamb": "71.4",
            "percent_equal": "22.6",
            "maxresult": {"result": "0-1", "persent": "37.8"},
            "level_id": 7,
            "group_id": 7,
            "teama": {
              "id": 50,
              "name": "\u0645\u0644\u0648\u0627\u0646 \u0628\u0646\u062f\u0631 \u0627\u0646\u0632\u0644\u06cc",
              "orginalname": "Malavan",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/malavan70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/malavan195.png"
            },
            "teamb": {
              "id": 14,
              "name": "\u0641\u0648\u0644\u0627\u062f \u062e\u0648\u0632\u0633\u062a\u0627\u0646",
              "orginalname": "Foolad.KH",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/foolad.png",
              "pic2": "images\/teams\/League\/foolad.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 0,
            "is_forcasttime": 0
          }, {
            "id": 45,
            "goala": 0,
            "goalb": 0,
            "starttime": "\u06f1\u06f9:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f6\/\u06f1\u06f9",
            "percent_teama": "10.4",
            "percent_teamb": "27.4",
            "percent_equal": "62.0",
            "maxresult": {"result": "1-1", "persent": "33.8"},
            "level_id": 7,
            "group_id": 7,
            "teama": {
              "id": 51,
              "name": "\u0645\u0633 \u06a9\u0631\u0645\u0627\u0646",
              "orginalname": "Sanat Mes Kerman",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/mes-kerman70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/mes-kerman195.png"
            },
            "teamb": {
              "id": 8,
              "name": "\u0630\u0648\u0628 \u0622\u0647\u0646",
              "orginalname": "Zob Ahan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/zob-ahan.png",
              "pic2": "images\/teams\/League\/zob-ahan.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 46,
            "goala": 2,
            "goalb": 1,
            "starttime": "\u06f2\u06f0:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f6\/\u06f1\u06f9",
            "percent_teama": "40.8",
            "percent_teamb": "4.8",
            "percent_equal": "54.4",
            "maxresult": {"result": "1-1", "persent": "27.2"},
            "level_id": 7,
            "group_id": 7,
            "teama": {
              "id": 46,
              "name": "\u0645\u0633 \u0631\u0641\u0633\u0646\u062c\u0627\u0646",
              "orginalname": "Mes Rafsanjan",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Rafsanjan70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Rafsanjan195.png"
            },
            "teamb": {
              "id": 49,
              "name": "\u0647\u0648\u0627\u062f\u0627\u0631",
              "orginalname": "Havadar",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Havadar70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Havadar138.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 41,
            "goala": 1,
            "goalb": 2,
            "starttime": "\u06f2\u06f0:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f6\/\u06f1\u06f9",
            "percent_teama": "0.8",
            "percent_teamb": "84",
            "percent_equal": "15.2",
            "maxresult": {"result": "0-1", "persent": "32.8"},
            "level_id": 7,
            "group_id": 7,
            "teama": {
              "id": 17,
              "name": "\u0646\u0641\u062a\u200c \u0645.\u0633\u0644\u06cc\u0645\u0627\u0646",
              "orginalname": "Naft M.Soleym",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/naft-masjed-soleyman.png",
              "pic2": "images\/teams\/League\/naft-masjed-soleyman.png"
            },
            "teamb": {
              "id": 5,
              "name": "\u067e\u0631\u0633\u067e\u0648\u0644\u06cc\u0633",
              "orginalname": "Persepolis",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/perspolis.png",
              "pic2": "images\/teams\/League\/perspolis.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 53,
            "goala": 4,
            "goalb": 0,
            "starttime": "\u06f1\u06f8:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f7\/\u06f0\u06f9",
            "percent_teama": "45.5",
            "percent_teamb": "6.25",
            "percent_equal": "48.2",
            "maxresult": {"result": "1-1", "persent": "25.8"},
            "level_id": 9,
            "group_id": 9,
            "teama": {
              "id": 16,
              "name": "\u0646\u0633\u0627\u062c\u06cc \u0645\u0627\u0632\u0646\u062f\u0631\u0627\u0646",
              "orginalname": "Nassaji Mazandaran",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/nasaji-mazandaran.png",
              "pic2": "images\/teams\/League\/nasaji-mazandaran.png"
            },
            "teamb": {
              "id": 17,
              "name": "\u0646\u0641\u062a\u200c \u0645.\u0633\u0644\u06cc\u0645\u0627\u0646",
              "orginalname": "Naft M.Soleym",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/naft-masjed-soleyman.png",
              "pic2": "images\/teams\/League\/naft-masjed-soleyman.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 50,
            "goala": 1,
            "goalb": 0,
            "starttime": "\u06f1\u06f8:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f7\/\u06f0\u06f9",
            "percent_teama": "68.4",
            "percent_teamb": "5.40",
            "percent_equal": "26.1",
            "maxresult": {"result": "1-0", "persent": "47.7"},
            "level_id": 9,
            "group_id": 9,
            "teama": {
              "id": 47,
              "name": "\u0622\u0644\u0648\u0645\u06cc\u0646\u06cc\u0648\u0645 \u0627\u0631\u0627\u06a9",
              "orginalname": "Aluminium Arak",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Aluminium70.jpg",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Aluminium.jpg"
            },
            "teamb": {
              "id": 50,
              "name": "\u0645\u0644\u0648\u0627\u0646 \u0628\u0646\u062f\u0631 \u0627\u0646\u0632\u0644\u06cc",
              "orginalname": "Malavan",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/malavan70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/malavan195.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 55,
            "goala": 1,
            "goalb": 2,
            "starttime": "\u06f1\u06f8:\u06f3\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f7\/\u06f0\u06f9",
            "percent_teama": "18.5",
            "percent_teamb": "37.1",
            "percent_equal": "44.2",
            "maxresult": {"result": "1-1", "persent": "25.6"},
            "level_id": 9,
            "group_id": 9,
            "teama": {
              "id": 44,
              "name": "\u06af\u0644 \u06af\u0647\u0631\u0633\u06cc\u0631\u062c\u0627\u0646",
              "orginalname": "Golgohar",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Golgohar-logo-LimooGraphic_7070.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Golgohar-logo-LimooGraphic.png"
            },
            "teamb": {
              "id": 1,
              "name": "\u0627\u0633\u062a\u0642\u0644\u0627\u0644",
              "orginalname": "Esteghlal",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/esteghlal.png",
              "pic2": "images\/teams\/League\/esteghlal.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 51,
            "goala": 0,
            "goalb": 0,
            "starttime": "\u06f1\u06f9:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f7\/\u06f0\u06f9",
            "percent_teama": "86.7",
            "percent_teamb": "1.76",
            "percent_equal": "11.5",
            "maxresult": {"result": "1-0", "persent": "46.9"},
            "level_id": 9,
            "group_id": 9,
            "teama": {
              "id": 14,
              "name": "\u0641\u0648\u0644\u0627\u062f \u062e\u0648\u0632\u0633\u062a\u0627\u0646",
              "orginalname": "Foolad.KH",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/foolad.png",
              "pic2": "images\/teams\/League\/foolad.png"
            },
            "teamb": {
              "id": 51,
              "name": "\u0645\u0633 \u06a9\u0631\u0645\u0627\u0646",
              "orginalname": "Sanat Mes Kerman",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/mes-kerman70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/mes-kerman195.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 49,
            "goala": 1,
            "goalb": 1,
            "starttime": "\u06f1\u06f9:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f7\/\u06f0\u06f9",
            "percent_teama": "22.8",
            "percent_teamb": "20.1",
            "percent_equal": "57.0",
            "maxresult": {"result": "1-1", "persent": "28.0"},
            "level_id": 9,
            "group_id": 9,
            "teama": {
              "id": 12,
              "name": "\u0635\u0646\u0639\u062a \u0646\u0641\u062a \u0622\u0628\u0627\u062f\u0627\u0646",
              "orginalname": "Naft Abadan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/naft-abadan.png",
              "pic2": "images\/teams\/League\/naft-abadan.png"
            },
            "teamb": {
              "id": 46,
              "name": "\u0645\u0633 \u0631\u0641\u0633\u0646\u062c\u0627\u0646",
              "orginalname": "Mes Rafsanjan",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Rafsanjan70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Rafsanjan195.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 54,
            "goala": 1,
            "goalb": 0,
            "starttime": "\u06f1\u06f9:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f7\/\u06f0\u06f9",
            "percent_teama": "50.4",
            "percent_teamb": "2.65",
            "percent_equal": "46.9",
            "maxresult": {"result": "1-0", "persent": "30.9"},
            "level_id": 9,
            "group_id": 9,
            "teama": {
              "id": 8,
              "name": "\u0630\u0648\u0628 \u0622\u0647\u0646",
              "orginalname": "Zob Ahan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/zob-ahan.png",
              "pic2": "images\/teams\/League\/zob-ahan.png"
            },
            "teamb": {
              "id": 6,
              "name": "\u067e\u06cc\u06a9\u0627\u0646",
              "orginalname": "Paykan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/peykan.png",
              "pic2": "images\/teams\/League\/peykan.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 52,
            "goala": 1,
            "goalb": 2,
            "starttime": "\u06f1\u06f7:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f7\/\u06f1\u06f0",
            "percent_teama": "1.73",
            "percent_teamb": "83.4",
            "percent_equal": "14.7",
            "maxresult": {"result": "0-1", "persent": "45.2"},
            "level_id": 9,
            "group_id": 9,
            "teama": {
              "id": 49,
              "name": "\u0647\u0648\u0627\u062f\u0627\u0631",
              "orginalname": "Havadar",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Havadar70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Havadar138.png"
            },
            "teamb": {
              "id": 10,
              "name": "\u0633\u067e\u0627\u0647\u0627\u0646",
              "orginalname": "Sepahan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/sepahan.png",
              "pic2": "images\/teams\/League\/sepahan.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 56,
            "goala": 0,
            "goalb": 1,
            "starttime": "\u06f1\u06f7:\u06f3\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f7\/\u06f1\u06f0",
            "percent_teama": "83.3",
            "percent_teamb": "4.38",
            "percent_equal": "12.2",
            "maxresult": {"result": "1-0", "persent": "32.4"},
            "level_id": 9,
            "group_id": 9,
            "teama": {
              "id": 5,
              "name": "\u067e\u0631\u0633\u067e\u0648\u0644\u06cc\u0633",
              "orginalname": "Persepolis",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/perspolis.png",
              "pic2": "images\/teams\/League\/perspolis.png"
            },
            "teamb": {
              "id": 7,
              "name": "\u062a\u0631\u0627\u06a9\u062a\u0648\u0631\u0633\u0627\u0632\u06cc",
              "orginalname": "Tractor Sazi",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/traktor-sazi.png",
              "pic2": "images\/teams\/League\/traktor-sazi.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 59,
            "goala": 0,
            "goalb": 0,
            "starttime": "\u06f1\u06f7:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f7\/\u06f1\u06f4",
            "percent_teama": "28.9",
            "percent_teamb": "8.41",
            "percent_equal": "62.6",
            "maxresult": {"result": "0-0", "persent": "33.6"},
            "level_id": 10,
            "group_id": 10,
            "teama": {
              "id": 6,
              "name": "\u067e\u06cc\u06a9\u0627\u0646",
              "orginalname": "Paykan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/peykan.png",
              "pic2": "images\/teams\/League\/peykan.png"
            },
            "teamb": {
              "id": 47,
              "name": "\u0622\u0644\u0648\u0645\u06cc\u0646\u06cc\u0648\u0645 \u0627\u0631\u0627\u06a9",
              "orginalname": "Aluminium Arak",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Aluminium70.jpg",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Aluminium.jpg"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 58,
            "goala": 0,
            "goalb": 0,
            "starttime": "\u06f1\u06f8:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f7\/\u06f1\u06f4",
            "percent_teama": "21.2",
            "percent_teamb": "14.8",
            "percent_equal": "63.8",
            "maxresult": {"result": "0-0", "persent": "36.1"},
            "level_id": 10,
            "group_id": 10,
            "teama": {
              "id": 16,
              "name": "\u0646\u0633\u0627\u062c\u06cc \u0645\u0627\u0632\u0646\u062f\u0631\u0627\u0646",
              "orginalname": "Nassaji Mazandaran",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/nasaji-mazandaran.png",
              "pic2": "images\/teams\/League\/nasaji-mazandaran.png"
            },
            "teamb": {
              "id": 8,
              "name": "\u0630\u0648\u0628 \u0622\u0647\u0646",
              "orginalname": "Zob Ahan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/zob-ahan.png",
              "pic2": "images\/teams\/League\/zob-ahan.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 63,
            "goala": 1,
            "goalb": 1,
            "starttime": "\u06f1\u06f7:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f7\/\u06f1\u06f5",
            "percent_teama": "68.1",
            "percent_teamb": "4.31",
            "percent_equal": "27.5",
            "maxresult": {"result": "1-0", "persent": "31.8"},
            "level_id": 10,
            "group_id": 10,
            "teama": {
              "id": 1,
              "name": "\u0627\u0633\u062a\u0642\u0644\u0627\u0644",
              "orginalname": "Esteghlal",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/esteghlal.png",
              "pic2": "images\/teams\/League\/esteghlal.png"
            },
            "teamb": {
              "id": 14,
              "name": "\u0641\u0648\u0644\u0627\u062f \u062e\u0648\u0632\u0633\u062a\u0627\u0646",
              "orginalname": "Foolad.KH",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/foolad.png",
              "pic2": "images\/teams\/League\/foolad.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 57,
            "goala": 2,
            "goalb": 1,
            "starttime": "\u06f1\u06f7:\u06f3\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f7\/\u06f1\u06f5",
            "percent_teama": "34.7",
            "percent_teamb": "13.5",
            "percent_equal": "51.6",
            "maxresult": {"result": "0-0", "persent": "28.8"},
            "level_id": 10,
            "group_id": 10,
            "teama": {
              "id": 50,
              "name": "\u0645\u0644\u0648\u0627\u0646 \u0628\u0646\u062f\u0631 \u0627\u0646\u0632\u0644\u06cc",
              "orginalname": "Malavan",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/malavan70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/malavan195.png"
            },
            "teamb": {
              "id": 12,
              "name": "\u0635\u0646\u0639\u062a \u0646\u0641\u062a \u0622\u0628\u0627\u062f\u0627\u0646",
              "orginalname": "Naft Abadan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/naft-abadan.png",
              "pic2": "images\/teams\/League\/naft-abadan.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 60,
            "goala": 0,
            "goalb": 1,
            "starttime": "\u06f1\u06f8:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f7\/\u06f1\u06f5",
            "percent_teama": "35.0",
            "percent_teamb": "11.1",
            "percent_equal": "53.8",
            "maxresult": {"result": "1-1", "persent": "27.3"},
            "level_id": 10,
            "group_id": 10,
            "teama": {
              "id": 51,
              "name": "\u0645\u0633 \u06a9\u0631\u0645\u0627\u0646",
              "orginalname": "Sanat Mes Kerman",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/mes-kerman70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/mes-kerman195.png"
            },
            "teamb": {
              "id": 49,
              "name": "\u0647\u0648\u0627\u062f\u0627\u0631",
              "orginalname": "Havadar",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Havadar70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Havadar138.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 64,
            "goala": 1,
            "goalb": 0,
            "starttime": "\u06f1\u06f8:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f7\/\u06f1\u06f5",
            "percent_teama": "11.2",
            "percent_teamb": "54.3",
            "percent_equal": "34.4",
            "maxresult": {"result": "0-1", "persent": "35.3"},
            "level_id": 10,
            "group_id": 10,
            "teama": {
              "id": 46,
              "name": "\u0645\u0633 \u0631\u0641\u0633\u0646\u062c\u0627\u0646",
              "orginalname": "Mes Rafsanjan",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Rafsanjan70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Rafsanjan195.png"
            },
            "teamb": {
              "id": 7,
              "name": "\u062a\u0631\u0627\u06a9\u062a\u0648\u0631\u0633\u0627\u0632\u06cc",
              "orginalname": "Tractor Sazi",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/traktor-sazi.png",
              "pic2": "images\/teams\/League\/traktor-sazi.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 62,
            "goala": 0,
            "goalb": 5,
            "starttime": "\u06f1\u06f9:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f7\/\u06f1\u06f5",
            "percent_teama": "3.12",
            "percent_teamb": "70.3",
            "percent_equal": "26.5",
            "maxresult": {"result": "0-1", "persent": "35.1"},
            "level_id": 10,
            "group_id": 10,
            "teama": {
              "id": 17,
              "name": "\u0646\u0641\u062a\u200c \u0645.\u0633\u0644\u06cc\u0645\u0627\u0646",
              "orginalname": "Naft M.Soleym",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/naft-masjed-soleyman.png",
              "pic2": "images\/teams\/League\/naft-masjed-soleyman.png"
            },
            "teamb": {
              "id": 44,
              "name": "\u06af\u0644 \u06af\u0647\u0631\u0633\u06cc\u0631\u062c\u0627\u0646",
              "orginalname": "Golgohar",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Golgohar-logo-LimooGraphic_7070.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Golgohar-logo-LimooGraphic.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 61,
            "goala": 0,
            "goalb": 0,
            "starttime": "\u06f2\u06f0:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f7\/\u06f1\u06f5",
            "percent_teama": "15.8",
            "percent_teamb": "33.3",
            "percent_equal": "50.8",
            "maxresult": {"result": "1-1", "persent": "33.3"},
            "level_id": 10,
            "group_id": 10,
            "teama": {
              "id": 10,
              "name": "\u0633\u067e\u0627\u0647\u0627\u0646",
              "orginalname": "Sepahan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/sepahan.png",
              "pic2": "images\/teams\/League\/sepahan.png"
            },
            "teamb": {
              "id": 5,
              "name": "\u067e\u0631\u0633\u067e\u0648\u0644\u06cc\u0633",
              "orginalname": "Persepolis",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/perspolis.png",
              "pic2": "images\/teams\/League\/perspolis.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 65,
            "goala": 0,
            "goalb": 1,
            "starttime": "\u06f1\u06f7:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f7\/\u06f2\u06f1",
            "percent_teama": "90.6",
            "percent_teamb": "0",
            "percent_equal": "9.33",
            "maxresult": {"result": "1-0", "persent": "42.6"},
            "level_id": 11,
            "group_id": 11,
            "teama": {
              "id": 44,
              "name": "\u06af\u0644 \u06af\u0647\u0631\u0633\u06cc\u0631\u062c\u0627\u0646",
              "orginalname": "Golgohar",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Golgohar-logo-LimooGraphic_7070.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Golgohar-logo-LimooGraphic.png"
            },
            "teamb": {
              "id": 16,
              "name": "\u0646\u0633\u0627\u062c\u06cc \u0645\u0627\u0632\u0646\u062f\u0631\u0627\u0646",
              "orginalname": "Nassaji Mazandaran",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/nasaji-mazandaran.png",
              "pic2": "images\/teams\/League\/nasaji-mazandaran.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 66,
            "goala": 1,
            "goalb": 0,
            "starttime": "\u06f1\u06f7:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f7\/\u06f2\u06f1",
            "percent_teama": "96",
            "percent_teamb": "0",
            "percent_equal": "4",
            "maxresult": {"result": "1-0", "persent": "50.6"},
            "level_id": 11,
            "group_id": 11,
            "teama": {
              "id": 5,
              "name": "\u067e\u0631\u0633\u067e\u0648\u0644\u06cc\u0633",
              "orginalname": "Persepolis",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/perspolis.png",
              "pic2": "images\/teams\/League\/perspolis.png"
            },
            "teamb": {
              "id": 46,
              "name": "\u0645\u0633 \u0631\u0641\u0633\u0646\u062c\u0627\u0646",
              "orginalname": "Mes Rafsanjan",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Rafsanjan70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Rafsanjan195.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 68,
            "goala": 0,
            "goalb": 2,
            "starttime": "\u06f1\u06f8:\u06f3\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f7\/\u06f2\u06f1",
            "percent_teama": "0",
            "percent_teamb": "76.3",
            "percent_equal": "23.6",
            "maxresult": {"result": "0-1", "persent": "43.4"},
            "level_id": 11,
            "group_id": 11,
            "teama": {
              "id": 12,
              "name": "\u0635\u0646\u0639\u062a \u0646\u0641\u062a \u0622\u0628\u0627\u062f\u0627\u0646",
              "orginalname": "Naft Abadan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/naft-abadan.png",
              "pic2": "images\/teams\/League\/naft-abadan.png"
            },
            "teamb": {
              "id": 10,
              "name": "\u0633\u067e\u0627\u0647\u0627\u0646",
              "orginalname": "Sepahan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/sepahan.png",
              "pic2": "images\/teams\/League\/sepahan.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 67,
            "goala": 1,
            "goalb": 1,
            "starttime": "\u06f1\u06f8:\u06f3\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f7\/\u06f2\u06f1",
            "percent_teama": "94.7",
            "percent_teamb": "1.31",
            "percent_equal": "3.94",
            "maxresult": {"result": "1-0", "persent": "67.1"},
            "level_id": 11,
            "group_id": 11,
            "teama": {
              "id": 14,
              "name": "\u0641\u0648\u0644\u0627\u062f \u062e\u0648\u0632\u0633\u062a\u0627\u0646",
              "orginalname": "Foolad.KH",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/foolad.png",
              "pic2": "images\/teams\/League\/foolad.png"
            },
            "teamb": {
              "id": 6,
              "name": "\u067e\u06cc\u06a9\u0627\u0646",
              "orginalname": "Paykan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/peykan.png",
              "pic2": "images\/teams\/League\/peykan.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 69,
            "goala": 1,
            "goalb": 0,
            "starttime": "\u06f1\u06f6:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f7\/\u06f2\u06f2",
            "percent_teama": "55.1",
            "percent_teamb": "2.56",
            "percent_equal": "42.3",
            "maxresult": {"result": "1-0", "persent": "38.4"},
            "level_id": 11,
            "group_id": 11,
            "teama": {
              "id": 49,
              "name": "\u0647\u0648\u0627\u062f\u0627\u0631",
              "orginalname": "Havadar",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Havadar70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Havadar138.png"
            },
            "teamb": {
              "id": 50,
              "name": "\u0645\u0644\u0648\u0627\u0646 \u0628\u0646\u062f\u0631 \u0627\u0646\u0632\u0644\u06cc",
              "orginalname": "Malavan",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/malavan70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/malavan195.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 70,
            "goala": 3,
            "goalb": 2,
            "starttime": "\u06f1\u06f6:\u06f3\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f7\/\u06f2\u06f2",
            "percent_teama": "88.4",
            "percent_teamb": "0",
            "percent_equal": "11.5",
            "maxresult": {"result": "1-0", "persent": "48.7"},
            "level_id": 11,
            "group_id": 11,
            "teama": {
              "id": 7,
              "name": "\u062a\u0631\u0627\u06a9\u062a\u0648\u0631\u0633\u0627\u0632\u06cc",
              "orginalname": "Tractor Sazi",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/traktor-sazi.png",
              "pic2": "images\/teams\/League\/traktor-sazi.png"
            },
            "teamb": {
              "id": 17,
              "name": "\u0646\u0641\u062a\u200c \u0645.\u0633\u0644\u06cc\u0645\u0627\u0646",
              "orginalname": "Naft M.Soleym",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/naft-masjed-soleyman.png",
              "pic2": "images\/teams\/League\/naft-masjed-soleyman.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 71,
            "goala": 0,
            "goalb": 1,
            "starttime": "\u06f1\u06f6:\u06f3\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f7\/\u06f2\u06f2",
            "percent_teama": "1.28",
            "percent_teamb": "53.8",
            "percent_equal": "44.8",
            "maxresult": {"result": "0-1", "persent": "30.7"},
            "level_id": 11,
            "group_id": 11,
            "teama": {
              "id": 8,
              "name": "\u0630\u0648\u0628 \u0622\u0647\u0646",
              "orginalname": "Zob Ahan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/zob-ahan.png",
              "pic2": "images\/teams\/League\/zob-ahan.png"
            },
            "teamb": {
              "id": 1,
              "name": "\u0627\u0633\u062a\u0642\u0644\u0627\u0644",
              "orginalname": "Esteghlal",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/esteghlal.png",
              "pic2": "images\/teams\/League\/esteghlal.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 72,
            "goala": 2,
            "goalb": 0,
            "starttime": "\u06f1\u06f7:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f7\/\u06f2\u06f2",
            "percent_teama": "55.8",
            "percent_teamb": "2.59",
            "percent_equal": "41.5",
            "maxresult": {"result": "1-0", "persent": "45.4"},
            "level_id": 11,
            "group_id": 11,
            "teama": {
              "id": 47,
              "name": "\u0622\u0644\u0648\u0645\u06cc\u0646\u06cc\u0648\u0645 \u0627\u0631\u0627\u06a9",
              "orginalname": "Aluminium Arak",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Aluminium70.jpg",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Aluminium.jpg"
            },
            "teamb": {
              "id": 51,
              "name": "\u0645\u0633 \u06a9\u0631\u0645\u0627\u0646",
              "orginalname": "Sanat Mes Kerman",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/mes-kerman70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/mes-kerman195.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 73,
            "goala": 4,
            "goalb": 2,
            "starttime": "\u06f1\u06f5:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f7\/\u06f2\u06f8",
            "percent_teama": "60.2",
            "percent_teamb": "4.10",
            "percent_equal": "35.6",
            "maxresult": {"result": "1-0", "persent": "26.0"},
            "level_id": 12,
            "group_id": 12,
            "teama": {
              "id": 10,
              "name": "\u0633\u067e\u0627\u0647\u0627\u0646",
              "orginalname": "Sepahan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/sepahan.png",
              "pic2": "images\/teams\/League\/sepahan.png"
            },
            "teamb": {
              "id": 7,
              "name": "\u062a\u0631\u0627\u06a9\u062a\u0648\u0631\u0633\u0627\u0632\u06cc",
              "orginalname": "Tractor Sazi",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/traktor-sazi.png",
              "pic2": "images\/teams\/League\/traktor-sazi.png"
            },
            "is_forecast": 1,
            "forecasts": [{"id": 8575, "goala": 0, "goalb": 0, "score": 2, "ball_score": 1}],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 74,
            "goala": 0,
            "goalb": 1,
            "starttime": "\u06f1\u06f7:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f7\/\u06f2\u06f8",
            "percent_teama": "2.70",
            "percent_teamb": "94.5",
            "percent_equal": "2.70",
            "maxresult": {"result": "0-1", "persent": "47.2"},
            "level_id": 12,
            "group_id": 12,
            "teama": {
              "id": 50,
              "name": "\u0645\u0644\u0648\u0627\u0646 \u0628\u0646\u062f\u0631 \u0627\u0646\u0632\u0644\u06cc",
              "orginalname": "Malavan",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/malavan70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/malavan195.png"
            },
            "teamb": {
              "id": 5,
              "name": "\u067e\u0631\u0633\u067e\u0648\u0644\u06cc\u0633",
              "orginalname": "Persepolis",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/perspolis.png",
              "pic2": "images\/teams\/League\/perspolis.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 75,
            "goala": 2,
            "goalb": 0,
            "starttime": "\u06f1\u06f7:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f7\/\u06f2\u06f8",
            "percent_teama": "31.0",
            "percent_teamb": "6.75",
            "percent_equal": "62.1",
            "maxresult": {"result": "0-0", "persent": "37.8"},
            "level_id": 12,
            "group_id": 12,
            "teama": {
              "id": 51,
              "name": "\u0645\u0633 \u06a9\u0631\u0645\u0627\u0646",
              "orginalname": "Sanat Mes Kerman",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/mes-kerman70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/mes-kerman195.png"
            },
            "teamb": {
              "id": 12,
              "name": "\u0635\u0646\u0639\u062a \u0646\u0641\u062a \u0622\u0628\u0627\u062f\u0627\u0646",
              "orginalname": "Naft Abadan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/naft-abadan.png",
              "pic2": "images\/teams\/League\/naft-abadan.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 76,
            "goala": 2,
            "goalb": 1,
            "starttime": "\u06f1\u06f7:\u06f3\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f7\/\u06f2\u06f8",
            "percent_teama": "40.5",
            "percent_teamb": "8.86",
            "percent_equal": "50.6",
            "maxresult": {"result": "2-1", "persent": "30.3"},
            "level_id": 12,
            "group_id": 12,
            "teama": {
              "id": 16,
              "name": "\u0646\u0633\u0627\u062c\u06cc \u0645\u0627\u0632\u0646\u062f\u0631\u0627\u0646",
              "orginalname": "Nassaji Mazandaran",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/nasaji-mazandaran.png",
              "pic2": "images\/teams\/League\/nasaji-mazandaran.png"
            },
            "teamb": {
              "id": 14,
              "name": "\u0641\u0648\u0644\u0627\u062f \u062e\u0648\u0632\u0633\u062a\u0627\u0646",
              "orginalname": "Foolad.KH",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/foolad.png",
              "pic2": "images\/teams\/League\/foolad.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 77,
            "goala": 1,
            "goalb": 1,
            "starttime": "\u06f1\u06f5:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f7\/\u06f2\u06f9",
            "percent_teama": "18.2",
            "percent_teamb": "19.5",
            "percent_equal": "62.1",
            "maxresult": {"result": "0-0", "persent": "31.7"},
            "level_id": 12,
            "group_id": 12,
            "teama": {
              "id": 6,
              "name": "\u067e\u06cc\u06a9\u0627\u0646",
              "orginalname": "Paykan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/peykan.png",
              "pic2": "images\/teams\/League\/peykan.png"
            },
            "teamb": {
              "id": 49,
              "name": "\u0647\u0648\u0627\u062f\u0627\u0631",
              "orginalname": "Havadar",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Havadar70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Havadar138.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 80,
            "goala": 0,
            "goalb": 0,
            "starttime": "\u06f1\u06f7:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f7\/\u06f2\u06f9",
            "percent_teama": "90.1",
            "percent_teamb": "1.23",
            "percent_equal": "8.64",
            "maxresult": {"result": "1-0", "persent": "43.2"},
            "level_id": 12,
            "group_id": 12,
            "teama": {
              "id": 1,
              "name": "\u0627\u0633\u062a\u0642\u0644\u0627\u0644",
              "orginalname": "Esteghlal",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/esteghlal.png",
              "pic2": "images\/teams\/League\/esteghlal.png"
            },
            "teamb": {
              "id": 47,
              "name": "\u0622\u0644\u0648\u0645\u06cc\u0646\u06cc\u0648\u0645 \u0627\u0631\u0627\u06a9",
              "orginalname": "Aluminium Arak",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Aluminium70.jpg",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Aluminium.jpg"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 79,
            "goala": 0,
            "goalb": 0,
            "starttime": "\u06f1\u06f7:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f7\/\u06f2\u06f9",
            "percent_teama": "8.64",
            "percent_teamb": "48.1",
            "percent_equal": "43.2",
            "maxresult": {"result": "0-1", "persent": "35.8"},
            "level_id": 12,
            "group_id": 12,
            "teama": {
              "id": 17,
              "name": "\u0646\u0641\u062a\u200c \u0645.\u0633\u0644\u06cc\u0645\u0627\u0646",
              "orginalname": "Naft M.Soleym",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/naft-masjed-soleyman.png",
              "pic2": "images\/teams\/League\/naft-masjed-soleyman.png"
            },
            "teamb": {
              "id": 46,
              "name": "\u0645\u0633 \u0631\u0641\u0633\u0646\u062c\u0627\u0646",
              "orginalname": "Mes Rafsanjan",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Rafsanjan70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Rafsanjan195.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 78,
            "goala": 1,
            "goalb": 0,
            "starttime": "\u06f1\u06f7:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f7\/\u06f2\u06f9",
            "percent_teama": "80.4",
            "percent_teamb": "2.43",
            "percent_equal": "17.0",
            "maxresult": {"result": "1-0", "persent": "47.5"},
            "level_id": 12,
            "group_id": 12,
            "teama": {
              "id": 44,
              "name": "\u06af\u0644 \u06af\u0647\u0631\u0633\u06cc\u0631\u062c\u0627\u0646",
              "orginalname": "Golgohar",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Golgohar-logo-LimooGraphic_7070.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Golgohar-logo-LimooGraphic.png"
            },
            "teamb": {
              "id": 8,
              "name": "\u0630\u0648\u0628 \u0622\u0647\u0646",
              "orginalname": "Zob Ahan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/zob-ahan.png",
              "pic2": "images\/teams\/League\/zob-ahan.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 1,
            "is_forcasttime": 0
          }, {
            "id": 81,
            "goala": null,
            "goalb": null,
            "starttime": "\u06f1\u06f5:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f8\/\u06f0\u06f5",
            "percent_teama": "92",
            "percent_teamb": "0",
            "percent_equal": "8",
            "maxresult": {"result": "1-0", "persent": "40"},
            "level_id": 13,
            "group_id": 13,
            "teama": {
              "id": 7,
              "name": "\u062a\u0631\u0627\u06a9\u062a\u0648\u0631\u0633\u0627\u0632\u06cc",
              "orginalname": "Tractor Sazi",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/traktor-sazi.png",
              "pic2": "images\/teams\/League\/traktor-sazi.png"
            },
            "teamb": {
              "id": 50,
              "name": "\u0645\u0644\u0648\u0627\u0646 \u0628\u0646\u062f\u0631 \u0627\u0646\u0632\u0644\u06cc",
              "orginalname": "Malavan",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/malavan70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/malavan195.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 0,
            "is_forcasttime": 1
          }, {
            "id": 82,
            "goala": null,
            "goalb": null,
            "starttime": "\u06f1\u06f7:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f8\/\u06f0\u06f5",
            "percent_teama": "91.6",
            "percent_teamb": "0",
            "percent_equal": "8.33",
            "maxresult": {"result": "2-0", "persent": "50"},
            "level_id": 13,
            "group_id": 13,
            "teama": {
              "id": 5,
              "name": "\u067e\u0631\u0633\u067e\u0648\u0644\u06cc\u0633",
              "orginalname": "Persepolis",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/perspolis.png",
              "pic2": "images\/teams\/League\/perspolis.png"
            },
            "teamb": {
              "id": 51,
              "name": "\u0645\u0633 \u06a9\u0631\u0645\u0627\u0646",
              "orginalname": "Sanat Mes Kerman",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/mes-kerman70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/mes-kerman195.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 0,
            "is_forcasttime": 1
          }, {
            "id": 83,
            "goala": null,
            "goalb": null,
            "starttime": "\u06f1\u06f7:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f8\/\u06f0\u06f5",
            "percent_teama": "8.33",
            "percent_teamb": "8.33",
            "percent_equal": "83.3",
            "maxresult": {"result": "0-0", "persent": "54.1"},
            "level_id": 13,
            "group_id": 13,
            "teama": {
              "id": 12,
              "name": "\u0635\u0646\u0639\u062a \u0646\u0641\u062a \u0622\u0628\u0627\u062f\u0627\u0646",
              "orginalname": "Naft Abadan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/naft-abadan.png",
              "pic2": "images\/teams\/League\/naft-abadan.png"
            },
            "teamb": {
              "id": 6,
              "name": "\u067e\u06cc\u06a9\u0627\u0646",
              "orginalname": "Paykan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/peykan.png",
              "pic2": "images\/teams\/League\/peykan.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 0,
            "is_forcasttime": 1
          }, {
            "id": 84,
            "goala": null,
            "goalb": null,
            "starttime": "\u06f1\u06f9:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f8\/\u06f0\u06f5",
            "percent_teama": "12.5",
            "percent_teamb": "16.6",
            "percent_equal": "70.8",
            "maxresult": {"result": "0-0", "persent": "37.5"},
            "level_id": 13,
            "group_id": 13,
            "teama": {
              "id": 14,
              "name": "\u0641\u0648\u0644\u0627\u062f \u062e\u0648\u0632\u0633\u062a\u0627\u0646",
              "orginalname": "Foolad.KH",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/foolad.png",
              "pic2": "images\/teams\/League\/foolad.png"
            },
            "teamb": {
              "id": 44,
              "name": "\u06af\u0644 \u06af\u0647\u0631\u0633\u06cc\u0631\u062c\u0627\u0646",
              "orginalname": "Golgohar",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Golgohar-logo-LimooGraphic_7070.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Golgohar-logo-LimooGraphic.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 0,
            "is_forcasttime": 1
          }, {
            "id": 85,
            "goala": null,
            "goalb": null,
            "starttime": "\u06f1\u06f6:\u06f0\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f8\/\u06f0\u06f6",
            "percent_teama": "4.16",
            "percent_teamb": "62.5",
            "percent_equal": "33.3",
            "maxresult": {"result": "0-1", "persent": "58.3"},
            "level_id": 13,
            "group_id": 13,
            "teama": {
              "id": 49,
              "name": "\u0647\u0648\u0627\u062f\u0627\u0631",
              "orginalname": "Havadar",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Havadar70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Havadar138.png"
            },
            "teamb": {
              "id": 1,
              "name": "\u0627\u0633\u062a\u0642\u0644\u0627\u0644",
              "orginalname": "Esteghlal",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/esteghlal.png",
              "pic2": "images\/teams\/League\/esteghlal.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 0,
            "is_forcasttime": 1
          }, {
            "id": 86,
            "goala": null,
            "goalb": null,
            "starttime": "\u06f1\u06f6:\u06f3\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f8\/\u06f0\u06f6",
            "percent_teama": "4.16",
            "percent_teamb": "70.8",
            "percent_equal": "25",
            "maxresult": {"result": "0-1", "persent": "33.3"},
            "level_id": 13,
            "group_id": 13,
            "teama": {
              "id": 46,
              "name": "\u0645\u0633 \u0631\u0641\u0633\u0646\u062c\u0627\u0646",
              "orginalname": "Mes Rafsanjan",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Rafsanjan70.png",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Rafsanjan195.png"
            },
            "teamb": {
              "id": 10,
              "name": "\u0633\u067e\u0627\u0647\u0627\u0646",
              "orginalname": "Sepahan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/sepahan.png",
              "pic2": "images\/teams\/League\/sepahan.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 0,
            "is_forcasttime": 1
          }, {
            "id": 87,
            "goala": null,
            "goalb": null,
            "starttime": "\u06f1\u06f7:\u06f3\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f8\/\u06f0\u06f6",
            "percent_teama": "8.33",
            "percent_teamb": "16.6",
            "percent_equal": "75",
            "maxresult": {"result": "0-0", "persent": "54.1"},
            "level_id": 13,
            "group_id": 13,
            "teama": {
              "id": 47,
              "name": "\u0622\u0644\u0648\u0645\u06cc\u0646\u06cc\u0648\u0645 \u0627\u0631\u0627\u06a9",
              "orginalname": "Aluminium Arak",
              "status": 0,
              "pic": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/70.70\/Aluminium70.jpg",
              "pic2": "https:\/\/samyar.rasgames.ir\/pishbinipanel\/uploads\/shares\/teams\/League\/Aluminium.jpg"
            },
            "teamb": {
              "id": 16,
              "name": "\u0646\u0633\u0627\u062c\u06cc \u0645\u0627\u0632\u0646\u062f\u0631\u0627\u0646",
              "orginalname": "Nassaji Mazandaran",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/nasaji-mazandaran.png",
              "pic2": "images\/teams\/League\/nasaji-mazandaran.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 0,
            "is_forcasttime": 1
          }, {
            "id": 88,
            "goala": null,
            "goalb": null,
            "starttime": "\u06f1\u06f8:\u06f3\u06f0",
            "startdate": "\u06f1\u06f4\u06f0\u06f1\/\u06f0\u06f8\/\u06f0\u06f6",
            "percent_teama": "69.5",
            "percent_teamb": "4.34",
            "percent_equal": "26.0",
            "maxresult": {"result": "1-0", "persent": "60.8"},
            "level_id": 13,
            "group_id": 13,
            "teama": {
              "id": 8,
              "name": "\u0630\u0648\u0628 \u0622\u0647\u0646",
              "orginalname": "Zob Ahan",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/zob-ahan.png",
              "pic2": "images\/teams\/League\/zob-ahan.png"
            },
            "teamb": {
              "id": 17,
              "name": "\u0646\u0641\u062a\u200c \u0645.\u0633\u0644\u06cc\u0645\u0627\u0646",
              "orginalname": "Naft M.Soleym",
              "status": 1,
              "pic": "images\/teams\/League\/70.70\/naft-masjed-soleyman.png",
              "pic2": "images\/teams\/League\/naft-masjed-soleyman.png"
            },
            "is_forecast": 0,
            "forecasts": [],
            "status": 0,
            "is_forcasttime": 1
          }]
        }
      }
      this.groups = dataTest.data.Groups;

      api.groupteams().then((data) => {
        if (data.success) {
          this.matches = data['data']['Matchs'];
          this.groups = data.data.Groups;
        } else {
          this.matches = {};
        }

        // if (data.success)
        //   this.scrollInit();
      });
    },
    right() {
      if (this.yPos == 1) {
        this.$refs.groups.right()
      }
    },
    left() {
      if (this.yPos == 1) {
        this.$refs.groups.left()
      }
    }
  }
}
</script>

<style scoped>
.winnerParent {
  width: 100%;
  height: 33px;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 38px;
  color: #FFFFFF;
  position: relative;
}

.scoreItem {
  position: relative;
  width: 315px;
  height: 77px;
  border: 2px solid #FFFFFF4D;
  box-shadow: 0px 4px 4px 0px #00000040;
  border-radius: 8px;
  display: flex;
  display: -webkit-flex !important;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  padding: 0px 10px 0px 10px;
  margin: auto;
}

.innerItem {
  display: flex;
  display: -webkit-flex !important;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  align-content: center;
  height: 100%;
  /*border: 1px solid red;*/
}

.nameBox {
  width: 65%;
  justify-content: flex-start;
}

.rankBox {
  width: 35%;
  justify-content: flex-end;
}

.nameTxt {
  color: #FFFFFF;
  font-size: 18px;
  line-height: 50%;
}

.scoreTxt {
  color: #FFCE31;
  font-size: 18px;
  line-height: 50%;
}
</style>