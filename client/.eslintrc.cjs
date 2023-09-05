module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "prettier",
        "plugin:prettier/recommended",
        "plugin:tailwindcss/recommended",
    ],
    settings: {
        tailwindcss: {
            config: "tailwind.config.js",
            callees: ["cls", "classnames", "clsx", "ctl"],
            classRegex: "^(class(Name)?|\\w+Style)$",
            cssFiles: "./src/**/*.css",
        },
    },
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parser: "@typescript-eslint/parser",
    plugins: ["react-refresh", "tailwindcss"],
    rules: {
        "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
        "tailwindcss/classnames-order": "warn",
        "tailwindcss/no-custom-classname": "warn",
        "tailwindcss/no-contradicting-classname": "error",
    },
};
