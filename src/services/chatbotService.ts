export type ChatIntent =
  | 'safety'
  | 'professional'
  | 'sleep'
  | 'anxiety'
  | 'stress'
  | 'sadness'
  | 'calm'
  | 'general'
  | 'thanks'
  | 'greeting'
  | 'fallback'

export interface ChatReply {
  text: string
  intent: ChatIntent
  safety: boolean
}

interface IntentRule {
  intent: Exclude<ChatIntent, 'safety' | 'fallback'>
  keywords: string[]
  responses: string[]
}

const SAFETY_PHRASES = [
  'suicide', 'suicidal', 'kill myself', 'end my life', 'want to die', 'wanna die',
  'self harm', 'self-harm', 'hurt myself', 'harm myself', 'no reason to live',
  'better off dead', 'dont want to live', 'marna chahta', 'marna chahti',
  'mar jana chahta', 'mar jana chahti', 'jeena nahi', 'khudkushi',
]

const SAFETY_RESPONSE =
  "I'm really glad you told me, and I'm sorry you are carrying this. Your safety matters most right now. Please reach out to someone you trust, or call Tele-MANAS at 14416 (free, 24x7). If you might act on these thoughts or are in immediate danger, call 112 right away. I am a simple support tool and cannot replace a person who can be with you, but I'm here to keep listening."

const FALLBACK_RESPONSES = [
  "I want to understand better. Can you tell me a little more about how you're feeling?",
  "I'm listening. Is it more stress, worry, sadness, or trouble sleeping, or something else?",
  'Thanks for sharing that. How has this been affecting your day?',
]

