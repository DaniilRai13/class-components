import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,  // Подключает глобальные функции тестирования (describe, it, expect)
    environment: 'jsdom', // Эмулирует браузер
    setupFiles: './src/__tests__/setup.ts', // Файл с настройками перед тестами
    coverage: {
      provider: 'istanbul', // Покрытие кода тестами
      include: ['src/**/*.tsx'], // Включить в отчёт только `.tsx` файлы
      exclude: ['**/node_modules/**', '**/*.test.tsx', '**/*.spec.tsx', 'src/__tests__/setup.ts'],
    },
  },
});
