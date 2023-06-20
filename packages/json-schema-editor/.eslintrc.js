module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "sourceType": "module"
    },
    "plugins": ["@typescript-eslint"],
    "rules": {
        "linebreak-style": [
            "error",
            "unix"
        ],
        "no-console": "off",
        "max-classes-per-file": ["error", 2],
    }
};
