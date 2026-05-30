/**
 * Prevent browser back/forward cache from showing admin pages after logout.
 */
(function () {
  window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
      window.location.replace(window.location.href);
    }
  });

  if (window.history && window.history.replaceState) {
    window.history.replaceState(null, document.title, window.location.href);
  }
})();
