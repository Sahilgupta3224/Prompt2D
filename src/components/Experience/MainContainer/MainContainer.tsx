import type { PropsWithChildren } from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { Hero } from '../../Hero/Hero'
import heroAsset from '../../../assets/hero.png'
import {
  Container,
  Graphics,
  Sprite,
  Texture,
  Assets,
} from 'pixi.js'
import {
  extend
} from '@pixi/react'
extend({
  Container,
  Graphics,
  Sprite,
  Texture
})
import backgroundAsset from '../../../assets/space-stars.jpg'
import { Level } from "../../Levels/Level"
import { ProjectileSystem } from "../../Projectile/Projectile"

interface IMainContainerProps {
  canvasSize: { width: number; height: number }
}

export const MainContainer = ({
  canvasSize,
  children
}: PropsWithChildren<IMainContainerProps>) => {
  const projectileRef = useRef<any>({})
  
  const [heroPosition, setHeroPosition] = useState({ x: 0, y: 0 })
  
  const updateHeroPosition = useCallback((x: number, y: number) => {
    setHeroPosition({
      x: Math.floor(x / 64),
      y: Math.floor(y / 64),
    })
  }, [])

  const [backgroundTexture, setBackgroundTexture] = useState<Texture | null>(null)
  const [heroTexture, setHeroTexture] = useState<Texture | null>(null)

  useEffect(() => {
    Assets.load(backgroundAsset).then((texture) => {
      setBackgroundTexture(texture as Texture)
    })
    Assets.load(heroAsset).then((texture) => {
      setHeroTexture(texture as Texture)
    })
  }, [])
  
  if (!backgroundTexture) {
    return null
  }
  if (!heroTexture) {
    return null
  }

  const GAME_WIDTH = 775
  const GAME_HEIGHT = 500
  
  const centerX = (canvasSize.width - GAME_WIDTH) / 2
  const centerY = (canvasSize.height - GAME_HEIGHT) / 2

  return (
    <pixiContainer x={centerX} y={centerY}>
      {children}
      <Level />
      <Hero 
        texture={heroTexture} 
        onMove={updateHeroPosition} 
        projectileRef={projectileRef}
      />
        <ProjectileSystem projectileRef={projectileRef} />
    </pixiContainer>
  )
}

export default MainContainer