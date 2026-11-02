import json
import os
import tempfile
import unittest
from pathlib import Path
from unittest.mock import MagicMock, patch


_test_data = tempfile.TemporaryDirectory()
os.environ["LOCALAPPDATA"] = _test_data.name
import server


def essay_feedback_json(feedback="Nhận xét.", title="Bài thơ Đồng chí"):
    return json.dumps({
        "criteria": [
            {"category": category, "score": 1, "feedback": f"{feedback} *{title}*"}
            for category in server.ESSAY_CATEGORIES
        ],
        "strengths": ["Nêu đúng chủ đề."],
        "issues": ["Cần thêm dẫn chứng."],
        "recommendations": ["Trích dẫn câu thơ phù hợp."],
        "revision_example": "Tình đồng đội hiện lên qua sự sẻ chia.",
        "caveats": ["Cần đối chiếu tài liệu."],
    }, ensure_ascii=False)


class StudyAppTests(unittest.TestCase):
    def setUp(self):
        self.temp_dir = tempfile.TemporaryDirectory()
        self.db_path = Path(self.temp_dir.name) / "study.sqlite3"
        self.db_patch = patch.object(server, "DB_PATH", self.db_path)
        self.db_patch.start()
        self.addCleanup(self.db_patch.stop)
        self.addCleanup(self.temp_dir.cleanup)

    def test_selected_combination_sets_deeper_study_prompt(self):
        system, _, _ = server.make_prompt(
            "summary",
            "Toán",
            "Hàm số",
            "Nguồn",
            "vi",
            [{"code": "A00", "subjects": ["Toán", "Vật lí", "Hóa học"]}],
            True,
        )
        self.assertIn("A00", system)
        self.assertIn("deeper", system)

    def test_unselected_subject_stays_exam_focused(self):
        system, _, _ = server.make_prompt(
            "summary",
            "Lịch sử",
            "Ôn tập",
            "Nguồn",
            "vi",
            [{"code": "A00", "subjects": ["Toán", "Vật lí", "Hóa học"]}],
            False,
        )
        self.assertIn("concise, exam-oriented review", system)

    def test_general_model_is_preferred_over_coding_model(self):
        self.assertEqual(
            server.choose_model(["qwen2.5-coder:7b", "gemma3:4b"]),
            "gemma3:4b",
        )

    def test_document_search_falls_back_to_selected_subject_sources(self):
        with server.connect_db() as db:
            db.execute(
                "INSERT INTO documents (title, subject, content) VALUES (?, ?, ?)",
                ("Ghi chú Toán", "Toán", "Parabol và đồ thị"),
            )
            db.execute(
                "INSERT INTO documents (title, subject, content) VALUES (?, ?, ?)",
                ("Ghi chú Văn", "Ngữ Văn", "Phân tích tác phẩm"),
            )
        rows = server.find_documents("nội dung không trùng", "Toán")
        self.assertEqual([row["title"] for row in rows], ["Ghi chú Toán"])

    def test_conversations_are_saved_and_loaded_from_sqlite(self):
        handler = object.__new__(server.Handler)
        saved = {}
        handler.send_json = lambda status, payload: saved.update(status=status, payload=payload)

        handler.create_conversation({
            "subject": "Toán",
            "prompt": "Giải thích hàm số bậc hai",
            "response": "Hàm số có dạng y = ax² + bx + c.",
            "model": "study-model",
        })
        self.assertEqual(saved["status"], 201)
        self.assertTrue(saved["payload"]["saved"])

        loaded = {}
        handler.send_json = lambda status, payload: loaded.update(status=status, payload=payload)
        handler.handle_api_get("/api/conversations", {})
        self.assertEqual(loaded["status"], 200)
        self.assertEqual(len(loaded["payload"]), 1)
        self.assertEqual(loaded["payload"][0]["prompt"], "Giải thích hàm số bậc hai")
        self.assertEqual(loaded["payload"][0]["response"], "Hàm số có dạng y = ax² + bx + c.")

    def test_generated_quiz_uses_ollama_json_format(self):
        responses = []
        for answer in ('{"questions": []}', '{"questions": []}'):
            response = MagicMock()
            response.__enter__.return_value.read.return_value = json.dumps(
                {"response": answer}
            ).encode()
            responses.append(response)
        with patch.object(server.urllib.request, "urlopen", side_effect=responses) as urlopen:
            result = server.generate_with_ollama(
                "quiz", "Toán", "Đồ thị", "Tài liệu", "vi", "test-model",
                [{"code": "A00", "subjects": ["Toán"]}], True,
            )
        first_body = json.loads(urlopen.call_args_list[0].args[0].data)
        second_body = json.loads(urlopen.call_args_list[1].args[0].data)
        self.assertEqual(first_body["format"]["properties"]["questions"]["minItems"], 5)
        self.assertEqual(second_body["format"]["properties"]["questions"]["minItems"], 5)
        self.assertFalse(first_body["stream"])
        self.assertIn("unverified", second_body["prompt"])
        self.assertEqual(urlopen.call_count, 2)
        self.assertEqual(result, '{"questions": []}')

    def test_essay_second_pass_checks_literary_facts_before_replying(self):
        responses = []
        for answer in (essay_feedback_json("Bản nháp."), essay_feedback_json("Bản đã kiểm tra.")):
            response = MagicMock()
            response.__enter__.return_value.read.return_value = json.dumps(
                {"response": answer}
            ).encode()
            responses.append(response)
        with patch.object(server.urllib.request, "urlopen", side_effect=responses) as urlopen:
            answer = server.generate_with_ollama(
                "grade", "Ngữ Văn", "Bài thơ Đồng chí của Chính Hữu", "", "vi",
                "test-model", [], False,
            )
        verification = json.loads(urlopen.call_args_list[1].args[0].data)
        self.assertIn("Do not introduce a new work title, author", verification["system"])
        self.assertIn("Preserve exact titles and author names as provided by the student", verification["system"])
        feedback = json.loads(answer)
        self.assertEqual(feedback["score"], 4)
        self.assertIn("Bài thơ Đồng chí", feedback["criteria"][0]["feedback"])

    def test_essay_feedback_uses_fixed_rubric_and_removes_invented_titles(self):
        answer = essay_feedback_json(title="Bài thơ Đằng Cổ")
        result = json.loads(server.normalize_essay_feedback(
            answer,
            "Bài thơ Đồng chí của Chính Hữu.",
            "",
        ))
        self.assertEqual(result["score"], 4)
        self.assertEqual(
            [item["max_score"] for item in result["criteria"]],
            [2, 4, 2, 2],
        )
        self.assertIn("tác phẩm trong bài viết", result["criteria"][0]["feedback"])
        self.assertNotIn("Đằng Cổ", json.dumps(result, ensure_ascii=False))

    def test_second_pass_uses_a_lighter_local_model_after_primary_failure(self):
        # Model fallback applies to both the draft and verification passes.
        with patch.object(server, "ollama_generate", side_effect=[
            RuntimeError("GPU memory error"),
            essay_feedback_json("Bản nháp."),
            RuntimeError("GPU memory error"),
            essay_feedback_json("Đã kiểm tra."),
        ]) as generate:
            answer, model, verified = server.generate_verified_with_ollama(
                "grade", "Ngữ Văn", "Bài viết", "", "vi", "large-model",
                [], False, ["large-model", "small-model"],
            )
        self.assertIn("Đã kiểm tra", answer)
        self.assertEqual(model, "large-model")
        self.assertTrue(verified)
        self.assertEqual(generate.call_count, 4)

    def test_second_pass_failure_returns_draft_marked_unverified(self):
        with patch.object(server, "ollama_generate", side_effect=[
            "Unverified draft",
            RuntimeError("GPU memory error"),
        ]):
            answer, model, verified = server.generate_verified_with_ollama(
                "summary", "Toán", "Ôn tập", "", "vi", "only-model",
                [], False, ["only-model"],
            )
        self.assertEqual(answer, "Unverified draft")
        self.assertEqual(model, "only-model")
        self.assertFalse(verified)

    def test_import_blocks_loopback_addresses(self):
        with self.assertRaisesRegex(ValueError, "mạng riêng"):
            server.validate_public_url("https://127.0.0.1/private")

    def test_html_import_omits_script_content(self):
        text = server.extract_html_text(
            "<html><title>Study</title><p>Visible lesson</p>"
            "<script>steal()</script></html>"
        )
        self.assertIn("Visible lesson", text)
        self.assertNotIn("steal()", text)

    def test_trusted_search_filters_unknown_publishers(self):
        xml = b"""<rss><channel>
          <item><title>Official update</title><link>https://news.google.com/rss/articles/one</link>
            <source url="https://moet.gov.vn">Ministry</source></item>
          <item><title>Unknown update</title><link>https://news.google.com/rss/articles/two</link>
            <source url="https://unknown.example">Unknown</source></item>
        </channel></rss>"""
        response = MagicMock()
        response.__enter__.return_value.read.return_value = xml
        with patch.object(server.urllib.request, "urlopen", return_value=response):
            items, errors = server.search_trusted_sources("giáo dục")
        self.assertFalse(errors)
        self.assertEqual([item["source"] for item in items], ["Ministry"])


if __name__ == "__main__":
    unittest.main()
