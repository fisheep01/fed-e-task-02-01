const fs = require('fs')

exports.callback = done => {
  console.log('callback task~')
  done()
}

exports.callback_error = done => {
  console.log('callback_error task~')
  done(new Error('task failed!'))
}

exports.promise = () => {
  console.log('promise task~')
  return Promise.resolve()
}

exports.promise_error = () => {
  console.log('promise_error task~')
  return Promise.reject(new Error('task failed!'))
}

const timeout = time => {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

exports.async = async () => {
  await timeout(1000)
  console.log('async task')
}

// exports.stream = () => {
//   const readStream = fs.createReadStream('package.json')
//   const writeSteam = fs.createWriteStream('temp.txt')
//   readStream.pipe(writeSteam)
//   return readStream
// }

exports.stream = done => {
  const readStream = fs.createReadStream('package.json')
  const writeSteam = fs.createWriteStream('temp.txt')
  readStream.pipe(writeSteam)
  readStream.on('end', () => {
    done()
  })
}