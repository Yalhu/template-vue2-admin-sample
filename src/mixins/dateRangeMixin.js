// const startDate = new Date().toLocaleDateString();
// const endDate = startDate.setTime((new Date(startDate)).getTime() + 3600 * 1000 * 24 * 7);
// import moment from "moment";
export default {
  data() {
    return {
      timeFormat: 'yyyy-MM-dd',
      timeRange: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  created() {
    // this.changeTimeRange(-7);
  },
  methods: {
    changeTimeRange(day) {
      const date = new Date().toLocaleDateString()
      const end = new Date(date)
      end.setTime(end.getTime() + 3600 * 1000 * 24)
      const start = new Date(end)
      start.setTime(start.getTime() + 3600 * 1000 * 24 * day)

      this.timeRange = [start, end]
    }
  }
}
