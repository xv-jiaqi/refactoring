import { isFunction, isAsyncFunction } from '@/utils/utils';

export default ['btn-click', {
  inserted: (el, binding) => {
    const { value: bind } = binding;
    let timeout = 10000, request;

    if (isFunction(bind) || isAsyncFunction(bind)) {
      request = bind;
    } else {
      const { timeout: _timeout, request: _request } = bind;

      timeout = _timeout;
      request = _request;
    }

    function removeDisabled() {
      el.disabled = false;
      el.classList.remove('is-disabled');
    }

    el.addEventListener('click', () => {
      el.disabled = true;
      el.classList.add('is-disabled');

      request().finally(() => {
        removeDisabled()
      });

      setTimeout(removeDisabled.bind(this), timeout);
    });
  }
}];
