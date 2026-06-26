/* ==========================================================================
   NEON HEAVEN // SYSTEMS AND DATA MANAGEMENT KERNEL // CORE v3.0 PRO
   ========================================================================== */

// 💾 MEMORIA VOLÁTIL DEL CYBERDECK (ESTADO GLOBAL COMPLETO)
let localDatabaseCache = null; 
let currentCategory = "arms";  // Categoría activa inicial
let currentEntityIndex = 0;    // Índice del objeto en pantalla

// 🎛️ SELECTORES MAESTROS DEL ENTORNO GRÁFICO (HUD DOM)
const NAV_DOM = {
    loginOverlay: document.getElementById('login-screen'),
    btnLogin: document.getElementById('btn-login'),
    btnBypass: document.getElementById('btn-bypass'),
    statusMsg: document.getElementById('login-status-msg'),
    netrunnerInput: document.getElementById('netrunner-id'),
    terminalContainer: document.querySelector('.terminal-container'),
    logStream: document.getElementById('terminal-log-stream'),
    opDisplay: document.getElementById('operator-display'),
    
    // Visor Central Cores
    entName: document.getElementById('ent-name'),
    entSerial: document.getElementById('ent-serial'),
    entTag: document.getElementById('ent-tag'),
    entDesc: document.getElementById('ent-desc'),
    entImg: document.getElementById('entity-image'),
    attrContainer: document.getElementById('attribute-bars'),
    modsGrid: document.querySelector('.mods-grid'),
    
    // Adaptación del Subnet e Index Inferior
    intelStatus: document.getElementById('intel-status-val'),
    intelClass: document.getElementById('intel-class-val'),
    metaDepth: document.getElementById('meta-architecture-depth'),
    metaOverflow: document.getElementById('meta-overflow-risk'),
    metaLoad: document.getElementById('meta-deck-load'),
    metaCounter: document.getElementById('meta-countermeasures'),
    
    // Flechas del carrusel
    btnPrev: document.getElementById('nav-prev-entity'),
    btnNext: document.getElementById('nav-next-entity'),
    counter: document.getElementById('nav-entity-counter')
};

// ==========================================================================
/* 📺 PARTE 1: LOG STREAM & REAL-TIME MILITARY MONITORS (TELEMETRÍA) */
// ==========================================================================

function pushLogToTerminal(message) {
    if (!NAV_DOM.logStream) return;

    const time = new Date().toLocaleTimeString();
    const logLine = document.createElement('p');
    logLine.className = "log-line";
    logLine.innerHTML = `<span style="color: rgba(255,42,95,0.45)">[${time}]</span> <span style="color: #ff2a5f">></span> ${message}`;
    
    NAV_DOM.logStream.appendChild(logLine);
    
    // Mantener siempre el scroll al límite inferior de forma reactiva
    NAV_DOM.logStream.scrollTop = NAV_DOM.logStream.scrollHeight;

    // Control de saturación de buffer (eliminar logs viejos para optimizar memoria RAM simulada)
    if (NAV_DOM.logStream.children.length > 45) {
        NAV_DOM.logStream.removeChild(NAV_DOM.logStream.firstChild);
    }
}

// SIMULADOR DE TELEMETRÍA MILITAR FLOTANTE (VALORES ALEATORIOS CADA 2 SEGUNDOS)
function initTelemetryOscillators() {
    pushLogToTerminal("TELEMETRY: LAUNCHING HARDWARE MONITOR OSCILLATORS...");
    
    setInterval(() => {
        const cpuElement = document.getElementById('hud-cpu-usage');
        const ramElement = document.getElementById('hud-ram-usage');
        const bandElement = document.getElementById('hud-bandwidth-load');

        if (cpuElement) {
            const cpuVal = Math.floor(Math.random() * (92 - 45) + 45);
            cpuElement.textContent = `${cpuVal}%`;
            if (cpuVal > 80) cpuElement.className = "telemetry-value alert-text";
            else cpuElement.className = "telemetry-value";
        }
        if (ramElement) {
            const ramVal = (Math.random() * (14.2 - 11.8) + 11.8).toFixed(1);
            ramElement.textContent = `${ramVal} GB`;
        }
        if (bandElement) {
            const bandVal = Math.floor(Math.random() * (850 - 610) + 610);
            bandElement.textContent = `${bandVal} Mbps`;
        }
    }, 2000);
}

