// Minimal CSV parser. Assumes no embedded commas/quotes in fields.
export function parseCsv(text) {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length === 0) return [];

  const header = lines[0].split(',').map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const cols = line.split(',').map((c) => c.trim());
    const row = {};
    header.forEach((key, i) => {
      row[key] = cols[i] ?? '';
    });
    return row;
  });
}

export function loadGuests(rows) {
  return rows.map((r) => ({
    fullName: r.full_name,
    partyId: r.party_id,
    tableNumber: r.table_number,
  }));
}
