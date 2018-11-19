import Vue from 'vue';
import SvgIcon from '@/components/svgIcon/index';

// register globally
Vue.component('svg-icon', SvgIcon);

// import all svg
const req = require.context('@/assets/svgIcons', false, /\.svg$/);
// requires and returns all modules that match
const requireAll = requireContext => requireContext.keys().map(requireContext);

requireAll(req);