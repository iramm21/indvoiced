import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Ignore patterns go here
  {},

  // Then extend the existing compat config
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
];

export default eslintConfig;
