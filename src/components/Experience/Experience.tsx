import { useEffect, useState, useCallback } from "react"
import { Application, extend } from "@pixi/react"
import { Assets, Container, Texture } from "pixi.js"
import { MainContainer } from "./MainContainer/MainContainer"
import { calculateCanvasSize } from "../../helpers/common"
import backgroundAsset from '../../assets/space-stars.jpg'

extend({ Container })

const Experience = () => {
  const [canvasSize, setCanvasSize] = useState(calculateCanvasSize())
  const [bgTexture, setBgTexture] = useState<Texture | null>(null)
  const updateCanvasSize = useCallback(() => {
    setCanvasSize(calculateCanvasSize())
  }, [])

  useEffect(() => {
    Assets.load(backgroundAsset).then(t => setBgTexture(t as Texture))
  }, [])

  useEffect(() => {
    window.addEventListener("resize", updateCanvasSize)
    return () => window.removeEventListener("resize", updateCanvasSize)
  }, [updateCanvasSize])
  console.log(canvasSize)
  return (
    <>
    <Application
      width={canvasSize.width}
      height={canvasSize.height}
      background="#1099bb"
    >
      {bgTexture && (
        <pixiSprite
          texture={bgTexture}
          width={canvasSize.width}
          height={canvasSize.height}
        />
      )}
    <MainContainer canvasSize={canvasSize} />
    </Application>
    </>
  )
}

export default Experience