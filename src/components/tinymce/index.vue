<!--
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-05-16 08:44:53
 * @LastEditors: Jianxin Gu
 * @LastEditTime: 2022-05-24 15:39:06
 * @Description: 富文本
-->
<template>
  <div class="tinymce-box" :style="{ width: width }">
    <Editor
      :id="id"
      v-model="content"
      :init="initOptions"
      :disabled="disabled"
    />
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue' //引入tinymce编辑器

import 'tinymce' //引入node_modules里的tinymce相关文件文件
import 'tinymce/themes/silver' //引入编辑器主题
import 'tinymce/icons/default' //引入编辑器图标icon
import 'tinymce/themes/mobile'

// 引入编辑器插件
import 'tinymce/plugins/advlist' //高级列表
import 'tinymce/plugins/anchor' //锚点
import 'tinymce/plugins/autolink' //自动链接
import 'tinymce/plugins/autoresize' //编辑器高度自适应,注：plugins里引入此插件时，Init里设置的height将失效
import 'tinymce/plugins/autosave' //自动存稿
import 'tinymce/plugins/charmap' //特殊字符
import 'tinymce/plugins/code' //编辑源码
import 'tinymce/plugins/codesample' //代码示例
import 'tinymce/plugins/directionality' //文字方向
import 'tinymce/plugins/emoticons' //表情
import 'tinymce/plugins/fullpage' //文档属性
import 'tinymce/plugins/fullscreen' //全屏
import 'tinymce/plugins/help' //帮助
import 'tinymce/plugins/hr' //水平分割线
import 'tinymce/plugins/image' //插入编辑图片
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/importcss' //引入css
import 'tinymce/plugins/insertdatetime' //插入日期时间
import 'tinymce/plugins/link' //超链接
import 'tinymce/plugins/lists' //列表插件
import 'tinymce/plugins/media' //插入编辑媒体
import 'tinymce/plugins/nonbreaking' //插入不间断空格
import 'tinymce/plugins/pagebreak' //插入分页符
import 'tinymce/plugins/paste' //粘贴插件
import 'tinymce/plugins/preview' //预览
import 'tinymce/plugins/print' //打印
import 'tinymce/plugins/quickbars' //快速工具栏
import 'tinymce/plugins/save' //保存
import 'tinymce/plugins/searchreplace' //查找替换
import 'tinymce/plugins/tabfocus' //切入切出，按tab键切出编辑器，切入页面其他输入框中
import 'tinymce/plugins/table' //表格
import 'tinymce/plugins/template' //内容模板
import 'tinymce/plugins/textcolor' //文字颜色
import 'tinymce/plugins/textpattern' //快速排版
import 'tinymce/plugins/toc' //目录生成器
import 'tinymce/plugins/visualblocks' //显示元素范围
import 'tinymce/plugins/visualchars' //显示不可见字符
import 'tinymce/plugins/wordcount' //字数统计

const defaultId = () =>
  'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')

export default {
  components: {
    Editor
  },
  props: {
    value: {
      type: String
    },
    id: {
      type: String,
      default: defaultId
    },
    menuBar: {
      type: String,
      default: 'file edit insert view format table tools'
    },
    placeholder: {
      type: String,
      default: '请输入文字...'
    },
    plugins: {
      type: [String, Array],
      default:
        'advlist anchor autolink autosave charmap code codesample directionality emoticons fullpage fullscreen help hr image imagetools insertdatetime link lists media nonbreaking pagebreak paste preview print save searchreplace tabfocus table template textpattern visualblocks visualchars wordcount'
    },
    toolBar: {
      type: [String, Array],
      default: [
        'searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent blockquote undo redo removeformat subscript superscript code codesample help',
        'hr bullist numlist link image charmap preview pagebreak insertdatetime media table emoticons charmap forecolor backcolor fullpage fullscreen'
      ]
    },
    disabled: {
      type: Boolean,
      default: false
    },
    resize: {
      type: Boolean,
      default: false
    },
    height: {
      type: String || Number,
      default: '500px'
    },
    width: {
      type: String,
      default: '100%'
    }
  },
  setup(props, context) {
    const initOptions = ref({
      selector: `#${props.id}`,
      height: props.height, //文本框高度 注：引入autoresize插件时，此属性失效
      language_url: '/tinymce/langs/zh-Hans.js', //引入语言包文件
      language: 'zh-Hans', //语言类型
      skin_url: '/tinymce/skins/ui/oxide', //皮肤：浅色  (主题)可选oxide-dark
      emoticons_database_url: '/tinymce/emojis.min.js', //更改表情插件路径
      plugins: props.plugins, //插件配置
      toolbar: props.toolBar, //工具栏配置，设为false则隐藏
      menubar: props.menuBar,
      menu: {
        file: {
          title: '文件',
          items:
            'newdocument restoredraft | preview | export print | deleteallconversations'
        },
        edit: {
          title: '编辑',
          items: 'undo redo | cut copy paste pastetext | searchreplace'
        },
        insert: {
          title: '插入',
          items:
            'image link media addcomment pageembed template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime'
        },
        view: {
          title: '视图',
          items:
            'visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments'
        },
        format: {
          title: '格式',
          items:
            'bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat'
        },
        table: {
          title: '表格',
          items:
            'inserttable | cell row column | advtablesort | tableprops deletetable'
        },
        tools: {
          title: '工具',
          items: 'spellcheckerlanguage | a11ycheck code wordcount'
        }
      },
      fontsize_formats:
        '12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 56px 72px', //字体大小
      font_formats:
        '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
      placeholder: props.placeholder,
      branding: false, //tiny技术支持信息是否显示
      elementpath: false, //元素路径是否显示
      content_css: '/tinymce/tinycontent.css', //以css文件方式自定义可编辑区域的css样式，css文件需自己创建并引入
      init_instance_callback: editor => {
        if (props.value) {
          editor.setContent(props.value)
        }
        editor.on('NodeChange Change KeyUp SetContent', () => {
          context.emit('update:value', editor.getContent())
        })
      },
      images_upload_handler: (blobInfo, success, failure) => {
        const img = 'data:image/jpeg;base64,' + blobInfo.base64()
        success(img)
      }
    })

    const tinymceData = reactive({
      content: props.value
    })

    const methods = reactive({})

    return {
      initOptions,
      ...toRefs(tinymceData),
      ...toRefs(methods)
    }
  }
}
</script>
