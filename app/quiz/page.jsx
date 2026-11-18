import { InteractiveQuizView } from "@/components/academics/InteractiveQuizView";

export const metadata = {
  title: "Interactive Quiz | Shikhbe Shobai",
  description:
    "Proctored module assessment with live countdown timer, code prompts, review flags, and interactive question palette.",
};

export default function QuizPage() {
  return <InteractiveQuizView />;
}
