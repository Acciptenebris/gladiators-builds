// ========== ГЕРОИ ДЛЯ ВЫПАДАЮЩЕГО СПИСКА ==========
const HEROES_LIST = [
    "DROW RANGER", "NYX", "TIMBERSAW", "UNDDYING", "PA", "PUGNA", "MIRANA", "LC", "PANGO", "LIFESTEALER", "HUSKAR", "MAGNUS", "ZEUS", "JUGGER", "CK", "NECR", "TINY", "YAMASHITA",
    "VOID", "AA", "DARK WILLOW", "MUERTA", "HOODWINK", "VIPER", "TINKER", "DOOM", "GRIMSTROKE", "AXE", "QOP", "MARCI", "WINDRANDGER", "TREANT", "LICH", "LYCAN", "OMNIK", "URSA",
    "SF", "SKY", "ABADDON", "RAZOR", "SPECTRE", "SNIPER", "EMBER SPIRIT", "VOID SPIRIT", "RIKI", "LUNA", "OGRE MAGI", "CM", "PUDGE", "ASH", "LINA", "KUNKKA", "DAZZLE", "AWAKENED",
    "WASTELAND GUARD", "TA", "RINGMASTER", "MK", "ES", "LION", "GUITARIST", "KEZ", "WITCH DOCTOR", "FLAMEBORN", "TROLL", "ALCHEMIST", "CLINKZ", "LESHRAC", "PL", "BRIST", "SILENCER", "BROOD MOTHER"
];

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
        "hero": "MIRANA",
        "mustHave": ["guards", "poison"],
        "mustNotHave": ["crits", "healing", "dodge"],
        "talents": "2 1 2",
        "comment": "Нет леги на лечение стражей",
        "tier": 2,
        "img": ""
    },
    {
        "hero": "DROW RANGER",
        "mustHave": ["crits", "attack"],
        "mustNotHave": ["shields", "healing"],
        "talents": "1 1 1",
        "comment": "Стандартный крит билд",
        "tier": 1,
        "img": ""
    },
    {
        "hero": "NYX",
        "mustHave": ["dodge", "vulnerability"],
        "mustNotHave": ["health", "rage"],
        "talents": "2 2 1",
        "comment": "Мобильный ассасин",
        "tier": 1,
        "img": ""
    },
    {
        "hero": "AXE",
        "mustHave": ["shields", "attack", "crits"],
        "mustNotHave": ["freeze", "dodge", "ultimate"],
        "talents": "2(1) 1 1",
        "comment": "Атака + крит/щит. Без шарда. Темп.",
        "tier": 2,
        "img": ""
    },
    {
        "hero": "AXE",
        "mustHave": ["health", "shields"],
        "mustNotHave": ["healing", "crits", "freeze"],
        "talents": "2(1) 2 2",
        "comment": "Здоровье + щит. Кубы. Легендарка на прыжок.",
        "tier": 2,
        "img": ""
    },
    {
        "hero": "ABADDON",
        "mustHave": ["healing", "shields", "crits"],
        "mustNotHave": ["chaos", "poison"],
        "talents": "2 1 2",
        "comment": "Лечение + щит. Собираем проки.",
        "tier": 2,
        "img": ""
    },
    {
        "hero": "ABADDON",
        "mustHave": ["shields", "healing", "ultimate", "dodge"],
        "mustNotHave": ["crits", "vulnerability"],
        "talents": "2 1 2",
        "comment": "Ульт + щит/уклон. Спам ульты.",
        "tier": 2,
        "img": ""
    }
];

// ========== ПЕРСИСТЕНТНОЕ ХРАНИЛИЩЕ ==========
const STORAGE_KEY = "buildsDatabase";

