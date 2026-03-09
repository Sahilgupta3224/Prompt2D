import type { PropsWithChildren } from "react"
import { useState, useEffect } from "react"
import { Animation } from '../../Animation'
import heroAsset from '../../../assets/character_2x.png'
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
import { extend } from '@pixi/react'
extend({ Container, Graphics, Sprite, Texture })
import backgroundAsset from '../../../assets/whitebg.png'
import { Level } from "../../Levels/Level"
import { scanAnchors, Config } from '../../../helpers/anchorScanner'
import { SPRITE_ROWS } from '../../../helpers/spriteRows'
import type { Config as AnchorConfigFn } from '../../../helpers/anchorScanner'

type AttachmentConfig = ReturnType<typeof AnchorConfigFn>

interface IMainContainerProps {
  canvasSize: { width: number; height: number }
}


export const MainContainer = ({
  canvasSize,
  children
}: PropsWithChildren<IMainContainerProps>) => {
  const [backgroundTexture, setBackgroundTexture] = useState<Texture | null>(null)
  const [heroTexture, setHeroTexture] = useState<Texture | null>(null)
  const [anchorConfig, setAnchorConfig] = useState<AttachmentConfig | null>(null)

  useEffect(() => {
    Assets.load(backgroundAsset).then((texture) => {
      setBackgroundTexture(texture as Texture)
    })
    scanAnchors(heroAsset, 128, 128, SPRITE_ROWS)
      .then(({ anchorMap, cleanUrl }) => {
        const config = Config(anchorMap)
        setAnchorConfig(config)
        console.info(
          "[MainContainer] Anchor config built:",
          Object.keys(config).length,
          "animations with anchors"
        )
        return Assets.load(cleanUrl).then((texture) => {
          const t = texture as Texture;
          t.source.scaleMode = 'nearest';
          t.source.update();
          setHeroTexture(t);
        })
      })
      .catch(err => {
        console.log(err)
        setAnchorConfig({})
        Assets.load(heroAsset).then((texture) => {
          setHeroTexture(texture as Texture)
        })
      })
  }, [])

  if (!backgroundTexture || !heroTexture) return null

  const centerX = Math.max(0, (canvasSize.width - GAME_WIDTH) / 2)
  const centerY = Math.max(0, (canvasSize.height - GAME_HEIGHT) / 2)

  return (
    <pixiContainer x={centerX} y={centerY}>
      {children}
      <Level backgroundTexture={backgroundTexture} />
      <Animation
        herotexture={heroTexture}
        setBackgroundTexture={setBackgroundTexture}
        scannedAnchorConfig={anchorConfig}
      />
    </pixiContainer>
  )
}

export default MainContainer