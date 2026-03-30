export const initializeApp = async () => {
  // Capacitor native platform initialization - only runs in native builds
  try {
    // @ts-ignore - Capacitor packages only available in native builds
    const core = await import(/* @vite-ignore */ '@capacitor/core');
    if (core.Capacitor.isNativePlatform()) {
      try {
        // @ts-ignore
        const statusBar = await import(/* @vite-ignore */ '@capacitor/status-bar');
        await statusBar.StatusBar.setStyle({ style: statusBar.Style.Dark });
        await statusBar.StatusBar.setBackgroundColor({ color: '#000000' });
      } catch (e) {
        // StatusBar plugin not available
      }
      try {
        // @ts-ignore
        const splash = await import(/* @vite-ignore */ '@capacitor/splash-screen');
        await splash.SplashScreen.hide();
      } catch (e) {
        // SplashScreen plugin not available
      }
    }
  } catch (e) {
    // Capacitor not available (web environment)
  }
};

export const isNative = () => false;
export const getPlatform = () => 'web';
