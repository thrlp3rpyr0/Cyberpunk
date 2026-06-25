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
        DOM.clock.textContent = now.toTimeString().split(' ')[0];

        // Cálculo de Uptime (Tiempo activo desde que cargó)
        const diffMs = Date.now() - startTime;
        const diffMins = Math.floor(diffMs / 60000);
        const diffSecs = Math.floor((diffMs % 60000) / 1000);
        DOM.uptime.textContent = `UPTIME: ${String(diffMins).padStart(2, '0')}:${String(diffSecs).padStart(2, '0')}`;
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

        DOM.bootProgress.style.width = `${progress}%`;

        // Cambio de fases de texto en el HUD de arranque
        if (currentPhaseIdx < phases.length && progress >= phases[currentPhaseIdx].limit) {
            DOM.bootText.textContent = phases[currentPhaseIdx].text;
            currentPhaseIdx++;
        }

        if (progress === 100) {
            clearInterval(bootInterval);
            setTimeout(() => {
                // Apagamos pantalla de carga y encendemos Login
                DOM.bootScreen.classList.add('hidden');
                DOM.authScreen.classList.remove('hidden');
                pushLogToTerminal("SYS_BOOT: INITIALIZATION COMPLETE. STANDING BY FOR BIOMETRIC LINK.");
            }, 600);
        }
    }, 80);
}

