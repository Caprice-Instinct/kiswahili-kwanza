import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
  LabelList,
} from "recharts";

type QuizAttempt = {
  category?: string;
  metadata?: { category?: string };
  quizCategory?: string;
  percentage?: number;
  score?: number;
  total?: number;
  difficulty?: string;
  completedAt?: string;
  date?: string;
  createdAt?: string;
};

export function QuizScoreBarChart({ data }: { data: QuizAttempt[] }) {
  const chartData = getCategoryAverages(data);
  return (
    <ResponsiveContainer width="100%" height={40 + chartData.length * 40}>
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 16, right: 16, left: 40, bottom: 16 }}
      >
        <XAxis
          type="number"
          domain={[0, 100]}
          tickFormatter={(v: number) => `${v}%`}
        />
        <YAxis type="category" dataKey="category" width={120} />
        <Tooltip formatter={(v: number) => `${v}%`} />
        <Bar dataKey="percentage" fill="#0ea5e9" name="Asilimia">
          <LabelList
            dataKey="percentage"
            position="right"
            content={(props: { value?: number }) =>
              props.value !== undefined ? `${props.value}%` : ""
            }
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
  // Helper to group by category and average percentage
  function getCategoryAverages(
    data: QuizAttempt[]
  ): { category: string; percentage: number }[] {
    const grouped: Record<string, { total: number; count: number }> = {};
    data.forEach((a) => {
      const cat =
        a.category || a.metadata?.category || a.quizCategory || "(Haijulikani)";
      if (!cat || cat === "-" || cat === "undefined") return;
      if (!grouped[cat]) grouped[cat] = { total: 0, count: 0 };
      const percent =
        typeof a.percentage === "number"
          ? a.percentage
          : a.score && a.total
          ? Math.round((a.score / a.total) * 100)
          : 0;
      grouped[cat].total += percent;
      grouped[cat].count += 1;
    });
    return Object.entries(grouped).map(([category, obj]) => ({
      category,
      percentage: Math.round(obj.total / obj.count),
    }));
  }
}

export function QuizPassPieChart({ data }: { data: QuizAttempt[] }) {
  // Pie chart for pass/fail breakdown
  const passCount = data.filter(
    (a) =>
      (typeof a.percentage === "number"
        ? a.percentage
        : a.score && a.total
        ? Math.round((a.score / a.total) * 100)
        : 0) >= 70
  ).length;
  const failCount = data.length - passCount;
  const pieData = [
    { name: "Umepita", value: passCount },
    { name: "Hujapita", value: failCount },
  ];
  const COLORS = ["#10b981", "#ef4444"];
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={60}
          label
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function QuizProgressLineChart({ data }: { data: QuizAttempt[] }) {
  // Line chart for progress over time
  const sorted = [...data].sort((a, b) => {
    const dateA = new Date(
      a.completedAt || a.date || a.createdAt || ""
    ).getTime();
    const dateB = new Date(
      b.completedAt || b.date || b.createdAt || ""
    ).getTime();
    return dateA - dateB;
  });
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart
        data={sorted}
        margin={{ top: 16, right: 16, left: 0, bottom: 0 }}
      >
        <XAxis
          dataKey={(a: QuizAttempt) =>
            new Date(
              a.completedAt || a.date || a.createdAt || ""
            ).toLocaleDateString("sw-KE")
          }
        />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="percentage"
          stroke="#6366f1"
          name="Asilimia"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
