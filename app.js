/* ==========================================================================
   NEON HEAVEN // NEXUS DATABASE
   PARTE 4 — JAVASCRIPT (BLOQUE 1: CORE CORE & BOOT FLOW)
   ========================================================================== */

// CL CLEARANCE CREDENTIALS (Credenciales de Acceso Militar)
const AUTH_CONFIG = {
    operatorId: "CACHIRULA-2A",
    passphrase: "NEON_HEAVEN_MDF"
};

// CONTENEDORES MAESTROS DE LA INTERFAZ
const DOM = {
    bootScreen: document.getElementById('boot-screen'),
    authScreen: document.getElementById('auth-screen'),
    nexusMain: document.getElementById('nexus'),
    bootProgress: document.getElementById('boot-progress'),
    bootText: document.getElementById('boot-phase-text'),
    clock: document.getElementById('sys-clock'),
    uptime: document.getElementById('sys-uptime'),
    authForm: document.getElementById('auth-form'),
    authUserInput: document.getElementById('auth-user'),
    authPassInput: document.getElementById('auth-pass'),
    terminalOutput: document.getElementById('terminal-output')
};

// 🕒 CONTROL DE TIEMPO REAL (RELOJ MILITAR)
function initializeSystemClock() {
    const startTime = Date.now();

    setInterval(() => {
        const now = new Date();
        // Formato 24h denso para el reloj principal
        if (DOM.clock) DOM.clock.textContent = now.toTimeString().split(' ')[0];

        // Cálculo de Uptime (Tiempo activo desde que cargó)
        const diffMs = Date.now() - startTime;
        const diffMins = Math.floor(diffMs / 60000);
        const diffSecs = Math.floor((diffMs % 60000) / 1000);
        if (DOM.uptime) DOM.uptime.textContent = `UPTIME: ${String(diffMins).padStart(2, '0')}:${String(diffSecs).padStart(2, '0')}`;
    }, 1000);
}

// 🟡 SECUENCIA DE ARRANQUE SIMULADA (BOOT SEQUENCE)
function triggerBootSequence() {
    let progress = 0;
    const phases = [
        { limit: 20, text: "PHASE 01: HARDWARE DIAGNOSTIC // CHECKING CORES" },
        { limit: 50, text: "PHASE 02: DECRYPTING CYBERWARE UPLINK ENGINES" },
        { limit: 80, text: "PHASE 03: BYPASSING MILITECH HARD-FIREWALLS" },
        { limit: 100, text: "PHASE 04: ESTABLISHING SECURE GATEWAY CONNECTIONS" }
    ];

    let currentPhaseIdx = 0;

    const bootInterval = setInterval(() => {
        // Velocidad de carga militar variable aleatoria para mayor realismo
        progress += Math.floor(Math.random() * 5) + 2;
        if (progress > 100) progress = 100;

        if (DOM.bootProgress) DOM.bootProgress.style.width = `${progress}%`;

        // Cambio de fases de texto en el HUD de arranque
        if (currentPhaseIdx < phases.length && progress >= phases[currentPhaseIdx].limit) {
            if (DOM.bootText) DOM.bootText.textContent = phases[currentPhaseIdx].text;
            currentPhaseIdx++;
        }

        if (progress === 100) {
            clearInterval(bootInterval);
            setTimeout(() => {
                // Apagamos pantalla de carga y encendemos Login
                if (DOM.bootScreen) DOM.bootScreen.classList.add('hidden');
                if (DOM.authScreen) DOM.authScreen.classList.remove('hidden');
                pushLogToTerminal("SYS_BOOT: INITIALIZATION COMPLETE. STANDING BY FOR BIOMETRIC LINK.");
            }, 600);
        }
    }, 80);
}

