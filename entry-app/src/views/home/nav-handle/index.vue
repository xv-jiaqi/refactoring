<template>
  <section class="slot">
    <svg-icon iconName="email" class="icon-email"></svg-icon>
    <lang-btn></lang-btn>
  </section>
</template>

<script>
import LangBtn from '@/components/lang-btn/';

export default {
  components: {
    LangBtn,
  },
};
</script>

<style lang="scss" scoped>
.slot {
  flex: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.icon-email {
  margin-right: 30px;
}

.lang-btn {
  background-color: $white;
  color: $themeColor;
  margin-right: 30px;
}

@media screen and (max-width: $screen-xs-max) {
  .slot {
    justify-content: left;
  }
}
</style>
