import React, { useEffect, useRef, useState } from 'react';
import { usePluginData } from '@docusaurus/useGlobalData';
import Admonition from '@theme/Admonition';
import JsonView from '@site/src/components/JsonView';

export default function ReactDocGen({ props }) {
  const ref = useRef(null);
  const [isApi, setIsApi] = useState(false);
  const rdgData = usePluginData('docusaurus-plugin-react-docgen');

  console.log(props);

  // useEffect(() => {
  //   const data = rdgData[props.id];
  //   if(data) setIsApi(true);
  //   if (isApi) {
  //     ref.current.data = data;
  //   }
  // },[isApi]);

  return !isApi ? <></> :
    <>
      <Admonition title={"API"} type={"info"}>
        <JsonView src={ref.current.data}></JsonView>
      </Admonition>
    </>
    
}
