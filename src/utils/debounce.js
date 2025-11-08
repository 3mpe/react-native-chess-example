/* eslint-disable consistent-this */
export function debounce(func, delay) {
  let timeoutId;

  const debouncedFunc = function (...args) {
    const context = this;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };

  // Zamanlayıcıyı dışarıdan iptal etme yeteneği ekliyoruz.
  debouncedFunc.cancel = function () {
    clearTimeout(timeoutId);
  };

  return debouncedFunc;
}
