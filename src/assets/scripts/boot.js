/**
 * Prevent use of app if this is not evergreen browser
 */
(function () {
  var EN_NOTIFICATION =
    '<img src="./assets/images/company-logo.png" /><h2 class="all-hours-boot-notification-title">We have detected that you are using obsolete browser, which is not supported.</h2><h3 class="all-hours-boot-notification-subtitle">Please, use one of the newer browsers.</h3>';
  var SL_NOTIFICATION =
    '<img src="./assets/images/company-logo.png" /><h2 class="all-hours-boot-notification-title">Videti je, da uporabljate brskalnik, ki ni podprt.</h2><h3 class="all-hours-boot-notification-subtitle">Prosimo, če poizkusite z enim od novejših brskalnikov.</h3>';

  /** Whether the current rendering engine is Microsoft Trident. */
  var isTrident = navigator && /(msie|trident)/i.test(navigator.userAgent);

  if (isTrident) {
    // Resolve navigator language. Fallback to en if it couldn't be resolved
    var navigatorLanguage = navigator
      ? navigator.language.substring(0, 2)
      : "en";

    // Get notification text for given language
    var notification =
      navigatorLanguage === "en"
        ? EN_NOTIFICATION
        : navigatorLanguage === "sl"
        ? SL_NOTIFICATION
        : EN_NOTIFICATION;

    // Select spinning container as it should be removed
    var removeSpinnerContainer = document.getElementById(
      "all-hours-boot-spinner-container"
    );

    // Remove container from DOM. As expected for IE there is some workaround as removeSpinnerContainer.remove() is not supported
    removeSpinnerContainer.parentNode.removeChild(removeSpinnerContainer);

    // Select target element for placing notification
    var targetNotificationElement = document.getElementById(
      "all-hours-boot-text"
    );

    // Set notification text
    targetNotificationElement.innerHTML = notification;
  }

  // Respect the theme and language that was used by user
  // Find if there exists preset localization. If not then fallback to en-GB
  var selectedLocalization =
    window && window.localStorage
      ? window.localStorage.getItem("LOCALIZATION")
      : "en-US";

  // Define boostrap title according to language
  var EN_BOOTSTRAP_TITLE = "Application is loading. Please wait.";
  var SL_BOOTSTRAP_TITLE = "Aplikacija se zaganja. Prosimo počakajte.";

  var bootstrapTitle =
    selectedLocalization === "sl-SI" ? SL_BOOTSTRAP_TITLE : EN_BOOTSTRAP_TITLE;

  // Set bootstrap title to desiganted element
  var loadingTitleElement = document.getElementById("loading-title");
  loadingTitleElement.innerText = bootstrapTitle;

  var selectedTheme =
    window && window.localStorage ? window.localStorage.getItem("THEME") : null;

  if (selectedTheme) {
    var themeSetting = JSON.parse(selectedTheme);
    if (themeSetting && themeSetting.type && themeSetting.type === "DARK") {
      var themeRootElement = (document.getElementById("root-container").style =
        "background-color: #424242");
      var bootLogoElement = (document.getElementById("boot-logo").src =
        "./assets/images/boot-logo-dark.png");
    }
  }
})();
