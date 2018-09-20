package com.hinative;
import android.content.Intent;
import com.shinetechchina.react_native_screen_recorder.RecordService;  // <-- add this import
import com.shinetechchina.react_native_screen_recorder.ScreenRecorderPackage; // <-- add this import
import android.app.Application;
import org.reactnative.camera.RNCameraPackage;
import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.wix.interactable.Interactable;
import com.microsoft.appcenter.reactnative.crashes.AppCenterReactNativeCrashesPackage;
import com.microsoft.appcenter.reactnative.analytics.AppCenterReactNativeAnalyticsPackage;
import com.microsoft.appcenter.reactnative.appcenter.AppCenterReactNativePackage;
import com.voximplant.reactnative.VoxImplantReactPackage;
import cn.qiuxiang.react.recording.RecordingPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new VectorIconsPackage(),
            new RNCameraPackage(),
            new Interactable(),
            new AppCenterReactNativeCrashesPackage(MainApplication.this, getResources().getString(R.string.appCenterCrashes_whenToSendCrashes)),
            new AppCenterReactNativeAnalyticsPackage(MainApplication.this, getResources().getString(R.string.appCenterAnalytics_whenToEnableAnalytics)),
            new AppCenterReactNativePackage(MainApplication.this),
            new VoxImplantReactPackage(),
            new RecordingPackage(),
            new ScreenRecorderPackage() // <-- add this line
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    startService(new Intent(this, RecordService.class));  // <-- add this line
  }
}
