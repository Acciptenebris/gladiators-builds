// ========== ГЕРОИ ДЛЯ ВЫПАДАЮЩЕГО СПИСКА ==========
const HEROES_LIST = [
    "AA", "ABADDON", "ALCHEMIST", "ASH", "AWAKENED", "AXE", "BRIST", "BROOD MOTHER", "CK", "CLINKZ", "CM", "DARK WILLOW", "DAZZLE", "DK FREEZE", "DK POISON", "DK RAGE", 
    "DOOM", "DROW RANGER", "EMBER SPIRIT", "ES", "FLAMEBORN", "GRIMSTROKE", "GUITARIST", "HOODWINK", "HUSKAR", "JUGGER", "KEZ", "KUNKKA", "LC", "LESHRAC", "LICH", 
    "LIFESTEALER", "LINA", "LION", "LUNA", "LYCAN", "MAGNUS", "MARCI", "MIRANA", "MK", "MUERTA", "NECR", "NYX", "OGRE MAGI", "OMNIK", "PA", "PANGO", "PL", "PUDGE", 
    "PUGNA", "QOP", "RAZOR", "RIKI", "RINGMASTER", "SF", "SILENCER", "SKY", "SNIPER", "SPECTRE", "TA", "TIMBERSAW", "TINKER", "TINY", "TREANT", "TROLL", "UNDDYING", 
    "URSA", "VIPER", "VOID", "VOID SPIRIT", "WASTELAND GUARD", "WINDRANDGER", "WITCH DOCTOR", "YAMASHITA", "ZEUS"
];

// ========== ДАННЫЕ ГЕРОЕВ (ОБЯЗАТЕЛЬНЫЕ СТИЛИ) ==========
const HERO_REQUIRED_STYLES = {
    "AA": ["freeze"], "ABADDON": ["shields", "healing"], "ALCHEMIST": [], "ASH": ["rage"], "AWAKENED": ["attack"], "AXE": ["shields"], "BRIST": [], 
    "BROOD MOTHER": ["poison", "attack"], "CK": ["crits", "healing"], "CLINKZ": ["rage", "guards"], "CM": ["freeze"], "DARK WILLOW": ["guards"], 
    "DAZZLE": ["vulnerability", "poison"], "DOOM": ["chaos"], "DK POISON": ["poison"], "DK FREEZE": ["freeze"], "DK RAGE": ["rage"],
    "DROW RANGER": ["freeze"], "EMBER SPIRIT": ["rage"], "ES": ["crits"], "FLAMEBORN": ["chaos"], "GRIMSTROKE": ["dodge"], "GUITARIST": [], "HOODWINK": [], 
    "HUSKAR": ["rage"], "JUGGER": ["attack", "crits"], "KEZ": ["attack"], "KUNKKA": ["health"], "LC": ["shields"], "LESHRAC": ["ultimate", "health"], "LICH": ["freeze"], 
    "LIFESTEALER": ["healing"], "LINA": ["rage"], "LION": ["chaos"], "LUNA": ["attack", "ultimate"], "LYCAN": ["guards"], "MAGNUS": ["health"], "MARCI": ["attack"], 
    "MIRANA": ["guards"], "MK": [], "MUERTA": ["attack", "ultimate"], "NECR": ["healing"], "NYX": ["vulnerability"], "OGRE MAGI": ["crits", "ultimate"], "OMNIK": ["healing"], 
    "PA": ["attack", "crits"], "PANGO": ["attack", "vulnerability"], "PL": ["attack"], "PUDGE": ["health", "poison"], "PUGNA": ["guards", "healing"], "QOP": ["poison"], 
    "RAZOR": ["vulnerability"], "RIKI": ["vulnerability", "dodge"], "RINGMASTER": ["poison"], "SF": ["attack", "ultimate"], "SILENCER": ["ultimate"], "SKY": ["healing"],
    "SNIPER": ["crits"], "SPECTRE": ["dodge"], "TA": ["attack", "shields"], "TIMBERSAW": ["healing", "chaos"], "TINKER": [], "TINY": ["health"], "TREANT": ["guards"], 
    "TROLL": ["rage", "freeze"], "UNDDYING": ["healing", "health"], "URSA": ["vulnerability"], "VIPER": ["poison"], "VOID": ["attack"], 
    "VOID SPIRIT": ["shields", "vulnerability"], "WASTELAND GUARD": ["shields"], "WINDRANDGER": ["dodge"], "WITCH DOCTOR": ["healing", "vulnerability"], "YAMASHITA": ["rage"], 
    "ZEUS": ["ultimate"]
};

