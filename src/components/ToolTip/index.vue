<template>
  <div v-show="visible" :style="{ top: (position.y - 40) + 'px', left: position.x + 'px' }" class="tooltip">
    {{ text }}
  </div>
</template>

<script>
export default {
  props: ['text'],
  data() {
    return {
      visible: false,
      position: { x: 0, y: 0 }
    };
  },
  methods: {
    setPosition({ x, y }) {
      this.position = { x, y };
      this.visible = true;
    }
  }
};
</script>

<style scoped>
.tooltip {
  position: fixed;
  z-index: 10;
  /* 其他样式 */

  font-size: 12px;
  background-color: rgba(0, 0, 0, .7);
  color: white;
  padding: 8px;
  border-radius: 4px;
}
</style>
