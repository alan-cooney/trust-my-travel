# Trust My Travel - Unofficial SDK

[![npm](https://img.shields.io/npm/v/trust-my-travel.svg)](https://www.npmjs.com/package/trust-my-travel)
[![npm](https://img.shields.io/npm/l/trust-my-travel.svg)](https://www.npmjs.com/package/trust-my-travel)

Unofficial SDK maintained by the team at [Skyhook](https://www.skyhookadventure.com).

This package is in **ALPHA**.

## Setup

### Install

```shell
npm install trust-my-travel
```

### Initialise

```javascript
const tmt = require("trust-my-travel")({
  url: "https://tmtprotects.com/unique-name",
  username: "abc",
  password: "def"
});
```

## Use

A camelCase function is provided for each endpoint on the _tmt_ object, with parameters item_id and options (both if required). Options should be passed through as an object, with key names matching those from the official [Trust my Travel API docs](https://api.trustmytravel.com).

All functions are promisified, for ES8 async/await use.

### Examples

Note: All examples assume code is within an async function.

#### Sites

##### Create permitted urls

```javascript
const permitted_urls = ["https://www.example.com", "https://www.example2.com"];
const res = await tmt.updatePermittedUrls(siteId, permitted_urls);
```

##### List sites

```javascript
const sites = await tmt.listSites();
```
