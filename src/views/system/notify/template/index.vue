<template>
  <ContentWrap>
    <!-- 列表 -->
    <XTable @register="registerTable">
      <template #toolbar_buttons>
        <!-- 操作：新增 -->
        <XButton
          type="primary"
          preIcon="ep:zoom-in"
          :title="t('action.add')"
          v-hasPermi="['system:notify-template:create']"
          @click="handleCreate()"
        />
      </template>
      <template #actionbtns_default="{ row }">
        <!-- 操作：测试站内信 -->
        <XTextButton
          preIcon="ep:cpu"
          :title="t('action.test')"
          v-hasPermi="['system:notify-template:send-notify']"
          @click="handleSendNotify(row)"
        />
        <!-- 操作：修改 -->
        <XTextButton
          preIcon="ep:edit"
          :title="t('action.edit')"
          v-hasPermi="['system:notify-template:update']"
          @click="handleUpdate(row.id)"
        />
        <!-- 操作：详情 -->
        <XTextButton
          preIcon="ep:view"
          :title="t('action.detail')"
          v-hasPermi="['system:notify-template:query']"
          @click="handleDetail(row.id)"
        />
        <!-- 操作：删除 -->
        <XTextButton
          preIcon="ep:delete"
          :title="t('action.del')"
          v-hasPermi="['system:notify-template:delete']"
          @click="deleteData(row.id)"
        />
      </template>
    </XTable>
  </ContentWrap>

  <!-- 添加/修改的弹窗 -->
  <Dialog id="templateModel" :loading="modelLoading" v-model="dialogVisible" :title="dialogTitle">
    <!-- 表单：添加/修改 -->
    <Form
      ref="formRef"
      v-if="['create', 'update'].includes(actionType)"
      :schema="allSchemas.formSchema"
      :rules="rules"
    />
    <!-- 表单：详情 -->
    <Descriptions
      v-if="actionType === 'detail'"
      :schema="allSchemas.detailSchema"
      :data="detailData"
    />
    <template #footer>
      <!-- 按钮：保存 -->
      <XButton
        v-if="['create', 'update'].includes(actionType)"
        type="primary"
        :title="t('action.save')"
        :loading="actionLoading"
        @click="submitForm()"
      />
      <!-- 按钮：关闭 -->
      <XButton :loading="actionLoading" :title="t('dialog.close')" @click="dialogVisible = false" />
    </template>
  </Dialog>

  <!-- 测试站内信的弹窗 -->
  <Dialog id="sendTest" v-model="sendVisible" title="测试">
    <el-form :model="sendForm" :rules="sendRules" label-width="200px" label-position="top">
      <el-form-item label="模板内容" prop="content">
        <el-input type="textarea" v-model="sendForm.content" readonly />
      </el-form-item>
      <el-form-item label="接收人" prop="userId">
        <el-select v-model="sendForm.userId" placeholder="请选择接收人">
          <el-option
            v-for="item in userOption"
            :key="item.id"
            :label="item.nickname"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-for="param in sendForm.params"
        :key="param"
        :label="'参数 {' + param + '}'"
        :prop="'templateParams.' + param"
      >
        <el-input
          v-model="sendForm.templateParams[param]"
          :placeholder="'请输入 ' + param + ' 参数'"
        />
      </el-form-item>
    </el-form>
    <!-- 操作按钮 -->
    <template #footer>
      <XButton
        type="primary"
        :title="t('action.test')"
        :loading="actionLoading"
        @click="sendTest()"
      />
      <XButton :title="t('dialog.close')" @click="sendVisible = false" />
    </template>
  </Dialog>
</template>
<script setup lang="ts" name="SystemNotifyTemplate">
import { FormExpose } from '@/components/Form'
// 业务相关的 import
import { rules, allSchemas } from './template.data'
import * as NotifyTemplateApi from '@/api/system/notify/template'
import { getSimpleUserList, UserVO } from '@/api/system/user'

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

