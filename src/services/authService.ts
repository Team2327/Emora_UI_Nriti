import { storageService } from './storageService'

interface AuthUser {
  name: string
  email: string
}

const AUTH_KEY = 'emora_auth_user'

export const authService = {
  login(email: string, _password: string): AuthUser {
    const user = { name: email.split('@')[0], email }
    storageService.set(AUTH_KEY, user)
    return user
  },

  signup(name: string, email: string, _password: string): AuthUser {
    const user = { name, email }
    storageService.set(AUTH_KEY, user)
    return user
  },

  logout(): void {
    storageService.remove(AUTH_KEY)
  },

  getCurrentUser(): AuthUser | null {
    return storageService.get<AuthUser>(AUTH_KEY)
  },

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null
  },
}