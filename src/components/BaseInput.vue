<!--
 * @Author: your name
 * @Date: 2020-08-18 20:49:19
 * @LastEditTime: 2020-08-19 11:06:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->
<template functional>
  <el-col
    :span="props.span"
    :class="[
      'base-input-wrapper',
      { 'base-input-wrapper-inline': props.mode === 'inline' }
    ]"
  >
    <span class="base-input-wrapper-title">{{ props.title }}</span>
    <slot></slot>
  </el-col>
</template>

<script>
export default {
  name: 'BaseInput'
}
</script>

<style scoped lang="scss">
.base-input-wrapper {
  display: flex;
  flex-direction: column;
  // align-items: center;
  ::v-deep .el-input,
  .el-date-editor {
    width: 100%;
  }
  ::v-deep .el-date-editor {
    width: 100% !important;
  }
  &-title {
    padding: 0 4px 2px;
    color: #555;
    font-size: 14px;
  }
  &-inline {
    flex-direction: row;

    .base-input-wrapper-title {
      display: inline-block;
      // 和 el-form-item label 保持一致
      width: 150px;
      padding-right: 12px;
      font-size: 14px;
      font-weight: 700;
      color: #606266;
      line-height: 40px;
    }
  }
}
</style>
