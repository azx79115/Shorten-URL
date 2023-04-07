function generateShortCode() {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let shortCode = ''
  for (let i = 0; i < 5; i++) {
    const index = Math.floor(Math.random() * characters.length)
    shortCode += characters[index]
  }
  return shortCode
}

module.exports = generateShortCode