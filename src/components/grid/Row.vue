<template>
  <div :style="style" :class="classList"><slot></slot></div>
</template>
<script>
export default {
  props: {
    gutter: {
      type: Number
    },
    type: {
      type: String,
      default: 'flex'
    },
    justify: {
      type: String,
      default: 'start'
    },
    align: {
      type: String,
      default: 'top'
    }
  },
  computed: {
    style() {
      const ret = {}
      if (this.gutter) {
        ret.marginLeft = `-${this.gutter / 2}px`
        ret.marginRight = ret.marginLeft
      }
      return ret
    },
    classList() {
      return [
        'row',
        this.justify !== 'start' ? `is-justify-${this.justify}` : '',
        this.align !== 'top' ? `is-align-${this.align}` : '',
        { 'row--flex': this.type === 'flex' }
      ]
    }
  }
}
</script>

<style>
.row {
  position: relative;
  box-sizing: border-box;
}
.row:after,
.row:before {
  display: table;
  content: '';
}
.row:after {
  clear: both;
}
.row--flex {
  display: flex;
}
.row--flex:after,
.row--flex:before {
  display: none;
}
.row--flex.is-justify-center {
  justify-content: center;
}
.row--flex.is-justify-end {
  justify-content: flex-end;
}
.row--flex.is-justify-space-between {
  justify-content: space-between;
}
.row--flex.isz-justify-space-around {
  justify-content: space-around;
}
.row--flex.is-align-middle {
  align-items: center;
}
.row--flex.is-align-bottom {
  align-items: flex-end;
}
</style>
