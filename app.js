// ========== ГЕРОИ ДЛЯ ВЫПАДАЮЩЕГО СПИСКА ==========
const HEROES_LIST = [
    "DROW RANGER", "NYX", "TIMBERSAW", "UNDDYING", "PA", "PUGNA", "MIRANA", "LC", "PANGO", "LIFESTEALER", "HUSKAR", "MAGNUS", "ZEUS", "JUGGER", "CK", "NECR", "TINY", "YAMASHITA",
    "VOID", "AA", "DARK WILLOW", "MUERTA", "HOODWINK", "VIPER", "TINKER", "DOOM", "GRIMSTROKE", "AXE", "QOP", "MARCI", "WINDRANDGER", "TREANT", "LICH", "LYCAN", "OMNIK", "URSA",
    "SF", "SKY", "ABADDON", "RAZOR", "SPECTRE", "SNIPER", "EMBER SPIRIT", "VOID SPIRIT", "RIKI", "LUNA", "OGRE MAGI", "CM", "PUDGE", "ASH", "LINA", "KUNKKA", "DAZZLE", "AWAKENED",
    "WASTELAND GUARD", "TA", "RINGMASTER", "MK", "ES", "LION", "GUITARIST", "KEZ", "WITCH DOCTOR", "FLAMEBORN", "TROLL", "ALCHEMIST", "CLINKZ", "LESHRAC", "PL", "BRIST", "SILENCER", "BROOD MOTHER",
    "DRAGON KNIGHT"
];
// ========== ДАННЫЕ ГЕРОЕВ ==========
const HERO_REQUIRED_STYLES = {
    "DROW RANGER": ["crits", "freeze"],
    "NYX": ["vulnerability", "dodge"],
    "TIMBERSAW": ["health", "attack"],
    "UNDDYING": ["healing", "health"],
    "PA": ["attack", "crits"],
    "PUGNA": ["ultimate", "vulnerability"],
    "MIRANA": ["attack", "dodge"],
    "LC": ["attack", "health"],
    "PANGO": ["attack", "vulnerability"],
    "LIFESTEALER": ["attack", "healing"],
    "HUSKAR": ["health", "attack"],
    "MAGNUS": ["ultimate", "attack"],
    "ZEUS": ["ultimate", "vulnerability"],
    "JUGGER": ["attack", "crits"],
    "CK": ["crits", "healing"],
    "NECR": ["healing", "poison"],
    "TINY": ["attack", "health"],
    "YAMASHITA": ["attack", "crits"],
    "VOID": ["attack", "ultimate"],
    "AA": ["health", "freeze"],
    "DARK WILLOW": ["guards", "poison"],
    "MUERTA": ["attack", "vulnerability"],
    "HOODWINK": ["attack", "dodge"],
    "VIPER": ["poison", "attack"],
    "TINKER": ["ultimate", "attack"],
    "DOOM": ["health", "attack"],
    "GRIMSTROKE": ["ultimate", "vulnerability"],
    "AXE": ["shields", "attack"],
    "QOP": ["attack", "ultimate"],
    "MARCI": ["attack", "health"],
    "WINDRANDGER": ["attack", "dodge"],
    "TREANT": ["healing", "health"],
    "LICH": ["freeze", "ultimate"],
    "LYCAN": ["guards", "ultimate"],
    "OMNIK": ["freeze", "shields"],
    "URSA": ["attack", "health"],
    "SF": ["attack", "crits"],
    "SKY": ["ultimate", "vulnerability"],
    "ABADDON": ["shields", "healing"],
    "RAZOR": ["attack", "vulnerability"],
    "SPECTRE": ["attack", "health"],
    "SNIPER": ["attack", "crits"],
    "EMBER SPIRIT": ["attack", "rage"],
    "VOID SPIRIT": ["shields", "vulnerability"],
    "RIKI": ["attack", "dodge"],
    "LUNA": ["attack", "ultimate"],
    "OGRE MAGI": ["healing", "shields"],
    "CM": ["freeze", "ultimate"],
    "PUDGE": ["health", "shields"],
    "ASH": ["attack", "freeze"],
    "LINA": ["ultimate", "vulnerability"],
    "KUNKKA": ["attack", "shields"],
    "DAZZLE": ["healing", "shields"],
    "AWAKENED": ["ultimate", "health"],
    "WASTELAND GUARD": ["guards", "shields"],
    "TA": ["attack", "crits"],
    "RINGMASTER": ["ultimate", "vulnerability"],
    "MK": ["attack", "dodge"],
    "ES": ["ultimate", "attack"],
    "LION": ["ultimate", "vulnerability"],
    "GUITARIST": ["ultimate", "attack"],
    "KEZ": ["attack", "dodge"],
    "WITCH DOCTOR": ["healing", "poison"],
    "FLAMEBORN": ["attack", "rage"],
    "TROLL": ["attack", "rage"],
    "ALCHEMIST": ["health", "poison"],
    "CLINKZ": ["attack", "crits"],
    "LESHRAC": ["ultimate", "vulnerability"],
    "PL": ["attack", "dodge"],
    "BRIST": ["poison", "health"],
    "SILENCER": ["ultimate", "vulnerability"],
    "BROOD MOTHER": ["poison", "attack"],
    "DRAGON KNIGHT": ["poison", "freeze"],
};

