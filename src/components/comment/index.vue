<template>
  <div class="comment">
    <el-comment>
      <template #avatar>
        <el-avatar @click="clickAvatar" :src="avatar" :alt="avatarAlt" />
      </template>
      <template #author>
        <span>{{ author }}</span>
      </template>
      <template #datetime>
        <el-tooltip :title="dayjs(datetime, 'YYYY-MM-DD HH:mm:ss')">
          <span>{{ dayjs(datetime).fromNow() }}</span>
        </el-tooltip>
      </template>
      <template #content>
        <p>
          {{ content }}
        </p>
      </template>
      <template #actions>
        <span key="comment-basic-like">
          <el-tooltip title="点赞">
            <template v-if="action === 'liked'">
              <LikeFilled @click="like" />
            </template>
            <template v-else>
              <LikeOutlined @click="like" />
            </template>
          </el-tooltip>
          <span style="padding-left: 8px; cursor: auto">
            {{ likes }}
          </span>
        </span>
        <span key="comment-basic-dislike">
          <el-tooltip title="差评">
            <template v-if="action === 'disliked'">
              <DislikeFilled @click="dislike" />
            </template>
            <template v-else>
              <DislikeOutlined @click="dislike" />
            </template>
          </el-tooltip>
          <span style="padding-left: 8px; cursor: auto">
            {{ dislikes }}
          </span>
        </span>
        <span v-if="hasReply">回复</span>
      </template>
      <slot></slot>
    </el-comment>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import {
  LikeFilled,
  LikeOutlined,
  DislikeFilled,
  DislikeOutlined
} from '@ant-design/icons-vue'

export default defineComponent({
  props: {
    likes: {
      type: Number
    },
    dislikes: {
      type: Number
    },
    hasReply: {
      type: Boolean,
      default: false
    },
    id: {
      type: String
    },
    userId: {
      type: String
    },
    action: {
      type: String
    },
    author: {
      type: String
    },
    avatar: {
      type: String
    },
    avatarAlt: {
      type: String
    },
    datetime: {
      type: String
    },
    content: {
      type: String
    }
  },
  components: {
    LikeFilled,
    LikeOutlined,
    DislikeFilled,
    DislikeOutlined
  },
  setup(props, context) {
    const methods = reactive({
      clickAvatar: () => {
        context.emit('clickAvatar')
      },
      like: () => {
        context.emit('like')
      },
      dislike: () => {
        context.emit('dislike')
      }
    })

    return {
      ...toRefs(methods)
    }
  }
})
</script>
