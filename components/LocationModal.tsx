"use client"

import { useState } from "react"
import { Search, MapPin } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import type { Location } from "@/types"

interface LocationModalProps {
  isOpen: boolean
  onClose: () => void
  locations: Location[]
  onLocationSelect: (location: Location) => void
  currentLocation: Location
}

export function LocationModal({ isOpen, onClose, locations, onLocationSelect, currentLocation }: LocationModalProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredLocations = locations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.region.includes(searchQuery),
  )

  const handleLocationSelect = (location: Location) => {
    onLocationSelect(location)
    onClose()
    setSearchQuery("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            都市を選択
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* 検索ボックス */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="都市名や地域で検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* 都市グリッド */}
          <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
            {filteredLocations.map((location) => (
              <Card
                key={location.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md active:scale-[0.98] ${
                  currentLocation.id === location.id ? "ring-2 ring-amber-400 bg-amber-50" : "hover:bg-gray-50"
                }`}
                onClick={() => handleLocationSelect(location)}
              >
                <CardContent className="flex flex-col items-center p-4 text-center">
                  <div className="text-3xl mb-2">{location.emoji}</div>
                  <div className="font-semibold text-gray-900 mb-1">{location.name}</div>
                  <div className="text-sm text-gray-600">{location.nameEn}</div>
                  <div className="text-xs text-gray-500 mt-1">{location.region}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredLocations.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>該当する都市が見つかりません</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
