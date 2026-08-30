import { useState } from 'react'
import { Send, Bot, User, Trash2 } from 'lucide-react'
import { chatService } from '../services/chatService'

export default function Chat() {
  const [messages, setMessages] = useState(chatService.getHistory())
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  function sendMessage() {
    if (!input.trim()) return
    chatService.addMessage('user', input)
    setMessages(chatService.getHistory())
    setInput('')
    setIsTyping(true)

    // TODO: replace with real chatbotService.getResponse(input)
    setTimeout(() => {
      chatService.addMessage('bot', "I hear you. Tell me a bit more about what's on your mind.")
      setMessages(chatService.getHistory())
      setIsTyping(false)
    }, 1200)
  }

  function clearChat() {
    chatService.clearHistory()
    setMessages(chatService.getHistory())
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col h-[calc(100vh-6rem)]">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-white">Chat Support</h1>
        <button onClick={clearChat} className="text-slate-500 hover:text-red-400" title="Clear chat">
          <Trash2 size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2 cozy-in ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center shrink-0">
                <Bot size={16} className="text-[var(--color-primary)]" />
              </div>
            )}
            <div
              className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${
                msg.sender === 'user' ? 'bg-[var(--color-primary)] text-white rounded-br-sm' : 'bg-slate-800 text-slate-200 rounded-bl-sm'
              }`}
            >
              {msg.text}
            </div>
            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                <User size={16} className="text-slate-300" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2 justify-start cozy-in">
            <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center shrink-0">
              <Bot size={16} className="text-[var(--color-primary)]" />
            </div>
            <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-slate-800 flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type how you're feeling..."
          className="flex-1 px-4 py-2.5 rounded-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[var(--color-primary)]"
        />
        <button onClick={sendMessage} className="w-11 h-11 rounded-full btn-primary bg-[var(--color-primary)] flex items-center justify-center">
          <Send size={18} className="text-white" />
        </button>
      </div>
    </div>
  )
}