// 🔒 SISTEMA DE AUTENTICACIÓN (LOGIN)
function setupAuthentication() {
    if (!DOM.authForm) return;
    DOM.authForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita la recarga de página por defecto en el formulario
        const userValue = DOM.authUserInput.value.trim();
        const passValue = DOM.authPassInput.value;

        if (userValue === AUTH_CONFIG.operatorId && passValue === AUTH_CONFIG.passphrase) {
            // Acceso Concedido: Desbloqueamos la base de datos
            if (DOM.authScreen) DOM.authScreen.classList.add('hidden');
            if (DOM.nexusMain) DOM.nexusMain.classList.remove('hidden');
            
            // Forzar remoción del bloqueo general si hereda clases de la plantilla vieja
            const alternativeAuthContainer = document.querySelector('.terminal-container');
            if (alternativeAuthContainer) alternativeAuthContainer.classList.remove('hidden-until-auth');
            
            pushLogToTerminal(`OPERATOR ${userValue} VERIFIED. SECURITY LEVEL 5 LINK ESTABLISHED.`);
            initializeSystemClock(); // El reloj empieza a correr al entrar al sistema
        } else {
            // Intento fallido
            alert("ACCESS DENIED // INVALID PASSPHRASE. DAEMON RETINAL INTERCEPT TRIGGERED.");
            DOM.authPassInput.value = "";
            pushLogToTerminal("WARNING: UNAUTHORIZED EYE-SCAN DETECTED ON NODE_01.");
        }
    });
}

// 📜 UTILIDAD: INYECTOR DE LOGS EN VIVO
function pushLogToTerminal(message) {
    if (!DOM.terminalOutput) return;
    const time = new Date().toTimeString().split(' ')[0];
    const logLine = document.createElement('div');
    logLine.className = "log-line";
    logLine.innerHTML = `<span style="color: rgba(255,42,95,0.5)">[${time}]</span> > ${message}`;
    DOM.terminalOutput.appendChild(logLine);
    DOM.terminalOutput.scrollTop = DOM.terminalOutput.scrollHeight; // Auto-scroll
}

// INITIALIZATION TRIGGER (Disparador de encendido)
document.addEventListener("DOMContentLoaded", () => {
    triggerBootSequence();
    setupAuthentication();
});

/* ==========================================================================
   NEON HEAVEN // NEXUS DATABASE
   PARTE 4 — JAVASCRIPT (BLOQUE 2: MENÚ DE CATEGORÍAS Y CONTROL DE PESTAÑAS)
   ========================================================================= */

// REGISTRO DE SELECTORES COMPLEMENTARIOS
const NAV_DOM = {
    menuButtons: document.querySelectorAll('.database-menu .menu-item'),
    tabButtons: document.querySelectorAll('#tabs .tab'),
    currentTitle: document.getElementById('current-db-title'),
    promptScreen: document.getElementById('system-prompt-screen'),
    entityView: document.getElementById('active-entity-view'),
    entName: document.getElementById('ent-name'),
    entCategory: document.getElementById('ent-category')
};

// 🗃 ADMINISTRADOR DE CATEGORÍAS (MENÚ LATERAL)
function initializeDatabaseMenu() {
    NAV_DOM.menuButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // 1. Quitar estado activo a los demás botones
            NAV_DOM.menuButtons.forEach(btn => btn.classList.remove('active'));
            
            // 2. Activar botón seleccionado
            const selectedButton = e.currentTarget;
            selectedButton.classList.add('active');

            // 3. Obtener metadatos tácticos de la categoría
            const category = selectedButton.getAttribute('data-category');
            const categoryName = selectedButton.textContent.trim();

            // 4. Actualizar título del Viewport Principal si existe
            if (NAV_DOM.currentTitle) {
                NAV_DOM.currentTitle.textContent = `NEXUS DATABASE // ${categoryName}`;
            }

            // 5. Flujo Visual: Retirar prompt de espera y desplegar ficha vacía lista para el JSON
            if (NAV_DOM.promptScreen) NAV_DOM.promptScreen.classList.add('hidden');
            if (NAV_DOM.entityView) NAV_DOM.entityView.classList.remove('hidden');

            // Sincronizar logs e inyectar el primer nodo del JSON mediante el acoplamiento integrado
            pushLogToTerminal(`NEXUS_REQ: ACCESSING CHANNEL [${category.toUpperCase()}]. FETCHING DATA NODES...`);
        });
    });
}

