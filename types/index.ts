export interface Location {
  id: string
  name: string
  nameEn: string
  slug: string
  region: string
  latitude: number
  longitude: number
  emoji: string
}

export interface Food {
  id: string
  name: string
  nameEn: string
  description: string
  shortDesc: string
  imageUrl: string
  ranking: number
  priceRange: string
  priceRangeUsd: string
  howToEat?: string
  culturalContext?: string
  locationId: string
  restaurants: Restaurant[]
  orderPhrases: OrderPhrase[]
}

export interface Restaurant {
  id: string
  name: string
  nameEn?: string
  address: string
  googleMapUrl: string
  features: string[]
}

export interface OrderPhrase {
  id: string
  japanese: string
  romaji: string
  english: string
}

export interface AppState {
  currentLocation: Location
  foods: Food[]
  isLoading: boolean
  selectedFood: Food | null
  modalState: {
    location: boolean
    foodDetail: boolean
  }
}
