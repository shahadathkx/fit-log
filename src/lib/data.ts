export interface Workout {
  id: string;
  name: string;
  categories: string[];
  equipment: string;
  duration: number;
  calories: number;
  rating: number;
  description?: string;
  difficulty?: string;
  sets?: number;
  reps?: string;
  instructions?: string[];
}

export const WORKOUTS: Workout[] = [
  {
    id: 'barbell-bench-press',
    name: 'Barbell Bench Press',
    categories: ['Chest', 'Arms'],
    equipment: 'Barbell, Bench',
    duration: 25,
    calories: 180,
    rating: 4.8,
    description: 'A compound press that builds chest thickness, triceps, and pressing power from a stable bench.',
    difficulty: 'Intermediate',
    sets: 4,
    reps: '6-8',
    instructions: [
      'Lie on the bench with eyes under the bar and feet planted.',
      'Unrack with locked elbows and lower the bar to mid-chest.',
      'Press up in a slight arc until elbows lock without bouncing.',
      'Keep shoulder blades pinched and a natural arch in the back.'
    ]
  },
  {
    id: 'pull-up',
    name: 'Pull-up',
    categories: ['Back', 'Arms'],
    equipment: 'Pull-up Bar',
    duration: 15,
    calories: 120,
    rating: 4.7
  },
  {
    id: 'back-squat',
    name: 'Back Squat',
    categories: ['Legs', 'Core'],
    equipment: 'Barbell, Rack',
    duration: 30,
    calories: 240,
    rating: 4.9
  },
  {
    id: 'overhead-press',
    name: 'Overhead Press',
    categories: ['Shoulders', 'Arms'],
    equipment: 'Barbell',
    duration: 20,
    calories: 150,
    rating: 4.6
  },
  {
    id: 'dumbbell-bicep-curl',
    name: 'Dumbbell Bicep Curl',
    categories: ['Arms'],
    equipment: 'Dumbbells',
    duration: 12,
    calories: 80,
    rating: 4.3
  },
  {
    id: 'hollow-body-plank',
    name: 'Hollow-body Plank',
    categories: ['Core'],
    equipment: 'Bodyweight',
    duration: 10,
    calories: 40,
    rating: 4.4
  },
  {
    id: 'conventional-deadlift',
    name: 'Conventional Deadlift',
    categories: ['Back', 'Legs'],
    equipment: 'Barbell',
    duration: 28,
    calories: 260,
    rating: 4.9
  },
  {
    id: 'push-up',
    name: 'Push-up',
    categories: ['Chest', 'Arms', 'Core'],
    equipment: 'Bodyweight',
    duration: 10,
    calories: 90,
    rating: 4.5
  },
  {
    id: 'walking-lunge',
    name: 'Walking Lunge',
    categories: ['Legs'],
    equipment: 'Dumbbells (optional)',
    duration: 18,
    calories: 170,
    rating: 4.4
  },
  {
    id: 'russian-twist',
    name: 'Russian Twist',
    categories: ['Core'],
    equipment: 'Medicine Ball',
    duration: 8,
    calories: 70,
    rating: 4.1
  },
  {
    id: 'leg-press',
    name: 'Leg Press',
    categories: ['Legs'],
    equipment: 'Leg Press Machine',
    duration: 20,
    calories: 200,
    rating: 4.7
  },
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    categories: ['Back', 'Arms'],
    equipment: 'Cable Machine',
    duration: 15,
    calories: 130,
    rating: 4.6
  }
];
