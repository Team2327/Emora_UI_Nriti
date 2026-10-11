import { storageService } from './storageService'

export interface ChatMessage {
  id: string
  sender: 'user' | 'bot'
  text: string
  safety?: boolean
  timestamp: string
}

const CHAT_KEY = 'emora_chat_history'
const MAX_STORED_MESSAGES = 200

function welcomeMessage(): ChatMessage {
  return {
    id: 'welcome',
    sender: 'bot',
    text: "Hi, I'm here to listen. How are you feeling today?",
    timestamp: new Date().toISOString(),
  }
}

export const chatService = {
  getHistory(): ChatMessage[] {
    const stored = storageService.get<ChatMessage[]>(CHAT_KEY)
    return stored && stored.length > 0 ? stored : [welcomeMessage()]
  },

  addMessage(sender: 'user' | 'bot', text: string, safety = false): ChatMessage {
    const message: ChatMessage = {
      id: crypto.randomUUID(),
      sender,
      text,
      safety,
      timestamp: new Date().toISOString(),
    }
    const history = [...this.getHistory(), message].slice(-MAX_STORED_MESSAGES)
    storageService.set(CHAT_KEY, history)
    return message
  },

  clearHistory(): void {
    storageService.remove(CHAT_KEY)
  },
}