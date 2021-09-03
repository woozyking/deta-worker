# deta-worker

Fetch API-based deta js library for browser and Service Worker environments.

This library fills the need to interact with Deta HTTP APIs in Cloudflare Workers, as the official [Deta JS SDK](https://github.com/deta/deta-javascript) at the moment is not working out-of-the-box with such a Service Worker environment.

API parity (vs. the official Deta JS SDK):

- [x] Base
- Drive
    - [ ] `.put(name, options)`
    - [ ] `.get(name)`
    - [ ] `.delete(name)`
    - [ ] `.deleteMany(names)`
    - [ ] `.list(options)`

_Note: this library works in Node.js with a monkey-patched global `fetch()` (such as through [node-fetch](https://github.com/node-fetch/node-fetch)), but why?_

## Usage

The high-level API usage patterns of this library aim to be nearly identical to the official SDK, so consult the respective [Base](https://docs.deta.sh/docs/base/sdk#using) and [Drive](https://docs.deta.sh/docs/drive/sdk#using) docs should suffice.

A few opinionated implementation details deviate from the official SDK (aside from the obvious styles). For instance, the `.util.trim()` method for Base `.updates()` is first-referenced as `.util.delete()` to best match the current [Base HTTP API documentation](https://docs.deta.sh/docs/base/http/#update-item) (also not to infringe the JS String `.trim()` method), but `.util.trim()` is still kept as an alias for drop-in compatibility.

## Installation

```shell
% npm i deta-worker
% # or
% yarn add deta-worker
```
