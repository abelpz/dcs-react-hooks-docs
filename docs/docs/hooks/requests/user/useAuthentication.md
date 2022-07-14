### Example:

The following *JSON* is the result of the code found below.

> **Tip:** Change the code to get different results.

```js
import React, { useEffect, useState } from 'react';
import { useAuthentication } from 'dcs-react-hooks';
import ReactJson from 'react-json-view';

function Component(){
  const [user, setUser] = useState({});
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const tokenName = "dcs-react-hooks-playground"

  const {state,actions} = useAuthentication({tokenName, username, password});
  
  const logout = () => {
    actions.setAuth(null, false)
    actions.setUser(null, false)
  }

  return (
    <>
      <label htmlFor="username">Username:</label>
      <input type="text" name="username" onBlur={(e) => setUsername(e.target.value)} />
      <label htmlFor="password">Password:</label>
      <input type="password" name="password" onBlur={(e) => setPassword(e.target.value)} />
      <button>Login</button>
      <button onClick={logout}>Logout</button>
      <hr/>
      <JsonView src={state} />
    </>
  );
}

<Component />
```
