// ========== ГЕРОИ ДЛЯ ВЫПАДАЮЩЕГО СПИСКА ==========
const HEROES_LIST = [
    "DROW RANGER", "NYX", "TIMBERSAW", "UNDDYING", "PA", "PUGNA", "MIRANA", "LC", "PANGO", "LIFESTEALER", "HUSKAR", "MAGNUS", "ZEUS", "JUGGER", "CK", "NECR", "TINY", "YAMASHITA",
    "VOID", "AA", "DARK WILLOW", "MUERTA", "HOODWINK", "VIPER", "TINKER", "DOOM", "GRIMSTROKE", "AXE", "QOP", "MARCI", "WINDRANDGER", "TREANT", "LICH", "LYCAN", "OMNIK", "URSA",
    "SF", "SKY", "ABADDON", "RAZOR", "SPECTRE", "SNIPER", "EMBER SPIRIT", "VOID SPIRIT", "RIKI", "LUNA", "OGRE MAGI", "CM", "PUDGE", "ASH", "LINA", "KUNKKA", "DAZZLE", "AWAKENED",
    "WASTELAND GUARD", "TA", "RINGMASTER", "MK", "ES", "LION", "GUITARIST", "KEZ", "WITCH DOCTOR", "FLAMEBORN", "TROLL", "ALCHEMIST", "CLINKZ", "LESHRAC", "PL", "BRIST", "SILENCER",
    "BROOD MOTHER",
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

// ========== ПЕРСИСТЕНТНОЕ ХРАНИЛИЩЕ ==========
const STORAGE_KEY = "buildsDatabase";
let builds = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
    {
        "hero": "мирана",
        "mustHave": ["guards", "poison"],
        "mustNotHave": ["crits", "healing", "dodge"],
        "talents": "2 1 2",
        "comment": "Нет леги на лечение стражей",
        "tier": 2,
        "img": ""
    }
];

// ========== СОСТОЯНИЕ ==========
let selectedDisabledStyles = [];
let editingBuildIndex = null;
let heroSearchFilter = ''; // Переменная для поиска героев

// ========== UI ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener("DOMContentLoaded", () => {
    renderDisabledStylesPicker();
    renderBuildsList();
    setupEventListeners();
});

