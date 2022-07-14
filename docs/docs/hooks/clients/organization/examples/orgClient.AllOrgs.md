# All Organizations

This demo shows how to access "organization client" hook (`useOrgClient`) and use its
method:

```js static
  orgClient.orgGetAll({args})
```

documented here: [dcs-js/classes/OrganizationApi/method/orgGetAll](https://github.com/unfoldingWord/dcs-js/blob/master/documentation/classes/OrganizationApi.md#orggetall)

Note that only the organization names are returned.

The optional parameters that `orgGetAll` takes are:
- lang?: string,
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
  const [ orgs, setOrgs] = useState([])

  const orgClient = useOrgClient({token});

// now get all the orgnizations
  useEffect(async () => {
    // const _orgs = await orgClient.orgGetAll('ru').then(({ data }) => data)
    // const _orgs = await orgClient.orgGetAll('ru', 2, 2).then(({ data }) => data)
    const _orgs = await orgClient.orgGetAll().then(({ data }) => data)
    const _orgNames = _orgs.map( org => org.username)
    setOrgs(_orgNames)
  },[])

  return (
    <>
      <JsonView src={orgs} />
    </>
  );
}

<Component />
```

> The `OrganizationApi` instance returned by `useOrgClient` and its possible methods is documented at [unfoldingWord/dcs-js/documentation/classes/OrganizationApi](https://github.com/unfoldingWord/dcs-js/blob/master/documentation/classes/OrganizationApi.md).

> Other clients and their class methods may be found in [`unfoldingWord/dcs-js/documentation/classes`](https://github.com/unfoldingWord/dcs-js/blob/master/documentation/modules.md#classes).
