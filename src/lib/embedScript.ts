/**
 * Generates the embed script that can be used to include the chat widget on any website
 * @param widgetUrl URL of the deployed widget
 * @returns {string} The embed script as a string
 */
export const generateEmbedScript = (widgetUrl: string): string => {
  return `
// Chat Widget Embed Script
(function() {
  // Create iframe to load the chat widget
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.bottom = '0';
  iframe.style.right = '0';
  iframe.style.width = '70px';
  iframe.style.height = '70px';
  iframe.style.border = 'none';
  iframe.style.zIndex = '9999';
  iframe.style.display = 'block';
  iframe.style.backgroundColor = 'transparent';
  
  // Set the src to the deployed chat widget URL
  iframe.src = '${widgetUrl}';
  
  // Add the iframe to the document
  document.body.appendChild(iframe);
  
  // Handle iframe communication
  window.addEventListener('message', function(event) {
    // Check origin for security
    if (event.origin !== '${new URL(widgetUrl).origin}') return;
    
    // Handle messages from the widget
    const { type, data } = event.data;
    
    switch(type) {
      case 'WIDGET_LOADED':
        console.log('Chat widget loaded successfully');
        break;
      case 'WIDGET_RESIZE':
        iframe.style.width = data.width + 'px';
        iframe.style.height = data.height + 'px';
        break;
      case 'WIDGET_CLOSE':

        break;
      default:
        break;
    }
  });
})();
`;
};

/**
 * Creates a standalone build script that can be used to create a production-ready widget
 */
export const buildWidgetScript = async (): Promise<void> => {
  // This would be used in a build process to generate the standalone widget script
  // For now, we'll just log a message
  console.log('Building widget script...');
};