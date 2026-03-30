export const initializeApp = async () => {
  // Capacitor native platform initialization
  // Only runs when native plugins are available
  try {
    const { Capacitor } = await import('@capacitor/core');
    if (Capacitor.isNativePlatform()) {
      try {
        const { StatusBar, Style } = await import('@capacitor/status-bar');
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setBackgroundColor({ color: '#000000' });
      } catch (e) {
        // StatusBar plugin not available
      }

      try {
        const { SplashScreen } = await import('@capacitor/splash-screen');
        await SplashScreen.hide();
      } catch (e) {
        // SplashScreen plugin not available
      }
    }
  } catch (e) {
    // Capacitor not available (web environment)
  }
};

export const isNative = () => {
  try {
    // Dynamic check without static import
    return false;
  } catch {
    return false;
  }
};

export const getPlatform = () => 'web';
