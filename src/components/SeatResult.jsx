import { getPartyMembers } from '../lib/search.js';

export default function SeatResult({ guest, partyIndex }) {
  const members = getPartyMembers(guest, partyIndex);

  return (
    <div className="rounded-sm border border-graphite-400/15 bg-white p-10 text-center shadow-soft">
      <p className="font-serif text-xl text-graphite-800">{guest.fullName}</p>

      <div className="mt-6 flex flex-col items-center">
        <span className="text-[11px] uppercase tracking-[0.4em] text-graphite-400">
          you are seated at
        </span>
        <div className="my-4 flex items-center gap-3">
          <span className="h-px w-10 bg-champagne-400" />
          <span className="h-1.5 w-1.5 rotate-45 bg-champagne-400" />
          <span className="h-px w-10 bg-champagne-400" />
        </div>
        <span className="text-[11px] uppercase tracking-[0.5em] text-champagne-500">Table</span>
        <span className="mt-1 font-numerals text-8xl font-normal leading-none text-graphite-800">
          {guest.tableNumber}
        </span>
      </div>

      {members.length > 0 && (
        <div className="mt-10 border-t border-graphite-400/15 pt-6">
          <p className="text-[10px] uppercase tracking-[0.4em] text-graphite-400">
            Seated with you
          </p>
          <ul className="mt-3 space-y-1 font-serif text-lg text-graphite-800">
            {members.map((m) => (
              <li key={`${m.partyId}-${m.fullName}`}>{m.fullName}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
