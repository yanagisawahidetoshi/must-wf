"use client"

import { useState } from "react"
import type { Location } from "@/types"
import { locations } from "@/lib/data"

export function useGeolocation() {
  const [location, setLocation] = useState<GeolocationPosition | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("位置情報がサポートされていません")
      return
    }

    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position)
        setLoading(false)
      },
      (error) => {
        setError("位置情報の取得に失敗しました")
        setLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5分間キャッシュ
      },
    )
  }

  const findNearestCity = (userLocation: GeolocationPosition): Location => {
    let nearestCity = locations[0] // デフォルトは東京
    let minDistance = Number.POSITIVE_INFINITY

    locations.forEach((city) => {
      const distance = calculateDistance(
        userLocation.coords.latitude,
        userLocation.coords.longitude,
        city.latitude,
        city.longitude,
      )

      if (distance < minDistance) {
        minDistance = distance
        nearestCity = city
      }
    })

    return nearestCity
  }

  return {
    location,
    error,
    loading,
    getCurrentLocation,
    findNearestCity,
  }
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // 地球の半径（km）
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}
