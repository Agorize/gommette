---
inject: true
append: true
to: "src/components/index.js"
---
export { default as <%= needFolderName ? componentName : folderName %> } from './<%= needFolderName ? componentName : folderName %>/<%= componentName %>.vue'
