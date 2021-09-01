# deta-worker

Fetch API-based deta js library for browser and Service Worker environments.

This library fills the need to interact with Deta HTTP APIs in Cloudflare Workers, and the official [Deta JS SDK](https://github.com/deta/deta-javascript) is not working out-of-the-box with such a Service Worker environment. The API usage patterns of this library aim to be nearly identical to the official SDK.

API parity (vs. the official Deta JS SDK):

- Base
    - [ ] `__test__`
    - [x] `.put(data, key = null)`
    - [x] `.get(key)`
    - [x] `.delete(key)`
    - [x] `.insert(data, key = null)`
    - [x] `.putMany(items)`
    - [ ] `.update(updates, key)`
    - [x] `.fetch(query, options)`
- Drive
    - [ ] `__test__`
    - [ ] `.put(name, options)`
    - [ ] `.get(name)`
    - [ ] `.delete(name)`
    - [ ] `.deleteMany(names)`
    - [ ] `.list(options)`

_Note: this library works in Node.js with a monkey-patched global `fetch()` (such as through [node-fetch](https://github.com/node-fetch/node-fetch)), but why?_
