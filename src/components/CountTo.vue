<template>
  <div class="base-count-to">
    <div class="base-count-to-title">
      {{ title }} <span><slot></slot></span>
    </div>
    <div class="base-count-to-num">
      <count-to :start-val="start" :end-val="to" :duration="duration" />
      <span class="base-count-to-info"><slot name="info"></slot></span>
    </div>
  </div>
</template>

<script>
import countTo from "vue-count-to";
export default {
  name: "Basecount-to",
  components: {
      countTo
  },
  props: {
    title: {
      type: String,
      default: "数量"
    },
    start: {
      type: Number,
      default: 0
    },
    to: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 1000
    }
  }
};
</script>

<style scoped lang="scss">
.base-count-to {
  // width: 100%;
  min-width: 100px;
  // height: 80px;
  // margin-right: 20px;
  // background: #eee;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  justify-content: space-around;
  font-size: 16px;
  line-height: 16px;
  box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.06);
  :hover{
  }
  &-title {
    order: 1;
    padding: 10px 0;
    span{
      font-size: 12px;
    }
  }
  &-num {
    order: 2;
    font-size: 20px;
    font-weight: 500;
  }
  &-info {
    // font-size: 12px;
  }
}
</style>
