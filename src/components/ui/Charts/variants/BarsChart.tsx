"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

const rawData = [
  { year: "2016-17", demand: 160 },
  { year: "2017-18", demand: 164 },
  { year: "2018-19", demand: 177 },
  { year: "2019-20", demand: 184 },
  { year: "2020-21", demand: 190 },
  { year: "2021-22", demand: 203 },
  { year: "2022-23", demand: 216 },
  { year: "2026-27", demand: 277 },
  { year: "2031-32", demand: 366 },
];

export default function BarsChart({ isActive }: { isActive: boolean }) {
  const [data, setData] = useState<any[]>([]);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        setData(rawData);
        setAnimationKey((prev) => prev + 1);
      }, 200);
    } else {
      setData([]);
    }
  }, [isActive]);

  return (
    <div className="w-full h-full flex justify-center items-center bg-[#f9f9f9] pl-5 pr-10">
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} key={animationKey}>
            {/* Gradient definition */}
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#003350" />
                <stop offset="100%" stopColor="#48DBB2" />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#ddd"
              vertical={false}
            />
            <XAxis dataKey="year" tick={{ fontSize: 10 }} />
            <YAxis
              tick={{ fontSize: 10 }}
              domain={[0, 375]}
              interval={0}
              tickCount={16}
              ticks={Array.from({ length: 16 }, (_, i) => i * 25)}
            />
            <Tooltip />

            <Bar
              dataKey="demand"
              isAnimationActive={true}
              fill="url(#barGradient)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
