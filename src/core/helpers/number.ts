export const THOUSAND_SEPARATOR = ",";

export const DECIMAL_SEPARATOR = ".";

export function formatNumber(x: number | string): string | null {
  const isNumber: boolean = typeof x === "number";
  if (isNumber) {
    const parts: string[] = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, THOUSAND_SEPARATOR);
    return parts.join(DECIMAL_SEPARATOR);
  }
  if (x) {
    return x.toString();
  }
  return null;
}

export function parseNumber(formattedNumber: string): number | null {
  const parts: string[] = formattedNumber.split(DECIMAL_SEPARATOR, 2);
  parts[0] = parts[0].split(THOUSAND_SEPARATOR).join("");
  let result: number;
  if (parts.length === 1) {
    result = parseInt(parts[0], 10);
  } else {
    result = parseFloat(parts.join("."));
  }
  if (Number.isNaN(result)) {
    return null;
  }
  return result;
}
