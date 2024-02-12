function id_gen() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const name = [];

    for (let i = 0; i < 16; i++) {
        const num = Math.floor(chars.length * Math.random());
        name.push(chars[num]);
    }

    return name.join('');
}