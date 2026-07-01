# Conversation Flow

## Happy Path

START

↓

Greeting

↓

Verify Name

↓

Verify DOB

↓

Discuss Refill

↓

Confirm Refill

↓

Record Payment Preference

↓

Summary

↓

End Call

---

## Failure Paths

Verification Failed

↓

Retry Once

↓

Needs Follow-up

---

Refill Declined

↓

End Call

---

Patient Requests Pharmacist

↓

Needs Follow-up

↓

End Call

---

Patient Already Picked Up Medication

↓

Needs Follow-up

↓

End Call

---

Patient Requests Callback

↓

Needs Follow-up

↓

End Call