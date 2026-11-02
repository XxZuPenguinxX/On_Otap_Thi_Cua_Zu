(() => {
  const FONT_STACKS = {
    system: '"Segoe UI", "Arial", sans-serif',
    arial: 'Arial, "Segoe UI", sans-serif',
    tahoma: 'Tahoma, "Segoe UI", sans-serif',
    verdana: 'Verdana, "Segoe UI", sans-serif',
    georgia: 'Georgia, "Times New Roman", serif',
    trebuchet: '"Trebuchet MS", "Segoe UI", sans-serif',
  };
  const mutedColor = (text, surface) => {
    let low = 0, high = 0.6;
    for (let i = 0; i < 12; i++) {
      const middle = (low + high) / 2;
      if (contrast(blend(text, surface, middle), surface) >= 4.5) low = middle;
      else high = middle;
    }
    return blend(text, surface, low);
  };
  function findStyleRule(selector) {
    for (const sheet of document.styleSheets) {
      if (!sheet.href || new URL(sheet.href).origin !== location.origin) continue;
      try {
        for (const rule of sheet.cssRules) {
          if (rule.selectorText === selector) return rule;
        }
      } catch {
        continue;
      }
    }
    return null;
  }
  const PRESETS = [
    { id: "arctic", name: "Arctic", light: ["#edf4f5", "#f3f8f8", "#22343b", "#167c79", "#b8dfe0", "#d0e7e8"], dark: ["#26343a", "#34434a", "#e7efed", "#6bc8bb", "#35585b", "#45646a"] },
    { id: "midnight", name: "Midnight", light: ["#e8edf0", "#f5f7f8", "#28343c", "#286c75", "#c5d9de", "#d6e2e5"], dark: ["#252e36", "#303a43", "#e5eceb", "#73c7b9", "#3b4e59", "#3e6767"] },
    { id: "paper", name: "Paper", light: ["#f1e9d8", "#f7f1e5", "#352f27", "#8e6145", "#eadbc6", "#e7d4be"] },
    { id: "forest", name: "Forest", light: ["#e8f0e8", "#f1f6ef", "#25382d", "#497759", "#c5ddc8", "#d8e6bf"], dark: ["#26352c", "#34443a", "#e7eee6", "#8ebc8e", "#425f4a", "#4d6650"] },
    { id: "sunset", name: "Sunset", light: ["#f5e9df", "#faf1e8", "#49332f", "#aa5946", "#f0d0bb", "#f1cbb0"], dark: ["#3a2c30", "#49383a", "#f0e6df", "#e99878", "#664545", "#765046"] },
    { id: "ocean", name: "Ocean", light: ["#e6f0f3", "#f0f6f7", "#203743", "#246f8c", "#c1e0e8", "#d5e7ee"], dark: ["#26363e", "#33474e", "#e4edf0", "#66bad2", "#3c5962", "#3d6670"] },
    { id: "lavender", name: "Lavender", light: ["#eeeaf5", "#f6f2fa", "#352d45", "#765c99", "#d9c9ed", "#e9d6ec"], dark: ["#312d3e", "#403a50", "#eeeaf3", "#c1a6e3", "#554769", "#684e70"] },
    { id: "mono-ink", name: "Mono Ink", light: ["#efefed", "#f7f7f5", "#2d2e2e", "#565b61", "#d9dcda", "#e4e2dc"], dark: ["#292b2e", "#383b3e", "#e9e9e5", "#b3bac1", "#4a4d50", "#595a5b"] },
    { id: "cyber", name: "Cyber", light: ["#e9edf4", "#f5f7fa", "#252d3b", "#176f6b", "#c8d8e6", "#d8e2ec"], dark: ["#222833", "#2d3440", "#e3eaf0", "#69e5d0", "#3c4b5c", "#465d63"] },
    { id: "playful", name: "Playful", light: ["#f1edf4", "#f8f3fa", "#3b2e48", "#8a5988", "#e5d2e8", "#f0d7dc"], dark: ["#332c3d", "#43394c", "#f0e8f2", "#d79bd0", "#59445e", "#68475d"] },
  ];
  const FIELDS = ["background", "surface", "text", "accent", "gradientOne", "gradientTwo", "radius", "density", "shadow", "glass", "font", "fontSize", "lineHeight"];
  const COLORS = ["background", "surface", "text", "accent", "gradientOne", "gradientTwo"];
  const DEFAULTS = {
    background: "#edf4f5", surface: "#f3f8f8", text: "#22343b", accent: "#167c79",
    gradientOne: "#b8dfe0", gradientTwo: "#d0e7e8", radius: 12, density: "comfortable",
    shadow: 1, glass: false, font: "system", fontSize: 14, lineHeight: 1.65,
  };
  const COPY = {
    vi: {
      title: "Theme Studio", intro: "Chọn một phong cách, tinh chỉnh trực tiếp và lưu giao diện ngay trên máy.",
      presets: "Bộ giao diện", variant: "Sáng / tối / tự động", light: "Sáng", dark: "Tối", auto: "Tự động",
      custom: "Tinh chỉnh giao diện", preview: "Xem trước", previewText: "Một không gian dịu mắt để học tập và đọc tài liệu.",
      accent: "Màu nhấn", background: "Nền", surface: "Bề mặt thẻ", text: "Màu chữ", gradientOne: "Màu chuyển sắc 1", gradientTwo: "Màu chuyển sắc 2",
      radius: "Bo góc", density: "Mật độ", compact: "Gọn", comfortable: "Thoải mái", spacious: "Rộng",
      shadow: "Độ đổ bóng", glass: "Hiệu ứng kính mờ", font: "Phông chữ (có sẵn trên máy)", fontSize: "Cỡ chữ", lineHeight: "Chiều cao dòng",
      contrast: "Độ tương phản chữ/nền", contrastFail: "Cần đạt ít nhất 4.5:1 để lưu. Hãy chọn màu chữ hoặc nền khác.",
      save: "Lưu giao diện mới", name: "Tên giao diện", saved: "Giao diện đã lưu", choose: "Chọn giao diện đã lưu",
      duplicate: "Nhân bản", rename: "Đổi tên", delete: "Xóa", export: "Xuất JSON", import: "Nhập JSON",
      surprise: "Tạo bảng màu ngẫu nhiên", autoTheme: "Tự động theo giao diện hệ thống", timeTheme: "Tự đổi sáng/tối theo thời gian",
      warm: "Bộ lọc ánh sáng ấm", motion: "Chuyển động", off: "Tắt", calm: "Êm dịu", balanced: "Cân bằng", lively: "Sinh động",
      smart: "Tối ưu hiệu năng thông minh", smartHint: "Giảm chuyển động nền khi Ollama đang tạo câu trả lời.",
      saveOk: "Đã lưu giao diện.", imported: "Đã nhập giao diện.", invalid: "Tệp JSON không hợp lệ hoặc thiếu trường bắt buộc.",
      noCustom: "Chưa có giao diện tùy chỉnh.", savedNameRequired: "Hãy nhập tên giao diện.", deleteConfirm: "Xóa giao diện này?",
    },
    en: {
      title: "Theme Studio", intro: "Pick a look, tune it live, and keep your preferences on this computer.",
      presets: "Presets", variant: "Light / dark / automatic", light: "Light", dark: "Dark", auto: "Automatic",
      custom: "Customize appearance", preview: "Live preview", previewText: "A comfortable space for studying and reading.",
      accent: "Accent", background: "Background", surface: "Card surface", text: "Text", gradientOne: "Gradient color 1", gradientTwo: "Gradient color 2",
      radius: "Corner radius", density: "Spacing density", compact: "Compact", comfortable: "Comfortable", spacious: "Spacious",
      shadow: "Shadow strength", glass: "Frosted glass effect", font: "Font (installed locally)", fontSize: "Font size", lineHeight: "Line height",
      contrast: "Text/background contrast", contrastFail: "Must be at least 4.5:1 to save. Choose a different text or background color.",
      save: "Save as new theme", name: "Theme name", saved: "Saved themes", choose: "Choose a saved theme",
      duplicate: "Duplicate", rename: "Rename", delete: "Delete", export: "Export JSON", import: "Import JSON",
      surprise: "Surprise me", autoTheme: "Follow system appearance", timeTheme: "Switch light/dark by time of day",
      warm: "Warm light filter", motion: "Motion", off: "Off", calm: "Calm", balanced: "Balanced", lively: "Lively",
      smart: "Smart performance", smartHint: "Reduce background motion while Ollama is generating.",
      saveOk: "Theme saved.", imported: "Theme imported.", invalid: "The JSON file is invalid or missing required fields.",
      noCustom: "No custom themes saved yet.", savedNameRequired: "Enter a theme name.", deleteConfirm: "Delete this theme?",
    },
  };
  const t = (language, key) => COPY[language]?.[key] || COPY.vi[key] || key;
  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const parseColor = (value) => {
    if (!/^#[0-9a-f]{6}$/i.test(value)) return null;
    return [1, 3, 5].map((offset) => parseInt(value.slice(offset, offset + 2), 16) / 255)
      .map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
  };
  const luminance = (value) => {
    const rgb = parseColor(value);
    return rgb ? 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2] : 0;
  };
  const contrast = (a, b) => {
    const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return (high + 0.05) / (low + 0.05);
  };
  const blend = (from, to, amount) => {
    const a = from.match(/[0-9a-f]{2}/gi).map((part) => parseInt(part, 16));
    const b = to.match(/[0-9a-f]{2}/gi).map((part) => parseInt(part, 16));
    return `#${a.map((value, index) => Math.round(value * (1 - amount) + b[index] * amount).toString(16).padStart(2, "0")).join("")}`;
  };
  const validTheme = (input) => {
    if (!input || typeof input !== "object" || Array.isArray(input)) return null;
    const theme = {};
    for (const field of FIELDS) {
      if (!(field in input)) return null;
      theme[field] = input[field];
    }
    if (COLORS.some((field) => typeof theme[field] !== "string" || !parseColor(theme[field]))) return null;
    if (!Number.isInteger(theme.radius) || theme.radius < 4 || theme.radius > 28) return null;
    if (!["compact", "comfortable", "spacious"].includes(theme.density)) return null;
    if (!Number.isInteger(theme.shadow) || theme.shadow < 0 || theme.shadow > 3) return null;
    if (typeof theme.glass !== "boolean" || !Object.hasOwn(FONT_STACKS, theme.font)) return null;
    if (!Number.isInteger(theme.fontSize) || theme.fontSize < 13 || theme.fontSize > 18) return null;
    if (typeof theme.lineHeight !== "number" || theme.lineHeight < 1.5 || theme.lineHeight > 1.8) return null;
    if (contrast(theme.text, theme.background) < 4.5 || contrast(theme.text, theme.surface) < 4.5) return null;
    return theme;
  };
  const palette = (preset, variant) => {
    const values = preset[variant] || preset.light || preset.dark;
    return { ...DEFAULTS, background: values[0], surface: values[1], text: values[2], accent: values[3], gradientOne: values[4], gradientTwo: values[5] };
  };
  const newId = () => globalThis.crypto?.randomUUID?.() || `theme-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const loadData = () => {
    try { return JSON.parse(localStorage.getItem("localnote-theme-studio") || "{}"); }
    catch { return {}; }
  };
  const stored = loadData();
  const initialPreset = PRESETS.find((item) => item.id === stored.preset) || PRESETS[0];
  const initialTheme = validTheme(stored.current) || palette(initialPreset, stored.variant === "dark" ? "dark" : "light");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const state = {
    preset: initialPreset.id,
    current: initialTheme,
    custom: Array.isArray(stored.custom) ? stored.custom.flatMap((item) => {
      const theme = validTheme(item?.theme);
      return typeof item?.name === "string" && item.name.trim() && theme
        ? [{ id: typeof item.id === "string" && /^[\w-]{1,80}$/.test(item.id) ? item.id : newId(), name: item.name.trim().slice(0, 60), theme }]
        : [];
    }) : [],
    auto: ["off", "system", "time"].includes(stored.auto) ? stored.auto : "off",
    variant: ["light", "dark"].includes(stored.variant) ? stored.variant : "light",
    warm: Number.isInteger(stored.warm) ? Math.min(100, Math.max(0, stored.warm)) : 0,
    motion: ["off", "calm", "balanced", "lively"].includes(stored.motion) ? stored.motion : (reducedMotion ? "calm" : "balanced"),
    motionExplicit: stored.motionExplicit === true,
    smart: stored.smart !== false,
    selectedCustom: typeof stored.selectedCustom === "string" ? stored.selectedCustom : "",
  };
  let editorDraft = { ...state.current };

  function persist() {
    localStorage.setItem("localnote-theme-studio", JSON.stringify({
      preset: state.preset, current: state.current, custom: state.custom, auto: state.auto, variant: state.variant,
      warm: state.warm, motion: state.motion, motionExplicit: state.motionExplicit, smart: state.smart,
      selectedCustom: state.selectedCustom,
    }));
  }

  function isDark() {
    if (state.auto === "system") return matchMedia("(prefers-color-scheme: dark)").matches;
    if (state.auto === "time") {
      const hour = new Date().getHours();
      return hour >= 19 || hour < 6;
    }
    return state.variant === "dark";
  }

  function deriveDark(theme) {
    const bg = blend(theme.background, "#252e36", 0.82);
    const surface = blend(bg, theme.accent, 0.1);
    const text = "#e8eeeb";
    return { ...theme, background: bg, surface, text, gradientOne: blend(bg, theme.accent, 0.2), gradientTwo: blend(bg, theme.gradientTwo, 0.2) };
  }

  function deriveLight(theme) {
    const bg = blend(theme.background, "#f3f5f3", 0.84);
    const surface = blend(bg, "#ffffff", 0.55);
    const text = "#26343a";
    return { ...theme, background: bg, surface, text, gradientOne: blend(bg, theme.accent, 0.14), gradientTwo: blend(bg, theme.gradientTwo, 0.16) };
  }

  function activeTheme() {
    const preset = PRESETS.find((item) => item.id === state.preset);
    if (state.auto === "off") return preset ? palette(preset, state.variant) : state.current;
    if (preset) return palette(preset, isDark() ? "dark" : "light");
    if (isDark()) return state.variant === "dark" ? state.current : deriveDark(state.current);
    return state.variant === "light" ? state.current : deriveLight(state.current);
  }

  function apply(save = true) {
    const root = document.documentElement;
    const rootStyle = findStyleRule(":root")?.style;
    if (!rootStyle) return;
    const theme = activeTheme();
    const textOnAccent = [theme.text, "#eee8df", "#20262a"]
      .sort((a, b) => contrast(b, theme.accent) - contrast(a, theme.accent))[0];
    const accentDeep = [
      blend(theme.accent, theme.text, 0.2),
      blend(theme.accent, theme.background, 0.2),
    ].sort((a, b) => contrast(b, theme.background) - contrast(a, theme.background))[0];
    const density = { compact: "0.78", comfortable: "1", spacious: "1.22" }[theme.density];
    const shadow = theme.shadow;
    const variables = {
      "--paper": theme.background,
      "--surface": theme.surface,
      "--ink": theme.text,
      "--muted": mutedColor(theme.text, theme.surface),
      "--faint": mutedColor(theme.text, theme.surface),
      "--line": blend(theme.text, theme.surface, 0.82),
      "--teal": theme.accent,
      "--teal-deep": accentDeep,
      "--teal-pale": blend(theme.accent, theme.background, 0.86),
      "--accent-on": textOnAccent,
      "--gradient-one": theme.gradientOne,
      "--gradient-two": theme.gradientTwo,
      "--ui-radius": `${theme.radius}px`,
      "--ui-density": density,
      "--ui-shadow": `${shadow ? `0 ${4 + shadow * 3}px ${16 + shadow * 10}px rgba(14, 25, 30, ${0.04 + shadow * 0.025})` : "none"}`,
      "--shadow": `${shadow ? `0 ${4 + shadow * 3}px ${16 + shadow * 10}px rgba(14, 25, 30, ${0.04 + shadow * 0.025})` : "none"}`,
      "--ui-font": FONT_STACKS[theme.font],
      "--ui-font-size": `${theme.fontSize}px`,
      "--ui-line-height": String(theme.lineHeight),
      "--glass-blur": theme.glass ? "12px" : "0px",
      "--warm-opacity": String(state.warm / 1200),
      "--warm-display": state.warm ? "block" : "none",
    };
    for (const [name, value] of Object.entries(variables)) rootStyle.setProperty(name, value);
    root.dataset.motion = state.motion;
    root.dataset.glass = String(theme.glass);
    rootStyle.setProperty("color-scheme", isDark() ? "dark" : "light");
    const previewStyle = findStyleRule(".theme-preview")?.style;
    if (previewStyle) {
      previewStyle.setProperty("--preview-bg", editorDraft.background);
      previewStyle.setProperty("--preview-surface", editorDraft.surface);
      previewStyle.setProperty("--preview-text", editorDraft.text);
      previewStyle.setProperty("--preview-accent", editorDraft.accent);
      previewStyle.setProperty("--preview-accent-on", [editorDraft.text, "#eee8df", "#20262a"]
        .sort((a, b) => contrast(b, editorDraft.accent) - contrast(a, editorDraft.accent))[0]);
      previewStyle.setProperty("--preview-gradient-one", editorDraft.gradientOne);
      previewStyle.setProperty("--preview-gradient-two", editorDraft.gradientTwo);
      previewStyle.setProperty("--preview-font", FONT_STACKS[editorDraft.font]);
      previewStyle.setProperty("--preview-radius", `${editorDraft.radius}px`);
      previewStyle.setProperty("--preview-font-size", `${editorDraft.fontSize}px`);
      previewStyle.setProperty("--preview-line-height", String(editorDraft.lineHeight));
    }
    if (save) persist();
  }

  matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", () => {
    if (state.auto === "system") apply(false);
  });
  matchMedia("(prefers-reduced-motion: reduce)").addEventListener?.("change", (event) => {
    if (!state.motionExplicit) {
      state.motion = event.matches ? "calm" : "balanced";
      apply(false);
    }
  });
  document.addEventListener("visibilitychange", () => {
    document.documentElement.dataset.pageHidden = String(document.hidden);
  });
  window.setInterval(() => {
    if (state.auto === "time") apply(false);
  }, 60_000);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && state.auto === "time") apply(false);
  });
  apply();

  function fieldLabel(language, key) { return t(language, key); }
  function render(language) {
    const words = COPY[language] || COPY.vi;
    const presetButtons = PRESETS.map((preset) =>
      `<button class="theme-swatch ${state.preset === preset.id ? "selected" : ""}" type="button" data-theme-preset="${preset.id}" aria-pressed="${state.preset === preset.id}">
        <span class="theme-swatch-colors"></span><strong>${preset.name}</strong></button>`
    ).join("");
    const customOptions = state.custom.map((item) => `<option value="${escapeHTML(item.id)}" ${item.id === state.selectedCustom ? "selected" : ""}>${escapeHTML(item.name)}</option>`).join("");
    const custom = state.selectedCustom && state.custom.some((item) => item.id === state.selectedCustom);
    const colorControl = (key, label) => `<label class="theme-control"><span>${fieldLabel(language, label)}</span><input type="color" data-theme-field="${key}" value="${editorDraft[key]}"></label>`;
    const rangeControl = (key, label, min, max, step = 1) => `<label class="theme-control"><span>${fieldLabel(language, label)} <output data-theme-output="${key}">${editorDraft[key]}</output></span><input type="range" min="${min}" max="${max}" step="${step}" data-theme-field="${key}" value="${editorDraft[key]}"></label>`;
    const status = contrast(editorDraft.text, editorDraft.background);
    return `<section class="theme-studio">
      <header class="theme-studio-head"><div><h2>${words.title}</h2><p>${words.intro}</p></div><button class="button button-soft" type="button" data-theme-action="surprise">${words.surprise} ✦</button></header>
      <div class="theme-studio-section"><h3>${words.presets}</h3><div class="theme-presets">${presetButtons}</div></div>
      <div class="theme-studio-section theme-layout">
        <div><h3>${words.custom}</h3><div class="theme-controls">
          ${colorControl("accent", "accent")}${colorControl("background", "background")}${colorControl("surface", "surface")}${colorControl("text", "text")}
          ${colorControl("gradientOne", "gradientOne")}${colorControl("gradientTwo", "gradientTwo")}
          ${rangeControl("radius", "radius", 4, 28)}
          <label class="theme-control"><span>${words.density}</span><select data-theme-field="density"><option value="compact" ${editorDraft.density === "compact" ? "selected" : ""}>${words.compact}</option><option value="comfortable" ${editorDraft.density === "comfortable" ? "selected" : ""}>${words.comfortable}</option><option value="spacious" ${editorDraft.density === "spacious" ? "selected" : ""}>${words.spacious}</option></select></label>
          ${rangeControl("shadow", "shadow", 0, 3)}
          <label class="theme-control"><span>${words.font}</span><select data-theme-field="font">${Object.keys(FONT_STACKS).map((font) => `<option value="${font}" ${editorDraft.font === font ? "selected" : ""}>${font === "system" ? "Segoe UI / system" : font[0].toUpperCase() + font.slice(1)}</option>`).join("")}</select></label>
          ${rangeControl("fontSize", "fontSize", 13, 18)}
          ${rangeControl("lineHeight", "lineHeight", 1.5, 1.8, 0.05)}
          <label class="theme-control theme-check"><input type="checkbox" data-theme-field="glass" ${editorDraft.glass ? "checked" : ""}><span>${words.glass}</span></label>
        </div><p class="theme-contrast ${status >= 4.5 && contrast(editorDraft.text, editorDraft.surface) >= 4.5 ? "pass" : "fail"}">${words.contrast}: ${status.toFixed(2)}:1${status < 4.5 || contrast(editorDraft.text, editorDraft.surface) < 4.5 ? ` — ${words.contrastFail}` : ""}</p>
        <div class="theme-save-row"><input class="field" id="theme-name" maxlength="60" placeholder="${words.name}"><button type="button" class="button button-primary" data-theme-action="save" ${status < 4.5 || contrast(editorDraft.text, editorDraft.surface) < 4.5 ? "disabled" : ""}>${words.save}</button></div>
        <div class="theme-manage-row"><select class="select-field" id="saved-theme-select"><option value="">${customOptions ? words.choose : words.noCustom}</option>${customOptions}</select>
          <input class="field" id="saved-theme-name" maxlength="60" value="${custom ? escapeHTML(state.custom.find((item) => item.id === state.selectedCustom).name) : ""}" placeholder="${words.name}">
          <div class="theme-manage-actions"><button type="button" class="button" data-theme-action="duplicate">${words.duplicate}</button><button type="button" class="button" data-theme-action="rename" ${custom ? "" : "disabled"}>${words.rename}</button><button type="button" class="button button-danger" data-theme-action="delete" ${custom ? "" : "disabled"}>${words.delete}</button></div>
        </div>
        <div class="theme-file-row"><button type="button" class="button" data-theme-action="export">${words.export}</button><button type="button" class="button" data-theme-action="import">${words.import}</button><input type="file" id="theme-import" accept=".json,application/json" hidden></div>
        </div>
        <aside class="theme-preview-wrap"><h3>${words.preview}</h3><div class="theme-preview">
          <span class="theme-preview-mark">✦</span><strong>${words.preview}</strong><p>${words.previewText}</p><button type="button">${words.presets} ↗</button></div></aside>
      </div>
      <div class="theme-studio-section theme-options"><label class="theme-control"><span>${words.variant}</span><select data-theme-option="appearance">
        <option value="light" ${state.auto === "off" && state.variant === "light" ? "selected" : ""}>${words.light}</option>
        <option value="dark" ${state.auto === "off" && state.variant === "dark" ? "selected" : ""}>${words.dark}</option>
        <option value="system" ${state.auto === "system" ? "selected" : ""}>${words.autoTheme}</option>
        <option value="time" ${state.auto === "time" ? "selected" : ""}>${words.timeTheme}</option></select></label>
        <label class="theme-control"><span>${words.warm} <output data-theme-output="warm">${state.warm}</output></span><input type="range" min="0" max="100" data-theme-option="warm" value="${state.warm}"></label>
        <label class="theme-control"><span>${words.motion}</span><select data-theme-option="motion"><option value="off" ${state.motion === "off" ? "selected" : ""}>${words.off}</option><option value="calm" ${state.motion === "calm" ? "selected" : ""}>${words.calm}</option><option value="balanced" ${state.motion === "balanced" ? "selected" : ""}>${words.balanced}</option><option value="lively" ${state.motion === "lively" ? "selected" : ""}>${words.lively}</option></select></label>
        <label class="theme-control theme-check"><input type="checkbox" data-theme-option="smart" ${state.smart ? "checked" : ""}><span><strong>${words.smart}</strong><small>${words.smartHint}</small></span></label>
      </div>
    </section>`;
  }

  function choosePreset(id) {
    const preset = PRESETS.find((item) => item.id === id);
    if (!preset) return;
    state.preset = id;
    state.selectedCustom = "";
    state.variant = preset.light ? "light" : "dark";
    editorDraft = palette(preset, state.variant === "dark" ? "dark" : "light");
    state.current = { ...editorDraft };
    apply();
  }

  function surprise() {
    const hue = Math.floor(Math.random() * 360);
    const dark = Math.random() > 0.5;
    const hsl = (h, s, l) => {
      const a = s * Math.min(l, 1 - l);
      const f = (n) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
        return Math.round(255 * color).toString(16).padStart(2, "0");
      };
      return `#${f(0)}${f(8)}${f(4)}`;
    };
    editorDraft = {
      ...DEFAULTS,
      background: hsl(hue, 0.2, dark ? 0.19 : 0.94),
      surface: hsl(hue, 0.18, dark ? 0.27 : 0.98),
      text: hsl(hue + 18, 0.18, dark ? 0.9 : 0.17),
      accent: hsl(hue + 178, 0.5, dark ? 0.66 : 0.34),
      gradientOne: hsl(hue + 22, 0.44, dark ? 0.3 : 0.78),
      gradientTwo: hsl(hue + 62, 0.4, dark ? 0.32 : 0.81),
    };
    if (contrast(editorDraft.text, editorDraft.background) < 4.5 || contrast(editorDraft.text, editorDraft.surface) < 4.5) {
      editorDraft.text = dark ? "#e9eeeb" : "#28252d";
    }
    state.current = { ...editorDraft };
    state.preset = "";
    state.selectedCustom = "";
    state.auto = "off";
    state.variant = dark ? "dark" : "light";
    apply();
    refresh();
  }

  function refresh() {
    window.localNoteRefreshSettings?.();
  }

  function handleClick(event, notify) {
    const preset = event.target.closest("[data-theme-preset]");
    if (preset) { choosePreset(preset.dataset.themePreset); refresh(); return true; }
    const button = event.target.closest("[data-theme-action]");
    if (!button) return false;
    const action = button.dataset.themeAction;
    const language = document.documentElement.lang === "en" ? "en" : "vi";
    const name = document.querySelector("#theme-name")?.value.trim();
    if (action === "surprise") { surprise(); return true; }
    if (action === "import") { document.querySelector("#theme-import")?.click(); return true; }
    if (action === "save") {
      if (!name) { notify(t(language, "savedNameRequired")); return true; }
      const record = { id: newId(), name: name.slice(0, 60), theme: { ...editorDraft } };
      state.custom.push(record);
      state.current = { ...editorDraft };
      state.selectedCustom = record.id;
      state.preset = "";
      apply(); refresh(); notify(t(language, "saveOk")); return true;
    }
    if (action === "duplicate") {
      const original = state.custom.find((item) => item.id === state.selectedCustom);
      const record = { id: newId(), name: `${original?.name || "Custom"} copy`.slice(0, 60), theme: { ...(original?.theme || editorDraft) } };
      state.custom.push(record); state.selectedCustom = record.id; state.current = { ...record.theme }; editorDraft = { ...record.theme };
      state.preset = ""; apply(); refresh(); return true;
    }
    if (action === "rename") {
      const record = state.custom.find((item) => item.id === state.selectedCustom);
      const newName = document.querySelector("#saved-theme-name")?.value.trim();
      if (record && newName) { record.name = newName.slice(0, 60); persist(); refresh(); notify(t(language, "saveOk")); }
      else notify(t(language, "savedNameRequired"));
      return true;
    }
    if (action === "delete") {
      const record = state.custom.find((item) => item.id === state.selectedCustom);
      if (record && window.confirm(t(language, "deleteConfirm"))) {
        state.custom = state.custom.filter((item) => item.id !== record.id);
        state.selectedCustom = ""; state.preset = "arctic";
        editorDraft = palette(PRESETS[0], "light"); state.current = { ...editorDraft };
        apply(); refresh();
      }
      return true;
    }
    if (action === "export") {
      const payload = JSON.stringify({ format: "LocalNote themes", version: 1, themes: state.custom.map(({ name: themeName, theme }) => ({ name: themeName, theme })) }, null, 2);
      const link = document.createElement("a");
      const url = URL.createObjectURL(new Blob([payload], { type: "application/json" }));
      link.href = url;
      link.download = "localnote-themes.json"; link.click(); window.setTimeout(() => URL.revokeObjectURL(url), 0); return true;
    }
    return false;
  }

  function handleInput(event) {
    const warmControl = event.target.closest('[data-theme-option="warm"]');
    if (warmControl) {
      state.warm = Math.min(100, Math.max(0, Number(warmControl.value)));
      const output = document.querySelector('[data-theme-output="warm"]');
      if (output) output.value = String(state.warm);
      apply();
      return true;
    }
    const control = event.target.closest("[data-theme-field]");
    if (!control) return false;
    const key = control.dataset.themeField;
    let value = control.type === "checkbox" ? control.checked : control.type === "range" ? Number(control.value) : control.value;
    if (key === "lineHeight") value = Number(value);
    editorDraft = { ...editorDraft, [key]: value };
    state.current = { ...editorDraft };
    state.preset = "";
    state.selectedCustom = "";
    const output = document.querySelector(`[data-theme-output="${key}"]`);
    if (output) output.value = String(value);
    apply();
    const status = document.querySelector(".theme-contrast");
    if (status) {
      const ratio = contrast(editorDraft.text, editorDraft.background);
      const valid = ratio >= 4.5 && contrast(editorDraft.text, editorDraft.surface) >= 4.5;
      status.classList.toggle("pass", valid); status.classList.toggle("fail", !valid);
      status.textContent = `${t(document.documentElement.lang, "contrast")}: ${ratio.toFixed(2)}:1${valid ? "" : ` — ${t(document.documentElement.lang, "contrastFail")}`}`;
      const save = document.querySelector('[data-theme-action="save"]');
      if (save) save.disabled = !valid;
    }
    return true;
  }

  function handleChange(event, notify) {
    const option = event.target.closest("[data-theme-option]");
    if (option) {
      const key = option.dataset.themeOption;
      if (key === "appearance") {
        state.auto = ["system", "time"].includes(option.value) ? option.value : "off";
        const preset = PRESETS.find((item) => item.id === state.preset);
        const previousVariant = state.variant;
        const targetVariant = option.value === "light" || option.value === "dark"
          ? option.value
          : isDark() ? "dark" : "light";
        state.variant = targetVariant;
        if (preset) {
          editorDraft = palette(preset, targetVariant);
          state.current = { ...editorDraft };
        } else if (previousVariant !== targetVariant) {
          state.current = targetVariant === "dark" ? deriveDark(state.current) : deriveLight(state.current);
          editorDraft = { ...state.current };
        }
        apply(); refresh(); return true;
      }
      if (key === "motion") {
        state.motion = option.value; state.motionExplicit = true;
        document.documentElement.dataset.motion = state.motion;
        persist(); return true;
      }
      if (key === "smart") { state.smart = option.checked; persist(); return true; }
    }
    const field = event.target.closest("[data-theme-field]");
    if (field) return handleInput(event);
    if (event.target.id === "saved-theme-select") {
      const record = state.custom.find((item) => item.id === event.target.value);
      if (record) {
        state.current = { ...record.theme }; editorDraft = { ...record.theme };
        state.selectedCustom = record.id; state.preset = ""; apply(); refresh();
      }
      return true;
    }
    if (event.target.id === "theme-import") {
      const file = event.target.files?.[0];
      if (!file) return true;
      event.target.value = "";
      if (file.size > 200_000) { notify(t(document.documentElement.lang, "invalid")); return true; }
      file.text().then((text) => {
        const payload = JSON.parse(text);
        if (payload?.format !== "LocalNote themes" || payload?.version !== 1 || !Array.isArray(payload.themes) || payload.themes.length > 100) {
          throw new Error("Unsupported theme file.");
        }
        const imported = payload.themes.map((item) => {
          const theme = validTheme(item?.theme);
          if (!theme || typeof item?.name !== "string" || !item.name.trim() || item.name.length > 60) throw new Error("Invalid theme.");
          return { id: newId(), name: item.name.trim(), theme };
        });
        state.custom.push(...imported); persist(); refresh(); notify(t(document.documentElement.lang, "imported"));
      }).catch(() => notify(t(document.documentElement.lang, "invalid")));
      return true;
    }
    return false;
  }

  function setGenerating(generating) {
    const root = document.documentElement;
    root.dataset.generating = String(generating);
    root.dataset.smartCalm = String(generating && state.smart);
  }

  window.LocalNoteThemeStudio = { render, handleClick, handleInput, handleChange, setGenerating };
})();
