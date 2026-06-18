export default function ignoreCase(data) {
    if (!data)
        return {};
    const newData = {};
    Object.entries(data).forEach(([key, value]) => {
        newData[key.toLowerCase()] = JSON.parse(JSON.stringify(value));
    });
    return newData;
}
