import React from "react";

interface PotentialIndicatorProps {
  value?: string;
  color?: string;
  className?: string;
}

const PotentialIndicator: React.FC<PotentialIndicatorProps> = ({
  value = "",
  color = "#000",
  className = "",
}) => {
  return (
    <div className={`flex items-center flex-wrap mr-4 mobileMax:mb-1.5 ${className}`}>
      <span
        className="block w-[21px] h-[21px] rounded-full"
        style={{ background: color }}
      ></span>
      <p className="text-xmedium text-purple ml-2 mobileMax:text-small">{value}</p>
    </div>
  );
};

export default PotentialIndicator;