// 🔒 SISTEMA DE AUTENTICACIÓN (LOGIN)
function setupAuthentication() {
    DOM.authForm.addEventListener('submit', () => {
        const userValue = DOM.authUserInput.value.trim();
        const passValue = DOM.authPassInput.value;

        if (userValue === AUTH_CONFIG.operatorId && passValue === AUTH_CONFIG.passphrase) {
            // Acceso Concedido: Desbloqueamos la base de datos
            DOM.authScreen.classList.add('hidden');
            DOM.nexusMain.classList.remove('hidden');
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
    const time = new Date().toTimeString().split(' ')[0];
    const logLine = document.createElement('div');
    logLine.textContent = `> [${time}] ${message}`;
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
    // Elementos internos de la ficha para pruebas de flujo
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

            // 4. Actualizar título del Viewport Principal
            NAV_DOM.currentTitle.textContent = `NEXUS DATABASE // ${categoryName}`;

            // 5. Flujo Visual: Retirar prompt de espera y desplegar ficha vacía lista para el JSON
            NAV_DOM.promptScreen.classList.add('hidden');
            NAV_DOM.entityView.classList.remove('hidden');

            // Simulación de carga en ficha técnica antes de conectar la Base de Datos JSON
            NAV_DOM.entCategory.textContent = category.toUpperCase();
            NAV_DOM.entName.textContent = `STREAMING ${category.toUpperCase()} CORE...`;

            // Enviar log de rastreo a la terminal derecha
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
            
            // NOTA: En la Parte 5, aquí incluiremos la lógica que oculta/muestra los contenedores
            // específicos de Atributos, Historial o Modificaciones de la ficha.
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
    // Valores base operativos militares
    let baseRam = 4.2;
    let basePower = 88;

    setInterval(() => {
        // 1. Fluctuación de la CPU (Cálculo táctico entre 3% y 24% en reposo)
        const currentCpu = Math.floor(Math.random() * 21) + 3;
        HUD_DOM.cpuLoad.textContent = `${String(currentCpu).padStart(2, '0')}%`;

        // 2. Fluctuación de Ancho de Banda (Simula descargas de datos del Nexus)
        const currentBandwidth = (Math.random() * 8 + 1).toFixed(1);
        HUD_DOM.bandwidthLoad.textContent = `${currentBandwidth} MB/S`;

        // 3. Fluctuación sutil de RAM (Variación microscópica de consumo)
        const ramDrift = (Math.random() * 0.2 - 0.1);
        const currentRam = Math.min(Math.max(baseRam + ramDrift, 3.8), 5.4).toFixed(1);
        HUD_DOM.ramLoad.textContent = `${currentRam} GB`;

        // 4. Fluctuación Térmica correlacionada con el uso de la CPU
        const targetThermal = Math.min(30 + currentCpu, 95);
        HUD_DOM.thermalFill.style.width = `${targetThermal}%`;

        // 5. Degradación e inyección de energía lenta en la APU (Batería)
        if (Math.random() > 0.85) {
            basePower = basePower + (Math.random() > 0.5 ? 1 : -1);
            basePower = Math.min(Math.max(basePower, 80), 100);
            HUD_DOM.powerFill.style.width = `${basePower}%`;
        }

    }, 2000); // Actualización de ciclos cada 2 segundos
}

/* ☠ SISTEMA DEFENSIVO: DISPARADOR DE INTENSIFICACIÓN DE BLACK ICE
   Esta función la llamaremos mediante eventos de hackeo o alertas críticas */
function triggerBlackIceAlert(iceName = "RAVEN_DAEMON.EXE") {
    // Cambiar clases CSS del monitor para detonar animaciones de pulso rojo (Bloque 6 CSS)
    HUD_DOM.iceMonitor.classList.remove('ice-safe');
    HUD_DOM.iceMonitor.classList.add('ice-danger');
    
    // Inyección de cadenas de datos en el monitor de intrusión
    HUD_DOM.iceStatusText.textContent = "CRITICAL_INTRUSION";
    HUD_DOM.iceType.textContent = iceName.toUpperCase();

    // Notificaciones y logs de combate en red
    pushLogToTerminal(`🚨 KERNEL_ALERT: COUNTER-INTRUSION DETECTED! BLACK ICE [${iceName.toUpperCase()}] IS LOCKING CORES.`);
}

// Apagar alerta y restablecer estado seguro de red
function clearBlackIceAlert() {
    HUD_DOM.iceMonitor.classList.remove('ice-danger');
    HUD_DOM.iceMonitor.classList.add('ice-safe');
    HUD_DOM.iceStatusText.textContent = "ICE_CLEAN";
    HUD_DOM.iceType.textContent = "NONE DETECTED";
    pushLogToTerminal("SYS_MAINT: BLACK ICE PURGED SUCCESSFULLY. DEFENSIIVE NODES RESTORED.");
}

// INYECCIÓN EN EL FILTRO DE CONTROL DOM
document.addEventListener("DOMContentLoaded", () => {
    startHardwareSimulation();
    
    // Simulación de prueba: Descomenta la línea de abajo si quieres ver el pulso rojo de Black ICE desde el inicio
    // triggerBlackIceAlert("Hellhound_V3");
});

/* ==========================================================================
   NEON HEAVEN // NEXUS DATABASE
   PARTE 4 — JAVASCRIPT (BLOQUE 4: DRAG & DROP, AUDIO MATRIX & ALERTS)
   ========================================================================== */

// REGISTRO DE SELECTORES COMPLEMENTARIOS
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

    // Escuchar el clic en la cabecera de la ventana
    document.querySelectorAll('.window-header').forEach(header => {
        header.addEventListener('mousedown', (e) => {
            // Evitar conflictos con el botón de cerrar
            if (e.target.classList.contains('win-close')) return;

            activeWindow = header.parentElement;
            
            // Traer la ventana al frente (Z-Index más alto)
            document.querySelectorAll('.floating-window').forEach(win => win.style.zIndex = "1000");
            activeWindow.style.zIndex = "1050";

            // Calcular la distancia entre el mouse y la esquina de la ventana
            const rect = activeWindow.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;

            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        });
    });

    function mouseMoveHandler(e) {
        if (!activeWindow) return;
        
        // Calcular nuevas coordenadas en la pantalla
        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        // Limitar el movimiento dentro de la pantalla para evitar perder la ventana
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

// 🔊 CONTROLADOR DE CONFIGURACIÓN DE AUDIO (CONSOLA DE MEZCLA)
function setupAudioMatrix() {
    SYS_DOM.audioSliders.forEach(slider => {
        slider.addEventListener('input', (e) => {
            const channel = e.target.id.toUpperCase();
            const volume = e.target.value;
            // Registra el cambio en la terminal de logs
            if (Math.random() > 0.7) { // Evita saturar el log al deslizar rápido
                pushLogToTerminal(`AUDIO_MIX: CHANNEL [${channel}] VOLUME DEVIATION AT ${volume}%.`);
            }
        });
    });
}

// 🚨 COMPONENTE DE GENERACIÓN DE NOTIFICACIONES DINÁMICAS
function spawnNotification(message, type = "success") {
    const alertDiv = document.createElement('div');
    alertDiv.className = `notification ${type}`;
    alertDiv.textContent = message.toUpperCase();

    SYS_DOM.notificationContainer.appendChild(alertDiv);
    
    // Enviar rastro al terminal log
    pushLogToTerminal(`NOTIFY_CORE: STATUS_${type.toUpperCase()} // ${message}`);

    // Auto-destrucción de la notificación flotante tras 4 segundos
    setTimeout(() => {
        alertDiv.style.opacity = '0';
        alertDiv.style.transition = 'opacity 0.5s ease';
        setTimeout(() => alertDiv.remove(), 500);
    }, 4000);
}

// DISPARADOR LOGÍSTICO COMPLETO DEL S.O.
document.addEventListener("DOMContentLoaded", () => {
    setupWindowDragAndDrop();
    setupWindowControls();
    setupAudioMatrix();

    // Pequeño retardo para lanzar una notificación de bienvenida tras el login
    setTimeout(() => {
        if (!document.getElementById('nexus').classList.contains('hidden')) {
            spawnNotification("Nexus Cyber-Defense Core Active", "success");
        }
    }, 2000);
});

/* ==========================================================================
   NEON HEAVEN // NEXUS DATABASE
   PARTE 5 — MOTOR DE INYECCIÓN DE DATOS JSON DINEÁMICOS
   ========================================================================== */

let localDatabaseCache = null; // Guardará los datos del JSON una vez descargados

// 📥 FUNCIÓN DE DESCARGA: CONECTAR ARCHIVO JSON
async function fetchNexusDatabase() {
    try {
        pushLogToTerminal("NET_REQ: ESTABLISHING JSON DATASTREAM LINK...");
        // Buscamos el archivo local que acabas de crear
        const response = await fetch('./database.json');
        
        if (!response.ok) throw new Error("HTTP_ERROR // UNABLE TO REACH DATABASE.JSON");
        
        localDatabaseCache = await response.json();
        pushLogToTerminal("NET_RES: DATABASE DOWNLOAD COMPLETE. PARSING NODES SUCCESSFUL.");
    } catch (error) {
        console.error(error);
        pushLogToTerminal(`❌ KERNEL_ERR: FETCH FAILED // ${error.message}`);
    }
}

// 🏛️ INYECTOR EN EL VIEWPORT CENTRAL
function renderEntityData(category, index = 0) {
    if (!localDatabaseCache || !localDatabaseCache[category]) {
        pushLogToTerminal(`⚠️ DB_WARN: CATEGORY [${category.toUpperCase()}] CONTENT IS CURRENTLY ENCRYPTED OR EMPTY.`);
        return;
    }

    const entity = localDatabaseCache[category][index];
    if (!entity) return;

    // 1. Inyectar Textos Básicos e Identificadores
    document.getElementById('ent-name').textContent = entity.name.toUpperCase();
    document.getElementById('ent-serial').textContent = entity.serial;
    document.getElementById('ent-tag').textContent = entity.tag;
    document.getElementById('ent-desc').textContent = entity.description;

    // 2. Control Visual de la Imagen/Holograma Táctico
    const imgElement = document.getElementById('entity-image');
    if (entity.image) {
        imgElement.src = entity.image;
        imgElement.classList.remove('hidden');
    } else {
        imgElement.classList.add('hidden'); // Ocultar si la entidad no requiere imagen (ej: Ciberware)
    }

    // 3. Inyectar Barras de Atributos Dinámicas con porcentajes exactos del JSON
    const barsContainer = document.getElementById('attribute-bars');
    barsContainer.innerHTML = ""; // Limpiar barras anteriores

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

    // 4. Inyectar Slots de Modificaciones de Equipamiento
    const modsGrid = document.querySelector('.mods-grid');
    modsGrid.innerHTML = ""; // Limpiar slots anteriores

    entity.mods.forEach(modName => {
        const modCard = document.createElement('div');
        // Si el texto dice "Slot Vacío", le damos un diseño diferente
        if (modName.toLowerCase().includes('vacío') || modName.toLowerCase().includes('empty')) {
            modCard.className = "mod-card empty";
            modCard.textContent = "[ EMPTY_SLOT ]";
        } else {
            modCard.className = "mod-card";
            modCard.textContent = modName;
        }
        modsGrid.appendChild(modCard);
    });

    pushLogToTerminal(`DB_RENDER: ENTITY [${entity.id.toUpperCase()}] LOADED INTO VIRTUAL MEMORY BUFFER.`);
}

/* 🔄 ACOPLAMIENTO CON TU MENÚ EXISTENTE
   Modificamos el listener del menú lateral para que use el inyector JSON */
function upgradeMenuWithJSON() {
    const menuButtons = document.querySelectorAll('.database-menu .menu-item');
    
    menuButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const category = e.currentTarget.getAttribute('data-category');
            
            // Si la categoría tiene datos en el JSON, la inyectamos de inmediato
            if (localDatabaseCache && localDatabaseCache[category]) {
                setTimeout(() => {
                    renderEntityData(category, 0); // Cargamos el primer registro por defecto
                }, 150); // Pequeño retraso de procesamiento estético
            }
        });
    });
}

// INICIALIZACIÓN COMPLEMENTARIA
document.addEventListener("DOMContentLoaded", async () => {
    await fetchNexusDatabase(); // Descargar el archivo al encender la computadora
    upgradeMenuWithJSON();      // Enlazar los botones con el inyector
});