function getHeroRequiredStyles(heroName) { return HERO_REQUIRED_STYLES[heroName] || []; }

// ========== ДАННЫЕ СТИЛЕЙ С ИКОНКАМИ ==========
const PLAYSTYLES_DATA = [
    {id: "guards", name: "Стражи", description: "Гейские шары", icon: "icons/guards.png"},
    {id: "crits", name: "Криты", description: "Сраные проки", icon: "icons/crits.png"},
    {id: "dodge", name: "Увороты", description: "Всегда качай меня", icon: "icons/dodge.png"},
    {id: "poison", name: "Яды", description: "В начале тащу, в конце ГХ", icon: "icons/poison.png"},
    {id: "shields", name: "Щиты", description: "Без проков бесполезен", icon: "icons/shields.png"},
    {id: "healing", name: "Лечение", description: "Сильнее калечу чем лечу", icon: "icons/healing.png"},
    {id: "health", name: "Здоровье", description: "Я имба", icon: "icons/health.png"},
    {id: "vulnerability", name: "Уязвимость", description: "Файт две секунды", icon: "icons/vulnerability.png"},
    {id: "rage", name: "Ярость", description: "Не ясно зачем я нужен", icon: "icons/rage.png"},
    {id: "freeze", name: "Заморозка", description: "Удачи кастануть ульту", icon: "icons/freeze.png"},
    {id: "chaos", name: "Хаос", description: "Непонятная тема вообще", icon: "icons/chaos.png"},
    {id: "ultimate", name: "Ульта", description: "Опять гитарист в бане", icon: "icons/ultimate.png"},
    {id: "attack", name: "Атака", description: "Моя бить", icon: "icons/attack.png"}
];

// ========== БАЗОВАЯ БАЗА ДАННЫХ БИЛДОВ ==========
const DEFAULT_BUILDS = [
  {
    "hero": "AXE",
    "requiredMustHave": ["attack"],
    "desiredMustHave": ["crits"],
    "requiredMustNotHave": ["dodge", "ultimate"],
    "desiredMustNotHave": ["shields", "health", "freeze"],
    "talents": "2(1) 1 1",
    "comment": "Атака + крит/щит. Без шарда. Темп.",
    "tier": 2,
    "img": "",
    "shard": false
  }
]

const STORAGE_KEY = "buildsDatabase";

function loadBuilds() {
    try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (!savedData) return [...DEFAULT_BUILDS];
        
        const savedBuilds = JSON.parse(savedData);
        if (!Array.isArray(savedBuilds)) { localStorage.removeItem(STORAGE_KEY); return [...DEFAULT_BUILDS]; }
        
        const repairedBuilds = savedBuilds.filter(b => b && b.hero).map(build => ({
            hero: build.hero,
            requiredMustHave: Array.isArray(build.requiredMustHave) ? build.requiredMustHave : [],
            desiredMustHave: Array.isArray(build.desiredMustHave) ? build.desiredMustHave : [],
            requiredMustNotHave: Array.isArray(build.requiredMustNotHave) ? build.requiredMustNotHave : [],
            desiredMustNotHave: Array.isArray(build.desiredMustNotHave) ? build.desiredMustNotHave : [],
            talents: build.talents || '', 
            comment: build.comment || '', 
            tier: build.tier || 4, 
            img: build.img || '',
            shard: build.shard || false
        }));
        
        return repairedBuilds.length > 0 ? repairedBuilds : [...DEFAULT_BUILDS];
    } catch (error) { localStorage.removeItem(STORAGE_KEY); return [...DEFAULT_BUILDS]; }
}

let builds = loadBuilds();
let selectedDisabledStyles = [];
let editingBuildIndex = null;
let heroSearchFilter = '';

document.addEventListener("DOMContentLoaded", () => {
    renderDisabledStylesPicker(); renderBuildsList(); setupEventListeners();
});

