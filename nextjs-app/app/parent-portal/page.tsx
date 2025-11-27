"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useMemo, useState, useEffect } from "react";
// (Removed unused chart.js and react-chartjs-2 imports)
import { Settings, Key, Lock, User } from "lucide-react";

import {
  QuizScoreBarChart,
  QuizPassPieChart,
  QuizProgressLineChart,
} from "@/components/quiz/quiz-charts";

// --- Client Component ---
export default function ParentPortal() {
  const { data: session } = useSession();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [changingPin, setChangingPin] = useState(false);
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [changeError, setChangeError] = useState("");
  const [learner, setLearner] = useState<any>(null);
  const [quizAttempts, setQuizAttempts] = useState<any[]>([]);

  // --- Handlers ---
  function handlePinSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (pin.length !== 6) {
      setError("PIN inapaswa kuwa na tarakimu 6.");
      return;
    }
    // TODO: Validate PIN with the server
  }

  function handleChangePin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setChangeError("");
    if (newPin !== confirmPin) {
      setChangeError("PIN mpya na thibitisho hav совпадают.");
      return;
    }
    // TODO: Change PIN on the server
  }

  // --- Effects ---
  useEffect(() => {
    // Fetch learner profile and quiz attempts from API using session user id/email
    async function fetchData() {
      if (!session?.user?.id && !session?.user?.email) return;
      // 1. Fetch learner profile
      let learnerRes = null;
      try {
        learnerRes = await fetch(
          `/api/parent/learner-profile?learnerId=${session.user.id || ""}`
        );
        if (learnerRes.ok) {
          const learnerData = await learnerRes.json();
          setLearner(learnerData);
        }
      } catch (err) {
        // Optionally handle error
      }
      // 2. Fetch quiz attempts
      try {
        const attemptsRes = await fetch(
          `/api/quiz/progress?userId=${session.user.id || ""}`
        );
        if (attemptsRes.ok) {
          const attemptsData = await attemptsRes.json();
          setQuizAttempts(attemptsData.attempts || []);
        }
      } catch (err) {
        // Optionally handle error
      }
    }
    fetchData();
  }, [session]);

  // --- Data Preparation ---
  const weeklyData = useMemo(() => {
    const map: Record<string, { total: number; count: number; pass: number }> =
      {};
    quizAttempts.forEach((a) => {
      const date = a.completedAt || a.date || a.createdAt;
      if (!date) return;
      const week = getWeek(date);
      const percent =
        typeof a.percentage === "number"
          ? a.percentage
          : a.score && a.total
          ? Math.round((a.score / a.total) * 100)
          : 0;
      if (!map[week]) map[week] = { total: 0, count: 0, pass: 0 };
      map[week].total += percent;
      map[week].count += 1;
      if (percent >= 70) map[week].pass += 1;
    });
    return Object.entries(map)
      .map(([week, { total, count, pass }]) => ({
        period: week,
        avg: Math.round(total / count),
        count,
        passRate: count ? Math.round((pass / count) * 100) : 0,
      }))
      .sort((a, b) => a.period.localeCompare(b.period));
  }, [quizAttempts]);

  const monthlyData = useMemo(() => {
    const map: Record<string, { total: number; count: number; pass: number }> =
      {};
    quizAttempts.forEach((a) => {
      const date = a.completedAt || a.date || a.createdAt;
      if (!date) return;
      const month = getMonth(date);
      const percent =
        typeof a.percentage === "number"
          ? a.percentage
          : a.score && a.total
          ? Math.round((a.score / a.total) * 100)
          : 0;
      if (!map[month]) map[month] = { total: 0, count: 0, pass: 0 };
      map[month].total += percent;
      map[month].count += 1;
      if (percent >= 70) map[month].pass += 1;
    });
    return Object.entries(map)
      .map(([month, { total, count, pass }]) => ({
        period: month,
        avg: Math.round(total / count),
        count,
        passRate: count ? Math.round((pass / count) * 100) : 0,
      }))
      .sort((a, b) => a.period.localeCompare(b.period));
  }, [quizAttempts]);

  // --- Render ---
  return (
    <div className="p-4">
      {session?.user ? (
        <>
          {/* Welcome Card */}
          <Card className="mb-6">
            <CardContent>
              <h2 className="text-xl font-bold text-primary-800 dark:text-primary-100 dyslexic-text">
                Karibu, {session.user.name || "Mwalimu"}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 dyslexic-text">
                Hapa ndipo unaweza kufuatilia maendeleo ya wanafunzi wako na
                shughuli zao za hivi karibuni.
              </p>
            </CardContent>
          </Card>
          {/* Recent Attempts Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="dyslexic-text text-primary-800 dark:text-primary-100">
                Jaribio la Karibuni
              </CardTitle>
            </CardHeader>
            <CardContent>
              {quizAttempts.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2 text-left">Kichwa</th>
                        <th className="p-2 text-left">Alama</th>
                        <th className="p-2 text-left">Jumla</th>
                        <th className="p-2 text-left">Tarehe</th>
                        <th className="p-2 text-left">Hali</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quizAttempts.map((attempt, idx) => {
                        const date = new Date(
                          attempt.completedAt ||
                            attempt.date ||
                            attempt.createdAt
                        );
                        // Use a unique key: prefer attempt.id, fallback to a combo of date+idx
                        const key =
                          attempt.id ||
                          attempt._id ||
                          `${date.getTime()}-${idx}`;
                        return (
                          <tr key={key} className="border-b">
                            <td className="p-2">{attempt.category}</td>
                            <td className="p-2">{attempt.score}</td>
                            <td className="p-2">{attempt.totalPoints}</td>
                            <td className="p-2">{date.toLocaleString()}</td>
                            {/* Removed Hali (Status) cell */}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-gray-500 text-center">
                  Bado hujafanya jaribio lolote.
                </div>
              )}
            </CardContent>
          </Card>
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
              {/* Table removed, only charts below */}
              {/* Quiz Visualizations */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-2 dyslexic-text">
                    Mchoro wa Alama kwa Jamii
                  </h3>
                  <QuizScoreBarChart data={quizAttempts} />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 dyslexic-text">
                    Uwiano wa Umepitaji
                  </h3>
                  <QuizPassPieChart data={quizAttempts} />
                </div>
              </div>
              <div className="mt-8">
                <h3 className="font-semibold mb-2 dyslexic-text">
                  Mchoro wa Maendeleo kwa Muda
                </h3>
                <QuizProgressLineChart data={quizAttempts} />
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
              {/* Weekly/Monthly Summary */}
              <WeeklyMonthlySummary data={quizAttempts} />
              {/* Downloadable CSV Report */}
              <DownloadCSVReport data={quizAttempts} />
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
      ) : (
        <form
          onSubmit={handlePinSubmit}
          className="max-w-xs mx-auto mt-20 bg-white dark:bg-primary-900 p-8 rounded-lg shadow-md flex flex-col gap-4 border border-primary-200 dark:border-primary-800"
        >
          <h2 className="text-xl font-bold text-primary-800 dark:text-primary-100 dyslexic-text flex items-center gap-2 justify-center">
            <Lock className="h-5 w-5" />
            Ingiza PIN ya Mzazi/Mlezi
          </h2>
          <input
            type="password"
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            minLength={6}
            className="border border-primary-200 dark:border-primary-700 rounded px-3 py-2 text-lg text-center dyslexic-text bg-primary-50 dark:bg-primary-800 text-primary-900 dark:text-primary-100"
            placeholder="PIN (6 tarakimu)"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ""))}
            required
          />
          {error && (
            <span className="text-red-600 dyslexic-text text-sm">{error}</span>
          )}
          <Button
            type="submit"
            className="bg-primary-600 hover:bg-primary-700 text-white dyslexic-text"
          >
            Fungua Portal
          </Button>
          <button
            type="button"
            className="text-primary-600 dark:text-primary-200 underline dyslexic-text mt-2"
            onClick={() => setSettingsOpen(true)}
          >
            Umesahau au unataka kubadilisha PIN?
          </button>
        </form>
      )}
    </div>
  );
}

