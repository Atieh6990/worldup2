import { resolveWImg } from './wImgUrl'



var osType = 0

var developMode = 0

var webviewMode = 1

var menuPanelWidth = 350

var menuPanelHeight = 1080



function detectWebviewMode() {

    if (webviewMode == 1) return true

    if (typeof window === 'undefined') return false

    try {

        var href = window.location.href || ''

        if (/[?&]webview=1(?:&|#|$)/.test(href)) return true

    } catch (e) {}

    return false

}



var main_api_url = 'https://fifa.tvapps.ir/api/'

var FileName = 'online_chat_tk'

var socketUrl = 'wss://metadata.tvapps.ir'

var TVChannel = 'FIFA'

var aparat_sport_league_url = 'https://www.aparatsport.ir/api/fa/v2/tag/tag/get_league_data?league_name=fifaworldcup2026'

var aparat_sport_video_list_url = 'https://www.aparatsport.ir/api/fa/v1/sport/sport/get_sport_video_list?device_type=website'

var aparat_match_with_uuid_url = 'https://www.aparatsport.com/api/fa/v1/sport/sport/get_match_with_uuid?uuid='

var WImgUrl = 'https://fifa-panel.sam-tool.ir/img/'

var emptyDataMsg = 'فعلا داده‌ای وجود ندارد.'



var menuItems = [

    {id: 0, name: 'پخش آنلاین جام جهانی', des: 'پخش زنده مسابقات جام جهانی', rout: '/worldCupHome/worldCupLive/'},

    {id: 1, name: 'بازی های پیش رو', des: 'برنامه بازی های آینده', rout: '/worldCupHome/onlinePlay/'},

    {id: 2, name: 'پیش بینی', des: 'پیش بینی لحظه ای مسابقات فوتبال', rout: '/worldCupHome/forecast/'},

    {id: 3, name: 'رتبه بندی', des: 'جدول رتبه بندی کاربران', rout: '/worldCupHome/scores/'},

    {id: 4, name: 'امتیازات', des: 'محاسبه امتیاز', rout: '/worldCupHome/scores/'},

    {id: 5, name: 'اسامی برندگان', des: 'معرفی برندگان دوره های پیش بینی', rout: '/worldCupHome/winners/'},

    {id: 6, name: 'راهنما', des: 'راهنمای اپلیکیشن', rout: '/worldCupHome/guide/'}

]



export const ROAST_CONFIG = {

    OS_TYPE: osType,

    DEVELOP_MODE: developMode,

    WEBVIEW_MODE: detectWebviewMode(),

    MENU_WIDTH: menuPanelWidth,

    MENU_HEIGHT: menuPanelHeight,

    FILE_NAME: FileName,

    SOCKET_URL: socketUrl,

    TV_CHANNEL: TVChannel,

    menuItems: menuItems,

    main_api_url: main_api_url,

    APARAT_SPORT_LEAGUE_URL: aparat_sport_league_url,

    APARAT_SPORT_VIDEO_LIST_URL: aparat_sport_video_list_url,

    APARAT_MATCH_WITH_UUID_URL: aparat_match_with_uuid_url,

    WImgUrl: WImgUrl,

    resolveWImg: (fileName) => resolveWImg(fileName, developMode, WImgUrl),

    EMPTY_DATA_MSG: emptyDataMsg

}


