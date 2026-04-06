# Assets, Shapes & Character Appearance

The engine provides predefined assets, basic geometry tools for objects, and a comprehensive paper-doll assembly system for characters (based on Liberated Pixel Cup / LPC format).

## 1. Scene Assets
When defining the `background` or `soundtrack` for a `SceneDefinition`, you are restricted to these loaded enums:

**Backgrounds**
- `"park"` 
- `"city"` 
- `"forest"`
- `"mountain"`
- `"beach"`
- `"desert"`

**Soundtracks**
- `"battle"` - Upbeat combat theme
- `"dance"` - High energy party theme
- `"calm"` - Peaceful, restful music
- `"soft"` - Melancholy or emotional theme
- `"mystical"` - Magical or eerie tones
- `"energetic"` - Sports/racing theme

## 2. Object Generation (Shapes)
If an entity has `isObject: true`, it will render a dynamically generated vector shape rather than a sprite sheet. You must provide `shape` and `color`.

**Supported Shapes:**
- `"circle"`
- `"square"`
- `"rectangle"`
- `"triangle"`
- `"diamond"`
- `"star"`
- `"heart"`
- `"ellipse"`
- `"capsule"`
- `"arrow"`
- `"cross"`
- `"ring"`
- `"cone"`
- `"cylinder"`
- `"randomPolygon"`
- `"line"`

**Color:** Must be a valid Hex string (e.g. `"#ff0000ff"`, `"#33ccffff"`).

## 3. Character Appearance (LPC Format)
Characters are dynamically assembled from layered spritesheets. A character `appearance` object defines paths to specific sprites out of the engine's internal `/layers` directory.

### Appearance Categories
A standard humanoid usually uses at least these parts:
```json
{
  "body": "bodies/male",
  "head": "heads/human/male",
  "hair": "afro/adult",
  "torso": "clothes/longsleeve/longsleeve2_cardigan/male",
  "legs": "cuffed/male",
  "feet": "feet/shoes/basic/male",
  "gloves": "gloves/male",
  "facial": "glasses/sunglasses/adult"  
}
```

**Common Examples / Available Prefix Trees:**
- `body`: `"bodies/male"`, `"bodies/female"`, `"bodies/skeleton"`
- `head`: `"heads/human/male"`, `"heads/human/female"`, `"heads/orc/male"`
- `hair`: `"afro/adult"`, `"bangsshort/adult"`, `"bun/adult"`, `"long_loose/adult"`, `"jewfro/adult"`, `"messy2/adult"`
- `torso`: `"clothes/shirt/male"`, `"clothes/longsleeve/longsleeve2_cardigan/male"`, `"clothes/sleeveless/sleeveless1/female"`, `"armour/legion/male"`
- `legs`: `"pants/male"`, `"pants/female"`, `"cuffed/male"`, `"pant_thin/male"`
- `feet`: `"feet/shoes/basic/male"`, `"feet/shoes/basic/female"`, `"boots/rimmed/male"`
- `gloves`: `"gloves/male"`, `"gloves/female"`
- `hat`: `"hat/holiday/christmas/male"`, `"hat/helmet/greathelm/male"`, `"hat/pirate/base/male"`, `"hat/magic/celestial/adult"`, `"hat/cloth/bandana/adult"`
- `facial`: `"glasses/sunglasses/adult"`, `"patches/eyepatch/left/adult"`, `"beards/mustache"`

*Note to the AI:* You do not need to memorize every possible path, but when constructing character avatars, adhere to the structure `"<type>/<category>/<gender_or_age>"` logically resembling standard RPG layers. Always include `body`, `head`, `torso`, `legs`, and `feet` at a minimum to avoid rendering invisible characters. Alo, It is necessary to include gloves every time even if user prompts not to.
