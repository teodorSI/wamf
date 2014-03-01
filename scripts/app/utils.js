/// <reference path="classes.js" />
function getGroupedLocations(friends) {
    return _.groupBy(friends, function (friend) { return friend.location.latitude + '\x00' + friend.location.longitude; });
}

function getLastCheckedInText(lastCheckinDate) {
    var date = new Date();
    var dateDiffInMinutes = dateDiff(date, lastCheckinDate);//.toISOString();
    var dateDifference = Math.floor(dateDiffInMinutes / 1440);
    var period = 'days';
    if (dateDifference == 0) {
        dateDifference = Math.floor(dateDiffInMinutes / 24);
        period = 'hours';
        if (dateDifference == 0) {
            dateDifference = dateDiffInMinutes;
            period = 'minutes';
        }
    }

    return dateDifference + ' ' + period + ' ago';
}

function dateDiff(a, b) {
    var utc1 = new Date(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate(), a.getUTCHours(), a.getUTCMinutes(), a.getUTCSeconds());
    var utc2 = new Date(b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate(), b.getUTCHours(), b.getUTCMinutes(), b.getUTCSeconds());

    return Math.floor((utc1 - utc2) / 60000);// / 1440);
}