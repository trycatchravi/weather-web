const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicmF2aWJhaW5zIiwiYSI6ImNrc3FoZ3I5NTBjeHcycG5xN3c2cTRoN2YifQ.2aM3kzYvKcXvIv3doXpJyw'

    request({url,json:true},(error,{body})=>{
        if(error) {
            callback('Not able to connect to mapbox service',undefined)
        } else if(body.features.length === 0) {
            callback('Didn´t find lat lon matching with query',undefined)
        }
        else{
            callback(undefined,{
                lat: body.features[0].geometry.coordinates[0],
                lon: body.features[0].geometry.coordinates[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode

