<template>
  <Dialog title="详情" v-model="dialogVisible" :scroll="true" :max-height="500" width="800">
    <el-descriptions border :column="1">
      <el-descriptions-item label="日志主键" min-width="120">
        {{ detailData.id }}
      </el-descriptions-item>
      <el-descriptions-item label="链路追踪">
        {{ detailData.traceId }}
      </el-descriptions-item>
      <el-descriptions-item label="应用名">
        {{ detailData.applicationName }}
      </el-descriptions-item>
      <el-descriptions-item label="用户编号">
        {{ detailData.userId }}
        <dict-tag :type="DICT_TYPE.USER_TYPE" :value="detailData.userType" />
      </el-descriptions-item>
      <el-descriptions-item label="用户 IP">
        {{ detailData.userIp }}
      </el-descriptions-item>
      <el-descriptions-item label="用户 UA">
        {{ detailData.userAgent }}
      </el-descriptions-item>
      <el-descriptions-item label="请求信息">
        {{ detailData.requestMethod }} {{ detailData.requestUrl }}
      </el-descriptions-item>
      <el-descriptions-item label="请求参数">
        {{ detailData.requestParams }}
      </el-descriptions-item>
      <el-descriptions-item label="异常时间">
        {{ formatDate(detailData.exceptionTime) }}
      </el-descriptions-item>
      <el-descriptions-item label="异常名">
        {{ detailData.exceptionName }}
      </el-descriptions-item>
      <el-descriptions-item label="异常堆栈" v-if="detailData.exceptionStackTrace">
        <el-input
          type="textarea"
          :readonly="true"
          :autosize="{ maxRows: 20 }"
          v-model="detailData.exceptionStackTrace"
        />
      </el-descriptions-item>
      <el-descriptions-item label="处理状态">
        <dict-tag
          :type="DICT_TYPE.INFRA_API_ERROR_LOG_PROCESS_STATE"
          :value="detailData.processStatus"
        />
      </el-descriptions-item>
      <el-descriptions-item label="处理人" v-if="detailData.processUserId">
        {{ detailData.processUserId }}
      </el-descriptions-item>
      <el-descriptions-item label="处理时间" v-if="detailData.processTime">
        {{ formatDate(detailData.processTime) }}
      </el-descriptions-item>
    </el-descriptions>
  </Dialog>
</template>
<script setup lang="ts">
import { DICT_TYPE } from '@/utils/dict'
import { formatDate } from '@/utils/formatTime'
import * as ApiErrorLog from '@/api/infra/apiErrorLog'

const dialogVisible = ref(false) // 弹窗的是否展示
const detailLoading = ref(false) // 表单的加载中
const detailData = ref() // 详情数据

/** 打开弹窗 */
const open = async (data: ApiErrorLog.ApiErrorLogVO) => {
  dialogVisible.value = true
  // 设置数据
  detailLoading.value = true
  try {
    detailData.value = data
  } finally {
    detailLoading.value = false
  }
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗
</script>