// 📊 CONTROLADOR DE SUB-PESTAÑAS TÁCTICAS
function initializeTabSystem() {
    NAV_DOM.tabButtons.forEach(tab => {
        tab.addEventListener('click', (e) => {
            // 1. Quitar clase activa a las pestañas deseleccionadas
            NAV_DOM.tabButtons.forEach(t => t.classList.remove('active'));

            // 2. Activar pestaña cliqueada
            const selectedTab = e.currentTarget;
            selectedTab.classList.add('active');

            const targetTabName = selectedTab.getAttribute('data-tab').toUpperCase();

            // 3. Informar al terminal sobre el cambio de segmento de memoria
            pushLogToTerminal(`MEM_SWAP: MEMORY CORE BUFFER SHIFTED TO [${targetTabName}].`);
        });
    });
}

// INYECCIÓN DE LISTENERS EN EL DISPARADOR GLOBAL EXISTENTE
document.addEventListener("DOMContentLoaded", () => {
    initializeDatabaseMenu();
    initializeTabSystem();
});

/* ==========================================================================
   NEON HEAVEN // NEXUS DATABASE
   PARTE 4 — JAVASCRIPT (BLOQUE 3: TELEMETRÍA HUD & MONITOR BLACK ICE)
   ========================================================================== */

// REGISTRO DE SELECTORES DE HARDWARE
const HUD_DOM = {
    cpuLoad: document.getElementById('cpu-load'),
    ramLoad: document.getElementById('ram-load'),
    bandwidthLoad: document.getElementById('bandwidth-load'),
    thermalFill: document.getElementById('thermal-level'),
    powerFill: document.getElementById('power-level'),
    iceMonitor: document.getElementById('black-ice-monitor'),
    iceStatusText: document.getElementById('ice-status-text'),
    iceType: document.getElementById('ice-type')
};

// 📈 MOTOR DE TELEMETRÍA DE HARDWARE DE ALTA DENSIDAD
function startHardwareSimulation() {
    let baseRam = 4.2;
    let basePower = 88;

    setInterval(() => {
        // 1. Fluctuación de la CPU (Cálculo táctico entre 3% y 24% en reposo)
        const currentCpu = Math.floor(Math.random() * 21) + 3;
        if (HUD_DOM.cpuLoad) HUD_DOM.cpuLoad.textContent = `${String(currentCpu).padStart(2, '0')}%`;

        // 2. Fluctuación de Ancho de Banda
        const currentBandwidth = (Math.random() * 8 + 1).toFixed(1);
        if (HUD_DOM.bandwidthLoad) HUD_DOM.bandwidthLoad.textContent = `${currentBandwidth} MB/S`;

        // 3. Fluctuación sutil de RAM
        const ramDrift = (Math.random() * 0.2 - 0.1);
        const currentRam = Math.min(Math.max(baseRam + ramDrift, 3.8), 5.4).toFixed(1);
        if (HUD_DOM.ramLoad) HUD_DOM.ramLoad.textContent = `${currentRam} GB`;

        // 4. Fluctuación Térmica correlacionada con el uso de la CPU
        const targetThermal = Math.min(30 + currentCpu, 95);
        if (HUD_DOM.thermalFill) HUD_DOM.thermalFill.style.width = `${targetThermal}%`;

        // 5. Degradación e inyección de energía lenta en la APU (Batería)
        if (Math.random() > 0.85) {
            basePower = basePower + (Math.random() > 0.5 ? 1 : -1);
            basePower = Math.min(Math.max(basePower, 80), 100);
            if (HUD_DOM.powerFill) HUD_DOM.powerFill.style.width = `${basePower}%`;
        }

    }, 2000);
}

