<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useAuth } from '../composibles/useAuth'

  
  const route = useRoute()
  const router = useRouter()
  const { user, checkAuth, logout } = useAuth()

  const {data, status} =  await useFetch(`/api/users/${route.params.userId}`)

    console.log(data.value, status.value)
  const userData = ref({
    id: 0,
    name: '',
    email: '',
    role: ''
  })
  const loading = ref(true)
  const error = ref(null)
  
  const userInitial = computed(() => {
    return userData.value.name ? userData.value.name.charAt(0).toUpperCase() : '?'
  })
  
  onMounted(async () => {
    // Ensure user is authenticated
    if (!checkAuth()) {
      router.push('/')
      return
    }
    
    // Get userId from route
    const userId = route.params.userId as string
    console.log(userId)
    // Fetch user data
    await fetchUserData(userId)
  })
  
  const fetchUserData = async (userId:string) => {
    loading.value = true
    error.value = null
    
    try {
      // In a real app, this would be an API call
      // For this demo, we'll just simulate one
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Mock user data
      userData.value = {
        id: parseInt(userId),
        name: 'Test User',
        email: 'user@example.com',
        role: 'Administrator'
      }
    } catch (err) {
      console.error(err)
    } finally {
      loading.value = false
    }
  }
  </script>
<template>
    <div class="profile-container">
      <div v-if="loading" class="loading">
        Loading user profile...
      </div>
      <div v-else-if="error" class="error">
        {{ error }}
      </div>
      <div v-else class="user-profile">
        <h1>User Profile</h1>
        
        <div class="user-card">
          <div class="user-header">
            <div class="avatar">{{ userInitial }}</div>
            <h2>{{ userData.name }}</h2>
          </div>
          
          <div class="user-details">
            <p><strong>User ID:</strong> {{ userData.id }}</p>
            <p><strong>Email:</strong> {{ userData.email || 'No email provided' }}</p>
            <p><strong>Role:</strong> {{ userData.role || 'Standard User' }}</p>
          </div>
        </div>
        
        <div class="actions">
          <button @click="logout" class="logout-btn">Logout</button>
        </div>
      </div>
    </div>
  </template>
  <style scoped>
  .profile-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .loading, .error {
    text-align: center;
    padding: 40px;
    font-size: 18px;
  }
  
  .error {
    color: #e74c3c;
  }
  
  .user-profile h1 {
    margin-bottom: 30px;
    text-align: center;
  }
  
  .user-card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin-bottom: 30px;
  }
  
  .user-header {
    display: flex;
    align-items: center;
    padding: 20px;
    background-color: #f8f9fa;
    border-bottom: 1px solid #eee;
  }
  
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #3498db;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: bold;
    margin-right: 20px;
  }
  
  .user-header h2 {
    margin: 0;
    font-size: 24px;
    color: #333;
  }
  
  .user-details {
    padding: 20px;
  }
  
  .user-details p {
    margin: 10px 0;
    font-size: 16px;
    color: #555;
  }
  
  .actions {
    display: flex;
    justify-content: center;
  }
  
  .logout-btn {
    padding: 10px 20px;
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .logout-btn:hover {
    background-color: #c0392b;
  }
  </style>