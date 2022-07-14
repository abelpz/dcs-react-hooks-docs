# useIssueClient

## About

This document explains `useIssueClient` hook, which consumes [dcs-js](https://github.com/unfoldingWord/dcs-js) library to return an instance of the `IssueApi` class.

* The `IssueApi` instance returned by `useIssueClient` and its possible methods is documented at:

> [unfoldingWord/dcs-js/documentation/classes/IssueApi](https://github.com/unfoldingWord/dcs-js/blob/master/documentation/classes/IssueApi.md).

* Other client hooks and their class methods may be found in

> [`unfoldingWord/dcs-react-hooks/documentation/hooks/clients`](/#/Hooks/Clients).

### Example:

The following *JSON* is the result of the code found below.

> **Tip:** Change the code to get different results.

```js
import React, { useEffect, useState } from 'react';
import { useIssueClient } from 'dcs-react-hooks';
import ReactJson from 'react-json-view';

function Component(){
    const issueClient = useIssueClient({ basePath: "https://qa.door43.org/api/v1/" });
    
    console.log(issueClient);
    
    const [issues, setIssues] = useState({});
    
    useEffect(async () => {
      setIssues(await issueClient.issueListIssues('unfoldingWord', 'en_ta').then(({ data }) => data))
    },[])
    
    return (
      <JsonView src={issues} />
    );
}

<Component />
```

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```
