import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { BookOpen, RefreshCw, ArrowLeft, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(true);
  const [streaming, setStreaming] = useState(false);

  const preferences = location.state?.preferences;

  useEffect(() => {
    if (!preferences) {
      navigate("/explore");
      return;
    }
    generatePlan();
  }, []);

  const generatePlan = async () => {
    setLoading(true);
    setPlan("");
    setStreaming(true);

    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        navigate("/login");
        return;
      }

      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-learning-plan`;

      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ preferences }),
      });

      if (!resp.ok || !resp.body) {
        throw new Error("Failed to generate plan");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let fullPlan = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullPlan += content;
              setPlan(fullPlan);
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Save the plan
      await supabase.from("learning_plans").insert({
        user_id: userData.user.id,
        plan_content: fullPlan,
        preferences_snapshot: preferences,
      });
    } catch (err) {
      console.error(err);
      setPlan("Sorry, we couldn't generate your plan right now. Please try again.");
    } finally {
      setLoading(false);
      setStreaming(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <span className="font-display font-bold text-foreground">LearnPath</span>
        </div>
        <Button variant="ghost" size="sm" onClick={() => navigate("/explore")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-10 animate-fade-up">
          <h1 className="text-3xl font-bold font-display text-foreground mb-2">
            Your Personalized <span className="text-gradient-hero">Learning Plan</span>
          </h1>
          <p className="text-muted-foreground">
            Based on your unique preferences and learning style
          </p>
        </div>

        {loading && !plan && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-muted-foreground">Analyzing your learning preferences...</p>
          </div>
        )}

        {plan && (
          <div className="bg-card rounded-xl border border-border p-8 shadow-soft animate-scale-in">
            <div className="prose prose-sm max-w-none text-foreground prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground">
              <ReactMarkdown>{plan}</ReactMarkdown>
            </div>
          </div>
        )}

        {!loading && plan && (
          <div className="flex justify-center gap-4 mt-8">
            <Button variant="outline" onClick={generatePlan}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Regenerate Plan
            </Button>
            <Button onClick={() => navigate("/questionnaire")}>
              Retake Assessment
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Results;
