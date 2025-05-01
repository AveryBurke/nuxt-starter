<!-- <script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '../composibles/useAuth'


const loading = ref(true)
const { checkAuthAndRedirect, login } = useAuth()

onMounted(() => {
  // Tiny delay to ensure client-side execution
  setTimeout(() => {
    if (checkAuthAndRedirect()) {

      loading.value = false
    } else {
      login({ id: 1, name: 'Test User' })
      loading.value = false
    }
  }, 100)
})

// definePageMeta({
//   layout: "default",
// });
</script> -->

<template>
  <!-- <div class="home-container">
    <p v-show="loading">Redirecting to user profile...</p>
  </div> -->
</template>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.2rem;
  color: #666;
}
</style>