// ========== РАСЧЕТ ЭФФЕКТИВНОСТИ БИЛДА ==========
function calculateBuildEfficiency(build, enabledStyles) {
    const heroStyles = getHeroRequiredStyles(build.hero);
    const allRequiredMustHave = [...new Set([...heroStyles, ...(build.requiredMustHave || [])])];
    
    if (!allRequiredMustHave.every(s => enabledStyles.includes(s))) return 0;
    
    const requiredConflicts = (build.requiredMustNotHave || []).filter(s => enabledStyles.includes(s));
    if (requiredConflicts.length > 0) return 0;
    
    let efficiency = 100;
    const desiredMustHaveCount = (build.desiredMustHave || []).filter(s => !enabledStyles.includes(s)).length;
    const desiredMustNotHaveCount = (build.desiredMustNotHave || []).filter(s => enabledStyles.includes(s)).length;
    const totalDesiredMismatches = desiredMustHaveCount + desiredMustNotHaveCount;
    
    for (let i = 0; i < totalDesiredMismatches; i++) { efficiency = efficiency * 0.7; }
    if (totalDesiredMismatches >= 4) return 0;
    
    return Math.round(efficiency);
}

function searchBuilds(disabledStyles) {
    const enabledStyles = PLAYSTYLES_DATA.map(x => x.id).filter(id => !disabledStyles.includes(id));
    return builds.map(build => ({ ...build, efficiency: calculateBuildEfficiency(build, enabledStyles) })).filter(build => build.efficiency > 0);
}

function renderDisabledStylesPicker() {
    const grid = document.getElementById('playstyles-grid');
    grid.innerHTML = '';
    PLAYSTYLES_DATA.forEach(ps => {
        const btn = document.createElement('button');
        btn.className = 'playstyle-btn'; btn.dataset.id = ps.id;
        btn.innerHTML = `
            <div class="playstyle-content">
                <img src="${ps.icon}" alt="${ps.name}" class="playstyle-icon">
                <div class="playstyle-text">
                    <div class="playstyle-name">${ps.name}</div>
                    <div class="playstyle-desc">${ps.description}</div>
                </div>
            </div>
        `;
        if (selectedDisabledStyles.includes(ps.id)) btn.classList.add('selected');
        if (selectedDisabledStyles.length >= 5 && !selectedDisabledStyles.includes(ps.id)) btn.classList.add('disabled');
        btn.onclick = () => { toggleDisabledStyle(ps.id); };
        grid.appendChild(btn);
    });
    document.getElementById('selection-count').textContent = selectedDisabledStyles.length;
}

function toggleDisabledStyle(id) {
    const i = selectedDisabledStyles.indexOf(id);
    if (i === -1 && selectedDisabledStyles.length < 5) selectedDisabledStyles.push(id);
    else if (i !== -1) selectedDisabledStyles.splice(i, 1);
    renderDisabledStylesPicker(); renderSearchResults();
}

function renderSelectionSlots() {
    const slots = document.getElementById('selection-slots');
    slots.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const slot = document.createElement('div');
        slot.className = 'slot'; slot.dataset.slot = i;
        if (selectedDisabledStyles[i]) {
            slot.classList.add('filled');
            const playstyle = PLAYSTYLES_DATA.find(p => p.id === selectedDisabledStyles[i]);
            slot.innerHTML = `<span class="slot-number">${i + 1}</span><span class="slot-text">${playstyle.name}</span>`;
        } else {
            slot.classList.add('empty');
            slot.innerHTML = `<span class="slot-number">${i + 1}</span><span class="slot-text">Пусто</span>`;
        }
        slots.appendChild(slot);
    }
}

function renderSearchResults() {
    renderSelectionSlots();
    const resultSection = document.getElementById('results-section');
    const buildList = document.getElementById('heroes-list');
    buildList.innerHTML = '';
    if (selectedDisabledStyles.length === 0) { resultSection.style.display = "none"; return; }
    const results = searchBuilds(selectedDisabledStyles);
    resultSection.style.display = "block";
    if (results.length === 0) { buildList.innerHTML = `<div class="hero-card"><div class="hero-name">Нет подходящих билдов</div></div>`; return; }
    
    results.sort((a, b) => a.efficiency !== b.efficiency ? b.efficiency - a.efficiency : (a.tier || 4) - (b.tier || 4));
    results.forEach((build) => { buildList.appendChild(buildCardView(build)); });
}

