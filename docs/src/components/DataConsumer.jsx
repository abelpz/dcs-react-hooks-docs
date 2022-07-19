import React from 'react'

const getData = () => {
  try {
    const fileName = "dataJson";
    const data = require(`../../.docusaurus/docusaurus-plugin-jsdoc-gen/default/${fileName}.json`);
    return data;
  } catch (error) {
    return null;
  }
}

export default function DataConsumer(props) {
  const data = getData();
  console.log(data);
  return (
    <pre><code>{JSON.stringify(data,undefined,2)}</code></pre>
  )
}
