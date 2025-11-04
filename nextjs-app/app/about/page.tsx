import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Users, 
  Globe, 
  BookOpen, 
  Zap, 
  Volume2,
  Target,
  Award,
  CheckCircle,
  Star,
  Brain,
  Accessibility
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
              <Heart className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6 dyslexic-text">Kuhusu Kiswahili Kwanza</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto dyslexic-text leading-relaxed">
            Programu ya kujifunzia Kiswahili iliyotengenezwa maalum kwa watoto wenye dyslexia. 
            Tunatumia teknolojia ya AI na mbinu za kisayansi kurahisisha kujifunza.
          </p>
          <div className="flex justify-center mt-8">
            <Badge variant="secondary" className="text-lg px-4 py-2 dyslexic-text">
              Mradi wa Chuo Kikuu cha Strathmore
            </Badge>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission */}
        <Card className="mb-12">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-primary-600" />
            </div>
            <CardTitle className="text-3xl dyslexic-text">Dhumuni Letu</CardTitle>
            <CardDescription className="text-lg dyslexic-text">
              Kufanya kujifunza Kiswahili kuwe rahisi na kufurahisha
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed mb-6 dyslexic-text">
              Kiswahili Kwanza ni programu ya kipekee iliyotengenezwa kwa watoto wenye dyslexia 
              wa umri wa miaka 6-9. Tunatumia teknolojia ya AI, picha, sauti, na michezo 
              kurahisisha kujifunza lugha ya Kiswahili.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed dyslexic-text">
              Programu yetu inazingatia mahitaji maalum ya watoto wenye dyslexia na kutoa 
              mazingira ya kujifunza yanayowasaidia kufanikiwa.
            </p>
          </CardContent>
        </Card>

        {/* Special Features for Dyslexia */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 dyslexic-text">Kwa Watoto wenye Dyslexia</h2>
            <p className="text-lg text-gray-600 dyslexic-text">
              Vipengele maalum vya kusaidia watoto wenye dyslexia
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="card-hover">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Brain className="w-6 h-6 text-primary-600" />
                </div>
                <CardTitle className="dyslexic-text">Multisensory Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dyslexic-text text-center">
                  Tunatumia sauti, picha, na kugusa ili kusaidia kumbuka vizuri
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Accessibility className="w-6 h-6 text-secondary-600" />
                </div>
                <CardTitle className="dyslexic-text">Dyslexia-Friendly Design</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dyslexic-text text-center">
                  Rangi, fonti, na muundo umetengenezwa kwa watoto wenye dyslexia
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-success-600" />
                </div>
                <CardTitle className="dyslexic-text">Masomo Mafupi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dyslexic-text text-center">
                  Masomo ya dakika 5-10 tu ili kuepuka uchovu
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Volume2 className="w-6 h-6 text-warning-600" />
                </div>
                <CardTitle className="dyslexic-text">Sauti na Picha</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dyslexic-text text-center">
                  Kila neno lina sauti na picha ili kurahisisha kuelewa
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-primary-600" />
                </div>
                <CardTitle className="dyslexic-text">Tuzo na Zawadi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dyslexic-text text-center">
                  Mfumo wa tuzo unaowatia moyo watoto kuendelea kujifunza
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-secondary-600" />
                </div>
                <CardTitle className="dyslexic-text">AI Msaidizi</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dyslexic-text text-center">
                  Msaidizi wa akili bandia anayeelewa mahitaji ya kila mtoto
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why Kiswahili */}
        <Card className="mb-12">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-success-600" />
            </div>
            <CardTitle className="text-3xl dyslexic-text">Kwa Nini Kiswahili?</CardTitle>
            <CardDescription className="text-lg dyslexic-text">
              Faida za kujifunza lugha ya Kiswahili
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-success-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-700 dyslexic-text">
                    Inazungumzwa na watu zaidi ya milioni 100 Afrika Mashariki
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-success-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-700 dyslexic-text">
                    Lugha rasmi ya Tanzania, Kenya, Uganda, na Umoja wa Afrika
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-success-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-700 dyslexic-text">
                    Utamaduni tajiri wa Afrika Mashariki
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-success-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-700 dyslexic-text">
                    Rahisi kujifunza - maneno yanasomwa kama yanavyoandikwa
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-success-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-700 dyslexic-text">
                    Fursa za kazi na biashara Afrika Mashariki
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-success-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-700 dyslexic-text">
                    Lugha ya umoja na upendo Afrika
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Research & Development */}
        <Card className="mb-12">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-warning-600" />
            </div>
            <CardTitle className="text-3xl dyslexic-text">Utafiti na Maendeleo</CardTitle>
            <CardDescription className="text-lg dyslexic-text">
              Msingi wa kisayansi wa programu yetu
            </CardDescription>
          </CardHeader>
          <CardContent className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed mb-6 dyslexic-text text-center">
              Programu hii imetengenezwa kwa msingi wa utafiti wa kisayansi kuhusu dyslexia 
              na mbinu bora za kujifunzia lugha. Tumetumia mbinu za:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-primary-50 p-6 rounded-lg">
                <h4 className="font-bold text-primary-700 mb-3 dyslexic-text">Multisensory Approach</h4>
                <p className="text-primary-600 dyslexic-text">
                  Kutumia hisia nyingi (kuona, kusikia, kugusa) wakati wa kujifunza
                </p>
              </div>
              <div className="bg-secondary-50 p-6 rounded-lg">
                <h4 className="font-bold text-secondary-700 mb-3 dyslexic-text">Structured Literacy</h4>
                <p className="text-secondary-600 dyslexic-text">
                  Kujifunza kwa hatua za kimantiki kutoka rahisi hadi ngumu
                </p>
              </div>
              <div className="bg-success-50 p-6 rounded-lg">
                <h4 className="font-bold text-success-700 mb-3 dyslexic-text">Gamification</h4>
                <p className="text-success-600 dyslexic-text">
                  Kutumia michezo na tuzo ili kufanya kujifunza kuwe kufurahisha
                </p>
              </div>
              <div className="bg-warning-50 p-6 rounded-lg">
                <h4 className="font-bold text-warning-700 mb-3 dyslexic-text">AI Personalization</h4>
                <p className="text-warning-600 dyslexic-text">
                  Kutumia akili bandia kubinafsisha kujifunza kwa kila mtoto
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Developer Info */}
        <Card className="mb-12">
          <CardContent className="pt-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 dyslexic-text">Kuhusu Mtengenezaji</h3>
              <p className="text-lg text-gray-700 mb-4 dyslexic-text">
                <strong>Wabuga Linet Wangui</strong> - Mwanafunzi wa Informatics na Computer Science
              </p>
              <p className="text-gray-600 mb-6 dyslexic-text">
                Chuo Kikuu cha Strathmore, Nairobi, Kenya<br />
                Msimamizi: Dkt. Joseph Orero
              </p>
              <Badge variant="outline" className="dyslexic-text">
                Mradi wa Shahada ya Kwanza - 2025
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 dyslexic-text">
            Uko Tayari Kuanza Safari ya Kujifunza?
          </h2>
          <p className="text-lg text-gray-600 mb-8 dyslexic-text">
            Jiunge na watoto wengi wanaojifunza Kiswahili kwa furaha na mafanikio
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/lessons">
              <Button size="lg" className="text-lg px-8 py-4 dyslexic-text">
                <BookOpen className="w-5 h-5 mr-2" />
                Anza Kujifunza
              </Button>
            </Link>
            <Link href="/practice">
              <Button variant="secondary" size="lg" className="text-lg px-8 py-4 dyslexic-text">
                <Target className="w-5 h-5 mr-2" />
                Fanya Mazoezi
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
