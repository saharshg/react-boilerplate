module.exports = {
    // "parser": "babel-eslint",
    "extends": "airbnb",
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
    },
    "globals": {
        "it": true,
        "fetch": true,
        "navigator": true,
        "window": true,
        "document": true,
        "describe": true,
        "jest": true,
        "expect": true
    },
    "plugins": ["import"]
};