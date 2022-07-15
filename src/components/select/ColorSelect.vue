<template>
  <div class="color-select-container">
    <div class="color-select-row" v-for="row in rowNum" :key="row">
      <div
        class="color-select-grid"
        v-for="item in colorList.slice((row - 1) * 8, row * 8)"
        :key="item"
      >
        <div
          class="color"
          :style="{ background: item }"
          @click="changeColor(item)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String
    },
    colorList: {
      type: Object,
      required: true
    }
  },
  setup(props, context) {
    const rowNum = Math.ceil(props.colorList.length / 8)

    const methods = reactive({
      changeColor: val => {
        context.emit('changeColor', val)
      }
    })

    return {
      rowNum,
      ...toRefs(methods)
    }
  }
}
</script>

<style lang="scss" scoped>
.color-select-container {
  position: relative;
  box-sizing: border-box;
  border-radius: 3px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.26);
  background-color: #fff;
  width: 248px;
  z-index: 9999;
  padding: 16px;
  line-height: 1;
  .color-select-row {
    position: relative;
    width: 100%;
    margin: 0;
    height: 27px;
    display: flex;
    .color-select-grid {
      padding: 2.5px;
      border: solid 1px #d0d0d0;
      position: relative;
      width: 27px;
      height: 27px;
      cursor: pointer;
      overflow: hidden;
    }
    .color {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
