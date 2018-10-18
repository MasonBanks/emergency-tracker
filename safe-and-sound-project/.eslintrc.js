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
        "prefer-destructuring": "warn",
        "react/no-unused-state": "warn",
        "react/prop-types": "warn",
        "react/destructuring-assignment": "warn",
        "global-require": "warn",
        "max-len": "warn",
        "import/no-unresolved": "warn"

    }
};
