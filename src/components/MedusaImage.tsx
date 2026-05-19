import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";

export const MedusaImage = () => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useMotionTemplate`calc(-15deg * ${mouseYSpring})`;
  const rotateY = useMotionTemplate`calc(15deg * ${mouseXSpring})`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      className="relative w-full h-full min-h-[300px] rounded-3xl flex items-center justify-center overflow-visible"
    >
      <motion.img
        src="/medusa.png"
        alt="Medusa 3D Interactive"
        style={{
          transform: "translateZ(50px)",
        }}
        className="max-h-full max-w-full object-contain pointer-events-none drop-shadow-2xl"
      />
    </motion.div>
  );
};
