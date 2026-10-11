import { storageService } from './storageService'

export interface AuthUser {
  name: string
  email: string
}

interface StoredUser extends AuthUser {
  password: string
}

export type AuthResult =
  | { ok: true; user: AuthUser }
  | { ok: false; error: string }

const USERS_KEY = 'emora_users'
const SESSION_KEY = 'emora_auth_user'

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function getUsers(): StoredUser[] {
  return storageService.get<StoredUser[]>(USERS_KEY) ?? []
}

export const authService = {
  signup(name: string, email: string, password: string): AuthResult {
    const cleanName = name.trim()
    const cleanEmail = email.trim().toLowerCase()

    if (cleanName.length < 2) {
      return { ok: false, error: 'Please enter your name (at least 2 characters).' }
    }
    if (!isValidEmail(cleanEmail)) {
      return { ok: false, error: 'Please enter a valid email address.' }
    }
    if (password.length < 6) {
      return { ok: false, error: 'Password must be at least 6 characters.' }
    }

    const users = getUsers()
    if (users.some((u) => u.email === cleanEmail)) {
      return { ok: false, error: 'An account with this email already exists. Try logging in.' }
    }

    users.push({ name: cleanName, email: cleanEmail, password })
    storageService.set(USERS_KEY, users)

    const user: AuthUser = { name: cleanName, email: cleanEmail }
    storageService.set(SESSION_KEY, user)
    return { ok: true, user }
  },

  login(email: string, password: string): AuthResult {
    const cleanEmail = email.trim().toLowerCase()

    if (!isValidEmail(cleanEmail)) {
      return { ok: false, error: 'Please enter a valid email address.' }
    }
    if (!password) {
      return { ok: false, error: 'Please enter your password.' }
    }

    const found = getUsers().find((u) => u.email === cleanEmail)
    if (!found || found.password !== password) {
      return { ok: false, error: 'Incorrect email or password.' }
    }

    const user: AuthUser = { name: found.name, email: found.email }
    storageService.set(SESSION_KEY, user)
    return { ok: true, user }
  },

  logout(): void {
    storageService.remove(SESSION_KEY)
  },

  getCurrentUser(): AuthUser | null {
    return storageService.get<AuthUser>(SESSION_KEY)
  },

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null
  },
}