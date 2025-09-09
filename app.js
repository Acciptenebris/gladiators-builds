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

/* ========== БАЗОВЫЕ СТИЛИ ========== */
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #1a1a1a 0%, #2d1810 100%);
    color: #fff;
    min-height: 100vh;
}

/* ========== ОСНОВНАЯ ВЕРСТКА ========== */
.app-layout { display: flex; min-height: 100vh; }
.main-container { flex: 1; overflow-y: auto; }
.container { max-width: 1200px; margin: 0 auto; padding: 20px; }

.header { text-align: center; margin-bottom: 40px; }
.header h1 {
    font-size: 2.5rem;
    color: #d4af37;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    margin-bottom: 10px;
}
.subtitle { font-size: 1.1rem; color: #ccc; }

.playstyles-section h2, .selection-section h2, .results-section h2 {
    color: #d4af37;
    font-size: 1.8rem;
    margin-bottom: 20px;
    text-align: center;
}

/* ========== КНОПКИ ВЫБОРА СТИЛЕЙ ========== */
.playstyles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
    margin-bottom: 40px;
    padding: 10px;
}
.playstyle-btn {
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%);
    border: 2px solid #34495e;
    color: #ecf0f1;
    padding: 16px 20px;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: center;
    font-size: 1rem;
    font-weight: 600;
    position: relative;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}
