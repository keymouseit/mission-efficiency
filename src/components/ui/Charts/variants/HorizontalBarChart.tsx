"use client";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LabelList,
  CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";

const rawData = [
  {
    name: "Current Investment (2024)",
    value: 20,
    fill: "#003350",
    label: "USD 20 Billion",
  },
  {
    name: "Required Annual Investment (2026-2030)",
    value: 78,
    fill: "#48DBB2",
    label: "USD 78 Billion",
  },
];

const HorizontalBarChart: React.FC<{ isActive: boolean }> = ({ isActive }) => {
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
    <div className="w-full h-full flex flex-col justify-center items-center bg-[#f9f9f9] px-6">
      <h2 className="text-[32px] mobileMax:text-odd text-transparent bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#003350)] font-bold leading-normal mb-5 px-5">
        India’s Investment Leap in End-use for a Net-Zero Future
      </h2>
      <div className="w-full h-[250px] ml-5 mobileMax:ml-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            key={animationKey}
            layout="vertical"
            margin={{ top: 20, right: 40, left: 40, bottom: 20 }}
            barCategoryGap="30%"
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" />
            <Bar
              dataKey="value"
              isAnimationActive={true}
              radius={[0, 20, 20, 0]}
            >
              <LabelList
                dataKey="label"
                position="insideLeft"
                style={{ fill: "white", fontWeight: "bold", fontSize: 12 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HorizontalBarChart;
