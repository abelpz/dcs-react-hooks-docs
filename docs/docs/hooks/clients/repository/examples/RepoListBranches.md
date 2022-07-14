# List branches in a Repo

This demo shows how to access the "respository client" and use its
methods. The possible clients and their class methods may be found
in the `unfoldingWord/dcs-js` repository.

The optional parameters are shown in the function signature below.
*These are positional parameters, not named.* 

```txt
repoListBranches: async (
  owner: string, 
  repo: string, 
  page?: number, 
  limit?: number, 
  options: AxiosRequestConfig = {}
): Promise<RequestArgs>
```

```js
import React, { useEffect, useState } from 'react';
import { useAuthentication, useRepoClient } from 'dcs-react-hooks';
import ReactJson from 'react-json-view';

function Component(){
  const { state: { token } } = useAuthentication({});
  const [ branches, setBranches] = useState([])

  const repoClient = useRepoClient({token});

// now get all the orgnizations
  useEffect(async () => {
    const _branches = await repoClient.repoListBranches(
      'unfoldingWord','en_tn',1,10
    ).then(({ data }) => data)
    // reduce the info returned
    const __branches = _branches.map( (branch) => {
      return {name: branch.name, timestamp: branch.commit.timestamp, sha1: branch.commit.id}
    })
    setBranches(__branches)
  },[])

  return (
    <>
      <JsonView src={branches} />
    </>
  );
}

<Component />
```
