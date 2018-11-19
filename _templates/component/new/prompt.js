const fs = require('fs')
const path = require('path')

module.exports = [
  {
    type: 'confirm',
    name: 'needFolderName',
    message: "Do you create a component in new folder?"
  },
  {
    type: 'input',
    name: 'folderName',
    message: "Please specify a folder name for your new component:",
    when: function (answers) {
      return !answers.needFolderName
    },
    validate: function (input) {
      const done = this.async()
      const directoriesList = fs.readdirSync(path.resolve('src/components'))

      if (directoriesList.includes(`${input}`)) {
        done(null, true)
      } else {
        done(`Are you sure the folder "${input}" already exist?`)
      }
    }
  },
  {
    type: 'input',
    name: 'componentName',
    message: 'Please specify your component name (the component name will be prefixed by "Go", the name should be in PascalCase):',
    suffix: '  Go',
    validate: function (input) {
      const done = this.async()

      if (input.charAt(2) === input.charAt(2).toUpperCase()) {
        done(null, true)
      } else {
        done('You need to provide a component name in PascalCase')
      }
    },
    filter: function (componentName) {
      return `Go${componentName}`
    }
  }
]