function buildCardView(build) {
    const realIndex = builds.findIndex(b => b.hero === build.hero && JSON.stringify(b.requiredMustHave) === JSON.stringify(build.requiredMustHave));
    const el = document.createElement('div');
    el.className = 'hero-card hero-card-wide';

    let imgHtml = build.img ? `<div class="build-img"><img src="${build.img}" alt="${build.hero}" loading="lazy"></div>` : `<div class="build-img build-img-empty"><span>Нет фото</span></div>`;

    // Добавляем шард справа от аватарки
    if (build.shard) {
        imgHtml += `<div class="shard-indicator active" title="Шард"><img src="aghanims_shard.png" alt="Shard"></div>`;
    } else {
        imgHtml += `<div class="shard-indicator" title="Без шарда"><img src="aghanims_shard.png" alt="No Shard"></div>`;
    }

    let efficiencyClass = 'efficiency-100';
    if (build.efficiency <= 25) efficiencyClass = 'efficiency-low';
    else if (build.efficiency <= 50) efficiencyClass = 'efficiency-medium';
    else if (build.efficiency < 100) efficiencyClass = 'efficiency-high';

    const heroStyles = getHeroRequiredStyles(build.hero);
    const allRequiredMustHave = [...new Set([...heroStyles, ...(build.requiredMustHave || [])])];
    const allMustHave = [...allRequiredMustHave, ...(build.desiredMustHave || [])];
    const allMustNotHave = [...(build.requiredMustNotHave || []), ...(build.desiredMustNotHave || [])];

    el.innerHTML = `
        <div class="build-image-section">
            ${imgHtml}
        </div>
        <div class="build-content">
            <div class="build-header">
                <div class="hero-name">${build.hero}
                    <span class="tier-badge tier-badge-${build.tier||4}" title="Тир билда">${build.tier||4}</span>
                </div>
                <div class="efficiency-badge ${efficiencyClass}" title="Эффективность билда">${build.efficiency}%</div>
            </div>
            <div class="talents-line">Таланты: ${build.talents || ''}</div>
            <div class="style-row"><span style="color:#49d;">+ </span>${allMustHave.map(st => styleName(st)).join(', ') || '-'}</div>
            <div class="style-row"><span style="color:#f55;">– </span>${allMustNotHave.map(st => styleName(st)).join(', ') || '-'}</div>
            <div class="build-comment">${build.comment || ''}</div>
            <div class="build-actions">
                <button class="copy-btn" onclick="copyBuild(${realIndex})" title="Копировать билд">📋</button>
                <button class="edit-btn" onclick="editBuild(${realIndex})">✏️ Редактировать</button>
                <button class="delete-btn" onclick="deleteBuild(${realIndex})">🗑️ Удалить</button>
            </div>
        </div>`;
    return el;
}

function styleName(id) { let found = PLAYSTYLES_DATA.find(st => st.id === id); return found ? found.name : id; }

function renderBuildsList() {
    const buildsList = document.getElementById('all-builds-list');
    const totalSpan = document.getElementById('total-heroes');
    buildsList.innerHTML = '';
    
    let filteredBuilds = heroSearchFilter.trim() ? builds.filter(b => b.hero && b.hero.toLowerCase().includes(heroSearchFilter.toLowerCase())) : builds;
    totalSpan.textContent = `${filteredBuilds.length}${heroSearchFilter.trim() ? ` из ${builds.length}` : ''}`;
    
    const indexedBuilds = filteredBuilds.map(b => ({ build: b, originalIndex: builds.indexOf(b) }));
    indexedBuilds.sort((a, b) => (a.build.tier || 4) - (b.build.tier || 4));
    
    if (indexedBuilds.length === 0) {
        buildsList.innerHTML = `<div style="text-align:center;color:#888;padding:20px;">${heroSearchFilter.trim() ? 'Нет билдов для этого героя' : 'Нет билдов в базе'}</div>`;
        return;
    }
    
    indexedBuilds.forEach(({build, originalIndex}) => {
        const el = document.createElement('div');
        el.className = 'hero-item build-item';
        let imgHtml = build.img ? `<div class="build-img-mini"><img src="${build.img}" alt="" loading="lazy"></div>` : '';
        
        const heroStyles = getHeroRequiredStyles(build.hero);
        const allRequiredMustHave = [...new Set([...heroStyles, ...(build.requiredMustHave || [])])];
        const allMustHave = [...allRequiredMustHave, ...(build.desiredMustHave || [])];
        const allMustNotHave = [...(build.requiredMustNotHave || []), ...(build.desiredMustNotHave || [])];
        
        const shardBadge = build.shard ? '<span class="shard-badge" title="С шардом">💎</span>' : '';
        
        el.innerHTML = `<div class="build-main-info"><div class="build-hero-name">${imgHtml}${build.hero || '(без имени)'}
          <span class="tier-badge tier-badge-${build.tier||4}" title="Тир">${build.tier||4}</span>${shardBadge}</div>
          <div class="build-talents">${build.talents ? `Таланты: ${build.talents}` : ''}</div></div>
          <div class="build-styles"><div class="styles-must-have">+ ${allMustHave.map(styleName).join(', ') || 'нет'}</div>
          <div class="styles-must-not">– ${allMustNotHave.map(styleName).join(', ') || 'нет'}</div></div>
          <div class="build-comment">${build.comment || ''}</div>
          <div class="build-actions">
              <button class="copy-btn" onclick="copyBuild(${originalIndex})" title="Копировать билд">📋</button>
              <button class="edit-btn" onclick="editBuild(${originalIndex})" title="Редактировать">✏️</button>
              <button class="delete-btn" onclick="deleteBuild(${originalIndex})" title="Удалить">🗑️</button>
          </div>`;
        buildsList.appendChild(el);
    });
}

