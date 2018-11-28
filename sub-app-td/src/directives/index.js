import Vue from 'vue';

// 字数提示
const directiveFunc = (el, { value, }) => {
  const input = el.querySelector('.el-input__inner');
  const numNotice = el.querySelector('.num-notice');

  if (numNotice) {
    numNotice.setAttribute('class', input.value.length > value ? 'num-notice num-error-notice' : 'num-notice');
    numNotice.innerHTML = `${input.value.length}/${value}`;
  } else {
    const newNode = document.createElement('span');
    newNode.setAttribute('class', input.value.length > value ? 'num-notice num-error-notice' : 'num-notice');
    newNode.innerHTML = `${input.value.length}/${value}`;
    el.appendChild(newNode);
  }
};

Vue.directive('text-num', {
  inserted: directiveFunc,

  update(el, binding) {
    setTimeout(() => {
      directiveFunc(el, binding);
    });
  },
});

// 权限埋点
const hasAuth = (elePath) => {
  const authInfo = JSON.parse(window.localStorage.authInfo || '{}');
  return authInfo[elePath];
};

Vue.directive('ele-auth', {
  bind(el, binding) {
    if (!hasAuth(binding.value)) {
      el.style.display = 'none';
    }
  },
});