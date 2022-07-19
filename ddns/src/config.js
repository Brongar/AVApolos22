module.exports = {
    ip: {
        apis: [
            {
                name: 'ipfy',
                url: 'https://api.ipify.org?format=json',
                ipKey: 'ip',
            },
            {
                name: 'ip-api',
                url: 'http://ip-api.com/json',
                ipKey: 'query',
            },
            {
                name: 'meuip',
                url: 'https://meuip.herokuapp.com/api/json',
                ipKey: 'ip',
            }
        ]
    },
    server: {
        port: process.env.PORT || 5000,
    },
    ddns: {
        domain: process.env.DOMAIN || 'avapolos.com',
        godaddy: {
            key: process.env.GODADDY_API_KEY || 'eogpANAQRbkX_4BxbZenq2bsS3fgSD56sAH',
            secret: process.env.GODADDY_API_SECRET || '3QRCJbQVGwGkKfPcwQKNNA',
            url: 'https://api.godaddy.com'
        }
    }
}