function showBuildFormModal(build, title) {
    let modal = document.querySelector('.modal-overlay');
    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `<div class="modal-content"><div class="modal-header"><h3>Создание билда</h3>
            <button class="close-btn" onclick="closeModal()">&times;</button></div><form id="build-form">
            <div class="row-inputs">
                <div class="form-field"><label>Герой:</label>
                    <select id="build-hero" required><option value="">Выберите героя</option>
                        ${HEROES_LIST.map(hero => `<option value="${hero}">${hero}</option>`).join('')}</select>
                </div>
                <div class="form-field"><label>Таланты:</label><input type="text" id="build-talents" placeholder="1 2 1"></div>
                <div class="form-field"><label>Тир:</label><select id="build-tier">
                    <option value="1">1 - Имба</option><option value="2">2 - Хорошо</option>
                    <option value="3">3 - Норм</option><option value="4">4 - Так себе</option></select>
                </div>
                <div class="form-field">
                    <label>Шард:</label>
                    <button type="button" id="shard-toggle" class="shard-toggle-btn">
                        <img src="aghanims_shard.png" alt="Shard">
                        <span>ВЫКЛ</span>
                    </button>
                </div>
            </div>
            <div class="hero-required-info" id="hero-required-info" style="display:none;margin-bottom:20px;padding:15px;background:rgba(212,175,55,0.1);border:2px solid #d4af37;border-radius:10px;">
                <div style="color:#d4af37;font-weight:bold;margin-bottom:8px;">🔒 Обязательные стили героя:</div>
                <div id="hero-required-list" style="color:#fff;font-size:1.1rem;"></div></div>
            <div class="form-field"><label>Нужные стили:</label>
                <div class="styles-instruction">Клик = обязательно(зеленый) ✓✓ | Двойной клик = желательно(синий) ✓ | Тройной клик = нейтрально</div>
                <div class="edit-styles-grid" id="required-styles-grid">
                    ${PLAYSTYLES_DATA.map(style => `<button type="button" class="edit-style-btn required-style-btn" data-style-id="${style.id}">${style.name}</button>`).join('')}
                </div></div>
            <div class="form-field"><label>Не нужные стили:</label>
                <div class="styles-instruction">Клик = Запрещено(красный) ✗✗ | Двойной клик = нежелательно(оранжевый) ✗ | Тройной клик = нейтрально</div>
                <div class="edit-styles-grid" id="desired-styles-grid">
                    ${PLAYSTYLES_DATA.map(style => `<button type="button" class="edit-style-btn desired-style-btn" data-style-id="${style.id}">${style.name}</button>`).join('')}
                </div></div>
            <div class="form-field"><label>Комментарий:</label><textarea id="build-comment" rows="3"></textarea></div>
            <div class="form-field"><label>Картинка (URL):</label><input type="url" id="build-img" placeholder="https://..."></div>
            <div class="modal-footer"><button type="submit" class="save-btn">Сохранить</button>
                <button type="button" class="cancel-btn" onclick="closeModal()">Отмена</button></div></form></div>`;
        document.body.appendChild(modal);
        
        // Обработчик кнопки шарда
        const shardToggle = modal.querySelector('#shard-toggle');
        shardToggle.onclick = function() {
            this.classList.toggle('active');
            this.querySelector('span').textContent = this.classList.contains('active') ? 'ВКЛ' : 'ВЫКЛ';
        };
        
        document.getElementById('build-hero').onchange = function() { updateHeroRequiredInfo(this.value); updateStyleButtons(); };
        
        modal.querySelectorAll('.required-style-btn').forEach(btn => {
            btn.onclick = function() {
                const heroStyles = getHeroRequiredStyles(document.getElementById('build-hero').value);
                if (heroStyles.includes(this.dataset.styleId)) return;
                
                if (!this.classList.contains('selected')) {
                    this.classList.add('selected'); this.dataset.requirement = 'must';
                    this.style.background = '#27ae60'; this.style.borderColor = '#27ae60'; this.style.color = '#fff';
                } else if (this.dataset.requirement === 'must') {
                    this.dataset.requirement = 'desired';
                    this.style.background = '#3498db'; this.style.borderColor = '#3498db';
                } else {
                    this.classList.remove('selected'); delete this.dataset.requirement;
                    this.style.background = ''; this.style.borderColor = ''; this.style.color = '';
                }
            };
        });
        
        modal.querySelectorAll('.desired-style-btn').forEach(btn => {
            btn.onclick = function() {
                if (!this.classList.contains('selected')) {
                    this.classList.add('selected'); this.dataset.requirement = 'not';
                    this.style.background = '#e74c3c'; this.style.borderColor = '#e74c3c'; this.style.color = '#fff';
                } else if (this.dataset.requirement === 'not') {
                    this.dataset.requirement = 'undesired';
                    this.style.background = '#e67e22'; this.style.borderColor = '#e67e22';
                } else {
                    this.classList.remove('selected'); delete this.dataset.requirement;
                    this.style.background = ''; this.style.borderColor = ''; this.style.color = '';
                }
            };
        });
        
        modal.querySelector('#build-form').onsubmit = function(e) { e.preventDefault(); saveBuild(); };
        modal.onclick = function(e) { if (e.target === modal) closeModal(); };
    }
    
    modal.querySelector('.modal-header h3').textContent = title;
    modal.querySelector('#build-hero').value = build.hero || '';
    modal.querySelector('#build-talents').value = build.talents || '';
    modal.querySelector('#build-comment').value = build.comment || '';
    modal.querySelector('#build-tier').value = build.tier || 4;
    modal.querySelector('#build-img').value = build.img || '';
    
    // Устанавливаем состояние шарда
    const shardToggle = modal.querySelector('#shard-toggle');
    if (build.shard) {
        shardToggle.classList.add('active');
        shardToggle.querySelector('span').textContent = 'ВКЛ';
    } else {
        shardToggle.classList.remove('active');
        shardToggle.querySelector('span').textContent = 'ВЫКЛ';
    }
    
    updateHeroRequiredInfo(build.hero || '');
    
    modal.querySelectorAll('.edit-style-btn').forEach(btn => {
        btn.classList.remove('selected'); delete btn.dataset.requirement;
        btn.style.background = ''; btn.style.borderColor = ''; btn.style.color = '';
        btn.style.pointerEvents = ''; btn.style.opacity = ''; btn.style.fontWeight = '';
    });
    
    const heroStyles = getHeroRequiredStyles(build.hero || '');
    heroStyles.forEach(styleId => {
        const btn = modal.querySelector(`.required-style-btn[data-style-id="${styleId}"]`);
        if (btn) {
            btn.classList.add('selected'); btn.dataset.requirement = 'must';
            btn.style.background = '#d4af37'; btn.style.borderColor = '#d4af37'; btn.style.color = '#000';
            btn.style.fontWeight = 'bold'; btn.style.pointerEvents = 'none'; btn.style.opacity = '0.8';
        }
    });
    
    (build.requiredMustHave || []).forEach(styleId => {
        if (!heroStyles.includes(styleId)) {
            const btn = modal.querySelector(`.required-style-btn[data-style-id="${styleId}"]`);
            if (btn) {
                btn.classList.add('selected'); btn.dataset.requirement = 'must';
                btn.style.background = '#27ae60'; btn.style.borderColor = '#27ae60'; btn.style.color = '#fff';
            }
        }
    });
    
    (build.desiredMustHave || []).forEach(styleId => {
        const btn = modal.querySelector(`.required-style-btn[data-style-id="${styleId}"]`);
        if (btn) {
            btn.classList.add('selected'); btn.dataset.requirement = 'desired';
            btn.style.background = '#3498db'; btn.style.borderColor = '#3498db'; btn.style.color = '#fff';
        }
    });
    
    (build.requiredMustNotHave || []).forEach(styleId => {
        const btn = modal.querySelector(`.desired-style-btn[data-style-id="${styleId}"]`);
        if (btn) {
            btn.classList.add('selected'); btn.dataset.requirement = 'not';
            btn.style.background = '#e74c3c'; btn.style.borderColor = '#e74c3c'; btn.style.color = '#fff';
        }
    });
    
    (build.desiredMustNotHave || []).forEach(styleId => {
        const btn = modal.querySelector(`.desired-style-btn[data-style-id="${styleId}"]`);
        if (btn) {
            btn.classList.add('selected'); btn.dataset.requirement = 'undesired';
            btn.style.background = '#e67e22'; btn.style.borderColor = '#e67e22'; btn.style.color = '#fff';
        }
    });
    
    modal.style.display = 'flex';
}

