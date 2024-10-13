package com.dontdie

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import android.os.Bundle;
import android.content.Intent
import com.facebook.react.modules.core.DeviceEventManagerModule

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.Arguments
import android.util.Log

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "DontDie"

  override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        handleIntent(intent)
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        handleIntent(intent)
    }

    private fun handleIntent(intent: Intent) {
        val page = intent.getStringExtra("page")
        if (page != null) {
            val additionalData = intent.getStringExtra("data")
            // Pass this data to your React Native app
            // You might use a native module to emit an event to React Native
            // or use initial properties
            val reactInstanceManager = reactNativeHost.reactInstanceManager
            reactInstanceManager.currentReactContext?.let { reactContext ->
                val eventEmitter = reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                eventEmitter.emit("AppLaunched", Arguments.createMap().apply {
                    putString("page", page)
                    putString("data", additionalData)
                })
            }
        } else {
            Log.e("Page was", "null")
        }
    }

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
