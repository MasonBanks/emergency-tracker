module.exports = {
    "env": {
        "jest": true,
        "es6": true
    },
    "parser": "babel-eslint",
    "extends": "universe/native",
    "extends": "airbnb",
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "no-undef": "off",
        "prefer-destructuring": "off"
    }
};
