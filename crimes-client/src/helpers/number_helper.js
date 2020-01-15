function thousand_separator(input) {
    return parseFloat(input).toLocaleString('english');
}



// alert(calculateDistanceBetweenTwoCoordinates(59.3293371,13.4877472,59.3225525,13.4619422).toFixed(1));
    //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
    function calculateDistanceBetweenTwoCoordinates(lat1, lon1, lat2, lon2) 
    {
        
      var R = 6371; // km
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      var lat1 = toRad(lat1);
      var lat2 = toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      console.log("from calculate",d,lat1,lat2,lon1,lon2)
      return d;
    }

    // Converts numeric degrees to radians
    function toRad(Value) 
    {
        return Value * Math.PI / 180;
    }


module.exports={
    thousand_separator,
    calculateDistanceBetweenTwoCoordinates
}