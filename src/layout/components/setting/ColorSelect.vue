<template>
  <div class="color-select-container">
    <el-row>
      <el-col :span="24">
        <template v-for="item in colorList" :key="item">
          <el-space>
            <div class="color-select-grid cursor-pointer">
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
  </div>
</template>

<script>
export default {
  setup(props, context) {
    const colorList = [
      '#F5222D',
      '#FA541C',
      '#FADB14',
      '#52C41A',
      '#13C2C2',
      '#1890FF',
      '#722ED1',
      '#EB2F96'
    ]

    const methods = reactive({
      changeColor: val => {
        context.emit('changeColor', val)
      }
    })

    return {
      colorList,
      ...toRefs(methods)
    }
  }
}
</script>

<style lang="scss" scoped>
.color-select-container {
  padding: 16px;
  .color-select-grid {
    padding: 2px;
    border: solid 1px #d0d0d0;
    width: 24px;
    height: 24px;
    overflow: hidden;
  }
  .color {
    width: 100%;
    height: 100%;
  }
}
</style>
