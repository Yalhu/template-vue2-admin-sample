<template>
  <div class="demo-list">
    <div class="page-filter">
      <el-row :gutter="12" style="margin-left:0;">
        <el-button type="primary" icon="iconfont el-icon-plus"
          >添加数据</el-button
        >
        <el-upload
          style="display: inline-block;margin-left: 12px"
          action="/activity/tian/mao/uploadOrderExcel"
          :http-request="uploadFile"
          :before-upload="beforeFileUpload"
          :show-file-list="false"
          :accept="
            xlsFileType
              .reduce(
                (total, val) => `${total},.${val},.${val.toLocaleUpperCase()}`,
                ''
              )
              .slice(1)
          "
        >
          <el-button icon="el-icon-upload2">上传表格</el-button>
        </el-upload>
      </el-row>
      <el-row :gutter="12" style="margin-top: 20px;">
        <base-input :span="6" title="用户手机号">
          <el-input v-model="phone" clearable placeholder="请输入" />
        </base-input>
        <base-input :span="6" title="来源订单号">
          <el-input v-model="schoolId" clearable placeholder="请输入" />
        </base-input>
        <base-input :span="6" title="商品名称">
          <el-input v-model="schoolName" clearable placeholder="请输入" />
        </base-input>
        <base-input :span="6" title="植课状态">
          <el-select v-model="schoolStatus" placeholder="请选择">
            <el-option
              v-for="(value, key) in schoolStatusMap"
              :key="key"
              :label="value"
              :value="+key"
            />
          </el-select>
        </base-input>
      </el-row>
      <el-row :gutter="12" style="margin-top: 10px;">
        <base-input :span="6" title="导流课结课时间">
          <el-date-picker
            ref="datePicker"
            v-model="timeRange"
            type="daterange"
            align="right"
            size="middle"
            :format="timeFormat"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          />
        </base-input>
        <el-col :span="18" style="margin-top: 18px;text-align:right;">
          <!-- <el-button icon="el-icon-download" @click="downExcel">下载</el-button> -->
          <el-button icon="el-icon-delete" @click="resetFilter">重置</el-button>
          <el-button
            icon="iconfont el-icon-search"
            type="primary"
            @click="filterSubmit"
            >筛选</el-button
          >
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="12" style="margin-top: 0">
      <el-col :span="24" style="margin-top: 22px;text-align:right;">
        <el-button
          size="middle"
          :disabled="listSelected.length < 1"
          @click="handleClick('执行选中后操作')"
          >批量操作</el-button
        >
      </el-col>
    </el-row>
    <base-table
      style="margin-top: 0"
      :list="list"
      :search-text="listTotal > 0 ? `共搜索到${listTotal}条数据` : ''"
      :column="column"
      :is-selection="true"
      :is-index="true"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :total="listTotal"
      :current-page="currentPage"
      :is-page="true"
      :selection-fixed="true"
      :index-fixed="true"
      @sizeChange="sizeChange"
      @currentChange="currentChange"
      @selection-change="handleSelectTable"
    >
      <template slot="id" slot-scope="{ row }">
        <router-link :to="`./schoolDetail?schoolId=${row.id}`">
          <el-link type="primary">{{ row.id }}</el-link>
        </router-link>
      </template>
      <template slot="status" slot-scope="{ row }">
        <span :style="{ color: row.status === 22 ? '#0f0' : '#f00' }">{{
          row.status === 22 ? '启用' : '禁用'
        }}</span>
      </template>
      <template #operate="{row}">
        <el-button size="mini" @click="handleClick(`操作A-${row.id}`)"
          >操作A</el-button
        >
        <el-button type="danger" size="mini" @click="dealItem(`操作B-${row.id}`)"
          >删除</el-button
        >
      </template>
    </base-table>
  </div>
</template>
<script>
import BaseInput from '@comp/BaseInput'
import tableMixin from '@mixin/tableMixin'
import dateRangeMixin from '@mixin/dateRangeMixin'

import { getSchoolList, uploadFile } from '@api/demo'

export default {
  name: 'DemoList',
  props: {},
  components: {
    BaseInput
  },
  mixins: [dateRangeMixin, tableMixin],
  data() {
    return {
      schoolStatusMap: {
        22: '启用',
        23: '禁止'
      },
      schoolId: '',
      phone: '',
      schoolName: '',
      schoolStatus: '',
      sourceCode: '',
      xlsFileType: ['xls', 'csv', 'xlsx'],
      column: [
        {
          label: 'id',
          width: 150,
          fixed: true,
          align: 'center',
          key: 'id',
          isRender: true
        },
        {
          label: '年级',
          align: 'center',
          key: 'grade'
        },
        {
          label: '班级',
          align: 'center',
          key: 'class'
        },
        {
          label: '数量',
          align: 'center',
          key: 'monthNum'
        },
        {
          label: '状态',
          align: 'center',
          key: 'status',
          isRender: true
        },
        {
          label: '操作',
          align: 'center',
          key: 'operate',
          isRender: true
        }
      ]
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.getList()
  },
  methods: {
    handleClick(value) {
      alert(`alert click  ${value}`)
    },
    async dealItem(data, index) {
      const _res = await this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => 'cancel')
      if(_res === 'cancel') return
      // await delApi({ id: data.id })
      this.$message.success('删除成功')
      this.list.splice(index, 1)
    },
    handleSelectTable(data) {
      this.listSelected = data
    },
    // 获取列表数据时参数
    async getParams() {
      const { phone, schoolName, schoolStatus } = this
      let { orderEntryStatus } = this
      await this.$nextTick()
      const [beginTime, endTime] = this.$refs.datePicker.displayValue || [
        '',
        ''
      ]
      return {
        phone,
        schoolName,
        orderEntryStatus,
        schoolStatus,
        beginTime,
        endTime
      }
    },
    // 获取列表数据
    async getList() {
      const params = await this.getParams()
      const { data = {} } = await getSchoolList({
        limit: this.pageSize,
        cursor: this.currentPage,
        ...params
      }).catch((e) => console.log('getList err', e))

      this.listTotal = data.totalNum
      this.list = data.list || []
    },
    filterSubmit() {
      this.currentPage = 1
      this.getList()
    },
    resetFilter() {
      this.currentPage = 1
      this.phone = ''
      this.getList()
    },
    downExcel() {
      alert('下载文件')
    },
    // 上传文件（天猫订单）
    async uploadFile(e) {
      const formData = new FormData()
      formData.append('file', e.file)
      const { data = [] } = await uploadFile(formData)
      if (!data[0]) return this.$message.success('上传成功')
      this.dialogProps.isVisible = true
      this.orderUploadResult = data
    },
    beforeFileUpload(file) {
      const fileType = file.name.substr(file.name.lastIndexOf('.') + 1)
      if (this.xlsFileType.includes(fileType.toLocaleLowerCase())) return true
      this.$message.warning('请上传从淘宝联盟后台下载的Excel原表格')
      return false
    }
  }
}
</script>
<style lang="scss" scoped>
// .demo-list{

// }
</style>
