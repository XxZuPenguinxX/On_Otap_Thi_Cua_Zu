const SUBJECTS = [
  { id: "ngu-van", name: "Ngữ Văn", en: "Literature", emoji: "📚", group: "Xã hội" },
  { id: "toan", name: "Toán", en: "Mathematics", emoji: "📐", group: "Tự nhiên" },
  { id: "tieng-anh", name: "Tiếng Anh", en: "English", emoji: "🌍", group: "Ngoại ngữ" },
  { id: "vat-ly", name: "Vật lí", en: "Physics", emoji: "⚛️", group: "Tự nhiên" },
  { id: "hoa-hoc", name: "Hóa học", en: "Chemistry", emoji: "🧪", group: "Tự nhiên" },
  { id: "sinh-hoc", name: "Sinh học", en: "Biology", emoji: "🧬", group: "Tự nhiên" },
  { id: "lich-su", name: "Lịch sử", en: "History", emoji: "🏛️", group: "Xã hội" },
  { id: "dia-ly", name: "Địa lí", en: "Geography", emoji: "🗺️", group: "Xã hội" },
  { id: "gdktepl", name: "Giáo dục kinh tế và pháp luật", en: "Economics and Law", emoji: "⚖️", group: "Xã hội" },
  { id: "tin-hoc", name: "Tin học", en: "Informatics", emoji: "💻", group: "Công nghệ" },
  { id: "cong-nghe", name: "Công nghệ", en: "Technology", emoji: "🛠️", group: "Công nghệ" },
  { id: "the-chat", name: "Giáo dục thể chất", en: "Physical Education", emoji: "🏃", group: "Kĩ năng" },
  { id: "quoc-phong", name: "Giáo dục quốc phòng và an ninh", en: "National Defence and Security", emoji: "🕊️", group: "Kĩ năng" },
];

const COMMANDS = [
  { id: "dashboard", key: "dashboard", icon: "⌂", shortcut: "Alt+1" },
  { id: "subjects", key: "subjects", icon: "▦", shortcut: "Alt+2" },
  { id: "library", key: "library", icon: "▤", shortcut: "Alt+3" },
  { id: "assistant", key: "assistant", icon: "✳", shortcut: "Alt+4" },
  { id: "settings", key: "settings", icon: "⚙", shortcut: "Alt+5" },
];

const COMBINATIONS = [
  { id: "A00", subjects: ["Toán", "Vật lí", "Hóa học"] },
  { id: "A01", subjects: ["Toán", "Vật lí", "Tiếng Anh"] },
  { id: "A02", subjects: ["Toán", "Vật lí", "Sinh học"] },
  { id: "B00", subjects: ["Toán", "Hóa học", "Sinh học"] },
  { id: "C00", subjects: ["Ngữ Văn", "Lịch sử", "Địa lí"] },
  { id: "C01", subjects: ["Toán", "Ngữ Văn", "Vật lí"] },
  { id: "C02", subjects: ["Toán", "Ngữ Văn", "Hóa học"] },
  { id: "D01", subjects: ["Toán", "Ngữ Văn", "Tiếng Anh"] },
  { id: "D07", subjects: ["Toán", "Hóa học", "Tiếng Anh"] },
  { id: "D08", subjects: ["Toán", "Sinh học", "Tiếng Anh"] },
  { id: "D14", subjects: ["Ngữ Văn", "Lịch sử", "Tiếng Anh"] },
  { id: "D15", subjects: ["Ngữ Văn", "Địa lí", "Tiếng Anh"] },
];