// CONTROLLERS PARA EL RELOJ OPERATIVO MILITAR (Uptime del Sistema)
function startUptimeClock() {
    const clockElement = document.getElementById('hud-clock-time');
    const dateElement = document.getElementById('hud-clock-date');
    
    if (!clockElement) return;

    setInterval(() => {
        const now = new Date();
        clockElement.textContent = now.toTimeString().split(' ')[0];
        if (dateElement) {
            dateElement.textContent = now.toISOString().split('T')[0].replace(/-/g, '/');
        }
    }, 1000);
}

// ==========================================================================
/* 🔐 PARTE 2: PROTOCOLO DE AUTENTICACIÓN AVANZADA (NETRUNNER BYPASS) */
// ==========================================================================

function setupAuthProtocols() {
    if (!NAV_DOM.btnLogin || !NAV_DOM.btnBypass) return;

    // Acción A: Conexión mediante credenciales válidas
    NAV_DOM.btnLogin.addEventListener('click', () => {
        const idValue = NAV_DOM.netrunnerInput.value.trim() || "CACHIRULA";
        
        NAV_DOM.statusMsg.innerHTML = `<span class="blink">></span> AUTH: EXTRACTING RSA_KEY BLOCKS FOR OPERATOR: [${idValue.toUpperCase()}]...`;
        NAV_DOM.statusMsg.style.color = "#ffcc00";
        NAV_DOM.btnLogin.disabled = true;
        NAV_DOM.btnBypass.disabled = true;

        setTimeout(() => {
            NAV_DOM.statusMsg.innerHTML = `> VERIFYING DIGITAL SIGNATURE... SUCCESS.`;
            NAV_DOM.statusMsg.style.color = "#00ff66";
            
            if (NAV_DOM.opDisplay) NAV_DOM.opDisplay.textContent = idValue.toUpperCase();

            setTimeout(() => {
                NAV_DOM.statusMsg.innerHTML = `> DIRECT_LINK ESTABLISHED. LOADING COGNITIVE HUD...`;
                setTimeout(() => {
                    executeTerminalBootSequence();
                }, 600);
            }, 500);
        }, 1400);
    });

    // Acción B: Ejecución de Fuerza Bruta / Ataque Desbordamiento (ICE BREAKER)
    NAV_DOM.btnBypass.addEventListener('click', () => {
        NAV_DOM.statusMsg.innerHTML = `<span class="blink">></span> EXPLOIT INJECTED: OVERFLOWING STACK BUFFER ON NODE_04...`;
        NAV_DOM.statusMsg.style.color = "#ff2a5f";
        NAV_DOM.btnLogin.disabled = true;
        NAV_DOM.btnBypass.disabled = true;

        let cycle = 0;
        const hackerInterval = setInterval(() => {
            cycle += 1;
            pushLogToTerminal(`⚡ ICE_BREAKER: RIPPING MILITECH DEFENSIVE LAYER NO. 0${cycle}...`);
            NAV_DOM.statusMsg.innerHTML = `> INTRUSION PROGRESS: ${cycle * 25}% // CRACKING CYBER_DECK SUITE...`;
            
            if (cycle >= 4) {
                clearInterval(hackerInterval);
                NAV_DOM.statusMsg.innerHTML = `> CRITICAL SUCCESS // WATCHDOG ICE DEACTIVATED. BYPASS INJECTED.`;
                NAV_DOM.statusMsg.style.color = "#00ff66";

                if (NAV_DOM.opDisplay) NAV_DOM.opDisplay.textContent = "CACHIRULA (BYPASS)";

                setTimeout(() => {
                    executeTerminalBootSequence();
                }, 900);
            }
        }, 450);
    });
}

function executeTerminalBootSequence() {
    if (NAV_DOM.loginOverlay) NAV_DOM.loginOverlay.classList.add('fade-out');
    if (NAV_DOM.terminalContainer) NAV_DOM.terminalContainer.classList.remove('hidden-until-auth');
    
    pushLogToTerminal("🔑 ACCESS_GRANTED: CORE WORKSTATION UNLOCKED.");
    pushLogToTerminal("🤖 CRT_SHADERS: SYNCING ANALOG SCANLINE RENDER ENGINE...");
    
    // Desplegar animaciones colaterales e iniciar contadores en tiempo real
    initTelemetryOscillators();
    startUptimeClock();
    
    // Render inicial por defecto de la sección de armas
    if (localDatabaseCache && localDatabaseCache["arms"]) {
        renderEntityData("arms", 0);
    }
}

// ==========================================================================
/* 📥 PARTE 3: CONEXIÓN REMOTA Y ALMACENAMIENTO DE NODOS (JSON BUFFER) */
// ==========================================================================

