export const buildParams = (param, values) => (
    values.map(k => encodeURIComponent(param) + "=" + encodeURIComponent(k) ).join("&")
)