// 是否是IOS
export function isIOS() {
  return /(iPhone|iPad); /i.test(navigator.userAgent);
}

// 是否是Android
function isAndroid() {
  return /Android /i.test(navigator.userAgent);
}
