import { getPartyMembers } from '../lib/search.js';

export default function SeatResult({ guest, partyIndex }) {
  const members = getPartyMembers(guest, partyIndex);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm uppercase tracking-wide text-slate-500">{guest.fullName}</p>
      <div className="mt-3 flex items-baseline gap-3">
        <span className="text-sm font-medium text-slate-500">Table</span>
        <span className="text-5xl font-bold tracking-tight text-indigo-600">
          {guest.tableNumber}
        </span>
      </div>

      {members.length > 0 && (
        <div className="mt-6 border-t border-slate-100 pt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Seated with you
          </p>
          <ul className="mt-2 space-y-1">
            {members.map((m) => (
              <li key={`${m.partyId}-${m.fullName}`} className="text-slate-800">
                {m.fullName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
