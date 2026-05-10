import Head from "@/components/Head";
import PageLayout from "@/components/PageLayout";
import SectionBox from "@/components/SectionBox";
import Heading from "@/components/LayoutComponents/Heading";
import Image from "next/image";
import { type KeyboardEvent, useId, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const initialBody = `## Overview

Write the main story, route, activity, or place description here.

## What to Look For

- Add a highlight
- Add another highlight
- Link to related pages when helpful
`;

function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "featured-experience"
  );
}

function quoteYaml(value: string) {
  return JSON.stringify(value);
}

function tagListFromInput(value: string) {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

type MarkdownHistoryEntry = {
  previousBody: string;
  nextBody: string;
  selectionStart: number;
  selectionEnd: number;
};

function ToolbarButton({
  iconClass,
  label,
  onClick,
  disabled = false,
}: {
  iconClass: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-800 hover:bg-yellow-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
      aria-label={label}
      title={label}
      disabled={disabled}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
    >
      <i className={iconClass} aria-hidden="true" />
    </button>
  );
}

function InfoTooltip({ text }: { text: string }) {
  const tooltipId = useId();

  return (
    <span className="group relative inline-flex">
      <button
        type="button"
        className="flex h-5 w-5 items-center justify-center rounded-full text-sm text-gray-500 hover:text-lime-800 focus:text-lime-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        aria-label="More information"
        aria-describedby={tooltipId}
      >
        <i className="fa-solid fa-circle-info" aria-hidden="true" />
      </button>
      <span
        id={tooltipId}
        role="tooltip"
        className="pointer-events-none absolute left-0 top-full z-20 mt-2 hidden w-64 rounded-md bg-gray-950 px-3 py-2 text-sm font-normal leading-5 text-white shadow-lg group-hover:block group-focus-within:block sm:left-1/2 sm:-translate-x-1/2"
      >
        {text}
      </span>
    </span>
  );
}

export default function ArticleWriter() {
  const [title, setTitle] = useState("New Featured Experience");
  const [slug, setSlug] = useState("new-featured-experience");
  const [description, setDescription] = useState(
    "A short summary that appears on Featured Experiences cards."
  );
  const [image, setImage] = useState("/sun_moon_lake.webp");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [order, setOrder] = useState("");
  const [tags, setTags] = useState("Scenic, Exploration");
  const [body, setBody] = useState(initialBody);
  const [markdownHistory, setMarkdownHistory] = useState<MarkdownHistoryEntry[]>(
    []
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const safeSlug = slugify(slug || title);
  const previewImage = image.trim().startsWith("/") ? image.trim() : "";
  const tagList = useMemo(() => tagListFromInput(tags), [tags]);
  const lastToolbarEdit = markdownHistory[markdownHistory.length - 1];
  const canUndoToolbarEdit = Boolean(lastToolbarEdit && body === lastToolbarEdit.nextBody);

  const markdownFile = useMemo(() => {
    const frontmatter = [
      "---",
      `title: ${quoteYaml(title)}`,
      `description: ${quoteYaml(description)}`,
      `image: ${quoteYaml(image)}`,
      date ? `date: ${quoteYaml(date)}` : "",
      order ? `order: ${Number.parseInt(order, 10) || 0}` : "",
      tagList.length ? "tags:" : "tags: []",
      ...tagList.map((tag) => `  - ${quoteYaml(tag)}`),
      "---",
    ].filter(Boolean);

    return `${frontmatter.join("\n")}\n\n${body.trim()}\n`;
  }, [body, date, description, image, order, tagList, title]);

  function insertMarkdown(before: string, after = "", placeholder = "text") {
    const textarea = textareaRef.current;

    if (!textarea) {
      setBody((currentBody) => `${currentBody}${before}${placeholder}${after}`);
      return;
    }

    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;
    const selectedText =
      textarea.value.slice(selectionStart, selectionEnd) || placeholder;
    const replacement = `${before}${selectedText}${after}`;
    const previousBody = textarea.value;
    const nextBody = `${previousBody.slice(0, selectionStart)}${replacement}${previousBody.slice(selectionEnd)}`;
    const nextCursor = selectionStart + before.length + selectedText.length;

    setMarkdownHistory((currentHistory) => [
      ...currentHistory.slice(-19),
      { previousBody, nextBody, selectionStart, selectionEnd },
    ]);
    setBody(nextBody);
    window.requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(nextCursor, nextCursor);
    });
  }

  function undoToolbarEdit() {
    const textarea = textareaRef.current;
    const lastEdit = markdownHistory[markdownHistory.length - 1];

    if (!lastEdit || body !== lastEdit.nextBody) {
      return false;
    }

    setMarkdownHistory((currentHistory) => currentHistory.slice(0, -1));
    setBody(lastEdit.previousBody);
    window.requestAnimationFrame(() => {
      textarea?.focus();
      textarea?.setSelectionRange(lastEdit.selectionStart, lastEdit.selectionEnd);
    });

    return true;
  }

  function handleMarkdownKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    const isUndoShortcut =
      (event.ctrlKey || event.metaKey) &&
      !event.shiftKey &&
      event.key.toLowerCase() === "z";

    if (isUndoShortcut && undoToolbarEdit()) {
      event.preventDefault();
    }
  }

  function downloadMarkdown() {
    const blob = new Blob([markdownFile], {
      type: "text/markdown;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${safeSlug}.md`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <Head
        title="Article Writer | Limaru"
        description="Write and download Markdown articles for the Limaru website."
        author="YJJcoolcool"
        keywords="limaru, markdown, article writer"
      />
      <PageLayout title="Article Writer">
        <SectionBox>
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(24rem,0.9fr)] xl:items-start">
            <div className="rounded-md border border-gray-200 bg-white p-5 shadow-sm md:p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 font-bold text-gray-900">
                  Title
                  <input
                    className="rounded-md border border-gray-300 px-3 py-2 font-normal"
                    value={title}
                    onChange={(event) => {
                      setTitle(event.target.value);
                      setSlug(slugify(event.target.value));
                    }}
                  />
                </label>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="article-slug"
                      className="font-bold text-gray-900"
                    >
                      Slug
                    </label>
                    <InfoTooltip text="The slug is the URL and file-name friendly version of the title, such as sun-moon-lake. It becomes the article path and downloaded Markdown filename." />
                  </div>
                  <input
                    id="article-slug"
                    className="rounded-md border border-gray-300 px-3 py-2 font-normal"
                    value={slug}
                    onChange={(event) => setSlug(event.target.value)}
                  />
                </div>
                <label className="grid gap-2 font-bold text-gray-900 md:col-span-2">
                  Summary
                  <textarea
                    className="min-h-24 rounded-md border border-gray-300 px-3 py-2 font-normal"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </label>
                <label className="grid gap-2 font-bold text-gray-900">
                  Cover Image Path
                  <input
                    className="rounded-md border border-gray-300 px-3 py-2 font-normal"
                    value={image}
                    onChange={(event) => setImage(event.target.value)}
                  />
                </label>
                <label className="grid gap-2 font-bold text-gray-900">
                  Tags
                  <input
                    className="rounded-md border border-gray-300 px-3 py-2 font-normal"
                    value={tags}
                    onChange={(event) => setTags(event.target.value)}
                  />
                </label>
                <label className="grid gap-2 font-bold text-gray-900">
                  Date
                  <input
                    className="rounded-md border border-gray-300 px-3 py-2 font-normal"
                    type="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                  />
                </label>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="article-order"
                      className="font-bold text-gray-900"
                    >
                      Display Order
                    </label>
                    <InfoTooltip text="Controls where the article appears in Featured Experiences. Lower numbers appear first; leave it blank to sort after ordered articles." />
                  </div>
                  <input
                    id="article-order"
                    className="rounded-md border border-gray-300 px-3 py-2 font-normal"
                    inputMode="numeric"
                    value={order}
                    onChange={(event) => setOrder(event.target.value)}
                  />
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <Heading level={2}>Markdown</Heading>
                  <div className="flex flex-wrap gap-2">
                    <ToolbarButton
                      iconClass="fa-solid fa-rotate-left"
                      label="Undo Formatting"
                      disabled={!canUndoToolbarEdit}
                      onClick={undoToolbarEdit}
                    />
                    <ToolbarButton
                      iconClass="fa-solid fa-heading"
                      label="Heading"
                      onClick={() => insertMarkdown("## ", "", "Heading")}
                    />
                    <ToolbarButton
                      iconClass="fa-solid fa-bold"
                      label="Bold"
                      onClick={() => insertMarkdown("**", "**")}
                    />
                    <ToolbarButton
                      iconClass="fa-solid fa-italic"
                      label="Italic"
                      onClick={() => insertMarkdown("*", "*")}
                    />
                    <ToolbarButton
                      iconClass="fa-solid fa-list-ul"
                      label="Bulleted List"
                      onClick={() => insertMarkdown("\n- ", "", "List item")}
                    />
                    <ToolbarButton
                      iconClass="fa-solid fa-link"
                      label="Link"
                      onClick={() =>
                        insertMarkdown("[", "](https://example.com)", "Link text")
                      }
                    />
                    <ToolbarButton
                      iconClass="fa-solid fa-image"
                      label="Image"
                      onClick={() =>
                        insertMarkdown("![", "](/image-name.webp)", "Alt text")
                      }
                    />
                  </div>
                </div>
                <textarea
                  ref={textareaRef}
                  aria-label="Markdown content"
                  className="min-h-[30rem] w-full rounded-md border border-gray-300 px-4 py-3 font-mono text-sm leading-6"
                  value={body}
                  onChange={(event) => setBody(event.target.value)}
                  onKeyDown={handleMarkdownKeyDown}
                />
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <p className="font-mono text-sm text-gray-700">
                  content/featured-experiences/{safeSlug}.md
                </p>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-md bg-lime-700 px-4 py-2 font-bold text-white hover:bg-lime-800"
                  onClick={downloadMarkdown}
                >
                  Download Markdown
                  <i className="fa-solid fa-download" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="rounded-md border border-gray-200 bg-white shadow-sm">
              {previewImage ? (
                <Image
                  className="h-64 w-full rounded-t-md object-cover"
                  src={previewImage}
                  width={900}
                  height={540}
                  alt=""
                />
              ) : null}
              <div className="p-5 md:p-6">
                <Heading level={2}>{title || "Untitled Article"}</Heading>
                <p className="text-lg text-gray-700">{description}</p>
                {tagList.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tagList.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-lime-100 px-2 py-1 text-sm font-bold text-lime-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
                <div className="limaru-markdown mt-8">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {body}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </SectionBox>
      </PageLayout>
    </>
  );
}