async function fetchNexusDatabase() {
    try {
        pushLogToTerminal("NET_REQ: ACQUIRING TARGET DATABASE LINK FROM MAIN SUBNET...");
        const response = await fetch('./database.json');
        
        if (!response.ok) throw new Error("HTTP_CORE_ERR // PACKETS DROP DURING DATASTREAM CONNECTION");
        
        localDatabaseCache = await response.json();
        pushLogToTerminal("NET_RES: SECURE MEMORY BUFFER DOWNLOAD COMPLETE. SYSTEM MATRIX VALIDATED.");
    } catch (error) {
        console.error(error);
        pushLogToTerminal(`❌ SYSTEM_MALFUNCTION: SYNCHRONIZATION FALLED // ${error.message}`);
    }
}

// ==========================================================================
/* 🏛️ PARTE 4: MOTOR DE EXPANSIÓN GRÁFICA MULTI-PANEL (CORE RENDER v3) */
// ==========================================================================

function renderEntityData(category, index = 0) {
    if (!localDatabaseCache || !localDatabaseCache[category]) {
        pushLogToTerminal(`⚠️ DB_WARN: ENCRYPTED SUBNET ARCHIVE IN NODE [${category.toUpperCase()}].`);
        return;
    }

    const categoryNodes = localDatabaseCache[category];
    const totalElements = categoryNodes.length;
    const entity = categoryNodes[index];
    
    if (!entity) return;

    // Actualización de punteros de navegación globales
    currentCategory = category;
    currentEntityIndex = index;

    // 1. Refrescar el contador numérico militar de paginación
    if (NAV_DOM.counter) {
        NAV_DOM.counter.textContent = `${index + 1} / ${totalElements}`;
    }

    // 2. Inyección Mecánica de Atributos de Identificación de Texto
    if (NAV_DOM.entName) NAV_DOM.entName.textContent = entity.name.toUpperCase();
    if (NAV_DOM.entSerial) NAV_DOM.entSerial.textContent = entity.serial;
    if (NAV_DOM.entTag) NAV_DOM.entTag.textContent = entity.tag;
    if (NAV_DOM.entDesc) NAV_DOM.entDesc.textContent = entity.description;

    // 3. Control y Estabilización Dinámica de Imagen Holográfica
    if (NAV_DOM.entImg) {
        if (entity.image && entity.image !== "") {
            NAV_DOM.entImg.src = entity.image;
            NAV_DOM.entImg.classList.remove('hidden');
        } else {
            NAV_DOM.entImg.classList.add('hidden');
        }
    }

    // 4. Inyector Algorítmico de Barras de Rendimiento (Reglamento Cyberpunk RED)
    if (NAV_DOM.attrContainer) {
        NAV_DOM.attrContainer.innerHTML = "";
        
        Object.entries(entity.stats).forEach(([statName, statValue]) => {
            const attrRow = document.createElement('div');
            attrRow.className = "attribute";
            attrRow.innerHTML = `
                <label>${statName.toUpperCase()}</label>
                <div class="bar">
                    <div class="fill" style="width: ${statValue}%"></div>
                </div>
            `;
            NAV_DOM.attrContainer.appendChild(attrRow);
        });
    }

    // 5. Inyector de Ranuras de Expansión / Modificaciones de Hardware
    if (NAV_DOM.modsGrid) {
        NAV_DOM.modsGrid.innerHTML = "";
        
        entity.mods.forEach(modName => {
            const modItem = document.createElement('div');
            if (modName.toLowerCase().includes('vacío') || modName.toLowerCase().includes('empty')) {
                modItem.className = "mod-card empty";
                modItem.textContent = "[ SLOT_EMPTY ]";
            } else {
                modItem.className = "mod-card";
                modItem.textContent = modName;
            }
            NAV_DOM.modsGrid.appendChild(modItem);
        });
    }

    // 6. Inyección de Campos Intermedios de Verificación (Intel Status & Class)
    if (NAV_DOM.intelStatus && entity.intel_status) NAV_DOM.intelStatus.textContent = entity.intel_status;
    if (NAV_DOM.intelClass && entity.intel_class) NAV_DOM.intelClass.textContent = entity.intel_class;

    // 7. Sincronización Avanzada con las 4 Fichas de Diagnóstico Técnico del Footer
    if (NAV_DOM.metaDepth && entity.meta_depth) NAV_DOM.metaDepth.textContent = entity.meta_depth;
    if (NAV_DOM.metaOverflow && entity.meta_overflow) NAV_DOM.metaOverflow.textContent = entity.meta_overflow;
    if (NAV_DOM.metaLoad && entity.meta_load) NAV_DOM.metaLoad.textContent = entity.meta_load;
    if (NAV_DOM.metaCounter && entity.meta_countermeasures) NAV_DOM.metaCounter.textContent = entity.meta_countermeasures;

    pushLogToTerminal(`DB_RENDER: PACKET STREAM FOR [${entity.id.toUpperCase()}] FLOODED INTO SCREEN BUFFERS.`);
}

