const child_process = require('child_process');
const path = require('node:path');
const glob = require('glob');

const fetchFiles = (docs) => docs.reduce((files, doc) => {
  const fileName = doc.meta?.filename.split('.')[0].toLowerCase();
  if (!fileName) return files;
  if (["function","constant"].includes(doc.kind) &&  doc.scope === 'global' && /^use[A-Z]/.test(doc.name)) doc.kind = 'react-hook';
  if (!files[fileName]) files[fileName] = {};

  if (doc.undocumented) {
    if (files[fileName].extras) {
      files[fileName].extras.push(doc);
    }
    else {
      files[fileName].extras = [doc]
    }
    return files
  };

  const target = doc.kind === "typedef" ? "types" : "data";
  if (files[fileName][target]) {
    files[fileName][target].push(doc);
  }
  else {
    files[fileName][target] = [doc];
  }
  return files;
}, {})

const fetchElements = (docs) => docs.reduce((elements, doc) => {
  if (!doc.comment) return elements;
  const { functions, types } = elements;

  const docPath = path.resolve(doc.meta.path, doc.meta.filename);

  if (doc.kind == 'typedef') {
    if (types[doc.name])
      console.warn("\u001B[93m", `Duplicated typedef '${doc.name}'\n  in '${types[doc.name].path}'\n  and '${docPath}'.\n skipping...`, "\u001B[0m");
    types[doc.name] ??= { data: doc, path: docPath };
    return { functions, types };
  }

  const isMember = !!doc.memberof;
  const name = isMember ? doc.memberof.split("~")[0] : doc.name;

  if (isMember) {
    functions[name]?.members?.push(doc);
    return { functions, types };
  }

  functions[name] ??= { data: null, members: [], path: docPath };

  if (functions[name].data)
    console.warn("\u001B[93m", `Duplicated '${doc.name}'\n  in '${functions[name].path}'\n  and '${docPath}'.\n skipping...`, "\u001B[0m");

  if (["function", "constant"].includes(doc.kind) && /^use[A-Z]/.test(doc.name)) doc.kind = 'react-hook';

  functions[name].data ??= doc;

  return {functions,types};
},{functions: {},types: {}})

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
      console.log("\u001B[4m","Generating jsdocs", "\u001B[0m");

      const files = Array.isArray(src)
        ? src.reduce((files, src) => files.concat(glob.sync(src)), [])
        : glob.sync(src);
      
      const docs = files.reduce((docs, file) => docs.concat(JSON.parse(child_process.execSync(`jsdoc -X -r ${file}`, { encoding: 'utf8' }))), [])
      

      return { jsdoc: fetchElements(docs) }
    },
    async contentLoaded({ content, actions }) {
      const { createData } = actions;
      const { jsdoc } = content;
      const docusaurusData = await createData('dataJson.json',JSON.stringify(jsdoc));
      // setGlobalData({ docs:jsdoc });
      console.log("\u001B[32m", "✔ Package docs generated", "\u001B[0m");
    }
  }
}