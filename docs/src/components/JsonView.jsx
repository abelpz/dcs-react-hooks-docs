import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function JsonView({src}) {
  return (
    <BrowserOnly>
      {() => {
        const ReactJson = require('react-json-view').default;
        return <ReactJson
          style={{ maxHeight: '500px', overflow: 'scroll', whiteSpace: 'pre' }}
          src={src}
          theme="monokai"
        />;
      }}
    </BrowserOnly>
  )
}
