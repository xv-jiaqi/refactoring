import router from './router';

const whiteList = ['login'];

router.beforeEach((to, from, next) => {
  console.info(to);

  if (whiteList.includes(to.name)) {
    next();
  } else {
    next();
  }
});

router.afterEach(() => {});
