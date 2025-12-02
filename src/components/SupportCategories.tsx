import { Briefcase, GraduationCap, Heart, DollarSign, Home, Scale, Users, Lightbulb } from "lucide-react";

const categories = [
  {
    icon: Briefcase,
    title: "Career Development",
    description: "Resume building, interview prep, networking opportunities, and career transition coaching.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "Scholarship programs, tutoring services, degree completion support, and certification courses.",
    color: "bg-success/10 text-success",
  },
  {
    icon: Heart,
    title: "Mental Health",
    description: "Counseling services, support groups, stress management, and wellness programs.",
    color: "bg-destructive/10 text-destructive",
  },
  {
    icon: DollarSign,
    title: "Financial Literacy",
    description: "Budgeting workshops, investment guidance, tax assistance, and retirement planning.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Home,
    title: "Housing Support",
    description: "Relocation assistance, housing resources, and transitional living programs.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Scale,
    title: "Legal Services",
    description: "Contract review, legal consultations, and advocacy resources.",
    color: "bg-muted-foreground/10 text-muted-foreground",
  },
  {
    icon: Users,
    title: "Community",
    description: "Mentorship programs, peer networks, and alumni connections.",
    color: "bg-success/10 text-success",
  },
  {
    icon: Lightbulb,
    title: "Entrepreneurship",
    description: "Business coaching, startup resources, and funding opportunities.",
    color: "bg-accent/10 text-accent",
  },
];

const SupportCategories = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Comprehensive Support Services
          </h2>
          <p className="text-lg text-muted-foreground">
            We provide holistic support to help athletes thrive beyond their sports careers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.title}
              className="group bg-card rounded-2xl p-6 border-2 border-border card-shadow hover:card-shadow-hover hover:border-primary/20 transition-all duration-300 cursor-pointer animate-fade-in opacity-0"
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <category.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {category.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportCategories;