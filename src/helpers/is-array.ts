

export default function isArray(value: any) {
    return !!(value && 
              value.forEach && 
              value.map);
}