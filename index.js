module.exports = {
    "extends": "airbnb",

    "env": {
        "browser": false,
        "node": true,
        "mocha": true
    },

    "rules": {
        "strict": [2, "global"],
        "indent": [2, 4],
        "max-len": [2, 80, 4],
        "quotes": 0,
        "semi": [2, "always"],
        "curly": 0,
        "space-before-function-paren": [2, {"anonymous": "always",
                                            "named": "never"}],
        "comma-dangle": 0,
        "camelcase": [2, {"properties": "always"}],
        "id-length": 0,
        "no-shadow": 0,
        "valid-jsdoc": 1,
        "eol-last": 2
    }
}