/* ☠ SISTEMA DEFENSIVO: DISPARADOR DE INTENSIFICACIÓN DE BLACK ICE */
function triggerBlackIceAlert(iceName = "RAVEN_DAEMON.EXE") {
    if (!HUD_DOM.iceMonitor) return;
    HUD_DOM.iceMonitor.classList.remove('ice-safe');
    HUD_DOM.iceMonitor.classList.add('ice-danger');
    
    if (HUD_DOM.iceStatusText) HUD_DOM.iceStatusText.textContent = "CRITICAL_INTRUSION";
    if (HUD_DOM.iceType) HUD_DOM.iceType.textContent = iceName.toUpperCase();

    pushLogToTerminal(`🚨 KERNEL_ALERT: COUNTER-INTRUSION DETECTED! BLACK ICE [${iceName.toUpperCase()}] IS LOCKING CORES.`);
}

function clearBlackIceAlert() {
    if (!HUD_DOM.iceMonitor) return;
    HUD_DOM.iceMonitor.classList.remove('ice-danger');
    HUD_DOM.iceMonitor.classList.add('ice-safe');
    if (HUD_DOM.iceStatusText) HUD_DOM.iceStatusText.textContent = "ICE_CLEAN";
    if (HUD_DOM.iceType) HUD_DOM.iceType.textContent = "NONE DETECTED";
    pushLogToTerminal("SYS_MAINT: BLACK ICE PURGED SUCCESSFULLY. DESTRUCTIVE NODES RESTORED.");
}

document.addEventListener("DOMContentLoaded", () => {
    startHardwareSimulation();
});

/* ==========================================================================
   NEON HEAVEN // NEXUS DATABASE
   PARTE 4 — JAVASCRIPT (BLOQUE 4: DRAG & DROP, AUDIO MATRIX & ALERTS)
   ========================================================================== */

const SYS_DOM = {
    floatingWindows: document.querySelectorAll('.floating-window'),
    closeButtons: document.querySelectorAll('.win-close'),
    notificationContainer: document.getElementById('notifications-container'),
    audioSliders: document.querySelectorAll('.audio-slider')
};

// 🖥️ SISTEMA MÓVIL DRAG & DROP (Arrastrar y Soltar Ventanas)
function setupWindowDragAndDrop() {
    let activeWindow = null;
    let offsetX = 0;
    let offsetY = 0;

    document.querySelectorAll('.window-header').forEach(header => {
        header.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('win-close')) return;

            activeWindow = header.parentElement;
            
            document.querySelectorAll('.floating-window').forEach(win => win.style.zIndex = "1000");
            activeWindow.style.zIndex = "1050";

            const rect = activeWindow.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;

            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        });
    });

    function mouseMoveHandler(e) {
        if (!activeWindow) return;
        
        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        newX = Math.max(0, Math.min(newX, window.innerWidth - activeWindow.offsetWidth));
        newY = Math.max(0, Math.min(newY, window.innerHeight - activeWindow.offsetHeight));

        activeWindow.style.left = `${newX}px`;
        activeWindow.style.top = `${newY}px`;
    }

    function mouseUpHandler() {
        if (activeWindow) {
            pushLogToTerminal(`SYS_UI: WINDOW [${activeWindow.getAttribute('id').toUpperCase()}] POSITION SECTOR RECALIBRATED.`);
        }
        activeWindow = null;
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    }
}

// ❌ INTERCEPTOR DE BOTONES DE CIERRE (Ocultar Ventanas)
function setupWindowControls() {
    SYS_DOM.closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const windowTarget = e.currentTarget.closest('.floating-window');
            if (windowTarget) {
                windowTarget.classList.add('hidden');
                pushLogToTerminal(`SYS_UI: STREAM CONNECTION TO [${windowTarget.getAttribute('id').toUpperCase()}] TERMINATED.`);
            }
        });
    });
}

// 🔊 CONTROLADOR DE CONFIGURACIÓN DE AUDIO
function setupAudioMatrix() {
    SYS_DOM.audioSliders.forEach(slider => {
        slider.addEventListener('input', (e) => {
            const channel = e.target.id.toUpperCase();
            const volume = e.target.value;
            if (Math.random() > 0.7) { 
                pushLogToTerminal(`AUDIO_MIX: CHANNEL [${channel}] VOLUME DEVIATION AT ${volume}%.`);
            }
        });
    });
}

