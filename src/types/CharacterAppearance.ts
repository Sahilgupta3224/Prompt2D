export interface CharacterAppearance {
    arms?: string;
    backpack?:string;
    bauldron?:string;
    beards?: string;
    body: string;
    cape?: string;
    dress?:string;
    eyes?: string;
    facial?: string;
    feet?: string;
    hair?: string;
    hat?: string;
    head?: string;
    legs?: string;
    neck?: string;
    quiver?:string;
    shadow?:string;
    shield?: string;
    shoulders?:string;
    tools?:string;
    torso?: string;
    weapon?: string;
    wrists?: string;
    gloves?: string;
    fallbacks?: Partial<Record<AppearanceCategory, string>>;
}

export type AppearanceCategory = keyof CharacterAppearance;
