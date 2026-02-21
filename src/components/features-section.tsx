import { Shield, Zap, Heart, TrendingUp } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Experience & Expertise",
    description: "Our team brings years of real estate knowledge to help you find the perfect rental property.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "We prioritize transparency and honesty in every transaction, ensuring your peace of mind.",
  },
  {
    icon: Heart,
    title: "Personalized Service",
    description: "Tailored recommendations based on your unique preferences and lifestyle needs.",
  },
  {
    icon: TrendingUp,
    
    title: "Market Insights",
    description: "Stay informed with real-time market data and competitive pricing analysis.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16 mr-5">
          <h2 className="text-4xl sm:text-5xl font-bold text-balance ml-7">
            Why We Are The Best{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text ">In The Market</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            We combine cutting-edge technology with personalized service to deliver an unmatched rental experience.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm text-pretty">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
