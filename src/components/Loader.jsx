import { useEffect, useState } from "react";
import { Book, PenLine } from "lucide-react";

const EDUCATION_ICONS = [
  { icon: Book, label: "Opening Books" },
  { icon: PenLine, label: "Preparing Notes" },
  { icon: Book, label: "Reading Material" },
  { icon: PenLine, label: "Writing Ideas" },
];

const ACCENT_COLOR = "#A594F9"; // Single consistent color

export default function Loader({ text = "Loading..." }) {
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % EDUCATION_ICONS.length);
    }, 400);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (!isLoading) return null;

  const { icon: Icon, label } = EDUCATION_ICONS[current];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#fff] z-50">
      <div className="flex flex-col items-center justify-center gap-4">
        <Icon size={72} className="animate-bounce" style={{ color: ACCENT_COLOR }} />
        <h2 className="text-xl font-semibold" style={{ color: ACCENT_COLOR }}>{label}</h2>
        <p className="text-lg" style={{ color: ACCENT_COLOR }}>{text}</p>
      </div>
    </div>
  );
}
