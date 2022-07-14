---
sidebar_position: 1
label: 'Clients'
title: 'Clients'
---

## What are client hooks?

Client hooks wrap [classes from dcs-js](https://github.com/unfoldingWord/dcs-js/blob/master/documentation/modules.md#classes) to simplify their implementation.

## Example

Let's make an authorized request to DCS using both **dcs-js** and **client hooks** from **dcs-react-hooks**:

### Using dcs-js

Let's create a repository using the [RepositoryApi](https://github.com/unfoldingWord/dcs-js/blob/master/documentation/classes/RepositoryApi.md) class and it's [createCurrentUserRepo](https://github.com/unfoldingWord/dcs-js/blob/master/documentation/classes/RepositoryApi.md#-createcurrentuserrepo) method.

```js
import RepositoryApi from 'dcs-js'

const token = 'YOUR-TOKEN';
const config = {
  apiKey: ((key) => key === "Authorization" ? `token ${token}` : ""),
  basePath: 'https://qa.door43.org/api/v1/',
} 

const repositoryClient = new RepositoryApi(config)

const newRepositoryBody = {
  _private: true,
  name: 'My new repository'
}

repositoryClient.createCurrentUserRepo(newRepositoryBody);
```

### Using client hooks from dcs-react-hooks

Now let's create a repository using the [useRepoClient hook](https://github.com/unfoldingWord/dcs-js/blob/master/documentation/classes/RepositoryApi.md) which works very similar to dcs-js, in this case it simplifies authentication implementation.

```js
import { useRepoClient } from 'dcs-react-hooks'

const token = 'YOUR-TOKEN';
const repositoryClient = useRepoClient({ token })

const newRepositoryBody = {
  _private: true,
  name: 'My new repository'
}

repositoryClient.createCurrentUserRepo(newRepositoryBody);
```

## Available client hooks

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```
