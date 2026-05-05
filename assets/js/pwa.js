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
  const existing = document.getElementById('pwa-install-banner');
  if (existing) return;

  // Backdrop overlay
  const overlay = document.createElement('div');
  overlay.id = 'pwa-install-overlay';
  overlay.style.cssText = `
    position:fixed; inset:0; z-index:9999;
    background:rgba(2, 8, 23, 0.8); backdrop-filter:blur(8px);
    animation: fadeIn 0.4s ease forwards;
  `;

  const banner = document.createElement('div');
  banner.id = 'pwa-install-banner';
  banner.style.cssText = `
    position:fixed; top:50%; left:50%; transform:translate(-50%, -50%);
    z-index:10000; background:#0f172a; border:1px solid rgba(0, 194, 160, 0.3);
    border-radius:32px; padding:32px; color:white;
    font-family:Inter, sans-serif; display:flex; flex-direction:column; gap:24px;
    box-shadow: 0 40px 80px rgba(0,0,0,0.8), 0 0 40px rgba(0, 194, 160, 0.15);
    animation: zoomIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    max-width: 360px; width: 90%; text-align: center;
  `;

  banner.innerHTML = `
    <style>
      @keyframes zoomIn { from { transform: translate(-50%, -40%); opacity: 0; scale: 0.9; } to { transform: translate(-50%, -50%); opacity: 1; scale: 1; } }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    </style>
    <div style="display:flex; flex-direction:column; align-items:center; gap:20px;">
      <div style="width:80px; height:80px; background:#020817; border:3px solid #00C2A0; border-radius:24px; display:flex; align-items:center; justify-content:center; box-shadow: 0 0 30px rgba(0, 194, 160, 0.2);">
        <img src="./assets/icons/icon-192.svg" style="width:50px; height:50px;" alt="ICF">
      </div>
      <div>
        <h4 style="margin:0; font-size:20px; font-weight:800; color:#00C2A0; letter-spacing:-0.02em;">Instalar App ICF</h4>
        <p style="margin:8px 0 0; font-size:14px; color:#94a3b8; line-height:1.6;">Leve a experiência do Intensivão para sua tela inicial com acesso rápido e offline.</p>
      </div>
    </div>
    <div style="display:flex; flex-direction:column; gap:12px;">
      <button id="pwa-install-confirm" style="width:100%; background:#00C2A0; color:#031632; border:none; padding:16px; border-radius:16px; font-weight:800; font-size:14px; cursor:pointer; transition:all 0.2s; text-transform:uppercase; letter-spacing:0.05em;">
        INSTALAR AGORA
      </button>
      <button id="pwa-install-close" style="background:transparent; color:#64748b; border:none; padding:8px; border-radius:12px; font-weight:600; font-size:13px; cursor:pointer; hover:color:white;">
        Continuar no navegador
      </button>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(banner);

  const confirmBtn = document.getElementById('pwa-install-confirm');
  const closeBtn = document.getElementById('pwa-install-close');

  const removeAll = () => {
    banner.style.opacity = '0';
    banner.style.scale = '0.9';
    overlay.style.opacity = '0';
    banner.style.transition = 'all 0.3s ease';
    overlay.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      banner.remove();
      overlay.remove();
    }, 300);
  };

  confirmBtn.onclick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') removeAll();
    deferredPrompt = null;
  };

  closeBtn.onclick = removeAll;
}

window.addEventListener('appinstalled', () => {
  document.getElementById('pwa-install-btn')?.remove();
  deferredPrompt = null;
});
