export interface Question {
  id: string
  text: string
}

export const PHQ9_QUESTIONS: Question[] = [
  { id: 'phq1', text: 'Little interest or pleasure in doing things' },
  { id: 'phq2', text: 'Feeling down, depressed, or hopeless' },
  { id: 'phq3', text: 'Trouble falling or staying asleep, or sleeping too much' },
  { id: 'phq4', text: 'Feeling tired or having little energy' },
  { id: 'phq5', text: 'Poor appetite or overeating' },
  { id: 'phq6', text: 'Feeling bad about yourself — or that you are a failure' },
  { id: 'phq7', text: 'Trouble concentrating on things' },
  { id: 'phq8', text: 'Moving or speaking slowly, or being fidgety/restless' },
  { id: 'phq9', text: 'Thoughts that you would be better off dead or of hurting yourself' },
]

export const GAD7_QUESTIONS: Question[] = [
  { id: 'gad1', text: 'Feeling nervous, anxious, or on edge' },
  { id: 'gad2', text: 'Not being able to stop or control worrying' },
  { id: 'gad3', text: 'Worrying too much about different things' },
  { id: 'gad4', text: 'Trouble relaxing' },
  { id: 'gad5', text: "Being so restless that it's hard to sit still" },
  { id: 'gad6', text: 'Becoming easily annoyed or irritable' },
  { id: 'gad7', text: 'Feeling afraid as if something awful might happen' },
]

export const ANSWER_OPTIONS = [
  { value: 0, label: 'Not at all' },
  { value: 1, label: 'Several days' },
  { value: 2, label: 'More than half the days' },
  { value: 3, label: 'Nearly every day' },
]