// Lucide-react no longer ships brand marks, so these four are hand-rolled
// minimal SVGs kept visually consistent with the lucide stroke style.

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M7.5 10v6.5M7.5 7.2v.03M11 16.5V13c0-1.4.9-2.3 2-2.3s2 .9 2 2.3v3.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M14 4v9.2a2.9 2.9 0 1 1-2.4-2.85"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 4c.35 2.1 1.9 3.6 4 3.85"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M6.5 17.5 4 20l2.6-.7A8 8 0 1 0 4.5 15z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9 9.7c0 3.4 2.9 6.3 6.3 6.3.5 0 .9-.4.9-1v-1l-2-.6-.7 1a5 5 0 0 1-3-3l1-.7-.6-2h-1c-.6 0-.9.4-.9 1z"
        fill="currentColor"
      />
    </svg>
  );
}
