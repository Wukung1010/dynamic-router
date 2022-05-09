<script lang="ts" setup>
import { useRouter, RouteRecordRaw } from 'vue-router'
import routes from './routes'

const router = useRouter()

const links = routes
function goPage(link: RouteRecordRaw) {
  router.push(`/${link.path}`)
}
</script>
<template>
  <div class="h-full flex flex-col">
    <div class="text-2xl p-3">
      <span class="font-bold">App1</span>
    </div>
    <div class="flex-auto flex">
      <div>
        <div
          v-for="link in links"
          @click="goPage(link)"
          class="p-3 cursor-pointer"
        >
          <span>{{ link.title }}</span>
        </div>
      </div>
      <div class="p-3">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>