// --- Helper: Group attempts by week and month ---
function getWeek(dateStr: string) {
  const d = new Date(dateStr);
  const onejan = new Date(d.getFullYear(), 0, 1);
  return (
    d.getFullYear() +
    "-W" +
    String(
      Math.ceil(
        ((d.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7
      )
    ).padStart(2, "0")
  );
}
function getMonth(dateStr: string) {
  const d = new Date(dateStr);
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");
}

function WeeklyMonthlySummary({ data }: { data: any[] }) {
  const weekly = useMemo(() => {
    const map: Record<string, { total: number; count: number; pass: number }> =
      {};
    data.forEach((a) => {
      const date = a.completedAt || a.date || a.createdAt;
      if (!date) return;
      const week = getWeek(date);
      const percent =
        typeof a.percentage === "number"
          ? a.percentage
          : a.score && a.total
          ? Math.round((a.score / a.total) * 100)
          : 0;
      if (!map[week]) map[week] = { total: 0, count: 0, pass: 0 };
      map[week].total += percent;
      map[week].count += 1;
      if (percent >= 70) map[week].pass += 1;
    });
    return Object.entries(map)
      .map(([week, { total, count, pass }]) => ({
        period: week,
        avg: Math.round(total / count),
        count,
        passRate: count ? Math.round((pass / count) * 100) : 0,
      }))
      .sort((a, b) => a.period.localeCompare(b.period));
  }, [data]);
  const monthly = useMemo(() => {
    const map: Record<string, { total: number; count: number; pass: number }> =
      {};
    data.forEach((a) => {
      const date = a.completedAt || a.date || a.createdAt;
      if (!date) return;
      const month = getMonth(date);
      const percent =
        typeof a.percentage === "number"
          ? a.percentage
          : a.score && a.total
          ? Math.round((a.score / a.total) * 100)
          : 0;
      if (!map[month]) map[month] = { total: 0, count: 0, pass: 0 };
      map[month].total += percent;
      map[month].count += 1;
      if (percent >= 70) map[month].pass += 1;
    });
    return Object.entries(map)
      .map(([month, { total, count, pass }]) => ({
        period: month,
        avg: Math.round(total / count),
        count,
        passRate: count ? Math.round((pass / count) * 100) : 0,
      }))
      .sort((a, b) => a.period.localeCompare(b.period));
  }, [data]);
  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold dyslexic-text mb-2">
          Muhtasari wa Kila Wiki
        </h4>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Wiki</th>
                <th className="p-2 text-left">Idadi</th>
                <th className="p-2 text-left">Wastani (%)</th>
                <th className="p-2 text-left">Pass Rate (%)</th>
              </tr>
            </thead>
            <tbody>
              {weekly.map((row) => (
                <tr key={row.period} className="border-b">
                  <td className="p-2">{row.period}</td>
                  <td className="p-2">{row.count}</td>
                  <td className="p-2">{row.avg}</td>
                  <td className="p-2">{row.passRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h4 className="font-semibold dyslexic-text mb-2">
          Muhtasari wa Kila Mwezi
        </h4>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Mwezi</th>
                <th className="p-2 text-left">Idadi</th>
                <th className="p-2 text-left">Wastani (%)</th>
                <th className="p-2 text-left">Pass Rate (%)</th>
              </tr>
            </thead>
            <tbody>
              {monthly.map((row) => (
                <tr key={row.period} className="border-b">
                  <td className="p-2">{row.period}</td>
                  <td className="p-2">{row.count}</td>
                  <td className="p-2">{row.avg}</td>
                  <td className="p-2">{row.passRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- Helper: Download CSV ---
function DownloadCSVReport({ data }: { data: any[] }) {
  function toCSV(rows: any[]) {
    if (!rows.length) return "";
    const header = Object.keys(rows[0]);
    const escape = (v: any) =>
      typeof v === "string" && v.includes(",")
        ? `"${v.replace(/"/g, '""')}"`
        : v;
    return [
      header.join(","),
      ...rows.map((r) => header.map((h) => escape(r[h])).join(",")),
    ].join("\n");
  }
  function handleDownload() {
    const rows = data.map((a) => ({
      Category: a.category || a.metadata?.category || a.quizCategory || "-",
      Difficulty:
        a.difficulty || a.metadata?.difficulty || a.quizDifficulty || "-",
      Score: typeof a.score === "number" ? a.score : a.points || 0,
      Total: a.totalPoints || a.total || a.maxScore || 0,
      Percentage:
        typeof a.percentage === "number"
          ? a.percentage
          : a.score && a.total
          ? Math.round((a.score / a.total) * 100)
          : 0,
      Date: a.completedAt || a.date || a.createdAt || "-",
      Passed:
        typeof a.passed === "boolean"
          ? a.passed
          : typeof a.percentage === "number"
          ? a.percentage >= 70
          : a.score && a.total
          ? (a.score / a.total) * 100 >= 70
          : false,
    }));
    const csv = toCSV(rows);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `quiz_progress_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  return (
    <div className="mt-4">
      <button
        className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded dyslexic-text"
        onClick={handleDownload}
      >
        Pakua Ripoti (CSV)
      </button>
    </div>
  );
}
