function toCamel(str: string) {
    return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}

export function keysToCamel(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(v => keysToCamel(v));
    } else if (obj !== null && obj.constructor === Object) {
        return Object.fromEntries(
            Object.entries(obj).map(([k, v]) => [toCamel(k), keysToCamel(v)])
        );
    }
    return obj;
} 