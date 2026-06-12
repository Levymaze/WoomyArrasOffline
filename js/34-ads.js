(function () {
  "use strict";

  const POPUNDER_SRC = "https://pl29701434.effectivecpmnetwork.com/6d/54/f0/6d54f07887e71b86d4927c915f344a50.js";
  const SOCIAL_BAR_SRC = "https://pl29722198.effectivecpmnetwork.com/3f/5e/ec/3f5eec856323324b21d05c9fae77b1ad.js";

  function injectScript(src, id) {
    const previous = document.getElementById(id);
    if (previous) previous.remove();

    const script = document.createElement("script");
    script.id = id;
    script.src = src + (src.includes("?") ? "&" : "?") + "deathAdAt=" + Date.now();
    script.async = true;
    document.head.appendChild(script);
  }

  function getDeathCount() {
    return Number(sessionStorage.getItem("woomyDeathCount") || "0");
  }

  function setDeathCount(count) {
    sessionStorage.setItem("woomyDeathCount", String(count));
  }

  function runDeathScreenAds() {
    injectScript(SOCIAL_BAR_SRC, "woomy-death-social-bar-ad");
    injectScript(POPUNDER_SRC, "woomy-death-popunder-ad");
  }

  window.__woomyAds = {
    markDeath(deathAt) {
      const deathKey = deathAt ? String(deathAt) : "unknown-death";
      if (deathKey === this.lastDeathKey) return;
      this.lastDeathKey = deathKey;

      setDeathCount(getDeathCount() + 1);
      runDeathScreenAds();
    }
  };
}());
