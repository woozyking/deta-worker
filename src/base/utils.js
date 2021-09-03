export const ACTION_TYPES = {
  Delete: 'delete', // no value
  Increment: 'increment', // default 1
  Set: 'set',
  Append: 'append',
  Prepend: 'prepend',
}

export function Action({ action, value = null }) {
  this.action = action
  this.value = value
}

export default {
  delete: function() {
    return new Action({ action: ACTION_TYPES.Delete })
  },
  trim: function() {
    return this.delete()
  },
  increment: function(value = 1) {
    return new Action({ action: ACTION_TYPES.Increment, value })
  },
  set: function(value) {
    return new Action({ action: ACTION_TYPES.Set, value })
  },
  append: function(value) {
    return new Action({
      action: ACTION_TYPES.Append,
      value: Array.isArray(value) ? value : [value],
    })
  },
  prepend: function(value) {
    return new Action({
      ...this.append(value),
      action: ACTION_TYPES.Prepend,
    })
  },
}
