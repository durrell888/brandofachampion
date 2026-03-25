import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

export const initializeApp = async () => {
  if (Capacitor.isNativePlatform()) {
    // Set status bar style for native platforms
    try {
      await StatusBar.setStyle({ style: Style.Dark });
      await StatusBar.setBackgroundColor({ color: '#000000' });
    } catch (e) {
      // StatusBar plugin not available
    }

    // Hide splash screen after app is ready
    try {
      await SplashScreen.hide();
    } catch (e) {
      // SplashScreen plugin not available
    }
  }
};

export const isNative = () => Capacitor.isNativePlatform();
export const getPlatform = () => Capacitor.getPlatform();
