package org.daralemaam.mawarith;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.ContentValues;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.Network;
import android.net.NetworkCapabilities;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Base64;
import android.view.WindowInsets;
import android.webkit.JavascriptInterface;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.google.android.play.core.appupdate.AppUpdateInfo;
import com.google.android.play.core.appupdate.AppUpdateManager;
import com.google.android.play.core.appupdate.AppUpdateManagerFactory;
import com.google.android.play.core.appupdate.AppUpdateOptions;
import com.google.android.play.core.install.model.AppUpdateType;
import com.google.android.play.core.install.model.UpdateAvailability;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;

/**
 * يعرض الحاسبة: من الموقع العام عند الاتصال فتصل التعديلات بلا إصدار جديد،
 * ومن نسخة التطبيق المحفوظة بلا إنترنت. ويعرض تحديث التطبيق نفسه من Google Play عند توفره.
 */
public class MainActivity extends Activity {
    // الموقع العام للحاسبة (GitHub Pages)، ونسخة التطبيق المحفوظة
    private static final String SITE = "https://taroot80-blip.github.io/Dar-alemaam-alsadig/";
    private static final String REMOTE = SITE + "index.html";
    private static final String LOCAL = "file:///android_asset/index.html";
    private static final int UPDATE_REQUEST = 7001;

    private WebView web;
    private AppUpdateManager updates;
    // جسر التطبيق يُتاح لصفحتي الحاسبة فقط، لا لأي صفحة أخرى
    private volatile boolean trusted = false;
    private boolean fellBack = false;

    private static boolean ours(String url) {
        return url != null && (url.startsWith(LOCAL) || url.startsWith(SITE));
    }

    @Override
    protected void onCreate(Bundle state) {
        super.onCreate(state);
        web = new WebView(this);
        web.setBackgroundColor(0xFF0B0805);
        setContentView(web);

        // أندرويد 15 فما فوق يرسم تحت أشرطة النظام، فنُبعد المحتوى عنها
        web.setOnApplyWindowInsetsListener((v, insets) -> {
            int l, t, r, b;
            if (Build.VERSION.SDK_INT >= 30) {
                android.graphics.Insets i = insets.getInsets(WindowInsets.Type.systemBars() | WindowInsets.Type.displayCutout());
                l = i.left; t = i.top; r = i.right; b = i.bottom;
            } else {
                l = insets.getSystemWindowInsetLeft(); t = insets.getSystemWindowInsetTop();
                r = insets.getSystemWindowInsetRight(); b = insets.getSystemWindowInsetBottom();
            }
            v.setPadding(l, t, r, b);
            return insets;
        });

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setTextZoom(100);

        web.addJavascriptInterface(new Bridge(), "AndroidApp");
        web.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest req) {
                String url = req.getUrl().toString();
                if (ours(url)) return false;
                try {
                    startActivity(new Intent(Intent.ACTION_VIEW, req.getUrl()));
                } catch (ActivityNotFoundException ignored) {
                }
                return true;
            }

            @Override
            public void onPageStarted(WebView view, String url, android.graphics.Bitmap favicon) {
                trusted = ours(url);
            }

            // تعذّر الموقع (انقطاع أو خطأ): تُفتح النسخة المحفوظة في التطبيق
            @Override
            public void onReceivedError(WebView view, WebResourceRequest req, WebResourceError err) {
                if (req.isForMainFrame()) useLocal();
            }

