const PUBLIC_VAPID_KEY = 'BBH2Guo8U9ZQlObXp6GOnVZjUdp7Z1O-OQZFCgpR_GO6DVumJ9wfCNL-L-oD5ftWTEgJK_I5_ZinlUjaQNfTleM';

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

const subscription = async () => {

    // Service Worker
    const register = await navigator.serviceWorker.register('./worker.js', {
        scope: '/'
    });
    console.log('new Service Worker');

    const suscrip =  await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
    });

    await fetch('/subscription', {
        method: 'POST',
        body: JSON.stringify(suscrip),
        headers: {
            "Content-Type" : "application/json"
        }
    });
    console.log('Suscrito!');
};

// Enviar el form de la notificación
const form = document.querySelector('#myForm');
const message = document.querySelector('#message');

form.addEventListener('submit', e => {
    e.preventDefault();
    fetch('/new-message', {
        method: 'POST',
        body: JSON.stringify({
            message: message.value
        }),
        headers: {
            'Content-Type' : 'application/json'
        }
    });
    form.reset();
});

subscription();