export function parseFetaureLsit(features) {
    return Array.isArray(features)
        ? (features.length > 0 ? features : [])
        : typeof features === 'string'
            ? (JSON.parse(features).length > 0 ? JSON.parse(features) : [])
            : [];
}