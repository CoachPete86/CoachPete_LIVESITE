import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Checkbox } from '@/components/ui/checkbox.jsx'
import { 
  Play, 
  CheckCircle, 
  Calendar, 
  Target, 
  TrendingUp, 
  User, 
  MessageCircle,
  Star,
  Clock,
  Zap,
  Heart,
  Award
} from 'lucide-react'
import heroImage from './assets/hero_image.png'
import whatsappQR from './assets/whatsapp_qr.png'
import gluteBridgeDemo from './assets/glute_bridge_demo.png'
import clamshellDemo from './assets/clamshell_demo.png'
import './App.css'

// Programme data structure
const programmeData = {
  phase1: {
    title: "Phase 1: Activation & Stability",
    weeks: "Weeks 1-4",
    description: "Establishing basic glute activation and movement patterns",
    color: "bg-orange-500",
    exercises: [
      {
        id: 1,
        name: "Glute Bridges",
        sets: "2-3 sets",
        reps: "8-15 reps",
        hold: "2-5 seconds",
        image: gluteBridgeDemo,
        description: "Foundation exercise to wake up your glutes",
        cues: ["Squeeze glutes like cracking a walnut", "Drive through heels", "Keep ribs down"]
      },
      {
        id: 2,
        name: "Clamshells",
        sets: "2-3 sets",
        reps: "10-20 reps each side",
        hold: "1-2 seconds",
        image: clamshellDemo,
        description: "Target gluteus medius for hip stability",
        cues: ["Lead with knee, not foot", "Keep pelvis stable", "Feel work on side of hip"]
      },
      {
        id: 3,
        name: "Dead Bug (Modified)",
        sets: "2-3 sets",
        reps: "5-10 reps each side",
        hold: "2-3 seconds",
        description: "Core stability and glute-core coordination",
        cues: ["Keep lower back pressed to floor", "Move slowly with control", "Breathe normally"]
      },
      {
        id: 4,
        name: "Hip Flexor Stretch",
        sets: "2-3 times",
        reps: "30-45 seconds each side",
        description: "Address hip flexor tightness",
        cues: ["Keep torso upright", "Push hips forward", "Breathe deeply"]
      }
    ]
  },
  phase2: {
    title: "Phase 2: Strength Without Strain",
    weeks: "Weeks 5-8",
    description: "Progressive strengthening with resistance",
    color: "bg-blue-500",
    exercises: [
      {
        id: 5,
        name: "Resistance Band Glute Bridges",
        sets: "3-4 sets",
        reps: "12-20 reps",
        hold: "3-5 seconds",
        description: "Added resistance for strength development",
        cues: ["Push knees apart against band", "Maintain band tension", "Feel work in glutes and hip sides"]
      },
      {
        id: 6,
        name: "Lateral Band Walks",
        sets: "2-3 sets",
        reps: "10-20 steps each direction",
        description: "Functional gluteus medius strengthening",
        cues: ["Maintain quarter-squat position", "Keep knees pointing forward", "Control each step"]
      },
      {
        id: 7,
        name: "Modified Step-Ups",
        sets: "2-3 sets",
        reps: "8-12 reps each leg",
        description: "Unilateral glute strength and function",
        cues: ["Push through heel of elevated leg", "Control the descent", "Keep torso upright"]
      },
      {
        id: 8,
        name: "Goblet Squats (Partial Range)",
        sets: "3 sets",
        reps: "8-12 reps",
        description: "Introduction to squatting movements",
        cues: ["Sit back into hips", "Keep chest up", "Feel glutes working"]
      }
    ]
  },
  phase3: {
    title: "Phase 3: Power & Integration",
    weeks: "Weeks 9-12",
    description: "Power development and functional integration",
    color: "bg-green-500",
    exercises: [
      {
        id: 9,
        name: "Hip Thrusts (Loaded)",
        sets: "3-4 sets",
        reps: "8-15 reps",
        description: "Maximum glute activation and power",
        cues: ["Drive through heels with force", "Squeeze glutes hard at top", "Control the weight down"]
      },
      {
        id: 10,
        name: "Bulgarian Split Squats",
        sets: "3-4 sets",
        reps: "10-15 reps each leg",
        description: "Advanced unilateral strength",
        cues: ["Sit back into front hip", "Keep weight on front leg", "Drive through front heel"]
      },
      {
        id: 11,
        name: "Single-Leg Romanian Deadlifts",
        sets: "3 sets",
        reps: "8-10 reps each leg",
        description: "Posterior chain integration and balance",
        cues: ["Push hips back", "Keep back straight", "Drive through heel to stand"]
      },
      {
        id: 12,
        name: "Full-Range Goblet Squats",
        sets: "3-4 sets",
        reps: "12-15 reps",
        description: "Complete functional integration",
        cues: ["Full depth with control", "Maintain glute activation", "Perfect form throughout"]
      }
    ]
  }
}

