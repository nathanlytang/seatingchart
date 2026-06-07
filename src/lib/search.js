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

function normalize(s) {
  return s.toLowerCase().replace(/\s+/g, '');
}

export function getSuggestions(query, guests) {
  if (query.trim().length < MIN_QUERY_LENGTH) return [];
  const q = normalize(query);
  if (q.length === 0) return [];
  const matches = [];
  for (const g of guests) {
    if (normalize(g.fullName).includes(q)) {
      matches.push(g);
      if (matches.length >= MAX_SUGGESTIONS) break;
    }
  }
  return matches;
}