function styleName(id) {
    let found = PLAYSTYLES_DATA.find(st => st.id === id);
    return found ? found.name : id;
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
        if (a.efficiency !== b.efficiency) return b.efficiency - a.efficiency;
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
            <div style="margin:6px 0;color:#d4af37;font-weight:bold;">Таланты: ${build.talents || ''}</div>
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
        originalIndex: builds.indexOf(build) // Находим оригинальный индекс
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
    document.getElementById('reset-db').onclick = function() {
        if (confirm('Вы уверены, что хотите очистить все билды?')) {
            builds = [];
            persist();
            renderBuildsList();
            renderSearchResults();
        }
    }
    
    // ========== ОБРАБОТЧИК ПОИСКА ГЕРОЕВ ==========
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
    }, 'Создание билда');
}
window.editBuild = function(idx) {
    if (!builds[idx]) {
        alert('Билд не найден!');
        return;
    }
    editingBuildIndex = idx;
    showBuildFormModal(builds[idx], `Редактирование билда: ${builds[idx].hero}`);
}
window.deleteBuild = function(idx) {
    if (!builds[idx]) {
        alert('Билд не найден!');
        return;
    }
    if (!confirm(`Удалить билд для героя "${builds[idx].hero}"?`)) return;
    builds.splice(idx, 1);
    persist();
    renderBuildsList();
    renderSearchResults();
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

// ========== МОДАЛЬНОЕ ОКНО ==========
function showBuildFormModal(build, title = "") {
    let overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'build-modal-x';
    overlay.innerHTML = `
    <div class="modal-content modal-wide">
        <div class="modal-header">
            <h3>${title}</h3>
            <button class="close-btn" id="close-build-modal">&times;</button>
        </div>
        <div class="modal-body">
            <div class="row-inputs">
                <div class="form-field">
                    <label for="build-hero" style="font-size:1.04rem;font-weight:bold;">Герой:</label>
                    <select id="build-hero" style="width:210px;font-size:1.17rem;font-weight:bold;padding:7px 13px;">
                        <option value=""> -- выберите героя -- </option>
                        ${HEROES_LIST.map(h => `<option value="${h}"${(h === build.hero ? ' selected' : '')}>${h}</option>`).join('')}
                    </select>
                </div>
                <div class="form-field">
                    <label for="build-tier" style="font-size:1.05rem;">Тир билда:</label>
                    <select id="build-tier" style="margin-left:10px;font-size:1.05rem;font-weight:bold;border-radius:7px;border:1px solid #aaa;padding:6px;">
                        <option value="1"${build.tier==1?' selected':''}>1 (S-Tier)</option>
                        <option value="2"${build.tier==2?' selected':''}>2 (A-Tier)</option>
                        <option value="3"${build.tier==3?' selected':''}>3 (B-Tier)</option>
                        <option value="4"${!build.tier || build.tier==4?' selected':''}>4 (fun/meme)</option>
                    </select>
                </div>
                <div class="form-field">
                    <label for="build-talents" style="font-size:1.0rem;">Таланты:</label>
                    <input id="build-talents" style="width:110px;font-size:1.08rem;padding:7px;border-radius:7px;border:1.3px solid #aaa" value="${build.talents || ''}" placeholder="10 20 30">
                </div>
            </div>
            <div class="form-field">
                <label for="build-img" style="font-size:1.0rem;font-weight:bold;">Картинка (URL или файл):</label>
                <div class="img-input-container">
                    <input id="build-img" type="url" style="width:250px;font-size:1.0rem;padding:7px;border-radius:7px;border:1.3px solid #aaa;margin-right:10px;" placeholder="https://example.com/image.jpg" value="${build.img||''}">
                    <input id="img-file" type="file" accept="image/*" style="font-size:0.9rem;">
                </div>
                <div id="img-preview" style="margin-top:10px;">
                    ${build.img ? `<img src="${build.img}" style="max-width:120px;max-height:120px;border-radius:10px;border:2px solid #666;">` : ''}
                </div>
            </div>
            <div class="form-field">
                <label style="font-size:1rem;font-weight:bold;">Стили, которые <b>ДОЛЖНЫ</b> быть:</label>
                <div class="edit-styles-grid" id="musthave-grid"></div>
            </div>
            <div class="form-field">
                <label style="font-size:1rem;font-weight:bold;">Стили, которых <b>НЕ должно</b> быть:</label>
                <div class="edit-styles-grid" id="mustnothave-grid"></div>
            </div>
            <div class="form-field">
                <label for="build-comment" style="font-size:1rem;">Комментарий:</label>
                <textarea id="build-comment" rows="2" style="width:100%;font-size:1.08rem;padding:7px;border-radius:7px;border:1.3px solid #aaa" placeholder="Комментарий">${build.comment || ''}</textarea>
            </div>
        </div>
        <div class="modal-footer">
            <button class="save-btn" id="save-build" style="font-size:1.1rem;padding:12px 35px;">Сохранить</button>
            <button class="cancel-btn" id="cancel-build" style="font-size:1.1rem;padding:12px 35px;">Отмена</button>
        </div>
    </div>
    `;
    document.body.appendChild(overlay);
    let mustHave = [...(build.mustHave || [])];
    let mustNotHave = [...(build.mustNotHave || [])];
    let imgVal = build.img || '';

    const imgInput = overlay.querySelector('#build-img');
    const imgFile = overlay.querySelector('#img-file');
    const imgPreview = overlay.querySelector('#img-preview');

    // Обработка изменения URL
    imgInput.addEventListener('input', function() {
        imgVal = imgInput.value;
        updatePreview();
    });

    // Обработка загрузки файла
    imgFile.addEventListener('change', function() {
        if (imgFile.files && imgFile.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imgVal = e.target.result;
                imgInput.value = imgVal;
                updatePreview();
            };
            reader.readAsDataURL(imgFile.files[0]);
        }
    });

    function updatePreview() {
        if (imgVal) {
            imgPreview.innerHTML = `<img src="${imgVal}" style="max-width:120px;max-height:120px;border-radius:10px;border:2px solid #666;">`;
        } else {
            imgPreview.innerHTML = '';
        }
    }

    const gridH = overlay.querySelector('#musthave-grid');
    const gridN = overlay.querySelector('#mustnothave-grid');
    function renderCheckboxGrids() {
        // Must Have
        gridH.innerHTML = '';
        PLAYSTYLES_DATA.forEach(ps => {
            if (mustNotHave.includes(ps.id)) return;
            const btn = document.createElement('button');
            btn.className = 'edit-style-btn style-big';
            btn.textContent = ps.name;
            if (mustHave.includes(ps.id)) btn.classList.add('selected');
            if (mustHave.length >= 5 && !mustHave.includes(ps.id)) btn.classList.add('disabled');
            btn.onclick = (e) => {
                e.preventDefault();
                if (mustHave.includes(ps.id)) {
                    mustHave = mustHave.filter(id => id !== ps.id);
                } else if (mustHave.length < 5) {
                    mustHave.push(ps.id);
                }
                renderCheckboxGrids();
            };
            gridH.appendChild(btn);
        });
        // Must Not Have
        gridN.innerHTML = '';
        PLAYSTYLES_DATA.forEach(ps => {
            if (mustHave.includes(ps.id)) return;
            const btn = document.createElement('button');
            btn.className = 'edit-style-btn style-big';
            btn.textContent = ps.name;
            if (mustNotHave.includes(ps.id)) btn.classList.add('selected');
            if (mustNotHave.length >= 5 && !mustNotHave.includes(ps.id)) btn.classList.add('disabled');
            btn.onclick = (e) => {
                e.preventDefault();
                if (mustNotHave.includes(ps.id)) {
                    mustNotHave = mustNotHave.filter(id => id !== ps.id);
                } else if (mustNotHave.length < 5) {
                    mustNotHave.push(ps.id);
                }
                renderCheckboxGrids();
            };
            gridN.appendChild(btn);
        });
    }
    renderCheckboxGrids();
    overlay.querySelector('#close-build-modal').onclick = close;
    overlay.querySelector('#cancel-build').onclick = close;
    overlay.querySelector('#save-build').onclick = function () {
        const hero = overlay.querySelector('#build-hero').value;
        const talents = overlay.querySelector('#build-talents').value.trim();
        const comment = overlay.querySelector('#build-comment').value.trim();
        const tier = parseInt(overlay.querySelector('#build-tier').value);
        if (!hero) return alert('Выберите героя');
        if (mustHave.length > 5 || mustNotHave.length > 5) return alert('Максимум 5 стилей в каждом поле!');
        if (mustHave.some(s => mustNotHave.includes(s)))
            return alert('В "должны быть" и "не должно быть" совпадают стили!');
        builds[editingBuildIndex !== null ? editingBuildIndex : builds.length] = {
            hero, mustHave: [...mustHave], mustNotHave: [...mustNotHave], talents, comment, tier, img: imgVal
        };
        persist();
        renderBuildsList();
        renderSearchResults();
        close();
    };
    function close() {
        document.body.removeChild(overlay);
    }
}
// ========== ИМПОРТ/ЭКСПОРТ ==========
function exportBuilds() {
    const data = {
        exported_at: new Date().toLocaleString('ru-RU'),
        builds_count: builds.length,
        builds
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `glad_builds_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    document.body.removeChild(a);
}
function importBuilds() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                let importedBuilds = [];
                if (Array.isArray(data)) {
                    importedBuilds = data;
                } else if (data.builds && Array.isArray(data.builds)) {
                    importedBuilds = data.builds;
                } else {
                    throw new Error('Неверный формат файла');
                }
                const validBuilds = importedBuilds.filter(build =>
                    build.hero &&
                    Array.isArray(build.mustHave) &&
                    Array.isArray(build.mustNotHave)
                );
                if (validBuilds.length === 0) {
                    alert('В файле нет корректных билдов!');
                    return;
                }
                const replace = confirm(
                    `Найдено ${validBuilds.length} билдов.\n\n` +
                    `OK - ЗАМЕНИТЬ все текущие билды\n` +
                    `Отмена - ДОБАВИТЬ к текущим`
                );
                if (replace) {
                    builds = validBuilds;
                } else {
                    builds = builds.concat(validBuilds);
                }
                persist();
                renderBuildsList();
                renderSearchResults();
                alert(`Импортировано ${validBuilds.length} билдов!`);
            } catch (error) {
                alert('Ошибка при чтении файла: ' + error.message);
            }
        };
        reader.readAsText(file);
    };
    input.click();
}
// ========== ПЕРСИСТЕНТНОСТЬ ==========
function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(builds));
}

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










