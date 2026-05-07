from datetime import datetime
import json

class AuditLog:
    def __init__(self):
        self.events = []

    def record(self, request_id, state, note):
        self.events.append({
            "ts": datetime.utcnow().isoformat() + "Z",
            "request_id": request_id,
            "state": state,
            "note": note,
            "mode": "public-simulation"
        })

    def export(self):
        return json.dumps(self.events, indent=2)

if __name__ == "__main__":
    log = AuditLog()
    log.record("XG-26-042", "HOLD", "Action paused before irreversible consequence")
    log.record("XG-26-042", "APPROVED", "Trusted authority simulated approval")
    print(log.export())
