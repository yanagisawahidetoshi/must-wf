"use client"

import { useState, useEffect } from "react"
import { MapPin, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FoodList } from "@/components/FoodList"
import { LocationModal } from "@/components/LocationModal"
import { FoodDetailModal } from "@/components/FoodDetailModal"
import { useGeolocation } from "@/hooks/useGeolocation"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { locations, mockFoods } from "@/lib/data"
import type { Location, Food, AppState } from "@/types"

export default function TabemonoApp() {
  const [appState, setAppState] = useState<AppState>({
    currentLocation: locations[0], // デフォルトは東京
    foods: [],
    isLoading: true,
    selectedFood: null,
    modalState: {
      location: false,
      foodDetail: false,
    },
  })

  const [lastCity, setLastCity] = useLocalStorage<string>("tabemono-last-city", "tokyo")
  const { location: userLocation, getCurrentLocation, findNearestCity } = useGeolocation()

  // 初期化処理
  useEffect(() => {
    const initializeApp = async () => {
      // 前回選択した都市があれば復元
      const savedLocation = locations.find((loc) => loc.slug === lastCity) || locations[0]

      // データ取得（モック）
      const foods = mockFoods[savedLocation.slug] || []

      setAppState((prev) => ({
        ...prev,
        currentLocation: savedLocation,
        foods,
        isLoading: false,
      }))

      // バックグラウンドで位置情報取得
      getCurrentLocation()
    }

    initializeApp()
  }, [lastCity, getCurrentLocation])

  // 位置情報が取得できたら最寄りの都市を提案
  useEffect(() => {
    if (userLocation) {
      const nearestCity = findNearestCity(userLocation)
      if (nearestCity.id !== appState.currentLocation.id) {
        // 実際のアプリでは、ここでユーザーに確認ダイアログを表示
        console.log(`最寄りの都市: ${nearestCity.name}`)
      }
    }
  }, [userLocation, findNearestCity, appState.currentLocation.id])

  const handleLocationChange = async (location: Location) => {
    setAppState((prev) => ({
      ...prev,
      isLoading: true,
      modalState: { ...prev.modalState, location: false },
    }))

    // ローカルストレージに保存
    setLastCity(location.slug)

    // データ取得（実際のアプリではAPI呼び出し）
    setTimeout(() => {
      const foods = mockFoods[location.slug] || []
      setAppState((prev) => ({
        ...prev,
        currentLocation: location,
        foods,
        isLoading: false,
      }))
    }, 1000)
  }

  const handleFoodClick = (food: Food) => {
    setAppState((prev) => ({
      ...prev,
      selectedFood: food,
      modalState: { ...prev.modalState, foodDetail: true },
    }))
  }

  const openLocationModal = () => {
    setAppState((prev) => ({
      ...prev,
      modalState: { ...prev.modalState, location: true },
    }))
  }

  const closeLocationModal = () => {
    setAppState((prev) => ({
      ...prev,
      modalState: { ...prev.modalState, location: false },
    }))
  }

  const closeFoodModal = () => {
    setAppState((prev) => ({
      ...prev,
      selectedFood: null,
      modalState: { ...prev.modalState, foodDetail: false },
    }))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-red-500" />
            <span className="text-lg font-semibold text-gray-900">{appState.currentLocation.name}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={openLocationModal}
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            変更
          </Button>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* タイトルセクション */}
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-xl font-bold text-gray-900">{appState.currentLocation.name}で絶対食べるべき</h1>
          <Badge className="bg-amber-400 text-gray-900 hover:bg-amber-500 font-semibold">TOP 5</Badge>
        </div>

        {/* 料理リスト */}
        <FoodList foods={appState.foods} onFoodClick={handleFoodClick} isLoading={appState.isLoading} />

        {/* ローディング中の追加表示 */}
        {appState.isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-amber-500 mr-2" />
            <span className="text-gray-600">{appState.currentLocation.name}のグルメ情報を取得中...</span>
          </div>
        )}
      </main>

      {/* モーダル */}
      <LocationModal
        isOpen={appState.modalState.location}
        onClose={closeLocationModal}
        locations={locations}
        onLocationSelect={handleLocationChange}
        currentLocation={appState.currentLocation}
      />

      <FoodDetailModal isOpen={appState.modalState.foodDetail} onClose={closeFoodModal} food={appState.selectedFood} />
    </div>
  )
}
