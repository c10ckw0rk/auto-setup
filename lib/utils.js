module.exports = {
    titleCase: str => {
        return str.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    },
    branchName: str => {
        str = String(str).toLowerCase();
        str = str.replace(/[^A-Z0-9 ]/ig, '');
        return str.replace(/\s+/g, '-');
    }
};
