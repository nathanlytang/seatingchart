export const MIN_QUERY_LENGTH = 3;
export const MAX_SUGGESTIONS = 5;

export function buildPartyIndex(guests) {
  const map = new Map();
  for (const g of guests) {
    if (!map.has(g.partyId)) map.set(g.partyId, []);
    map.get(g.partyId).push(g);
  }
  return map;
}

export function getPartyMembers(guest, partyIndex) {
  const members = partyIndex.get(guest.partyId) || [];
  return members.filter((m) => m !== guest);
}

export function getSuggestions(query, guests) {
  const q = query.trim().toLowerCase();
  if (q.length < MIN_QUERY_LENGTH) return [];
  const matches = [];
  for (const g of guests) {
    if (g.fullName.toLowerCase().includes(q)) {
      matches.push(g);
      if (matches.length >= MAX_SUGGESTIONS) break;
    }
  }
  return matches;
}
