import { readdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { createCanvas, loadImage } from "@napi-rs/canvas";

const LAYERS_DIR = resolve(process.argv[2] ?? "src/assets");
const OUTPUT = resolve(process.argv[3] ?? "src/assets/character_assembled.png");

async function main() {
    const allFiles = await readdir(LAYERS_DIR);
    const layerFiles = allFiles
        .filter(f => /^\d{3}\s/.test(f) && f.endsWith(".png"))
        .sort((a, b) => parseInt(a) - parseInt(b));

    if (layerFiles.length === 0) {
        console.error("❌ No layer PNGs found in", LAYERS_DIR);
        console.error("   Expected files like '010 body_color__light_.png'");
        process.exit(1);
    }

    console.log(`Found ${layerFiles.length} layers:`);
    layerFiles.forEach(f => console.log(`  • ${f}`));

    const images = await Promise.all(
        layerFiles.map(f => loadImage(join(LAYERS_DIR, f)))
    );
    const width = images[0].width;
    const height = images[0].height;
    console.log(`\nCanvas size: ${width} × ${height}`);

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    for (let i = 0; i < images.length; i++) {
        console.log(`  Drawing layer ${layerFiles[i]} ...`);
        ctx.drawImage(images[i], 0, 0);
    }

    const { writeFile } = await import("node:fs/promises");
    const buffer = canvas.toBuffer("image/png");
    await writeFile(OUTPUT, buffer);

    console.log(`\n✅ Assembled character saved to: ${OUTPUT}`);
}

main().catch(err => {
    console.error("Error:", err);
    process.exit(1);
});