const COPY = {
  vi: {
    today: "Hôm nay", dashboard: "Tổng quan", subjects: "Môn học", library: "Nguồn của bạn", assistant: "Trợ lý học tập", settings: "Cài đặt",
    commandTitle: "Bảng lệnh nhanh", commandDescription: "Tìm nhanh và mở một khu vực của LocalNote.", commandSearch: "Gõ để tìm...", commandSearchLabel: "Tìm lệnh", commandEmpty: "Không tìm thấy lệnh phù hợp.", commandHint: "Enter mở kết quả đầu tiên · Esc đóng · Alt+1–5 chuyển khu vực · / tìm môn học",
    hello: "Chào bạn, hôm nay mình học gì?", intro: "Gom tài liệu của bạn lại. Zu sẽ giúp tóm tắt, tạo bài luyện tập và chỉ ra điểm cần kiểm tra — ngay trên máy này.",
    focusTitle: "Bắt đầu từ môn bạn đang học", focusHint: "Chọn một môn để mở tài liệu, ôn tập và tự kiểm tra.",
    recentSources: "Nguồn mới thêm", seeAll: "Xem tất cả", noSources: "Chưa có tài liệu nào. Thêm ghi chú, đề cương hoặc đường dẫn của bạn để bắt đầu ôn tập.",
    quickTitle: "Học cùng Zu", quickHint: "Dựa trên tài liệu đã lưu của bạn.", quickSummary: "Tổng hợp kiến thức", quickSummaryHint: "Chắt lọc ý chính theo môn", quickQuiz: "Tạo bài kiểm tra", quickQuizHint: "Luyện tập từ nguồn của bạn", quickCheck: "Rà soát thông tin", quickCheckHint: "Tìm chỗ thiếu, sai hoặc mâu thuẫn",
    browseSubjects: "Tất cả môn học", searchSubject: "Tìm môn học…", subjectsHint: "Zu đi sâu hơn vào môn thuộc tổ hợp bạn chọn; các môn khác vẫn có thể ôn theo tài liệu.",
    noCombo: "Chưa chọn tổ hợp", comboName: "Tổ hợp", subjectsInCombo: "Môn trong tổ hợp", chooseComboFirst: "Chọn tổ hợp xét tuyển",
    back: "← Quay lại", studyMaterials: "Ôn tập từ nguồn của bạn", studyHint: "Chọn tác vụ. Zu chỉ dùng tài liệu phù hợp đã lưu và sẽ nêu nguồn khi có thể.",
    tabSummary: "Tổng hợp", tabCheck: "Đối chiếu lỗi", tabQuiz: "Bài kiểm tra", tabGrade: "Chấm bài Văn",
    requestLabel: "Bạn muốn ôn phần nào?", requestPlaceholder: "Ví dụ: Các giai đoạn nguyên phân, bài thơ Tây Tiến…", essayLabel: "Dán bài viết của bạn", essayPlaceholder: "Dán bài văn cần nhận xét vào đây…",
    runSummary: "Tạo bản tổng hợp", runCheck: "Bắt đầu đối chiếu", runQuiz: "Tạo 5 câu hỏi", runGrade: "Nhận xét bài viết", sourceBasis: "Nguồn sẽ được dùng", noRelevant: "Chưa có nguồn phù hợp cho môn này.", addSource: "Thêm tài liệu",
    result: "Kết quả từ mô hình local", thinking: "Zu đang đọc tài liệu và suy nghĩ…", failed: "Chưa thể hoàn thành tác vụ.", verifyNote: "Hãy đối chiếu nội dung dưới đây với tài liệu gốc. Điểm số của bài Văn chỉ mang tính tham khảo, không phải điểm thi chính thức.",
    verified: "Đã đối chiếu lần hai", unverified: "Không chạy được lượt đối chiếu thứ hai. Đây là bản nháp chưa được kiểm chứng; hãy xác minh với tài liệu gốc.", modelChanged: "Zu dùng mô hình local nhẹ hơn cho lượt đối chiếu.",
    rubricTitle: "Nhận xét theo tiêu chí", score: "Điểm tham khảo", thesis: "Luận điểm / trả lời đề", evidence: "Lập luận và dẫn chứng", organization: "Bố cục và mạch lạc", languageCriterion: "Ngôn ngữ và diễn đạt", strengths: "Điểm tốt", issues: "Điểm cần sửa", recommendations: "Hướng khắc phục", revisionExample: "Gợi ý sửa một đoạn", caveats: "Lưu ý",
    libraryTitle: "Nguồn học tập của bạn", libraryHint: "Tài liệu chỉ lưu trên máy đang chạy ứng dụng. Zu dùng chúng để tạo tổng hợp, câu hỏi và câu trả lời có căn cứ.",
    pasteSource: "Thêm ghi chú hoặc nội dung", sourceTitle: "Tên tài liệu", subject: "Môn học", chooseSubject: "Chọn môn", contentLabel: "Nội dung", contentPlaceholder: "Dán ghi chú, đề cương hoặc đoạn trích…", saveSource: "Lưu nguồn",
    uploadTitle: "Tải tệp lên", uploadHint: "Hỗ trợ .txt, .md và PDF có văn bản chọn được (tối đa 5 MB).", chooseFile: "Chọn tệp", uploadFile: "Thêm tệp vào thư viện",
    delete: "Xóa", addedAt: "Đã thêm", noDocsYet: "Chưa có nguồn học tập", chars: "ký tự", documentCount: "tài liệu",
    assistantTitle: "Trợ lý học tập của bạn", assistantIntro: "Hỏi về bài đang học. Zu ưu tiên tài liệu bạn đã thêm và sẽ nói rõ khi chưa đủ căn cứ.", askPlaceholder: "Nhập câu hỏi của bạn…", send: "Gửi", noAssistantDocs: "Chưa có nguồn của bạn; câu trả lời chung có thể không khớp đề cương.",
    ollamaReady: "AI local đã sẵn sàng", ollamaMissing: "Chưa kết nối Ollama", ollamaNoModel: "Chưa có mô hình", modelFallback: "Mô hình ưu tiên chưa được cài; LocalNote đã chọn một mô hình chat khác có sẵn.", checking: "Đang kiểm tra…", useModel: "Mô hình", installModel: "Cài Ollama, rồi tải model chat tương thích mà bạn chọn.",
    settingsTitle: "Cài đặt", settingsHint: "Chọn mô hình đã cài trong Ollama. Zu không tải mô hình hoặc gửi tài liệu lên đám mây.", modelLabel: "Mô hình AI local", noModels: "Chưa có mô hình Ollama", settingsLanguage: "Ngôn ngữ giao diện", thinkingMode: "Bật chế độ suy nghĩ của Qwen3", thinkingHint: "Mặc định tắt để phản hồi nhanh hơn; chỉ áp dụng nếu mô hình hỗ trợ.", settingsData: "Dữ liệu học tập", settingsDataHint: "Tài liệu và ghi chú được lưu trong SQLite trên máy này.",
    dataLocation: "Tệp dữ liệu trên máy", historySaved: "Lịch sử trợ lý được lưu trên máy này.", historyCount: "lượt đã lưu", clearHistory: "Xóa lịch sử trò chuyện", clearHistoryConfirm: "Xóa toàn bộ lịch sử trợ lý khỏi máy này? Tài liệu nguồn sẽ không bị xóa.", historyCleared: "Đã xóa lịch sử trò chuyện.", historySaveFailed: "Không lưu được lượt trò chuyện vào ổ đĩa.",
    save: "Lưu", saved: "Đã lưu", cancelled: "Đã hủy",     done: "Hoàn tất", submitQuiz: "Chấm bài luyện tập", quizScore: "Kết quả", quizEmpty: "Mô hình chưa trả về định dạng câu hỏi hợp lệ. Hãy thử tạo lại.", essayInvalid: "Chưa thể hiển thị nhận xét theo đúng tiêu chí. Hãy thử lại.", quizSource: "Nguồn", language: "Ngôn ngữ",
    noSearchResults: "Không tìm thấy môn phù hợp.", removeConfirm: "Xóa tài liệu này khỏi máy?", emptyResponse: "Mô hình chưa trả về nội dung.",
    useCombo: "Đang ưu tiên", deepFocus: "Zu sẽ đào sâu môn thuộc tổ hợp bạn chọn.", examFocus: "Môn này được tổng hợp theo hướng ôn thi.", studyAction: "Học ngay", welcomeDate: "Một bước nhỏ hôm nay, tự tin hơn ngày mai.", sourceFrom: "Nguồn", sending: "Đang gửi…",
  },
  en: {
    today: "Today", dashboard: "Overview", subjects: "Subjects", library: "Your sources", assistant: "Study assistant", settings: "Settings",
    commandTitle: "Quick command menu", commandDescription: "Find and open a LocalNote area.", commandSearch: "Type to search...", commandSearchLabel: "Search commands", commandEmpty: "No matching commands.", commandHint: "Enter opens the first result · Esc closes · Alt+1–5 changes section · / searches subjects",
    hello: "What shall we study today?", intro: "Bring your learning materials together. Zu can summarize, create practice questions, and flag points to verify — right on this computer.",
    focusTitle: "Start with a subject", focusHint: "Choose a subject to open your sources, review, and self-test.",
    recentSources: "Recently added", seeAll: "See all", noSources: "No materials yet. Add your notes, study guide, or a link to start reviewing.",
    quickTitle: "Study with Zu", quickHint: "Grounded in your saved materials.", quickSummary: "Summarize knowledge", quickSummaryHint: "Distill key ideas by subject", quickQuiz: "Create a practice quiz", quickQuizHint: "Practice from your sources", quickCheck: "Check for errors", quickCheckHint: "Find gaps, mistakes, or conflicts",
    browseSubjects: "All subjects", searchSubject: "Find a subject…", subjectsHint: "Zu goes deeper on subjects in your selected combinations; other subjects remain available for source-based review.",
    noCombo: "No combination selected", comboName: "Combination", subjectsInCombo: "Subjects in this combination", chooseComboFirst: "Choose an exam combination",
    back: "← Back", studyMaterials: "Study from your sources", studyHint: "Choose an action. Zu uses relevant saved materials and cites sources when possible.",
    tabSummary: "Summary", tabCheck: "Double-check", tabQuiz: "Practice quiz", tabGrade: "Grade literature",
    requestLabel: "What would you like to review?", requestPlaceholder: "e.g. Mitosis stages, the poem Tây Tiến…", essayLabel: "Paste your essay", essayPlaceholder: "Paste the essay you want feedback on…",
    runSummary: "Create summary", runCheck: "Double-check sources", runQuiz: "Create 5 questions", runGrade: "Review essay", sourceBasis: "Sources to use", noRelevant: "No relevant source found for this subject.", addSource: "Add a source",
    result: "Local model result", thinking: "Zu is reading and thinking…", failed: "The task could not be completed.", verifyNote: "Compare this with your original material. Literature feedback is formative, not an official exam score.",
    verified: "Second-pass check complete", unverified: "The second verification pass could not run. This is an unverified draft; check it against the original material.", modelChanged: "Zu used a lighter local model for verification.",
    rubricTitle: "Rubric feedback", score: "Indicative score", thesis: "Thesis / answering the prompt", evidence: "Reasoning and evidence", organization: "Organization and coherence", languageCriterion: "Language and expression", strengths: "Strengths", issues: "Issues to address", recommendations: "Actionable next steps", revisionExample: "Short revision example", caveats: "Caveats",
    libraryTitle: "Your study sources", libraryHint: "Materials stay on the computer running this app. Zu uses them to ground summaries, quizzes, and answers.",
    pasteSource: "Add notes or text", sourceTitle: "Source title", subject: "Subject", chooseSubject: "Choose a subject", contentLabel: "Content", contentPlaceholder: "Paste notes, a study guide, or an excerpt…", saveSource: "Save source",
    uploadTitle: "Upload a file", uploadHint: "Supports .txt, .md, and selectable-text PDF (up to 5 MB).", chooseFile: "Choose file", uploadFile: "Add file to library",
    delete: "Delete", addedAt: "Added", noDocsYet: "No study sources yet", chars: "characters", documentCount: "sources",
    assistantTitle: "Your study assistant", assistantIntro: "Ask about what you are learning. Zu prioritizes your added sources and says when evidence is insufficient.", askPlaceholder: "Type your question…", send: "Send", noAssistantDocs: "No personal sources yet; general answers may not match your curriculum.",
    ollamaReady: "Local AI is ready", ollamaMissing: "Ollama not connected", ollamaNoModel: "No model installed", modelFallback: "The preferred model is not installed; LocalNote selected another available chat model.", checking: "Checking…", useModel: "Model", installModel: "Install Ollama, then download a compatible chat model of your choice.",
    settingsTitle: "Settings", settingsHint: "Choose an installed Ollama model. Zu does not download models or send study materials to the cloud.", modelLabel: "Local AI model", noModels: "No Ollama models installed", settingsLanguage: "Interface language", thinkingMode: "Enable Qwen3 thinking mode", thinkingHint: "Off by default for faster responses; only used by models that support it.", settingsData: "Study data", settingsDataHint: "Documents and notes are stored in SQLite on this computer.",
    dataLocation: "Local database file", historySaved: "Study assistant history is saved on this computer.", historyCount: "saved turns", clearHistory: "Clear chat history", clearHistoryConfirm: "Delete all assistant chat history from this computer? Study sources will not be deleted.", historyCleared: "Chat history cleared.", historySaveFailed: "Could not save this conversation to disk.",
    save: "Save", saved: "Saved", cancelled: "Cancelled",     done: "Done", submitQuiz: "Check answers", quizScore: "Score", quizEmpty: "The model did not return valid questions. Please try again.", essayInvalid: "Feedback did not match the required rubric. Please try again.", quizSource: "Source", language: "Language",
    noSearchResults: "No matching subjects found.", removeConfirm: "Delete this source from this computer?", emptyResponse: "The model returned an empty response.",
    useCombo: "Prioritized", deepFocus: "Zu will go deeper on subjects in your selected combinations.", examFocus: "This subject is kept to a concise exam-oriented review.", studyAction: "Study now", welcomeDate: "One small step today, more confidence tomorrow.", sourceFrom: "Source", sending: "Sending…",
  },
};

