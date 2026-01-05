"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Asset {
  id: string
  name: string
  image: string
  description: string
  purchaseDate: string
  purchasedFrom: string
  amoiunt: number
  category: string

}

export default function Assets() {
  const [assetsData, setAssetsData] = useState<Asset[]>([])
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadAssets = async () => {
      try {
        const response = await fetch("/data/assets.json")
        const data = await response.json()
        setAssetsData(data)
      } catch (error) {
        console.error("Error loading assets:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadAssets()
  }, [])

  const categories = ["All", ...new Set(assetsData.map((asset) => asset.category))]

  const filteredAssets =
    selectedCategory === "All" ? assetsData : assetsData.filter((asset) => asset.category === selectedCategory)

  if (isLoading) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-foreground/60">Loading assets...</p>
      </main>
    )
  }

  return (
    <main>
      {/* Header Section */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-balance mb-6">Community Assets</h1>
          <p className="text-xl text-foreground/80 max-w-2xl text-balance">
            Explore all the items and facilities that make our community great
          </p>
        </div>
      </section>

      {/* Assets Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Buttons */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold mb-4">Filter by Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-primary text-primary-foreground" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Assets Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAssets.map((asset) => (
              <div
                key={asset.id}
                className="bg-card rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedAsset(asset)}
              >
                <div className="relative h-48 w-full">
                  <Image src={asset.image || "/placeholder.svg"} alt={asset.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <div className="inline-block bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm mb-3">
                    {asset.category}
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-2">{asset.name}</h3>
                  <p className="text-card-foreground/80 mb-4">{asset.description}</p>
                  {/* <p className="text-card-foreground/80 mb-4">{asset.amount}</p> */}
                  <p className="text-sm text-card-foreground/60">
                    Purchased: {new Date(asset.purchaseDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Asset Details Modal */}
      {selectedAsset && (
        <Dialog open={!!selectedAsset} onOpenChange={() => setSelectedAsset(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedAsset.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="relative h-96 w-full">
                <Image
                  src={selectedAsset.image || "/placeholder.svg"}
                  alt={selectedAsset.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-foreground/60 mb-1">Category</h4>
                  <p className="text-lg text-foreground">{selectedAsset.category}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground/60 mb-1">Description</h4>
                  <p className="text-lg text-foreground">{selectedAsset.description}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground/60 mb-1">Price</h4>
                  <p className="text-lg text-foreground">Rs. {selectedAsset.amount}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-sm text-foreground/60 mb-1">Purchase Date</h4>
                    <p className="text-lg text-foreground">
                      {new Date(selectedAsset.purchaseDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground/60 mb-1">Purchased From</h4>
                    <p className="text-lg text-foreground">{selectedAsset.purchasedFrom}</p>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </main>
  )
}
