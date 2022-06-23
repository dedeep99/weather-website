const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=9a157b03a9880bc6e23030213eb8d0c1&query=${latitude},${longitude}`
    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback("Unable to connect to the weather service. Try again later.", undefined)
        } else if (body.error){
            callback("Unable to find location", undefined)
        } else {
            callback(undefined, body.current)
        }
    })
}

module.exports = forecast