function getHeroRequiredStyles(heroName) {
    return HERO_REQUIRED_STYLES[heroName] || [];
}


// ========== ДАННЫЕ СТИЛЕЙ ==========
const PLAYSTYLES_DATA = [
    {id: "guards", name: "Стражи", description: "Гейские шары"},
    {id: "crits", name: "Криты", description: "Сраные проки"},
    {id: "dodge", name: "Увороты", description: "Всегда качай меня"},
    {id: "poison", name: "Яды", description: "В начале тащу, в конце ГХ"},
    {id: "shields", name: "Щиты", description: "Без проков бесполезен"},
    {id: "healing", name: "Лечение", description: "Сильнее калечу чем лечу"},
    {id: "health", name: "Здоровье", description: "Я имба"},
    {id: "vulnerability", name: "Уязвимость", description: "Файт две секунды"},
    {id: "rage", name: "Ярость", description: "Не ясно зачем я нужен"},
    {id: "freeze", name: "Заморозка", description: "Удачи кастануть ульту"},
    {id: "chaos", name: "Хаос", description: "Непонятная тема вообще"},
    {id: "ultimate", name: "Ульта", description: "Опять гитарист в бане"},
    {id: "attack", name: "Атака", description: "Моя бить"}
];

// ========== БАЗОВАЯ БАЗА ДАННЫХ БИЛДОВ ==========
const DEFAULT_BUILDS = [
    {
        hero: "PA",
        requiredMustHave: ["attack", "crits"],
        desiredMustHave: [],
        requiredMustNotHave: [],
        desiredMustNotHave: ["healing", "freeze"],
        talents: "2 2 2",
        comment: "Классический билд на криты и атаку",
        tier: 2,
        img: ""
    },
    {
        hero: "CK",
        requiredMustHave: ["crits", "healing"],
        desiredMustHave: ["health"],
        requiredMustNotHave: [],
        desiredMustNotHave: ["poison", "freeze"],
        talents: "1 1 2",
        comment: "Криты + исцеление для выживания",
        tier: 2,
        img: ""
    },
    {
        hero: "DROW RANGER",
        requiredMustHave: ["crits", "freeze"],
        desiredMustHave: ["attack"],
        requiredMustNotHave: [],
        desiredMustNotHave: ["healing"],
        talents: "2 2 1",
        comment: "Дальний бой с замедлением",
        tier: 1,
        img: ""
    },
    {
        hero: "PUDGE",
        requiredMustHave: ["health", "shields"],
        desiredMustHave: ["healing"],
        requiredMustNotHave: [],
        desiredMustNotHave: ["crits", "attack"],
        talents: "1 1 1",
        comment: "Танк с максимальной выживаемостью",
        tier: 3,
        img: ""
    },
    {
        hero: "ZEUS",
        requiredMustHave: ["ultimate", "vulnerability"],
        desiredMustHave: ["attack"],
        requiredMustNotHave: [],
        desiredMustNotHave: ["shields", "health"],
        talents: "2 2 2",
        comment: "Магический урон через ульту",
        tier: 1,
        img: ""
    },
];