function updateHeroRequiredInfo(heroName) {
    const infoDiv = document.getElementById('hero-required-info');
    const listDiv = document.getElementById('hero-required-list');
    
    if (!heroName) { infoDiv.style.display = 'none'; return; }
    
    const heroStyles = getHeroRequiredStyles(heroName);
    if (heroStyles.length > 0) {
        infoDiv.style.display = 'block';
        listDiv.textContent = heroStyles.map(styleName).join(', ');
    } else { infoDiv.style.display = 'none'; }
}

function updateStyleButtons() {
    const heroName = document.getElementById('build-hero').value;
    const heroStyles = getHeroRequiredStyles(heroName);
    
    document.querySelectorAll('.required-style-btn').forEach(btn => {
        const styleId = btn.dataset.styleId;
        if (heroStyles.includes(styleId)) {
            btn.classList.add('selected'); btn.dataset.requirement = 'must';
            btn.style.background = '#d4af37'; btn.style.borderColor = '#d4af37'; btn.style.color = '#000';
            btn.style.fontWeight = 'bold'; btn.style.pointerEvents = 'none'; btn.style.opacity = '0.8';
        } else {
            btn.style.pointerEvents = ''; btn.style.opacity = '';
        }
    });
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) modal.style.display = 'none';
}

function saveBuild() {
    const hero = document.getElementById('build-hero').value.trim();
    const talents = document.getElementById('build-talents').value.trim();
    const comment = document.getElementById('build-comment').value.trim();
    const tier = parseInt(document.getElementById('build-tier').value);
    const img = document.getElementById('build-img').value.trim();
    const shard = document.getElementById('shard-toggle').classList.contains('active');
    
    if (!hero) { alert('Выберите героя!'); return; }
    
    const requiredMustHave = [], desiredMustHave = [], requiredMustNotHave = [], desiredMustNotHave = [];
    
    document.querySelectorAll('.required-style-btn').forEach(btn => {
        const styleId = btn.dataset.styleId;
        const heroStyles = getHeroRequiredStyles(hero);
        if (heroStyles.includes(styleId)) return;
        
        if (btn.dataset.requirement === 'must') requiredMustHave.push(styleId);
        else if (btn.dataset.requirement === 'desired') desiredMustHave.push(styleId);
    });
    
    document.querySelectorAll('.desired-style-btn').forEach(btn => {
        const styleId = btn.dataset.styleId;
        if (btn.dataset.requirement === 'not') requiredMustNotHave.push(styleId);
        else if (btn.dataset.requirement === 'undesired') desiredMustNotHave.push(styleId);
    });
    
    const newBuild = { hero, requiredMustHave, desiredMustHave, requiredMustNotHave, desiredMustNotHave, talents, comment, tier, img, shard };
    
    if (editingBuildIndex !== null) { builds[editingBuildIndex] = newBuild; alert('Билд обновлен!'); }
    else { builds.push(newBuild); alert('Билд добавлен!'); }
    
    persist(); renderBuildsList(); renderSearchResults(); closeModal(); editingBuildIndex = null;
}

