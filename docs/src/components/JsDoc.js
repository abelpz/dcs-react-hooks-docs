import React, { useEffect, useRef, useState } from 'react';
import { usePluginData } from '@docusaurus/useGlobalData';
import { marked } from 'marked';
import Admonition from '@theme/Admonition';

export default function JsDoc({ props }) {
  const ref = useRef(null);
  const [isApi, setIsApi] = useState(false);
  const jsdData = usePluginData('docusaurus-plugin-jsdoc-gen');

  useEffect(() => {
    const md = jsdData.docs[props.id]?.md;
    const apiHtml = md && marked.parse(md);
    if(apiHtml) setIsApi(true);
    if (isApi) {
      ref.current.innerHTML = apiHtml;
    }
  },[isApi]);

  return !isApi ? <></> :
    <>
      <Admonition title={"API"} type={"info"}>
        <div ref={ref}></div>
      </Admonition>
    </>
    
}