const state = {
  language: localStorage.getItem("zu-language") || "vi",
  view: "dashboard",
  subject: SUBJECTS[0],
  subjectMode: "summary",
  combinations: JSON.parse(localStorage.getItem("zu-combinations") || "[]"),
  status: null,
  selectedModel: localStorage.getItem("zu-model") || "",
  thinkingMode: localStorage.getItem("zu-thinking-mode") === "true",
  documents: [],
  quiz: null,
  chat: [],
  busy: false,
  fallbackNoticeShown: false,
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const t = (key) => COPY[state.language][key] || COPY.vi[key] || key;
const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const subjectName = (subject) => state.language === "en" ? subject.en : subject.name;
const selectedSubject = () => state.subject || SUBJECTS[0];
const comboNames = () => state.combinations.map((id) => COMBINATIONS.find((item) => item.id === id)?.subjects || []).flat();
const comboPayload = () => state.combinations
  .map((id) => COMBINATIONS.find((item) => item.id === id))
  .filter(Boolean)
  .map((item) => ({ code: item.id, subjects: item.subjects }));

function applyLanguage() {
  document.documentElement.lang = state.language;
  $$("[data-vi][data-en]").forEach((el) => { el.textContent = el.dataset[state.language]; });
  $("#language-toggle").innerHTML = `${state.language === "vi" ? "EN" : "VI"} <span>↗</span>`;
  const commandTrigger = $("#open-command");
  if (commandTrigger) {
    commandTrigger.setAttribute("aria-label", state.language === "vi" ? "Mở bảng lệnh (Ctrl+K hoặc ⌘K)" : "Open command menu (Ctrl+K or ⌘K)");
    commandTrigger.title = state.language === "vi" ? "Bảng lệnh · Ctrl+K / ⌘K" : "Command menu · Ctrl+K / ⌘K";
  }
  $("#current-crumb").textContent = state.view === "subject" ? subjectName(selectedSubject()) : t(state.view);
  renderCombinationBar();
}

function renderSettings() {
  return `<div class="welcome-row"><div class="welcome-copy"><h1>${escapeHTML(t("settingsTitle"))}</h1><p class="subheading">${escapeHTML(t("settingsHint"))}</p></div></div>
    <section class="settings-section"><label class="form-label" for="settings-model">${escapeHTML(t("modelLabel"))}</label>
      <select class="select-field settings-model" id="settings-model" ${state.status?.ollama_connected && state.status?.models?.length ? "" : "disabled"}>
        ${(state.status?.models || []).length ? state.status.models.map((model) => `<option value="${escapeHTML(model)}" ${model === state.selectedModel ? "selected" : ""}>${escapeHTML(model)}</option>`).join("") : `<option value="">${escapeHTML(t("noModels"))}</option>`}
      </select>
      <small class="form-help">${escapeHTML(state.status?.ollama_connected ? t("installModel") : t("ollamaMissing"))}</small>
    </section>
    <section class="settings-section"><span class="form-label">${escapeHTML(t("settingsLanguage"))}</span>
      <button class="button" id="settings-language">${state.language === "vi" ? "Tiếng Việt · VI" : "English · EN"} ↗</button>
    </section>
    <section class="settings-section"><label class="setting-toggle-row"><input id="thinking-mode" type="checkbox" ${state.thinkingMode ? "checked" : ""}><span><strong>${escapeHTML(t("thinkingMode"))}</strong><small>${escapeHTML(t("thinkingHint"))}</small></span></label></section>
    <section class="settings-section"><h2>${escapeHTML(t("settingsData"))}</h2><p class="subheading">${escapeHTML(t("settingsDataHint"))} ${state.documents.length} ${escapeHTML(t("documentCount"))}; ${state.status?.conversation_count || 0} ${escapeHTML(t("historyCount"))}.</p>
      <label class="form-help">${escapeHTML(t("dataLocation"))}</label><code class="data-location" id="data-location">${escapeHTML(state.status?.data_path || "")}</code>
      <button class="text-button" id="copy-data-path">${state.language === "vi" ? "Sao chép đường dẫn" : "Copy path"} ↗</button></section>
    ${window.LocalNoteThemeStudio.render(state.language)}`;
}

function updateStatus() {
  const connected = !!state.status?.ollama_connected;
  const ready = connected && !!state.status?.models?.length;
  const pill = $("#connection-pill");
  pill.classList.toggle("online", ready);
  pill.classList.toggle("offline", !ready);
  $("#connection-label").textContent = ready
    ? t("ollamaReady")
    : connected ? t("ollamaNoModel") : t("ollamaMissing");
  if (!state.selectedModel || !state.status?.models?.includes(state.selectedModel)) {
    state.selectedModel = state.status?.selected_model || "";
  }
  const select = $("#local-model");
  const options = (state.status?.models || []).length
    ? state.status.models.map((model) =>
    `<option value="${escapeHTML(model)}">${escapeHTML(model)}</option>`
    ).join("")
    : `<option value="">${escapeHTML(t("noModels"))}</option>`;
  select.innerHTML = options;
  select.disabled = !ready;
  if (state.selectedModel) select.value = state.selectedModel;
  const settingsSelect = $("#settings-model");
  if (settingsSelect) {
    settingsSelect.innerHTML = options;
    settingsSelect.disabled = !ready;
    if (state.selectedModel) settingsSelect.value = state.selectedModel;
  }
  $("#rail-model").textContent = ready
    ? `${t("useModel")}: ${state.selectedModel}`
    : connected ? t("installModel") : t("installModel");
  const modelName = $("#active-model-name");
  if (modelName) modelName.textContent = state.selectedModel || "Ollama";
}

function renderCombinationBar() {
  const chips = $("#combination-chips");
  chips.innerHTML = state.combinations.length
    ? state.combinations.map((id) => `<span class="combo-chip">${escapeHTML(id)}</span>`).join("")
    : `<span class="combo-chip">${escapeHTML(t("noCombo"))}</span>`;
}

async function api(url, options = {}) {
  const requestUrl = new URL(url, location.origin);
  if (requestUrl.origin !== location.origin || !requestUrl.pathname.startsWith("/api/")) {
    throw new Error("LocalNote only allows same-origin API requests.");
  }
  const response = await fetch(requestUrl, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `HTTP ${response.status}`);
  return data;
}

async function loadStatus() {
  try { state.status = await api("/api/status"); }
  catch { state.status = { ollama_connected: false, models: [], document_count: 0 }; }
  updateStatus();
  if (state.status.model_fallback && !state.fallbackNoticeShown) {
    state.fallbackNoticeShown = true;
    notify(t("modelFallback"));
  }
}

async function loadDocuments() {
  try {
    state.documents = await api("/api/documents");
    $("#source-count").textContent = state.documents.length;
    if (state.view === "dashboard" || state.view === "library") render();
  } catch (error) { notify(error.message); }
}

function setView(view) {
  state.view = view;
  $$(".nav-item[data-view]").forEach((el) => el.classList.toggle("active", el.dataset.view === view));
  $("#current-crumb").textContent = t(view);
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function render() {
  applyLanguage();
  const workspace = $("#workspace");
  if (state.view === "dashboard") workspace.innerHTML = renderDashboard();
  else if (state.view === "subjects") workspace.innerHTML = renderSubjects();
  else if (state.view === "subject") workspace.innerHTML = renderSubjectDetail();
  else if (state.view === "library") workspace.innerHTML = renderLibrary();
  else if (state.view === "assistant") workspace.innerHTML = renderAssistant();
  else if (state.view === "settings") workspace.innerHTML = renderSettings();
}
window.localNoteRefreshSettings = () => {
  if (state.view === "settings") render();
};

function renderCommandList(query = "") {
  const list = $("#command-list");
  if (!list) return;
  const normalized = query.trim().toLocaleLowerCase();
  const commands = COMMANDS.filter((command) =>
    !normalized || `${COPY.vi[command.key]} ${COPY.en[command.key]} ${command.shortcut}`.toLocaleLowerCase().includes(normalized)
  );
  list.innerHTML = commands.length
    ? commands.map((command) => `<button class="command-item" type="button" data-command="${command.id}" aria-keyshortcuts="${command.shortcut}"><span class="command-item-icon" aria-hidden="true">${command.icon}</span><span>${escapeHTML(t(command.key))}</span><kbd>${command.shortcut}</kbd></button>`).join("")
    : `<p class="command-empty">${escapeHTML(t("commandEmpty"))}</p>`;
}

function openCommandPalette() {
  const dialog = $("#command-dialog");
  if (!dialog) return;
  const combinationDialog = $("#combination-dialog");
  if (combinationDialog.open) combinationDialog.close();
  $("#command-title").textContent = t("commandTitle");
  $("#command-description").textContent = t("commandDescription");
  $("#command-search").placeholder = t("commandSearch");
  $("#command-search").setAttribute("aria-label", t("commandSearchLabel"));
  dialog.querySelector(".command-dialog-head .icon-button")?.setAttribute("aria-label", state.language === "vi" ? "Đóng bảng lệnh" : "Close command menu");
  $("#command-hint").textContent = t("commandHint");
  $("#command-search").value = "";
  renderCommandList();
  if (!dialog.open) dialog.showModal();
  $("#command-search").focus();
}

function subjectTile(subject) {
  const selected = comboNames().includes(subject.name);
  const count = state.documents.filter((doc) => doc.subject === subject.name).length;
  return `<button class="subject-tile" data-subject="${escapeHTML(subject.id)}">
    <span class="subject-emoji">${subject.emoji}</span><span class="tile-arrow">↗</span>
    <strong>${escapeHTML(subjectName(subject))}</strong>
    <small>${selected ? `${escapeHTML(t("useCombo"))} · ` : ""}${count} ${escapeHTML(t("documentCount"))}</small>
  </button>`;
}

function renderDashboard() {
  const recent = state.documents.slice(0, 4);
  return `<div class="welcome-row">
    <div class="welcome-copy"><span class="date-label">${escapeHTML(t("welcomeDate"))}</span>
      <h1>${escapeHTML(t("hello"))}</h1><p class="subheading">${escapeHTML(t("intro"))}</p>
    </div>
    <div class="welcome-aside"><img class="buddy-gif" src="/study-buddy.gif" alt=""><strong>✳ ${escapeHTML(t("useModel"))}</strong><span id="active-model-name">${escapeHTML(state.selectedModel || "Ollama")}</span></div>
  </div>
  <div class="section-heading"><div><h2>${escapeHTML(t("focusTitle"))}</h2><p>${escapeHTML(t("focusHint"))}</p></div><button class="text-button" data-view="subjects">${escapeHTML(t("browseSubjects"))} ↗</button></div>
  <div class="subject-grid">${SUBJECTS.map(subjectTile).join("")}</div>
  <div class="home-columns">
    <section><div class="section-heading"><div><h2>${escapeHTML(t("recentSources"))}</h2></div><button class="text-button" data-view="library">${escapeHTML(t("seeAll"))} ↗</button></div>
      <div class="line-list">${recent.length ? recent.map((doc) => `<div class="line-item"><span class="line-item-icon">▤</span><div class="line-item-copy"><strong>${escapeHTML(doc.title)}</strong><small>${escapeHTML(doc.subject)} · ${Number(doc.chars).toLocaleString()} ${escapeHTML(t("chars"))}</small></div></div>`).join("") : `<p class="empty-inline">${escapeHTML(t("noSources"))}</p>`}</div>
    </section>
    <section><div class="section-heading"><div><h2>${escapeHTML(t("quickTitle"))}</h2><p>${escapeHTML(t("quickHint"))}</p></div></div>
      <div class="quick-actions">
        <button class="quick-action" data-quick="summary"><span class="quick-icon">✦</span><span><strong>${escapeHTML(t("quickSummary"))}</strong><small>${escapeHTML(t("quickSummaryHint"))}</small></span></button>
        <button class="quick-action" data-quick="quiz"><span class="quick-icon">☷</span><span><strong>${escapeHTML(t("quickQuiz"))}</strong><small>${escapeHTML(t("quickQuizHint"))}</small></span></button>
        <button class="quick-action" data-quick="check"><span class="quick-icon">⌕</span><span><strong>${escapeHTML(t("quickCheck"))}</strong><small>${escapeHTML(t("quickCheckHint"))}</small></span></button>
      </div>
    </section>
  </div>`;
}

function renderSubjects() {
  const selected = comboNames();
  return `<div class="welcome-row"><div class="welcome-copy"><h1>${escapeHTML(t("browseSubjects"))}</h1><p class="subheading">${escapeHTML(t("subjectsHint"))}</p></div></div>
    <div class="subject-toolbar"><input class="search-input" id="subject-search" type="search" placeholder="${escapeHTML(t("searchSubject"))}" aria-label="${escapeHTML(t("searchSubject"))}"></div>
    <div class="subject-list" id="subject-list">${SUBJECTS.map((subject) => `<button class="subject-row" data-subject="${escapeHTML(subject.id)}"><span class="subject-emoji">${subject.emoji}</span><strong>${escapeHTML(subjectName(subject))}</strong>${selected.includes(subject.name) ? `<small>${escapeHTML(t("useCombo"))}</small>` : ""}<small>${state.documents.filter((doc) => doc.subject === subject.name).length} ${escapeHTML(t("documentCount"))}</small><span class="row-arrow">↗</span></button>`).join("")}</div>`;
}

function renderSubjectDetail() {
  const subject = selectedSubject();
  const modes = [
    ["summary", t("tabSummary"), "✦"], ["check", t("tabCheck"), "⌕"], ["quiz", t("tabQuiz"), "☷"],
    ...(subject.id === "ngu-van" ? [["grade", t("tabGrade"), "✎"]] : []),
  ];
  const docs = state.documents.filter((doc) => doc.subject === subject.name);
  const mode = state.subjectMode;
  const isPriority = comboNames().includes(subject.name);
  const isGrade = mode === "grade";
  const placeholder = isGrade ? t("essayPlaceholder") : t("requestPlaceholder");
  const label = isGrade ? t("essayLabel") : t("requestLabel");
  const action = { summary: "runSummary", check: "runCheck", quiz: "runQuiz", grade: "runGrade" }[mode];
  return `<button class="back-link" data-view="subjects">${escapeHTML(t("back"))}</button>
    <div class="subject-detail-head"><div class="subject-title"><span class="big-emoji">${subject.emoji}</span><h1>${escapeHTML(subjectName(subject))}</h1></div>
      <p class="subheading">${escapeHTML(t("studyHint"))}<br><span class="focus-note">${isPriority ? "✦ " + escapeHTML(t("deepFocus")) : "· " + escapeHTML(t("examFocus"))}</span></p></div>
    <div class="subject-tabs">${modes.map(([id, name, icon]) => `<button class="subject-tab ${mode === id ? "active" : ""}" data-mode="${id}">${icon} &nbsp;${escapeHTML(name)}</button>`).join("")}</div>
    <div class="subject-workgrid"><div class="field-stack">
      <div><label class="form-label" for="study-query">${escapeHTML(label)}</label><textarea class="textarea" id="study-query" placeholder="${escapeHTML(placeholder)}"></textarea>
        <small class="form-help">${isGrade ? escapeHTML(t("verifyNote")) : escapeHTML(t("sourceBasis"))}</small>
      </div>
      <div class="action-row"><button class="button button-primary" id="run-ai" data-mode="${mode}">${escapeHTML(t(action))} &nbsp;↗</button>${docs.length === 0 ? `<button class="button button-soft" data-view="library">${escapeHTML(t("addSource"))} ＋</button>` : ""}</div>
    </div>
    <aside class="source-side"><h3>${escapeHTML(t("sourceBasis"))} · ${docs.length}</h3>
      ${docs.length ? docs.slice(0, 5).map((doc) => `<div class="source-mini"><strong>${escapeHTML(doc.title)}</strong><small>${Number(doc.chars).toLocaleString()} ${escapeHTML(t("chars"))}</small></div>`).join("") : `<p class="empty-inline">${escapeHTML(t("noRelevant"))}</p><button class="text-button" data-view="library">${escapeHTML(t("addSource"))} ＋</button>`}
    </aside></div><div id="ai-result"></div>`;
}

function subjectOptions(value = "") {
  return `<option value="">${escapeHTML(t("chooseSubject"))}</option>${SUBJECTS.map((subject) => `<option value="${escapeHTML(subject.name)}" ${subject.name === value ? "selected" : ""}>${subject.emoji} ${escapeHTML(subjectName(subject))}</option>`).join("")}`;
}

function renderLibrary() {
  return `<div class="welcome-row"><div class="welcome-copy"><h1>${escapeHTML(t("libraryTitle"))}</h1><p class="subheading">${escapeHTML(t("libraryHint"))}</p></div></div>
    <div class="library-layout"><section><div class="section-heading"><div><h2>${escapeHTML(t("pasteSource"))}</h2></div></div>
      <form class="source-form" id="text-source-form">
        <label><span class="form-label">${escapeHTML(t("sourceTitle"))}</span><input class="field" name="title" maxlength="200" required></label>
        <label><span class="form-label">${escapeHTML(t("subject"))}</span><select class="select-field" name="subject" required>${subjectOptions()}</select></label>
        <label><span class="form-label">${escapeHTML(t("contentLabel"))}</span><textarea class="textarea" name="content" maxlength="1000000" required placeholder="${escapeHTML(t("contentPlaceholder"))}"></textarea></label>
        <div><button class="button button-primary">${escapeHTML(t("saveSource"))} ＋</button></div>
      </form>
      <div class="section-heading"><div><h2>${escapeHTML(t("uploadTitle"))}</h2><p>${escapeHTML(t("uploadHint"))}</p></div></div>
      <form class="source-form" id="file-source-form" enctype="multipart/form-data">
        <label><span class="form-label">${escapeHTML(t("subject"))}</span><select class="select-field" name="subject" required>${subjectOptions()}</select></label>
        <label><span class="form-label">${escapeHTML(t("chooseFile"))}</span><input class="field" type="file" name="file" accept=".txt,.md,.pdf" required></label>
        <div><button class="button button-primary">${escapeHTML(t("uploadFile"))} ↑</button></div>
      </form>
    </section>
    <aside><div class="section-heading"><div><h2>${escapeHTML(t("recentSources"))}</h2><p>${state.documents.length} ${escapeHTML(t("documentCount"))}</p></div></div>
      <div class="source-list">${state.documents.length ? state.documents.map((doc) => `<div class="source-document"><span class="doc-type">${escapeHTML((doc.source_type || "DOC").toUpperCase().slice(0, 4))}</span><div class="line-item-copy"><strong>${escapeHTML(doc.title)}</strong><small>${escapeHTML(doc.subject)} · ${Number(doc.chars).toLocaleString()} ${escapeHTML(t("chars"))}</small></div><button class="icon-button delete-document" data-id="${doc.id}" aria-label="${escapeHTML(t("delete"))}">×</button></div>`).join("") : `<p class="empty-inline">${escapeHTML(t("noDocsYet"))}</p>`}</div>
    </aside></div>`;
}

function renderAssistant() {
  const messages = state.chat.map((message) => `<div class="chat-message ${message.role}">${escapeHTML(message.text)}</div>`).join("");
  return `<div class="assistant-panel"><div class="welcome-row"><div><h1>${escapeHTML(t("assistantTitle"))}</h1></div></div>
    <div class="assistant-intro"><span class="assistant-mark">✳</span><div><h2>Zu</h2><p>${escapeHTML(t("assistantIntro"))}</p></div></div>
    <div class="chat-history-status"><span>${escapeHTML(t("historySaved"))} ${state.status?.conversation_count || 0} ${escapeHTML(t("historyCount"))}.</span>${state.status?.conversation_count ? `<button class="text-button" id="clear-chat">${escapeHTML(t("clearHistory"))} ×</button>` : ""}</div>
    ${!state.documents.length ? `<div class="alert assistant-warning">${escapeHTML(t("noAssistantDocs"))}</div>` : ""}
    <div class="chat-history" id="chat-history">${messages || `<p class="empty-inline">${escapeHTML(t("assistantIntro"))}</p>`}</div>
    <form class="chat-form" id="chat-form"><textarea name="query" placeholder="${escapeHTML(t("askPlaceholder"))}" required maxlength="30000"></textarea>
      <div class="chat-form-bottom"><select class="select-field" name="subject" aria-label="${escapeHTML(t("subject"))}">${subjectOptions(state.subject?.name || "")}</select><button class="button button-primary">${escapeHTML(t("send"))} ↗</button></div></form></div>`;
}

function markdownToSafeHTML(text) {
  let safe = escapeHTML(text);
  safe = safe.replace(/^### (.+)$/gm, "<h3>$1</h3>").replace(/^## (.+)$/gm, "<h2>$1</h2>").replace(/^# (.+)$/gm, "<h2>$1</h2>");
  safe = safe.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>").replace(/`([^`]+)`/g, "<code>$1</code>");
  safe = safe.replace(/^\s*[-*] (.+)$/gm, "<li>$1</li>").replace(/(?:<li>.*<\/li>\n?)+/g, (list) => `<ul>${list}</ul>`);
  return safe.split(/\n{2,}/).map((block) => /^(<h\d|<ul|<ol)/.test(block) ? block : `<p>${block.replace(/\n/g, "<br>")}</p>`).join("");
}

function renderQuiz(quiz) {
  if (!quiz || !Array.isArray(quiz.questions) || !quiz.questions.length) return `<div class="error-panel">${escapeHTML(t("quizEmpty"))}</div>`;
  state.quiz = { questions: quiz.questions, selected: Array(quiz.questions.length).fill(null), checked: false };
  return `<div class="output-panel"><div class="output-top"><strong>${escapeHTML(t("tabQuiz"))}</strong><span>${quiz.questions.length} câu</span></div>
    <div id="quiz-questions">${quiz.questions.map((question, qi) => `<div class="quiz-question" data-question="${qi}"><strong>${qi + 1}. ${escapeHTML(question.question)}</strong>
      <div class="quiz-choices">${(question.choices || []).map((choice, ci) => `<button class="quiz-choice" data-q="${qi}" data-choice="${ci}">${String.fromCharCode(65 + ci)}. ${escapeHTML(choice)}</button>`).join("")}</div>
      <p class="quiz-feedback" id="quiz-feedback-${qi}" hidden>${escapeHTML(question.explanation || "")} ${escapeHTML(question.source || "")}</p></div>`).join("")}</div>
    <div class="action-row"><button class="button button-primary" id="check-quiz">${escapeHTML(t("submitQuiz"))}</button><strong id="quiz-score"></strong></div></div>`;
}

function renderEssayFeedback(feedback) {
  const labels = {
    thesis: t("thesis"),
    evidence: t("evidence"),
    organization: t("organization"),
    language: t("languageCriterion"),
  };
  const criteria = (feedback.criteria || []).map((item) =>
    `<div class="rubric-row"><div class="rubric-meta"><strong>${escapeHTML(labels[item.category] || item.category)}</strong><span>${escapeHTML(item.score)} / ${escapeHTML(item.max_score)}</span></div><p>${escapeHTML(item.feedback)}</p></div>`
  ).join("");
  const listSection = (key, title) => {
    const items = feedback[key] || [];
    return items.length ? `<section class="feedback-section"><h3>${escapeHTML(title)}</h3><ul>${items.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul></section>` : "";
  };
  return `<div class="essay-score"><span>${escapeHTML(t("score"))}</span><strong>${escapeHTML(feedback.score)}<small> / 10</small></strong></div>
    <h3>${escapeHTML(t("rubricTitle"))}</h3><div class="rubric-list">${criteria}</div>
    ${listSection("strengths", t("strengths"))}${listSection("issues", t("issues"))}${listSection("recommendations", t("recommendations"))}
    ${feedback.revision_example ? `<section class="feedback-section"><h3>${escapeHTML(t("revisionExample"))}</h3><p>${escapeHTML(feedback.revision_example)}</p></section>` : ""}
    ${listSection("caveats", t("caveats"))}`;
}

function showResult(data, mode) {
  const root = $("#ai-result");
  const sourceChips = (data.sources || []).map((source) => `<span class="citation-chip">[${escapeHTML(t("sourceFrom"))} ${source.id}] ${escapeHTML(source.title)}</span>`).join("");
  const verificationStatus = data.verified
    ? `<div class="verification-note verified-note">✓ ${escapeHTML(t("verified"))}${data.model && data.requested_model && data.model !== data.requested_model ? ` · ${escapeHTML(t("modelChanged"))} (${escapeHTML(data.model)})` : ""}</div>`
    : `<div class="verification-note unverified-note">! ${escapeHTML(t("unverified"))}</div>`;
  if (mode === "quiz") {
    let quiz;
    try { quiz = JSON.parse(data.answer); }
    catch {
      const match = data.answer.match(/\{[\s\S]*\}/);
      if (match) { try { quiz = JSON.parse(match[0]); } catch { /* show a recoverable format message */ } }
    }
    root.innerHTML = `<section class="output-panel">${verificationStatus}</section>${renderQuiz(quiz)}<div class="source-citations">${sourceChips}</div>`;
    return;
  }
  if (event.target.closest("#settings-language")) {
    state.language = state.language === "vi" ? "en" : "vi";
    localStorage.setItem("zu-language", state.language);
    render();
    updateStatus();
    return;
  }
  let content;
  if (mode === "grade") {
    try { content = renderEssayFeedback(JSON.parse(data.answer)); }
    catch { content = `<div class="error-panel">${escapeHTML(t("essayInvalid"))}</div>`; }
  } else {
    content = markdownToSafeHTML(data.answer || t("emptyResponse"));
  }
  root.innerHTML = `<section class="output-panel"><div class="output-top"><strong>${escapeHTML(t("result"))}</strong><small>${escapeHTML(data.model || "")}</small></div>${verificationStatus}
    <div class="output-content">${content}</div>${sourceChips ? `<div class="source-citations">${sourceChips}</div>` : ""}</section>`;
}

async function runAI(mode, query) {
  const result = $("#ai-result");
  if (!result) return;
  window.LocalNoteThemeStudio?.setGenerating(true);
  result.innerHTML = `<div class="output-panel loading-inline"><span class="spinner"></span>${escapeHTML(t("thinking"))}</div>`;
  try {
    const data = await api("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode, subject: selectedSubject().name, query, language: state.language, model: state.selectedModel, combinations: comboPayload(), thinking_mode: state.thinkingMode }),
    });
    showResult(data, mode);
  } catch (error) {
    result.innerHTML = `<div class="error-panel">${escapeHTML(t("failed"))} ${escapeHTML(error.message)}</div>`;
  } finally {
    window.LocalNoteThemeStudio?.setGenerating(false);
  }
}

function notify(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(notify.timeout);
  notify.timeout = setTimeout(() => toast.classList.remove("show"), 2800);
}

function openCombinationDialog() {
  const options = $("#combination-options");
  options.innerHTML = COMBINATIONS.map((combo) => {
    const subjects = combo.subjects.map((name) => {
      const subject = SUBJECTS.find((item) => item.name === name);
      return subject ? subjectName(subject) : name;
    });
    return `<label class="combination-option"><input type="checkbox" value="${combo.id}" ${state.combinations.includes(combo.id) ? "checked" : ""}><strong>${combo.id}</strong><span>${subjects.join(" · ")}</span></label>`;
  }).join("");
  $("#combination-dialog").showModal();
}

function updateQuizChoice(button) {
  if (!state.quiz || state.quiz.checked) return;
  const qi = Number(button.dataset.q), ci = Number(button.dataset.choice);
  state.quiz.selected[qi] = ci;
  $$(`.quiz-question[data-question="${qi}"] .quiz-choice`).forEach((choice) => choice.classList.toggle("selected", Number(choice.dataset.choice) === ci));
}

function gradeQuiz() {
  if (!state.quiz) return;
  let score = 0;
  state.quiz.questions.forEach((question, index) => {
    const correct = Number(question.answer_index) === state.quiz.selected[index];
    if (correct) score++;
    const choices = $$(`.quiz-question[data-question="${index}"] .quiz-choice`);
    choices.forEach((choice) => {
      const indexChoice = Number(choice.dataset.choice);
      if (indexChoice === Number(question.answer_index)) choice.classList.add("correct");
      else if (indexChoice === state.quiz.selected[index]) choice.classList.add("incorrect");
      choice.disabled = true;
    });
    const feedback = $(`#quiz-feedback-${index}`);
    if (feedback) feedback.hidden = false;
  });
  state.quiz.checked = true;
  $("#quiz-score").textContent = `${t("quizScore")}: ${score}/${state.quiz.questions.length}`;
  $("#check-quiz").disabled = true;
}

document.addEventListener("click", async (event) => {
  if (window.LocalNoteThemeStudio?.handleClick(event, notify)) return;
  if (event.target.closest("#open-command")) { openCommandPalette(); return; }
  const commandButton = event.target.closest("[data-command]");
  if (commandButton) {
    $("#command-dialog").close();
    setView(commandButton.dataset.command);
    return;
  }
  const viewButton = event.target.closest("[data-view]");
  if (viewButton) { event.preventDefault(); setView(viewButton.dataset.view); return; }
  const subButton = event.target.closest("[data-subject]");
  if (subButton) {
    const subject = SUBJECTS.find((item) => item.id === subButton.dataset.subject);
    if (subject) {
      state.subject = subject;
      state.subjectMode = "summary";
      state.view = "subject";
      $$(".nav-item[data-view]").forEach((item) => item.classList.toggle("active", item.dataset.view === "subjects"));
      render();
    }
    return;
  }
  const modeButton = event.target.closest("[data-mode]");
  if (modeButton) { state.subjectMode = modeButton.dataset.mode; render(); return; }
  const quickButton = event.target.closest("[data-quick]");
  if (quickButton) {
    const subjectNames = comboNames();
    const subject = SUBJECTS.find((item) => subjectNames.includes(item.name)) || SUBJECTS.find((item) => state.documents.some((doc) => doc.subject === item.name)) || SUBJECTS[0];
    state.subject = subject;
    state.subjectMode = quickButton.dataset.quick;
    state.view = "subject";
    render();
    return;
  }
  if (event.target.closest("#edit-combinations")) { openCombinationDialog(); return; }
  if (event.target.closest(".close-dialog")) { $("#combination-dialog").close(); return; }
  if (event.target.closest("#save-combinations")) {
    state.combinations = $$("#combination-options input:checked").map((input) => input.value);
    localStorage.setItem("zu-combinations", JSON.stringify(state.combinations));
    $("#combination-dialog").close();
    renderCombinationBar();
    render();
    return;
  }
  if (event.target.closest("#language-toggle")) {
    state.language = state.language === "vi" ? "en" : "vi";
    localStorage.setItem("zu-language", state.language);
    render();
    updateStatus();
    return;
  }
  if (event.target.closest("#copy-data-path")) {
    try {
      await navigator.clipboard.writeText(state.status?.data_path || "");
      notify(t("saved"));
    } catch { notify(state.status?.data_path || ""); }
    return;
  }
  if (event.target.closest("#clear-chat")) {
    if (!window.confirm(t("clearHistoryConfirm"))) return;
    try {
      await api("/api/conversations", { method: "DELETE" });
      state.chat = [];
      await loadStatus();
      render();
      notify(t("historyCleared"));
    } catch (error) { notify(error.message); }
    return;
  }
  const runButton = event.target.closest("#run-ai");
  if (runButton) {
    const mode = runButton.dataset.mode;
    const query = $("#study-query")?.value.trim();
    if (!query) { notify(t("requestLabel")); return; }
    runAI(mode, query);
    return;
  }
  const quizChoice = event.target.closest(".quiz-choice");
  if (quizChoice) { updateQuizChoice(quizChoice); return; }
  if (event.target.closest("#check-quiz")) { gradeQuiz(); return; }
  const deleteButton = event.target.closest(".delete-document");
  if (deleteButton) {
    if (!window.confirm(t("removeConfirm"))) return;
    try { await api(`/api/documents/${deleteButton.dataset.id}`, { method: "DELETE" }); await loadDocuments(); render(); notify(t("done")); }
    catch (error) { notify(error.message); }
    return;
  }
});

function selectModel(event) {
  state.selectedModel = event.target.value;
  localStorage.setItem("zu-model", state.selectedModel);
  const topModel = $("#local-model");
  if (topModel) topModel.value = state.selectedModel;
  const settingsModel = $("#settings-model");
  if (settingsModel) settingsModel.value = state.selectedModel;
  const modelName = $("#active-model-name");
  if (modelName) modelName.textContent = state.selectedModel;
  $("#rail-model").textContent = `${t("useModel")}: ${state.selectedModel}`;
}

$("#local-model").addEventListener("change", selectModel);
document.addEventListener("change", (event) => {
  if (window.LocalNoteThemeStudio?.handleChange(event, notify)) return;
  if (event.target.id === "settings-model") selectModel(event);
  if (event.target.id === "thinking-mode") {
    state.thinkingMode = event.target.checked;
    localStorage.setItem("zu-thinking-mode", String(state.thinkingMode));
  }
});

document.addEventListener("input", (event) => {
  window.LocalNoteThemeStudio?.handleInput(event);
  if (event.target.id === "command-search") renderCommandList(event.target.value);
  if (event.target.id === "subject-search") {
    const query = event.target.value.toLocaleLowerCase();
    $$(".subject-row").forEach((row) => { row.hidden = !row.textContent.toLocaleLowerCase().includes(query); });
  }
});

document.addEventListener("submit", async (event) => {
  const form = event.target;
  if (form.id === "text-source-form") {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(form).entries());
    try {
      await api("/api/documents", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      form.reset(); await loadDocuments(); render(); notify(t("saved"));
    } catch (error) { notify(error.message); }
  } else if (form.id === "file-source-form") {
    event.preventDefault();
    const file = form.querySelector('input[type="file"]').files[0];
    if (!file) return;
    const data = new FormData(form);
    try {
      await api("/api/documents/upload", { method: "POST", body: data });
      form.reset(); await loadDocuments(); render(); notify(t("saved"));
    } catch (error) { notify(error.message); }
  } else if (form.id === "chat-form") {
    event.preventDefault();
    const values = new FormData(form);
    const query = String(values.get("query") || "").trim();
    const subjectNameValue = String(values.get("subject") || "");
    const subject = SUBJECTS.find((item) => item.name === subjectNameValue) || SUBJECTS[0];
    if (!query) return;
    state.chat.push({ role: "user", text: query });
    window.LocalNoteThemeStudio?.setGenerating(true);
    render();
    const history = $("#chat-history");
    history?.scrollTo({ top: history.scrollHeight, behavior: "smooth" });
    let responseText;
    let responseModel = state.selectedModel;
    try {
      const result = await api("/api/ai", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "assistant", subject: subject.name, query, language: state.language, model: state.selectedModel, combinations: comboPayload(), thinking_mode: state.thinkingMode }),
      });
      responseText = result.answer;
      responseModel = result.model || responseModel;
      state.chat.push({ role: "assistant", text: responseText });
    } catch (error) {
      responseText = `${t("failed")} ${error.message}`;
      state.chat.push({ role: "assistant", text: responseText });
    }
    try {
      await api("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject: subject.name, prompt: query, response: responseText, model: responseModel }),
      });
      if (state.status) state.status.conversation_count = (state.status.conversation_count || 0) + 1;
    } catch (error) {
      notify(`${t("historySaveFailed")} ${error.message}`);
    }
    window.LocalNoteThemeStudio?.setGenerating(false);
    render();
    $("#chat-history")?.scrollTo({ top: $("#chat-history").scrollHeight, behavior: "smooth" });
  }
});

