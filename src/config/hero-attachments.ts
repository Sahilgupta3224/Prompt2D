export const HERO_ATTACHMENTS: Record<string, Record<string, { x: number, y: number } | { x: number, y: number }[]>> = {
    DANCE: {
        hand: [
            { x: 40, y: 35 },
            { x: 45, y: 30 },
            { x: 50, y: 25 },
            { x: 45, y: 30 },
            { x: 40, y: 35 },
            { x: 35, y: 40 },
            { x: 30, y: 45 },
            { x: 35, y: 40 },
            { x: 40, y: 35 },
        ]
    },
    JUMPUP: {
        hand: [
            { x: 35, y: 40 },
            { x: 30, y: 35 },
            { x: 25, y: 20 },
            { x: 25, y: 18 },
            { x: 30, y: 25 },
        ]
    },
    default: {
        hand: { x: 40, y: 42 }
    }
};
