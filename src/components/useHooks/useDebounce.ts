const useDebounce = (fn: Function, delay: number) => {
  let timeId: any = 0;
  return function () {
    let args = [].slice.call(arguments);
    if (timeId) clearTimeout(timeId);
    timeId = setTimeout(() => {}, delay);
  };
};
export default useDebounce;
