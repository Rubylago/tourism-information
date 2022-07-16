const fs = require('fs')
const { ImgurClient } = require('imgur')

const client = new ImgurClient({
  clientId: process.env.IMGUR_CLIENT_ID,
  clientSecret: process.env.IMGUR_CLIENT_SECRET,
  refreshToken: process.env.IMGUR_REFRESH_TOKEN
})

const imgurFileHandler = file => {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null)
    return client.upload({
      image: fs.createReadStream(file.path),
      type: 'stream',
      album: process.env.IMGUR_ALBUM_ID
    }).then(img => {
      resolve(img ? img.data.link : null)
    })
      .catch(err => reject(err))
  })
}
module.exports = {
  imgurFileHandler
}
