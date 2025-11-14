'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Heart } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white dyslexic-text">Masharti na Hali</h1>
                <p className="text-gray-600 dark:text-gray-300 dyslexic-text">Terms and Conditions</p>
              </div>
            </div>
            <Link href="/auth/signin">
              <Button variant="outline" className="dyslexic-text">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Rudi
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl dyslexic-text">Masharti na Hali za Kiswahili Kwanza</CardTitle>
              <p className="text-sm text-gray-600 dyslexic-text">Tarehe ya mwisho ya kubadilisha: Desemba 2024</p>
            </CardHeader>
            <CardContent className="space-y-6 dyslexic-text">
              <section>
                <h2 className="text-lg font-semibold mb-3">1. Kukubali Masharti</h2>
                <p className="text-gray-700 leading-relaxed">
                  Kwa kutumia jukwaa la Kiswahili Kwanza, unakubali kufuata masharti haya yote.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">2. Huduma Zetu</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Kiswahili Kwanza ni jukwaa la kujifunza lugha ya Kiswahili linalowasilisha:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Masomo ya kuelekeza kujifunza Kiswahili</li>
                  <li>Mazoezi ya kufanya</li>
                  <li>Ufuatiliaji wa maendeleo</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">3. Akaunti ya Mtumiaji</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Ili kutumia huduma zetu, unahitaji kutengeneza akaunti. Unawajibika:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Kutoa taarifa sahihi na za kweli</li>
                  <li>Kulinda nenosiri lako</li>
                  <li>Kuhakikisha umri wako ni kati ya miaka 5-12</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">4. Matumizi Yanayoruhusiwa</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Kujifunza lugha ya Kiswahili</li>
                  <li>Kufanya mazoezi ya lugha</li>
                  <li>Kufuatilia maendeleo yako</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">5. Faragha na Data</h2>
                <p className="text-gray-700 leading-relaxed">
                  Tunalinda faragha yako. Soma <Link href="/privacy" className="text-primary-600 hover:underline">Sera ya Faragha</Link> 
                  ili kuelewa jinsi tunavyokusanya taarifa zako.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">6. Mawasiliano</h2>
                <p className="text-gray-700 leading-relaxed">
                  Maswali? Tuandikie: <span className="font-medium">support@kiswahili-kwanza.com</span>
                </p>
              </section>

              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mt-8">
                <p className="text-primary-700 text-sm">
                  <strong>Kumbuka:</strong> Jukwaa hili limeundwa kwa watoto wenye dyslexia.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}