// Функция для загрузки билдов (базовые + пользовательские)
function loadBuilds() {
    const savedBuilds = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    
    // Если нет сохраненных билдов, загружаем базовые
    if (savedBuilds.length === 0) {
        return [...DEFAULT_BUILDS]; // Копия базовых билдов
    }
    
    return savedBuilds;
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
    if (!build.mustHave.every(s => enabledStyles.includes(s))) {
        return 0;
    }
    const conflictsCount = build.mustNotHave.filter(s => enabledStyles.includes(s)).length;
    if (conflictsCount >= 3) return 0;
    let efficiency = 100;
    for (let i = 0; i < conflictsCount; i++) {
        efficiency = efficiency / 2;
    }
    return Math.round(efficiency);
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
    
    // Сортировка сначала по эффективности (по убыванию), потом по тиру (по возрастанию)
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

    // Определяем класс эффективности для стилизации
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
    
    // Фильтрация по герою
    let filteredBuilds = builds;
    if (heroSearchFilter.trim()) {
        filteredBuilds = builds.filter(build => 
            build.hero && build.hero.toLowerCase().includes(heroSearchFilter.toLowerCase())
        );
    }
    
    totalSpan.textContent = `${filteredBuilds.length}${heroSearchFilter.trim() ? ` из ${builds.length}` : ''}`;
    
    // Создаем массив с индексами для сортировки
    const indexedBuilds = filteredBuilds.map((build) => ({
        build: build,
        originalIndex: builds.indexOf(build)
    }));
    
    // Сортировка по тиру
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

// ========== ОБРАБОТЧИКИ СОБЫТИЙ ==========
function setupEventListeners() {
    document.getElementById('reset-btn').addEventListener('click', function() {
        selectedDisabledStyles = [];
        renderDisabledStylesPicker();
        renderSearchResults();
    });
    document.getElementById('add-build-btn').onclick = showAddBuildModal;
    document.getElementById('export-btn').onclick = exportBuilds;
    document.getElementById('import-btn').onclick = importBuilds;
    
    // Обновленная функция сброса с выбором
    document.getElementById('reset-db').onclick = function() {
        const choice = confirm(
            'Что вы хотите сделать?\n\n' +
            'OK - ПОЛНЫЙ СБРОС (удалить все билды)\n' +
            'Отмена - ВОССТАНОВИТЬ БАЗОВЫЕ (базовые + ваши билды)'
        );
        
        if (choice) {
            // Полный сброс
            builds = [];
            persist();
            renderBuildsList();
            renderSearchResults();
            alert('Все билды удалены!');
        } else {
            // Восстановление базовых
            const userBuilds = builds.filter(build => 
                !DEFAULT_BUILDS.some(defaultBuild => 
                    defaultBuild.hero === build.hero &&
                    JSON.stringify(defaultBuild.mustHave) === JSON.stringify(build.mustHave) &&
                    JSON.stringify(defaultBuild.mustNotHave) === JSON.stringify(build.mustNotHave)
                )
            );
            
            builds = [...DEFAULT_BUILDS, ...userBuilds];
            persist();
            renderBuildsList();
            renderSearchResults();
            alert(`Восстановлено ${DEFAULT_BUILDS.length} базовых билдов!`);
        }
    }
    
    // Обработчик поиска героев
    document.getElementById('hero-search').addEventListener('input', function() {
        heroSearchFilter = this.value;
        renderBuildsList();
    });
    
    // Кнопка очистки поиска
    document.getElementById('clear-search').addEventListener('click', function() {
        heroSearchFilter = '';
        document.getElementById('hero-search').value = '';
        renderBuildsList();
    });
}

// ========== КОПИРОВАНИЕ БИЛДА ==========
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
    
    // Открываем модальное окно с копией
    editingBuildIndex = null; // Это новый билд, не редактирование
    showBuildFormModal(copiedBuild, `Копирование билда: ${originalBuild.hero}`);
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

function showBuildFormModal(build, title) {
    document.querySelector('.modal-overlay').style.display = 'flex';
    document.querySelector('.modal-header h3').textContent = title;
    
    document.getElementById('build-hero').value = build.hero;
    document.getElementById('build-talents').value = build.talents;
    document.getElementById('build-comment').value = build.comment;
    document.getElementById('build-tier').value = build.tier || 4;
    document.getElementById('build-img').value = build.img || '';

    PLAYSTYLES_DATA.forEach(st => {
        const element = document.querySelector(`[data-style-id="${st.id}"]`);
        if (element) {
            element.classList.remove('selected');
            if (build.mustHave.includes(st.id)) {
                element.classList.add('selected');
                element.dataset.requirement = 'must';
            } else if (build.mustNotHave.includes(st.id)) {
                element.classList.add('selected');
                element.dataset.requirement = 'not';
            }
        }
    });
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
    const data = JSON.stringify(builds, null, 2);
    const blob = new Blob([data], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'builds.json';
    a.click();
    URL.revokeObjectURL(url);
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
