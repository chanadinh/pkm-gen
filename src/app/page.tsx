import Link from 'next/link'

export default function Home() {
  return (
    <main className="gba-container">
      <h1 className="text-4xl text-center mb-8 text-[#E0757C] font-bold">
        Pokemon AI Generator
      </h1>
      
      <div className="gba-screen mb-8">
        <p className="text-[#2D1B2E] mb-6 text-lg">
          Welcome to the Pokemon AI Generator! Create your own unique Pokemon in GameBoy Advance style.
        </p>
        
        <Link href="/generate" className="gba-button block text-center w-full max-w-sm mx-auto">
          Start Generating
        </Link>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        <div className="w-3 h-3 rounded-full bg-[#E0757C]"></div>
        <div className="w-3 h-3 rounded-full bg-[#E0757C]"></div>
      </div>
    </main>
  )
}
