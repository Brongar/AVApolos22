const axios = require('axios')
const config = require('../config')

const getHostRecordIP = (host) => new Promise((resolve, reject) => {
    const options = {
        method: 'GET',
        url: `${config.ddns.godaddy.url}/v1/domains/${config.ddns.domain}/records/A/${host}`,
        headers: {
            'Authorization': `sso-key ${config.ddns.godaddy.key}:${config.ddns.godaddy.secret}`
        }
    }
    axios(options)
        .then((response) => resolve(response.data[0].data))
        .catch((err) => reject(err))
})

const putHostRecordIP = (host, ip) => new Promise((resolve, reject) => {
    const options = {
        method: 'PUT',
        url: `${config.ddns.godaddy.url}/v1/domains/${config.ddns.domain}/records/A/${host}`,
        headers: {
            'Authorization': `sso-key ${config.ddns.godaddy.key}:${config.ddns.godaddy.secret}`
        },
        data: [{ data: ip }]
    }
    axios(options)
        .then(() => resolve())
        .catch((err) => reject(err.data))
})

module.exports = {
    getHostRecordIP,
    putHostRecordIP,
}