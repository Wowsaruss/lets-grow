function toCamel(str: string) {
    return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}

function toSnake(str: string) {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase();
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

export function keysToSnake(obj: any): any {
    if (Array.isArray(obj)) {
        return obj.map(v => keysToSnake(v));
    } else if (obj !== null && obj.constructor === Object) {
        return Object.fromEntries(
            Object.entries(obj).map(([k, v]) => [toSnake(k), keysToSnake(v)])
        );
    }
    return obj;
} 