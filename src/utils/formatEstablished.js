export function formatEstablished(raw) {
    if (!raw) return null;
    if (String(raw).includes(",")) return String(raw);

    const parts = String(raw).trim().split("-");
    if (parts.length !== 3) return String(raw);

    const [yyyy, mon, ddRaw] = parts;
    const dd = String(ddRaw ?? "").padStart(2, "0");

    return `${mon} ${dd}, ${yyyy}`;
}
