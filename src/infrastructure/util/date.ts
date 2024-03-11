/**
 * Parses an ISO-8601 date string into a JS Date object
 * @param isoString The date string to be parsed
 */
export const toDate = (isoString?: string): Date | undefined => {
  if (isoString !== null && isoString !== undefined) {
    return new Date(isoString);
  }
};

/**
 * Translates a JS Date into an ISO date string
 * E.g. 2023-04-01T10:01:57Z => 2023-04-01
 * @param date The date to be written in ISO date format
 */
export const toIsoDate = (date?: Date): string | undefined => {
  if (date !== null && date !== undefined) {
    const isoDateTime = date.toISOString();
    return isoDateTime.substring(0, isoDateTime.indexOf("T"));
  }
};
