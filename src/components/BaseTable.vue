<template>
  <div class="base-table-wrapper" style="margin-top: 20px;">
    <div v-if="searchText" style="margin-bottom: 5px;color: #8b8b8b;">
      {{ searchText }}
    </div>
    <el-table
      ref="table"
      :data="list"
      v-bind="{
        border: true,
        ...$attrs
      }"
      style="width: 100%"
      :header-cell-style="{
        ...($attrs.border === false ? {} : { background: '#E3EAF1' })
      }"
      :header-cell-class-name="() => 'changeTabelHeader'"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
      @cell-mouse-enter="hoverRow"
      @cell-mouse-leave="leaveRow"
      v-on="$listeners"
    >
      <el-table-column
        v-if="isSelection"
        type="selection"
        :fixed="selectionFixed"
        width="55"
        :selectable="selectable"
      />
      <el-table-column
        v-if="isIndex"
        label="序号"
        type="index"
        align="center"
        :fixed="indexFixed"
        width="55"
        :indexMethod="indexMethod"
      />
      <el-table-column
        v-for="(val, key) in column"
        :key="key"
        :prop="val.key"
        :label="val.label"
        :width="val.width"
        :align="val.align"
        :render-header="val.renderHeader"
        :fixed="val.fixed"
        :sortable="val.sortable"
      >
        <template slot-scope="scope">
          <div v-if="val.isRender">
            <slot
              :name="val.key"
              :row="scope.row"
              :index="key"
              v-bind="scope"
            ></slot>
          </div>
          <div v-else-if="val.content">{{ val.content(scope.row) }}</div>
          <div v-else :style="`color:${val.color}`">
            {{ scope.row[val.key] }}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="isPage" style="margin: 20px 0 10px;text-align:right">
      <el-pagination
        background
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    column: {
      type: Array,
      default: () => []
    },
    selectableAttribute: {
      // 属性名
      type: String,
      default: ''
    },
    selectableStatus: {
      // 条件
      type: Number,
      default: 0
    },
    list: {
      type: Array,
      default: () => []
    },
    total: {
      type: Number,
      default: 0
    },
    isPage: {
      type: Boolean,
      default: false
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 1
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 50]
    },
    isSelection: {
      type: Boolean,
      default: false
    },
    selectionFixed: {
      type: [String, Boolean],
      default: ''
    },
    isIndex: {
      type: Boolean,
      default: false
    },
    indexFixed: {
      type: [String, Boolean],
      default: ''
    },
    indexMethod: {
      type: Function,
      default: (index) => index + 1
    },
    tableData: {
      type: Array,
      default: () => []
    },
    searchText: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      selectArr: []
    }
  },
  methods: {
    sizeChange(val) {
      this.$emit('sizeChange', val)
    },
    currentChange(val) {
      this.$emit('currentChange', val)
    },
    handleSelectionChange(val) {
      this.selectArr = val
      this.$emit('checkedChange', val)
    },
    handleSortChange(column) {
      this.$emit('customSort', column)
    },
    hoverRow(row) {
      this.$emit('handleHover', row)
    },
    leaveRow(row) {
      this.$emit('handleLeave', row)
    },
    toggleRowSelection(list, type) {
      this.$nextTick(() => {
        Array.isArray(list)
          ? list.forEach((item) => {
              this.$refs.table.toggleRowSelection(item, type)
            })
          : this.$refs.table.toggleRowSelection(list, type)
      })
    },
    clearSelection() {
      this.$refs.table.clearSelection()
    },
    // 根据条件选择性禁用勾选
    selectable(row) {
      // false 禁用状态； true 非禁用状态
      return !(row[this.selectableAttribute] === this.selectableStatus)
    }
  }
}
</script>

<style lang="scss" scoped>
.base-table-wrapper {
  // margin-top: 20px;
  // ::v-deep .el-button--text {
  //   font-size: 14px;
  //   font-family: PingFangSC-Regular, PingFang SC;
  //   font-weight: 400;
  //   color: rgba(2, 119, 255, 1);
  // }
  // ::v-deep .el-table .cell {
  //   font-size: 14px;
  //   font-family: PingFangSC-Regular, PingFang SC;
  //   font-weight: 400;
  //   color: rgba(38, 38, 38, 1);
  // }
  // ::v-deep .el-table--border td:nth-last-child(1) {
  //   border-right: none;
  // }
  // ::v-deep .el-table--border td:nth-child(1) {
  //   border-left: none;
  // }
  // ::v-deep .el-table--border,
  // .el-table--group {
  //   border: none;
  // }
  // ::v-deep .el-table--border::after,
  // .el-table--group::after {
  //   width: 0px;
  //   background: none;
  // }
  // ::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
  //   background: rgba(245, 246, 248, 1);
  //   border-radius: 2px;
  //   font-size: 13px;
  //   font-family: PingFangSC-Regular, PingFang SC;
  //   font-weight: 400;
  //   color: rgba(2, 119, 255, 1);
  // }
  // ::v-deep .el-input__inner {
  //   background: rgba(244, 248, 251, 1);
  //   border-radius: 2px;
  //   font-size: 13px;
  //   font-family: PingFangSC-Regular, PingFang SC;
  //   font-weight: 400;
  //   color: rgba(38, 38, 38, 1);
  //   border: none;
  // }
}
</style>
