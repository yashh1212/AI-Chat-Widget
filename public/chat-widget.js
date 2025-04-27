// Script to embed the chat widget on any website
(function () {
  // Create iframe to load the chat widget
  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.bottom = "20px";
  iframe.style.right = "20px";
  iframe.style.width = "64px";
  iframe.style.height = "64px";
  iframe.style.border = "none";
  iframe.style.zIndex = "9999";
  iframe.style.display = "block";
  iframe.style.backgroundColor = "transparent";
  iframe.style.overflow = "hidden";
  iframe.style.borderRadius = "50%";
  iframe.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
  iframe.style.transform = "scale(1)";
  iframe.style.transition =
    "transform 0.3s ease, width 0.3s ease, height 0.3s ease, border-radius 0.3s ease";

  // Get the deployed URL from the script tag's data attribute
  const scriptTag = document.currentScript;
  const widgetUrl =
    scriptTag?.getAttribute("data-widget-url") ||
    "https://your-deployed-widget-url.com";

  // Extract theme colors from the host website
  const computedStyle = getComputedStyle(document.body);
  const primaryColor =
    computedStyle.getPropertyValue("--primary-color") ||
    computedStyle.backgroundColor ||
    "#3b82f6";
  const textColor =
    computedStyle.getPropertyValue("--text-color") ||
    computedStyle.color ||
    "#ffffff";
  const accentColor =
    computedStyle.getPropertyValue("--accent-color") || "#ef4444";

  // Set the src to the deployed chat widget URL with theme parameters
  const themeParams = new URLSearchParams({
    primaryColor: encodeURIComponent(primaryColor),
    textColor: encodeURIComponent(textColor),
    accentColor: encodeURIComponent(accentColor),
  });

  iframe.src = `${widgetUrl}?${themeParams.toString()}`;

  // Add the iframe to the document
  document.body.appendChild(iframe);

  // Handle iframe communication
  window.addEventListener("message", function (event) {
    // Check origin for security
    const widgetOrigin = new URL(widgetUrl).origin;
    if (event.origin !== widgetOrigin) return;

    // Handle messages from the widget
    const { type, data } = event.data;

    switch (type) {
      case "WIDGET_LOADED":
        console.log("Chat widget loaded successfully");
        iframe.style.transform = "scale(1)";
        break;
      case "WIDGET_RESIZE":
        if (data?.width && data?.height) {
          iframe.style.width = "383px";
          iframe.style.height = "499px";
          iframe.style.borderRadius = "12px";
          iframe.style.transform = "scale(1)";
        }
        break;
      case "WIDGET_CLOSE":
        iframe.style.width = "64px";
        iframe.style.height = "64px";
        iframe.style.borderRadius = "50%";
        iframe.style.transform = "scale(1)";
        break;
      case "WIDGET_ERROR":
        console.error("Chat widget error:", data?.message);
        break;
      default:
        break;
    }
  });

  // Handle connection status changes
  window.addEventListener("online", function () {
    iframe.contentWindow.postMessage(
      { type: "NETWORK_STATUS", status: "online" },
      "*"
    );
  });

  window.addEventListener("offline", function () {
    iframe.contentWindow.postMessage(
      { type: "NETWORK_STATUS", status: "offline" },
      "*"
    );
  });

  // Add hover effect
  iframe.addEventListener("mouseenter", function () {
    if (iframe.style.width === "64px") {
      iframe.style.transform = "scale(1.05)";
    }
  });

  iframe.addEventListener("mouseleave", function () {
    if (iframe.style.width === "64px") {
      iframe.style.transform = "scale(1)";
    }
  });
})();
