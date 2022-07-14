### Example:

The following *JSON* is the result of the code found below.

> **Tip:** Change the code to get different results.

```js
import React, { useEffect, useState } from 'react';
import { useOrgRepos } from 'dcs-react-hooks';
import ReactJson from 'react-json-view';

function Component(){
  const { state, actions } = useOrgRepos({ orgName: "unfoldingWord", page: 1, limit: 2 });

  const { isLoading } = state;

  return isLoading ? "loading..." : (
    <>
      <JsonView src={state} />
    </>
  );
}

<Component />
```
