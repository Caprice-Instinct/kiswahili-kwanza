'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Lock } from "lucide-react"

const roadmapSteps: any[] = []

export function ProgressRoadmap() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white dyslexic-text mb-6">
        Ramani ya Maendeleo
      </h3>
      
      {roadmapSteps.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 dyslexic-text">
            Hakuna data ya maendeleo kwa sasa.
          </p>
        </div>
      ) : (
        <div className="relative">
          {/* Progress content would go here */}
        </div>
      )}
    </div>
  )
}