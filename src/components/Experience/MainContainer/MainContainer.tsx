import type { PropsWithChildren } from "react"
import { useState, useEffect, useRef } from "react"
import { Animation } from '../../Animation'
import heroAsset from '../../../assets/hero.png'
import {
  Container,
  Graphics,
  Sprite,
  Texture,
  Assets,
} from 'pixi.js'
import {
  GAME_HEIGHT,
  GAME_WIDTH,
} from '../../../constants/game-world'
import {
  extend
} from '@pixi/react'
extend({
  Container,
  Graphics,
  Sprite,
  Texture
})
import backgroundAsset from '../../../assets/whitebg.png'
import { Level } from "../../Levels/Level"
import objectAsset from "../../../assets/rock.png";

interface IMainContainerProps {
  canvasSize: { width: number; height: number }
}

export const MainContainer = ({
  canvasSize,
  children
}: PropsWithChildren<IMainContainerProps>) => {
  // const projectileRef = useRef<any>({})

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

  const centerX = Math.max(0, (canvasSize.width - GAME_WIDTH) / 2)
  const centerY = Math.max(0, (canvasSize.height - GAME_HEIGHT) / 2)

  return (
    <pixiContainer x={centerX} y={centerY}>
      {children}
      <Level backgroundTexture={backgroundTexture}/>
      <Animation
        herotexture={heroTexture} setBackgroundTexture={setBackgroundTexture}
      />
    </pixiContainer>
  )
}

export default MainContainer