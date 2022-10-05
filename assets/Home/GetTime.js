export function getTimeDiff(fromdate, todate) {
    const fromtime = (fromdate == "now") ? new Date() : new Date(fromdate);
    const totime = (todate == "now") ? new Date() : new Date(todate);
    const diff = totime.getTime() - fromtime.getTime();
    
    return({
        diffDay: Math.floor(diff/(1000*60*60*24)),
        diffHour : Math.floor(24-(diff % (1000*60*60*24))/(1000*60*60)),
        diffMin : Math.floor((diff % (1000*60*60))/(1000*60)),
        diffSec : Math.floor((diff % (1000*60))/1000),
    });
}

export function getCurrTime(UTC) {
    const gmtdate = new Date();
    const utc = gmtdate.getTime() + (gmtdate.getTimezoneOffset() * 60 * 1000);
    const TIME_DIFF = UTC * 60 * 60 * 1000;
    const curr_time = new Date(utc + TIME_DIFF);
    return(curr_time);
};

export function getKRTime() {
    return getCurrTime(+9);         // 한국 서울은 UTC +9
}

export function getLATime() {
    return getCurrTime(-7);         // 미국 LA는 UTC -7
}