// composables/useAuth.ts
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

interface User {
    id: number;
    name: string;
}

export function useAuth() {
    const router = useRouter()
    const user = ref<User | null>(null)

    // Check if user is authenticated
    const isAuthenticated = computed(() => user.value !== null)

    // Check localStorage for existing user
    const checkAuth = () => {
        if (import.meta.client) {
            const storedUser = localStorage.getItem('auth_user')
            if (storedUser) {
                user.value = JSON.parse(storedUser)
                return true
            }
        }
        return false
    }

    // Check auth and redirect to profile if authenticated
    const checkAuthAndRedirect = () => {
        const isAuth = checkAuth()
        if (isAuth && user.value) {
            router.push(`/${user.value.id}`)
        }
        return isAuth
    }

    // Login user
    const login = (userData: User = { id: 1, name: 'Test User' }) => {
        if (import.meta.client) {
            localStorage.setItem('auth_user', JSON.stringify(userData))
            user.value = userData
        }
        router.push(`/${userData.id}`)
    }

    // Logout user
    const logout = () => {
        if (import.meta.client) {
            localStorage.removeItem('auth_user')
            user.value = null
            router.push('/')
        }
    }

    return {
        user,
        isAuthenticated,
        checkAuth,
        checkAuthAndRedirect,
        login,
        logout
    }
}