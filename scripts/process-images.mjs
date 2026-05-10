import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const supportedExtensions = new Set([
  ".avif",
  ".jpeg",
  ".jpg",
  ".png",
  ".tif",
  ".tiff",
  ".webp",
]);

const defaultOptions = {
  input: "image-preprocess",
  output: "public/images",
  quality: 82,
  width: 1800,
};

function parseArgs() {
  const args = process.argv.slice(2);
  const options = { ...defaultOptions };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    const next = args[index + 1];

    if (arg === "--input" && next) {
      options.input = next;
      index += 1;
    } else if (arg === "--output" && next) {
      options.output = next;
      index += 1;
    } else if (arg === "--quality" && next) {
      options.quality = Number.parseInt(next, 10);
      index += 1;
    } else if (arg === "--width" && next) {
      options.width = Number.parseInt(next, 10);
      index += 1;
    }
  }

  return {
    inputDir: path.resolve(process.cwd(), options.input),
    outputDir: path.resolve(process.cwd(), options.output),
    quality: Number.isFinite(options.quality) ? options.quality : defaultOptions.quality,
    width: Number.isFinite(options.width) ? options.width : defaultOptions.width,
  };
}

async function getImageFiles(directory) {
  let entries;

  try {
    entries = await fs.readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.mkdir(directory, { recursive: true });
      return [];
    }

    throw error;
  }

  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return getImageFiles(entryPath);
      }

      if (!entry.isFile() || !supportedExtensions.has(path.extname(entry.name).toLowerCase())) {
        return [];
      }

      return [entryPath];
    })
  );

  return files.flat();
}

async function processImage(filePath, options) {
  const relativePath = path.relative(options.inputDir, filePath);
  const parsedPath = path.parse(relativePath);
  const outputPath = path.join(
    options.outputDir,
    parsedPath.dir,
    `${parsedPath.name}.webp`
  );

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await sharp(filePath)
    .rotate()
    .resize({
      width: options.width,
      withoutEnlargement: true,
    })
    .webp({
      quality: options.quality,
      effort: 6,
    })
    .toFile(outputPath);

  return outputPath;
}

async function main() {
  const options = parseArgs();
  const files = await getImageFiles(options.inputDir);

  if (!files.length) {
    console.log(`No images found in ${path.relative(process.cwd(), options.inputDir)}.`);
    return;
  }

  const outputs = await Promise.all(
    files.map((filePath) => processImage(filePath, options))
  );

  for (const output of outputs) {
    console.log(`Created ${path.relative(process.cwd(), output)}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
