// Service Worker apenas em produção — em dev (localhost/127.0.0.1) desativa para
// evitar que o cache impeça o Vite de entregar arquivos atualizados.
const isDev =
  location.hostname === 'localhost' ||
  location.hostname === '127.0.0.1' ||
  location.hostname.startsWith('192.168.')

if (isDev && 'serviceWorker' in navigator) {
  // Em dev: desregistra qualquer SW que tenha ficado instalado
  navigator.serviceWorker.getRegistrations().then((regs) => {
    regs.forEach((r) => r.unregister())
  })
}

// Registro do Service Worker
if (!isDev && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw.js')
      .then((reg) => {
        // Verifica atualizações periodicamente
        setInterval(() => reg.update(), 60 * 60 * 1000);

        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              showUpdateBanner();
            }
          });
        });
      })
      .catch(() => {});
  });
}

// Banner de atualização disponível
function showUpdateBanner() {
  const banner = document.createElement('div');
  banner.id = 'pwa-update-banner';
  banner.innerHTML = `
    <div style="
      position:fixed; bottom:80px; left:50%; transform:translateX(-50%);
      background:#00C2A0; color:#031632; padding:12px 20px;
      border-radius:12px; font-family:Inter,sans-serif; font-size:14px;
      font-weight:600; display:flex; align-items:center; gap:12px;
      box-shadow:0 4px 20px rgba(0,194,160,0.4); z-index:9999;
      white-space:nowrap;
    ">
      <span>Nova versão disponível</span>
      <button onclick="window.location.reload()" style="
        background:#031632; color:#00C2A0; border:none; padding:6px 14px;
        border-radius:8px; font-weight:700; cursor:pointer; font-size:13px;
      ">Atualizar</button>
    </div>
  `;
  document.body.appendChild(banner);
}

// Prompt de instalação (A2HS)
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallButton();
});

function showInstallButton() {
  const existing = document.getElementById('pwa-install-btn');
  if (existing) return;

  const btn = document.createElement('button');
  btn.id = 'pwa-install-btn';
  btn.setAttribute('aria-label', 'Instalar app');
  btn.innerHTML = `
    <span class="material-symbols-outlined" style="font-size:20px;">download</span>
    <span style="font-size:12px;font-weight:600;">Instalar</span>
  `;
  btn.style.cssText = `
    position:fixed; top:12px; right:60px; z-index:9999;
    background:#00C2A0; color:#031632; border:none;
    padding:6px 14px; border-radius:20px; cursor:pointer;
    display:flex; align-items:center; gap:6px;
    font-family:Inter,sans-serif; font-weight:600;
    box-shadow:0 2px 12px rgba(0,194,160,0.35);
    animation: fadeIn 0.3s ease;
  `;
  btn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') btn.remove();
    deferredPrompt = null;
  });

  document.body.appendChild(btn);
}

window.addEventListener('appinstalled', () => {
  document.getElementById('pwa-install-btn')?.remove();
  deferredPrompt = null;
});
