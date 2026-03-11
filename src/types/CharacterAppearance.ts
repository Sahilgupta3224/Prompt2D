export interface CharacterAppearance {
    body: string;
    hair?: string;
    head?: string;
    torso?: string;
    legs?: string;
    feet?: string;
    hat?: string;
    weapon?: string;
    shield?: string;
    arms?: string;
    belt?: string;
    neck?: string;
    eyes?: string;
    facial?: string;
    beard?: string;
    gloves?: string;
    fallbacks?: Partial<Record<AppearanceCategory, string>>;
}

export type AppearanceCategory = keyof CharacterAppearance;
