"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 dyslexic-text">
            Majaribio ya Kiswahili
          </h1>
          <p className="text-gray-600 dark:text-gray-300 dyslexic-text">
            Chagua jaribio au tengeneza lako mwenyewe ili kuboresha Kiswahili
            chako!
          </p>
        </div>
        <div className="flex flex-col items-center gap-6">
          {/* Existing quiz categories/components can be rendered here */}
          <Link href="/quiz/generate">
            <Button className="text-lg px-8 py-4 dyslexic-text" size="lg">
              Tengeneza Jaribio Lako Mwenyewe
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
