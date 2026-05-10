import fs from "fs";
import path from "path";
import matter from "gray-matter";

const featuredExperiencesDirectory = path.join(
  process.cwd(),
  "content",
  "featured-experiences"
);

export type FeaturedExperienceMeta = {
  slug: string;
  title: string;
  description: string;
  image: string;
  date?: string;
  order?: number;
  tags: string[];
};

export type FeaturedExperience = FeaturedExperienceMeta & {
  content: string;
};

function readMarkdownFiles() {
  if (!fs.existsSync(featuredExperiencesDirectory)) {
    return [];
  }

  return fs
    .readdirSync(featuredExperiencesDirectory)
    .filter((fileName) => fileName.endsWith(".md"));
}

function normalizeDate(value: unknown) {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }

  return undefined;
}

function normalizeTags(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((tag) => String(tag).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
}

function normalizeOrder(value: unknown) {
  const numericValue =
    typeof value === "number" ? value : Number.parseInt(String(value), 10);

  return Number.isFinite(numericValue) ? numericValue : undefined;
}

function excerptFromContent(content: string) {
  return (
    content
      .split(/\r?\n\r?\n/)
      .map((paragraph) => paragraph.replace(/^#+\s*/, "").trim())
      .find(Boolean) ?? ""
  );
}

function getFeaturedExperienceFromFile(fileName: string): FeaturedExperience {
  const slug = fileName.replace(/\.md$/, "");
  const fullPath = path.join(featuredExperiencesDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const title = String(data.title ?? slug).trim();
  const description = String(
    data.description ?? excerptFromContent(content)
  ).trim();

  return {
    slug,
    title,
    description,
    image: String(data.image ?? "/sun_moon_lake.webp").trim(),
    date: normalizeDate(data.date),
    order: normalizeOrder(data.order),
    tags: normalizeTags(data.tags),
    content: content.trim(),
  };
}

export function getFeaturedExperienceSlugs() {
  return readMarkdownFiles().map((fileName) => fileName.replace(/\.md$/, ""));
}

export function getFeaturedExperienceBySlug(slug: string) {
  return getFeaturedExperienceFromFile(`${slug}.md`);
}

export function getAllFeaturedExperiences(): FeaturedExperienceMeta[] {
  return readMarkdownFiles()
    .map(getFeaturedExperienceFromFile)
    .map(({ content, ...meta }) => meta)
    .sort((first, second) => {
      const firstOrder = first.order ?? Number.MAX_SAFE_INTEGER;
      const secondOrder = second.order ?? Number.MAX_SAFE_INTEGER;

      if (firstOrder !== secondOrder) {
        return firstOrder - secondOrder;
      }

      return first.title.localeCompare(second.title);
    });
}
