/// <reference path="../lib/underscore-min.js" />
/// <reference path="classes.js" />
var WAMF = {
    map: null,
    infowindow: null
};

function addMarkerToMap(map, markerBounds, friendsGroupedByLocation) {
    var location = friendsGroupedByLocation[0].location;
    var friends = friendsGroupedByLocation;
    var locationGroup = new LocationGroup(location, friends);
    _.each(friends, function (friend) {
        friend.lastCheckedIn = getLastCheckedInText(new Date(friend.checkinDate));
    });

    var myLatLng = new google.maps.LatLng(location.latitude, location.longitude);

    var markerImg = 'img/map-marker-1.png';
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: WAMF.map,
        title: 'Click for details',
        icon: markerImg
    });

    markerBounds.extend(myLatLng);

    var template = $('#mapMarkerTemplate').html();
    var tmpl = _.template(template);
    var filledTemplate = tmpl({ locationGroup: locationGroup });

    google.maps.event.addListener(marker, 'click', function () {
        WAMF.infowindow.setContent(filledTemplate);
        WAMF.infowindow.open(WAMF.map, marker);
    });
}

function addFriendsToMap(map, markerBounds, friends) {
    var friendsGroupedByLocations = getGroupedLocations(friends);
    _.each(friendsGroupedByLocations, function (friendsGroupedByLocation) {
        addMarkerToMap(WAMF.map, markerBounds, friendsGroupedByLocation);
    }, this);
}

function initializeMap() {
    //var date = new Date();
    //alert(date.toISOString());
    var location1 = new Location(45, 45, 'google.com', 'Barul de la colt');
    var location2 = new Location(40, 35, 'google.com', 'Barul de la colt');

    var friend1 = new Friend('http://www.oh-sophia.net/wp-content/uploads/2013/08/person_ohsophie.png', 'Amicu', 'http://google.com', location1, '2014-03-01T19:00:00');
    var friend2 = new Friend('http://www.oh-sophia.net/wp-content/uploads/2013/08/person_ohsophie.png', 'Colega', 'http://facebook.com', location1, '2014-03-01T19:00:00');
    var friend3 = new Friend('http://www.oh-sophia.net/wp-content/uploads/2013/08/person_ohsophie.png', 'Colega2', 'http://facebook.com', location2, '2014-03-01T19:00:00');
    var friends = [friend1, friend2, friend3];

    var markerBounds = new google.maps.LatLngBounds();
    var mapOptions = {
        zoom: 4
    };

    WAMF.map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    WAMF.infowindow = new google.maps.InfoWindow({
    });

    addFriendsToMap(WAMF.map, markerBounds, friends);

    WAMF.map.fitBounds(markerBounds);
}

google.maps.event.addDomListener(window, 'load', initializeMap);
