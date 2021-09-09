import BaseClass from './base/index.js'

function DetaClass(key) {
  const k = (key || '').trim()
  if (!k) {
    throw new Error('Project key is not defined')
  }
  this.id = k.split('_')[0]
  this.headers = {
    'X-API-Key': k,
    'Content-Type': 'application/json',
  }
}

DetaClass.prototype.Base = function(baseName) {
  return new BaseClass(this.headers, `https://database.deta.sh/v1/${this.id}/${baseName}`)
}

export const Deta = (key) => new DetaClass(key)
