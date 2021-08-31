/**
 * @file 表格公用混入
 * @author liuwenlong2
 */
import BaseTable from '@comp/BaseTable'

const PAGE_SIZE_ARR = [10, 50, 100, 200]

export default {
  components: {
    BaseTable
  },
  data() {
    return {
      // 表格选数据
      list: [],
      // 表格选中项
      listSelected: [],
      // 数据总条数
      listTotal: 0,
      // 当前页码
      currentPage: 1,
      // 展示条数数组
      pageSizes: [...PAGE_SIZE_ARR],
      // 每页显示条目个数
      pageSize: PAGE_SIZE_ARR[0]
    }
  },
  methods: {
    // 每页条数改变
    sizeChange(page) {
      this.pageSize = page
      this.getList()
    },
    // 每页展示数量改变
    currentChange(page) {
      this.currentPage = page
      this.getList()
    }
  }
}
