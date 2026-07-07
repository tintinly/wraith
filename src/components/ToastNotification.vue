<template>
  <Teleport to="body">
    <Transition name="toast">
      <div
        v-if="visible"
        class="fixed top-20 left-1/2 -translate-x-1/2 border border-border z-50 px-5 py-3 rounded-xl bg-background-secondary text-foreground text-sm "
      >
        {{ message }}
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useToast } from '@/composables/useToast'
const { message, visible } = useToast()
</script>

<style scoped>
.toast-enter-active {
  transition: all 0.3s ease-out;
}
.toast-leave-active {
  transition: all 0.25s ease-in;
}
.toast-enter-from {
  opacity: 0;
  transform: translate(0, -12px);
}
.toast-leave-to {
  opacity: 0;
  transform: translate(0, -12px);
}
</style>
