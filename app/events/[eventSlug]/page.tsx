import Link from "next/link"
import Image from "next/image"
import { readdirSync } from "fs"
import { join } from "path"
import { ChevronLeft } from "lucide-react"

interface PageProps {
  params: Promise<{
    eventSlug: string
  }>
}

function getPhotos(eventSlug: string): string[] {
  try {
    const eventDir = join(process.cwd(), "public/events", eventSlug)
    const files = readdirSync(eventDir)
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"]
    return files
      .filter((file) => imageExtensions.some((ext) => file.toLowerCase().endsWith(ext)))
      .map((file) => `/events/${eventSlug}/${file}`)
      .sort()
  } catch {
    return []
  }
}

function getEventDisplayName(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export async function generateStaticParams() {
  try {
    const eventsDir = join(process.cwd(), "public/events")
    const folders = readdirSync(eventsDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => ({
        eventSlug: dirent.name,
      }))
    return folders
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { eventSlug } = await params
  const displayName = getEventDisplayName(eventSlug)
  return {
    title: `${displayName} Photos | Apartment Community`,
    description: `View photos from ${displayName} event`,
  }
}

export default async function EventPhotos({ params }: PageProps) {
  const { eventSlug } = await params
  const photos = getPhotos(eventSlug)
  const displayName = getEventDisplayName(eventSlug)

  return (
    <main>
      {/* Header Section */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/events" className="flex items-center gap-2 text-primary hover:text-accent mb-6 font-semibold">
            <ChevronLeft size={20} />
            Back to Events
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold text-balance mb-4">{displayName}</h1>
          <p className="text-xl text-foreground/80">
            {photos.length} {photos.length === 1 ? "photo" : "photos"}
          </p>
        </div>
      </section>

      {/* Photos Gallery */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {photos.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-foreground/80 mb-4">No photos yet!</p>
              <p className="text-foreground/60 mb-6">
                Add photos to <code className="bg-card p-2 rounded">public/events/{eventSlug}/</code> and refresh the
                page.
              </p>
              <Link
                href="/events"
                className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              >
                Back to Events
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
              {photos.map((photo, idx) => (
                <div
                  key={idx}
                  className="relative group rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-72 w-full">
                    <Image
                      src={photo || "/placeholder.svg"}
                      alt={`${displayName} photo ${idx + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
