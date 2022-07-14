# useOrgClient

```js
import React, { useEffect, useState } from 'react';
import { useOrgClient } from 'dcs-react-hooks';
import ReactJson from 'react-json-view';

function Component(){
    const orgClient = useOrgClient({ basePath: "https://qa.door43.org/api/v1/" });
    console.log("orgClient:", orgClient)
    const [org, setOrg] = useState({});
    useEffect(async () => {
      setOrg(await orgClient.orgGet('unfoldingword').then(({ data }) => data))
    },[])
    return (
      <>
        <JsonView src={org} />
      </>
    );
}

<Component />
```
