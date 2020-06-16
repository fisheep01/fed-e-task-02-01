const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  prompting() {
    return this.prompt([{
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname // 项目生成目录名称
      }])
      .then(answers => {
        this.answers = answers
      })
  }
  writing() {
    // Yeoman 自动在生成文件阶段调用
    // this.fs.write(
    //     this.destinationPath('temp.txt'),
    //     Math.random().toString()
    // )

    // const tmpl = this.templatePath('foo.txt')
    // const output = this.destinationPath('foo.txt')
    // const context = {
    //     title: 'Hello world~',
    //     success: false
    // }

    const tmpl = this.templatePath('bar.html')
    const output = this.destinationPath('bar.html')
    const context = Object.assign({
      title: 'Hello world~',
      success: false
    }, this.answers)
    this.fs.copyTpl(tmpl, output, context)
  }
}