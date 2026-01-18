import {
  GAME_HEIGHT,
  GAME_WIDTH,
  OFFSET_X,
  OFFSET_Y,
} from '../../constants/game-world'
import { Sprite, Texture, Assets } from 'pixi.js'
import levelAsset from '../../assets/whitebg.png'
import {
  extend,
} from '@pixi/react'
import { useState, useEffect } from "react"
extend({ Sprite, Texture })

export const Level = () => {
  const [backgroundTexture, setBackgroundTexture] = useState<Texture | null>(null)

  useEffect(() => {
    Assets.load(levelAsset).then((texture) => {
      setBackgroundTexture(texture as Texture)
    })
  }, [])

  if (!backgroundTexture) {
    return null
  }
  return (
    <>
      <pixiSprite
        texture={backgroundTexture}
        width={GAME_WIDTH}
        height={GAME_HEIGHT + OFFSET_Y}
        scale={1}
        x={OFFSET_X}
        y={OFFSET_Y}
      />
    </>
  )
}
