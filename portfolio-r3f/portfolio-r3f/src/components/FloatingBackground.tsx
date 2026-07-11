export default function FloatingBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-24 -top-24 h-[500px] w-[500px] animate-[float_15s_ease-in-out_infinite] rounded-full bg-secondary/15 blur-[100px]" />
      <div className="absolute -right-12 -bottom-24 h-[400px] w-[400px] animate-[float_18s_ease-in-out_infinite] rounded-full bg-accent/15 blur-[100px] [animation-delay:2s]" />
      <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 animate-[float_20s_ease-in-out_infinite] rounded-full bg-secondary/15 blur-[100px] [animation-delay:4s]" />
    </div>
  );
}
