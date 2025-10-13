// ========== ГЕРОИ ДЛЯ ВЫПАДАЮЩЕГО СПИСКА ==========
// ========== ДАННЫЕ ГЕРОЕВ С ОБЯЗАТЕЛЬНЫМИ СТИЛЯМИ ==========
const HEROES_DATA = [
    {name: "DROW RANGER", requiredStyles: ["crits", "freeze"]},
    {name: "NYX", requiredStyles: ["vulnerability", "dodge"]},
    {name: "TIMBERSAW", requiredStyles: ["health", "attack"]},
    {name: "UNDDYING", requiredStyles: ["healing", "health"]},
    {name: "PA", requiredStyles: ["attack", "crits"]},
    {name: "PUGNA", requiredStyles: ["ultimate", "vulnerability"]},
    {name: "MIRANA", requiredStyles: ["attack", "dodge"]},
    {name: "LC", requiredStyles: ["attack", "health"]},
    {name: "PANGO", requiredStyles: ["attack", "vulnerability"]},
    {name: "LIFESTEALER", requiredStyles: ["attack", "healing", "health"]},
    {name: "HUSKAR", requiredStyles: ["health", "attack"]},
    {name: "MAGNUS", requiredStyles: ["ultimate", "attack"]},
    {name: "ZEUS", requiredStyles: ["ultimate", "vulnerability"]},
    {name: "JUGGER", requiredStyles: ["attack", "crits"]},
    {name: "CK", requiredStyles: ["crits", "healing"]},
    {name: "NECR", requiredStyles: ["healing", "poison"]},
    {name: "TINY", requiredStyles: ["attack", "health"]},
    {name: "YAMASHITA", requiredStyles: ["attack", "crits"]},
    {name: "VOID", requiredStyles: ["attack", "ultimate"]},
    {name: "AA", requiredStyles: ["health", "freeze"]},
    {name: "DARK WILLOW", requiredStyles: ["guards", "poison"]},
    {name: "MUERTA", requiredStyles: ["attack", "vulnerability"]},
    {name: "HOODWINK", requiredStyles: ["attack", "dodge"]},
    {name: "VIPER", requiredStyles: ["poison", "attack"]},
    {name: "TINKER", requiredStyles: ["ultimate", "attack"]},
    {name: "DOOM", requiredStyles: ["health", "attack"]},
    {name: "GRIMSTROKE", requiredStyles: ["ultimate", "vulnerability"]},
    {name: "AXE", requiredStyles: ["shields", "attack"]},
    {name: "QOP", requiredStyles: ["attack", "ultimate"]},
    {name: "MARCI", requiredStyles: ["attack", "health"]},
    {name: "WINDRANDGER", requiredStyles: ["attack", "dodge"]},
    {name: "TREANT", requiredStyles: ["healing", "health"]},
    {name: "LICH", requiredStyles: ["freeze", "ultimate"]},
    {name: "LYCAN", requiredStyles: ["guards", "ultimate"]},
    {name: "OMNIK", requiredStyles: ["freeze", "shields"]},
    {name: "URSA", requiredStyles: ["attack", "health"]},
    {name: "SF", requiredStyles: ["attack", "crits"]},
    {name: "SKY", requiredStyles: ["ultimate", "vulnerability"]},
    {name: "ABADDON", requiredStyles: ["shields", "healing"]},
    {name: "RAZOR", requiredStyles: ["attack", "vulnerability"]},
    {name: "SPECTRE", requiredStyles: ["attack", "health"]},
    {name: "SNIPER", requiredStyles: ["attack", "crits"]},
    {name: "EMBER SPIRIT", requiredStyles: ["attack", "rage"]},
    {name: "VOID SPIRIT", requiredStyles: ["shields", "vulnerability"]},
    {name: "RIKI", requiredStyles: ["attack", "dodge"]},
    {name: "LUNA", requiredStyles: ["attack", "ultimate"]},
    {name: "OGRE MAGI", requiredStyles: ["healing", "shields"]},
    {name: "CM", requiredStyles: ["freeze", "ultimate"]},
    {name: "PUDGE", requiredStyles: ["health", "shields"]},
    {name: "ASH", requiredStyles: ["attack", "freeze"]},
    {name: "LINA", requiredStyles: ["ultimate", "vulnerability"]},
    {name: "KUNKKA", requiredStyles: ["attack", "shields"]},
    {name: "DAZZLE", requiredStyles: ["healing", "shields"]},
    {name: "AWAKENED", requiredStyles: ["ultimate", "health"]},
    {name: "WASTELAND GUARD", requiredStyles: ["guards", "shields"]},
    {name: "TA", requiredStyles: ["attack", "crits"]},
    {name: "RINGMASTER", requiredStyles: ["ultimate", "vulnerability"]},
    {name: "MK", requiredStyles: ["attack", "dodge"]},
    {name: "ES", requiredStyles: ["ultimate", "attack"]},
    {name: "LION", requiredStyles: ["ultimate", "vulnerability"]},
    {name: "GUITARIST", requiredStyles: ["ultimate", "attack"]},
    {name: "KEZ", requiredStyles: ["attack", "dodge"]},
    {name: "WITCH DOCTOR", requiredStyles: ["healing", "poison"]},
    {name: "FLAMEBORN", requiredStyles: ["attack", "rage"]},
    {name: "TROLL", requiredStyles: ["attack", "rage"]},
    {name: "ALCHEMIST", requiredStyles: ["health", "poison"]},
    {name: "CLINKZ", requiredStyles: ["attack", "crits"]},
    {name: "LESHRAC", requiredStyles: ["ultimate", "vulnerability"]},
    {name: "PL", requiredStyles: ["attack", "dodge"]},
    {name: "BRIST", requiredStyles: ["poison", "health"]},
    {name: "SILENCER", requiredStyles: ["ultimate", "vulnerability"]},
    {name: "BROOD MOTHER", requiredStyles: ["poison", "attack"]},
    {name: "DRAGON KNIGHT", requiredStyles: ["poison", "freeze"]},
];

