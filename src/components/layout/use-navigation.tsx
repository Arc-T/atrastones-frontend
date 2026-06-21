import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

interface NavigationProgressProps {
  loading: boolean;
}

export function NavigationProgress({ loading }: NavigationProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!loading) {
      setProgress(100);

      const timer = setTimeout(() => {
        setProgress(0);
      }, 200);

      return () => clearTimeout(timer);
    }

    setProgress(15);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [loading]);

  if (progress === 0) return null;

  return (
    <div className="fixed left-0 top-0 z-50 w-full">
      <Progress value={progress} className="h-1 rounded-none w-full" />
    </div>
  );
}
