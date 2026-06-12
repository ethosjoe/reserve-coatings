"use client";

import { motion } from "framer-motion";
import {
  fadeUp,
  fadeIn,
  blurUp,
  blurUpHeading,
  staggerContainer,
  staggerBlur,
} from "@/lib/motion";
import { useMotionLite } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

type RevealVariant = "fadeUp" | "fadeIn" | "blurUp" | "stagger" | "staggerBlur";

const containerVariants = {
  fadeUp,
  fadeIn,
  blurUp,
  stagger: staggerContainer,
  staggerBlur,
};

const itemVariants = {
  fadeUp,
  fadeIn,
  blurUp,
  stagger: fadeUp,
  staggerBlur: blurUp,
};

export function RevealWrapper({
  children,
  className,
  variant = "fadeUp",
  as = "section",
  delay = 0,
  once = true,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
  as?: "section" | "div" | "article";
  delay?: number;
  once?: boolean;
  id?: string;
}) {
  const lite = useMotionLite();
  const Component = motion[as];

  if (lite) {
    const Tag = as;
    return (
      <Tag id={id} className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <Component
      id={id}
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px 0px -40px 0px" }}
      variants={containerVariants[variant]}
      transition={delay ? { delayChildren: delay } : undefined}
    >
      {children}
    </Component>
  );
}

export function RevealItem({
  children,
  className,
  index = 0,
  variant = "fadeUp",
  asHeading = false,
}: {
  children: React.ReactNode;
  className?: string;
  index?: number;
  variant?: "fadeUp" | "blurUp" | "fadeIn";
  asHeading?: boolean;
}) {
  const lite = useMotionLite();

  if (lite) {
    return <div className={className}>{children}</div>;
  }

  const variants = asHeading ? blurUpHeading : itemVariants[variant];

  return (
    <motion.div
      className={className}
      variants={variants}
      custom={index}
    >
      {children}
    </motion.div>
  );
}

/** @deprecated Use RevealWrapper — kept for backward compatibility */
export const RevealSection = RevealWrapper;