// ========== СПИСОК ГЕРОЕВ ДЛЯ ВЫПАДАЮЩЕГО СПИСКА ==========
const HEROES_LIST = HEROES_DATA.map(hero => hero.name);

// ========== ФУНКЦИЯ ДЛЯ ПОЛУЧЕНИЯ ОБЯЗАТЕЛЬНЫХ СТИЛЕЙ ГЕРОЯ ==========
function getHeroRequiredStyles(heroName) {
    const heroData = HEROES_DATA.find(hero => hero.name === heroName);
    return heroData ? heroData.requiredStyles : [];
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


// ========== ФУНКЦИИ ДЛЯ РАБОТЫ С НОВОЙ СИСТЕМОЙ СТИЛЕЙ ==========

// Функция для обработки клика по кнопке стиля
function handleNewStyleButtonClick(btn) {
    const styleId = btn.getAttribute('data-style-id');
    const section = btn.getAttribute('data-section'); // 'required' или 'desired'
    const isHeroRequired = btn.hasAttribute('data-hero-required');

    // Закрепленные за героем стили нельзя менять и они всегда обязательные
    if (isHeroRequired && section === 'required') {
        return; // Не даем менять обязательные стили героя
    }

    // Цикл состояний: нейтральный -> должен быть (зеленый) -> не должен быть (красный) -> нейтральный
    if (btn.classList.contains('must-have')) {
        // Переключаем на "не должен быть"
        btn.classList.remove('must-have');
        btn.classList.add('must-not-have');
    } else if (btn.classList.contains('must-not-have')) {
        // Возвращаем в нейтральное состояние
        btn.classList.remove('must-not-have');
    } else {
        // Переключаем на "должен быть"
        btn.classList.add('must-have');
    }
}

// Функция для автоматического выбора обязательных стилей героя
function selectHeroRequiredStyles(heroName) {
    const requiredStyles = getHeroRequiredStyles(heroName);

    // Сначала сбрасываем все hero-required пометки
    document.querySelectorAll('.edit-style-btn[data-hero-required]').forEach(btn => {
        btn.classList.remove('hero-required');
        btn.removeAttribute('data-hero-required');
    });

    // Помечаем новые обязательные стили героя только в секции "обязательные"
    document.querySelectorAll('.required-style-btn').forEach(btn => {
        const styleId = btn.getAttribute('data-style-id');

        if (requiredStyles.includes(styleId)) {
            btn.classList.add('must-have', 'hero-required');
            btn.setAttribute('data-hero-required', 'true');
        }
    });
}

// Функция для сбора данных стилей при сохранении билда
function collectStylesData() {
    const requiredMustHave = [];
    const desiredMustHave = [];
    const requiredMustNotHave = [];
    const desiredMustNotHave = [];

    // Собираем данные из секции обязательных стилей
    document.querySelectorAll('.required-style-btn').forEach(btn => {
        const styleId = btn.getAttribute('data-style-id');

        if (btn.classList.contains('must-have')) {
            requiredMustHave.push(styleId);
        } else if (btn.classList.contains('must-not-have')) {
            requiredMustNotHave.push(styleId);
        }
    });

    // Собираем данные из секции желательных стилей
    document.querySelectorAll('.desired-style-btn').forEach(btn => {
        const styleId = btn.getAttribute('data-style-id');

        if (btn.classList.contains('must-have')) {
            desiredMustHave.push(styleId);
        } else if (btn.classList.contains('must-not-have')) {
            desiredMustNotHave.push(styleId);
        }
    });

    return {
        requiredMustHave,
        desiredMustHave,
        requiredMustNotHave,
        desiredMustNotHave
    };
}

// Функция для установки стилей в модальном окне при редактировании
function setStylesInModal(build) {
    // Сбрасываем все состояния
    document.querySelectorAll('.edit-style-btn').forEach(btn => {
        btn.classList.remove('must-have', 'must-not-have', 'hero-required');
        btn.removeAttribute('data-hero-required');
    });

    // Устанавливаем обязательные стили героя
    if (build.hero) {
        selectHeroRequiredStyles(build.hero);
    }

    // Устанавливаем обязательные стили "должны быть"
    (build.requiredMustHave || []).forEach(styleId => {
        const btn = document.querySelector(`.required-style-btn[data-style-id="${styleId}"]`);
        if (btn) btn.classList.add('must-have');
    });

    // Устанавливаем обязательные стили "не должны быть"
    (build.requiredMustNotHave || []).forEach(styleId => {
        const btn = document.querySelector(`.required-style-btn[data-style-id="${styleId}"]`);
        if (btn) btn.classList.add('must-not-have');
    });

    // Устанавливаем желательные стили "должны быть"
    (build.desiredMustHave || []).forEach(styleId => {
        const btn = document.querySelector(`.desired-style-btn[data-style-id="${styleId}"]`);
        if (btn) btn.classList.add('must-have');
    });

    // Устанавливаем желательные стили "не должны быть"
    (build.desiredMustNotHave || []).forEach(styleId => {
        const btn = document.querySelector(`.desired-style-btn[data-style-id="${styleId}"]`);
        if (btn) btn.classList.add('must-not-have');
    });
}


// ========== БАЗОВАЯ БАЗА ДАННЫХ БИЛДОВ ==========
const DEFAULT_BUILDS = [
    {
        "hero": "DRAGON KNIGHT",
        "requiredMustHave": ["poison", "freeze"],
        "desiredMustHave": [],
        "requiredMustNotHave": [],
        "desiredMustNotHave": ["healing", "rage", "chaos", "ultimate"],
        "talents": "1 2 2",
        "comment": "Фриз + яд. Обязательно купить шард и взять лечение с фриза. Формы качать сначала яд, в 2, потом фриз в 3 и быть в форме яда.",
        "tier": 2,
        "img": "https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/852ef2f6-bbcd-504a-9354-42c89434e6da/42676f4e-0d01-5d42-89bd-1c7ad0050717.jpg"
    },
    {
        "hero": "AXE",
        "requiredMustHave": ["shields", "attack"],
        "desiredMustHave": ["crits"],
        "requiredMustNotHave": [],
        "desiredMustNotHave": ["poison", "healing"],
        "talents": "1 2 3",
        "comment": "Классический танк с щитами и атакой. Криты желательны для урона.",
        "tier": 1,
        "img": ""
    },
    {
        "hero": "PA",
        "requiredMustHave": ["attack", "crits"],
        "desiredMustHave": ["dodge"],
        "requiredMustNotHave": [],
        "desiredMustNotHave": ["shields", "healing"],
        "talents": "2 2 2",
        "comment": "Чистый дамагер с обязательными атакой и критами. Уклонение желательно.",
        "tier": 1,
        "img": ""
    }
];



// ========== ПЕРСИСТЕНТНОЕ ХРАНИЛИЩЕ ==========
const STORAGE_KEY = "buildsDatabase";

// Функция для загрузки билдов (базовые + пользовательские)
function loadBuilds() {
    const savedBuilds = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    if (savedBuilds.length === 0) {
        return [...DEFAULT_BUILDS];
    }
    return savedBuilds;
}

let builds = loadBuilds();

// ========== СОСТОЯНИЕ ==========
let selectedDisabledStyles = [];
let editingBuildIndex = null;
let heroSearchFilter = '';

// ========== UI ИНИЦИАЛИЗАЦИЯ ==========

// ========== ФУНКЦИЯ КОНВЕРТАЦИИ СТАРЫХ БИЛДОВ ==========
function convertOldBuildsToNewFormat() {
    console.log('Converting old builds to new format...');

    builds = builds.map(build => {
        // Если билд уже в новом формате, пропускаем
        if (build.requiredMustHave !== undefined) {
            return build;
        }

        // Конвертируем старый формат в новый
        const heroRequiredStyles = getHeroRequiredStyles(build.hero);

        return {
            hero: build.hero,
            // Обязательные стили героя + старые mustHave становятся обязательными
            requiredMustHave: [...new Set([...heroRequiredStyles, ...(build.mustHave || [])])],
            desiredMustHave: [], // Пока пустой, пользователь может настроить
            requiredMustNotHave: [], // Пока пустой
            // Старые mustNotHave становятся желательными для избежания
            desiredMustNotHave: build.mustNotHave || [],
            talents: build.talents,
            comment: build.comment,
            tier: build.tier,
            img: build.img
        };
    });

    saveBuildsToStorage();
    renderBuildsList();
    renderSearchResults();
    console.log('Old builds converted successfully!');
}


document.addEventListener("DOMContentLoaded", () => {
    renderDisabledStylesPicker();
    renderBuildsList();
    setupEventListeners();

    // Проверяем, нужна ли конвертация старых билдов
    const needsConversion = builds.some(build => build.mustHave !== undefined);
    if (needsConversion) {
        convertOldBuildsToNewFormat();
    }
});

// ========== РАСЧЕТ ЭФФЕКТИВНОСТИ БИЛДА ==========
// ========== РАСЧЕТ ЭФФЕКТИВНОСТИ БИЛДА ==========
function calculateBuildEfficiency(build, enabledStyles) {
    // Проверяем обязательные стили "должны быть"
    const requiredMustHave = build.requiredMustHave || [];
    const desiredMustHave = build.desiredMustHave || [];

    // Если не выполнены обязательные требования - билд не показывается
    if (!requiredMustHave.every(s => enabledStyles.includes(s))) {
        return 0;
    }

    // Проверяем обязательные стили "не должны быть"
    const requiredMustNotHave = build.requiredMustNotHave || [];
    const desiredMustNotHave = build.desiredMustNotHave || [];

    // Если есть обязательные запрещенные стили - билд не показывается
    if (requiredMustNotHave.some(s => enabledStyles.includes(s))) {
        return 0;
    }

    // Считаем штрафы за несовпадения с желательными стилями
    let mismatches = 0;

    // Штраф за отсутствующие желательные стили "должны быть"
    mismatches += desiredMustHave.filter(s => !enabledStyles.includes(s)).length;

    // Штраф за присутствующие желательные стили "не должны быть"
    mismatches += desiredMustNotHave.filter(s => enabledStyles.includes(s)).length;

    // При 4+ несовпадениях билд не показывается
    if (mismatches >= 4) {
        return 0;
    }

    // Каждое несовпадение снижает эффективность на 30%
    let efficiency = 100;
    for (let i = 0; i < mismatches; i++) {
        efficiency = efficiency - 30;
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
                    <h3>${title || 'Создание билда'}</h3>
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
                            <input type="text" id="build-talents" placeholder="1 2 2" required>
                        </div>
                        <div class="form-field">
                            <label>Тир:</label>
                            <select id="build-tier" required>
                                <option value="">Выберите тир</option>
                                <option value="1">1 - Имба</option>
                                <option value="2">2 - Хорошо</option>
                                <option value="3">3 - Норм</option>
                                <option value="4">4 - Так себе</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-field">
                        <label>Обязательные стили:</label>
                        <div class="styles-info">Если стиль отсутствует или запрещенный стиль присутствует - билд не появится в поиске</div>
                        <div class="edit-styles-grid required-styles-grid">
                            ${PLAYSTYLES_DATA.map(style => `
                                <button type="button" class="edit-style-btn required-style-btn" data-style-id="${style.id}" data-section="required">
                                    ${style.name}
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <div class="form-field">
                        <label>Желательные стили:</label>
                        <div class="styles-info">За каждое несовпадение -30% эффективности, при 4+ несовпадениях билд не появится</div>
                        <div class="edit-styles-grid desired-styles-grid">
                            ${PLAYSTYLES_DATA.map(style => `
                                <button type="button" class="edit-style-btn desired-style-btn" data-style-id="${style.id}" data-section="desired">
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

        // Настройка обработчиков для кнопок стилей
        modal.querySelectorAll('.edit-style-btn').forEach(btn => {
            btn.onclick = function() {
                handleNewStyleButtonClick(this);
            };
        });

        // Добавить обработчик изменения героя
        const heroSelect = modal.querySelector('#build-hero');
        if (heroSelect) {
            heroSelect.addEventListener('change', function() {
                const selectedHero = this.value;
                if (selectedHero) {
                    selectHeroRequiredStyles(selectedHero);
                }
            });
        }

        const form = modal.querySelector('#build-form');
        form.onsubmit = function(e) {
            e.preventDefault();
            saveNewBuild();
        };
    }

    // Заполнение данными при редактировании
    if (build && build.hero) {
        modal.querySelector('#build-hero').value = build.hero || '';
        modal.querySelector('#build-talents').value = build.talents || '';
        modal.querySelector('#build-comment').value = build.comment || '';
        modal.querySelector('#build-img').value = build.img || '';
        modal.querySelector('#build-tier').value = build.tier || '';

        // Установить стили
        setTimeout(() => setStylesInModal(build), 100);
    }

    modal.style.display = 'flex';
}



function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) modal.style.display = 'none';
}

function saveNewBuild() {
    const hero = document.getElementById('build-hero').value.trim();
    const talents = document.getElementById('build-talents').value.trim();
    const comment = document.getElementById('build-comment').value.trim();
    const img = document.getElementById('build-img').value.trim();
    const tier = parseInt(document.getElementById('build-tier').value);

    if (!hero || !talents || !tier) {
        alert('Заполните все обязательные поля!');
        return;
    }

    // Собираем данные о стилях
    const stylesData = collectStylesData();

    const newBuild = {
        hero,
        requiredMustHave: stylesData.requiredMustHave,
        desiredMustHave: stylesData.desiredMustHave,
        requiredMustNotHave: stylesData.requiredMustNotHave,
        desiredMustNotHave: stylesData.desiredMustNotHave,
        talents,
        comment,
        tier,
        img: img || ''
    };

    if (editingBuildIndex !== null) {
        // Обновляем существующий билд
        builds[editingBuildIndex] = newBuild;
        console.log('Build updated:', newBuild);
    } else {
        // Добавляем новый билд
        builds.push(newBuild);
        console.log('Build added:', newBuild);
    }

    saveBuildsToStorage();
    renderBuildsList();
    renderSearchResults();
    closeModal();
    editingBuildIndex = null;
}



function showAddBuildModal() {
    editingBuildIndex = null;
    showBuildFormModal({
        hero: '',
        requiredMustHave: [],
        desiredMustHave: [],
        requiredMustNotHave: [],
        desiredMustNotHave: [],
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



