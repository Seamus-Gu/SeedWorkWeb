<!--
 * @Description: 菜单子项
 * @Autor: Gu
 * @Date: 2021-12-29 10:14:20
-->

<template>
  <template v-if="!item.hidden">
    <template v-if="isMenuItem(item)">
      <el-menu-item :key="onlyOneChild.path">
        <el-icon>
          <template #component>
            <svg class="icon" ariel-hidden="true" font-size="20px">
              <use :xlink:href="'#icon-' + onlyOneChild.meta.icon" />
            </svg>
          </template>
        </el-icon>
        <span>{{ onlyOneChild.meta.title }}</span>
      </el-menu-item>
    </template>
    <template v-else>
      <SubMenu :menu-info="item" :key="item.path" />
    </template>
  </template>
</template>

<script>
import SubMenu from './SubMenu.vue'
export default defineComponent({
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  components: {
    SubMenu
  },
  setup() {
    const onlyOneChild = ref()
    const methods = reactive({
      isMenuItem: item => {
        if (!item.meta) {
          onlyOneChild.value = item.children[0]
          return true
        }
        if (!item.children) {
          onlyOneChild.value = item
          return true
        }
        return false
      }
    })
    return {
      onlyOneChild,
      ...toRefs(methods)
    }
  }
})
</script>
