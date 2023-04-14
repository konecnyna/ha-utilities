"use strict";
class AutoRefresh {
  constructor(hrefPartialMatch) {
    this.hrefPartialMatch = hrefPartialMatch
  }
  start() {
    if (window.location.href.includes(this.hrefPartialMatch)) {
      console.log("setting auto refresh")
      this.running = setInterval(() => {
        this.checkRefreshChange()
      }, 60 * 1000 * 5);
      return;
    } 
  }

  stop() {
    if (this.running) {
      clearInterval(this.running)
      this.running = false;
    }    
  }

  checkRefreshChange() {
    const ha = document.querySelector("home-assistant")
    if (!ha || !ha.shadowRoot) return
    const nm = ha.shadowRoot.querySelector('notification-manager')
    if (!nm || !nm.shadowRoot) return
    const haToast = nm.shadowRoot.querySelector('ha-toast')
    if (!haToast) return
    if (haToast.text === 'The Lovelace UI configuration for this dashboard was updated. Refresh to see changes?') {
      console.log("Refreshing page...")
      location.reload()
    }
  }
}


function run() {
  const magicMirrorAutoRefresh = new AutoRefresh("magic-mirror")
  magicMirrorAutoRefresh.start()

  // Set test Function
  window.magicMirrorAutoRefresh
}


run();
