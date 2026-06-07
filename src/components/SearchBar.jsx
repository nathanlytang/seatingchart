import { useState, useRef, useEffect } from 'react';
import { getSuggestions, getPartyMembers, MIN_QUERY_LENGTH } from '../lib/search.js';

function partyHint(guest, partyIndex) {
  const members = getPartyMembers(guest, partyIndex);
  if (members.length === 0) return 'party of 1';
  return 'with ' + members.map((m) => m.fullName).join(', ');
}

export default function SearchBar({ guests, partyIndex, onSelect }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const suggestions = getSuggestions(query, guests);
  const showSuggestions = open && query.trim().length >= MIN_QUERY_LENGTH;

  useEffect(() => {
    function onClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  function handleSelect(guest) {
    setQuery(guest.fullName);
    setOpen(false);
    onSelect(guest);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (suggestions.length > 0) handleSelect(suggestions[0]);
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Enter your name"
          autoFocus
          className="w-full border-0 border-b border-graphite-400/40 bg-transparent px-1 py-3 text-center text-lg tracking-wide text-graphite-800 placeholder:font-serif placeholder:italic placeholder:text-graphite-400 focus:border-champagne-400 focus:outline-none focus:ring-0"
        />
      </form>

      {showSuggestions && (
        <ul className="absolute left-0 right-0 z-10 mt-3 overflow-hidden rounded-sm border border-graphite-400/15 bg-white shadow-soft">
          {suggestions.length === 0 ? (
            <li className="px-5 py-4 text-center text-sm italic text-graphite-400">No matches</li>
          ) : (
            suggestions.map((g) => (
              <li key={`${g.partyId}-${g.fullName}`}>
                <button
                  type="button"
                  onClick={() => handleSelect(g)}
                  className="flex w-full flex-col items-start gap-0.5 border-b border-graphite-400/10 px-5 py-3 text-left last:border-0 transition-colors hover:bg-bone active:bg-champagne-200/40"
                >
                  <span className="font-serif text-lg text-graphite-800">{g.fullName}</span>
                  <span className="text-xs italic text-graphite-400">{partyHint(g, partyIndex)}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