// 列表相关的变量
const [registerTable, { reload, deleteData }] = useXTable({
  allSchemas: allSchemas,
  getListApi: NotifyTemplateApi.getNotifyTemplatePageApi,
  deleteApi: NotifyTemplateApi.deleteNotifyTemplateApi
})

// 弹窗相关的变量
const dialogVisible = ref(false) // 是否显示弹出层
const dialogTitle = ref('edit') // 弹出层标题
const modelLoading = ref(false) // 弹出层loading
const actionType = ref('') // 操作按钮的类型
const actionLoading = ref(false) // 按钮 Loading
const formRef = ref<FormExpose>() // 表单 Ref
const detailData = ref() // 详情 Ref

// 设置标题
const setDialogTile = (type: string) => {
  modelLoading.value = true
  dialogTitle.value = t('action.' + type)
  actionType.value = type
  dialogVisible.value = true
}

// 新增操作
const handleCreate = () => {
  setDialogTile('create')
  modelLoading.value = false
}

// 修改操作
const handleUpdate = async (rowId: number) => {
  setDialogTile('update')
  // 设置数据
  const res = await NotifyTemplateApi.getNotifyTemplateApi(rowId)
  unref(formRef)?.setValues(res)
  modelLoading.value = false
}

// 详情操作
const handleDetail = async (rowId: number) => {
  setDialogTile('detail')
  const res = await NotifyTemplateApi.getNotifyTemplateApi(rowId)
  detailData.value = res
  modelLoading.value = false
}

// 提交按钮
const submitForm = async () => {
  const elForm = unref(formRef)?.getElFormRef()
  if (!elForm) return
  elForm.validate(async (valid) => {
    if (valid) {
      actionLoading.value = true
      // 提交请求
      try {
        const data = unref(formRef)?.formModel as NotifyTemplateApi.NotifyTemplateVO
        if (actionType.value === 'create') {
          await NotifyTemplateApi.createNotifyTemplateApi(data)
          message.success(t('common.createSuccess'))
        } else {
          await NotifyTemplateApi.updateNotifyTemplateApi(data)
          message.success(t('common.updateSuccess'))
        }
        dialogVisible.value = false
      } finally {
        actionLoading.value = false
        // 刷新列表
        await reload()
      }
    }
  })
}

// ========== 测试相关 ==========
const sendForm = ref({
  content: '',
  params: {},
  userId: 0,
  templateCode: '',
  templateParams: {}
})
const sendRules = ref({
  userId: [{ required: true, message: '用户编号不能为空', trigger: 'blur' }],
  templateCode: [{ required: true, message: '模版编号不能为空', trigger: 'blur' }],
  templateParams: {}
})
const sendVisible = ref(false)
const userOption = ref<UserVO[]>([])

const handleSendNotify = (row: any) => {
  sendForm.value.content = row.content
  sendForm.value.params = row.params
  sendForm.value.templateCode = row.code
  sendForm.value.templateParams = row.params.reduce(function (obj, item) {
    obj[item] = undefined
    return obj
  }, {})
  sendRules.value.templateParams = row.params.reduce(function (obj, item) {
    obj[item] = { required: true, message: '参数 ' + item + ' 不能为空', trigger: 'change' }
    return obj
  }, {})
  sendVisible.value = true
}

const sendTest = async () => {
  const data: NotifyTemplateApi.NotifySendReqVO = {
    userId: sendForm.value.userId,
    templateCode: sendForm.value.templateCode,
    templateParams: sendForm.value.templateParams as unknown as Map<string, Object>
  }
  const res = await NotifyTemplateApi.sendNotifyApi(data)
  if (res) {
    message.success('提交发送成功！发送结果，见发送日志编号：' + res)
  }
  sendVisible.value = false
}

// ========== 初始化 ==========
onMounted(() => {
  getSimpleUserList().then((data) => {
    userOption.value = data
  })
})
</script>
