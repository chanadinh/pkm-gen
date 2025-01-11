'use client'

import { useState } from 'react'
import { OpenAI } from 'openai'

const openai = new OpenAI({
  // apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  apiKey: '',
  dangerouslyAllowBrowser: true
})

export default function GeneratePage() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const enhancedPrompt = `A pixel art Pokemon in GameBoy Advance style. ${prompt}. The image should look like it's from a GBA Pokemon game with rich colors and detailed sprites.`
      
      const response = await openai.images.generate({
        prompt: enhancedPrompt,
        n: 1,
        size: "256x256",
        response_format: "url",
      })

      if (response.data[0]?.url) {
        setImageUrl(response.data[0].url)
      } else {
        throw new Error('No image was generated')
      }
    } catch (err) {
      console.error('Generation error:', err)
      setError('Failed to generate image. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="gba-container">
      <h1 className="text-3xl text-center mb-6 text-[#E0757C] font-bold">
        Generate Pokemon
      </h1>

      <div className="gba-screen mb-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your Pokemon... (e.g., 'A fire-type dragon with wings')"
            className="gba-input w-full"
            rows={4}
          />
          
          <button 
            type="submit" 
            className="gba-button w-full"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </form>
      </div>

      <div className="gba-screen">
        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}
        {imageUrl && (
          <div className="flex flex-col items-center">
            <img 
              src={imageUrl} 
              alt="Generated Pokemon" 
              className="max-w-full h-auto pixelated border-4 border-[#5A8087] rounded-lg"
            />
            <a 
              href={imageUrl}
              download="pokemon.png"
              className="gba-button mt-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </a>
          </div>
        )}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        <div className="w-3 h-3 rounded-full bg-[#E0757C]"></div>
        <div className="w-3 h-3 rounded-full bg-[#E0757C]"></div>
      </div>
    </div>
  )
}