;

// ========== ПЕРСИСТЕНТНОЕ ХРАНИЛИЩЕ ==========
const STORAGE_KEY = "buildsDatabase";

// Функция для загрузки билдов (базовые + пользовательские)
function loadBuilds() {
    console.log('🔄 Запуск обновленной системы билдов v2.0');

    // РАДИКАЛЬНО: Всегда очищаем старые данные при загрузке
    const savedData = localStorage.getItem('builds');

    if (savedData) {
        try {
            const savedBuilds = JSON.parse(savedData);

            // Проверяем есть ли старые билды
            const hasOldBuilds = savedBuilds.some(build => 
                !build || 
                build.requiredMustHave === undefined ||
                build.desiredMustHave === undefined
            );

            if (hasOldBuilds) {
                console.log('🗑️ Обнаружены устаревшие билды, выполняем автообновление...');
                console.log('📦 Загружаем обновленную базу с ' + DEFAULT_BUILDS.length + ' билдами');
                localStorage.removeItem('builds');
                return [...DEFAULT_BUILDS];
            } else {
                console.log('✅ Все билды в актуальном формате');
                return savedBuilds;
            }
        } catch (error) {
            console.log('🗑️ Поврежденные данные, загружаем новую базу...');
            localStorage.removeItem('builds');
            return [...DEFAULT_BUILDS];
        }
    } else {
        console.log('📦 Первый запуск - загружаем обновленную базу');
        return [...DEFAULT_BUILDS];
    }
}



let builds = loadBuilds();

// ========== СОСТОЯНИЕ ==========
let selectedDisabledStyles = [];
let editingBuildIndex = null;
let heroSearchFilter = '';

// ========== UI ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener("DOMContentLoaded", () => {
    renderDisabledStylesPicker();
    renderBuildsList();
    setupEventListeners();
});

// ========== РАСЧЕТ ЭФФЕКТИВНОСТИ БИЛДА ==========
function calculateBuildEfficiency(build, enabledStyles) {
    // Только новый формат
    const requiredMustHave = build.requiredMustHave || [];
    const desiredMustHave = build.desiredMustHave || [];
    const requiredMustNotHave = build.requiredMustNotHave || [];
    const desiredMustNotHave = build.desiredMustNotHave || [];

    // Обязательные стили - критично
    if (!requiredMustHave.every(s => enabledStyles.includes(s))) {
        return 0;
    }
    if (requiredMustNotHave.some(s => enabledStyles.includes(s))) {
        return 0;
    }

    // Желательные стили - штрафы -30%
    let mismatches = 0;
    mismatches += desiredMustHave.filter(s => !enabledStyles.includes(s)).length;
    mismatches += desiredMustNotHave.filter(s => enabledStyles.includes(s)).length;

    // При 4+ несовпадениях = скрыть
    if (mismatches >= 4) return 0;

    let efficiency = 100;
    for (let i = 0; i < mismatches; i++) {
        efficiency -= 30;
    }
    return Math.max(0, Math.round(efficiency));
}



// ========== ПОИСК БИЛДОВ ==========
function searchBuilds(disabledStyles) {
    const enabledStyles = PLAYSTYLES_DATA.map(x => x.id).filter(id => !disabledStyles.includes(id));
    return builds.map(build => {
        const efficiency = calculateBuildEfficiency(build, enabledStyles);
        return { ...build, efficiency: efficiency };
    }).filter(build => build.efficiency > 0);
}

// ========== ОТРИСОВКА ВЫБОРА СТИЛЕЙ ДЛЯ ПОИСКА ==========
function renderDisabledStylesPicker() {
    const grid = document.getElementById('playstyles-grid');
    grid.innerHTML = '';
    PLAYSTYLES_DATA.forEach(ps => {
        const btn = document.createElement('button');
        btn.className = 'playstyle-btn';
        btn.dataset.id = ps.id;
        btn.innerHTML = `<div>${ps.name}</div><div style="font-size:0.8em;color:#ccc">${ps.description}</div>`;
        if (selectedDisabledStyles.includes(ps.id)) btn.classList.add('selected');
        if (selectedDisabledStyles.length >= 5 && !selectedDisabledStyles.includes(ps.id))
            btn.classList.add('disabled');
        btn.onclick = () => {
            toggleDisabledStyle(ps.id);
        };
        grid.appendChild(btn);
    });
    document.getElementById('selection-count').textContent = selectedDisabledStyles.length;
}

