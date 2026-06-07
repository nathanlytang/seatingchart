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
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
      </form>

      {showSuggestions && (
        <ul className="absolute left-0 right-0 z-10 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
          {suggestions.length === 0 ? (
            <li className="px-4 py-3 text-sm text-slate-500">No matches</li>
          ) : (
            suggestions.map((g) => (
              <li key={`${g.partyId}-${g.fullName}`}>
                <button
                  type="button"
                  onClick={() => handleSelect(g)}
                  className="flex w-full flex-col items-start gap-0.5 px-4 py-3 text-left hover:bg-indigo-50 active:bg-indigo-100"
                >
                  <span className="font-medium text-slate-900">{g.fullName}</span>
                  <span className="text-xs text-slate-500">{partyHint(g, partyIndex)}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
