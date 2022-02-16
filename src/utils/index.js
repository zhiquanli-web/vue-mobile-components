export function vw(px, base = 750, unit = true) {
  if (typeof px !== "number" || typeof base !== "number") {
    throw Error("px / base 不能为空，并且必须为一个数字");
  }
  return (Math.round(px) / base) * 100 + (unit ? "vw" : "");
}

export function vpx(value) {
  return vwToPx(vw(value));
}

export function vwToPx(value) {
  if (typeof value === "string") {
    value = value.replace(/vw$/, "");
  }
  if (Number.isNaN(Number(value))) {
    throw Error("值不能为空，并且应该是一个数字，或者可以由Number解析的值");
  }
  const oneVw = window.innerWidth / 100;
  return Math.round(oneVw * Number(value));
}

export function mapFn(keys = [], values = []) {
  if (!(Array.isArray(keys) && Array.isArray(values)))
    throw Error("参数必须为数组");
  if (keys.length < values.length) throw Error("keys长度必须不小于values长度");
  if (keys.length === 0 || values.length === 0)
    throw Error("keys / values 的长度不能为0");
  const maps = new Map();
  for (let i = 0; i < keys.length; i++) {
    maps.set(keys[i], values[i]);
  }
  return maps;
}

// 图片加载
export function reloadImage(src) {
  if (typeof src !== "string") throw Error("src为图片路径");
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      resolve(img);
    };
  });
}

// 防抖
export function debounce(fn, delay = 500) {
  if (Object.prototype.toString.call(fn) !== "[object Function]")
    throw Error("请传入函数!");
  let timer = null;
  return function debounceFn(...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(context, ...args);
    }, delay);
  };
}

export function dispatch(componentName, eventName, params, that) {
  var parent = that.$parent || that.$root;
  var name = parent.$options.componentName;
  while (parent && (!name || name !== componentName)) {
    parent = parent.$parent;
    if (parent) {
      name = parent.$options.componentName;
    }
  }
  if (parent) {
    parent.$emit.apply(parent, [eventName].concat(params));
  }
}
