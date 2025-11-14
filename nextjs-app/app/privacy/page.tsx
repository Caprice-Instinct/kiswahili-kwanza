'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Heart } from 'lucide-react'

export default function PrivacyPage() {
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
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white dyslexic-text">Sera ya Faragha</h1>
                <p className="text-gray-600 dark:text-gray-300 dyslexic-text">Privacy Policy</p>
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
              <CardTitle className="text-xl dyslexic-text">Sera ya Faragha ya Kiswahili Kwanza</CardTitle>
              <p className="text-sm text-gray-600 dyslexic-text">Tarehe ya mwisho ya kubadilisha: Desemba 2024</p>
            </CardHeader>
            <CardContent className="space-y-6 dyslexic-text">
              <section>
                <h2 className="text-lg font-semibold mb-3">1. Taarifa Tunazokusanya</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Tunakusanya taarifa hizi:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Jina lako na umri</li>
                  <li>Barua pepe (kwa wazazi au walezi)</li>
                  <li>Maendeleo ya masomo</li>
                  <li>Matokeo ya mazoezi</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">2. Jinsi Tunavyotumia Taarifa</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Tunatumia taarifa zako ili:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Kukupa masomo yanayokufaa</li>
                  <li>Kufuatilia maendeleo yako</li>
                  <li>Kuboresha huduma zetu</li>
                  <li>Kuwasiliana nawe kuhusu akaunti yako</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">3. Kushiriki Taarifa</h2>
                <p className="text-gray-700 leading-relaxed">
                  Hatutashiriki taarifa zako na mtu yeyote bila ruhusa yako. 
                  Taarifa zako ni salama na za siri.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">4. Usalama wa Data</h2>
                <p className="text-gray-700 leading-relaxed">
                  Tunatumia mbinu za kisasa za usalama kulinda taarifa zako. 
                  Data yako imehifadhiwa kwa usalama mkubwa.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">5. Haki Zako</h2>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Una haki ya:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Kuona taarifa zako</li>
                  <li>Kubadilisha taarifa zako</li>
                  <li>Kufuta akaunti yako</li>
                  <li>Kukataa matumizi fulani ya data yako</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">6. Watoto na Faragha</h2>
                <p className="text-gray-700 leading-relaxed">
                  Kwa kuwa huduma zetu ni kwa watoto, tunafuata sheria kali za kulinda faragha ya watoto. 
                  Tunashauriwa wazazi washiriki katika matumizi ya jukwaa hili.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">7. Mabadiliko ya Sera</h2>
                <p className="text-gray-700 leading-relaxed">
                  Ikiwa tutabadilisha sera hii, tutakujulisha kupitia barua pepe au ujumbe kwenye jukwaa.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-3">8. Mawasiliano</h2>
                <p className="text-gray-700 leading-relaxed">
                  Maswali kuhusu faragha yako? Tuandikie: 
                  <span className="font-medium"> privacy@kiswahili-kwanza.com</span>
                </p>
              </section>

              <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-4 mt-8">
                <p className="text-secondary-700 text-sm">
                  <strong>Muhimu:</strong> Faragha yako ni muhimu kwetu. Tunafanya kila kitu ili kulinda taarifa zako.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}