document.addEventListener("keydown", (event) => {
  const editing = event.target instanceof Element && event.target.closest("input, textarea, select, [contenteditable='true']");
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openCommandPalette();
    return;
  }
  if ($("#command-dialog").open) {
    if (event.key === "Enter" && event.target.id === "command-search") {
      event.preventDefault();
      $("#command-list [data-command]")?.click();
    } else if (event.key === "ArrowDown" && event.target.id === "command-search") {
      event.preventDefault();
      $("#command-list [data-command]")?.focus();
    }
    return;
  }
  if (editing) return;
  if (event.altKey && /^[1-5]$/.test(event.key)) {
    event.preventDefault();
    setView(COMMANDS[Number(event.key) - 1].id);
  } else if (event.key === "/") {
    event.preventDefault();
    if (state.view !== "subjects") setView("subjects");
    $("#subject-search")?.focus();
  }
});

async function start() {
  renderCombinationBar();
  render();
  await Promise.all([loadStatus(), loadDocuments(), loadConversations()]);
}

async function loadConversations() {
  try {
    const conversations = await api("/api/conversations");
    state.chat = conversations.flatMap((item) => [
      { role: "user", text: item.prompt },
      { role: "assistant", text: item.response },
    ]);
  } catch (error) { notify(error.message); }
}

start();