const RULES: IntentRule[] = [
  {
    intent: 'professional',
    keywords: [
      'therapist', 'psychiatrist', 'psychologist', 'doctor', 'counsellor', 'counselor',
      'medication', 'medicine', 'prescribe', 'diagnose', 'diagnosis',
    ],
    responses: [
      "I can't diagnose conditions or prescribe medication, and I'm not a replacement for a professional. A counsellor or doctor can guide you properly. Tele-MANAS (14416) is a free, 24x7 helpline in India. I'm happy to keep supporting you in the meantime.",
      'A qualified professional is the right person for that, since I cannot diagnose or recommend medication. If you would like, we can talk through what you want to tell them so it feels easier.',
    ],
  },
  {
    intent: 'sleep',
    keywords: [
      'sleep', 'insomnia', 'cant sleep', 'cannot sleep', 'awake', 'tired', 'exhausted',
      'nightmare', 'nightmares', 'neend', 'sleepless', 'up all night',
    ],
    responses: [
      'Poor sleep can make everything feel harder. A steady wind-down helps: dim the lights, keep screens away for 30 minutes, and take a few slow breaths. What usually keeps you awake?',
      "That sounds draining. If your mind races at night, try writing tomorrow's worries on paper before bed so your brain can let them go. Does that happen to you?",
      'Rest matters a lot. Try keeping the same sleep and wake time, and avoid caffeine late in the day. How many hours have you been sleeping lately?',
    ],
  },
  {
    intent: 'anxiety',
    keywords: [
      'anxious', 'anxiety', 'nervous', 'panic', 'worry', 'worried', 'worrying', 'scared',
      'afraid', 'fear', 'on edge', 'restless', 'racing thoughts', 'ghabra', 'ghabrahat', 'darr',
    ],
    responses: [
      'Anxiety can feel really intense, and it makes sense that you want it to ease. Try grounding: name 5 things you can see, 4 you can touch, and 3 you can hear. What is your mind worrying about most?',
      "Thank you for telling me. A slow breathing exercise in the Wellness section may help your body settle. Do you want to tell me what's on your mind?",
      "That sounds uncomfortable, and you don't have to solve everything right now. Feel your feet on the floor and breathe out slowly. What set this feeling off today?",
    ],
  },
  {
    intent: 'stress',
    keywords: [
      'stress', 'stressed', 'pressure', 'overwhelm', 'overwhelmed', 'burnout', 'burnt out',
      'too much', 'deadline', 'deadlines', 'exam', 'exams', 'tension', 'workload', 'tanaav',
    ],
    responses: [
      'That sounds like a lot to carry. When everything piles up, it helps to pick just one small thing to do next. What feels like the heaviest part right now?',
      "Stress can make everything feel urgent at once. Let's slow it down: breathe in for 4, out for 6. There's also a short breathing exercise in Wellness if you'd like it. What has been stressing you most?",
      "I'm sorry things feel so pressured. Writing down everything on your mind, then circling just one thing for today, can make it manageable. What would that one thing be?",
    ],
  },
  {
    intent: 'sadness',
    keywords: [
      'sad', 'depressed', 'depression', 'hopeless', 'empty', 'cry', 'crying', 'lonely',
      'alone', 'worthless', 'unhappy', 'feeling down', 'feel down', 'so down',
      'feeling low', 'feel low', 'udaas', 'dukhi', 'rona', 'akela', 'akeli',
    ],
    responses: [
      "I'm really sorry you're feeling this way. You don't have to put on a brave face here. Do you want to tell me what has been weighing on you?",
      'Feeling low can be exhausting. Small kind things count: some water, fresh air, or a message to someone you trust. What has today been like?',
      'Thank you for being honest about how you feel. These feelings are valid, and they can shift with time and support. Is there someone you feel comfortable talking to as well?',
    ],
  },
  {
    intent: 'calm',
    keywords: ['breathe', 'breathing', 'calm down', 'relax', 'meditate', 'meditation', 'yoga'],
    responses: [
      "Let's slow things down together. Breathe in for 4, hold for 4, out for 4. You'll find guided breathing, meditation and yoga in the Wellness section.",
      'A calm minute can help. Try breathing out a little longer than you breathe in. The Wellness section has an animated breathing guide you can follow.',
    ],
  },
  {
    intent: 'general',
    keywords: ['help', 'talk', 'listen', 'support', 'advice', 'bad day', 'confused', 'stuck'],
    responses: [
      "I'm listening. Take your time. What's on your mind today?",
      "I'm here for you. Would it help to talk about how your day has been, or something that has been on your mind?",
      'Thanks for reaching out. Can you tell me a bit more about what has been going on?',
    ],
  },
  {
    intent: 'thanks',
    keywords: ['thanks', 'thank you', 'thank', 'shukriya', 'dhanyavad'],
    responses: [
      "You're welcome. I'm here whenever you want to talk again.",
      'Glad I could help a little. Take care of yourself today.',
    ],
  },
  {
    intent: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'good morning', 'good evening', 'namaste'],
    responses: [
      "Hi, I'm glad you're here. How are you feeling today?",
      "Hello! This is a safe space. What's on your mind?",
    ],
  },
]

function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function containsPhrase(text: string, phrase: string): boolean {
  return ` ${text} `.includes(` ${phrase} `)
}

function pick(options: string[], lastBotText?: string): string {
  const fresh = options.filter((option) => option !== lastBotText)
  const pool = fresh.length > 0 ? fresh : options
  return pool[Math.floor(Math.random() * pool.length)]
}

export const chatbotService = {
  getResponse(input: string, lastBotText?: string): ChatReply {
    const text = normalize(input)

    if (SAFETY_PHRASES.some((phrase) => containsPhrase(text, phrase))) {
      return { text: SAFETY_RESPONSE, intent: 'safety', safety: true }
    }

    let best: IntentRule | null = null
    let bestScore = 0

    for (const rule of RULES) {
      const score = rule.keywords.filter((keyword) => containsPhrase(text, keyword)).length
      if (score > bestScore) {
        best = rule
        bestScore = score
      }
    }

    if (!best) {
      return { text: pick(FALLBACK_RESPONSES, lastBotText), intent: 'fallback', safety: false }
    }

    return { text: pick(best.responses, lastBotText), intent: best.intent, safety: false }
  },
}