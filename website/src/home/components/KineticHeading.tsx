import { useMemo } from 'react';

type KineticHeadingProps = {
  text: string;
  active: boolean;
  reducedMotion: boolean;
  className?: string;
  staggerMs?: number;
  startDelayMs?: number;
};

const isLatin = (token: string) => /^[\x00-\x7F]+$/.test(token);

/**
 * Splits a heading into individually animated WORDS (never letters).
 *
 * Per-letter splitting in an RTL container reverses any LTR run inside it —
 * Arabic letters lose their ligatures and English words like "YouSafe" appear
 * as "efaSuoY". Splitting on word boundaries keeps each word as a single
 * bidi-correct unit, so the browser handles RTL ordering correctly while we
 * still get a kinetic stagger effect.
 *
 * Latin words are wrapped with `dir="ltr"` + `unicode-bidi: isolate` so they
 * always render left-to-right even inside an RTL parent.
 */
export const KineticHeading = ({
  text,
  active,
  reducedMotion,
  className,
  staggerMs = 90,
  startDelayMs = 0,
}: KineticHeadingProps) => {
  const tokens = useMemo(() => text.split(/(\s+)/), [text]);

  if (reducedMotion || !active) {
    return <span className={className}>{text}</span>;
  }

  let wordIndex = 0;
  return (
    <span className={className} aria-label={text}>
      {tokens.map((token, tokenIndex) => {
        if (token.length === 0) return null;
        if (/^\s+$/.test(token)) {
          return <span key={`s-${tokenIndex}`}>{token}</span>;
        }
        const delay = startDelayMs + wordIndex * staggerMs;
        wordIndex += 1;
        const latin = isLatin(token);
        return (
          <span
            key={`w-${tokenIndex}`}
            className="kinetic-letter"
            dir={latin ? 'ltr' : undefined}
            style={{
              animationDelay: `${delay}ms`,
              whiteSpace: 'pre',
              unicodeBidi: latin ? 'isolate' : undefined,
            }}
          >
            {token}
          </span>
        );
      })}
    </span>
  );
};
