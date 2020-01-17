module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        // https://github.com/typescript-eslint/typescript-eslint/issues/864
        createDefaultProgram: true
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/require-await": ["error" ],
        "object-curly-spacing": ["error", "always"],
        "indent": ["error", 2],
        "@typescript-eslint/array-type": ["error"],
        "@typescript-eslint/type-annotation-spacing": ["error"],
        //"@typescript-eslint/no-explicit-any":["error"],
       // "@typescript-eslint/typedef":["error"],
        "@typescript-eslint/no-untyped-public-signature": ["error", { "ignoredMethods": ["ignoredMethodName"] }]
    },
};