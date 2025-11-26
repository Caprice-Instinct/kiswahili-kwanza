"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { User, Lock, Key, Settings } from "lucide-react";

export default function ParentPortal() {
  const { data: session } = useSession();
  const [learner, setLearner] = useState<any>(null);

  // PIN logic
  const [pin, setPin] = useState("");
  const [showPortal, setShowPortal] = useState(false);
  const [error, setError] = useState("");
  // Settings modal
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [changingPin, setChangingPin] = useState(false);
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [changeError, setChangeError] = useState("");

  // Get or set default PIN in localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPin = localStorage.getItem("guardian_portal_pin");
      if (!storedPin) {
        localStorage.setItem("guardian_portal_pin", "000000");
      }
    }
  }, []);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPin = localStorage.getItem("guardian_portal_pin") || "000000";
    if (pin === storedPin) {
      setShowPortal(true);
      setError("");
    } else {
      setError("Nambari ya siri si sahihi. Tafadhali jaribu tena.");
    }
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length !== 6 || !/^[0-9]{6}$/.test(newPin)) {
      setChangeError("PIN mpya lazima iwe tarakimu 6.");
      return;
    }
    if (newPin !== confirmPin) {
      setChangeError("PIN mpya na uthibitisho hailingani.");
      return;
    }
    localStorage.setItem("guardian_portal_pin", newPin);
    setChangingPin(false);
    setNewPin("");
    setConfirmPin("");
    setChangeError("");
    alert("PIN imebadilishwa kwa mafanikio!");
  };

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
    <div className="max-w-4xl mx-auto py-10 px-4 relative bg-primary-50 dark:bg-primary-900 min-h-screen">
      {/* Settings Icon */}
      {showPortal && (
        <button
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-primary-100 dark:hover:bg-primary-800 focus:outline-none"
          onClick={() => setSettingsOpen(true)}
          aria-label="Mipangilio"
        >
          <Settings className="h-6 w-6 text-primary-700 dark:text-primary-100" />
        </button>
      )}

      {/* PIN Modal */}
      {!showPortal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-primary-900 rounded-lg shadow-lg p-8 w-full max-w-xs border border-primary-200 dark:border-primary-800">
            <div className="flex flex-col items-center mb-4">
              <Lock className="h-8 w-8 text-primary-600 mb-2" />
              <h2 className="text-lg font-bold mb-2 text-primary-800 dark:text-primary-100 dyslexic-text">
                Lango la Mlezi
              </h2>
              <p className="text-sm text-primary-700 dark:text-primary-200 dyslexic-text mb-2">
                Weka nambari ya siri ya mlezi ili kufungua lango.
              </p>
            </div>
            <form onSubmit={handlePinSubmit} className="flex flex-col gap-3">
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                minLength={6}
                className="border border-primary-200 dark:border-primary-700 rounded px-3 py-2 text-lg text-center dyslexic-text bg-primary-50 dark:bg-primary-800 text-primary-900 dark:text-primary-100"
                placeholder="000000"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ""))}
                autoFocus
              />
              {error && (
                <span className="text-red-600 dyslexic-text text-sm">
                  {error}
                </span>
              )}
              <Button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white dyslexic-text"
              >
                Ingia
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Guardian Dashboard */}
      {showPortal && (
        <>
          <h1 className="text-2xl font-bold mb-6 text-primary-800 dark:text-primary-100 dyslexic-text">
            Dashibodi ya Mlezi
          </h1>
          {/* Recent Activity Card */}
          <Card className="mb-6 bg-primary-100 dark:bg-primary-800 border-primary-200 dark:border-primary-700">
            <CardHeader>
              <CardTitle className="dyslexic-text flex items-center gap-2 text-primary-800 dark:text-primary-100">
                <User className="h-5 w-5 text-primary-600 dark:text-primary-200" />
                Shughuli za Hivi Karibuni za Mwanafunzi
              </CardTitle>
            </CardHeader>
            <CardContent>
              {learner ? (
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Jina:</span> {learner.name}
                  </p>
                  <p>
                    <span className="font-medium">Barua Pepe:</span>{" "}
                    {learner.email}
                  </p>
                  {/* TODO: Show last activity, last lesson/quiz, etc. */}
                  <p className="text-primary-700 dark:text-primary-200">
                    Shughuli ya mwisho:{" "}
                    <span className="font-semibold">(placeholder)</span>
                  </p>
                </div>
              ) : (
                <p className="text-primary-400 dyslexic-text">
                  Hakuna taarifa za mwanafunzi zilizopatikana.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Progress Summary Card */}
          <Card className="mb-6 bg-secondary-50 dark:bg-secondary-900 border-secondary-200 dark:border-secondary-700">
            <CardHeader>
              <CardTitle className="dyslexic-text text-secondary-800 dark:text-secondary-100">
                Muhtasari wa Maendeleo
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* TODO: Replace with real progress data */}
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm dyslexic-text">
                  <thead>
                    <tr className="bg-secondary-100 dark:bg-secondary-800">
                      <th className="px-4 py-2">Tarehe</th>
                      <th className="px-4 py-2">Somu</th>
                      <th className="px-4 py-2">Alama (%)</th>
                      <th className="px-4 py-2">Muda (dakika)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Example row */}
                    <tr>
                      <td className="border px-4 py-2 border-secondary-200 dark:border-secondary-700">
                        2025-11-25
                      </td>
                      <td className="border px-4 py-2 border-secondary-200 dark:border-secondary-700">
                        Msamiati
                      </td>
                      <td className="border px-4 py-2 border-secondary-200 dark:border-secondary-700">
                        85
                      </td>
                      <td className="border px-4 py-2 border-secondary-200 dark:border-secondary-700">
                        20
                      </td>
                    </tr>
                    {/* TODO: Map real progress data here */}
                  </tbody>
                </table>
              </div>
              {/* Placeholder for graph/chart */}
              <div className="mt-6">
                <div className="h-40 bg-secondary-100 dark:bg-secondary-800 rounded flex items-center justify-center text-secondary-400">
                  <span className="dyslexic-text">
                    (Mchoro wa maendeleo utakuja hapa)
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Reports Section */}
          <Card className="bg-primary-50 dark:bg-primary-900 border-primary-200 dark:border-primary-800">
            <CardHeader>
              <CardTitle className="dyslexic-text text-primary-800 dark:text-primary-100">
                Ripoti za Maendeleo kwa Muda
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* TODO: Table or graph of progress over time */}
              <div className="text-primary-400 dyslexic-text">
                (Ripoti za maendeleo zitaonyeshwa hapa)
              </div>
            </CardContent>
          </Card>

          {/* Settings Modal */}
          {settingsOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white dark:bg-primary-900 rounded-lg shadow-lg p-8 w-full max-w-sm border border-primary-200 dark:border-primary-800 relative">
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-primary-600"
                  onClick={() => setSettingsOpen(false)}
                >
                  &times;
                </button>
                <h2 className="text-lg font-bold mb-4 text-primary-800 dark:text-primary-100 dyslexic-text flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Mipangilio
                </h2>
                {/* Change PIN section */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-2 dyslexic-text flex items-center gap-2">
                    <Key className="h-4 w-4" />
                    Badilisha PIN ya Lango la Mlezi
                  </h3>
                  {!changingPin ? (
                    <Button
                      onClick={() => setChangingPin(true)}
                      className="bg-primary-600 hover:bg-primary-700 text-white dyslexic-text"
                    >
                      Badilisha PIN
                    </Button>
                  ) : (
                    <form
                      onSubmit={handleChangePin}
                      className="flex flex-col gap-3 max-w-xs"
                    >
                      <input
                        type="password"
                        inputMode="numeric"
                        pattern="[0-9]{6}"
                        maxLength={6}
                        minLength={6}
                        className="border border-primary-200 dark:border-primary-700 rounded px-3 py-2 text-lg text-center dyslexic-text bg-primary-50 dark:bg-primary-800 text-primary-900 dark:text-primary-100"
                        placeholder="PIN mpya (6 tarakimu)"
                        value={newPin}
                        onChange={(e) =>
                          setNewPin(e.target.value.replace(/[^0-9]/g, ""))
                        }
                      />
                      <input
                        type="password"
                        inputMode="numeric"
                        pattern="[0-9]{6}"
                        maxLength={6}
                        minLength={6}
                        className="border border-primary-200 dark:border-primary-700 rounded px-3 py-2 text-lg text-center dyslexic-text bg-primary-50 dark:bg-primary-800 text-primary-900 dark:text-primary-100"
                        placeholder="Thibitisha PIN mpya"
                        value={confirmPin}
                        onChange={(e) =>
                          setConfirmPin(e.target.value.replace(/[^0-9]/g, ""))
                        }
                      />
                      {changeError && (
                        <span className="text-red-600 dyslexic-text text-sm">
                          {changeError}
                        </span>
                      )}
                      <div className="flex gap-2">
                        <Button
                          type="submit"
                          className="bg-primary-600 hover:bg-primary-700 text-white dyslexic-text"
                        >
                          Hifadhi
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setChangingPin(false);
                            setChangeError("");
                          }}
                        >
                          Ghairi
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
                {/* TODO: Add profile edit section here */}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
