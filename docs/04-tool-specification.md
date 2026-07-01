# Tool Specification

---

## verifyPatient

Purpose

Verify patient identity.

Input

- callSessionId
- fullName
- dateOfBirth

Output

- verified
- nextState

---

## confirmRefill

Purpose

Record whether patient wants the refill.

Input

- callSessionId
- confirmed

Output

- refillConfirmed
- nextState

---

## recordPaymentPreference

Purpose

Record patient's preferred payment method.

Input

- callSessionId
- paymentChoice

Output

- paymentChoice
- paymentStatus
- nextState

---

## markNeedsFollowUp

Purpose

Flag call for manual staff review.

Input

- callSessionId
- reason

Output

- followUpCreated