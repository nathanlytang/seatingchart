import { getPartyMembers } from '../lib/search.js';

export default function SeatResult({ guest, partyIndex }) {
  const members = getPartyMembers(guest, partyIndex);

  return (
    <div className="rounded-3xl border border-blush-100 bg-white/90 p-8 text-center shadow-soft">
      <p className="text-xs uppercase tracking-[0.3em] text-sage-600">{guest.fullName}</p>

      <div className="mt-6 flex flex-col items-center">
        <span className="font-serif text-sm italic text-sage-700">you are seated at</span>
        <div className="my-3 flex items-center gap-3 text-blush-400">
          <span className="h-px w-8 bg-blush-200" />
          <span className="text-xs">✿</span>
          <span className="h-px w-8 bg-blush-200" />
        </div>
        <span className="font-serif text-xs uppercase tracking-[0.4em] text-sage-700">Table</span>
        <span className="font-numerals text-7xl font-medium text-blush-500">
          {guest.tableNumber}
        </span>
      </div>

      {members.length > 0 && (
        <div className="mt-8 border-t border-blush-100 pt-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-sage-600">
            Seated with you
          </p>
          <ul className="mt-3 space-y-1 font-serif text-lg text-ink">
            {members.map((m) => (
              <li key={`${m.partyId}-${m.fullName}`}>{m.fullName}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