function toggleDisabledStyle(id) {
    const i = selectedDisabledStyles.indexOf(id);
    if (i === -1 && selectedDisabledStyles.length < 5) selectedDisabledStyles.push(id);
    else if (i !== -1) selectedDisabledStyles.splice(i, 1);
    renderDisabledStylesPicker();
    renderSearchResults();
}

// ========== СЛОТЫ ВЫБОРА ==========
function renderSelectionSlots() {
    const slots = document.getElementById('selection-slots');
    slots.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const slot = document.createElement('div');
        slot.className = 'slot';
        slot.dataset.slot = i;
        if (selectedDisabledStyles[i]) {
            slot.classList.add('filled');
            const playstyle = PLAYSTYLES_DATA.find(p => p.id === selectedDisabledStyles[i]);
            slot.innerHTML = `<span class="slot-number">${i + 1}</span>
                <span class="slot-text">${playstyle.name}</span>`;
        } else {
            slot.classList.add('empty');
            slot.innerHTML = `<span class="slot-number">${i + 1}</span>
                <span class="slot-text">Пусто</span>`;
        }
        slots.appendChild(slot);
    }
}

// ========== ПОИСКОВЫЕ РЕЗУЛЬТАТЫ ==========
function renderSearchResults() {
    renderSelectionSlots();
    const resultSection = document.getElementById('results-section');
    const buildList = document.getElementById('heroes-list');
    buildList.innerHTML = '';
    if (selectedDisabledStyles.length === 0) {
        resultSection.style.display = "none";
        return;
    }
    const results = searchBuilds(selectedDisabledStyles);
    resultSection.style.display = "block";
    if (results.length === 0) {
        buildList.innerHTML = `<div class="hero-card"><div class="hero-name">Нет подходящих билдов</div></div>`;
        return;
    }
    
    results.sort((a, b) => {
        if (a.efficiency !== b.efficiency) {
            return b.efficiency - a.efficiency;
        }
        const tierA = a.tier || 4;
        const tierB = b.tier || 4;
        return tierA - tierB;
    });
    
    results.forEach((build, idx) => {
        buildList.appendChild(buildCardView(build, idx));
    });
}

// ======= ОТРИСОВКА КАРТОЧКИ БИЛДА =======
function buildCardView(build, buildIdx) {
    const realIndex = builds.findIndex(b =>
        b.hero === build.hero &&
        JSON.stringify(b.mustHave) === JSON.stringify(build.mustHave) &&
        JSON.stringify(b.mustNotHave) === JSON.stringify(build.mustNotHave)
    );
    const el = document.createElement('div');
    el.className = 'hero-card hero-card-wide';

    let imgHtml = '';
    if (build.img) {
        imgHtml = `<div class="build-img"><img src="${build.img}" alt="${build.hero}" loading="lazy"></div>`;
    } else {
        imgHtml = `<div class="build-img build-img-empty"><span>Нет фото</span></div>`;
    }

    let efficiencyClass = 'efficiency-100';
    if (build.efficiency <= 25) efficiencyClass = 'efficiency-low';
    else if (build.efficiency <= 50) efficiencyClass = 'efficiency-medium';
    else if (build.efficiency < 100) efficiencyClass = 'efficiency-high';

    el.innerHTML = `
        ${imgHtml}
        <div class="build-content">
            <div class="build-header">
                <div class="hero-name">
                    ${build.hero}
                    <span class="tier-badge tier-badge-${build.tier||4}" title="Тир билда">${build.tier||4}</span>
                </div>
                <div class="efficiency-badge ${efficiencyClass}" title="Эффективность билда">
                    ${build.efficiency}%
                </div>
            </div>
            <div class="talents-line">Таланты: ${build.talents || ''}</div>
            <div class="style-row"><span style="color:#49d;">+ </span>${build.mustHave.map(st => styleName(st)).join(', ') || '-'}</div>
            <div class="style-row"><span style="color:#f55;">– </span>${build.mustNotHave.map(st => styleName(st)).join(', ') || '-'}</div>
            <div class="build-comment">${build.comment || ''}</div>
            <div class="build-actions">
                <button class="copy-btn" onclick="copyBuild(${realIndex})" title="Копировать билд">📋</button>
                <button class="edit-btn" onclick="editBuild(${realIndex})">✏️ Редактировать</button>
                <button class="delete-btn" onclick="deleteBuild(${realIndex})">🗑️ Удалить</button>
            </div>
        </div>
    `;
    return el;
}

