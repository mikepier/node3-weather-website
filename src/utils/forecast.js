const request = require('request')

const forecast = ({latitude, longitude}, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d0a7f8f3a0a9885ae9015b9fe1c38ca7&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '.json?&limit=1'

    request({url, json: true }, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather services!', undefined)
        } else if(body.error) {
            callback('Incorrect coordinates', undefined)
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                humidity: body.current.humidity,
                cloudcover: body.current.cloudcover
            })
        }
    })

}

// geocode('Warsaw', (error, data) => {
//     if(error) {
//         console.log('Error: ' + error)
//     } else {
//         console.log(data)
//     }
// })



module.exports = forecast