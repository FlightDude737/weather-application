const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/95be7d68271754c9d35040a83e835c9e/' + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude)
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback("Please check your connection.", undefined)
        } else if (body.error) {
            callback("Unable to process location.", undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees with a ' + body.currently.precipProbability + ' chance of rain.')
        }
    })
}

module.exports = forecast