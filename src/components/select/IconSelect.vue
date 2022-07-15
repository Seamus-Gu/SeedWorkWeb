<!--
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-05-14 19:41:43
 * @LastEditors: Jianxin Gu
 * @LastEditTime: 2022-05-24 14:47:30
 * @Description: file content
-->
<template>
  <a-popover
    class="icon-select-container"
    :trigger="trigger"
    :placement="placement"
    v-model:visible="visible"
  >
    <template #title>
      <a-input-search
        v-model:value="search"
        placeholder="输入关键字进行搜索"
        @search="filterIcon"
      />
    </template>
    <template #content>
      <template v-if="iconList.length != 0">
        <a-row style="margin-bottom: 8px">
          <div class="icon-panel" :style="{ width: width }">
            <div
              class="icon-box"
              v-for="(item, index) in iconList"
              :key="index"
              @click="changeIcon(item), close()"
            >
              <a-button size="large">
                <template #icon>
                  <svg class="icon" aria-hidden="true" font-size="24px">
                    <use :xlink:href="'#' + item" />
                  </svg>
                </template>
              </a-button>
            </div>
          </div>
        </a-row>
        <a-row align="center">
          <a-pagination
            :total="listTotal"
            :pageSize="pageSize"
            size="small"
            @change="changeCurrent"
          />
        </a-row>
      </template>
      <template v-else>
        <a-empty
          description="没有该图标"
          :image-style="{
            width: width
          }"
        />
      </template>
    </template>
    <slot></slot>
  </a-popover>
</template>
<script>
import iconList from '@/assets/json/icon-list.json'

export default defineComponent({
  props: {
    width: {
      type: String,
      default: '240px'
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    trigger: {
      type: String,
      default: 'click'
    },
    pageSize: {
      type: Number,
      default: 30
    }
  },
  setup(props, context) {
    const iconSelectData = reactive({
      visible: false,
      iconList: iconList.slice(0, 30),
      listTotal: iconList.length,
      search: undefined
    })

    const methods = reactive({
      close: () => {
        iconSelectData.visible = false
      },
      filterIcon: () => {
        if (iconSelectData.search) {
          iconSelectData.iconList = iconList.filter(item =>
            item.toLowerCase().includes(iconSelectData.search.toLowerCase())
          )
        } else {
          iconSelectData.iconList = iconList.slice(0, props.pageSize)
        }
      },
      changeCurrent: page => {
        let start = (page - 1) * props.pageSize
        let end = page * props.pageSize
        iconSelectData.iconList = iconList.slice(start, end)
      },
      changeIcon: icon => {
        let iconVal = icon.slice(5)
        context.emit('changeIcon', iconVal)
      }
    })
    return {
      ...toRefs(iconSelectData),
      ...toRefs(methods)
    }
  }
})
</script>
<style lang="scss" scoped>
.icon-box {
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-content: flex-start;
}
.icon-panel {
  display: flex;
  flex-flow: row wrap;
}
.icon-select-container {
}
</style>
