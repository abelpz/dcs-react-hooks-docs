### Example:

The following *JSON* is the result of the code found below.

> **Tip:** Change the code to get different results.

```js
import React, { useEffect, useState } from 'react';
import { useRepoClient } from 'dcs-react-hooks';
import ReactJson from 'react-json-view';

function Component(){
    const repoClient = useRepoClient({ basePath: "https://qa.door43.org/api/v1/" });
    
    console.log(repoClient);
    
    const [repository, setRepository] = useState({});
    
    useEffect(async () => {
      setRepository(await repoClient.repoGet('Es-419_gl', 'es-419_tn').then(({ data }) => data))
    },[])
    
    return (
      <JsonView src={repository} />
    );
}

<Component />
```
