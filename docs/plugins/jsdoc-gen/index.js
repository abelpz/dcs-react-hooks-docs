const child_process = require('child_process');
const path = require('node:path');
const glob = require('glob');
const jsdoc2md = require('jsdoc-to-markdown')

module.exports = function (context, options) {
  const { src } = options;
  return {
    name: "docusaurus-plugin-jsdoc-gen",
    getPathsToWatch() {
      const contentPath = path.resolve(context.siteDir, 'plugins/**/*.{ts,js}');
      const srcPaths = Array.isArray(src) ? src.map(src => path.resolve(src)) : [path.resolve(src)];
      return [`${contentPath}`].concat(srcPaths);
    },
    async loadContent() {
      console.log("Generating jsdocs");

      const files = Array.isArray(src)
        ? src.reduce((files, src) => files.concat(glob.sync(src)), [])
        : glob.sync(src);
      
      console.log({ files });
      
      const jsdoc = files
        .reduce((docs, file) => docs.concat(JSON.parse(child_process.execSync(`jsdoc -X -r ${file}`, { encoding: 'utf8' }))), [])
        .reduce((functions, entry) => {
          if (!entry.comment) return functions;

          const nameArray = entry.longname.split('.');

          if (nameArray.includes('propTypes') || (nameArray.length === 1 && entry.kind === 'member')) return functions;

          if (nameArray.length === 1 && /^use[A-Z]/.test(nameArray[0])) entry.kind = 'react-hook';

          entry.id = entry.longname;
          const name = nameArray[0].toLowerCase();
          const md = jsdoc2md.renderSync({
            data: [entry],
            template: `{{#orphans ~}}{{>body~}}{{>member-index~}}{{>separator~}}{{>members~}}{{/orphans~}}`,
            "param-list-format": "table"
          });

          if (Array.isArray(functions[name]?.data)) {
            functions[name].data.push(entry);
          }
          else {
            functions[name] = {data: [entry]};
          }

          functions[name].md = md;

          return functions;
        }, {})
      
      return { jsdoc }
    },
    async contentLoaded({ content, actions }) {
      const { setGlobalData } = actions;
      const { jsdoc } = content;
      setGlobalData({ docs:jsdoc });
      console.log("\u001B[32m", "✔ Package docs generated", "\u001B[0m");
    }
  }
}