'use client'

import { useState, useEffect } from 'react'
import { OpenAI } from 'openai'
import Image from 'next/image'

const openai = new OpenAI({
  // apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  apiKey: '',
  dangerouslyAllowBrowser: true
})

const generatePokemonName = async (description: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a Pokemon name generator. Generate a single creative Pokemon name (one word, no spaces) based on the description. The name should follow Pokemon naming conventions and be between 4-10 characters. Respond with just the name, nothing else."
        },
        {
          role: "user",
          content: description
        }
      ],
      temperature: 0.7,
      max_tokens: 10,
    });

    const name = response.choices[0]?.message?.content?.trim() || 'Mon';
    return name;
  } catch (error) {
    console.error('Error generating name:', error);
    return 'Mon';
  }
}

export default function GeneratePage() {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState('')
  const [pokemonName, setPokemonName] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)

  // Handle audio playback during loading
  useEffect(() => {
    const audio = new Audio('/loading-sound.mp3')
    audio.loop = true
    
    if (loading && !isPlaying) {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error('Audio playback failed:', err))
    }
    
    return () => {
      audio.pause()
      audio.currentTime = 0
      setIsPlaying(false)
    }
  }, [loading, isPlaying])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      // Generate name first
      const name = await generatePokemonName(prompt)
      setPokemonName(name)
      const enhancedPrompt = `A pixel art Pokemon named ${name} in GameBoy Advance style. ${prompt}. The image should look like it's from a GBA Pokemon game with rich colors and detailed sprites.`
      
      const response = await openai.images.generate({
        prompt: enhancedPrompt,
        n: 1,
        size: "512x512",
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
        {pokemonName && !imageUrl && !error && (
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-[#2D1B2E] mb-4">
              Generating {pokemonName}...
            </h3>
            <div className="relative w-64 h-64 mx-auto">
              <Image
                src="/uia-unscreen.gif"
                alt="Loading..."
                fill
                className="object-contain pixelated"
                priority
              />
            </div>
          </div>
        )}
        {imageUrl && (
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold mb-2 text-[#2D1B2E]">
              {pokemonName}
            </h3>
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
