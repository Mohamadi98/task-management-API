const { v4: uuidv4 } = require('uuid');

const uuidGenerator =  () => {
    return uuidv4().slice(0, 5);
}

module.exports = uuidGenerator