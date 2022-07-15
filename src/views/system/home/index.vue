<!--
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-05-23 08:26:43
 * @LastEditors: Jianxin Gu
 * @LastEditTime: 2022-05-23 09:04:14
 * @Description: file content
-->
<template>
  <Panel>
    <el-list item-layout="horizontal" :datel-source="data">
      <template #renderItem="{ item }">
        <el-list-item>
          <el-list-item-meta
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          >
            <template #title>
              <a href="https://www.antdv.com/">{{ item.title }}</a>
            </template>
            <template #avatar>
              <el-avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
            </template>
          </el-list-item-meta>
        </el-list-item>
      </template>
    </el-list>
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
