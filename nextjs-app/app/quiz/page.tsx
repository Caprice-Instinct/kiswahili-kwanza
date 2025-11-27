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
            Chagua moja ya majaribio yafuatayo au tengeneza lako mwenyewe ili
            kuboresha Kiswahili chako!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col gap-2 border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-300 dyslexic-text">
                Salamu
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 dyslexic-text">
                Jifunze salamu za msingi na jinsi ya kuwasiliana na watu kwa
                heshima.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col gap-2 border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-green-700 dark:text-green-300 dyslexic-text">
                Familia
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 dyslexic-text">
                Tambua majina ya wanafamilia na uhusiano wao katika Kiswahili.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col gap-2 border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-pink-700 dark:text-pink-300 dyslexic-text">
                Nambari
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 dyslexic-text">
                Jifunze kuhesabu na kutumia nambari katika mazungumzo ya kila
                siku.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col gap-2 border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-yellow-700 dark:text-yellow-300 dyslexic-text">
                Rangi
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300 dyslexic-text">
                Tambua na taja rangi mbalimbali kwa Kiswahili.
              </p>
            </div>
          </div>
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
