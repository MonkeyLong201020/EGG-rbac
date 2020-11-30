const dateFormat = require('dateformat');

module.exports = {
    dateFormat(timestap) {
        return dateFormat(new Date(timestap), 'yyyy-mm-dd');
    }
};