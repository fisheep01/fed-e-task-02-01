// 入口文件

exports.foo = done => {
  console.log('foo task working')
  done()
}

// 默认任务
exports.default = done => {
  console.log('default task working')
  done()
}

const {
  series,
  parallel
} = require('gulp')

const task1 = done => {
  setTimeout(() => {
    console.log('task1 working~')
    done()
  }, 1000)
}

const task2 = done => {
  setTimeout(() => {
    console.log('task2 working~')
    done()
  }, 1000)
}

const task3 = done => {
  setTimeout(() => {
    console.log('task3 working~')
    done()
  }, 1000)
}

exports.s = series(task1, task2, task3)
exports.p = parallel(task1, task2, task3)