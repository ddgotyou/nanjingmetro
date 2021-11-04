export function resize(str, filename) {
  return {
    bind(el, binding) {
      // el 绑定的元素
      // binding 绑定给指令的对象
      let width = "";
      let height = "";
      function isReize() {
        const style = document.defaultView.getComputedStyle(el);
        if (width !== style.width || height !== style.height) {
          binding.value({ width: style.width, height: style.height }); // 关键(这传入的是函数,所以执行此函数)
        }
        width = style.width;
        height = style.height;
      }
      el.__vueSetInterval__ = setInterval(isReize, 200);
    },
    unbind(el) {
      clearInterval(el.__vueSetInterval__);
    },
  };
}

// export default { resize }