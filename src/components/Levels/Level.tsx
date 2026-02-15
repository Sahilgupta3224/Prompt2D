import {
  GAME_HEIGHT,
  GAME_WIDTH,
} from '../../constants/game-world'
import { Sprite, Texture } from 'pixi.js'
import {
  extend
} from '@pixi/react'
extend({ Sprite, Texture })

export const Level = ({backgroundTexture}: {backgroundTexture: Texture | null}) => {

  if (!backgroundTexture) {
    return null
  }
  return (
    <>
      <pixiSprite
        texture={backgroundTexture}
        width={GAME_WIDTH}
        height={GAME_HEIGHT}
      />
    </>
  )
}
