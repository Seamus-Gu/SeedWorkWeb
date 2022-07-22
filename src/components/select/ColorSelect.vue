<template>
  <div class="color-select-container">
    <template v-for="row in rowNum" :key="row">
      <el-row>
        <el-col :span="24">
          <template
            v-for="item in colorList.slice((row - 1) * 8, row * 8)"
            :key="item"
          >
            <el-space>
              <div class="color-select-grid">
                <div
                  class="color"
                  :style="{ background: item }"
                  @click="changeColor(item)"
                ></div>
              </div>
            </el-space>
          </template>
        </el-col>
      </el-row>
    </template>
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
  .color-select-grid {
    padding: 2px;
    border: solid 1px #d0d0d0;
    width: 24px;
    height: 24px;
    cursor: pointer;
    overflow: hidden;
  }
  .color {
    width: 100%;
    height: 100%;
  }
}
</style>
