export function getStorage(key: string, type: string = 'string') {
  const str = localStorage.getItem(key)
  if (type === 'string') {
    return str
  } else {
    return str ? JSON.parse(str) : str
  }
}

export function setStorage(key: string, value: string | Object) {
  if (typeof value === 'string') {
    localStorage.setItem(key, value)
  } else {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export function removeStorage(key: string) {
  localStorage.removeItem(key)
}
