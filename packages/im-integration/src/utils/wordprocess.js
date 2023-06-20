function getInitial(word) {
    if (word) {
        return word.substr(0, 1);
    } else {
        return '空';
    }
}

export {
    getInitial,
};
