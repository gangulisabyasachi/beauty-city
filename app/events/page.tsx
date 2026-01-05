import Link from "next/link"
import { readdirSync } from "fs"
import { join } from "path"

interface EventItem {
  name: string
  displayName: string
  slug: string
}

function getEventFolders(): EventItem[] {
  try {
    const eventsDir = join(process.cwd(), "public/events")
    const folders = readdirSync(eventsDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => {
        const slug = dirent.name
        const displayName = slug
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
        return {
          name: dirent.name,
          displayName,
          slug,
        }
      })
      .sort((a, b) => b.name.localeCompare(a.name))

    return folders
  } catch {
    return []
  }
}

export default function Events() {
  const events = getEventFolders()

  return (
    <main>
      {/* Header Section */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-balance mb-6">Community Events</h1>
          <p className="text-xl text-foreground/80 max-w-2xl text-balance">
            Explore all the amazing events and celebrations in our community
          </p>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {events.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-foreground/80 mb-4">No events yet!</p>
              <p className="text-foreground/60 mb-6">
                To add events, create a folder in <code className="bg-card p-2 rounded">public/events/</code> with your
                event name (e.g., <code className="bg-card p-2 rounded">saraswati-puja-2025</code>) and add images
                inside.
              </p>
              <div className="bg-card p-6 rounded-lg border border-border text-left max-w-2xl mx-auto">
                <h3 className="font-bold mb-3">Quick Setup Guide:</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-foreground/80">
                  <li>Navigate to the public/events folder</li>
                  <li>Create a new folder named your event (e.g., saraswati-puja-2025)</li>
                  <li>Add image files (.jpg, .png) into the folder</li>
                  <li>Refresh the page - your event will appear automatically!</li>
                </ol>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <Link
                  key={event.slug}
                  href={`/events/${event.slug}`}
                  className="group bg-card rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-lg hover:border-accent transition-all"
                >
                  <div className="relative h-56 w-full bg-muted overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-20 group-hover:opacity-30 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl text-primary/30">📸</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-card-foreground mb-2 group-hover:text-accent transition-colors">
                      {event.displayName}
                    </h3>
                    <p className="text-card-foreground/60 text-sm">Click to view photos</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      {/* <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">How to Add New Events</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-primary/50 backdrop-blur-sm rounded-lg p-6 border border-primary-foreground/20">
              <h3 className="text-xl font-bold mb-3">Step 1: Create Event Folder</h3>
              <p>
                Create a new folder in public/events/ with your event name using hyphens (e.g., saraswati-puja-2025)
              </p>
            </div>
            <div className="bg-primary/50 backdrop-blur-sm rounded-lg p-6 border border-primary-foreground/20">
              <h3 className="text-xl font-bold mb-3">Step 2: Add Photos</h3>
              <p>Upload all event photos to the folder. Supported formats: JPG, PNG, GIF, WebP</p>
            </div>
            <div className="bg-primary/50 backdrop-blur-sm rounded-lg p-6 border border-primary-foreground/20">
              <h3 className="text-xl font-bold mb-3">Step 3: Automatic Display</h3>
              <p>Refresh the page and your event will automatically appear with all photos!</p>
            </div>
            <div className="bg-primary/50 backdrop-blur-sm rounded-lg p-6 border border-primary-foreground/20">
              <h3 className="text-xl font-bold mb-3">Step 4: Manage Photos</h3>
              <p>Add or remove photos anytime. Changes appear instantly after refresh.</p>
            </div>
          </div>
        </div>
      </section> */}
    </main>
  )
}
