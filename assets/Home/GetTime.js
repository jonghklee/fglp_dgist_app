export function getTimeLeft() {
    const masTime = new Date();
    const todayTime = new Date();
    const diff = masTime - todayTime;
    return({
        diffDay: Math.floor(diff / (1000*60*60*24)),
        diffHour: Math.floor((diff / (1000*60*60)) % 24),
        diffMin: Math.floor((diff / (1000*60)) % 60),
        diffSec: Math.floor(diff / 1000 % 60),
    });
}

export function getCurrTime() {
    const curr = new Date();   // 1. 현재 시간(Locale)
    const utc = curr.getTime() + (curr.getTimezoneOffset() * 60 * 1000);   // 2. UTC 시간 계산
    const LA_TIME_DIFF = -7 * 60 * 60 * 1000;   // UTC -7
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;    // UTC +9
    const la_curr = new Date(utc + (LA_TIME_DIFF));
    const kr_curr = new Date(utc + (KR_TIME_DIFF));
    
    return({
        la_time: {
            date: la_curr.getDate(),         //To get the Current Date
            month: la_curr.getMonth() + 1,   //To get the Current Month
            year: la_curr.getFullYear(),     //To get the Current Year
            hours: la_curr.getHours(),       //To get the Current Hours
            min: la_curr.getMinutes(),       //To get the Current Minutes
            sec: la_curr.getSeconds(),       //To get the Current Seconds
        },
        kr_time: {
            date: kr_curr.getDate(),         //To get the Current Date
            month: kr_curr.getMonth() + 1,   //To get the Current Month
            year: kr_curr.getFullYear(),     //To get the Current Year
            hours: kr_curr.getHours(),       //To get the Current Hours
            min: kr_curr.getMinutes(),       //To get the Current Minutes
            sec: kr_curr.getSeconds(),       //To get the Current Seconds
        }
    });
};