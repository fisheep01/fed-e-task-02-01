// Grunt入口文件
// 用于定义一些需要 Grunt 自动执行的任务
// 需要导出一个函数
// 此函数接受一个 grunt的新参，内部提供一些创建任务时可以到的API

module.exports = grunt => {
  grunt.registerTask('foo', () => {
    console.log('hello grunt~~')
  })

  grunt.registerTask('bar', '任务描述', () => {
    console.log('other task~')
  })

  // default是默认任务，不传任务名时默认启用
  // 第二个参数传入数组，会依次调用
  grunt.registerTask('default', ['foo', 'bar'])

  // 无法工作，异步任务需要基于this.async()
  // grunt.registerTask('async-task', () => {
  //     setTimeout(() => {
  //         console.log('async-task working~')
  //     }, 1000)
  // })

  grunt.registerTask('async-task', function () {
    const done = this.async()
    setTimeout(() => {
      console.log('async-task working~')
      done()
    }, 1000)
  })

  // 标记任务失败使用return false
  // 会阻塞后续任务，但可以通过 --force 强制继续执行
  grunt.registerTask('bad', () => {
    console.log('bad working~')
    return false
  })

  // 异步任务标记失败通过this.async()传入false
  grunt.registerTask('async-badtask', function () {
    const done = this.async()
    setTimeout(() => {
      console.log('bad async')
      done(false)
    }, 1000)
  })
}