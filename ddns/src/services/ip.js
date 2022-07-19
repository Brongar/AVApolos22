const axios = require('axios')
const config = require('../config')
const { logger } = require('../logger')
const Promise = require('bluebird')

const getIpFromProvider = (provider) => new Promise((resolve, reject) => {
    const options = {
        method: 'GET',
        url: provider.url
    }
    axios(options)
        .then((response) => resolve(response.data[provider.ipKey]))
        .catch((err) => reject(err))
})

const getWanIp = () => new Promise((resolve, reject) => {
    const providers = config.ip.apis

    logger.debug(`external ip providers: ${JSON.stringify(providers)}`)

    let promises = []

    for (provider of providers) {
        promises.push(getIpFromProvider(provider))
    }

    Promise.any(promises)
        .then((ip) => resolve(ip))
        .catch((err) => logger.error(err))

})

module.exports = {
    getWanIp,
}
