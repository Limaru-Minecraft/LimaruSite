import { useState } from "react";

export const SERVER_ADDRESS = "play.limaru.net";
export const SERVER_VERSIONS = ["1.12.2 - 26.x", "Native 1.21.10"];

type ServerAddressButtonProps = {
  className?: string;
};

export default function ServerAddressButton({
  className = "",
}: ServerAddressButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  function copyAddress() {
    navigator.clipboard.writeText(SERVER_ADDRESS);
    setIsCopied(true);
    window.setTimeout(() => setIsCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={copyAddress}
      className={`grid w-full max-w-xl grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 rounded-md border-4 border-stone-300 bg-stone-800 px-4 py-3 text-left font-semibold text-white shadow-yellow-400 hover:border-yellow-400 hover:shadow-xl focus:outline-none focus:ring-2 sm:inline-grid sm:w-auto ${className}`}
      title="Click to copy server address"
      aria-label={`Copy server address ${SERVER_ADDRESS}`}
    >
      <span className="min-w-0 sm:flex sm:items-center sm:gap-x-3">
        <code className="block break-all text-lg sm:inline sm:break-normal md:text-xl">
          {SERVER_ADDRESS}
        </code>
        <span className="mt-2 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide text-yellow-200 sm:mt-0">
          {SERVER_VERSIONS.map((version) => (
            <span
              key={version}
              className="rounded bg-white/10 px-2 py-1 normal-case tracking-normal"
            >
              {version}
            </span>
          ))}
        </span>
      </span>
      <span
        className="material-symbols-rounded flex h-8 w-8 items-center justify-center text-3xl leading-none"
        aria-hidden="true"
      >
        content_copy
      </span>
      {isCopied ? <span className="col-span-2 text-sm">Copied!</span> : null}
    </button>
  );
}
