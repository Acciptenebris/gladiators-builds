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
let builds = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// ========== СОСТОЯНИЕ ==========
let selectedDisabledStyles = []; // 5 стилей которых нет в игре
let editingBuildIndex = null;

// ========== UI ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener("DOMContentLoaded", () => {
    renderDisabledStylesPicker();
    renderBuildsList();
    setupEventListeners();
});

// ========== ПОИСК БИЛДОВ ==========
function searchBuilds(disabledStyles) {
    const enabledStyles = PLAYSTYLES_DATA.map(x => x.id).filter(id => !disabledStyles.includes(id));
    return builds.filter(build => {
        if (!build.mustHave.every(s => enabledStyles.includes(s))) return false;
        if (build.mustNotHave.some(s => enabledStyles.includes(s))) return false;
        return true;
    });
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
            slot.innerHTML = `
                <span class="slot-number">${i + 1}</span>
                <span class="slot-text">${playstyle.name}</span>
            `;
        } else {
            slot.classList.add('empty');
            slot.innerHTML = `
                <span class="slot-number">${i + 1}</span>
                <span class="slot-text">Пусто</span>
            `;
        }
        
        slots.appendChild(slot);
    }
}

// ========== ПОИСКОВЫЕ РЕЗУЛЬТАТЫ ==========
function renderSearchResults() {
    renderSelectionSlots(); // Обновляем слоты
    
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
    
    results.forEach((build, idx) => {
        buildList.appendChild(buildCardView(build, idx));
    });
}

// ======= ОТРИСОВКА КАРТОЧКИ БИЛДА =======
function buildCardView(build, buildIdx) {
    // Найдем реальный индекс билда в массиве builds
    const realIndex = builds.findIndex(b => 
        b.hero === build.hero && 
        JSON.stringify(b.mustHave) === JSON.stringify(build.mustHave) &&
        JSON.stringify(b.mustNotHave) === JSON.stringify(build.mustNotHave)
    );
    
    const el = document.createElement('div');
    el.className = 'hero-card';
    el.innerHTML = `
        <div class="hero-name">${build.hero}</div>
        <div style="margin:6px 0;color:#d4af37;font-weight:bold;">Таланты: ${build.talents || ''}</div>
        <div class="style-row"><span style="color:#49d;">+ </span>${build.mustHave.map(st => styleName(st)).join(', ') || '-'}</div>
        <div class="style-row"><span style="color:#f55;">– </span>${build.mustNotHave.map(st => styleName(st)).join(', ') || '-'}</div>
        <div style="margin-top:8px; color:#eee; font-size:0.9rem;white-space:pre-wrap;">${build.comment || ''}</div>
        <div class="build-actions" style="margin-top: 10px;">
            <button class="edit-btn" onclick="editBuild(${realIndex})">✏️ Редактировать</button>
            <button class="delete-btn" onclick="deleteBuild(${realIndex})">🗑️ Удалить</button>
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
    totalSpan.textContent = builds.length;
    buildsList.innerHTML = '';
    
    builds.forEach((build, i) => {
        const el = document.createElement('div');
        el.className = 'hero-item build-item';
        el.innerHTML = `
            <div class="build-main-info">
                <div class="build-hero-name">${build.hero || '(без имени)'}</div>
                <div class="build-talents">${build.talents ? `Таланты: ${build.talents}` : ''}</div>
            </div>
            <div class="build-styles">
                <div class="styles-must-have">+ ${build.mustHave.map(styleName).join(', ') || 'нет'}</div>
                <div class="styles-must-not">– ${build.mustNotHave.map(styleName).join(', ') || 'нет'}</div>
            </div>
            <div class="build-actions">
                <button class="edit-btn" onclick="editBuild(${i})" title="Редактировать">✏️</button>
                <button class="delete-btn" onclick="deleteBuild(${i})" title="Удалить">🗑️</button>
            </div>
        `;
        buildsList.appendChild(el);
    });
}

// ========== ОБРАБОТЧИКИ СОБЫТИЙ ==========
function setupEventListeners() {
    // Кнопка сброса выбора стилей
    document.getElementById('reset-btn').addEventListener('click', function() {
        selectedDisabledStyles = [];
        renderDisabledStylesPicker();
        renderSearchResults();
    });
    
    // Кнопка добавления билда
    document.getElementById('add-build-btn').onclick = showAddBuildModal;
    
    // Кнопка экспорта
    document.getElementById('export-btn').onclick = exportBuilds;
    
    // Кнопка импорта
    document.getElementById('import-btn').onclick = importBuilds;
    
    // Кнопка сброса базы данных
    document.getElementById('reset-db').onclick = function() {
        if (confirm('Вы уверены, что хотите очистить все билды?')) {
            builds = [];
            persist();
            renderBuildsList();
            renderSearchResults();
        }
    }
}

// ========== ДОБАВЛЕНИЕ/РЕДАКТИРОВАНИЕ БИЛДОВ ==========
function showAddBuildModal() {
    editingBuildIndex = null;
    showBuildFormModal({
        hero: '',
        mustHave: [],
        mustNotHave: [],
        talents: '',
        comment: ''
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
    alert('Билд удален!');
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
                    <label for="build-talents" style="font-size:1.0rem;">Таланты:</label>
                    <input id="build-talents" style="width:110px;font-size:1.08rem;padding:7px;border-radius:7px;border:1.3px solid #aaa" value="${build.talents || ''}" placeholder="10 20 30">
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
        if (!hero) return alert('Выберите героя');
        if (mustHave.length > 5 || mustNotHave.length > 5) return alert('Максимум 5 стилей в каждом поле!');
        if (mustHave.some(s => mustNotHave.includes(s)))
            return alert('В "должны быть" и "не должно быть" совпадают стили!');
        builds[editingBuildIndex !== null ? editingBuildIndex : builds.length] = {
            hero, mustHave: [...mustHave], mustNotHave: [...mustNotHave], talents, comment
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

// ========== АВТОМАТИЧЕСКИЙ РЕНДЕР РЕЗУЛЬТАТОВ ==========
// Рендерим результаты при изменении стилей
function updateUI() {
    renderDisabledStylesPicker();
    renderSearchResults();
}

