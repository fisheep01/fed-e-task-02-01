module.exports = grunt => {
    grunt.initConfig({
        foo: {
            bar: 123
        },
        build: {
            options: {
                foo: 'bar'
            },
            css: 'a',
            js: '2'
        }
    })

    grunt.registerTask('foo', () => {
        console.log(grunt.config('foo.bar'))
    })

    // 多目标任务,可以理解为把一个任务拆解成多个子任务
    // 可以通过taskName:子任务名来指定执行特定子任务
    // options属性不会被当做子任务，而是作为配置项通过this.options()获取
    // options可以在子任务中被重复定义覆盖
    grunt.registerMultiTask('build', function () {
        console.log(this.options())
        console.log(`target: ${this.target},data: ${this.data}`)
    })
}