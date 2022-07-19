/*
 * @Author: Jianxin Gu a18602467506@163.com
 * @Date: 2022-05-05 21:47:10
 * @LastEditors: Jianxin Gu a18602467506@163.com
 * @LastEditTime: 2022-05-08 22:30:23
 * @Description: 弹出框
 */

import { ElMessageBox } from 'element-plus'
import { createVNode, h } from 'vue'

export default {
  info: data => {
    // Modal.info({
    //   title: () => (data && data.title) || '提示',
    //   content: () => {
    //     if (data && data.content) {
    //       return h(
    //         'div',
    //         { style: 'padding:20px 20px 0 20px;font-size:20px' },
    //         [h('span', data.content)]
    //       )
    //     }
    //   }
    // })
  },
  success: data => {
    // Modal.success({
    //   title: () => (data && data.title) || '提示',
    //   content: () => {
    //     if (data && data.content) {
    //       return h(
    //         'div',
    //         { style: 'padding:20px 20px 0 20px;font-size:20px' },
    //         [h('span', data.content)]
    //       )
    //     }
    //   }
    // })
  },
  error: data => {
    // Modal.error({
    //   title: () => (data && data.title) || '提示',
    //   content: () => {
    //     if (data && data.content) {
    //       return h(
    //         'div',
    //         { style: 'padding:20px 20px 0 20px;font-size:20px' },
    //         [h('span', data.content)]
    //       )
    //     }
    //   }
    // })
  },
  warning: data => {
    // Modal.warning({
    //   title: () => (data && data.title) || '提示',
    //   content: () => {
    //     if (data && data.content) {
    //       return h(
    //         'div',
    //         { style: 'padding:20px 20px 0 20px;font-size:20px' },
    //         [h('span', data.content)]
    //       )
    //     }
    //   }
    // })
  },
  confirm: msgbox => {
    const handleOk = () => {
      const res = new Promise(async (resolve, reject) => {
        return msgbox.onOk(resolve)
      })
      return res
    }
    return ElMessageBox({
      title: msgbox.title || '提示',
      message: h('div', { style: 'font-size:18px' }, [
        h('span', msgbox.content)
      ]),
      type: 'warning',
      showCancelButton: true,
      beforeClose: (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true
          instance.confirmButtonText = 'Loading...'
          handleOk().then(() => {
            instance.confirmButtonLoading = false
            done()
          })
        } else {
          done()
        }
      }
    })
  },
  del: data => {
    // Modal.confirm({
    //   title: () => (data && data.title) || '提示',
    //   icon: () => createVNode(ExclamationCircleOutlined),
    //   content: () => {
    //     if (data && data.content) {
    //       return h(
    //         'div',
    //         { style: 'padding:20px 20px 0 20px;font-size:20px' },
    //         [h('span', data.content)]
    //       )
    //     } else {
    //       return h(
    //         'div',
    //         { style: 'padding:20px 20px 0 20px;font-size:20px' },
    //         [h('span', '确认是否删除!')]
    //       )
    //     }
    //   },
    //   onOk: () => {
    //     return new Promise(async (resolve, reject) => {
    //       return data.onOk(resolve)
    //     }).catch(() => console.log('error!'))
    //   },
    //   okType: 'danger'
    // })
  }
}
