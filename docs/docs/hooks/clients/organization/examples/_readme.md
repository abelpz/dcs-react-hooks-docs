<!-- title: Examples -->

### All Organizations

The `AllOrgs` example will use the `useOrgClient` to return all organizations in DCS.
Optionally, a language code may be used as a filter. See the example for more details.

### Organization Language Resources

This demo shows how to obtain all the languages and resources found in an organization.

**NOTES**
This example only considers repos that follow the standard naming conventions.
The conventions for Scripture and OBS repos are those that end in the following strings:
```txt
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
  ```