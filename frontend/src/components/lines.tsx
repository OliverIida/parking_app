export default function Lines() {
  return (
    <>
      {/* Horizontal line dividing top and bottom rows */}
      <div className="absolute top-1/2 left-0 right-0 h-3 bg-white" />
      
      {/* 5 Vertical lines to create 4 columns */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="absolute top-0 bottom-0 w-3 bg-white"
          style={{ left: `${(i / 4) * 100}%` }}
        />
      ))}
    </>
  );
}

