### Example:

The following *JSON* is the result of the code found below.

> **Tip:** Change the code to get different results.

```js
import React, { useEffect, useState } from 'react';
import { useAllOrgs } from 'dcs-react-hooks';
import ReactJson from 'react-json-view';

function Component(){
  const { state, actions } = useAllOrgs({lang: "es-419", page: 1, limit: 5});

  const { orgs, isLoading } = state;

  return isLoading ? "loading..." : (
    <>
      <JsonView src={orgs} />
    </>
  );
}

<Component />
```
