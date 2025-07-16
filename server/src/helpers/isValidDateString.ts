// Helper to check for valid YYYY-MM-DD date
function isValidDateString(dateStr: string): boolean {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return false;
    const [year, month, day] = dateStr.split('-').map(Number);
    return (
        date.getUTCFullYear() === year &&
        date.getUTCMonth() + 1 === month &&
        date.getUTCDate() === day
    );
}

export default isValidDateString;