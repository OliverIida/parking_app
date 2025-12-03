export default function Lines() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-[1200px] h-[700px]">
        {/* Horizontal line */}
        <div className="absolute top-1/2 left-0 right-0 h-3 bg-white" />
        
        {/* 5 Vertical lines evenly spaced */}
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-3 bg-white"
            style={{ left: `${(i / 4) * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}