// 🚨 COMPONENTE DE GENERACIÓN DE NOTIFICACIONES DINÁMICAS
function spawnNotification(message, type = "success") {
    if (!SYS_DOM.notificationContainer) return;
    const alertDiv = document.createElement('div');
    alertDiv.className = `notification ${type}`;
    alertDiv.textContent = message.toUpperCase();

    SYS_DOM.notificationContainer.appendChild(alertDiv);
    pushLogToTerminal(`NOTIFY_CORE: STATUS_${type.toUpperCase()} // ${message}`);

    setTimeout(() => {
        alertDiv.style.opacity = '0';
        alertDiv.style.transition = 'opacity 0.5s ease';
        setTimeout(() => alertDiv.remove(), 500);
    }, 4000);
}

document.addEventListener("DOMContentLoaded", () => {
    setupWindowDragAndDrop();
    setupWindowControls();
    setupAudioMatrix();

    setTimeout(() => {
        const nex = document.getElementById('nexus');
        if (nex && !nex.classList.contains('hidden')) {
            spawnNotification("Nexus Cyber-Defense Core Active", "success");
        }
    }, 2000);
});

/* ==========================================================================
   NEON HEAVEN // PARTE 5 & 6 — MOTOR DE INYECCIÓN JSON & PAGINACIÓN INTERACTIVA
   ========================================================================== */

let localDatabaseCache = null; 
let currentCategory = "arms";  // Rastrear categoría activa global
let currentEntityIndex = 0;    // Rastrear índice activo global

// 📥 FUNCIÓN DE DESCARGA: CONECTAR ARCHIVO JSON
async function fetchNexusDatabase() {
    try {
        pushLogToTerminal("NET_REQ: ESTABLISHING JSON DATASTREAM LINK...");
        const response = await fetch('./database.json');
        
        if (!response.ok) throw new Error("HTTP_ERROR // UNABLE TO REACH DATABASE.JSON");
        
        localDatabaseCache = await response.json();
        pushLogToTerminal("NET_RES: DATABASE DOWNLOAD COMPLETE. PARSING NODES SUCCESSFUL.");
    } catch (error) {
        console.error(error);
        pushLogToTerminal(`❌ KERNEL_ERR: FETCH FAILED // ${error.message}`);
    }
}

