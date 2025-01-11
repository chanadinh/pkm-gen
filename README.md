# Pokemon AI Generator

## Project Overview
- Next.js web application for generating Pokemon-style pixel art using AI
- GameBoy-inspired UI with classic color palette
- Uses OpenAI for image generation

## Style Guide
- Color Palette:
  - Darkest: #0F380F
  - Dark: #306230
  - Light: #8BAC0F
  - Lightest: #9BBC0F
  - Background: #C4CFA1
  - Screen: #8B956D

## Components
- Use gameboy-container, gameboy-screen, and gameboy-button classes for consistent styling
- Keep pixel art aesthetic with image-rendering: pixelated

## Dependencies
- @vercel/ai: AI integration
- openai: OpenAI API client
- TailwindCSS: Styling

## AI Implementation
- Uses OpenAI's DALL-E model for image generation
- Prompts are enhanced to specify GameBoy style and color palette
- Images are generated at 256x256 resolution
- Error handling and loading states included
- Direct download link for generated images

## Environment Variables
Required environment variables:
- OPENAI_API_KEY: OpenAI API key for image generation

## TODO
- Add image saving to server
- Add gallery of generated Pokemon
- Implement rate limiting
- Add more prompt templates
