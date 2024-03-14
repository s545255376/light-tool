// src/index.js
import LightTable from './components/LightTable';
import ToolTip from './components/ToolTip/index.js';

// 导出单个组件
export { LightTable, ToolTip };

// 或者，如果你希望允许使用者通过一个插件来全局注册所有这些组件，
// 你可以提供一个Vue插件
export default {
    install(Vue) {
        Vue.component('LightTable', LightTable);
    }
};