function styleName(id) {
    let found = PLAYSTYLES_DATA.find(st => st.id === id);
    return found ? found.name : id;
}

// ========== ОТРИСОВКА СПИСКА БИЛДОВ ==========
function renderBuildsList() {
    const buildsList = document.getElementById('all-builds-list');
    const totalSpan = document.getElementById('total-heroes');
    buildsList.innerHTML = '';
    
    let filteredBuilds = builds;
    if (heroSearchFilter.trim()) {
        filteredBuilds = builds.filter(build => 
            build.hero && build.hero.toLowerCase().includes(heroSearchFilter.toLowerCase())
        );
    }
    
    totalSpan.textContent = `${filteredBuilds.length}${heroSearchFilter.trim() ? ` из ${builds.length}` : ''}`;
    
    const indexedBuilds = filteredBuilds.map((build) => ({
        build: build,
        originalIndex: builds.indexOf(build)
    }));
    
    indexedBuilds.sort((a, b) => {
        const tierA = a.build.tier || 4;
        const tierB = b.build.tier || 4;
        return tierA - tierB;
    });
    
    if (indexedBuilds.length === 0) {
        buildsList.innerHTML = `<div style="text-align:center;color:#888;padding:20px;">
            ${heroSearchFilter.trim() ? 'Нет билдов для этого героя' : 'Нет билдов в базе'}
        </div>`;
        return;
    }
    
    indexedBuilds.forEach(({build, originalIndex}) => {
        const el = document.createElement('div');
        el.className = 'hero-item build-item';
        let imgHtml = build.img ? `<div class="build-img-mini"><img src="${build.img}" alt="" loading="lazy"></div>` : '';
        el.innerHTML = `
            <div class="build-main-info">
                <div class="build-hero-name">
                  ${imgHtml}${build.hero || '(без имени)'}
                  <span class="tier-badge tier-badge-${build.tier||4}" title="Тир">${build.tier||4}</span>
                </div>
                <div class="build-talents">${build.talents ? `Таланты: ${build.talents}` : ''}</div>
            </div>
            <div class="build-styles">
                <div class="styles-must-have">+ ${build.mustHave.map(styleName).join(', ') || 'нет'}</div>
                <div class="styles-must-not">– ${build.mustNotHave.map(styleName).join(', ') || 'нет'}</div>
            </div>
            <div class="build-comment">${build.comment || ''}</div>
            <div class="build-actions">
                <button class="copy-btn" onclick="copyBuild(${originalIndex})" title="Копировать билд">📋</button>
                <button class="edit-btn" onclick="editBuild(${originalIndex})" title="Редактировать">✏️</button>
                <button class="delete-btn" onclick="deleteBuild(${originalIndex})" title="Удалить">🗑️</button>
            </div>
        `;
        buildsList.appendChild(el);
    });
}

