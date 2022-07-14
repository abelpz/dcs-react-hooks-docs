### Example:

The following *JSON* is the result of the code found below.

> **Tip:** Change the code to get different results.

```js
import React, { useEffect, useState } from 'react';
import { useUserClient } from 'dcs-react-hooks';
import ReactJson from 'react-json-view';

function Component(){
    const userClient = useUserClient({basePath: "https://qa.door43.org/api/v1/"});
    console.log(userClient);

    const [user, setUser] = useState({});

    useEffect(async () => {
       setUser(await userClient.userGet("unfoldingWord"))
    },[])

    return (
      <JsonView src={user} />
    );
}

<Component />
```

### Authenticated request

```js
import React, { useEffect, useState } from 'react';
import { useUserClient } from 'dcs-react-hooks';
import ReactJson from 'react-json-view';

function Component(){
  const [user, setUser] = useState({});
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const userClient = useUserClient({basePath: "https://qa.door43.org/api/v1/", username, password});
  console.log(userClient);

  useEffect(async () => {
      if(username && password){
        setUser(await userClient.userGetTokens(username))
      }
  },[username,password])

  return (
    <>
      <label htmlFor="username">Username:</label>
      <input type="text" name="username" onBlur={(e) => setUsername(e.target.value)}/>
      <label htmlFor="password">Password:</label>
      <input type="password" name="password" onBlur={(e) => setPassword(e.target.value)}/>
      <hr/>
      <JsonView src={user} />
    </>
  );
}

<Component />
```
