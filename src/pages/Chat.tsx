import { useEffect, useRef, useState } from 'react'
import { Send, Bot, User, Trash2 } from 'lucide-react'
import { chatService, type ChatMessage } from '../services/chatService'
import { chatbotService } from '../services/chatbotService'
import { SafetyCard } from '../components/ui/SafetyCard'

const SUGGESTIONS = [
  "I'm feeling stressed",
  "I can't sleep",
  'I feel anxious',
  "I'm feeling low",
]
const MAX_LENGTH = 500

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>(chatService.getHistory())
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState('')
  const bottomRef = useRef<HTMLDivElement | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, isTyping])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  function sendMessage(raw: string) {
    const text = raw.trim()
    if (!text || isTyping) return
    setError('')

    try {
      chatService.addMessage('user', text)
      const history = chatService.getHistory()
      setMessages(history)
      setInput('')
      setIsTyping(true)

      const lastBotText = [...history].reverse().find((m) => m.sender === 'bot')?.text
      const reply = chatbotService.getResponse(text, lastBotText)
      const delay = 800 + Math.random() * 600

      timeoutRef.current = setTimeout(() => {
        try {
          chatService.addMessage('bot', reply.text, reply.safety)
          setMessages(chatService.getHistory())
        } catch {
          setError('Something went wrong. Please try again.')
        }
        setIsTyping(false)
      }, delay)
    } catch {
      setIsTyping(false)
      setError('Something went wrong. Please try again.')
    }
  }

  function clearChat() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    chatService.clearHistory()
    setMessages(chatService.getHistory())
    setIsTyping(false)
    setError('')
  }

  const hasUserMessage = messages.some((m) => m.sender === 'user')

  return (
    <div className="max-w-2xl mx-auto flex flex-col h-[calc(100vh-9rem)] md:h-[calc(100vh-6rem)]">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-white">Chat Support</h1>
        <button
          onClick={clearChat}
          className="text-slate-500 hover:text-red-400"
          title="Clear chat"
          aria-label="Clear chat"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 cozy-in ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center shrink-0">
                <Bot size={16} className="text-[var(--color-primary)]" />
              </div>
            )}

            <div className="max-w-[80%] space-y-2">
              <div
                className={`px-4 py-2 rounded-2xl text-sm ${
                  msg.sender === 'user'
                    ? 'bg-[var(--color-primary)] text-white rounded-br-sm'
                    : 'bg-slate-800 text-slate-300 rounded-bl-sm'
                }`}
              >
                {msg.text}
              </div>
              {msg.safety && <SafetyCard />}
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

        <div ref={bottomRef} />
      </div>

      {!hasUserMessage && (
        <div className="flex flex-wrap gap-2 mt-3">
          {SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => sendMessage(suggestion)}
              className="px-3 py-1.5 rounded-full text-xs bg-slate-800 text-slate-300 hover:bg-slate-700"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

      <div className="flex gap-2 mt-3">
        <input
          value={input}
          maxLength={MAX_LENGTH}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
          placeholder="Type how you're feeling..."
          className="flex-1 px-4 py-2.5 rounded-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-[var(--color-primary)]"
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={isTyping || !input.trim()}
          aria-label="Send message"
          className="w-11 h-11 rounded-full btn-primary bg-[var(--color-primary)] flex items-center justify-center disabled:opacity-50"
        >
          <Send size={18} className="text-white" />
        </button>
      </div>

      <p className="text-xs text-slate-500 mt-2 text-center">
        EMORA is a supportive tool, not a replacement for professional care. In an emergency, call 112.
      </p>
    </div>
  )
}