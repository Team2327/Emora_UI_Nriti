export type WellnessCategory = 'breathing' | 'meditation' | 'yoga' | 'self-care'

export interface BreathingPhase {
  label: string
  seconds: number
  scale: number
}

export interface WellnessItem {
  id: string
  title: string
  category: WellnessCategory
  duration: string
  summary: string
  steps: string[]
  breathing?: BreathingPhase[]
}

export const CATEGORY_LABELS: Record<WellnessCategory, string> = {
  breathing: 'Breathing',
  meditation: 'Meditation',
  yoga: 'Yoga',
  'self-care': 'Self-care',
}

export const WELLNESS_ITEMS: WellnessItem[] = [
  {
    id: 'box-breathing',
    title: 'Box Breathing',
    category: 'breathing',
    duration: '3 min',
    summary: 'An even, steady rhythm that helps your body settle when you feel tense.',
    breathing: [
      { label: 'Inhale', seconds: 4, scale: 1.5 },
      { label: 'Hold', seconds: 4, scale: 1.5 },
      { label: 'Exhale', seconds: 4, scale: 1 },
      { label: 'Hold', seconds: 4, scale: 1 },
    ],
    steps: [
      'Sit comfortably with your back supported and your shoulders relaxed.',
      'Follow the circle: breathe in through your nose as it grows.',
      'Hold gently while it stays large, then breathe out slowly as it shrinks.',
      'Pause briefly, then repeat for a few minutes.',
      'If you feel dizzy, return to your normal breathing.',
    ],
  },
  {
    id: 'breathing-478',
    title: '4-7-8 Breathing',
    category: 'breathing',
    duration: '4 min',
    summary: 'A longer out-breath that can help you unwind, especially before sleep.',
    breathing: [
      { label: 'Inhale', seconds: 4, scale: 1.5 },
      { label: 'Hold', seconds: 7, scale: 1.5 },
      { label: 'Exhale', seconds: 8, scale: 1 },
    ],
    steps: [
      'Sit or lie down comfortably.',
      'Breathe in quietly through your nose for 4 seconds.',
      'Hold your breath for 7 seconds.',
      'Breathe out slowly through your mouth for 8 seconds.',
      'If the counts feel hard, shorten them but keep the same rhythm.',
    ],
  },
  {
    id: 'body-scan',
    title: 'Body Scan Meditation',
    category: 'meditation',
    duration: '10 min',
    summary: 'Move your attention slowly through the body to release hidden tension.',
    steps: [
      'Lie down or sit comfortably and close your eyes if that feels okay.',
      'Take three slow breaths and notice where your body touches the surface.',
      'Move your attention from your toes up to your head, one area at a time.',
      'If you find tension, breathe toward it and let that area soften.',
      'If your mind wanders, gently bring it back without judging yourself.',
      'Finish with a deep breath and open your eyes slowly.',
    ],
  },
  {
    id: 'grounding-54321',
    title: 'Grounding 5-4-3-2-1',
    category: 'meditation',
    duration: '2 min',
    summary: 'A quick exercise to come back to the present when your thoughts race.',
    steps: [
      'Look around and name 5 things you can see.',
      'Notice 4 things you can touch, and feel their texture.',
      'Listen for 3 sounds around you.',
      'Notice 2 things you can smell, or recall two smells you like.',
      'Name 1 thing you can taste, then take a slow breath.',
    ],
  },
  {
    id: 'morning-yoga',
    title: 'Gentle Morning Flow',
    category: 'yoga',
    duration: '8 min',
    summary: 'Light, slow movements to wake up your body without any pressure.',
    steps: [
      'Stand tall and roll your shoulders back a few times.',
      'Reach your arms overhead and stretch up while breathing in.',
      'Fold forward slowly with soft knees and let your head hang.',
      'On hands and knees, gently arch and round your back for 5 breaths.',
      'Rest in child\'s pose for 5 slow breaths.',
      'Move gently within your comfort and stop if anything hurts.',
    ],
  },
  {
    id: 'desk-stretch',
    title: 'Desk Stretch Break',
    category: 'yoga',
    duration: '5 min',
    summary: 'Release neck, shoulder and back tension after long hours of studying.',
    steps: [
      'Sit tall and slowly tilt your ear toward each shoulder, 5 breaths per side.',
      'Roll your shoulders backward 10 times.',
      'Interlace your fingers, turn your palms out and stretch your arms forward.',
      'Twist gently to each side while holding the chair.',
      'Stand up, shake out your arms and legs, and take a deep breath.',
    ],
  },
  {
    id: 'gratitude-journal',
    title: 'Gratitude Journaling',
    category: 'self-care',
    duration: '5 min',
    summary: 'Notice small good things to lift your mood a little at a time.',
    steps: [
      'Take a notebook or open a notes app.',
      'Write down three things that went okay today, however small.',
      'Next to each one, note why it mattered to you.',
      'Read them back slowly and take a breath.',
    ],
  },
  {
    id: 'daily-routine',
    title: 'Gentle Daily Routine',
    category: 'self-care',
    duration: '10 min',
    summary: 'Tiny habits that add up when your energy is low.',
    steps: [
      'Drink a glass of water and eat something nourishing.',
      'Spend 10 minutes in daylight, even by a window.',
      'Move your body a little: a short walk or stretch.',
      'Do one thing you enjoy, even for five minutes.',
      'Reach out to one person you trust, even with a simple message.',
    ],
  },
  {
    id: 'sleep-wind-down',
    title: 'Sleep Wind-Down',
    category: 'self-care',
    duration: '15 min',
    summary: 'A calm evening routine to help your mind prepare for rest.',
    steps: [
      'Dim the lights and put screens away about 30 minutes before bed.',
      'Write tomorrow\'s to-do list so your mind can let it go.',
      'Do a few slow stretches or the 4-7-8 breathing exercise.',
      'Keep your room cool and quiet, and go to bed at a steady time.',
    ],
  },
]