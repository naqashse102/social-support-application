import { createContext, useContext, useState } from 'react'
import type { LoaderContextType } from '../types/common'


const LoaderContext = createContext<LoaderContextType | null>(null)

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false)
  console.log('Isloading', loading)
  return (
    <LoaderContext.Provider
      value={{
        showLoader: () => setLoading(true),
        hideLoader: () => setLoading(false),
      }}
    >
      {children}

      {loading && (
        <div id='app-loader' className="fixed inset-0 z-201 flex items-center justify-center bg-white/70 backdrop-blur-sm">
          <img src="/loader.gif" className="h-65 w-65" />
        </div>
      )}
    </LoaderContext.Provider>
  )
}

export function useLoader() {
  const ctx = useContext(LoaderContext)
  if (!ctx) {
    throw new Error('useLoader must be used inside LoaderProvider')
  }
  return ctx
}