.playstyle-btn:hover {
    border-color: #3498db;
    background: linear-gradient(135deg, #3498db 0%, #2980b9 50%, #3498db 100%);
}
.playstyle-btn.selected {
    background: linear-gradient(135deg, #e74c3c 0%, #c0392b 50%, #e74c3c 100%);
    border-color: #e74c3c;
    color: #fff;
    font-weight: 700;
}
.playstyle-btn.selected::after {
    content: '✓';
    position: absolute;
    top: 5px;
    right: 8px;
    font-size: 14px;
    color: #fff;
}
.playstyle-btn.disabled {
    opacity: 0.4;
    cursor: not-allowed;
    background: linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%);
    border-color: #7f8c8d;
}

.selection-slots {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 30px;
    flex-wrap: wrap;
}
.slot {
    width: 150px;
    height: 80px;
    border: 2px dashed #666;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(255,255,255,0.05);
    transition: all 0.3s ease;
}
.slot.filled {
    border: 2px solid #d4af37;
    background: rgba(212, 175, 55, 0.1);
}
.slot-number { font-size: 1.2rem; font-weight: bold; color: #d4af37; }
.slot-text { font-size: 0.9rem; margin-top: 5px; }

.buttons-container, .database-controls {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-bottom: 40px;
    flex-wrap: wrap;
}
.database-controls { position: fixed; bottom: 20px; left: 20px; flex-direction: column; z-index: 100; }

/* ========== КРАСИВЫЕ КНОПКИ ========== */
.add-btn {
    background: linear-gradient(145deg, #20a14c 15%, #108751 100%);
    color: #fff;
    border: none;
    font-weight: bold;
    padding: 16px 28px;
    font-size: 1.13rem;
    border-radius: 12px;
    margin-bottom: 7px;
    box-shadow: 0 2px 8px rgba(16,160,100,0.19);
    transition: all .15s;
    letter-spacing: 0.5px;
    cursor: pointer;
}
.add-btn:hover {
    background: linear-gradient(145deg, #2ecc71, #20b262);
    color: #ffe;
}
.import-btn {
    background: linear-gradient(145deg, #9b59b6, #8e44ad);
    color: #fff; border: none; font-weight: bold; padding: 10px 15px; font-size: 0.85rem; border-radius: 8px; cursor: pointer; transition: all 0.3s ease;
}
.import-btn:hover {
    background: linear-gradient(145deg, #a569c7, #9b59b6);
}
.export-btn {
    background: linear-gradient(145deg, #2196F3, #1976D2);
    color: #fff; border: none; font-weight: bold; padding: 10px 15px; font-size: 0.85rem; border-radius: 8px; cursor: pointer; transition: all 0.3s ease;
}
.export-btn:hover {
    background: linear-gradient(145deg, #42A5F5, #2196F3);
}
.reset-btn, .reset-db-btn {
    background: linear-gradient(145deg, #c41e3a, #a01729);
    border: none; color: #fff; padding: 12px 30px; border-radius: 25px; cursor: pointer;
    font-size: 1rem; font-weight: bold; transition: all 0.3s ease;
}
.reset-db-btn { padding: 10px 15px; font-size: 0.85rem; border-radius: 8px; }
.reset-btn:hover, .reset-db-btn:hover {
    background: linear-gradient(145deg, #d4273e, #b01d30);
}

.heroes-list {
    display: flex;
    flex-direction: column;
    gap: 22px;
    width: 100%;
    max-width: 520px;
    margin: 0 auto;
    align-items: stretch;
}
.hero-card {
    background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
    border: 2px solid #d4af37;
    border-radius: 10px;
    padding: 18px 18px 13px 18px;
    text-align: left;
    font-size: 1.13rem;
    color: #ececec;
    line-height: 1.48;
    box-shadow: 0 3px 18px rgba(212,175,55,0.07);
    min-width: 320px;
    max-width: 450px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.hero-card .hero-name {
    font-size: 1.25rem;
    font-weight: bold;
    color: #ffe27d;
    margin-bottom: 8px;
    line-height: 1.18;
}
.hero-card .style-row {
    margin: 8px 0 0 0;
    font-size: 1.09rem;
    color: #c8e9ff;
    font-weight: 500;
    letter-spacing: 0.01em;
}
.hero-card .style-row span { font-size: 1.04em; font-weight: 700; }
.hero-card .build-comment,
.hero-card .build-desc,
.hero-card .build-row-comment {
    margin-top: 10px;
    color: #fffbe6;
    font-size: 1.07rem;
    background: rgba(255,255,238,0.05);
    padding: 7px 10px;
    border-radius: 6px;
    font-weight: 450;
    white-space: pre-wrap;
    word-break: break-word;
}
.build-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    flex-wrap: wrap;
    margin-top: 15px;
    margin-bottom: 0;
}
.build-actions .edit-btn,
.build-actions .delete-btn {
    font-size: 1rem;
    padding: 6px 15px;
    border-radius: 8px;
    min-width: 95px;
    margin: 0;
}

/* ========== ТИРЫ ========== */
.tier-badge {
    display: inline-block;
    min-width: 32px;
    padding: 2px 8px;
    margin-left: 10px;
    border-radius: 8px;
    font-size: 0.98rem;
    font-weight: bold;
    color: #fff;
    background: #555;
    box-shadow: 0 0 3px #0007;
    vertical-align: middle;
}
.tier-badge-1 { background: linear-gradient(90deg,#ffd400,#ffe395,#ba9647); color: #333; }
.tier-badge-2 { background: linear-gradient(90deg,#8ef08e,#59cc59); color: #233; }
.tier-badge-3 { background: linear-gradient(90deg,#6fc3e7,#407b9f); }
.tier-badge-4 { background: #888; }

/* ========== БОКОВАЯ ПАНЕЛЬ ========== */
.sidebar {
    width: 300px;
    background: linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%);
    border-left: 2px solid #333;
    padding: 20px;
    overflow-y: auto;
    position: sticky;
    top: 0;
    height: 100vh;
}

.sidebar h3 {
    color: #d4af37;
    font-size: 1.4rem;
    margin-bottom: 15px;
    text-align: center;
    border-bottom: 2px solid #333;
    padding-bottom: 10px;
}

.heroes-count {
    color: #ccc;
    font-size: 0.9rem;
    text-align: center;
    margin-bottom: 20px;
    padding: 8px;
    background: rgba(212, 175, 55, 0.1);
    border-radius: 5px;
    border: 1px solid #333;
}

.all-builds-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.hero-item, .build-item {
    background: rgba(255, 255, 255, 0.05);
    padding: 12px 8px;
    border-radius: 8px;
    border: 1px solid #333;
    color: #fff;
    font-size: 0.95rem;
    transition: all 0.2s ease;
    cursor: pointer;
    margin-bottom: 8px;
    display: block;
}
.hero-item:hover, .build-item:hover {
    background: rgba(212, 175, 55, 0.1);
    border-color: #d4af37;
    color: #d4af37;
}

/* ========== МОДАЛЬНОЕ ОКНО ========== */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}
.modal-content {
    background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
    border: 2px solid #d4af37;
    border-radius: 15px;
    padding: 25px;
    max-width: 600px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
}
.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 2px solid #333;
    padding-bottom: 15px;
}
.modal-header h3 {
    color: #d4af37;
    margin: 0;
    font-size: 1.3rem;
}
.close-btn {
    background: none;
    border: none;
    color: #d4af37;
    font-size: 2rem;
    cursor: pointer;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.close-btn:hover { color: #fff; }
.form-field { margin-bottom: 16px; }
.row-inputs {
    display: flex;
    flex-wrap: wrap;
    gap: 35px;
    align-items: flex-end;
    margin-bottom: 12px;
}
#build-hero {
    min-width: 170px;
    min-height: 38px;
    border-radius: 7px;
    font-size: 1.17rem;
    font-weight: bold;
    padding: 7px 13px;
}
.edit-styles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 12px;
    margin-bottom: 15px;
    padding: 8px;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
}
.edit-style-btn {
    background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%);
    border: 2px solid #4a6741;
    color: #ecf0f1;
    padding: 12px 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.15s ease;
    text-align: center;
    font-size: 0.95rem;
    font-weight: 500;
    min-height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
.edit-style-btn:hover {
    border-color: #27ae60;
    background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(46, 204, 113, 0.3);
}
.edit-style-btn.selected {
    background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
    border-color: #f39c12;
    color: #fff; font-weight: 600;
    box-shadow: 0 4px 15px rgba(243, 156, 18, 0.4);
    transform: scale(1.03);
}
.edit-style-btn.selected::before {
    content: '●';
    position: absolute;
    top: 3px;
    right: 6px;
    font-size: 12px;
    color: #fff;
}
.edit-style-btn.disabled {
    opacity: 0.3; cursor: not-allowed;
    background: linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%);
    border-color: #95a5a6;
    transform: none; box-shadow: none;
}
.edit-style-btn.disabled:hover {
    transform: none; box-shadow: none; border-color: #95a5a6;
    background: linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%);
}
.style-big { font-size: 1.09rem !important; min-width: 105px; min-height: 48px; margin-bottom: 5px;}

.modal-footer {
    display: flex;
    gap: 15px;
    justify-content: center;
    border-top: 2px solid #333;
    padding-top: 20px;
}
.save-btn, .cancel-btn {
    padding: 12px 25px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    transition: all 0.3s ease;
}
.save-btn {
    background: linear-gradient(145deg, #4CAF50, #45a049);
    color: #fff;
}
.save-btn:hover {
    background: linear-gradient(145deg, #5CBF60, #4CAF50);
}
.save-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.cancel-btn {
    background: linear-gradient(145deg, #666, #555);
    color: #fff;
}
.cancel-btn:hover { background: linear-gradient(145deg, #777, #666); }

/* ========== АДАПТИВНОСТЬ ========== */
@media (max-width: 1200px) {
    .sidebar { width: 250px; }
}
@media (max-width: 968px) {
    .app-layout { flex-direction: column; }
    .sidebar {
        width: 100%; height: auto; position: static; border-left: none;
        border-top: 2px solid #333; order: 2; max-height: 400px;
    }
    .main-container { order: 1; }
    .database-controls {
        bottom: 10px; left: 10px; flex-direction: row; flex-wrap: wrap;
    }
}
@media (max-width: 768px) {
    .header h1 { font-size: 2rem; }
    .selection-slots { justify-content: center; }
    .slot { width: 120px; height: 70px; }
    .playstyles-grid { grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; }
    .edit-styles-grid { grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 8px; }
    .hero-card { min-width: unset; max-width: 98vw; font-size: 1.01rem; }
    .heroes-list { padding: 0 2vw; }
}

