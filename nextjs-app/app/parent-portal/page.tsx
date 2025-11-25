"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { User } from "lucide-react";

export default function ParentPortal() {
  const { data: session } = useSession();
  const [learner, setLearner] = useState<any>(null);

  useEffect(() => {
    // Fetch learner info for the parent using learnerId from session (if available)
    if (session && session.user && session.user.id) {
      fetch(`/api/parent/learner-profile?learnerId=${session.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && !data.error) setLearner(data);
        });
    }
  }, [session]);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <Card className="mb-8 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200/50 dark:border-amber-700/30">
        <CardHeader>
          <CardTitle className="dyslexic-text flex items-center gap-2 text-amber-800 dark:text-amber-200">
            <User className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            Portal ya Mzazi/Mlezi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="dyslexic-text text-amber-700 dark:text-amber-300 mb-4">
            Karibu kwenye Portal ya Mzazi/Mlezi. Hapa unaweza kuona taarifa za
            mwanafunzi wako na maendeleo yake.
          </p>
          {/* Placeholder for parent sign-in or info */}
          <div className="mb-6">
            <Button disabled className="w-full dyslexic-text">
              (Ingia kama Mzazi/Mlezi - Coming Soon)
            </Button>
          </div>
          {/* Learner profile info */}
          {learner ? (
            <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
              <h2 className="text-lg font-semibold dyslexic-text mb-2">
                Profaili ya Mwanafunzi
              </h2>
              <p>
                <span className="font-medium">Jina:</span> {learner.name}
              </p>
              <p>
                <span className="font-medium">Barua Pepe:</span> {learner.email}
              </p>
              {/* Add more learner info as needed */}
            </div>
          ) : (
            <p className="text-gray-500">
              Hakuna taarifa za mwanafunzi zilizopatikana.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
