function Friend(photo, name, friendUrl, location, checkinDate){
    this.location = location;
    this.photoUrl = photo;
    this.name = name;
    this.friendUrl = friendUrl;
    this.checkinDate = checkinDate;
    //this.lastCheckedIn =
}

function LocationGroup(location, friends) {
    this.friends = friends;
    this.location = location;
}

function Location(lat, long, locationUrl, locationName) {
    this.latitude = lat;
    this.longitude = long;
    this.locationUrl = locationUrl;
    this.locationName = locationName;
}