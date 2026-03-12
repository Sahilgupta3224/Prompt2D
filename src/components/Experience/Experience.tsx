import { useEffect, useState, useCallback, useRef } from "react"
import { Application, extend } from "@pixi/react"
import { Assets, Container, Texture } from "pixi.js"
import { MainContainer } from "./MainContainer/MainContainer"
import { calculateCanvasSize } from "../../helpers/common"
import backgroundAsset from '../../assets/space-stars.jpg'

extend({ Container })

const Experience = () => {
  const [canvasSize, setCanvasSize] = useState(calculateCanvasSize())
  const [bgTexture, setBgTexture] = useState<Texture | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

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

  const toggleRecording = () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop()
      setIsRecording(false)
    } else {
      const canvas = document.querySelector('canvas')
      if (!canvas) return

      try {
        const stream = (canvas as any).captureStream(60)
        const mimeTypes = ['video/webm;codecs=vp9', 'video/webm', 'video/mp4']
        let selectedMimeType = ''
        for (const type of mimeTypes) {
           if (MediaRecorder.isTypeSupported(type)) {
               selectedMimeType = type
               break
           }
        }

        const mediaRecorder = new MediaRecorder(stream, selectedMimeType ? { mimeType: selectedMimeType } : undefined)
        mediaRecorderRef.current = mediaRecorder
        chunksRef.current = []

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunksRef.current.push(e.data)
        }

        mediaRecorder.onstop = () => {
          const mimeType = selectedMimeType || 'video/webm'
          const blob = new Blob(chunksRef.current, { type: mimeType })
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.style.display = 'none'
          a.href = url
          
          const extension = mimeType.includes('mp4') ? 'mp4' : 'webm'
          a.download = `animation.${extension}`
          document.body.appendChild(a)
          a.click()
          setTimeout(() => {
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
          }, 100)
        }

        mediaRecorder.start()
        setIsRecording(true)
      } catch (err) {
        console.error("Failed to start recording", err)
      }
    }
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Application
        width={canvasSize.width}
        height={canvasSize.height}
        background="#484a4aff"
        antialias={true}
      >
        <MainContainer canvasSize={canvasSize} />
      </Application>
      
      <button 
        onClick={toggleRecording}
        style={{
            position: 'absolute',
            top: '100px',
            height: '60px',
            right: '20px',
            padding: '12px 24px',
            backgroundColor: isRecording ? '#dc2626' : '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '16px',
            fontFamily: 'Outfit, Inter, sans-serif',
            fontWeight: '600',
            zIndex: 1000,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            transition: 'background-color 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        }}
      >
        {isRecording ? (
          <>
            <div style={{ width: 10, height: 10, backgroundColor: 'white', borderRadius: '2px' }} /> Stop Recording
          </>
        ) : (
          <>
            <div style={{ width: 10, height: 10, backgroundColor: '#f87171', borderRadius: '50%' }} /> Record Animation
          </>
        )}
      </button>
    </div>
  )
}

export default Experience