export function movieTimeFormatter(playtime) {
    const hours = Math.floor(playtime / 60);
    const minutes = playtime % 60;

    return `${hours} Hour/s ${minutes} Minute/s`;
}
