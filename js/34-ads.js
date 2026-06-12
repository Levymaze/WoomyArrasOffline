(function () {
  "use strict";

  const POPUNDER_SRC = "https://pl29701434.effectivecpmnetwork.com/6d/54/f0/6d54f07887e71b86d4927c915f344a50.js";
  const SESSION_KEY = "woomyPopunderShownThisSession";

  function injectScript(src, id) {
    if (!src || document.getElementById(id)) return;
    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    script.async = true;
    document.head.appendChild(script);
  }

  function getDeathCount() {
    return Number(sessionStorage.getItem("woomyDeathCount") || "0");
  }

  function setDeathCount(count) {
    sessionStorage.setItem("woomyDeathCount", String(count));
  }

  function shouldShowPopunder() {
    return sessionStorage.getItem(SESSION_KEY) !== "1";
  }

  window.__woomyAds = {
    onDeathScreen() {
      if (this.lastDeathAt === window.__woomyLastDiedAt) return;
      window.__woomyLastDiedAt = this.lastDeathAt;

      const deathCount = getDeathCount() + 1;
      setDeathCount(deathCount);

      if (!shouldShowPopunder()) return;
      sessionStorage.setItem(SESSION_KEY, "1");
      injectScript(POPUNDER_SRC, "woomy-popunder-ad");
    },

    markDeath(deathAt) {
      this.lastDeathAt = deathAt || Date.now();
      this.onDeathScreen();
    }
  };
}());
