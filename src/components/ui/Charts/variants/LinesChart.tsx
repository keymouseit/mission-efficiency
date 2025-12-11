"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Label,
} from "recharts";
import { useEffect, useState } from "react";

const rawData = [
  { year: 1990, intensity: 6.15 },
  { year: 1995, intensity: 5.98 },
  { year: 2000, intensity: 5.3 },
  { year: 2005, intensity: 4.6 },
  { year: 2010, intensity: 4.4 },
  { year: 2015, intensity: 4.05 },
  { year: 2022, intensity: 3.5 },
];

export default function LinesChart({ isActive }: { isActive: boolean }) {
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
      <div className="w-full h-96 overflow-hidden">
        <h2 className="text-center font-bold mb-4 text-transparent bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#003350)]">
          Decline in Energy Intensity (1990–2022)
        </h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} key={animationKey}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis>
              <Label
                value="Energy Intensity (MJ per 2021 USD)"
                angle={-90}
                position="insideLeft"
                offset={20}
                style={{ textAnchor: "middle" }}
              />
            </YAxis>
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="intensity"
              stroke="#48DBB2"
              strokeWidth={2}
              dot={{ r: 5 }}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
