const recordService = require('../../../services/record')

const getRecordIpByHost = (req, res, next) => {
    const { host } = req.body

    if (!host) return res.status(400).json({ message: 'host obrigatorio' })

    recordService.getRecordIpByHost(host)
        .then((ip) => res.json({ data: ip }))
        .catch((err) => next(err))
}

const putRecordIpByHost = (req, res, next) => {
    const { host } = req.body

    if (!host) return res.status(400).json({ message: 'host obrigatorio' })

    recordService.putRecordIpByHost(host)
        .then((ip) => res.json({ data: ip }))
        .catch((err) => next(err))
}

module.exports = {
    getRecordIpByHost,
    putRecordIpByHost
}