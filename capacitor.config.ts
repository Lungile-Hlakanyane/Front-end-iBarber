import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'iBarber',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,  // duration in milliseconds
      launchAutoHide: true,
      backgroundColor: '#ffffff',
      androidScaleType: 'CENTER_CROP'
    }
  }
};

export default config;
