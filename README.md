[🇻🇳 Tiếng Việt](#tieng-viet) · [🇬🇧 English below](#english)

<a id="tieng-viet"></a>

# LocalNote

LocalNote là ứng dụng ôn tập cá nhân chạy trên máy tính, dành cho các kì thi giữa kì, cuối kì và tốt nghiệp THPT. AI sử dụng mô hình chạy local qua Ollama; tài liệu học tập được lưu trong SQLite trên máy của bạn.

## Yêu cầu hệ thống / System Requirements

### Cấu hình tối thiểu và khuyến nghị

| Thành phần | Tối thiểu | Khuyến nghị |
|---|---|---|
| Hệ điều hành | Windows 10 64-bit, macOS 12+, Ubuntu 20.04+ | Windows 11, macOS 13+, Ubuntu 22.04+ |
| CPU | 4 nhân | 6 nhân trở lên |
| RAM | 8 GB | 16 GB trở lên |
| Ổ cứng còn trống | 10 GB để cài ứng dụng và bắt đầu với một model nhỏ | 25 GB trở lên để có chỗ cho nhiều model/tài liệu |
| GPU | Không bắt buộc; CPU có thể chạy model nhỏ | GPU hỗ trợ Ollama với VRAM 6–8 GB trở lên |
| Python | 3.10+ | Python 3.12+ |
| Node.js | Không cần — ứng dụng hiện không dùng Node.js để build/chạy | Không cần |
| npm | Không cần — ứng dụng hiện không dùng npm | Không cần |
| Git | Không bắt buộc nếu tải ZIP | Bản mới nếu clone/cập nhật bằng Git |
| Ollama | Bản ổn định hiện hành — cần cho tính năng AI | Bản ổn định hiện hành |
| Docker | Không cần | Không cần |

### Mức cấu hình tham khảo theo model AI

| Phần cứng | Mức model có thể cân nhắc | Lưu ý |
|---|---|---|
| 8 GB RAM, không có GPU rời | Model nhỏ khoảng 1B–3B tham số | Ưu tiên bản quantized nhỏ; phản hồi có thể chậm, nhất là khi chạy bước kiểm tra lần hai. |
| 16 GB RAM | Model khoảng 3B–7B tham số | Có thêm bộ nhớ cho model và tài liệu; tốc độ, chất lượng thay đổi theo máy và model. |
| GPU 6–8 GB VRAM | Thử model khoảng 3B–7B tham số | Model lớn hoặc context dài có thể vượt VRAM và dùng thêm RAM hệ thống. |
| GPU 12 GB+ VRAM | Có thể thử model 7B trở lên | VRAM khả dụng, lượng tử hóa và độ dài prompt vẫn quyết định mức phù hợp. |
| Mac Apple Silicon | Model nhỏ trên máy có 8 GB unified memory; nhiều lựa chọn hơn từ 16 GB | Unified memory được chia sẻ với hệ điều hành và ứng dụng khác. |

Các mức model trên chỉ là gợi ý chọn thử, không phải cam kết rằng model sẽ tải vừa bộ nhớ hoặc đạt một tốc độ cụ thể. Model lớn có thể phản hồi chậm nếu thiếu VRAM; Ollama có thể dùng thêm RAM hệ thống thay cho VRAM nhưng thường chậm hơn. Kết quả phụ thuộc vào phần cứng, model, bản quantized, context và tác vụ.

### Dung lượng model và dữ liệu

- Một model chat nhỏ thường có thể chiếm khoảng 1–5 GB; model lớn có thể chiếm nhiều GB đến hàng chục GB. Kích thước thay đổi theo model, phiên bản và quantization.
- Tải model bằng Ollama cần thêm dung lượng cho các model đã cài; có thể xóa model không dùng bằng `ollama rm <tên-model>`.
- Ứng dụng hiện lưu văn bản tài liệu trong SQLite và tìm kiếm theo từ khóa; **chưa cài hoặc yêu cầu vector database**. Vì vậy hiện không có dung lượng vector database riêng.
- Nếu bổ sung embedding/vector database về sau, dữ liệu vector và chỉ mục sẽ tăng theo số lượng, độ dài tài liệu và model embedding. Hãy dự trù thêm dung lượng; không có con số cố định phù hợp cho mọi thư viện tài liệu.

**Lựa chọn model:** ứng dụng chỉ hiện model chat đã cài trong Ollama; chọn model trong **Cài đặt / Settings**. Có thể đặt `OLLAMA_MODEL` làm ưu tiên nếu model đã cài. Nếu chưa đặt, ưu tiên thử `qwen3:8b`, sau đó `gemma3:4b`, rồi dùng model chat đầu tiên còn lại; thay thứ tự bằng `OLLAMA_MODEL_PREFERENCE`. Context mặc định là 8192 (`OLLAMA_NUM_CTX`) và thời gian giữ model là `10m` (`OLLAMA_KEEP_ALIVE`).

**Lưu ý GPU:** trên RTX 3050 6 GB VRAM và 16 GB RAM, model 8B có thể tràn sang RAM hệ thống và chạy chậm hơn. Hãy thử model nhỏ hơn hoặc giảm `OLLAMA_NUM_CTX` nếu thiếu bộ nhớ.

## Cài đặt chi tiết trên Windows

### 1. Cài Python

1. Tải Python 3.10 trở lên từ [python.org/downloads](https://www.python.org/downloads/).
2. Mở bộ cài. Đánh dấu **Add python.exe to PATH** trước khi chọn **Install Now**.
3. Mở PowerShell mới và kiểm tra:

   ```powershell
   python --version
   ```

   Kết quả cần là Python 3.10 trở lên. Nếu Windows mở Microsoft Store thay vì chạy Python, cài lại từ python.org và bật tùy chọn PATH ở trên.

### 2. Cài Ollama và tải mô hình AI

1. Tải và cài Ollama từ [ollama.com/download](https://ollama.com/download).
2. Mở ứng dụng Ollama. Ollama cần tiếp tục chạy trong nền khi bạn dùng trợ lý AI.
3. Mở PowerShell và tải một model chat tương thích mà bạn muốn thử. Thay `qwen3:8b` bằng tên model khác có trên Ollama nếu cần:

   ```powershell
   ollama pull qwen3:8b
   ```

   Model có thể chiếm vài GB dung lượng đĩa và cần thêm bộ nhớ khi chạy. Nếu máy có RAM hạn chế, chọn một model nhỏ hơn, chẳng hạn model 1B–3B tương thích. Chất lượng tiếng Việt và tốc độ tùy cấu hình máy.
4. Kiểm tra mô hình đã tải:

   ```powershell
   ollama list
   ```

   Ứng dụng chọn model tương thích đã cài; bạn có thể đổi model trong mục **Cài đặt**. Không có model chat nào bị bắt buộc. Nếu muốn đặt model mặc định trước khi chạy, dùng `OLLAMA_MODEL` như hướng dẫn ở bước 5.

### 3. Tải mã nguồn từ GitHub

**Cách dùng Git:**

1. Cài [Git for Windows](https://git-scm.com/download/win) nếu máy chưa có.
2. Mở PowerShell tại thư mục muốn đặt ứng dụng rồi chạy:

   ```powershell
   git clone https://github.com/XxZuPenguinxX/On_Otap_Thi_Cua_Zu.git
   cd On_Otap_Thi_Cua_Zu
   ```

**Hoặc tải tệp ZIP:** mở repository trên GitHub, chọn **Code → Download ZIP**, giải nén rồi mở PowerShell trong thư mục `On_Otap_Thi_Cua_Zu`.

### 4. Cài phần hỗ trợ đọc PDF

Trong PowerShell, tại thư mục dự án, chạy:

```powershell
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

Gói `pypdf` giúp trích xuất văn bản từ PDF có lớp chữ chọn được. Nếu bỏ qua bước này, ứng dụng vẫn chạy và vẫn nhận ghi chú `.txt`/`.md`; PDF sẽ báo rõ cách cài thư viện. PDF scan dạng ảnh không có OCR nên cần chuyển sang PDF có văn bản hoặc dán phần nội dung đã nhận dạng.

### 5. Khởi chạy ứng dụng

Để đặt model mặc định từ danh sách đã cài, thay tên bên dưới bằng tên bạn chọn:

```powershell
$env:OLLAMA_MODEL = "qwen3:8b"
python server.py
```

Nếu không cần chọn riêng:

```powershell
python server.py
```

Khi thấy dòng `LocalNote đang chạy tại http://127.0.0.1:8765`, mở đúng địa chỉ đó bằng trình duyệt. Giữ cửa sổ PowerShell và Ollama mở trong lúc sử dụng. Nhấn **Ctrl+C** trong PowerShell để dừng ứng dụng.

Nếu cổng `8765` đã được chương trình khác dùng, chọn cổng khác rồi khởi động lại:

```powershell
$env:PORT = "8766"
python server.py
```

Sau đó mở `http://127.0.0.1:8766`. Nếu thay đổi cổng, hãy dùng đúng cổng đó xuyên suốt phiên truy cập.

## Mở lại ứng dụng và dữ liệu được lưu ở đâu?

- Trên Windows, sau khi tải mã nguồn về máy, những lần sau bạn chỉ cần mở thư mục `On_Otap_Thi_Cua_Zu` và nhấp đúp `start-localnote.bat`. Cửa sổ dòng lệnh và trình duyệt sẽ được mở; giữ cửa sổ dòng lệnh trong lúc học. Ollama cũng cần đang chạy.
- Nếu không dùng tệp khởi động, mở PowerShell trong thư mục dự án, chạy `python server.py`, rồi mở `http://127.0.0.1:8765`.
- Khi muốn thoát, nhấn **Ctrl+C** trong cửa sổ LocalNote hoặc đóng cửa sổ đó. Đóng trình duyệt cũng không xóa dữ liệu.
- Tài liệu, ghi chú **và các lượt trò chuyện trợ lý đã hoàn tất** được lưu vào SQLite trên ổ cứng. Trên Windows, tệp thường ở `%LOCALAPPDATA%\LocalNote\study.sqlite3` (thường là `C:\Users\<tên-bạn>\AppData\Local\LocalNote\study.sqlite3`); trên macOS/Linux, tệp ở `$XDG_DATA_HOME/LocalNote/study.sqlite3` nếu biến này được đặt, nếu không thì `~/.local/share/LocalNote/study.sqlite3`. Mở **Cài đặt** để xem hoặc sao chép đường dẫn chính xác.
- Lịch sử gần đây sẽ xuất hiện lại khi bạn mở mục **Trợ lý học tập**. Ứng dụng hiển thị 100 lượt gần nhất. Yêu cầu chưa có câu trả lời hoặc bị ngắt đột ngột có thể chưa được lưu.
- Sao lưu: dừng LocalNote bằng **Ctrl+C**, sau đó sao chép `study.sqlite3` sang ổ đĩa khác hoặc nơi sao lưu riêng. Khôi phục bằng cách chép tệp sao lưu trở lại thư mục dữ liệu nêu trên khi ứng dụng đã dừng.
- Tùy chọn ngôn ngữ, model, tổ hợp thi và giao diện Theme Studio được lưu trong hồ sơ trình duyệt trên máy. Không xóa dữ liệu trình duyệt nếu muốn giữ các lựa chọn này.

### 6. Bắt đầu ôn tập

1. Chọn **Chọn tổ hợp** ở thanh phía trên. Có thể chọn nhiều tổ hợp cùng lúc; lựa chọn được lưu trong trình duyệt này.
2. AI sẽ ưu tiên phân tích sâu các môn nằm trong tổ hợp đã chọn. Môn chưa nằm trong tổ hợp vẫn có thể ôn theo hướng tổng hợp kiến thức thi.
3. Mở **Nguồn của bạn** để thêm ghi chú/dán văn bản hoặc tải `.txt`, `.md`, PDF có văn bản. LocalNote không tải nội dung từ URL.
4. Chọn một môn rồi chọn **Tổng hợp**, **Đối chiếu lỗi**, hoặc **Bài kiểm tra**. Bài kiểm tra gồm 5 câu trắc nghiệm; sau khi chọn đáp án, nhấn **Chấm bài luyện tập** để xem đáp án và giải thích.
5. Riêng **Ngữ Văn**, chọn **Chấm bài Văn**, dán bài viết và yêu cầu nhận xét. Phản hồi là góp ý tham khảo theo tiêu chí, không phải điểm thi chính thức.
6. **Trợ lý học tập** hỗ trợ hỏi đáp theo môn, lưu lịch sử trên máy và ưu tiên nguồn tài liệu đã thêm.
7. Chuyển giao diện Việt/Anh bằng nút **EN/VI** ở góc trên; đổi model đã cài trong mục **Cài đặt**.
8. Trong **Cài đặt → Theme Studio**, chọn bộ giao diện, tùy chỉnh màu sắc và kiểu chữ, đổi sáng/tối, chỉnh chuyển động; giao diện tùy chỉnh có thể lưu, nhập hoặc xuất JSON.

## Dữ liệu, quyền riêng tư và giới hạn

- Ứng dụng chỉ lắng nghe tại `127.0.0.1`, không mở máy chủ ra mạng nội bộ.
- AI chạy qua Ollama tại máy, không gửi tài liệu tới dịch vụ AI đám mây. Sau khi cài đặt, các yêu cầu mạng của ứng dụng chỉ đi tới Ollama trên loopback và API của chính LocalNote.
- Cơ sở dữ liệu mặc định ở `%LOCALAPPDATA%\LocalNote\study.sqlite3`. Tệp này nằm ngoài thư mục Git; tài liệu tải lên không được đưa vào repository.
- Ứng dụng không yêu cầu Internet khi chạy. Việc tải mã nguồn, cài Ollama/model hoặc thư viện Python cần Internet trong quá trình thiết lập.
- AI có thể sai, thiếu hoặc diễn giải khác tài liệu. Hãy đối chiếu trích dẫn với nguồn gốc và thông tin thi chính thức.
- Mỗi câu trả lời AI chạy qua hai lượt: lượt đầu tạo bản nháp; lượt sau trên Ollama đối chiếu với nguồn và yêu cầu. Nếu lượt sau gặp giới hạn phần cứng, ứng dụng thử các mô hình local nhẹ hơn đã cài; giao diện ghi rõ khi không hoàn thành xác minh. Cách này giảm lỗi nhưng không bảo đảm tuyệt đối.
- PDF chỉ trích xuất văn bản, không nhận dạng chữ trong ảnh. Không tải lên tài liệu vượt quá giới hạn ứng dụng.

## Chạy bộ kiểm tra dành cho phát triển

Từ thư mục dự án, chạy:

```powershell
python -m unittest discover -s tests -v
```

## Xử lý sự cố

| Hiện tượng | Cách xử lý |
|---|---|
| `python` không được nhận diện | Cài lại Python từ python.org, bật **Add python.exe to PATH**, rồi mở PowerShell mới. |
| Ứng dụng báo chưa kết nối Ollama | Mở ứng dụng Ollama hoặc chạy `ollama serve`. |
| Không thấy mô hình hoặc mô hình sai tên | Chạy `ollama list`; đặt `$env:OLLAMA_MODEL = "tên-mô-hình"` rồi chạy lại `python server.py`. |
| Không tạo được tổng hợp/bài kiểm tra | Thêm tài liệu cho đúng môn, bảo đảm tài liệu có nội dung trích xuất được và kiểm tra Ollama còn hoạt động. |
| Không nhập được PDF | Chạy `python -m pip install -r requirements.txt`; PDF scan cần OCR bên ngoài ứng dụng. |
| Cổng 8765 đang bận | Chạy `$env:PORT = "8766"` rồi `python server.py`, sau đó mở cổng 8766. |

---

# English below

<a id="english"></a>

## LocalNote

LocalNote is a personal study app that runs on your computer for midterm, final, and Vietnamese high-school graduation exam preparation. AI uses a local Ollama model; study materials are stored in a local SQLite database.

## System Requirements / Yêu cầu hệ thống

### Minimum and recommended configuration

| Component | Minimum | Recommended |
|---|---|---|
| Operating system | Windows 10 64-bit, macOS 12+, Ubuntu 20.04+ | Windows 11, macOS 13+, Ubuntu 22.04+ |
| CPU | 4 cores | 6 cores or more |
| RAM | 8 GB | 16 GB or more |
| Free storage | 10 GB to install the app and start with one small model | 25 GB or more for multiple models/documents |
| GPU | Not required; a CPU can run small models | Ollama-compatible GPU with 6–8 GB VRAM or more |
| Python | 3.10+ | Python 3.12+ |
| Node.js | Not required — the current app does not use Node.js to build or run | Not required |
| npm | Not required — the current app does not use npm | Not required |
| Git | Optional when downloading a ZIP | Current version if cloning/updating with Git |
| Ollama | Current stable release — required for AI features | Current stable release |
| Docker | Not required | Not required |

### Reference model tiers by hardware

| Hardware | Model tier to consider | Notes |
|---|---|---|
| 8 GB RAM, no discrete GPU | Smaller models around 1B–3B parameters | Prefer a small quantized build; responses may be slow, especially during the second verification pass. |
| 16 GB RAM | Models around 3B–7B parameters | Leaves more memory for the model and documents; speed and quality vary by computer and model. |
| GPU with 6–8 GB VRAM | Try models around 3B–7B parameters | A larger model or longer context may exceed VRAM and use system RAM. |
| GPU with 12 GB+ VRAM | You can try 7B+ models | Available VRAM, quantization, and prompt length still determine what fits. |
| Apple Silicon Mac | Smaller models on machines with 8 GB unified memory; more options from 16 GB | Unified memory is shared with the operating system and other apps. |

These model tiers are suggestions to try, not a guarantee that a model will fit in memory or reach a particular speed. A large model may respond slowly without sufficient VRAM; Ollama can use system RAM instead, but this is generally slower. Results depend on hardware, model, quantization, context, and task.

### Model and data storage

- A small chat model may take around 1–5 GB; a large model can take multiple gigabytes or tens of gigabytes. Size varies by model, version, and quantization.
- Downloading models with Ollama requires additional storage for every installed model; remove unused models with `ollama rm <model-name>`.
- The app currently stores document text in SQLite and searches by keyword; it **does not install or require a vector database**. There is currently no separate vector-database storage requirement.
- If an embedding/vector database is added later, vectors and indexes will grow with document count, document length, and embedding model. Allow additional storage; there is no single fixed estimate for every document collection.

**Model selection:** the app lists only chat models installed in Ollama; select one in **Settings**. Set `OLLAMA_MODEL` to prefer an installed model. Otherwise it tries `qwen3:8b`, then `gemma3:4b`, then the first remaining chat model; change the order with `OLLAMA_MODEL_PREFERENCE`. The default context size is 8192 (`OLLAMA_NUM_CTX`) and the model keep-alive is `10m` (`OLLAMA_KEEP_ALIVE`).

**GPU note:** with an RTX 3050 6 GB VRAM and 16 GB RAM, an 8B model may spill into system RAM and run more slowly. Try a smaller model or lower `OLLAMA_NUM_CTX` if memory is insufficient.

## Detailed installation on Windows

### 1. Install Python

1. Download Python 3.10 or later from [python.org/downloads](https://www.python.org/downloads/).
2. Run the installer. Check **Add python.exe to PATH** before selecting **Install Now**.
3. Open a new PowerShell window and verify:

   ```powershell
   python --version
   ```

   The result should be Python 3.10 or later. If Windows opens the Microsoft Store instead, reinstall from python.org and enable the PATH option.

### 2. Install Ollama and download an AI model

1. Download and install Ollama from [ollama.com/download](https://ollama.com/download).
2. Open the Ollama app. Ollama must keep running in the background while you use AI features.
3. Open PowerShell and download a compatible chat model you want to try. Replace `qwen3:8b` with another model name available from Ollama if needed:

   ```powershell
   ollama pull qwen3:8b
   ```

   A model may take several gigabytes of disk space and additional memory while running. On a memory-constrained computer, choose a smaller compatible model, such as a 1B–3B model. Vietnamese quality and speed depend on your hardware.
4. Verify the model is installed:

   ```powershell
   ollama list
   ```

   The app selects an installed compatible model; you can change it in **Settings**. No specific chat model is mandatory. To set the startup default, use `OLLAMA_MODEL` in step 5.

### 3. Download the source from GitHub

**Using Git:**

1. Install [Git for Windows](https://git-scm.com/download/win) if needed.
2. Open PowerShell in the folder where you want the app and run:

   ```powershell
   git clone https://github.com/XxZuPenguinxX/On_Otap_Thi_Cua_Zu.git
   cd On_Otap_Thi_Cua_Zu
   ```

**Or download a ZIP:** open the repository on GitHub, select **Code → Download ZIP**, extract it, and open PowerShell in the `On_Otap_Thi_Cua_Zu` folder.

### 4. Install PDF text extraction support

In PowerShell, from the project folder, run:

```powershell
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

The `pypdf` package extracts text from PDFs with a selectable text layer. The app still runs and accepts `.txt`/`.md` notes if you skip this step; PDF import will explain how to install the package. Scanned image PDFs do not include OCR, so convert them to text-enabled PDFs or paste recognized text.

### 5. Start the app

To set the startup default to an installed model, replace the name below with your choice:

```powershell
$env:OLLAMA_MODEL = "qwen3:8b"
python server.py
```

If you do not need to choose a model explicitly:

```powershell
python server.py
```

When PowerShell prints `LocalNote đang chạy tại http://127.0.0.1:8765`, open that address in your browser. Keep both PowerShell and Ollama running while you use the app. Press **Ctrl+C** in PowerShell to stop it.

If another program is already using port `8765`, choose another port and restart:

```powershell
$env:PORT = "8766"
python server.py
```

Then open `http://127.0.0.1:8766`. Use that same port throughout the session.

## Reopening the app and where your data is stored

- On Windows, after downloading the source once, open the `On_Otap_Thi_Cua_Zu` folder and double-click `start-localnote.bat` whenever you want to study again. It opens a command window and your browser; keep the command window open. Ollama must also be running.
- Without the launcher, open PowerShell in the project folder, run `python server.py`, then open `http://127.0.0.1:8765`.
- To exit, press **Ctrl+C** in the LocalNote window or close that window. Closing the browser does not delete your data.
- Documents, notes, **and completed assistant chat turns** are stored in SQLite on your hard drive. On Windows, the file is usually `%LOCALAPPDATA%\LocalNote\study.sqlite3` (typically `C:\Users\<your-name>\AppData\Local\LocalNote\study.sqlite3`); on macOS/Linux, it is `$XDG_DATA_HOME/LocalNote/study.sqlite3` when that variable is set, otherwise `~/.local/share/LocalNote/study.sqlite3`. Open **Settings** to view or copy the exact path.
- Recent history reappears when you open **Study assistant**. The app displays the most recent 100 turns. A request without a response or interrupted unexpectedly may not be saved.
- To back up: stop LocalNote with **Ctrl+C**, then copy `study.sqlite3` to another drive or backup location. To restore, copy the backup into the data folder above while the app is stopped.
- Language, model, exam-combination, and Theme Studio preferences are saved in the browser profile on this computer. Do not clear the browser data if you want to keep those preferences.

### 6. Start studying

1. Select **Chọn tổ hợp** (Choose combinations) in the top bar. You can select multiple combinations; the selection is saved in this browser.
2. AI prioritizes deeper analysis for subjects in your selected combinations. Other subjects remain available for concise exam-oriented review.
3. Open **Your sources** to paste notes or upload `.txt`, `.md`, or text-based PDF files. LocalNote does not fetch content from URLs.
4. Choose a subject and select **Tổng hợp** (Summary), **Đối chiếu lỗi** (Double-check), or **Bài kiểm tra** (Practice quiz). Each quiz has five multiple-choice questions. Select answers and choose **Chấm bài luyện tập** (Check answers) to see answers and explanations.
5. For **Ngữ Văn** (Literature), select **Chấm bài Văn** (Grade literature), paste an essay, and request feedback. The response is formative rubric-based feedback, not an official exam grade.
6. **Study assistant** answers subject-related questions, keeps local chat history, and prioritizes your added study sources.
7. Switch between Vietnamese and English with the **EN/VI** button in the top bar; change the installed AI model in **Settings**.
8. In **Settings → Theme Studio**, choose a preset, customize colors and typography, switch light/dark appearance, and tune motion. Custom themes can be saved or imported/exported as JSON.

## Data, privacy, and limitations

- The app listens only on `127.0.0.1`; it does not expose a server to your local network.
- AI runs through Ollama on your computer; study materials are not sent to a cloud AI service. Once installed, the app's network requests are limited to loopback Ollama and LocalNote's own API.
- The default database is `%LOCALAPPDATA%\LocalNote\study.sqlite3`. It is outside the Git folder; uploaded materials are not included in the repository.
- The app does not require Internet access at runtime. Downloading source code, installing Ollama/models, or Python packages requires Internet during setup.
- AI can be wrong, incomplete, or interpret material differently. Verify citations against the original sources and official exam information.
- Each AI response uses two passes: the first drafts an answer; the second Ollama pass checks it against the sources and request. If the second pass hits a hardware limit, the app tries smaller installed local models and clearly labels an answer when verification could not complete. This reduces errors but cannot guarantee correctness.
- PDFs are text-extracted; text inside images is not recognized. Do not upload documents that exceed the app's limits.

## Run the developer test suite

From the project folder, run:

```powershell
python -m unittest discover -s tests -v
```

## Troubleshooting

| Issue | What to do |
|---|---|
| `python` is not recognized | Reinstall Python from python.org, enable **Add python.exe to PATH**, and open a new PowerShell window. |
| The app cannot connect to Ollama | Open the Ollama app or run `ollama serve`. |
| No model is listed or the wrong model is selected | Run `ollama list`; set `$env:OLLAMA_MODEL = "model-name"` and restart `python server.py`. |
| Summary or quiz generation fails | Add a document for the selected subject, ensure it contains extractable text, and check that Ollama is running. |
| PDF import fails | Run `python -m pip install -r requirements.txt`; scanned PDFs need OCR outside this app. |
| Port 8765 is already in use | Run `$env:PORT = "8766"` and then `python server.py`; open port 8766. |