            @Override
            public void onReceivedHttpError(WebView view, WebResourceRequest req, WebResourceResponse res) {
                if (req.isForMainFrame() && res.getStatusCode() >= 400) useLocal();
            }
        });

        if (state != null) web.restoreState(state);
        else web.loadUrl(online() ? REMOTE : LOCAL);

        checkForAppUpdate();
    }

    private void useLocal() {
        if (fellBack) return;
        fellBack = true;
        web.loadUrl(LOCAL);
    }

    private boolean online() {
        ConnectivityManager cm = (ConnectivityManager) getSystemService(CONNECTIVITY_SERVICE);
        if (cm == null) return false;
        Network n = cm.getActiveNetwork();
        NetworkCapabilities c = n == null ? null : cm.getNetworkCapabilities(n);
        return c != null && c.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
                && c.hasCapability(NetworkCapabilities.NET_CAPABILITY_VALIDATED);
    }

    // تحديث التطبيق من Google Play: يعمل فقط لمن ثبّته من المتجر، ويُتجاهل في غيره
    private void checkForAppUpdate() {
        try {
            updates = AppUpdateManagerFactory.create(this);
            updates.getAppUpdateInfo().addOnSuccessListener(info -> {
                if (info.updateAvailability() == UpdateAvailability.UPDATE_AVAILABLE
                        && info.isUpdateTypeAllowed(AppUpdateType.IMMEDIATE)) startUpdate(info);
            });
        } catch (Exception ignored) {
        }
    }

    private void startUpdate(AppUpdateInfo info) {
        try {
            updates.startUpdateFlowForResult(info, this, AppUpdateOptions.newBuilder(AppUpdateType.IMMEDIATE).build(), UPDATE_REQUEST);
        } catch (Exception ignored) {
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        // تحديث بدأ ولم يكتمل (خرج المستخدم ثم عاد): يُستأنف
        if (updates != null) updates.getAppUpdateInfo().addOnSuccessListener(info -> {
            if (info.updateAvailability() == UpdateAvailability.DEVELOPER_TRIGGERED_UPDATE_IN_PROGRESS) startUpdate(info);
        });
    }

    @Override
    protected void onSaveInstanceState(Bundle out) {
        super.onSaveInstanceState(out);
        web.saveState(out);
    }

    @Override
    public void onBackPressed() {
        if (web.canGoBack()) web.goBack();
        else super.onBackPressed();
    }

    /** ما تستدعيه صفحة الحاسبة من التطبيق. */
    private class Bridge {
        @JavascriptInterface
        public String version() {
            if (!trusted) return "";
            try {
                return getPackageManager().getPackageInfo(getPackageName(), 0).versionName;
            } catch (Exception e) {
                return "";
            }
        }

        @JavascriptInterface
        public String source() {
            return trusted ? (fellBack || !online() ? "local" : "site") : "";
        }

        @JavascriptInterface
        public String savePdf(String base64, String name) {
            if (!trusted) return "";
            try {
                byte[] data = Base64.decode(base64, Base64.DEFAULT);
                // اسم الملف بلا رموز تمنع حفظه
                name = name.replaceAll("[\\\\/:*?\"<>|]", "-");
                Uri uri;
                if (Build.VERSION.SDK_INT >= 29) {
                    ContentValues cv = new ContentValues();
                    cv.put(MediaStore.Downloads.DISPLAY_NAME, name);
                    cv.put(MediaStore.Downloads.MIME_TYPE, "application/pdf");
                    uri = getContentResolver().insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, cv);
                    if (uri == null) return "تعذّر حفظ الملف.";
                    try (OutputStream o = getContentResolver().openOutputStream(uri)) {
                        o.write(data);
                    }
                } else {
                    File dir = getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS);
                    File f = new File(dir, name);
                    try (FileOutputStream o = new FileOutputStream(f)) {
                        o.write(data);
                    }
                    return "حُفظ الملف في: " + f.getAbsolutePath();
                }
                Intent open = new Intent(Intent.ACTION_VIEW).setDataAndType(uri, "application/pdf")
                        .addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                runOnUiThread(() -> {
                    try {
                        startActivity(open);
                    } catch (ActivityNotFoundException ignored) {
                    }
                });
                return "حُفظ الملف في «التنزيلات».";
            } catch (Exception e) {
                return "تعذّر حفظ الملف.";
            }
        }

        @JavascriptInterface
        public void copy(String text) {
            if (!trusted) return;
            ClipboardManager cm = (ClipboardManager) getSystemService(CLIPBOARD_SERVICE);
            if (cm != null) cm.setPrimaryClip(ClipData.newPlainText("text", text));
        }
    }
}
