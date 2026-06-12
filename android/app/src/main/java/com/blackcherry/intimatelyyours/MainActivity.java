package com.blackcherry.intimatelyyours;

import android.os.Bundle;
import androidx.activity.OnBackPressedCallback;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(com.capacitorjs.plugins.splashscreen.SplashScreenPlugin.class);
        registerPlugin(com.capacitorjs.plugins.statusbar.StatusBarPlugin.class);
        super.onCreate(savedInstanceState);

        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                if (getBridge() == null || getBridge().getWebView() == null) return;
                getBridge().getWebView().evaluateJavascript(
                    "window.dispatchEvent(new CustomEvent('native-back'))",
                    null
                );
            }
        });
    }
}
