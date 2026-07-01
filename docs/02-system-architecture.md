# System Architecture

## High-Level Architecture

```
               Pharmacy Staff
                      │
              Dashboard (Next.js)
                      │
                      ▼
              Node.js + Express API
                      │
      ┌───────────────┼────────────────┐
      ▼               ▼                ▼
 Patients         AI Tools         Call APIs
                      │
                      ▼
             Business Services
      ┌───────────────┼────────────────┐
      ▼               ▼                ▼
 Verification     Refill        Payment Preference
                      │
                      ▼
               Integration Layer
              ┌─────────┴─────────┐
              ▼                   ▼
            Vapi             SMS Provider
                      │
                      ▼
                 PostgreSQL
```

---

## Core Concepts

### Patient

Stores patient demographic and refill information.

---

### CallSession

Represents one outbound phone call.

Tracks:

- Current status
- Conversation state
- Transcript
- Payment preference
- Verification
- Follow-up status

---

### Conversation State

Implements a finite state machine.

```
GREETING

↓

VERIFY_NAME

↓

VERIFY_DOB

↓

REFILL_DISCUSSION

↓

PAYMENT_SELECTION

↓

COMPLETED
```

---

### AI Tools

The AI never accesses the database directly.

Instead it invokes backend tools.

Examples:

- verifyPatient
- confirmRefill
- recordPaymentPreference
- markNeedsFollowUp

---

### Integrations

External services are isolated.

Current:

- Vapi

Future:

- SMS Provider
- Pharmacy Platform