<template>
  <div>
    <div class="text-center">
      <UserAvatar :img="userInfo?.avatar" />
    </div>
    <ul class="list-group list-group-striped">
      <li class="list-group-item">
        <Icon icon="ep:user" class="mr-5px" />{{ t('profile.user.username') }}
        <div class="pull-right">{{ userInfo?.username }}</div>
      </li>
      <li class="list-group-item">
        <Icon icon="ep:phone" class="mr-5px" />{{ t('profile.user.mobile') }}
        <div class="pull-right">{{ userInfo?.mobile }}</div>
      </li>
      <li class="list-group-item">
        <Icon icon="fontisto:email" class="mr-5px" />{{ t('profile.user.email') }}
        <div class="pull-right">{{ userInfo?.email }}</div>
      </li>
      <li class="list-group-item">
        <Icon icon="carbon:tree-view-alt" class="mr-5px" />{{ t('profile.user.dept') }}
        <div class="pull-right" v-if="userInfo?.dept">{{ userInfo?.dept.name }}</div>
      </li>
      <li class="list-group-item">
        <Icon icon="ep:suitcase" class="mr-5px" />{{ t('profile.user.posts') }}
        <div class="pull-right" v-if="userInfo?.posts">
          {{ userInfo?.posts.map((post) => post.name).join(',') }}
        </div>
      </li>
      <li class="list-group-item">
        <Icon icon="icon-park-outline:peoples" class="mr-5px" />{{ t('profile.user.roles') }}
        <div class="pull-right" v-if="userInfo?.roles">
          {{ userInfo?.roles.map((role) => role.name).join(',') }}
        </div>
      </li>
      <li class="list-group-item">
        <Icon icon="ep:calendar" class="mr-5px" />{{ t('profile.user.createTime') }}
        <div class="pull-right">{{ formatDate(userInfo?.createTime) }}</div>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { formatDate } from '@/utils/formatTime'
import UserAvatar from './UserAvatar.vue'

import { getUserProfile, ProfileVO } from '@/api/system/user/profile'

const { t } = useI18n()
const userInfo = ref<ProfileVO>()
const getUserInfo = async () => {
  const users = await getUserProfile()
  userInfo.value = users
}
onMounted(async () => {
  await getUserInfo()
})
</script>

<style scoped>
.text-center {
  text-align: center;
  position: relative;
  height: 120px;
}
.list-group-striped > .list-group-item {
  border-left: 0;
  border-right: 0;
  border-radius: 0;
  padding-left: 0;
  padding-right: 0;
}

.list-group {
  padding-left: 0px;
  list-style: none;
}

.list-group-item {
  border-bottom: 1px solid #e7eaec;
  border-top: 1px solid #e7eaec;
  margin-bottom: -1px;
  padding: 11px 0px;
  font-size: 13px;
}
.pull-right {
  float: right !important;
}
</style>
