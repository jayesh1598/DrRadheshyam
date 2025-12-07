import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      // Keep your library aliases clean
      'vaul@1.1.2': 'vaul',
      'sonner@2.0.3': 'sonner',
      'recharts@2.15.2': 'recharts',
      'react-resizable-panels@2.1.7': 'react-resizable-panels',
      'react-hook-form@7.55.0': 'react-hook-form',
      'react-day-picker@8.10.1': 'react-day-picker',
      'next-themes@0.4.6': 'next-themes',
      'lucide-react@0.487.0': 'lucide-react',
      'input-otp@1.4.2': 'input-otp',
      'embla-carousel-react@8.6.0': 'embla-carousel-react',
      'cmdk@1.1.1': 'cmdk',
      'class-variance-authority@0.7.1': 'class-variance-authority',
      
      // Figma assets - Fix: add /assets/ subdirectory
      'figma:asset/fabbcc2ddb4dcba8f9559b2c9e3586bccec643a7.png': path.resolve(__dirname, './src/assets/fabbcc2ddb4dcba8f9559b2c9e3586bccec643a7.png'),
      'figma:asset/f84c696c6e55bb2f8b05dddc10bd4f496c3dbfa4.png': path.resolve(__dirname, './src/assets/f84c696c6e55bb2f8b05dddc10bd4f496c3dbfa4.png'),
      'figma:asset/f46cf8132aa06ba90a78f10bf40f233920a66b60.png': path.resolve(__dirname, './src/assets/f46cf8132aa06ba90a78f10bf40f233920a66b60.png'),
      'figma:asset/e4919ab478ae10e52c6ae5877047f88b58f5dabe.png': path.resolve(__dirname, './src/assets/e4919ab478ae10e52c6ae5877047f88b58f5dabe.png'),
      'figma:asset/ca6c720a8effcb157096c63f651968dc671144d9.png': path.resolve(__dirname, './src/assets/ca6c720a8effcb157096c63f651968dc671144d9.png'),
      'figma:asset/c39f91be012f28a930d59ddfef67b01fed26e05d.png': path.resolve(__dirname, './src/assets/c39f91be012f28a930d59ddfef67b01fed26e05d.png'),
      'figma:asset/b74248734c89fc30b177ddd12a3139cc100e35e2.png': path.resolve(__dirname, './src/assets/b74248734c89fc30b177ddd12a3139cc100e35e2.png'),
      'figma:asset/a576c49936a9762fc3ce642d8fd4ef5eb0da7a1e.png': path.resolve(__dirname, './src/assets/a576c49936a9762fc3ce642d8fd4ef5eb0da7a1e.png'),
      'figma:asset/768c2fb46ec73b2e8f9e326258c66a621e4f53da.png': path.resolve(__dirname, './src/assets/768c2fb46ec73b2e8f9e326258c66a621e4f53da.png'),
      'figma:asset/74c5306cf08d2dc570125917f167e65b2a0cbf96.png': path.resolve(__dirname, './src/assets/74c5306cf08d2dc570125917f167e65b2a0cbf96.png'),
      'figma:asset/6f0b4657432398977b1ff8e63e88fdd6c82d2b0a.png': path.resolve(__dirname, './src/assets/6f0b4657432398977b1ff8e63e88fdd6c82d2b0a.png'),
      'figma:asset/65aeb3f625463161c87c547aab331a9ab4a5d82e.png': path.resolve(__dirname, './src/assets/65aeb3f625463161c87c547aab331a9ab4a5d82e.png'),
      'figma:asset/4b7df9ec1760a04b6038212f3aefebeaa831d329.png': path.resolve(__dirname, './src/assets/4b7df9ec1760a04b6038212f3aefebeaa831d329.png'),
      'figma:asset/2e59774886a10ef6a8eff35dc67de97be1d2f53f.png': path.resolve(__dirname, './src/assets/2e59774886a10ef6a8eff35dc67de97be1d2f53f.png'),
      'figma:asset/266f83345b5407372661358259f08602f9877410.png': path.resolve(__dirname, './src/assets/266f83345b5407372661358259f08602f9877410.png'),
      'figma:asset/0c25104b46225be8f6c90058d814171b8b129dab.png': path.resolve(__dirname, './src/assets/0c25104b46225be8f6c90058d814171b8b129dab.png'),
      'figma:asset/00eb846c080a6aa0484c904a5f5228a8105e5f0a.png': path.resolve(__dirname, './src/assets/00eb846c080a6aa0484c904a5f5228a8105e5f0a.png'),
            
      // Radix UI aliases (kept as-is)
      '@radix-ui/react-tooltip@1.1.8': '@radix-ui/react-tooltip',
      '@radix-ui/react-toggle@1.1.2': '@radix-ui/react-toggle',
      '@radix-ui/react-toggle-group@1.1.2': '@radix-ui/react-toggle-group',
      '@radix-ui/react-tabs@1.1.3': '@radix-ui/react-tabs',
      '@radix-ui/react-switch@1.1.3': '@radix-ui/react-switch',
      '@radix-ui/react-slot@1.1.2': '@radix-ui/react-slot',
      '@radix-ui/react-slider@1.2.3': '@radix-ui/react-slider',
      '@radix-ui/react-separator@1.1.2': '@radix-ui/react-separator',
      '@radix-ui/react-select@2.1.6': '@radix-ui/react-select',
      '@radix-ui/react-scroll-area@1.2.3': '@radix-ui/react-scroll-area',
      '@radix-ui/react-radio-group@1.2.3': '@radix-ui/react-radio-group',
      '@radix-ui/react-progress@1.1.2': '@radix-ui/react-progress',
      '@radix-ui/react-popover@1.1.6': '@radix-ui/react-popover',
      '@radix-ui/react-navigation-menu@1.2.5': '@radix-ui/react-navigation-menu',
      '@radix-ui/react-menubar@1.1.6': '@radix-ui/react-menubar',
      '@radix-ui/react-label@2.1.2': '@radix-ui/react-label',
      '@radix-ui/react-hover-card@1.1.6': '@radix-ui/react-hover-card',
      '@radix-ui/react-dropdown-menu@2.1.6': '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-dialog@1.1.6': '@radix-ui/react-dialog',
      '@radix-ui/react-context-menu@2.2.6': '@radix-ui/react-context-menu',
      '@radix-ui/react-collapsible@1.1.3': '@radix-ui/react-collapsible',
      '@radix-ui/react-checkbox@1.1.4': '@radix-ui/react-checkbox',
      '@radix-ui/react-avatar@1.1.3': '@radix-ui/react-avatar',
      '@radix-ui/react-aspect-ratio@1.1.2': '@radix-ui/react-aspect-ratio',
      '@radix-ui/react-alert-dialog@1.1.6': '@radix-ui/react-alert-dialog',
      '@radix-ui/react-accordion@1.2.3': '@radix-ui/react-accordion',
      '@jsr/supabase__supabase-js@2.49.8': '@jsr/supabase__supabase-js',
      
      // Main alias for src folder
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
  },
  server: {
    port: 3000,
    open: true,
  },
});