// ==========================================================================
/* 🎛️ PARTE 5: INTERFACE ALIGNMENT & INTERACTIVE PAGINATION (LISTENERS) */
// ==========================================================================

function setupNavigationMechanics() {
    if (!NAV_DOM.btnPrev || !NAV_DOM.btnNext) return;

    // Disparador Mecánico de Flecha de Retroceso ◀
    NAV_DOM.btnPrev.addEventListener('click', () => {
        if (!localDatabaseCache || !localDatabaseCache[currentCategory]) return;
        const total = localDatabaseCache[currentCategory].length;
        
        let targetIndex = currentEntityIndex - 1;
        if (targetIndex < 0) targetIndex = total - 1; // Salto cíclico infinito al último elemento
        
        renderEntityData(currentCategory, targetIndex);
    });

    // Disparador Mecánico de Flecha de Avance ▶
    NAV_DOM.btnNext.addEventListener('click', () => {
        if (!localDatabaseCache || !localDatabaseCache[currentCategory]) return;
        const total = localDatabaseCache[currentCategory].length;
        
        let targetIndex = currentEntityIndex + 1;
        if (targetIndex >= total) targetIndex = 0; // Regreso cíclico infinito al primer elemento
        
        renderEntityData(currentCategory, targetIndex);
    });
}

function linkSidebarMenuToDatastream() {
    const menuButtons = document.querySelectorAll('.database-menu .menu-item');
    
    menuButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Eliminar clases activas de la vieja selección
            menuButtons.forEach(btn => btn.classList.remove('active'));
            
            const targetBtn = e.currentTarget;
            targetBtn.classList.add('active');
            
            const selectedCategory = targetBtn.getAttribute('data-category');
            if (localDatabaseCache && localDatabaseCache[selectedCategory]) {
                pushLogToTerminal(`NET_CHG: ROUTING SUBNET ACCESS POINTS TO NODE: [${selectedCategory.toUpperCase()}]`);
                
                // Emular retraso de latencia física de terminales analógicas retro-futuristas
                setTimeout(() => {
                    renderEntityData(selectedCategory, 0); // Desplegar siempre el primer elemento indexado
                }, 120);
            }
        });
    });
}

// ==========================================================================
/* 🖱️ PARTE 6: ALGORITMO DRAG & DROP DE VENTANAS HUD INTERACTIVAS */
// ==========================================================================

function makeHUDWindowsDraggable() {
    pushLogToTerminal("HUD_ENG: COUPLING WINDOW KINETIC DRAG LISTENERS...");
    const dragTargets = document.querySelectorAll('.draggable-hud-window');
    
    dragTargets.forEach(windowElement => {
        const titleBar = windowElement.querySelector('.window-title-bar');
        if (!titleBar) return;

        let offsetX = 0, offsetY = 0, mouseX = 0, mouseY = 0;

        titleBar.addEventListener('mousedown', (e) => {
            e.preventDefault();
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            document.onmouseup = closeDragElement;
            document.onmousemove = (event) => {
                event.preventDefault();
                offsetX = mouseX - event.clientX;
                offsetY = mouseY - event.clientY;
                mouseX = event.clientX;
                mouseY = event.clientY;
                
                windowElement.style.top = (windowElement.offsetTop - offsetY) + "px";
                windowElement.style.left = (windowElement.offsetLeft - offsetX) + "px";
            };
        });

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    });
}

// ==========================================================================
/* 🔄 INITIALIZATION EXECUTOR (DOM TRIGGER) */
// ==========================================================================

document.addEventListener("DOMContentLoaded", async () => {
    setupAuthProtocols();           // Iniciar login y exploits
    await fetchNexusDatabase();      // Conectar almacenamiento JSON
    linkSidebarMenuToDatastream();   // Acoplar botones laterales
    setupNavigationMechanics();     // Conectar flechas de carrusel ◀ ▶
    makeHUDWindowsDraggable();       // Inyectar físicas de arrastre al HUD flotante
    
    pushLogToTerminal("🚀 CORE_KERNEL: SYSTEM INITIALIZATION SUCCESSFUL. ICE BREAKER STANDBY.");
});
