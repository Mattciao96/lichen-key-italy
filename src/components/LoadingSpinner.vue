<template>
  <div class="fixed inset-0 z-[9999] flex flex-col items-center justify-center">
    <div class="relative h-[100px] w-[100px]">
      <!-- Pulse animation elements -->
      <div class="animate-pulse-1 absolute inset-0"></div>
      <div class="animate-pulse-2 absolute inset-0"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
@keyframes pulse {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

.animate-pulse-1 {
  animation: pulse 2s linear infinite;
}

.animate-pulse-2 {
  animation: pulse 2s linear infinite;
  animation-delay: -1s;
}

.animate-pulse-1,
.animate-pulse-2 {
  @apply rounded-full bg-primary-500 transition-colors duration-300 ease-linear;
}
</style>
