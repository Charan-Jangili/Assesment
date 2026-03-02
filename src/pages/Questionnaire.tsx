import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { questions } from "@/data/questions";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Check, X, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const Questionnaire = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) navigate("/login");
    };
    checkAuth();
  }, [navigate]);

  const current = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;
  const isAnswered = current?.id in answers;

  const handleAnswer = (value: boolean) => {
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
  };

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      // Submit
      setSubmitting(true);
      try {
        const { data: userData } = await supabase.auth.getUser();
        if (!userData.user) throw new Error("Not authenticated");

        // Build preferences object grouped by category
        const preferences: Record<string, Record<string, boolean>> = {};
        for (const q of questions) {
          if (!preferences[q.category]) preferences[q.category] = {};
          preferences[q.category][q.text] = answers[q.id] ?? false;
        }

        await supabase.from("learning_preferences").insert({
          user_id: userData.user.id,
          preferences,
        });

        navigate("/results", { state: { preferences } });
      } catch (err: any) {
        toast.error(err.message || "Something went wrong");
      } finally {
        setSubmitting(false);
      }
    }
  };

  if (!current) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <span className="font-display font-bold text-foreground">LearnPath</span>
        </div>
        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} of {questions.length}
        </span>
      </header>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          {/* Progress */}
          <Progress value={progress} className="h-2 mb-8" />

          {/* Category Badge */}
          <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full mb-4">
            {current.category}
          </span>

          {/* Question */}
          <h2 className="text-2xl font-bold font-display text-foreground mb-8 leading-snug animate-fade-up">
            {current.text}
          </h2>

          {/* Yes/No Buttons */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => handleAnswer(true)}
              className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-xl border-2 text-lg font-semibold transition-all ${
                answers[current.id] === true
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-foreground hover:border-primary/40"
              }`}
            >
              <Check className="w-5 h-5" />
              Yes
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-xl border-2 text-lg font-semibold transition-all ${
                answers[current.id] === false
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-card text-foreground hover:border-accent/40"
              }`}
            >
              <X className="w-5 h-5" />
              No
            </button>
          </div>

          {/* Next */}
          <Button
            className="w-full py-6 text-base"
            disabled={!isAnswered || submitting}
            onClick={handleNext}
          >
            {submitting
              ? "Analyzing..."
              : currentIndex === questions.length - 1
              ? "Get My Learning Plan"
              : "Next Question"}
            {!submitting && <ArrowRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
