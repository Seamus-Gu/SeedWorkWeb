<!--
 * @Description: 
 * @Autor: Gu
 * @Date: 2022-01-10 16:28:14
-->
<template>
  <el-sub-menu :key="menuInfo.path">
    <template #icon>
      <el-icon>
        <svg class="icon sub-menu-icon" ariel-hidden="true" font-size="20px">
          <use :xlink:href="'#icon-' + menuInfo.meta.icon" />
        </svg>
      </el-icon>
    </template>
    <template #title>
      {{ menuInfo.meta.title }}
    </template>
    <template v-for="item in menuInfo.children" :key="item.path">
      <template v-if="!item.children">
        <el-menu-item :key="item.path" v-if="!item.hidden">
          <Icon>
            <template #component>
              <svg class="icon" ariel-hidden="true" font-size="20px">
                <use :xlink:href="'#icon-' + item.meta.icon" />
              </svg>
            </template>
          </Icon>
          <span> {{ item.meta.title }}</span>
        </el-menu-item>
      </template>
      <template v-else>
        <SubMenu :menu-info="item" :key="item.key" />
      </template>
    </template>
  </el-sub-menu>
</template>
<script>
export default defineComponent({
  name: 'SubMenu',
  props: {
    menuInfo: {
      type: Object,
      required: true
    }
  },
  components: {},
  setup() {
    return {}
  }
})
</script>
