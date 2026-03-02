import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, Target, Zap, LogOut } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Understand Your Mind",
    description: "Answer simple questions about how you think and process information.",
  },
  {
    icon: Target,
    title: "Get a Custom Plan",
    description: "Receive AI-powered study strategies tailored to your unique style.",
  },
  {
    icon: Zap,
    title: "Learn Faster",
    description: "Follow proven techniques that match how your brain works best.",
  },
];

const Explore = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate("/login");
        return;
      }
      setUserName(data.user.email?.split("@")[0] || "Learner");
    };
    getUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <span className="font-display font-bold text-foreground">LearnPath</span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign out
        </Button>
      </header>

      {/* Hero */}
      <main className="max-w-3xl mx-auto px-6 py-16 text-center">
        <div className="animate-fade-up">
          <p className="text-primary font-medium text-sm mb-3 uppercase tracking-wider">
            Welcome, {userName}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-4 leading-tight">
            Discover Your <span className="text-gradient-hero">Learning Style</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto mb-10">
            Take a quick assessment and get a personalized study plan designed around how you learn best.
          </p>
          <Button
            size="lg"
            className="bg-gradient-hero text-primary-foreground px-8 py-6 text-base font-semibold shadow-elevated hover:opacity-90 transition-opacity"
            onClick={() => navigate("/questionnaire")}
          >
            Start Assessment
          </Button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="bg-card rounded-xl p-6 shadow-soft border border-border text-left animate-fade-up"
              style={{ animationDelay: `${(i + 1) * 150}ms` }}
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 mb-4">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Explore;
