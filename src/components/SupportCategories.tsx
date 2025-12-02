import { Briefcase, GraduationCap, Heart, DollarSign, Home, Scale, Users, Lightbulb, ArrowRight } from "lucide-react";

const categories = [
  {
    icon: Briefcase,
    title: "Career Development",
    description: "Resume building, interview prep, networking opportunities, and career transition coaching.",
    accent: "group-hover:bg-accent",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "Scholarship programs, tutoring services, degree completion support, and certification courses.",
    accent: "group-hover:bg-success",
  },
  {
    icon: Heart,
    title: "Mental Health",
    description: "Counseling services, support groups, stress management, and wellness programs.",
    accent: "group-hover:bg-destructive",
  },
  {
    icon: DollarSign,
    title: "Financial Literacy",
    description: "Budgeting workshops, investment guidance, tax assistance, and retirement planning.",
    accent: "group-hover:bg-accent",
  },
  {
    icon: Home,
    title: "Housing Support",
    description: "Relocation assistance, housing resources, and transitional living programs.",
    accent: "group-hover:bg-primary",
  },
  {
    icon: Scale,
    title: "Legal Services",
    description: "Contract review, legal consultations, and advocacy resources.",
    accent: "group-hover:bg-muted-foreground",
  },
  {
    icon: Users,
    title: "Community",
    description: "Mentorship programs, peer networks, and alumni connections.",
    accent: "group-hover:bg-success",
  },
  {
    icon: Lightbulb,
    title: "Entrepreneurship",
    description: "Business coaching, startup resources, and funding opportunities.",
    accent: "group-hover:bg-accent",
  },
];

const SupportCategories = () => {
  return (
    <section className="py-24 bg-secondary/50">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-bold uppercase tracking-wider mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            Comprehensive Support
          </h2>
          <p className="text-lg text-muted-foreground">
            We provide holistic support to help athletes thrive beyond their sports careers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((category, index) => (
            <div
              key={category.title}
              className="group bg-card rounded-xl p-6 border border-border hover:border-accent/30 card-shadow hover:card-shadow-hover transition-all duration-300 cursor-pointer animate-fade-in opacity-0"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-5 transition-all duration-300 ${category.accent} group-hover:text-primary-foreground group-hover:scale-110`}>
                <category.icon className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-accent transition-colors">
                {category.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {category.description}
              </p>
              <div className="flex items-center gap-1 text-sm font-semibold text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportCategories;
