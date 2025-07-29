"use client"

import { ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import type { Food } from "@/types"

interface FoodListProps {
  foods: Food[]
  onFoodClick: (food: Food) => void
  isLoading?: boolean
}

export function FoodList({ foods, onFoodClick, isLoading }: FoodListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0" />
              <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-full" />
              </div>
              <div className="w-6 h-6 bg-gray-200 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {foods.map((food) => (
        <Card
          key={food.id}
          className="cursor-pointer transition-all duration-200 hover:shadow-lg active:scale-[0.98] border-0 shadow-md"
          onClick={() => onFoodClick(food)}
        >
          <CardContent className="flex items-center gap-4 p-4">
            {/* ランキング番号 */}
            <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
              {food.ranking}
            </div>

            {/* 料理画像 */}
            <div className="w-20 h-20 relative flex-shrink-0">
              <Image
                src={food.imageUrl || "/placeholder.svg"}
                alt={food.name}
                fill
                className="object-cover rounded-lg"
                sizes="80px"
              />
            </div>

            {/* 料理情報 */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 mb-1 text-lg">{food.name}</h3>
              <p className="text-sm text-teal-600 mb-2 font-medium">{food.nameEn}</p>
              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{food.shortDesc}</p>
            </div>

            {/* 矢印アイコン */}
            <ChevronRight className="w-6 h-6 text-gray-400 flex-shrink-0" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
