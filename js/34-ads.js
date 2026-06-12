(function () {
  "use strict";

  const NATIVE_BANNER_SRC = "https://pl29722175.effectivecpmnetwork.com/a29c3c2bd36667c309faadf95946de0e/invoke.js";
  const NATIVE_BANNER_CONTAINER = "container-a29c3c2bd36667c309faadf95946de0e";
  const POPUNDER_SRC = "https://pl29701434.effectivecpmnetwork.com/6d/54/f0/6d54f07887e71b86d4927c915f344a50.js";
  const SOCIAL_BAR_SRC = "https://pl29722198.effectivecpmnetwork.com/3f/5e/ec/3f5eec856323324b21d05c9fae77b1ad.js";
  const POPUNDER_DEATH_INTERVAL = 3;

  function versionedUrl(src) {
    return src + (src.includes("?") ? "&" : "?") + "deathAdAt=" + Date.now();
  }

  function writeFrame(frame, body) {
    if (!frame) return;
    frame.srcdoc = "<!doctype html><html><head>" +
      "<meta charset=\"UTF-8\">" +
      "<base target=\"_blank\">" +
      "<style>html,body{margin:0;width:100%;min-height:100%;overflow:hidden;background:transparent}</style>" +
      "</head><body>" + body + "</body></html>";
  }

  function nativeBannerHtml() {
    return "<div id=\"" + NATIVE_BANNER_CONTAINER + "\"></div>" +
      "<script async=\"async\" data-cfasync=\"false\" src=\"" + NATIVE_BANNER_SRC + "\"><\/script>";
  }

  function loadHomeNativeBanner() {
    writeFrame(document.getElementById("homeNativeAdFrame"), nativeBannerHtml());
  }

  function loadDeathNativeBanner() {
    const overlay = document.getElementById("deathAdOverlay");
    if (overlay) overlay.classList.add("isVisible");
    writeFrame(document.getElementById("deathNativeAdFrame"), nativeBannerHtml());
  }

  function clearFrame(frame) {
    if (!frame) return;
    frame.removeAttribute("srcdoc");
    frame.src = "about:blank";
  }

  function removeElement(id) {
    const previous = document.getElementById(id);
    if (previous) previous.remove();
  }

  function clearDeathAds() {
    const overlay = document.getElementById("deathAdOverlay");
    if (overlay) overlay.classList.remove("isVisible");
    clearFrame(document.getElementById("deathNativeAdFrame"));
    removeElement("woomy-death-social-bar-ad");
    removeElement("woomy-death-popunder-ad");
  }

  function injectDeathFrame(src, id, allowPopups) {
    removeElement(id);

    const frame = document.createElement("iframe");
    frame.id = id;
    frame.title = "Death screen advertisement";
    frame.hidden = true;
    frame.style.display = "none";
    frame.setAttribute("sandbox", allowPopups ? "allow-scripts allow-popups allow-popups-to-escape-sandbox" : "allow-scripts");
    document.body.appendChild(frame);

    writeFrame(
      frame,
      "<script>" +
        "(function(){" +
          "var realOpen=window.open;" +
          "window.open=function(url,name,features){return realOpen.call(window,url,'_blank',features);};" +
        "}());" +
      "<\/script>" +
      "<script src=\"" + versionedUrl(src) + "\"><\/script>"
    );
  }

  function getDeathCount() {
    return Number(sessionStorage.getItem("woomyDeathCount") || "0");
  }

  function setDeathCount(count) {
    sessionStorage.setItem("woomyDeathCount", String(count));
  }

  function runDeathScreenAds(deathCount) {
    loadDeathNativeBanner();
    injectDeathFrame(SOCIAL_BAR_SRC, "woomy-death-social-bar-ad", false);
    if (deathCount % POPUNDER_DEATH_INTERVAL === 0) {
      injectDeathFrame(POPUNDER_SRC, "woomy-death-popunder-ad", true);
    } else {
      removeElement("woomy-death-popunder-ad");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadHomeNativeBanner, { once: true });
  } else {
    loadHomeNativeBanner();
  }

  window.__woomyAds = {
    clearDeathAds,

    markDeath(deathAt) {
      const deathKey = deathAt ? String(deathAt) : "unknown-death";
      if (deathKey === this.lastDeathKey) return;
      this.lastDeathKey = deathKey;

      const deathCount = getDeathCount() + 1;
      setDeathCount(deathCount);
      runDeathScreenAds(deathCount);
    }
  };
}());
