
const { Config } = require('ranvier')
require('dotenv').config()

module.exports = {
  listeners: {
    startup: state => function (commander) {
      const webhooks = Config.get('webhooks')

      if (webhooks.github) {
        const { port, url, branch, command, path } = webhooks.github
        const secret = process.env.GITHUB_WEBHOOK_SECRET

        const http = require('http')
        const crypto = require('crypto')
        const exec = require('child_process').exec

        http
          .createServer(function (req, res) {
            req.on('data', function (chunk) {
              const sig = `sha1=${crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex')}`

              if (req.headers['x-hub-signature'] === sig) {
                const hookRef = JSON.parse(chunk).ref

                if (hookRef === `refs/heads/${branch}`) {
                  const proc = exec(
                    `cd ${path} && touch sanity-check.xml && git pull ${url} && npm install --unsafe-perm && ${command}`
                  )

                  proc.stdout.on('data', function (data) {
                    console.log(data)
                  })
                }
              }
            })

            res.end()
          })
          .listen(port)
      }
    }
  }
}
