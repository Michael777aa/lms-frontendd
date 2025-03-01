import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "react-hooks/rules-of-hooks": "off",

      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-unused-expressions": "off",
      "react-hooks/exhaustive-deps": "off", // Disable missing dependency warnings in useEffect
      "react/jsx-key": "off", // Disable missing `key` prop for iterator warnings
      "@next/next/no-img-element": "off", // Disable image optimization warnings
      "jsx-a11y/role-supports-aria-props": "off", // Disable accessibility warnings
    },
  },
];

export default eslintConfig;