// 🏛️ INYECTOR EN EL VIEWPORT CENTRAL MODIFICADO (SOPORTE MASIVO DE 300+ LÍNEAS)
function renderEntityData(category, index = 0) {
    if (!localDatabaseCache || !localDatabaseCache[category]) {
        pushLogToTerminal(`⚠️ DB_WARN: CATEGORY [${category.toUpperCase()}] CONTENT IS CURRENTLY ENCRYPTED OR EMPTY.`);
        return;
    }

    const totalElements = localDatabaseCache[category].length;
    const entity = localDatabaseCache[category][index];
    if (!entity) return;

    // Actualizar marcadores de memoria de la sesión
    currentCategory = category;
    currentEntityIndex = index;

    // [MODIFICACIÓN PASO 6]: Sincronizar el contador visual cuántico superior (Ej: "1 / 3")
    const counterElement = document.getElementById('nav-entity-counter');
    if (counterElement) {
        counterElement.textContent = `${index + 1} / ${totalElements}`;
    }

    // 1. Inyectar Textos Básicos e Identificadores en el Visor Reconstruido
    if (document.getElementById('ent-name')) document.getElementById('ent-name').textContent = entity.name.toUpperCase();
    if (document.getElementById('ent-serial')) document.getElementById('ent-serial').textContent = entity.serial;
    if (document.getElementById('ent-tag')) document.getElementById('ent-tag').textContent = entity.tag;
    if (document.getElementById('ent-desc')) document.getElementById('ent-desc').textContent = entity.description;

    // Compatibilidad con nodos de simulación antiguos de tu Bloque 2 si existen
    if (NAV_DOM.entCategory) NAV_DOM.entCategory.textContent = category.toUpperCase();

    // 2. Control Visual de la Imagen/Holograma Táctico
    const imgElement = document.getElementById('entity-image');
    if (imgElement) {
        if (entity.image && entity.image !== "") {
            imgElement.src = entity.image;
            imgElement.classList.remove('hidden');
        } else {
            imgElement.classList.add('hidden'); 
        }
    }

    // 3. Inyectar Barras de Atributos Dinámicas con porcentajes del reglamento Cyberpunk RED
    const barsContainer = document.getElementById('attribute-bars');
    if (barsContainer) {
        barsContainer.innerHTML = ""; 
        Object.entries(entity.stats).forEach(([statName, statValue]) => {
            const attrDiv = document.createElement('div');
            attrDiv.className = "attribute";
            attrDiv.innerHTML = `
                <label>${statName.toUpperCase()}</label>
                <div class="bar">
                    <div class="fill" style="width: ${statValue}%"></div>
                </div>
            `;
            barsContainer.appendChild(attrDiv);
        });
    }

    // 4. Inyectar Slots de Modificaciones de Equipamiento (Hardware Mods Matrix)
    const modsGrid = document.querySelector('.mods-grid');
    if (modsGrid) {
        modsGrid.innerHTML = ""; 
        entity.mods.forEach(modName => {
            const modCard = document.createElement('div');
            if (modName.toLowerCase().includes('vacío') || modName.toLowerCase().includes('empty')) {
                modCard.className = "mod-card empty";
                modCard.textContent = "[ SLOT_EMPTY ]";
            } else {
                modCard.className = "mod-card";
                modCard.textContent = modName;
            }
            modsGrid.appendChild(modCard);
        });
    }

    // 5. [MODIFICACIÓN ADAPTATIVA]: Inyectar sub-bloques intermedios de inteligencia de terreno
    const intelStatus = document.getElementById('intel-status-val');
    const intelClass = document.getElementById('intel-class-val');
    if (intelStatus && entity.intel_status) intelStatus.textContent = entity.intel_status;
    if (intelClass && entity.intel_class) intelClass.textContent = entity.intel_class;

    // 6. [MODIFICACIÓN ADAPTATIVA]: Inyectar las 4 tarjetas de telemetría de diagnóstico en el panel del Footer
    const metaDepth = document.getElementById('meta-architecture-depth');
    const metaOverflow = document.getElementById('meta-overflow-risk');
    const metaLoad = document.getElementById('meta-deck-load');
    const metaCounter = document.getElementById('meta-countermeasures');

    if (metaDepth && entity.meta_depth) metaDepth.textContent = entity.meta_depth;
    if (metaOverflow && entity.meta_overflow) metaOverflow.textContent = entity.meta_overflow;
    if (metaLoad && entity.meta_load) metaLoad.textContent = entity.meta_load;
    if (metaCounter && entity.meta_countermeasures) metaCounter.textContent = entity.meta_countermeasures;

    pushLogToTerminal(`DB_RENDER: ENTITY [${entity.id.toUpperCase()}] LOADED INTO VIRTUAL MEMORY BUFFER.`);
}

// ACOPLAMIENTO OPTIMIZADO CON TU MENÚ EXISTENTE
function upgradeMenuWithJSON() {
    const menuButtons = document.querySelectorAll('.database-menu .menu-item');
    
    menuButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const category = e.currentTarget.getAttribute('data-category');
            
            if (localDatabaseCache && localDatabaseCache[category]) {
                setTimeout(() => {
                    renderEntityData(category, 0); // Al cambiar de menú arranca siempre en el índice 0
                }, 150); 
            }
        });
    });
}

