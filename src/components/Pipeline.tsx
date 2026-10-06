import { motion } from "framer-motion";

export type PipelineStepData = {
  index: string;
  title: string;
  description: string;
};

type PipelineProps = {
  steps: PipelineStepData[];
  variant?: "dark" | "light";
};

export default function Pipeline({ steps, variant = "dark" }: PipelineProps) {
  const isDark = variant === "dark";

  return (
    <div className="relative">
      {/* Vertical connecting line */}
      <div
        className={`absolute left-[27px] top-3 bottom-3 w-px ${
          isDark ? "bg-emerald-300/25" : "bg-emerald-700/25"
        }`}
        aria-hidden="true"
      />

      <div className="flex flex-col gap-10">
        {steps.map((step, i) => (
          <motion.div
            key={step.index}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="relative flex gap-6"
          >
            {/* Node */}
            <div
              className={`relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-2 font-mono text-sm font-bold ${
                isDark
                  ? "border-emerald-300 bg-[#07110f] text-emerald-300"
                  : "border-emerald-700 bg-stone-100 text-emerald-800"
              }`}
            >
              {step.index}
            </div>

            {/* Content */}
            <div className="pt-1">
              <h3 className={`text-2xl font-bold ${isDark ? "text-white" : "text-[#07110f]"}`}>
                {step.title}
              </h3>
              <p
                className={`mt-2 max-w-3xl leading-7 ${
                  isDark ? "text-stone-300" : "text-stone-700"
                }`}
              >
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}

        {/* Arrow at the end of the flow */}
        <div className="relative flex gap-6" aria-hidden="true">
          <div className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M9 2v12M9 14l-5-5M9 14l5-5"
                stroke={isDark ? "#6ee7b7" : "#047857"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}