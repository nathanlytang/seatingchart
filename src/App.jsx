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
    <div className="min-h-full bg-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-6 pt-14 pb-16 sm:pt-24">
        <header className="mb-12 text-center">
          <p className="text-[11px] uppercase tracking-[0.45em] text-champagne-500">
            Welcome
          </p>
          <h1 className="mt-4 font-serif text-5xl font-normal text-graphite-800">
            Find your seat
          </h1>
          <div className="mx-auto mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-champagne-400" />
            <span className="h-1.5 w-1.5 rotate-45 bg-champagne-400" />
            <span className="h-px w-12 bg-champagne-400" />
          </div>
          <p className="mt-6 text-sm text-graphite-600">
            Kindly enter your name to find your table.
          </p>
        </header>

        {loading ? (
          <p className="text-center text-sm italic text-graphite-400">Loading guest list…</p>
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
              <div className="mt-8">
                <SeatResult guest={selected} partyIndex={partyIndex} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