// ========== МОДАЛЬНОЕ ОКНО ==========
function showBuildFormModal(build, title) {
    console.log('Opening modal for:', build);
    
    let modal = document.querySelector('.modal-overlay');
    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Создание билда</h3>
                    <button class="close-btn" onclick="closeModal()">&times;</button>
                </div>
                <form id="build-form">
                    <div class="row-inputs">
                        <div class="form-field">
                            <label>Герой:</label>
                            <select id="build-hero" required>
                                <option value="">Выберите героя</option>
                                ${HEROES_LIST.map(hero => `<option value="${hero}">${hero}</option>`).join('')}
                            </select>
                        </div>
                        <div class="form-field">
                            <label>Таланты:</label>
                            <input type="text" id="build-talents" placeholder="1 2 1">
                        </div>
                        <div class="form-field">
                            <label>Тир:</label>
                            <select id="build-tier">
                                <option value="1">1 - Имба</option>
                                <option value="2">2 - Хорошо</option>
                                <option value="3">3 - Норм</option>
                                <option value="4">4 - Так себе</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-field">
                        <label>Стили (клик = обязательно, двойной клик = запрещено):</label>
                        <div class="edit-styles-grid">
                            ${PLAYSTYLES_DATA.map(style => `
                                <button type="button" class="edit-style-btn" data-style-id="${style.id}">
                                    ${style.name}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="form-field">
                        <label>Комментарий:</label>
                        <textarea id="build-comment" rows="3"></textarea>
                    </div>
                    
                    <div class="form-field">
                        <label>Картинка (URL):</label>
                        <input type="url" id="build-img" placeholder="https://...">
                    </div>
                    
                    <div class="modal-footer">
                        <button type="submit" class="save-btn">Сохранить</button>
                        <button type="button" class="cancel-btn" onclick="closeModal()">Отмена</button>
                    </div>
                </form>
            </div>
        `;
        document.body.appendChild(modal);
        
        modal.querySelectorAll('.edit-style-btn').forEach(btn => {
            btn.onclick = function() {
                if (this.classList.contains('selected')) {
                    if (this.dataset.requirement === 'must') {
                        this.dataset.requirement = 'not';
                        this.style.background = '#e74c3c';
                        this.style.borderColor = '#e74c3c';
                    } else {
                        this.classList.remove('selected');
                        delete this.dataset.requirement;
                        this.style.background = '';
                        this.style.borderColor = '';
                        this.style.color = '';
                    }
                } else {
                    this.classList.add('selected');
                    this.dataset.requirement = 'must';
                    this.style.background = '#27ae60';
                    this.style.borderColor = '#27ae60';
                    this.style.color = '#fff';
                }
            };
        });
        
        modal.querySelector('#build-form').onsubmit = function(e) {
            e.preventDefault();
            saveBuild();
        };
        
        modal.onclick = function(e) {
            if (e.target === modal) closeModal();
        };
    }
    
    modal.querySelector('.modal-header h3').textContent = title;
    modal.querySelector('#build-hero').value = build.hero || '';
    modal.querySelector('#build-talents').value = build.talents || '';
    modal.querySelector('#build-comment').value = build.comment || '';
    modal.querySelector('#build-tier').value = build.tier || 4;
    modal.querySelector('#build-img').value = build.img || '';
    
    modal.querySelectorAll('.edit-style-btn').forEach(btn => {
        btn.classList.remove('selected');
        delete btn.dataset.requirement;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.style.color = '';
        
        const styleId = btn.dataset.styleId;
        if (build.mustHave && build.mustHave.includes(styleId)) {
            btn.classList.add('selected');
            btn.dataset.requirement = 'must';
            btn.style.background = '#27ae60';
            btn.style.borderColor = '#27ae60';
            btn.style.color = '#fff';
        } else if (build.mustNotHave && build.mustNotHave.includes(styleId)) {
            btn.classList.add('selected');
            btn.dataset.requirement = 'not';
            btn.style.background = '#e74c3c';
            btn.style.borderColor = '#e74c3c';
            btn.style.color = '#fff';
        }
    });
    
    modal.style.display = 'flex';
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
    
    if (!hero) {
        alert('Выберите героя!');
        return;
    }
    
    const mustHave = [];
    const mustNotHave = [];
    
    document.querySelectorAll('.edit-style-btn').forEach(btn => {
        const styleId = btn.dataset.styleId;
        if (btn.dataset.requirement === 'must') {
            mustHave.push(styleId);
        } else if (btn.dataset.requirement === 'not') {
            mustNotHave.push(styleId);
        }
    });
    
    if (mustHave.length === 0) {
        alert('Выберите хотя бы один обязательный стиль!');
        return;
    }
    
    const newBuild = { hero, mustHave, mustNotHave, talents, comment, tier, img };
    
    if (editingBuildIndex !== null) {
        builds[editingBuildIndex] = newBuild;
        alert('Билд обновлен!');
    } else {
        builds.push(newBuild);
        alert('Билд добавлен!');
    }
    
    persist();
    renderBuildsList();
    renderSearchResults();
    closeModal();
    
    editingBuildIndex = null;
}

function showAddBuildModal() {
    editingBuildIndex = null;
    showBuildFormModal({
        hero: '',
        mustHave: [],
        mustNotHave: [],
        talents: '',
        comment: '',
        tier: 4,
        img: ''
    }, 'Создание нового билда');
}

// ========== ГЛОБАЛЬНЫЕ ФУНКЦИИ ==========
window.copyBuild = function(idx) {
    if (!builds[idx]) {
        alert('Билд не найден!');
        return;
    }
    
    const originalBuild = builds[idx];
    const copiedBuild = {
        hero: originalBuild.hero,
        mustHave: [...originalBuild.mustHave],
        mustNotHave: [...originalBuild.mustNotHave],
        talents: originalBuild.talents,
        comment: originalBuild.comment ? `${originalBuild.comment} (копия)` : '(копия)',
        tier: originalBuild.tier,
        img: originalBuild.img
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
        builds.splice(idx, 1);
        persist();
        renderBuildsList();
        renderSearchResults();
    }
}

function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(builds));
}

