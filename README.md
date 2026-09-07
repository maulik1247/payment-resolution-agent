# Razorpay Ops AI (Mock)

Mock AI product demo for Razorpay merchant payment operations.

Multi-agent pipeline: **Investigator → Resolver → Risk Reviewer → Human**, with dashboard, resolution queue, escalations, and agent roster.

## Features

- Dashboard with ₹ at risk, funnel, and agent metrics
- Queue with Razorpay-shaped IDs (`payment_id`, `order_id`, RRN, method)
- Evidence timeline, action catalog, audit trail, customer message preview
- Local simulated agents (no API key required)

## Run

```bash
npm install
npm run dev
```

Open the local URL Vite prints (default `http://127.0.0.1:5173`).

## Note

This is a **UI/product mock**, not a production Razorpay integration or live LLM system.
