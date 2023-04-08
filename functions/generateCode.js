module.exports = () => {
    let s = "";
    for (let i = 0; i < 10; i++) {
        let x = i
            ? Math.floor(Math.random() * 10)
            : Math.floor(Math.random()) * 9 + 1;
        s += x.toString();
    }
    console.log(s);
    return s;
};
