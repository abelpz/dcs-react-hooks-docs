### Example:

The following *JSON* is the result of the code found below.

> **Tip:** Change the code to get different results.

```js
import React, { useEffect, useState } from 'react';
import { useRepoBranches } from 'dcs-react-hooks';
import ReactJson from 'react-json-view';

function Component(){
  const [ownerName, setOwnerName] = useState();
  const [repoName, setRepoName] = useState();

  const { state, actions } = useRepoBranches({
    ownerName,
    repoName,
    page: 1,
    limit: 5
  });

  const { isLoading } = state;

  const unsetRepoParams = () => {
    setOwnerName(null);
    setRepoName(null);
  }

  const setRepoParams = () => {
    setOwnerName("unfoldingWord");
    setRepoName("en_tn");
  }

  return isLoading ? "loading..." : (
    <>
      <JsonView src={state} />
      <button onClick={setRepoParams}>Set repository</button>
      <button onClick={unsetRepoParams}>Unset Repository</button>
    </>
  );
}

<Component />
```