function exportBuilds() {
    try {
        const data = JSON.stringify(builds, null, 2);
        const blob = new Blob([data], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'builds.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (error) {
        alert('Ошибка экспорта!');
    }
}

function importBuilds() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const importedBuilds = JSON.parse(e.target.result);
                    if (Array.isArray(importedBuilds)) {
                        builds = importedBuilds;
                        persist();
                        renderBuildsList();
                        renderSearchResults();
                        alert('Билды импортированы!');
                    } else {
                        alert('Неверный формат файла!');
                    }
                } catch (error) {
                    alert('Ошибка импорта!');
                }
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

// ========== ОБРАБОТЧИКИ СОБЫТИЙ ==========
function setupEventListeners() {
    document.getElementById('reset-btn').addEventListener('click', function() {
        selectedDisabledStyles = [];
        renderDisabledStylesPicker();
        renderSearchResults();
    });
    
    const addBtn = document.getElementById('add-build-btn');
    if (addBtn) {
        addBtn.onclick = showAddBuildModal;
    }
    
    const exportBtn = document.getElementById('export-btn');
    if (exportBtn) {
        exportBtn.onclick = exportBuilds;
    }
    
    const importBtn = document.getElementById('import-btn');
    if (importBtn) {
        importBtn.onclick = importBuilds;
    }
    
    const restoreBtn = document.getElementById('restore-defaults-btn');
    if (restoreBtn) {
        restoreBtn.onclick = function() {
            if (confirm('Восстановить базовые билды? Они добавятся к существующим.')) {
                const missingDefaults = DEFAULT_BUILDS.filter(defaultBuild => 
                    !builds.some(build => 
                        build.hero === defaultBuild.hero &&
                        JSON.stringify(build.mustHave) === JSON.stringify(defaultBuild.mustHave) &&
                        JSON.stringify(build.mustNotHave) === JSON.stringify(defaultBuild.mustNotHave)
                    )
                );
                
                if (missingDefaults.length > 0) {
                    builds = builds.concat(missingDefaults);
                    persist();
                    renderBuildsList();
                    renderSearchResults();
                    alert(`Добавлено ${missingDefaults.length} базовых билдов!`);
                } else {
                    alert('Все базовые билды уже есть в базе!');
                }
            }
        }
    }
    
    const resetDbBtn = document.getElementById('reset-db');
    if (resetDbBtn) {
        resetDbBtn.onclick = function() {
            if (confirm('Вы уверены, что хотите удалить ВСЕ билды? Это действие необратимо!')) {
                builds = [];
                persist();
                renderBuildsList();
                renderSearchResults();
                alert('Все билды удалены!');
            }
        }
    }
    
    const heroSearch = document.getElementById('hero-search');
    if (heroSearch) {
        heroSearch.addEventListener('input', function() {
            heroSearchFilter = this.value;
            renderBuildsList();
        });
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



