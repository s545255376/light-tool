// tooltipService.js
import Vue from 'vue';
import TooltipComponent from './index.vue'; // 假设这是你的Tooltip组件

let TooltipInstance;

const TooltipConstructor = Vue.extend(TooltipComponent);

function showTooltip({ text, event }) {
    if (!TooltipInstance) {
        TooltipInstance = new TooltipConstructor({
            el: document.createElement('div'),
            propsData: { text }
        });
    }

    TooltipInstance.text = text;
    TooltipInstance.visible = true;

    document.body.appendChild(TooltipInstance.$el);

    const { clientX: x, clientY: y } = event;
    TooltipInstance.setPosition({ x, y });
}

function hideTooltip() {
    if (TooltipInstance) {
        TooltipInstance.visible = false;
    }
}

export default {
    show: showTooltip,
    hide: hideTooltip
};
