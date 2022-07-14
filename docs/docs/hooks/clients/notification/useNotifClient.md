# useNotifClient

## Example

> **Tip:** Change the code to get different results.

```js
import React, { useEffect, useState } from 'react';
import { useNotifClient } from 'dcs-react-hooks';
import ReactJson from 'react-json-view';

function Component(){
    const notifClient = useNotifClient({ basePath: "https://qa.door43.org/api/v1/" });
    
    console.log(notifClient);
    
    const [notifications, setNotifications] = useState({});
    
    useEffect(async () => {
      setNotifications(await notifClient.notifyGetRepoList('unfoldingWord', 'en_ta').then(({ data }) => data))
    },[])
    
    return (
      <JsonView src={notifications} />
    );
}

<Component />
```
