from dataclasses import dataclass, asdict
from enum import Enum
from time import time
import json

class State(str, Enum):
    HOLD = "HOLD"
    REVIEW = "REVIEW"
    APPROVED = "APPROVED"
    DENIED = "DENIED"
    EXECUTED = "EXECUTED"

@dataclass
class DecisionRequest:
    request_id: str
    action: str
    risk: str
    amount_hint: str = "simulated"
    state: State = State.HOLD
    created_at: float = time()

    def transition(self, next_state: State):
        allowed = {
            State.HOLD: [State.REVIEW],
            State.REVIEW: [State.APPROVED, State.DENIED],
            State.APPROVED: [State.EXECUTED],
            State.DENIED: [],
            State.EXECUTED: [],
        }
        if next_state not in allowed[self.state]:
            raise ValueError(f"Invalid transition: {self.state} -> {next_state}")
        self.state = next_state
        return self

if __name__ == "__main__":
    req = DecisionRequest(
        request_id="XG-26-042",
        action="High-risk payment-like action",
        risk="New receiver + pressure window"
    )
    req.transition(State.REVIEW).transition(State.APPROVED).transition(State.EXECUTED)
    print(json.dumps(asdict(req), indent=2, default=str))
