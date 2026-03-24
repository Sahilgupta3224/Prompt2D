import { Howl } from "howler";
import type { SoundtrackName } from "../types/Scene";
import { findURL } from "./soundtracks";

const FADE_TIME = 1000;

export class SoundtrackManager {
    private currentHowl: Howl | null = null;
    private currentTrackName: SoundtrackName | null = null;
    play(trackName: SoundtrackName): void {
        if (this.currentTrackName === trackName) return;
        this.stop();

        const audioUrl = findURL(trackName);
        if (!audioUrl) {
            console.warn(`[SoundtrackManager] No audio URL for track: "${trackName}"`);
            return;
        }
        this.currentTrackName = trackName;
        const howl = new Howl({
            src: audioUrl,
            loop: true,
            volume: 0,

            onload: () => {
                if (this.currentHowl !== howl) return;
                console.log("started")
                howl.play();
                howl.fade(0, 1, FADE_TIME);
                console.info(`[SoundtrackManager] Now playing: "${trackName}"`);
            },

            onloaderror: (_soundId: number, error: unknown) => {
                console.warn(`[SoundtrackManager] Failed to load "${trackName}":`, error);
                if (this.currentHowl === howl) {
                    this.currentHowl = null;
                    this.currentTrackName = null;
                }
            },
        });

        this.currentHowl = howl;
    }

    stop(): void {
        const howl = this.currentHowl;
        this.currentHowl = null;
        this.currentTrackName = null;
        if (!howl) return;
        howl.fade(howl.volume(), 0, FADE_TIME);
        setTimeout(() => {
            try { howl.stop(); howl.unload(); } catch {}
        }, FADE_TIME + 50);
    }

    destroy(): void {
        this.stop();
    }
}