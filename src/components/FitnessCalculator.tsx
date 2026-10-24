import { useState, useId } from "react";
import { Activity, Flame, Dumbbell, Target, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

export type FitnessCalculatorProps = {
  isDark?: boolean;
  onBookTrial?: () => void;
};

export default function FitnessCalculator({ isDark = true, onBookTrial }: FitnessCalculatorProps) {
  const navigate = useNavigate();
  const heightInputId = useId();
  const weightInputId = useId();
  const [height, setHeight] = useState<number>(172); // cm
  const [weight, setWeight] = useState<number>(70); // kg
  const [gender, setGender] = useState<"male" | "female">("male");
  const [goal, setGoal] = useState<"fat_loss" | "muscle_gain" | "strength">("muscle_gain");

  // Calculate BMI
  const heightInMeters = height / 100;
  const bmi = Number((weight / (heightInMeters * heightInMeters)).toFixed(1));

  // Determine Category
  let category = "Optimal Athletic";
  let categoryColor = "#22c55e"; // Green
  let advice = "Great baseline! Focus on progressive overload and progressive hypertrophy.";

  if (bmi < 18.5) {
    category = "Lean / Underweight";
    categoryColor = "#00d4ff"; // Cyan
    advice =
      "Recommend caloric surplus and heavy compound strength training to build functional muscle.";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    category = "Optimal Fitness Zone";
    categoryColor = "#22c55e"; // Green
    advice = "Ideal athletic composition! Target lean muscle gains with high-protein nutrition.";
  } else if (bmi >= 24.9 && bmi < 29.9) {
    category = "Athletic Solid / Overweight";
    categoryColor = "#f59e0b"; // Amber
    advice =
      "In athletes, this is common with high muscle density. Pair weight training with high-intensity cardio.";
  } else {
    category = "High Mass";
    categoryColor = "#ef4444"; // Red
    advice =
      "Structured fat-loss resistance training, caloric deficit, and 1-on-1 personal guidance recommended.";
  }

  // Calculate Protein Target (1.6 - 2.0g per kg)
  const proteinTarget = Math.round(weight * (goal === "muscle_gain" ? 2.0 : 1.8));

  // Estimated daily calorie target
  const bmr =
    gender === "male"
      ? 10 * weight + 6.25 * height - 5 * 25 + 5
      : 10 * weight + 6.25 * height - 5 * 25 - 161;
  const tdee = Math.round(bmr * 1.45);
  const targetCalories =
    goal === "fat_loss" ? tdee - 450 : goal === "muscle_gain" ? tdee + 350 : tdee;

  return (
    <div
      className="rounded-[28px] p-6 sm:p-10 border transition-all"
      style={{
        background: isDark ? "#0f0f0f" : "#ffffff",
        borderColor: isDark ? "rgba(255, 72, 0, 0.2)" : "rgba(217, 60, 8, 0.15)",
        color: isDark ? "#f0f0f0" : "#0d0d0d",
        boxShadow: isDark ? "0 10px 40px rgba(0,0,0,0.5)" : "0 4px 24px rgba(0,0,0,0.06)",
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div
            className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2"
            style={{
              background: "rgba(255, 72, 0, 0.12)",
              color: "#ff4800",
            }}
          >
            <Activity size={13} />
            <span>Athletic Tools</span>
          </div>
          <h3
            className="text-2xl sm:text-3xl font-black uppercase tracking-tight"
            style={{ fontFamily: "Barlow Condensed, sans-serif" }}
          >
            BMI & Fitness Target Calculator
          </h3>
          <p className="text-xs sm:text-sm opacity-70 mt-1">
            Calculate your fitness baseline and get personalized training recommendations for AB
            Fitness Hub.
          </p>
        </div>

        <button
          onClick={() => {
            setHeight(172);
            setWeight(70);
            setGoal("muscle_gain");
          }}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-semibold opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <RotateCcw size={12} /> Reset
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Gender & Goal Selector */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider mb-2 opacity-80">
                Biological Sex
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender("male")}
                  className="py-2 text-xs font-bold rounded-xl border transition-all text-center cursor-pointer"
                  style={{
                    background: gender === "male" ? "#ff4800" : isDark ? "#181818" : "#f0f0f0",
                    color: gender === "male" ? "#fff" : isDark ? "#f0f0f0" : "#111",
                    borderColor: gender === "male" ? "#ff4800" : isDark ? "#282828" : "#e0e0e0",
                  }}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender("female")}
                  className="py-2 text-xs font-bold rounded-xl border transition-all text-center cursor-pointer"
                  style={{
                    background: gender === "female" ? "#ff4800" : isDark ? "#181818" : "#f0f0f0",
                    color: gender === "female" ? "#fff" : isDark ? "#f0f0f0" : "#111",
                    borderColor: gender === "female" ? "#ff4800" : isDark ? "#282828" : "#e0e0e0",
                  }}
                >
                  Female
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider mb-2 opacity-80">
                Primary Goal
              </label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value as any)}
                className="w-full py-2 px-3 text-xs font-bold rounded-xl border outline-none"
                style={{
                  background: isDark ? "#181818" : "#f0f0f0",
                  borderColor: isDark ? "#282828" : "#e0e0e0",
                  color: isDark ? "#f0f0f0" : "#111",
                }}
              >
                <option value="muscle_gain">Muscle Building</option>
                <option value="fat_loss">Fat Loss & Cut</option>
                <option value="strength">Strength & Power</option>
              </select>
            </div>
          </div>

          {/* Height Slider */}
          <div
            className="p-4 rounded-2xl border"
            style={{
              background: isDark ? "#141414" : "#f9f9f9",
              borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor={heightInputId}
                className="text-xs font-bold uppercase tracking-wider opacity-80"
              >
                Height
              </label>
              <span className="text-sm font-black text-orange-500">
                {height} cm{" "}
                <span className="opacity-60 text-xs font-normal">
                  ({(height / 30.48).toFixed(1)} ft)
                </span>
              </span>
            </div>
            <input
              id={heightInputId}
              type="range"
              min="130"
              max="220"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] opacity-40 mt-1">
              <span>130 cm</span>
              <span>175 cm</span>
              <span>220 cm</span>
            </div>
          </div>

          {/* Weight Slider */}
          <div
            className="p-4 rounded-2xl border"
            style={{
              background: isDark ? "#141414" : "#f9f9f9",
              borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor={weightInputId}
                className="text-xs font-bold uppercase tracking-wider opacity-80"
              >
                Current Weight
              </label>
              <span className="text-sm font-black text-orange-500">
                {weight} kg{" "}
                <span className="opacity-60 text-xs font-normal">
                  ({Math.round(weight * 2.20462)} lbs)
                </span>
              </span>
            </div>
            <input
              id={weightInputId}
              type="range"
              min="40"
              max="160"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] opacity-40 mt-1">
              <span>40 kg</span>
              <span>80 kg</span>
              <span>160 kg</span>
            </div>
          </div>
        </div>

        {/* Right Output Card (5 cols) */}
        <div
          className="lg:col-span-5 p-6 rounded-2xl border flex flex-col justify-between"
          style={{
            background: isDark ? "#161616" : "#f6f6f6",
            borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
          }}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
                BMI Score
              </span>
              <span
                className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                style={{
                  background: `${categoryColor}20`,
                  color: categoryColor,
                  border: `1px solid ${categoryColor}40`,
                }}
              >
                {category}
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-2">
              <span
                className="text-5xl font-black tracking-tight"
                style={{ fontFamily: "Barlow Condensed, sans-serif" }}
              >
                {bmi}
              </span>
              <span className="text-xs opacity-60 font-medium">kg/m²</span>
            </div>

            <p className="text-xs opacity-80 leading-relaxed mb-6">{advice}</p>

            {/* Nutrition Targets */}
            <div className="grid grid-cols-2 gap-2.5 mb-6">
              <div
                className="p-3 rounded-xl border"
                style={{
                  background: isDark ? "#111" : "#fff",
                  borderColor: isDark ? "#222" : "#e5e5e5",
                }}
              >
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-orange-500 mb-1">
                  <Flame size={12} /> Target Calories
                </div>
                <div className="text-lg font-black">{targetCalories} kcal</div>
                <div className="text-[10px] opacity-50">Estimated / Day</div>
              </div>

              <div
                className="p-3 rounded-xl border"
                style={{
                  background: isDark ? "#111" : "#fff",
                  borderColor: isDark ? "#222" : "#e5e5e5",
                }}
              >
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-cyan-500 mb-1">
                  <Dumbbell size={12} /> Protein Target
                </div>
                <div className="text-lg font-black">{proteinTarget}g</div>
                <div className="text-[10px] opacity-50">Daily Recovery</div>
              </div>
            </div>

            {/* Protein Hub recommendation link */}
            <div
              className="p-3 rounded-xl mb-4 flex items-center justify-between text-xs"
              style={{
                background: "rgba(0, 212, 255, 0.08)",
                border: "1px solid rgba(0, 212, 255, 0.2)",
              }}
            >
              <div>
                <span className="font-bold text-cyan-400">Need recovery nutrition?</span>
                <p className="text-[11px] opacity-70">Grab post-workout whey shakes at our cafe</p>
              </div>
              <button
                type="button"
                onClick={() => navigate("/protein-hub")}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-cyan-500 text-black cursor-pointer hover:bg-cyan-400"
              >
                Menu
              </button>
            </div>
          </div>

          {/* Action button */}
          {onBookTrial ? (
            <button
              type="button"
              onClick={onBookTrial}
              className="w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
              style={{
                background: "#ff4800",
                boxShadow: "0 4px 16px rgba(255, 72, 0, 0.35)",
              }}
            >
              <Target size={14} /> Discuss Workout Plan with Trainer
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
              style={{
                background: "#ff4800",
                boxShadow: "0 4px 16px rgba(255, 72, 0, 0.35)",
              }}
            >
              <Target size={14} /> Start Training at AB Fitness
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
