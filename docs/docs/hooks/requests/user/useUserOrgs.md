### Example:

The following *JSON* is the result of the code found below.

**Tips:**
> Change the code to get different results.
> > **First**: login using the `useAuthentication` demo

```js
import React, { useEffect, useState } from 'react';
import { useUserOrgs } from 'dcs-react-hooks';
import ReactJson from 'react-json-view';

function Component(){
  const { state, actions } = useUserOrgs({ });

  const { orgList, isLoading } = state;

  return isLoading ? "loading..." : (
    <>
      <JsonView src={orgList} />
    </>
  );
}

<Component />
```
