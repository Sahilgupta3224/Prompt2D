import type { SoundtrackName } from "../types/Scene";
import sport from "../assets/sounds/sport.mp3";

interface Sound {
    keywords: string[];
    trackName: SoundtrackName;
}

const MAPPING: Sound[] = [
    {
        keywords: ["fight", "battle", "war", "attack", "combat", "clash", "duel", "enemy", "boss"],
        trackName: "battle",
    },
    {
        keywords: ["dance", "party", "celebrate", "celebration", "happy", "festival", "cheer", "joy"],
        trackName: "dance",
    },
    {
        keywords: ["sleep", "rest", "night", "calm", "quiet", "peaceful", "relax", "nap", "dream"],
        trackName: "calm",
    },
    {
        keywords: ["sad","soft", "cry", "grief", "mourn", "lonely", "goodbye", "farewell", "weep", "sorrow"],
        trackName: "soft",
    },
    {
        keywords: ["magic", "spell", "wizard", "enchant", "mystical", "sorcerer", "potion", "ritual", "charm"],
        trackName: "mystical",
    },
    {
        keywords: ["sport", "energetic", "football", "run", "race", "sprint", "chase", "kick", "score", "goal", "match"],
        trackName: "energetic",
    },
];

export const URLS: Record<SoundtrackName, string> = {
    battle: sport,
    dance: sport,
    calm: sport,
    soft: sport,
    mystical: sport,
    energetic: sport,
};

export function findURL(music: string) : string {
    for (const sound of MAPPING) {
        if(sound.keywords.includes(music)){
            return URLS[sound.trackName]
        }
    }
    return sport;
}