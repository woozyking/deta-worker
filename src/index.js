import BaseClass from './base/index.js'

function DetaClass(key) {
  this.id = key.trim().split('_')[0]
  this.headers = {
    'X-API-Key': key.trim(),
    'Content-Type': 'application/json',
  }
}

DetaClass.prototype.Base = function(baseName) {
  return new BaseClass(this.headers, `https://database.deta.sh/v1/${this.id}/${baseName}`)
}

export const Deta = (key) => new DetaClass(key)
