var osType = 0; // 0->android , 1->tizen
var developMode = 0//baraye build geteftan beshe 0
var api_url = "https://sambazar.tvapps.ir/api/v2";
var main_api_url = "https://fifa.tvapps.ir/api/";
var FileName = "online_chat_tk";
var socketUrl = "wss://metadata.tvapps.ir";
var TVChannel = "Apps";
var menuItems= [
    // {id: 0, name: 'گردونه شانس', des: 'گردونه رو بچرخون و شانست رو امتحان کن', rout: '/worldCupHome/Pm/'},
    {id: 1, name: 'پیش بینی', des: 'پیش بینی لحظه ای مسابقات فوتبال', rout: '/worldCupHome/forecast/'},
    {id: 2, name: 'چت آنلاین', des: 'چت آنلاین حین تماشای فوتبال', rout: '/worldCupHome/Pm/'},
    {id: 3, name: 'پخش آنلاین', des: 'پخش آنلاین مسابقات جام جهانی', rout: '/worldCupHome/onlinePlay/'},
    {id: 4, name: 'اسامی برندگان', des: 'معرفی برندگان دوره های پیش بینی', rout: '/worldCupHome/winners/'},
    {id: 5, name: 'امتیازات', des: 'محاسبه امتیاز', rout: '/worldCupHome/scores/'},
    // {id: 6, name: 'دیجی کلاب بت', des: 'سفارش آنلاین غذا و تنقلات', rout: '/worldCupHome/Pm/'},
]
export const ROAST_CONFIG = {
    OS_TYPE: osType,
    DEVELOP_MODE: developMode,
    API_URL: api_url,
    FILE_NAME: FileName,
    SOCKET_URL: socketUrl,
    TV_CHANNEL: TVChannel,
    menuItems:menuItems,
    main_api_url:main_api_url

}
