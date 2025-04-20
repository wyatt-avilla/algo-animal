import subprocess
import tempfile
from typing import Any
from pathlib import Path
import json
from fastapi import APIRouter
from pydantic import BaseModel


router = APIRouter()


class GradeRequest(BaseModel):
    given_code: str
    test_code: str


router = APIRouter()


@router.post("/api/grade_question")
def grade_question(request: GradeRequest) -> dict[str, Any]:
    with Path("problem_sets/test-framework.json").open("r") as f:
        data = json.load(f)

    test_framework = data["test_framework"]
    full_code = request.given_code + "\n" + test_framework + "\n" + request.test_code

    with tempfile.NamedTemporaryFile(mode="w", suffix=".py", delete=False) as tmp:
        tmp.write(full_code)
        tmp_path = tmp.name

    try:
        result = subprocess.run(
            ["python", tmp_path],
            capture_output=True,
            text=True,
            timeout=5,
        )
        if result.returncode != 0:
            return {"error": "Code failed to run", "stdout": result.stdout}
        try:
            return json.loads(result.stdout)
        except json.JSONDecodeError:
            return {
                "error": "Output was not valid JSON",
                "stdout": result.stdout,
                "stderr": result.stderr,
                "returncode": result.returncode,
            }
    finally:
        Path(tmp_path).unlink(missing_ok=True)

    return json.loads(result.stdout)
