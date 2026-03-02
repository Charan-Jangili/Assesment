export interface Question {
  id: string;
  category: string;
  text: string;
}

export const questions: Question[] = [
  // Psychological / Cognitive Style
  { id: "q1", category: "Cognitive Style", text: "Do you prefer learning through visual diagrams and charts rather than text?" },
  { id: "q2", category: "Cognitive Style", text: "Do you find it easier to remember things when you write them down?" },
  { id: "q3", category: "Cognitive Style", text: "Do you learn better when you can listen to explanations (like podcasts or lectures)?" },
  { id: "q4", category: "Cognitive Style", text: "Do you prefer hands-on activities or experiments over reading about concepts?" },

  // Learning Speed
  { id: "q5", category: "Learning Speed", text: "Do you prefer to take your time and deeply understand a topic before moving on?" },
  { id: "q6", category: "Learning Speed", text: "Can you quickly grasp new concepts when they are explained once?" },
  { id: "q7", category: "Learning Speed", text: "Do you often need to revisit material multiple times to fully understand it?" },

  // Classroom Grasping
  { id: "q8", category: "Classroom Behavior", text: "Do you find it easy to stay focused during long lectures or classes?" },
  { id: "q9", category: "Classroom Behavior", text: "Do you prefer group discussions over individual study?" },
  { id: "q10", category: "Classroom Behavior", text: "Do you take detailed notes during class sessions?" },

  // Doubt & Curiosity
  { id: "q11", category: "Doubt Raising", text: "Do you feel comfortable asking questions in class when you don't understand something?" },
  { id: "q12", category: "Doubt Raising", text: "Do you prefer researching your doubts independently before asking others?" },
  { id: "q13", category: "Doubt Raising", text: "Do you frequently have follow-up questions after a topic is explained?" },

  // Study Habits
  { id: "q14", category: "Study Habits", text: "Do you study better in short focused sessions (25-30 min) rather than long hours?" },
  { id: "q15", category: "Study Habits", text: "Do you create summaries or mind maps to organize what you've learned?" },
  { id: "q16", category: "Study Habits", text: "Do you prefer studying with background music or in complete silence?" },

  // Motivation & Goals
  { id: "q17", category: "Motivation", text: "Are you motivated by achieving specific goals or deadlines?" },
  { id: "q18", category: "Motivation", text: "Do you feel more motivated when you can see your progress tracked visually?" },
  { id: "q19", category: "Motivation", text: "Do you enjoy challenging yourself with difficult problems?" },
  { id: "q20", category: "Motivation", text: "Do you learn better when the material is connected to real-world applications?" },
];
