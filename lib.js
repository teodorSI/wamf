var userToken = 'access_token=CAACEdEose0cBAKgKqQvml4YKFB4Sr2lvjSvAGGidAvI2ezp8HHZBEgY2b2CJtTZB5xx5nZAkmY9tdMF114EMEHzAT0qYJaUvp6SEV1wDZBGe405GUCTfJ8nJD1ZBlnLOyR7IsC9M19t8wHAE0IoLthcmjj7uvoHVH07oJiTdEx9IQmZCqQ47bZCEB31bSwXBZCsZD';
var f = {

    checkins : [],
    url : {
        me : 'https://graph.facebook.com/me?' + userToken,
        checkins : 'https://graph.facebook.com/me/friends?fields=checkins.limit(1),picture.type(large)&format=json&offset=0&' + userToken,
        user : 'https://graph.facebook.com/',
        main : 'https://graph.facebook.com/'
    },
    getCheckins : function(callback){
        var ajaxRequestCount = 0;
        var getQueue = function(queueUrl){
            ajaxRequestCount++;
            $.get(queueUrl, function(r){
                ajaxRequestCount--;
                $.merge(f.checkins, r.data);
                if(
                    (r.paging !== undefined) &&
                    (r.paging.next !== undefined)
                )
                {
                    getQueue(r.paging.next);
                }
                if(ajaxRequestCount==0){
                    f.initMap(callback);
                }
            });
        };
        getQueue(f.url.checkins);
    },
    initMap : function(callback){
        var users = [];
        $.each(f.checkins, function(i, v){
            if(v.checkins !== undefined){
                var latitude = v.checkins.data[0].place.location.latitude;
                var longitude = v.checkins.data[0].place.location.longitude;
                var picture = v.picture.data.url;
                var name = v.checkins.data[0].from.name;
                var friendUrl = f.url.user + v.checkins.data[0].from.id;
                var locationUrl = f.url.main + v.checkins.data[0].place.id;
                var locationName = v.checkins.data[0].place.name;
                var checkinDate = v.checkins.data[0].created_time;
                var user = new  Friend(latitude, longitude, picture, name, friendUrl, locationUrl, locationName, checkinDate);
                users.push(user);
            }
        });
        callback(users);
    }
};

var map = {
    init : function(users){
        console.log(users);
        console.log('INITTTTTTTTTT MAPPPP');
    }
}

function Friend(lat, long, photo, name, friendUrl, locationUrl, locationName, checkinDate){ this.latitude = lat; this.longitude = long; this.photoUrl = photo; this.name = name; this.friendUrl = friendUrl; this.locationUrl = locationUrl; this.locationName = locationName; this.checkinDate = checkinDate; }
