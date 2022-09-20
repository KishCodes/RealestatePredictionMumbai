function getGymValue() {
  var uiCheck = document.getElementById("uiGym")
  var i = 0;
  if(uiCheck.checked == true){
    i = 1;
    return parseInt(i);
  }
  return parseInt(i);
}

function getLiftValue() {
  var uiCheck = document.getElementById("uiLift")
  var i = 0;
  if(uiCheck.checked == true){
    i = 1;
    return parseInt(i);
  }
  return parseInt(i);
}

function getParkingValue() {
  var uiCheck = document.getElementById("uiParking")
  var i = 0;
  if(uiCheck.checked == true){
    i = 1;
    return parseInt(i);
  }
  return parseInt(i);
}
function getClubValue() {
  var uiCheck = document.getElementById("uiClub")
  var i = 0;
  if(uiCheck.checked == true){
    i = 1;
    return parseInt(i);
  }
  return parseInt(i);
}
function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for(var i in uiBHK) {
    if(uiBHK[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");
  var sqft = document.getElementById("uiSqft");
  var bhk = getBHKValue();
  var gym = getGymValue();
  var lift = getLiftValue();
  var parking = getParkingValue();
  var clubhouse = getClubValue();
  var location = document.getElementById("uiLocations");
  var estPrice = document.getElementById("uiEstimatedPrice");

  var url = "http://127.0.0.1:5000/predict_home_price"; //Use this if you are NOT using nginx which is first 7 tutorials
  //var url = "/api/predict_home_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards

  $.post(url, {
      sqft_area: parseFloat(sqft.value),
      bhk: bhk,
      gym: gym,
      lift: lift,
      parking: parking,
      clubhouse: clubhouse,
      location: location.value
  },function(data, status) {
      console.log(data.estimated_price);
      estPrice.innerHTML = "<h2> Rs " + data.estimated_price.toString() + " Lakh</h2>";
      console.log(status);
  });
}

function onPageLoad() {
  console.log( "document loaded" );
  var url = "http://127.0.0.1:5000/get_location_names"; // Use this if you are NOT using nginx which is first 7 tutorials
  //var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
  $.get(url,function(data, status) {
      console.log("got response for get_location_names request");
      if(data) {
          var locations = data.locations;
          var uiLocations = document.getElementById("uiLocations");
          $('#uiLocations').empty();
          for(var i in locations) {
              var opt = new Option(locations[i]);
              $('#uiLocations').append(opt);
          }
      }
  });
}

window.onload = onPageLoad;