<template>
  <div class="user-avatar" @click="editCropper()">
    <a-avatar :src="avatar" :size="128"> 上传头像</a-avatar>
    <Modal
      :visible="visible"
      title="修改头像"
      width="800px"
      @cancel="cancel"
      @ok="updateAvatar"
    >
      <a-row :gutter="8">
        <a-col :xs="24" :md="14">
          <Panel>
            <vueCropper
              style="height: 400px"
              ref="cropperRef"
              :info="true"
              outputType="png"
              :img="options.img"
              :autoCrop="options.autoCrop"
              :autoCropWidth="options.autoCropWidth"
              :autoCropHeight="options.autoCropHeight"
              :fixedBox="options.fixedBox"
              @realTime="realTime"
            />
          </Panel>
          <Panel>
            <a-space>
              <UploadBtn width="80px" @upload="upload" accept="image/*">
                <svg class="icon" aria-hidden="true" font-size="20px">
                  <use xlink:href="#icon-cloud-upload" />
                </svg>
              </UploadBtn>
              <a-button style="width: 60px" @click="changeScale(1)">
                <svg class="icon" aria-hidden="true" font-size="20px">
                  <use xlink:href="#icon-plus" />
                </svg>
              </a-button>
              <a-button style="width: 60px" @click="changeScale(-1)">
                <svg class="icon" aria-hidden="true" font-size="20px">
                  <use xlink:href="#icon-minus" />
                </svg>
              </a-button>
              <a-button style="width: 60px" @click="turnLeft">
                <svg class="icon" aria-hidden="true" font-size="20px">
                  <use xlink:href="#icon-rotation-left" />
                </svg>
              </a-button>
              <a-button style="width: 60px" @click="turnRight">
                <svg class="icon" aria-hidden="true" font-size="20px">
                  <use xlink:href="#icon-rotation-right" />
                </svg>
              </a-button>
            </a-space>
          </Panel>
        </a-col>
        <a-col :xs="24" :md="10">
          <Panel height="50%">
            <div class="avatar-upload-preview">
              <img :src="options.previews.url" :style="options.previews.img" />
            </div>
          </Panel>
          <Panel height="calc(50% - 16px)">
            <div class="avatar-img-preview">
              <img :src="options.previews.url" :style="options.previews.img" />
            </div>
          </Panel>
        </a-col>
      </a-row>
    </Modal>
  </div>
</template>

<script>
import { uploadAvatar } from '@/api/system/user'
import { Modal, Panel, UploadBtn } from '@/components'

export default defineComponent({
  components: { Modal, Panel, UploadBtn },
  setup() {
    const store = useStore()
    const { proxy } = getCurrentInstance()
    const avatar = computed(() => store.state.user.avatar)

    const avatarData = reactive({
      visible: false,
      cropperRef: undefined
    })

    const options = reactive({
      img: avatar.value, // 裁剪图片的地址
      autoCrop: true, // 是否默认生成截图框
      autoCropWidth: 200, // 默认生成截图框宽度
      autoCropHeight: 200, // 默认生成截图框高度
      fixedBox: true, // 固定截图框大小 不允许改变
      previews: {} //预览数据
    })

    const methods = reactive({
      editCropper: () => {
        avatarData.visible = true
      },
      cancel: () => {
        avatarData.visible = false
      },
      realTime: data => {
        options.previews = data
      },
      upload: file => {
        if (file.type.indexOf('image/') == -1) {
          proxy.$msg.error(
            '文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。'
          )
        } else {
          const reader = new FileReader()

          reader.readAsDataURL(file)
          reader.onload = () => {
            options.img = reader.result
          }
        }
      },
      changeScale: num => {
        avatarData.cropperRef.changeScale(num)
      },
      turnLeft: () => {
        avatarData.cropperRef.rotateLeft()
      },
      turnRight: () => {
        avatarData.cropperRef.rotateRight()
      },
      updateAvatar: () => {
        avatarData.cropperRef.getCropBlob(data => {
          let formData = new FormData()
          formData.append('avatarFile', data)
          uploadAvatar(formData).then(res => {
            options.img = res.data.imgUrl
            store.dispatch('updateAvatar', options.img)
            avatarData.visible = false
          })
        })
      }
    })
    return {
      avatar,
      options,
      ...toRefs(avatarData),
      ...toRefs(methods)
    }
  }
})
</script>

<style lang="scss" scoped>
.user-avatar {
  position: relative;
  display: inline-block;
}

.user-avatar:hover:after {
  content: '+';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  color: #eee;
  background: rgba(119, 118, 118, 0.5);
  font-size: 50px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  cursor: pointer;
  line-height: 115px;
  border-radius: 50%;
}

.avatar-upload-preview {
  position: absolute;
  top: 50%;
  transform: translate(20%, -50%);
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: 0 0 10px 1px $shadow;
  overflow: hidden;
}

.avatar-img-preview {
  position: absolute;
  top: 50%;
  transform: translate(25%, -50%);
  width: 180px;
  height: 180px;
  box-shadow: 0 0 10px 1px $shadow;
  overflow: hidden;
}
</style>
