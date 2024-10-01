"use client"

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Custom hook for keyboard navigation
const useKeyPress = (targetKey: string, handler: () => void) => {
  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        handler()
      }
    }
    window.addEventListener('keydown', keyHandler)
    return () => {
      window.removeEventListener('keydown', keyHandler)
    }
  }, [targetKey, handler])
}

export interface Product {
  id: string
  src: string
  alt: string
  name: string
  caption: string
}

interface ProductCarouselProps {
  products: Product[]
}

export function ProductCarouselComponent({ products }: ProductCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % products.length)
  }, [products.length])

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length)
  }, [products.length])

  // Use custom hook for keyboard navigation
  useKeyPress('ArrowRight', nextImage)
  useKeyPress('ArrowLeft', prevImage)

  const thumbnailImages = [
    ...products.slice(currentImageIndex + 1),
    ...products.slice(0, currentImageIndex)
  ]

  const hasMultipleImages = products.length > 1

  return (
    <div className="flex flex-col gap-4 max-w-4xl mx-auto p-4">
      <div className="relative">
        <div className="relative">
          <Image
            src={products[currentImageIndex].src}
            alt={products[currentImageIndex].alt}
            width={400}
            height={600}
            className="w-full h-auto object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h2 className="text-2xl font-bold mb-2">{products[currentImageIndex].name}</h2>
            <p className="text-sm">{products[currentImageIndex].caption}</p>
          </div>
        </div>
        {hasMultipleImages && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>
      {hasMultipleImages && (
        <div className="flex justify-center gap-2 mt-4">
          {products.map((product, index) => (
            <button
              key={product.id}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${index === currentImageIndex ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}