function App() {
  const [currentPhase, setCurrentPhase] = useState('phase1')
  const [completedExercises, setCompletedExercises] = useState(new Set())
  const [currentWeek, setCurrentWeek] = useState(1)
  const [activeTab, setActiveTab] = useState('overview')

  // Calculate progress
  const totalExercises = Object.values(programmeData).reduce((total, phase) => total + phase.exercises.length, 0)
  const progressPercentage = (completedExercises.size / totalExercises) * 100

  const toggleExerciseComplete = (exerciseId) => {
    const newCompleted = new Set(completedExercises)
    if (newCompleted.has(exerciseId)) {
      newCompleted.delete(exerciseId)
    } else {
      newCompleted.add(exerciseId)
    }
    setCompletedExercises(newCompleted)
  }

  const getCurrentPhaseData = () => programmeData[currentPhase]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Cat's Glute Programme</h1>
                <p className="text-sm text-gray-600">Coach Pete Ryan</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-sm">
                Week {currentWeek}
              </Badge>
              <div className="flex items-center space-x-2">
                <Progress value={progressPercentage} className="w-20" />
                <span className="text-sm text-gray-600">{Math.round(progressPercentage)}%</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="exercises">Exercises</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Hero Section */}
            <Card className="overflow-hidden">
              <div className="relative h-64 bg-gradient-to-r from-orange-500 to-orange-600">
                <img 
                  src={heroImage} 
                  alt="Coach Pete Ryan" 
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40" />
                <div className="relative h-full flex items-center justify-center text-center text-white p-6">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Welcome to Your Recovery Journey</h2>
                    <p className="text-lg opacity-90">12 weeks to restore your glute function and eliminate pain</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Phase Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(programmeData).map(([phaseKey, phase]) => (
                <Card 
                  key={phaseKey}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    currentPhase === phaseKey ? 'ring-2 ring-orange-500' : ''
                  }`}
                  onClick={() => setCurrentPhase(phaseKey)}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${phase.color}`} />
                      <CardTitle className="text-lg">{phase.title}</CardTitle>
                    </div>
                    <CardDescription>{phase.weeks}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{phase.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{phase.exercises.length} exercises</span>
                      {currentPhase === phaseKey && (
                        <Badge className="bg-orange-500">Current</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Current Phase Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Current Phase: {getCurrentPhaseData().title}</span>
                </CardTitle>
                <CardDescription>{getCurrentPhaseData().description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {getCurrentPhaseData().exercises.map((exercise) => (
                    <div key={exercise.id} className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Checkbox 
                          checked={completedExercises.has(exercise.id)}
                          onCheckedChange={() => toggleExerciseComplete(exercise.id)}
                        />
                        <h4 className="font-medium text-sm">{exercise.name}</h4>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{exercise.sets}</p>
                      <p className="text-xs text-gray-600">{exercise.reps}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Exercises Tab */}
          <TabsContent value="exercises" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Exercise Library</h2>
              <div className="flex space-x-2">
                {Object.entries(programmeData).map(([phaseKey, phase]) => (
                  <Button
                    key={phaseKey}
                    variant={currentPhase === phaseKey ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPhase(phaseKey)}
                  >
                    {phase.title.split(':')[0]}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {getCurrentPhaseData().exercises.map((exercise) => (
                <Card key={exercise.id} className="overflow-hidden">
                  <div className="relative">
                    {exercise.image && (
                      <img 
                        src={exercise.image} 
                        alt={exercise.name}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="absolute top-4 right-4">
                      <Button
                        size="sm"
                        variant={completedExercises.has(exercise.id) ? "default" : "secondary"}
                        onClick={() => toggleExerciseComplete(exercise.id)}
                      >
                        {completedExercises.has(exercise.id) ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {exercise.name}
                      <Badge variant="outline">{exercise.sets}</Badge>
                    </CardTitle>
                    <CardDescription>{exercise.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-4 text-sm">
                        <span><strong>Reps:</strong> {exercise.reps}</span>
                        {exercise.hold && <span><strong>Hold:</strong> {exercise.hold}</span>}
                      </div>
                      {exercise.cues && (
                        <div>
                          <h5 className="font-medium text-sm mb-2">Coaching Cues:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {exercise.cues.map((cue, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <span className="text-orange-500 mt-1">•</span>
                                <span>{cue}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{Math.round(progressPercentage)}%</div>
                  <Progress value={progressPercentage} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    {completedExercises.size} of {totalExercises} exercises completed
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Week</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Week {currentWeek}</div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {getCurrentPhaseData().title}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Streak</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7 days</div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Keep up the great work!
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Progress Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Progress Tracking</CardTitle>
                <CardDescription>Track your consistency and improvements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((week) => (
                    <div key={week} className="flex items-center space-x-4">
                      <div className="w-16 text-sm font-medium">Week {week}</div>
                      <Progress value={week <= currentWeek ? 100 : 0} className="flex-1" />
                      <div className="w-16 text-sm text-gray-600">
                        {week <= currentWeek ? '100%' : '0%'}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Understanding Your Programme</CardTitle>
                <CardDescription>Learn why each phase is important for your recovery</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-orange-600">Phase 1: Activation & Stability</h3>
                  <p className="text-gray-700 mb-3">
                    The first phase focuses on "waking up" your glutes and establishing basic stability patterns. 
                    After months or years of underactivity, your glutes need to be reminded how to fire properly 
                    before we can ask them to work harder.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Restore basic glute activation patterns</li>
                    <li>• Improve hip mobility and reduce compensation</li>
                    <li>• Establish core stability and pelvic control</li>
                    <li>• Begin addressing postural dysfunction</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-blue-600">Phase 2: Strength Without Strain</h3>
                  <p className="text-gray-700 mb-3">
                    Building upon the activation patterns established in Phase 1, we progressively load your glutes 
                    while maintaining perfect movement quality. The focus shifts from simply getting your glutes to 
                    fire to making them stronger and more resilient.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Progressive strengthening of the gluteal complex</li>
                    <li>• Introducing multi-planar movements</li>
                    <li>• Beginning functional integration</li>
                    <li>• Addressing remaining compensation patterns</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-green-600">Phase 3: Power & Integration</h3>
                  <p className="text-gray-700 mb-3">
                    The final phase represents the culmination of your glute recovery journey. With activation 
                    patterns established and basic strength developed, we now focus on power development and 
                    full functional integration.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Developing glute power and explosiveness</li>
                    <li>• Full integration into functional movement patterns</li>
                    <li>• Preparing for return to higher-level activities</li>
                    <li>• Establishing long-term maintenance strategies</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Coach Pete Ryan</span>
                  </CardTitle>
                  <CardDescription>
                    Level 4 Lower Back Pain Specialist • 2x British Kickboxing Champion
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">🧭 Explorer • 🥊 Fighter • 🧠 Mentor</h4>
                    <p className="text-sm text-gray-600">
                      Specialising in movement dysfunction and pain-free performance. 
                      Helping clients restore function and return to the activities they love.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">📞 Phone:</span>
                      <span className="text-sm">07308 518 428</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">📧 Email:</span>
                      <span className="text-sm">pete@coachpeteryan.com</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">📍 Location:</span>
                      <span className="text-sm">Puregym, Wey Retail Park, Byfleet</span>
                    </div>
                  </div>

                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Book Your Free Consultation
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Contact</CardTitle>
                  <CardDescription>Scan to message Coach Pete directly on WhatsApp</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4">
                  <img 
                    src={whatsappQR} 
                    alt="WhatsApp QR Code" 
                    className="w-48 h-48 border rounded-lg"
                  />
                  <p className="text-sm text-center text-gray-600">
                    Scan with your phone camera to start a conversation about your progress, 
                    ask questions, or book your next session.
                  </p>
                  <Button variant="outline" className="w-full">
                    <Heart className="w-4 h-4 mr-2" />
                    Ready for 1:1 Training?
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* CTA Section */}
            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Take Your Recovery Further?</h3>
                <p className="text-lg mb-6 opacity-90">
                  This programme is just the beginning. Unlock your full potential with personalised 1:1 training 
                  designed specifically for your goals and needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" className="text-orange-600">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Free Assessment
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Message Pete Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default App

