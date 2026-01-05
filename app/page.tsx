import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="min-h-[90vh] bg-gradient-to-br from-secondary to-accent flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/modern-apartment-building-architecture.jpg" alt="Building Architecture" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance">
            Welcome to Our Apartment Community
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 text-balance">
            A place where neighbors become family and memories are made
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/about">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Learn About Us
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Get In Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-balance">What We Offer</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Community Events",
                description:
                  "From cultural celebrations to social gatherings, we host regular events to bring our residents together.",
              },
              {
                title: "Shared Assets",
                description:
                  "Well-maintained facilities and common areas for the comfort and convenience of all residents.",
              },
              {
                title: "Strong Network",
                description: "A supportive community where residents help each other and create lasting bonds.",
              },
            ].map((feature, idx) => (
              <div key={idx} className="bg-card rounded-lg p-8 shadow-sm border border-border">
                <h3 className="text-xl font-bold mb-4 text-card-foreground">{feature.title}</h3>
                <p className="text-card-foreground/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Explore Our Community</h2>
          <p className="text-lg mb-8 text-primary-foreground/90 text-balance">
            Check out our events, assets, and connect with neighbors in our community portal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/events">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                View Events
              </Button>
            </Link>
            <Link href="/assets">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/20 bg-transparent"
              >
                View Assets
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
