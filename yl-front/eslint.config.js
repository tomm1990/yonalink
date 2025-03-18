import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      sourceType: "module",
      ecmaVersion: "latest"
    },
    plugins: {
      "@typescript-eslint": ts,
      "react": react,
      "react-hooks": reactHooks,
      "import": importPlugin,
      "jsx-a11y": jsxA11y
    },
    settings: {
      react: {
        version: "detect" // Automatically detect React version
      }
    },
    rules: {
      // TypeScript rules
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",

      // React rules
      "react/jsx-uses-react": "off", // Not needed in React 17+
      "react/react-in-jsx-scope": "off", // Not needed in React 17+
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Import rules
      "import/order": ["warn", { "groups": ["builtin", "external", "internal"] }],
      "import/no-unresolved": "off",

      // Accessibility rules
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn"
    }
  }
];
