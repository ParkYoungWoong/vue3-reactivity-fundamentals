const targetMap = new WeakMap()

function reRender(target, key, value) {
  const deps = targetMap.get(target)
  deps.forEach(dep => {
    dep.textContent = value
  })
}

export function reactive(target) {
  function trigger() {
    reRender(...arguments)
  }
  return new Proxy(target, {
    set(target, key, value, receiver) {
      trigger(...arguments)
      return Reflect.set(...arguments)
    }
  })
}

export function render(target, callback) {
  function createElement(name, options, value) {
    const el = document.createElement(name)
    el.addEventListener('click', options.onclick)
    el.textContent = value
    return el
  }
  const el = callback(createElement)
  let deps = targetMap.get(target)
  if (!deps) {
    targetMap.set(target, (deps = []))
  }
  deps.push(el)

  document.querySelector('#app').appendChild(el)
}