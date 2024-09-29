import { ShoppingBag, Menu } from 'lucide-react'
import { getProducts } from '@/app/products'
import Image from 'next/image'
import { ProductCarouselComponent } from './product-carousel';

export async function LuxuryStorefrontGrid() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">jandj</h1>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-gray-600 transition-colors">New Arrivals</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Collections</a>
            <a href="#" className="hover:text-gray-600 transition-colors">About</a>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="md:hidden">
              <Menu className="w-6 h-6" />
            </button>
            <button className="relative">
              <ShoppingBag className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-24 pb-12">
        <h2 className="text-4xl font-light mb-12 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col"
            >
              <div
                className="relative aspect-[3/4] mb-4"
              >
                <ProductCarouselComponent products={product.images.map(path => ({ src: path, id: `${product.id}-${path}`, alt: product.id, name: product.name, caption: product.description }))} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}