const request = require('request')

const forecast = (lat, lon , callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fb90b7f097f311380cfb3b0d0d4725ac&query='+lat+','+lon

    request({url,json:true},(error,{body})=>{
        if(error) {
            callback('Not able to connect to weather service',undefined)
        } else if(body.error) {
            callback('Didn´t find results matching with query lat lon',400)
        }
        else{
            callback(undefined,{
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike:   body.current.feelslike
            })
        }
    })
}

module.exports = forecast

