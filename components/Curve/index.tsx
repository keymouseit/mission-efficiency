const Curve = ({ color }: { color: string }) => {
  const isBlue = color === "bg-[#2909a7]";

  return (
    <div
      className={`w-full ${isBlue
          ? "absolute z-[1] top-[-13px] h-[15px] pointer-events-none"
          : "curve absolute z-[3] bottom-[-2px] h-[18px]"
        } ${color}`}
    />
  );
};

export default Curve;