const ddnsService = require('../services/ddns')
const ipService = require('../services/ip')

const getRecordIpByHost = (host) => ddnsService.getHostRecordIP(host)
const putRecordIpByHost = (host) => new Promise((resolve, reject) => {
    ipService.getWanIp()
        .then((ip) => {
            ddnsService.putHostRecordIP(host, ip)
                .then(() => resolve())
                .catch((err) => reject(err))
        })
        .catch((err) => reject(err))
})

module.exports = {
    getRecordIpByHost,
    putRecordIpByHost
}