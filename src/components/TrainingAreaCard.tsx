import { motion } from "framer-motion";
import {
  Footprints,
  Dumbbell,
  Zap,
  Target,
  Brain,
  Heart,
  CheckCircle,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Footprints,
  Dumbbell,
  Zap,
  Target,
  Brain,
  Heart,
  CheckCircle,
};

interface TrainingAreaCardProps {
  title: string;
  description: string;
  icon: string;
  index: number;
}

export function TrainingAreaCard({
  title,
  description,
  icon,
  index,
}: TrainingAreaCardProps) {
  const IconComponent = iconMap[icon] || Target;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-card border border-border rounded-xl p-6 hover:border-accent/50 hover:bg-card/80 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
          <IconComponent className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-display font-semibold text-lg text-foreground mb-2">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
