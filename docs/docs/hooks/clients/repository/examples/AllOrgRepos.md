# All Repos for an Organization

This demo shows how to access the "organization client" and use its
methods. The possible clients and their class methods may be found
in the `unfoldingWord/dcs-js` repository.

Note that only the organization names are returned.

The optional parameters that `orgListRepos` takes are:
- org: string (required),
- page?: number,
- limit?: number
*These are positional parameters, not named.* Try uncommenting
some of the examples below to play with these extra parameters.


```js
import React, { useEffect, useState } from 'react';
import { useAuthentication, useOrgClient } from 'dcs-react-hooks';
import ReactJson from 'react-json-view';

function Component(){
  const { state: { token } } = useAuthentication({});
  const [ repos, setRepos] = useState([])

  const orgClient = useOrgClient({token});

// now get all the orgnizations
  useEffect(async () => {
    const _repos = await orgClient.orgListRepos('es-419_gl').then(({ data }) => data)
    const _repoNames = _repos.map( repo => repo.name)
    setRepos(_repoNames)
    // setRepos(_repos)
  },[])

  return (
    <>
      <JsonView src={repos} />
    </>
  );
}

<Component />
```
