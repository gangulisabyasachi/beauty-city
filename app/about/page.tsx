import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | Apartment Community",
  description: "Learn about our apartment community, its values, and history.",
}

export default function About() {
  return (
    <main>
      {/* Header Section */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-balance mb-6">About Our Community</h1>
          <p className="text-xl text-foreground/80 max-w-2xl text-balance">
            Since our founding, we've been committed to building a vibrant, inclusive community where residents thrive
            together.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-foreground/80 mb-4">
                We believe that a great community is built on trust, respect, and shared values. Our mission is to
                create a living space where every resident feels valued and supported.
              </p>
              <p className="text-lg text-foreground/80 mb-4">
                Through regular events, well-maintained facilities, and open communication, we foster connections that
                last a lifetime.
              </p>
              <p className="text-lg text-foreground/80">
                We're committed to maintaining the highest standards of quality while ensuring affordability and
                accessibility for all.
              </p>
            </div>
            <div className="bg-card rounded-lg p-8 shadow-sm border border-border">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-accent mb-2">500+</h3>
                  <p className="text-card-foreground/80">Active Residents</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-accent mb-2">25+</h3>
                  <p className="text-card-foreground/80">Community Events Annually</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-accent mb-2">50+</h3>
                  <p className="text-card-foreground/80">Shared Facilities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Community First",
                description:
                  "We prioritize the well-being and happiness of our residents, fostering genuine connections and friendships.",
              },
              {
                title: "Quality & Maintenance",
                description:
                  "We maintain our facilities to the highest standards, ensuring a clean and safe environment for everyone.",
              },
              {
                title: "Transparency",
                description:
                  "Open communication and honest dialogue guide our decisions and build trust within our community.",
              },
              {
                title: "Inclusivity",
                description:
                  "Everyone belongs here. We celebrate diversity and ensure all voices are heard and valued.",
              },
              {
                title: "Sustainability",
                description:
                  "We're committed to reducing our environmental impact while building a sustainable community.",
              },
              {
                title: "Continuous Improvement",
                description: "We listen to feedback and constantly work to improve our services and facilities.",
              },
            ].map((value, idx) => (
              <div
                key={idx}
                className="bg-primary/50 backdrop-blur-sm rounded-lg p-6 border border-primary-foreground/20"
              >
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-primary-foreground/90">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-16 text-center">Our Journey</h2>
          <div className="space-y-8">
            {[
              {
                year: "2010",
                title: "Foundation",
                description: "Our community was established with a vision to create a welcoming home for families.",
              },
              {
                year: "2015",
                title: "First Major Expansion",
                description: "We expanded our facilities to include recreational areas and community centers.",
              },
              {
                year: "2020",
                title: "Going Digital",
                description:
                  "We launched our digital community portal to better connect residents and share information.",
              },
              {
                year: "2024",
                title: "Growing Strong",
                description: "Today, we're a thriving community of 500+ residents with continuous growth.",
              },
            ].map((milestone, idx) => (
              <div key={idx} className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-accent text-white font-bold">
                    {idx + 1}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{milestone.year}</h3>
                  <h4 className="text-lg font-semibold text-accent mb-2">{milestone.title}</h4>
                  <p className="text-foreground/80">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
