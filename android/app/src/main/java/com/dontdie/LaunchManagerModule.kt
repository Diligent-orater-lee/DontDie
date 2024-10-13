package com.dontdie

import android.content.Intent
import com.facebook.react.bridge.*

class LaunchManagerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "LaunchManager"

    @ReactMethod
    fun openApp(page: String, additionalData: String, promise: Promise) {
        try {
            val intent = Intent(currentActivity, MainActivity::class.java).apply {
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                putExtra("page", page)
                putExtra("data", additionalData)
            }
            currentActivity?.startActivity(intent)
            promise.resolve(null)
        } catch (e: Exception) {
            promise.reject("ERROR", e.message)
        }
    }
}