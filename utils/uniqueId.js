let uniqueId = 0;
export default function(prefix='id') {
    uniqueId++;
    return `${prefix}${uniqueId}`;
}