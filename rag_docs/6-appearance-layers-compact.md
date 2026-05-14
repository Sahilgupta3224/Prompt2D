# Character Appearance & Layers (Compact)

The engine uses a deeply nested paper-doll sprite system (LPC format). Characters are assembled dynamically by stacking various layers. Order matters (e.g., body first, clothing over it).

## Standard Component Layer Contribution
- **body**: foundational base skin (Required).
- **head**: shape of the head (Required).
- **hair**, **torso**, **legs**, **feet**, **neck**, **facial**, **beards**, **hat**, **arms**, **gloves**, **cape**, **shield**, **weapon**.

---

## Example String Paths (Use These for Reference)

### Category: `body`
- `"bodies/female"`, `"bodies/male"`, `"bodies/pregnant"`, `"bodies/teen"`

### Category: `head`
- `"heads/human/female"`, `"heads/human/male"`, `"heads/orc/male"`, `"heads/skeleton"`, `"heads/wolf/male"`

### Category: `torso`
- `"clothes/longsleeve/longsleeve/female"`, `"clothes/shortsleeve/tshirt/male"`, `"armour/plate/male"`, `"aprons/overalls/female"`

### Category: `legs`
- `"pants/thin"`, `"pants/male"`, `"cuffed/male"`, `"formal/thin"`, `"shorts/short_shorts/thin"`

### Category: `feet`
- `"boots/revised/male"`, `"shoes/ghillies/thin"`, `"sandals/male"`

### Category: `hair`
- `"long/adult"`, `"shorthawk/adult"`, `"messy1/adult"`, `"bob/adult"`

### Category: `hat`
- `"helmet/greathelm/male"`, `"magic/wizard/base/adult"`, `"cloth/bandana/adult"`

### Category: `weapon`
- `"magic/wand/female"`, `"magic/wand/male"`, `"ranged/bow/arrow"`

### Category: `shield`
- `"heater/original/paint"`, `"heater/revised/wood"`

### Category: `facial`
- `"glasses/nerd/adult"`, `"patches/eyepatch/right/adult"`

> **Note**: There are many more specific variations. Always follow the pattern `category/item/variation/gender` when in doubt.