// [MODIFICACIÓN PASO 6]: DISPARADOR DE LISTENERS PARA NAVEGACIÓN DE FLECHAS (◀ ▶)
function setupPaginationListeners() {
    const btnPrev = document.getElementById('nav-prev-entity');
    const btnNext = document.getElementById('nav-next-entity');

    if (!btnPrev || !btnNext) return;

    // Controlador Flecha de Retroceso ◀
    btnPrev.addEventListener('click', () => {
        if (!localDatabaseCache || !localDatabaseCache[currentCategory]) return;
        const total = localDatabaseCache[currentCategory].length;
        
        let newIndex = currentEntityIndex - 1;
        if (newIndex < 0) newIndex = total - 1; // Salto infinito al último registro
        
        pushLogToTerminal(`NAV_TRACK: SHIFTING NEURAL BUFFER BACKWARD...`);
        renderEntityData(currentCategory, newIndex);
    });

    // Controlador Flecha de Avance ▶
    btnNext.addEventListener('click', () => {
        if (!localDatabaseCache || !localDatabaseCache[currentCategory]) return;
        const total = localDatabaseCache[currentCategory].length;
        
        let newIndex = currentEntityIndex + 1;
        if (newIndex >= total) newIndex = 0; // Salto infinito de reinicio al primer registro
        
        pushLogToTerminal(`NAV_TRACK: SHIFTING NEURAL BUFFER FORWARD...`);
        renderEntityData(currentCategory, newIndex);
    });
}

// INICIALIZACIÓN COMPLEMENTARIA UNIFICADA
document.addEventListener("DOMContentLoaded", async () => {
    await fetchNexusDatabase(); // Descargar el archivo al encender la computadora
    upgradeMenuWithJSON();      // Enlazar los botones con el inyector
    setupPaginationListeners(); // Encender el carrusel interactivo del paso 6
    
    // Auto-render de la categoría inicial de armas al pasar el bypass
    setTimeout(() => {
        if (localDatabaseCache && localDatabaseCache["arms"]) {
            renderEntityData("arms", 0);
        }
    }, 1200);
});

/* ==========================================================================
   NEON HEAVEN // BUSCADOR DE COINCIDENCIAS CUÁNTICAS
   ========================================================================== */
function setupDatabaseSearch() {
    const searchInput = document.getElementById('search');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query === "") return;

        if (!localDatabaseCache) return;

        for (const category in localDatabaseCache) {
            const foundIndex = localDatabaseCache[category].findIndex(item => 
                item.name.toLowerCase().includes(query) || 
                item.serial.toLowerCase().includes(query)
            );

            if (foundIndex !== -1) {
                const correspondingButton = document.querySelector(`.menu-item[data-category="${category}"]`);
                if (correspondingButton) {
                    document.querySelectorAll('.database-menu .menu-item').forEach(btn => btn.classList.remove('active'));
                    correspondingButton.classList.add('active');
                    if (NAV_DOM.currentTitle) {
                        NAV_DOM.currentTitle.textContent = `NEXUS DATABASE // ${correspondingButton.textContent.trim()}`;
                    }
                }

                if (NAV_DOM.promptScreen) NAV_DOM.promptScreen.classList.add('hidden');
                if (NAV_DOM.entityView) NAV_DOM.entityView.classList.remove('hidden');
                
                // Forzar despliegue y actualización de índices globales
                renderEntityData(category, foundIndex);
                break; 
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(setupDatabaseSearch, 1000); 
});

// Dentro de tu función que maneja el cambio de categoría:
function updateViewportContent(category) {
    const data = database[category]; // database es tu JSON cargado
    const container = document.getElementById('ent-grid');
    container.innerHTML = ''; // Limpiar previo

    if (category === 'gangs') {
        data.forEach(gang => {
            const card = document.createElement('div');
            card.className = 'entity-card';
            card.innerHTML = `
                <div class="card-name">${gang.name}</div>
                <div class="card-desc">${gang.description}</div>
                <div class="card-threat">NIVEL AMENAZA: ${gang.stats["Nivel Amenaza"]}</div>
            `;
            container.appendChild(card);
        });
    }
    // ... resto de tu lógica de renderizado
}

let database = {};

async function initNexus() {
    try {
        const response = await fetch('database.json');
        database = await response.json();
        console.log("NEXUS CORE // DATABASE LOADED // READY");
    } catch (err) {
        console.error("CRITICAL ERROR: DATA_INJECTION_FAILED", err);
    }
}

initNexus();
