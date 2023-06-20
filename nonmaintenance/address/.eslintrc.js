module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        sourceType: "module",
        ecmaVersion: 2020,
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ["@typescript-eslint"],
    rules: {
        indent: ["error", 4],
        quotes: ["error", "single"],
        semi: ["error", "always"],
        "@typescript-eslint/no-unused-vars": ["off"],
        "@typescript-eslint/explicit-function-return-type": ["off"],
        "@typescript-eslint/no-explicit-any": ["off"],
        "no-console": "off",
        "max-classes-per-file": ["error", 2],
        "space-before-function-paren": [
            "error",
            {
                anonymous: "always",
                named: "always",
                asyncArrow: "always",
            },
        ],
    },
};
