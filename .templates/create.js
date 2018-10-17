const inquirer = require('inquirer')
// const fs = require('fs')
const fs = require('fs-extra')
const _ = require('lodash')

inquirer
  .prompt([
    {
      type: 'list' ,
      name: 'createType',
      choices: [
        { name: 'Component', value: 'components' },
        { name: 'Directive', value: 'directive' }
      ]
    },
    {
      type: 'input',
      name: 'itemName',
      message: 'Item name (Should be in PascalCase)'
    }
  ])
  .then(answers => {
    console.log(answers)

    const files = fs.readdirSync(`${__dirname}/${answers.createType}`)
    files.forEach(file => {
      file = fs.readFileSync(`${__dirname}/${answers.createType}/${file}`, 'utf8')
      file = _.template(file, answers)
      fs.outputFile(`./${answers.createType}/${answers.itemName}`, file, 'utf8')
    })
  })
