/* 자동 생성 파일 — tools/build-assets.py 가 만든다. 직접 고쳐도 되지만 다음 실행 때 덮어써진다. */
var IMG_KEYS=["alliance", "arena", "baekun", "bloodpool", "border", "cheolno", "cheonma", "courtyard", "danmok", "death", "dokgo", "end_betray", "end_burn", "end_cheonma", "end_flee", "end_guard", "end_maengju", "end_peace", "end_shadow", "end_true", "forest", "geomseong", "gwiwang", "hanseo", "hero_a", "hero_b", "hill", "hongran", "insight", "jegal", "kyoju", "library", "medit", "mukya", "night", "realm_0", "realm_1", "realm_2", "realm_3", "realm_4", "realm_5", "realm_6", "realm_7", "realm_8", "samaryeong", "slash", "throne", "tile_break", "tile_explore", "tile_meditate", "tile_mission", "tile_rest", "tile_shop", "tile_social", "tile_train", "tomb", "village", "war", "wudang", "yeoni"];
/* 분위기별 BGM 파일. 비어 있으면 코드로 작곡한 음악이 나온다. */
var BGM_FILES={"title": "", "hub": "", "story": "", "battle": "", "boss": "", "ending": "", "death": ""};
/* enemy_적ID 그림은 그 적의 초상으로 자동 연결 */
IMG_KEYS.forEach(function(k){if(k.indexOf('enemy_')===0&&!PT[k.slice(6)])PT[k.slice(6)]=k;});
