# Organization Resources and Languages

This demo shows how to access the "organization client" and use its
methods. The possible clients and their class methods may be found
in the `unfoldingWord/dcs-js` repository.

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
  const [ resources, setResources] = useState([]);
  const [ languages, setLanguages] = useState([]);
  const scriptureResourceCodes = [
    'ta',
    'tw',
    'tn',
    'tq',
    'sn',
    'sq',
    'twl',
    'ult',
    'glt',
    'ust',
    'gst',
  ];
  const obsResourceCodes = [
    'obs',
    'obs-tn',
    'obs-tq',
    'obs-sn',
    'obs-sq',
    'obs-twl',
  ];

  const orgClient = useOrgClient({token});

// now get all the orgnizations
  useEffect(async () => {
    const _repos = await orgClient.orgListRepos('unfoldingword').then(({ data }) => data);
    let _scriptureCodes = [];
    let _obsCodes = [];
    let _langs = [];
    const _repoNames = _repos.map( (repo) => {
      const [lang,res] = repo.name.split('_');
      if ( scriptureResourceCodes.includes(res) ) {
        if ( ! _scriptureCodes.includes(res) ) {
          _scriptureCodes.push(res);
        }
        if ( ! _langs.includes(lang) ) {
          _langs.push(lang);
        }
      } else if ( obsResourceCodes.includes(res) ) {
        if ( ! _obsCodes.includes(res) ) {
          _obsCodes.push(res);
        }
        if ( ! _langs.includes(lang) ) {
          _langs.push(lang);
        }
      }
    });

    setResources([..._scriptureCodes, ..._obsCodes]);
    setLanguages(_langs);
  },[])

  return (
    <>
      <h1>Resources:</h1>
      <JsonView src={resources} />
      <h1>Languages:</h1>
      <JsonView src={languages} />
    </>
  );
}

<Component />
```


# Obtaining language information for Organization Languages

This demo shows how to use the `uw-languages-rcl` to add language metadata
to the language code from the organizations.

```js
import React, { useEffect, useState } from 'react';
import { useAuthentication, useOrgClient } from 'dcs-react-hooks';
import { useLanguages } from 'uw-languages-rcl';
import ReactJson from 'react-json-view';

function Component(){
  const { state: { token } } = useAuthentication({});
  const [ languages, setLanguages] = useState([]);
  const [ langData, setLangData] = useState([]);
  const scriptureResourceCodes = [
    'ta',
    'tw',
    'tn',
    'tq',
    'sn',
    'sq',
    'twl',
    'ult',
    'glt',
    'ust',
    'gst',
  ];
  const obsResourceCodes = [
    'obs',
    'obs-tn',
    'obs-tq',
    'obs-sn',
    'obs-sq',
    'obs-twl',
  ];

  const { state: languageList , actions } = useLanguages();

  const orgClient = useOrgClient({token});

// now get all the orgnizations
  useEffect(async () => {
    const _repos = await orgClient.orgListRepos('unfoldingword').then(({ data }) => data);
    let _langs = [];
    const _repoNames = _repos.map( (repo) => {
      const [lang,res] = repo.name.split('_');
      if ( scriptureResourceCodes.includes(res) ) {
        if ( ! _langs.includes(lang) ) {
          _langs.push(lang);
        }
      } else if ( obsResourceCodes.includes(res) ) {
        if ( ! _langs.includes(lang) ) {
          _langs.push(lang);
        }
      }
    });

    setLanguages(_langs);
  },[])

  useEffect( async () => {
    const languagePrettifier = () => {
      let langinfo = [];
      for (let i=0; i<languages.length; i++) {
        const _langData = actions.formatLanguage(actions.getLanguage(languages[i]));
        langinfo.push(_langData);
      }
      setLangData(langinfo);
    }
    if ( languages.length > 0 ) {
      languagePrettifier()
    }
  },[languages, languageList])

  return (
    <>
      <h1>Language Data for Organization</h1>
      <JsonView src={langData} />
    </>
  );
}

<Component />
```
