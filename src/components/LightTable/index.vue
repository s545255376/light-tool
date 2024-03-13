<template>
  <div class="table">
    <div class="table-container custom-table" :style="`max-height: ${tableHeight}px`" v-resize="tableResize">
      <table>
        <thead>
        <tr>
          <th v-for="(column, index) in header" :key="column.label" class="header-column" :style="getThStyle(column)">
            <div class="header-box" :style="getStyle(column)">
              {{ column.label }}
              <!--            <el-tooltip className="item" effect="dark"-->
              <!--                        :content="column.hover" placement="top"-->
              <!--                        :visible-arrow="false"-->
              <!--                        popper-class="ct-tooltip"-->
              <!--                        v-if="column.hover"-->
              <!--            >-->
              <!--              <svg-icon icon-class="info"-->
              <!--                        style="width: 12px;height:12px; display: inline;margin-left: 4px;cursor:pointer;"/>-->
              <!--            </el-tooltip>-->
            </div>
          </th>
        </tr>
        </thead>
        <tbody>
        <template v-if="data.length > 0">
          <template v-for="(row, idx) in data">
            <tr>
              <td v-for="(item, index) in header" :key="item.label"
                  :class="`${item.fixed ? 'data-column boxShadow' : 'data-column' }`" :style="getTdStyle(item)">
                <div class="data-box" :style="getStyle(item, false)"
                     :data-title="showEmpty(item.func ? item.func(row[item.key]) : row[item.key], item.empty ? item.empty : '-')"
                     @mouseenter="enterToolTip"
                     @mouseleave="leaveToolTip"
                >
                  <div class="ellipsis">
                    <template v-if="item.type === 'expand'">
                      <div @click="clickExpand(idx)" class="expand-icon">
                          <i class="iconfont icon-xia" v-if="expandList.indexOf(idx) > -1"/>
                          <i class="iconfont icon-right" v-else/>
                      </div>
                    </template>
                    <template v-else>
                      <slot
                          v-if="item.slot"
                          :name="item.prop"
                          :row="row"
                          :$index="index"
                      ></slot>
                      <span class="padding9" v-else>
                        {{
                          showEmpty(item.func ? item.func(row[item.key]) : row[item.key], item.empty ? item.empty : '-')
                        }}
                        </span>
                    </template>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-show="expandList.indexOf(idx) > -1">
              <td :colspan="header.length" style="position: relative; ">
                <div style="overflow: auto; " class="expand-table">
                  <slot
                      name="expand"
                      :row="row"
                  ></slot>
                </div>
              </td>
            </tr>
          </template>
        </template>
        <template v-else>
          <tr>
            <td :colspan="header.length" class="empty-td" align="center">
              暂无数据
            </td>
          </tr>
        </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LightTable',
  props: {
    border: {
      type: Boolean,
      default: false
    },
    align: {
      type: String,
      default: "left"
    },
    total: {
      type: Number,
      default: 0
    },
    rowKey: {
      type: String,
      default: ""
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    fixHeight: {
      type: Boolean,
      default: true
    },
    header: {
      type: Array,
      default: () => {
        return []
      }
    },
    params: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  data() {
    return {
      tableHeight: 999999999,
      expandList: [],
      ob: null
    }
  },
  watch: {
    params: {
      handler(val, old) {
        this.expandList = []
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    // if (this.fixHeight) {
    //   let el = document.getElementsByClassName("custom-table")[0]
    //   // 创建监听器
    //   let ob = new MutationObserver(entries => {
    //     this.setTableHeight()
    //   })
    //   // 监听元素变化
    //   ob.observe(el, {attributes: true, subtree: false})
    //   this.setTableHeight()
    // }
  },
  destroyed() {
    this.ob && this.ob.disconnect()
  },
  deactivated() {
    this.ob && this.ob.disconnect()
  },
  directives: {
    'resize': { // 指令的名称
      bind(el, binding) { // el为绑定的元素，binding为绑定给指令的对象
        const resizeObserver = new ResizeObserver(entries => {
          for (let entry of entries) {
            binding.value(entry.contentRect, entry.target);
          }
        });
        resizeObserver.observe(el)
      },
      unbind(el) {

      }
    }
  },
  methods: {
    enterToolTip(el) {
      let child = el.target.children[0]
      if (child.scrollWidth !== child.clientWidth) {
        el.target.classList.add("tip")
      }
    },
    leaveToolTip(el) {
      el.target.classList.remove("tip")
    },
    tableResize: (v, tableOuter) => {
      let el = tableOuter.children[0]
      // console.log(v, el)
      let tableInner = el.getElementsByClassName("expand-table")
      // console.log(tableOuter)
      for (let i = 0; i < tableInner.length; i++) {
        tableInner[i].style.width = `${tableOuter.clientWidth}px`
      }

      let left = 0
      let that = this
      let scl = 0

      tableOuter.addEventListener("scroll", function (e) {

        // 判断是否是x轴滚动， y轴滚动不处理
        if (e.target.scrollLeft === scl) {
          return
        }
        scl = e.target.scrollLeft

        let tableInner = e.target.getElementsByClassName("expand-table")
        for (let i = 0; i < tableInner.length; i++) {
          let scrollLeft = e.target.scrollLeft
          if (isXScrollAtBottom(tableOuter)) {
            if (left === 0) left = scrollLeft
            scrollLeft = left
          }
          tableInner[i].style.transform = `translateX(${scrollLeft}px)`
          tableInner[i].style.width = `${tableOuter.clientWidth}px`
        }

        // 表格下的boxShadow 阴影消失
        let nodeList = []
        if (e.target.parentNode.parentNode.parentNode.parentNode.classList.contains("expand-table")) { // 第二层
          nodeList = e.target.querySelectorAll(".boxShadow")
        } else { // 第一层
          nodeList = e.target.querySelectorAll(".boxShadow:not(.expand-table .boxShadow)")
        }

        // 添加固定列的阴影
        for (let i = 0; i < nodeList.length; i++) {
          nodeList[i].classList.add('boxShadow2')
          if (isXScrollAtBottom(e.target)) {
            nodeList[i].classList.remove("boxShadow2")
          }
        }
      })

      function isXScrollAtBottom(scrollElement) {
        // 获取水平滚动条的位置
        let scrollLeft = scrollElement.scrollLeft;

        // 获取元素的总宽度
        let elementWidth = scrollElement.scrollWidth;

        // 获取元素的可见宽度
        let elementVisibleWidth = scrollElement.clientWidth;

        // 判断是否滚动到底部
        return (scrollLeft + elementVisibleWidth) >= elementWidth;
      }

      function existScroll(scrollDom) {
        return scrollDom.scrollWidth !== scrollDom.clientWidth;

      }

      let nodeList = el.querySelectorAll(".boxShadow:not(.expand-table .boxShadow)") // 第一层
      try {
        if (el.parentNode.parentNode.parentNode.parentNode.parentNode.classList.contains("expand-table")) { // 第二层
          nodeList = el.querySelectorAll(".boxShadow")
        }
      } catch (e) {

      }
      // 添加固定列的阴影
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].classList.remove('boxShadow2')
        if (existScroll(el.parentNode)) {
          nodeList[i].classList.add("boxShadow2")
        }
      }

    },
    noShowTip(obj) {
      // console.log(obj.target.scrollWidth, obj.target.offsetWidth)
    },
    clickExpand(idx) {
      if (this.expandList.indexOf(idx) > -1) {
        this.expandList = this.expandList.filter(item => {
          return item !== idx
        })
      } else {
        this.expandList.push(idx)
      }
    },
    getStyle(item, header = true) {
      let style = {}
      let align = "flex-start";
      if (item.align === "center") {
        align = "center"
      } else if (item.align === "right") {
        align = "flex-end"
      }
      if (header) {
        style.justifyContent = align
      } else {
        style.alignItems = align
      }
      if (item.width) {
        if (!item.tip) {
          style.whiteSpace = "unset"
          style.width = item.width + "px"
        }
      }
      return style
    },
    getThStyle(item) {
      let style = {
        whiteSpace: "nowrap"
      }
      if (item.fixed) {
        style.position = "sticky"
        style.zIndex = 2
        style.opacity = 1
        if (item.fixed === "right") {
          style.right = 0
        } else {
          style.left = 0
        }
      }

      return style
    },
    getTdStyle(item) {
      let style = {
        whiteSpace: "nowrap",
        textAlign: "left"
      }
      if (item.fixed) {
        style.position = "sticky"
        style.zIndex = 1
        style.opacity = 1
        if (item.fixed === "right") {
          style.right = 0
        } else {
          style.left = 0
        }
      }
      if (item.width) {
        if (!item.tip) {
          style.whiteSpace = "unset"
          style.width = item.width + "px"
        }else {
          style.maxWidth = item.width + "px"
        }
      } else {
        if (item.tip) {
          style.maxWidth = "100px"
        }
      }
      if (item.align) {
        style.textAlign = item.align
      }
      return style
    },
    showEmpty(v, empty = "-") {
      return this.empty(v) && v !== 0 ? empty : v
    },
    empty(v){
      return !v || (Array.prototype.isPrototypeOf(v) && v.length === 0) || (Object.prototype.isPrototypeOf(v) && Object.keys(v).length === 0)
    }
  }
}
</script>

<style scoped lang="less">
@import "./icon.css";
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.tip {
  position: relative;
}

.tip::before {
  font-size: 12px;
  content: attr(data-title);
  position: absolute;
  left: 0;
  bottom: 100%;
  visibility: visible;
  z-index: 3;
  background-color: rgba(0, 0, 0, .7);
  color: white;
  padding: 8px;
  border-radius: 4px;
}

.expand-table {
  .table {
    background-color: #F8F8FA;
    border-radius: 0;
    z-index: 1;
    position: relative;
  }

  .header-column {
    background-color: #EAF3FF !important;
  }

  th {
    //position:unset !important;
  }
}

.table {

  overflow: auto;
  background-color: white;
  border-radius: 8px;
  //width: fit-content;
  width: 100%;

  .header {
    height: 10px;
  }

  .padding {
    padding: 0 20px 10px 20px;

    .empty {
      width: 294px;
      margin-top: 42px;;
    }
  }

  .custom-table {
    .empty-td {
      height: 46px;
      box-shadow: inset 0px 0px 0px 0px #F0F0F0;
      font-size: 15px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.2);
    }

    /deep/ .el-button {
      font-weight: 400;
      font-size: 14px;
    }

    .raw {
      width: 100%;
      display: flex;
    }

    .column {
      //flex: 1;
    }

    .header-column {
      padding: 0 16px;
      background-color: #EEF0F3;
      font-size: 12px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      height: 40px;
      line-height: 40px;

      .header-box {
        display: flex;
        align-items: center;
      }
    }

    .header-column:first-child {
      padding-left: 32px;
    }

    .header-column:last-child {
      padding-right: 32px;
    }

    .boxShadow2::after {
      box-shadow: rgba(5,5,5,0.06) -10px 0 8px -8px inset;
    }

    .boxShadow::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 30px;
      height: 100%;
      //box-shadow: rgba(5,5,5,0.06) -10px 0 8px -8px inset;
      transform: translateX(-100%);
      content: "";
      pointer-events: none;
    }

    .data-column {
      padding: 13px 16px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.88);
      line-height: 22px;

      .data-box {
        display: flex;
        flex-direction: column;
      }
    }

    .data-column:first-child {
      padding-left: 32px;
    }

    .data-column:last-child {
      padding-right: 32px;
    }

    .expand-icon {
      cursor: pointer;
    }
  }

  .table-container {
    max-width: 100%;
    overflow-x: auto;
    //width: fit-content;
    width: 100%;
  }

  table {
    table-layout: auto;
    //width: fit-content;
    width: 100%;
    border-collapse: collapse;

    tr {
      border-bottom: 1px solid #F0F0F0;
    }
  }

  th, td {
    /*padding: 8px;*/
    /*min-width: 100px;*/
    word-break: break-word;
    border: none;
    background-color: white;
  }

  td:last-child, th:last-child {
    //position:sticky;
    //right:0; /* 首行永远固定在左侧 */
    //z-index:1;
    //opacity: 1;
    /*width: 100px;*/
  }

  thead tr th {
    position: sticky;
    top: 0; /* 列首永远固定在头部  */
    z-index: 2;
  }

  th:last-child {
    //z-index:2;
    //opacity: 1;
  }
}
</style>