function showAddBuildModal() {
    editingBuildIndex = null;
    showBuildFormModal({ hero: '', requiredMustHave: [], desiredMustHave: [], requiredMustNotHave: [], desiredMustNotHave: [], talents: '', comment: '', tier: 4, img: '', shard: false }, 'Создание нового билда');
}

window.copyBuild = function(idx) {
    if (!builds[idx]) { alert('Билд не найден!'); return; }
    const originalBuild = builds[idx];
    const copiedBuild = {
        hero: originalBuild.hero,
        requiredMustHave: [...originalBuild.requiredMustHave],
        desiredMustHave: [...originalBuild.desiredMustHave],
        requiredMustNotHave: [...originalBuild.requiredMustNotHave],
        desiredMustNotHave: [...originalBuild.desiredMustNotHave],
        talents: originalBuild.talents,
        comment: originalBuild.comment ? `${originalBuild.comment} (копия)` : '(копия)',
        tier: originalBuild.tier,
        img: originalBuild.img,
        shard: originalBuild.shard
    };
    editingBuildIndex = null;
    showBuildFormModal(copiedBuild, `Копирование билда: ${originalBuild.hero}`);
}

window.editBuild = function(idx) {
    if (!builds[idx]) return;
    editingBuildIndex = idx;
    showBuildFormModal(builds[idx], `Редактирование билда: ${builds[idx].hero}`);
}

