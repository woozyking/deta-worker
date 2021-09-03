import utils, { Action, ACTION_TYPES } from './utils.js'

function BaseClass(headers, baseURL) {
  this.headers = headers
  this.baseURL = baseURL
}

function isObject(v) {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

BaseClass.prototype.put = async function(data, key = null) {
  if (key != null) {
    data.key = key
  }
  const request = await fetch(`${this.baseURL}/items`, {
    method: 'PUT',
    headers: this.headers,
    body: JSON.stringify({ items: [data] }),
  })
  const {
    processed: { items: processed = [] } = {},
    failed: { items: failed = [] } = {},
  } = await request.json()
  if (Array.isArray(failed) && failed.lengh) {
    throw new Error('Failed to put item')
  }
  return processed[0]
}

BaseClass.prototype.get = async function(key) {
  const request = await fetch(`${this.baseURL}/items/${key}`, {
    method: 'GET',
    headers: this.headers,
  })
  if (!request.ok) {
    return null
  }
  return request.json()
}

BaseClass.prototype.delete = function(key) {
  return fetch(`${this.baseURL}/items/${key}`, {
    method: 'DELETE',
    headers: this.headers,
  }).then(() => null)
}

BaseClass.prototype.insert = async function(data, key = null) {
  if (key != null) {
    data.key = key
  }
  const request = await fetch(`${this.baseURL}/items`, {
    method: 'POST',
    headers: this.headers,
    body: JSON.stringify({ item: data }),
  })
  const res = await request.json()
  if (request.ok) {
    return res
  }
  throw new Error((res.errors || [])[0] || 'Unable to insert item')
}

BaseClass.prototype.putMany = async function(items) {
  if (!Array.isArray(items)) {
    throw new Error('Items must be an array')
  }
  if (items.length > 25) {
    throw new Error("We can't put more than 25 items at a time")
  }
  const _items = items.map((value) => {
    if (isObject(value)) {
      return value
    }
    return { value }
  })
  const request = await fetch(`${this.baseURL}/items`, {
    method: 'PUT',
    headers: this.headers,
    body: JSON.stringify({ items: _items }),
  })
  const res = await request.json()
  if (request.ok) {
    return res
  }
  throw new Error((res.errors || [])[0] || 'Unable to put items')
}

BaseClass.prototype.update = async function(updates, key) {
  // build updates payload
  const payload = {}
  Object.entries(updates).forEach(([field, v]) => {
    if (v instanceof Action) {
      if (v.action === ACTION_TYPES.Delete) {
        payload[v.action] = [
          ...payload[v.action] || [],
          field,
        ]
      } else {
        payload[v.action] = {
          ...payload[v.action] || {},
          [field]: v.value,
        }
      }
    } else { // implied ACTION_TYPES.Set
      payload[ACTION_TYPES.Set] = {
        ...payload[ACTION_TYPES.Set] || {},
        [field]: v,
      }
    }
  })
  const req = await fetch(`${this.baseURL}/items/${key}`, {
    method: 'PATCH',
    headers: this.headers,
    body: JSON.stringify(payload),
  })
  const res = await req.json()
  return req.ok ? null : res
}

BaseClass.prototype.fetch = async function(query, options) {
  const opts = Object.entries(options).reduce((acc, [k, v]) => {
    if (v !== undefined) {
      acc[k] = k ==='limit' ? parseInt(v, 10) : v
    }
    return acc
  }, {})
  const request = await fetch(`${this.baseURL}/query`, {
    method: 'POST',
    headers: this.headers,
    body: JSON.stringify({
      query: Array.isArray(query) ? query : [query],
      ...opts,
    }),
  })
  const { paging, items } = await request.json()
  return {
    count: paging.size,
    last: paging.last,
    items,
  }
}

BaseClass.prototype.util = utils

export default BaseClass
