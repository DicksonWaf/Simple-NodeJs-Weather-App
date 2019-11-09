const request = require('request')
//command line argument for the location 
const address = process.argv[2]+" "+process.argv[3]

    
// This function takes in a address and callback function as arguments. It fetches the latitude and longitude of
//the address using the mapbox api.
const geocode = (address, callback) =>{
    const url2 ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZG5ha2hvbmUyMiIsImEiOiJjazJsaWF1emYwN2Y3M25xeGpsdGVqaTB6In0.FF84ObXesU2LNY6d-lFtCw'
    request({url:url2, json:true},(error,response) => {
        if(error){
            callback('Cannot connect to service', undefined)
        }
        else if(response.body.features.length==0){
            callback('Location not found. Try a different search')

        }
        else{
            callback(undefined,{latitude:response.body.features[0].center[1], longitude:response.body.features[0].center[0], location: response.body.features[0].place_name})
        }
    } )
}

// need to handle errors
// Takes latitude and longitude and returns weather forecast. Utlizes darksky API.
const getForecast = (latitude, longitude, location)=>{
    const url = 'https://api.darksky.net/forecast/4455a57ad90b317782034647b6ae8345/'+latitude+','+longitude+'?units=si'
    request({url:url, json:true}, (error,response)=>{
        if(error){
            console.log('Cannot connect to service')
        }else{        
            console.log('The temperature in '+location+' is currently:'+response.body.currently.temperature+' degrees celcius')
            console.log('The humidity is currently:'+response.body.currently.humidity)
            console.log('The overall weather summary is:'+response.body.currently.summary)

        }
    })
  }
  //given a location this function prints the weather forecast to the console.
  geocode(address, (error, response)=>{
    console.log(error)
    getForecast(response.latitude, response.longitude, response.location)
})