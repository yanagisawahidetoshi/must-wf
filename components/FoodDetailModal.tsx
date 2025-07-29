"use client"

import { ExternalLink, MapPin, DollarSign } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import type { Food } from "@/types"

interface FoodDetailModalProps {
  isOpen: boolean
  onClose: () => void
  food: Food | null
}

export function FoodDetailModal({ isOpen, onClose, food }: FoodDetailModalProps) {
  if (!food) return null

  const handleMapClick = (mapUrl: string) => {
    window.open(mapUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{food.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* メイン画像 */}
          <div className="relative w-full h-48 rounded-lg overflow-hidden">
            <Image
              src={food.imageUrl || "/placeholder.svg"}
              alt={food.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>

          {/* 料理説明 */}
          <div>
            <p className="text-gray-700 leading-relaxed">{food.description}</p>
          </div>

          {/* 基本情報 */}
          <Card className="bg-gray-50">
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  価格帯
                </span>
                <span className="font-semibold">
                  {food.priceRange} ({food.priceRangeUsd})
                </span>
              </div>

              {food.howToEat && (
                <div className="flex justify-between items-start">
                  <span className="flex items-center gap-2 text-gray-600">🍴 食べ方</span>
                  <span className="font-medium text-right flex-1 ml-4">{food.howToEat}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 注文フレーズ */}
          {food.orderPhrases.length > 0 && (
            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">📣 現地の人のように注文:</h3>
                {food.orderPhrases.map((phrase) => (
                  <div key={phrase.id} className="space-y-2">
                    <div className="text-xl font-bold text-gray-900">{phrase.japanese}</div>
                    <div className="text-gray-700 font-medium">{phrase.romaji}</div>
                    <div className="text-sm text-gray-600">"{phrase.english}"</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* 文化的背景 */}
          {food.culturalContext && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 flex items-center gap-2">📚 文化的背景:</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{food.culturalContext}</p>
              </CardContent>
            </Card>
          )}

          {/* おすすめレストラン */}
          {food.restaurants.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                おすすめの店
              </h3>
              <div className="space-y-3">
                {food.restaurants.map((restaurant) => (
                  <Card key={restaurant.id} className="border-gray-200">
                    <CardContent className="p-4">
                      <div className="font-semibold mb-2">{restaurant.name}</div>
                      {restaurant.nameEn && <div className="text-sm text-gray-600 mb-2">{restaurant.nameEn}</div>}
                      <div className="text-sm text-gray-600 mb-3">{restaurant.address}</div>

                      {/* 特徴バッジ */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {restaurant.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="bg-teal-100 text-teal-800 text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      {/* Google Maps ボタン */}
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleMapClick(restaurant.googleMapUrl)}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Google Mapsで開く
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
