import time
from collections import defaultdict, deque

from fastapi import HTTPException, Request, status

from app.config.settings import settings

_RATE_LIMIT_WINDOW_SECONDS = 60
_RATE_LIMIT_MAX_REQUESTS = 30
_request_log: dict[str, deque[float]] = defaultdict(deque)


def enforce_ai_rate_limit(request: Request) -> None:
    client_host = request.client.host if request.client else "unknown"
    now = time.monotonic()
    recent_requests = _request_log[client_host]

    while recent_requests and now - recent_requests[0] > _RATE_LIMIT_WINDOW_SECONDS:
        recent_requests.popleft()

    if len(recent_requests) >= _RATE_LIMIT_MAX_REQUESTS:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many AI requests. Please wait a moment and try again.",
        )

    recent_requests.append(now)
