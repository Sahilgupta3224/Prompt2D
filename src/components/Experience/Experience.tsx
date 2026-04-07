import { useEffect, useState, useCallback, useRef } from "react"
import { Howler } from "howler"
import { Application, extend } from "@pixi/react"
import { Assets, Container, Texture } from "pixi.js"
import { MainContainer } from "./MainContainer/MainContainer"
import { calculateCanvasSize } from "../../helpers/common"
import backgroundAsset from '../../assets/space-stars.jpg'
import { generateScene } from "../../llm/client"
import type { GenerationStatus } from "../../llm/client"
import { DEMO_SCENE } from "../../constants/demo-scene"
import type { SceneDefinition } from "../../types/Scene"

extend({ Container })

const FONT_FAMILY = "'Outfit', 'Inter', 'Segoe UI', system-ui, sans-serif"

const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
}

const controlPanelStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '24px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    zIndex: 1000,
    width: '560px',
    maxWidth: '90vw',
}

const promptBarStyle: React.CSSProperties = {
    display: 'flex',
    width: '100%',
    backgroundColor: 'rgba(15, 15, 20, 0.85)',
    padding: '8px',
    borderRadius: '16px',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)',
    boxSizing: 'border-box' as const,
    border: '1px solid rgba(255,255,255,0.08)',
}

const inputStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
    height: '42px',
    padding: '0 16px',
    borderRadius: '12px',
    border: 'none',
    fontSize: '15px',
    fontFamily: FONT_FAMILY,
    outline: 'none',
    backgroundColor: 'rgba(255,255,255,0.07)',
    color: '#e8e8e8',
    boxSizing: 'border-box' as const,
    transition: 'background-color 0.2s',
}

const inputFocusStyle: React.CSSProperties = {
    backgroundColor: 'rgba(255,255,255,0.12)',
}

const buttonBaseStyle: React.CSSProperties = {
    marginLeft: '8px',
    height: '42px',
    padding: '0 20px',
    border: 'none',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '600',
    fontFamily: FONT_FAMILY,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box' as const,
    letterSpacing: '0.3px',
}

const recordButtonStyle = (isRecording: boolean): React.CSSProperties => ({
    position: 'absolute',
    top: '20px',
    right: '20px',
    height: '44px',
    padding: '0 20px',
    backgroundColor: isRecording
        ? 'rgba(220, 38, 38, 0.9)'
        : 'rgba(15, 15, 20, 0.8)',
    color: 'white',
    border: isRecording
        ? '1px solid rgba(248, 113, 113, 0.4)'
        : '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '14px',
    fontFamily: FONT_FAMILY,
    fontWeight: '600',
    zIndex: 1000,
    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
    backdropFilter: 'blur(20px)',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
})

const statusBadgeStyle = (status: GenerationStatus): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
        padding: '6px 14px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '600',
        fontFamily: FONT_FAMILY,
        letterSpacing: '0.4px',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
    }

    switch (status) {
        case "generating":
            return {
                ...baseStyle,
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                color: '#a5b4fc',
                border: '1px solid rgba(99, 102, 241, 0.3)',
            }
        case "fallback":
            return {
                ...baseStyle,
                backgroundColor: 'rgba(245, 158, 11, 0.15)',
                color: '#fbbf24',
                border: '1px solid rgba(245, 158, 11, 0.25)',
            }
        case "success":
            return {
                ...baseStyle,
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                color: '#6ee7b7',
                border: '1px solid rgba(16, 185, 129, 0.25)',
            }
        default:
            return { ...baseStyle, display: 'none' }
    }
}

