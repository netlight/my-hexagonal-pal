import love from "eslint-config-love";
import prettier from "eslint-config-prettier";

export default [
  // Apply to TypeScript and JavaScript files
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    ...love,
  },

  // Prettier integration (disables conflicting rules)
  prettier,

  // Custom rules and overrides
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    rules: {
      "@typescript-eslint/no-non-null-assertion": "warn", // Only warn on non-null assertions
      "@typescript-eslint/max-params": ["warn", { max: 4 }], // Warn on too many constructor/function parameters
      "@typescript-eslint/no-magic-numbers": [
        "warn",
        {
          ignore: [0], // Common numbers that are OK
          ignoreArrayIndexes: true,
          ignoreDefaultValues: true,
          ignoreClassFieldInitialValues: true,
          ignoreNumericLiteralTypes: true,
          ignoreReadonlyClassProperties: true,
          ignoreEnums: true,
          ignoreTypeIndexes: true,
        },
      ],
      "@typescript-eslint/no-unnecessary-condition": "warn",
      "@typescript-eslint/no-unsafe-type-assertion": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
      "@typescript-eslint/prefer-nullish-coalescing": "warn",
      "logical-assignment-operators": "warn",

      // Unsafe assignments are ok for this exercise
      "@typescript-eslint/no-unsafe-assignment": "off",

      // Allow console.log in development
      "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",

      // Node.js specific adjustments
      "@typescript-eslint/no-var-requires": "off", // Allow require() in config files

      // Promise handling (common in Express apps)
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            arguments: false, // Allow async functions as Express middleware
            attributes: false,
          },
        },
      ],
    },
  },

  // Configuration files (less strict)
  {
    files: ["*.config.{js,mjs,cjs,ts}", "*.{js,mjs,cjs}"],
    rules: {
      "@typescript-eslint/no-var-requires": "off",
      "import/no-default-export": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },

  // Test files (if you have them)
  {
    files: ["**/*.{test,spec}.{js,ts,tsx}", "**/__tests__/**/*.{js,ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "no-console": "off",
    },
  },

  // Ignore patterns
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
      ".pnpm-store/**",
      "coverage/**",
      "*.min.js",
    ],
  },
];
