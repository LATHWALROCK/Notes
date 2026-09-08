/*
 * Monochrome line icons. Every icon inherits its colour from `currentColor` and
 * is sized by CSS, so the sidebar controls appearance in one place.
 */
function Svg({ children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/* Java Notes — an open book */
export function BookIcon() {
  return (
    <Svg>
      <path d="M12 6.5S9.5 4 5.5 4A1.5 1.5 0 0 0 4 5.5v11A1.5 1.5 0 0 0 5.5 18c4 0 6.5 2 6.5 2s2.5-2 6.5-2a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 18.5 4C14.5 4 12 6.5 12 6.5z" />
      <path d="M12 6.5V20" />
    </Svg>
  );
}

/* Java Collections Framework — stacked layers */
export function LayersIcon() {
  return (
    <Svg>
      <path d="M12 3 3 7.5l9 4.5 9-4.5L12 3z" />
      <path d="M3 12l9 4.5 9-4.5" />
      <path d="M3 16.5 12 21l9-4.5" />
    </Svg>
  );
}

/* DSA in Java — a binary tree */
export function TreeIcon() {
  return (
    <Svg>
      <circle cx="12" cy="4.5" r="2" />
      <circle cx="6" cy="19.5" r="2" />
      <circle cx="18" cy="19.5" r="2" />
      <path d="M11 6.3 7 17.7M13 6.3l4 11.4" />
    </Svg>
  );
}

/* Rail control — expand the sidebar */
export function PanelExpandIcon() {
  return (
    <Svg>
      <path d="M4 4v16" />
      <path d="M10 12h10" />
      <path d="M16.5 8.5 20 12l-3.5 3.5" />
    </Svg>
  );
}

/* Header control — collapse the sidebar back to the rail */
export function PanelCollapseIcon() {
  return (
    <Svg>
      <path d="M20 4v16" />
      <path d="M14 12H4" />
      <path d="M7.5 8.5 4 12l3.5 3.5" />
    </Svg>
  );
}

/* Grouping levels — rotated by CSS when closed */
export function ChevronDownIcon() {
  return (
    <Svg>
      <path d="M8 10.5l4 4 4-4" />
    </Svg>
  );
}
