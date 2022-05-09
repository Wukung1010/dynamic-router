<script lang="ts" setup>
import { goApp, apps } from './main'
</script>
<template>
  <div class="h-full flex flex-col">
    <div
      class="h-20 flex items-center font-bold text-2xl px-10 border-b border-gray-500"
    >
      <span>Portal</span>
    </div>
    <div class="flex-auto flex pt-5">
      <div class="w-48">
        <div v-for="app in apps" class="p-3 cursor-pointer" @click="goApp(app)">
          <span>{{ app.name }}</span>
        </div>
      </div>
      <div class="flex-auto">
        <RouterView></RouterView>
      </div>
    </div>
    <div class="h-14 flex justify-center items-center text-gray-500">
      <span>sunxianfeng@jiuqi.com</span>
    </div>
  </div>
</template>
