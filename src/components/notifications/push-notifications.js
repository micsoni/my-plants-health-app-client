const pushServerPublicKey =
  "BNjuWCXK71muGglEJvKvMGCN7Hu5LdRnKT8oR8WqxEJ7_rILcJk6qID83tPv4CChiVczG28YgMlMUw7zxcD5wok";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

//checks if Push notification and service workers are supported by your browser
function isPushNotificationSupported() {
  return "serviceWorker" in navigator && "PushManager" in window;
}

//asks user consent to receive push notifications and returns the response of the user, one of granted, default, denied
async function askUserPermission() {
  return await Notification.requestPermission();
}

function registerServiceWorker() {
  return navigator.serviceWorker.register("/sw.js");
}

// using the registered service worker creates a push notification subscription and returns it
async function createNotificationSubscription() {
  const serviceWorker = await navigator.serviceWorker.ready;
  // subscribe and return the subscription
  return await serviceWorker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(pushServerPublicKey)
  });
}

//returns the subscription if present or nothing
function getUserSubscription() {
  return navigator.serviceWorker.ready
    .then(function(serviceWorker) {
      return serviceWorker.pushManager.getSubscription();
    })
    .then(function(pushSubscription) {
      return pushSubscription;
    });
}

export {
  isPushNotificationSupported,
  askUserPermission,
  registerServiceWorker,
  createNotificationSubscription,
  getUserSubscription
};