window.deleteBuild = function(idx) {
    if (!builds[idx]) return;
    if (confirm(`Удалить билд для ${builds[idx].hero}?`)) {
        builds.splice(idx, 1); persist(); renderBuildsList(); renderSearchResults();
    }
}

function persist() { localStorage.setItem(STORAGE_KEY, JSON.stringify(builds)); }

function exportBuilds() {
    try {
        const data = JSON.stringify(builds, null, 2);
        const blob = new Blob([data], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'builds.json';
        document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    } catch (error) { alert('Ошибка экспорта!'); }
}

function importBuilds() {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = '.json';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const importedBuilds = JSON.parse(e.target.result);
                    if (Array.isArray(importedBuilds)) {
                        builds = importedBuilds; persist(); renderBuildsList(); renderSearchResults(); alert('Билды импортированы!');
                    } else { alert('Неверный формат файла!'); }
                } catch (error) { alert('Ошибка импорта!'); }
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

function setupEventListeners() {
    document.getElementById('reset-btn').addEventListener('click', function() {
        selectedDisabledStyles = []; renderDisabledStylesPicker(); renderSearchResults();
    });
    
    const addBtn = document.getElementById('add-build-btn');
    if (addBtn) addBtn.onclick = showAddBuildModal;
    
    const exportBtn = document.getElementById('export-btn');
    if (exportBtn) exportBtn.onclick = exportBuilds;
    
    const importBtn = document.getElementById('import-btn');
    if (importBtn) importBtn.onclick = importBuilds;
    
    const restoreBtn = document.getElementById('restore-defaults-btn');
    if (restoreBtn) {
        restoreBtn.onclick = function() {
            if (confirm('Восстановить базовые билды? Они добавятся к существующим.')) {
                const missingDefaults = DEFAULT_BUILDS.filter(defaultBuild => 
                    !builds.some(build => build.hero === defaultBuild.hero && JSON.stringify(build.requiredMustHave) === JSON.stringify(defaultBuild.requiredMustHave))
                );
                if (missingDefaults.length > 0) {
                    builds = builds.concat(missingDefaults); persist(); renderBuildsList(); renderSearchResults();
                    alert(`Добавлено ${missingDefaults.length} базовых билдов!`);
                } else { alert('Все базовые билды уже есть в базе!'); }
            }
        }
    }
    
    const resetDbBtn = document.getElementById('reset-db');
    if (resetDbBtn) {
        resetDbBtn.onclick = function() {
            if (confirm('Вы уверены, что хотите удалить ВСЕ билды? Это действие необратимо!')) {
                builds = []; persist(); renderBuildsList(); renderSearchResults(); alert('Все билды удалены!');
            }
        }
    }
    
    const heroSearch = document.getElementById('hero-search');
    if (heroSearch) {
        heroSearch.addEventListener('input', function() { heroSearchFilter = this.value; renderBuildsList(); });
    }
    
    const clearSearch = document.getElementById('clear-search');
    if (clearSearch) {
        clearSearch.addEventListener('click', function() {
            heroSearchFilter = '';
            const searchInput = document.getElementById('hero-search');
            if (searchInput) searchInput.value = '';
            renderBuildsList();
        });
    }
}

