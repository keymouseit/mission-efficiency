"use client";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";

const rawData = [
  { name: "Low-emissions power generation", value: 60 },
  { name: "Other investments", value: 40 },
];

const COLORS = ["#48DBB2", "#003350"];

const PiChart: React.FC<{ isActive: boolean }> = ({ isActive }) => {
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
    <div className="flex flex-col md:flex-row items-center justify-center bg-[#f9f9f9] p-6 w-full h-full text-[#003350]">
      <h2 className="text-[30px] mobileMax:text-odd text-transparent bg-clip-text bg-[linear-gradient(to_right,#48DBB2,#003350)] text-center font-bold mb-5 w-full">
        India Clean Energy Investment
      </h2>
      <div className="flex w-full mobileMax:flex-col">
        {/* Pie Chart */}
        <div className="w-full h-72 ml-5 mobileMax:ml-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart key={animationKey}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={120}
                dataKey="value"
                startAngle={-270}
                endAngle={90}
                isAnimationActive={true}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Right Text */}
        <div className="w-full h-full flex flex-col mobileMax:items-center justify-center mb-6 ml-5 md:mb-0 md:pr-8 mobileMax:ml-0">
          <div className="text-[42px] mobileMax:text-medium mobileMax:leading-normal leading-7 font-semibold text-[#48DBB2] w-fit">
            $68 bn
            <p className="mb-4 text-[20px] font-[500] text-[#B5B5B5] text-right mobileMax:inline mobileMax:ml-2">
              in 2023
            </p>
            <p className="text-[42px] mobileMax:text-medium mobileMax:leading-normal leading-10 font-semibold text-[#003350]">
              ~40%
            </p>
            <p className="text-[20px] leading-4 font-[500] text-[#B5B5B5] text-right mobileMax:inline mobileMax:ml-2">
              increase vs.
            </p>
            <p className="text-[20px] leading-8 font-[500] text-[#B5B5B5] text-right mobileMax:inline mobileMax:ml-2">
              2016-2020
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PiChart;