const Experience = () => {
    const [canvasSize, setCanvasSize] = useState(calculateCanvasSize())
    const [bgTexture, setBgTexture] = useState<Texture | null>(null)
    const [isRecording, setIsRecording] = useState(false)
    const [currentScene, setCurrentScene] = useState<SceneDefinition>(DEMO_SCENE)
    const [sceneKey, setSceneKey] = useState(0)
    const [prompt, setPrompt] = useState("")
    const [status, setStatus] = useState<GenerationStatus>("idle")
    const [statusMessage, setStatusMessage] = useState("")
    const [inputFocused, setInputFocused] = useState(false)

    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const chunksRef = useRef<Blob[]>([])
    const statusTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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

    useEffect(() => {
        if (status === "success" || status === "fallback") {
            statusTimeoutRef.current = setTimeout(() => {
                setStatus("idle")
                setStatusMessage("")
            }, 4000)
        }
        return () => {
            if (statusTimeoutRef.current) clearTimeout(statusTimeoutRef.current)
        }
    }, [status])

    const toggleRecording = () => {
        if (isRecording) {
            mediaRecorderRef.current?.stop()
            setIsRecording(false)
        } else {
            const canvas = document.querySelector('canvas')
            if (!canvas) return

            try {
                const videoStream = (canvas as any).captureStream(60)
                const audioContext = Howler.ctx as AudioContext
                const audioDestination = audioContext.createMediaStreamDestination()
                Howler.masterGain.connect(audioDestination)
                const audioTrack = audioDestination.stream.getAudioTracks()[0]
                const combinedStream = audioTrack
                    ? new MediaStream([...videoStream.getVideoTracks(), audioTrack])
                    : videoStream
                const mimeTypes = ['video/webm;codecs=vp9', 'video/webm', 'video/mp4']
                let selectedMimeType = ''
                for (const type of mimeTypes) {
                    if (MediaRecorder.isTypeSupported(type)) {
                        selectedMimeType = type
                        break
                    }
                }

                const mediaRecorder = new MediaRecorder(combinedStream, selectedMimeType ? { mimeType: selectedMimeType } : undefined)
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

    const handleGenerate = async () => {
        if (!prompt.trim() || status === "generating") return
        console.log("generating",prompt)
        setStatus("generating")
        setStatusMessage("Generating scene...")

        try {
            const response = await generateScene(prompt)
            console.log(response)
            if (response.isFallback) {
                setStatus("fallback")
                setStatusMessage(response.message || "Used fallback scene")
                console.warn("[Experience] Fallback:", response.message)
            } else {
                setStatus("success")
                setStatusMessage("Scene generated!")
            }
            setCurrentScene(response.scene)
            setSceneKey(prev => prev + 1)

        } catch (e) {
            console.error("[Experience] Generation failed:", e)
            setStatus("fallback")
            setStatusMessage("Error occurred — showing demo scene")
            setCurrentScene(DEMO_SCENE)
            setSceneKey(prev => prev + 1)
        }
    }

    const getPlayButtonStyle = (): React.CSSProperties => {
        const isDisabled = status === "generating" || !prompt.trim()
        return {
            ...buttonBaseStyle,
            background: isDisabled
                ? 'rgba(255,255,255,0.08)'
                : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            color: isDisabled ? 'rgba(255,255,255,0.3)' : 'white',
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            boxShadow: isDisabled
                ? 'none'
                : '0 4px 12px rgba(99, 102, 241, 0.3)',
        }
    }

    const getButtonText = (): string => {
        switch (status) {
            case "generating": return "Generating..."
            default: return "▶ Play"
        }
    }
   
    const getStatusIcon = (): string => {
        switch (status) {
            case "generating": return "⏳"
            case "success": return "✓"
            case "fallback": return "⚠"
            default: return ""
        }
    }

    return (
        <div style={containerStyle}>
            <Application
                width={canvasSize.width}
                height={canvasSize.height}
                background="#1a1a2e"
                antialias={true}
            >
                <MainContainer
                    canvasSize={canvasSize}
                    sceneDef={currentScene}
                    key={sceneKey}
                />
            </Application>

            <div style={controlPanelStyle}>
                {status !== "idle" && (
                    <div style={statusBadgeStyle(status)}>
                        <span>{getStatusIcon()}</span>
                        <span>{statusMessage}</span>
                    </div>
                )}

                <div style={promptBarStyle}>
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe your animation scene..."
                        onKeyDown={(e) => { if (e.key === 'Enter') handleGenerate() }}
                        onFocus={() => setInputFocused(true)}
                        onBlur={() => setInputFocused(false)}
                        disabled={status === "generating"}
                        style={{
                            ...inputStyle,
                            ...(inputFocused ? inputFocusStyle : {}),
                            opacity: status === "generating" ? 0.6 : 1,
                        }}
                    />
                    <button
                        onClick={handleGenerate}
                        disabled={status === "generating" || !prompt.trim()}
                        style={getPlayButtonStyle()}
                    >
                        {getButtonText()}
                    </button>
                </div>
            </div>

            <button
                onClick={toggleRecording}
                style={recordButtonStyle(isRecording)}
            >
                {isRecording ? (
                    <>
                        <div style={{ width: 10, height: 10, backgroundColor: 'white', borderRadius: '2px' }} /> Stop
                    </>
                ) : (
                    <>
                        <div style={{
                            width: 10,
                            height: 10,
                            backgroundColor: '#f87171',
                            borderRadius: '50%',
                            animation: 'none',
                        }} /> Record
                    </>
                )}
            </button>
        </div>
    )
}

export default Experience