<script lang="ts" setup></script>
<template>
  <div class="h-full flex flex-col">
    <span class="text-gray-500">App Wrapper</span>
    <div class="flex-auto p-3">
      <div class="h-full border border-gray-500">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>
