import React, { useEffect, useRef, useState } from 'react';
import Heading from '@theme/Heading';
import { usePluginData } from '@docusaurus/useGlobalData';
import { marked } from 'marked';
import Admonition from '@theme/Admonition';
import JsonView from '@site/src/components/JsonView';

export default function MDXHeading(props) {
  const ref = useRef(null);
  const [isApi, setIsApi] = useState(false);
  const jsdData = usePluginData('docusaurus-plugin-jsdoc-gen');
  const rdgData = usePluginData('docusaurus-plugin-react-docgen');
  const rdgApi = rdgData[props.id];
  
  useEffect(() => {
    const md = jsdData.docs[props.id]?.md;
    const apiHtml = md && marked.parse(md);
    if(apiHtml) setIsApi(true);
    if (isApi) {
      ref.current.innerHTML = apiHtml;
    }
  },[isApi]);

  return (
    <>
      <Heading {...props} />
      {isApi &&
        <>
        <Admonition title={"API"} type={"info"}>
          <div ref={ref}></div>
        </Admonition>
        {/* <br /> */}
        </>
      }
      {rdgApi &&
        <Admonition title={"API"} type={"info"}>
          <JsonView src={rdgApi}></JsonView>
        </Admonition>
      }
    </>
  );
}
