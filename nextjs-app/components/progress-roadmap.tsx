'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Lock } from "lucide-react"

const roadmapSteps = [
  {
    id: 1,
    title: "Salamu",
    description: "Jifunze salamu za kimsingi",
    status: "completed",
    lessons: 3,
    completedLessons: 3
  },
  {
    id: 2,
    title: "Nambari",
    description: "Hesabu 1-20",
    status: "completed", 
    lessons: 2,
    completedLessons: 2
  },
  {
    id: 3,
    title: "Familia",
    description: "Wanafamilia na uhusiano",
    status: "current",
    lessons: 4,
    completedLessons: 2
  },
  {
    id: 4,
    title: "Rangi",
    description: "Rangi na maumbo",
    status: "locked",
    lessons: 3,
    completedLessons: 0
  },
  {
    id: 5,
    title: "Wanyamapori",
    description: "Wanyamapori wa Afrika",
    status: "locked",
    lessons: 5,
    completedLessons: 0
  },
  {
    id: 6,
    title: "Chakula",
    description: "Aina za chakula",
    status: "locked",
    lessons: 4,
    completedLessons: 0
  }
]

export function ProgressRoadmap() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white dyslexic-text mb-6">
        Ramani ya Maendeleo
      </h3>
      
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-6 top-8 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-primary-300 to-gray-300 dark:to-gray-600"></div>
        
        {roadmapSteps.map((step, index) => (
          <div key={step.id} className="relative flex items-start space-x-4 pb-8">
            {/* Status Icon */}
            <div className={`
              relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4
              ${step.status === 'completed' 
                ? 'bg-success-500 border-success-200 text-white' 
                : step.status === 'current'
                ? 'bg-primary-500 border-primary-200 text-white animate-pulse'
                : 'bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-400'
              }
            `}>
              {step.status === 'completed' ? (
                <CheckCircle className="w-6 h-6" />
              ) : step.status === 'current' ? (
                <Circle className="w-6 h-6 fill-current" />
              ) : (
                <Lock className="w-6 h-6" />
              )}
            </div>
            
            {/* Content Card */}
            <Card className={`
              flex-1 transition-all duration-300
              ${step.status === 'completed' ? 'bg-gradient-to-r from-sky-50 to-sky-100 dark:from-sky-900/20 dark:to-sky-800/20 border-sky-200/50' :
                step.status === 'current' ? 'bg-gradient-to-r from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20 border-violet-200/50 ring-2 ring-violet-200 dark:ring-violet-800' :
                'bg-gradient-to-r from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 border-pink-200/50 opacity-60'}
            `}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`font-semibold dyslexic-text ${
                    step.status === 'completed' ? 'text-sky-800 dark:text-sky-200' :
                    step.status === 'current' ? 'text-violet-800 dark:text-violet-200' :
                    'text-pink-800 dark:text-pink-200'
                  }`}>
                    {step.title}
                  </h4>
                  <Badge 
                    className={`text-xs dyslexic-text ${
                      step.status === 'completed' ? 'bg-sky-200 text-sky-800 dark:bg-sky-800 dark:text-sky-200' :
                      step.status === 'current' ? 'bg-violet-200 text-violet-800 dark:bg-violet-800 dark:text-violet-200' :
                      'bg-pink-200 text-pink-800 dark:bg-pink-800 dark:text-pink-200'
                    }`}
                  >
                    {step.status === 'completed' ? 'Kamili' : 
                     step.status === 'current' ? 'Sasa' : 
                     'Imefungwa'}
                  </Badge>
                </div>
                
                <p className={`text-sm dyslexic-text mb-3 ${
                  step.status === 'completed' ? 'text-sky-600 dark:text-sky-400' :
                  step.status === 'current' ? 'text-violet-600 dark:text-violet-400' :
                  'text-pink-600 dark:text-pink-400'
                }`}>
                  {step.description}
                </p>
                
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className={`flex justify-between text-xs dyslexic-text ${
                    step.status === 'completed' ? 'text-sky-500 dark:text-sky-400' :
                    step.status === 'current' ? 'text-violet-500 dark:text-violet-400' :
                    'text-pink-500 dark:text-pink-400'
                  }`}>
                    <span>{step.completedLessons} kati ya {step.lessons} masomo</span>
                    <span>{Math.round((step.completedLessons / step.lessons) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`
                        h-2 rounded-full transition-all duration-500
                        ${step.status === 'completed' ? 'bg-success-500' : 
                          step.status === 'current' ? 'bg-primary-500' : 
                          'bg-gray-300 dark:bg-gray-600'}
                      `}
                      style={{ width: `${(step.completedLessons / step.lessons) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}