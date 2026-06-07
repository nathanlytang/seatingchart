import { useEffect, useMemo, useState } from 'react';
import SearchBar from './components/SearchBar.jsx';
import SeatResult from './components/SeatResult.jsx';
import { parseCsv, loadGuests } from './lib/csv.js';
import { buildPartyIndex } from './lib/search.js';

export default function App() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch('/chart.csv')
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load chart.csv (${res.status})`);
        return res.text();
      })
      .then((text) => {
        setGuests(loadGuests(parseCsv(text)));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const partyIndex = useMemo(() => buildPartyIndex(guests), [guests]);

  return (
    <div className="min-h-full bg-cream-50">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-6 pt-12 pb-16 sm:pt-20">
        <header className="mb-10 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-sage-600">Welcome</p>
          <h1 className="mt-3 font-serif text-5xl font-medium italic text-ink">
            Find your seat
          </h1>
          <div className="mx-auto mt-5 flex items-center justify-center gap-3 text-blush-400">
            <span className="h-px w-10 bg-blush-200" />
            <span className="text-base">❧</span>
            <span className="h-px w-10 bg-blush-200" />
          </div>
          <p className="mt-5 text-sm text-sage-700">
            Kindly enter your name to find your table.
          </p>
        </header>

        {loading ? (
          <p className="text-center text-sm italic text-sage-600">Loading guest list…</p>
        ) : error ? (
          <p className="text-center text-sm text-blush-600">{error}</p>
        ) : (
          <>
            <SearchBar
              guests={guests}
              partyIndex={partyIndex}
              onSelect={setSelected}
            />
            {selected && (
              <div className="mt-6">
                <SeatResult guest={selected} partyIndex={partyIndex} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
