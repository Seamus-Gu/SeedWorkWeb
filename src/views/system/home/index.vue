<!--
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-05-23 08:26:43
 * @LastEditors: Jianxin Gu
 * @LastEditTime: 2022-05-23 09:04:14
 * @Description: file content
-->
<template>
  <Panel>
    <a-list item-layout="horizontal" :data-source="data">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          >
            <template #title>
              <a href="https://www.antdv.com/">{{ item.title }}</a>
            </template>
            <template #avatar>
              <a-avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </Panel>
</template>
<script>
import { Panel } from '@/components'
import { defineComponent } from 'vue'
const data = [
  {
    title: 'Ant Design Title 1'
  },
  {
    title: 'Ant Design Title 2'
  },
  {
    title: 'Ant Design Title 3'
  },
  {
    title: 'Ant Design Title 4'
  }
]
export default defineComponent({
  components: { Panel },
  setup() {
    return {
      data
    }
  }
})
</script>
