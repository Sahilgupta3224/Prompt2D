import { useRef } from "react"
import { Sprite, Texture, Ticker } from "pixi.js"
import { extend, useTick } from "@pixi/react"

extend({ Sprite })

type Projectile = {
  dx: number
  dy: number
  x: number
  y: number
  vx: number
  vy: number
  gravity: number
  rotation: number
  texture: Texture
  alive: boolean
}

export const ProjectileSystem = ({ projectileRef }: { projectileRef: React.MutableRefObject<Projectile> }) => {
  const spriteRef = useRef<Sprite>(null)
  console.log(projectileRef)
  useTick((ticker: Ticker) => {
  const p = projectileRef.current
  const sprite = spriteRef.current
  const dt = ticker.deltaTime
  if (!p || !p.alive || !sprite) {
    return
  }
  console.log(p.x," ", p.y)

    p.vy += p.gravity * dt
    p.x += p.vx * dt
    p.y += p.vy * dt

    p.rotation = Math.atan2(p.vy, p.vx)

    const dist = Math.hypot(p.x - p.dx, p.y - p.dy)

    if (dist < 5) {
      p.alive = false
    }
    sprite.x = p.x
    sprite.y = p.y
    sprite.rotation = p.rotation
    if (sprite.texture !== p.texture) {
      sprite.texture = p.texture
    }
    sprite.visible = true
  }
)
  console.log(projectileRef)

  return (
          <pixiSprite 
            ref={spriteRef}
            anchor={0.5}
            scale={0.005}
            visible={true}
          />
        )
}
