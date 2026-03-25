import Link from 'next/link'
import { ArrowRight, ShieldCheck, Truck, Clock } from 'lucide-react'

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-zinc-950 text-white min-h-[85vh] flex items-center">
      {/* Abstract dark gradients for premium feel */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-red-900/20 via-zinc-950 to-zinc-950"></div>
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-6 animate-fade-in-up">
              <span className="flex w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Fresh Arrivals Daily
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              Premium Cuts, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                Delivered Fresh.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 mb-8 max-w-lg leading-relaxed">
              Experience the finest selection of locally-sourced, expertly crafted meats. From pristine ribeyes to organic free-range chicken, right to your doorstep.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link 
                href="/shop" 
                className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-600/20"
              >
                Order Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/deals" 
                className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 hover:border-zinc-700 rounded-xl font-semibold transition-all duration-300"
              >
                View Daily Deals
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-zinc-900 text-red-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-zinc-200">100% Halal</p>
                  <p className="text-zinc-500">Certified meats</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-zinc-900 text-red-400">
                  <Truck className="w-5 h-5" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-zinc-200">Fast Delivery</p>
                  <p className="text-zinc-500">Same day available</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-zinc-900 text-red-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-zinc-200">Fresh Cuts</p>
                  <p className="text-zinc-500">Cut to order</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            {/* Modern image composition with decorative elements */}
            <div className="relative w-full aspect-square max-w-[550px] mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-transparent rounded-3xl rotate-3 scale-105 border border-white/10 blur-sm"></div>
              <div className="absolute inset-0 bg-zinc-900 rounded-3xl -rotate-3 border border-zinc-800 overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1603048297172-c92544798d5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Premium Steak" 
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-700 hover:scale-105"
                />
              </div>
              
              {/* Floating review card */}
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 animate-bounce" style={{animationDuration: '3s'}}>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <img className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-900" src="https://i.pravatar.cc/100?img=1" alt="User" />
                    <img className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-900" src="https://i.pravatar.cc/100?img=2" alt="User" />
                    <img className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-900" src="https://i.pravatar.cc/100?img=3" alt="User" />
                  </div>
                  <div>
                    <div className="flex text-yellow-500 text-sm">
                      ★★★★★
                    </div>
                    <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">4.9/5 from 2k+ reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
