const { v4  }  = require('uuid')

function generalID() {
    return v4()
}

module.exports = {
    generalID
}