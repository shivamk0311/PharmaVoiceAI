# API Reference

## Patients

GET /api/patients

Returns all imported patients.

---

POST /api/patients/import

Imports patients from CSV.

---

## Calls

POST /api/calls/:patientId/start

Creates CallSession and starts outbound Vapi call.

---

## Vapi

POST /api/vapi/webhook

Receives call events from Vapi.

---

## AI Tools

POST /api/tools/verify-patient

POST /api/tools/confirm-refill

POST /api/tools/record-payment-preference

POST /api/tools/mark-needs-follow-up