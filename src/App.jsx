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
    <div className="min-h-full bg-slate-50">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pt-8 pb-12 sm:pt-16">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Find your seat</h1>
          <p className="mt-1 text-sm text-slate-500">
            Type your name to find your table.
          </p>
        </header>

        {loading ? (
          <p className="text-sm text-slate-500">Loading guest list…</p>
        ) : error ? (
          <p className="text-sm text-red-600">{error}</p>
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
