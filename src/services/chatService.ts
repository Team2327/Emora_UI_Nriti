import { storageService } from './storageService'

export interface ChatMessage {
  id: string
  sender: 'user' | 'bot'
  text: string
  timestamp: string
}

const CHAT_KEY = 'emora_chat_history'

export const chatService = {
  getHistory(): ChatMessage[] {
    return storageService.get<ChatMessage[]>(CHAT_KEY) ?? [
      {
        id: 'welcome',
        sender: 'bot',
        text: "Hi, I'm here to listen. How are you feeling today?",
        timestamp: new Date().toISOString(),
      },
    ]
  },

  addMessage(sender: 'user' | 'bot', text: string): ChatMessage {
    const message: ChatMessage = {
      id: crypto.randomUUID(),
      sender,
      text,
      timestamp: new Date().toISOString(),
    }
    const history = this.getHistory()
    history.push(message)
    storageService.set(CHAT_KEY, history)
    return message
  },

  clearHistory(): void {
    storageService.remove(CHAT_KEY)
  },
}