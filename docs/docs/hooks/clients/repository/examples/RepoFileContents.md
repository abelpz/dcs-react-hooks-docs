# Content for a Repo File

This demo shows how to access the "respository client" and use its
methods. The possible clients and their class methods may be found
in the `unfoldingWord/dcs-js` repository.

Note that only the organization names are returned.

The optional parameters are shown in the function signature below.
*These are positional parameters, not named.* 

```txt
repoGetContents: async (
  owner: string, 
  repo: string, 
  filepath: string, 
  ref?: string, 
  options: AxiosRequestConfig = {}
): Promise<RequestArgs> 
```

```js
import React, { useEffect, useState } from 'react';
import { useAuthentication, useRepoClient } from 'dcs-react-hooks';
import ReactJson from 'react-json-view';

function Component(){
  const { state: { token } } = useAuthentication({});
  const [ content, setContent] = useState([])

  const repoClient = useRepoClient({token});

// now get all the orgnizations
  useEffect(async () => {
    const _content = await repoClient.repoGetContents(
      'es-419_gl','es-419_twl','twl_TIT.tsv'
    ).then(({ data }) => data)
    setContent(_content)
  },[])

  return (
    <>
      <JsonView src={content} />
    </>
  );
}

<Component />
```
