import { useState, useEffect } from "react";

const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=IBM+Plex+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  .pra-root {
    background: #F4F5F7;
    color: #1A1D24;
    font-family: 'DM Sans', -apple-system, sans-serif;
    min-height: 100vh;
    min-height: 100dvh;
    height: 100vh;
    height: 100dvh;
    display: flex;
    flex-direction: row;
    overflow: hidden;
  }
  .pra-mono { font-family: 'IBM Plex Mono', 'Courier New', monospace; }

  .pra-menu-btn, .pra-back-btn, .pra-sidebar-close {
    display: none;
    border: 1px solid #D8DADF;
    background: #FFFFFF;
    border-radius: 8px;
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    color: #1A1D24;
    padding: 0;
  }
  .pra-menu-btn svg, .pra-back-btn svg, .pra-sidebar-close svg { width: 18px; height: 18px; }
  .pra-sidebar-backdrop {
    display: none;
  }
  .pra-header-left {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }

  /* App sidebar */
  .pra-sidebar {
    width: 220px;
    flex-shrink: 0;
    background: #15171C;
    color: #FFFFFF;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }
  .pra-sidebar-brand {
    padding: 22px 18px 18px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .pra-sidebar-brand-name {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -0.02em;
  }
  .pra-sidebar-brand-sub {
    font-size: 11px;
    color: rgba(255,255,255,0.45);
    margin-top: 4px;
    line-height: 1.35;
  }
  .pra-sidebar-nav {
    flex: 1;
    padding: 14px 10px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    overflow-y: auto;
  }
  .pra-sidebar-section {
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: rgba(255,255,255,0.35);
    padding: 12px 10px 6px;
  }
  .pra-side-item {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    border: none;
    background: transparent;
    color: rgba(255,255,255,0.62);
    font-family: inherit;
    font-size: 13px;
    font-weight: 500;
    padding: 9px 10px;
    border-radius: 7px;
    cursor: pointer;
    text-align: left;
    transition: background 0.12s ease, color 0.12s ease;
  }
  .pra-side-item:hover {
    background: rgba(255,255,255,0.06);
    color: #FFFFFF;
  }
  .pra-side-item-active {
    background: rgba(255,255,255,0.1);
    color: #FFFFFF;
  }
  .pra-side-icon {
    width: 18px;
    height: 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    opacity: 0.85;
    flex-shrink: 0;
  }
  .pra-side-icon svg { width: 16px; height: 16px; }
  .pra-side-label { flex: 1; }
  .pra-side-count {
    font-size: 11px;
    font-weight: 600;
    background: rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.75);
    padding: 1px 7px;
    border-radius: 999px;
    font-variant-numeric: tabular-nums;
  }
  .pra-side-count-alert {
    background: rgba(196, 57, 43, 0.35);
    color: #FFB4AB;
  }
  .pra-sidebar-foot {
    padding: 14px 16px 18px;
    border-top: 1px solid rgba(255,255,255,0.08);
    font-size: 11px;
    color: rgba(255,255,255,0.4);
    line-height: 1.4;
  }

  .pra-main {
    flex: 1;
    min-width: 0;
    min-height: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .pra-header {
    flex-shrink: 0;
    background: #FFFFFF;
    border-bottom: 1px solid #E4E6EB;
    padding: 14px 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }
  .pra-header-title { font-size: 16px; font-weight: 700; letter-spacing: -0.02em; }
  .pra-header-sub { font-size: 12px; color: #8A8F98; margin-top: 2px; }
  .pra-stats { display: flex; gap: 32px; align-items: center; }
  .pra-stat-value { font-size: 18px; font-weight: 700; line-height: 1.1; letter-spacing: -0.02em; }
  .pra-stat-label { font-size: 11px; color: #8A8F98; margin-top: 2px; text-transform: uppercase; letter-spacing: 0.04em; }

  .pra-body {
    flex: 1;
    display: flex;
    min-height: 0;
    overflow: hidden;
  }

  /* Left queue */
  .pra-queue {
    width: 340px;
    flex-shrink: 0;
    background: #FFFFFF;
    border-right: 1px solid #E4E6EB;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }
  .pra-queue-toolbar {
    flex-shrink: 0;
    padding: 12px 16px;
    border-bottom: 1px solid #E4E6EB;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .pra-filter-row {
    display: flex;
    gap: 6px;
  }
  .pra-filter-btn {
    border: 1px solid #E4E6EB;
    background: #FFFFFF;
    color: #5C6370;
    font-family: inherit;
    font-size: 12px;
    font-weight: 600;
    padding: 6px 10px;
    border-radius: 999px;
    cursor: pointer;
  }
  .pra-filter-btn-active {
    background: #1A1D24;
    border-color: #1A1D24;
    color: #FFFFFF;
  }
  .pra-filter-count {
    opacity: 0.75;
    margin-left: 4px;
  }
  .pra-queue-list {
    flex: 1;
    overflow-y: auto;
    min-height: 0;
  }
  .pra-queue-list::-webkit-scrollbar { width: 6px; }
  .pra-queue-list::-webkit-scrollbar-thumb { background: #D8DADF; border-radius: 3px; }

  .pra-row {
    cursor: pointer;
    padding: 14px 16px;
    border-bottom: 1px solid #F0F1F3;
    border-left: 3px solid transparent;
    transition: background 0.12s ease, border-color 0.12s ease;
  }
  .pra-row:hover { background: #F8F9FA; }
  .pra-row-active {
    background: #F0F4FF;
    border-left-color: #3B5BDB;
  }
  .pra-row-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 6px;
  }
  .pra-row-id { font-size: 12px; color: #5C6370; }
  .pra-row-amount { font-size: 14px; font-weight: 600; letter-spacing: -0.01em; }
  .pra-row-code { font-size: 11px; color: #8A8F98; margin-top: 3px; }

  /* Right detail */
  .pra-detail {
    flex: 1;
    min-width: 0;
    min-height: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .pra-detail-empty {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #8A8F98;
    font-size: 14px;
  }
  .pra-detail-header {
    flex-shrink: 0;
    background: #FFFFFF;
    border-bottom: 1px solid #E4E6EB;
    padding: 20px 28px;
  }
  .pra-detail-header-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 10px;
  }
  .pra-detail-id { font-size: 15px; font-weight: 600; }
  .pra-detail-meta { display: flex; align-items: center; gap: 10px; margin-top: 6px; flex-wrap: wrap; }
  .pra-detail-amount { font-size: 22px; font-weight: 700; letter-spacing: -0.03em; white-space: nowrap; }
  .pra-detail-note {
    font-size: 13px;
    color: #5C6370;
    line-height: 1.55;
    max-width: 720px;
  }
  .pra-detail-actions {
    flex-shrink: 0;
    margin-top: 16px;
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .pra-detail-body {
    flex: 1;
    overflow-y: auto;
    padding: 24px 28px 40px;
    min-height: 0;
  }
  .pra-detail-body::-webkit-scrollbar { width: 6px; }
  .pra-detail-body::-webkit-scrollbar-thumb { background: #D8DADF; border-radius: 3px; }
  .pra-detail-inner { max-width: 680px; }

  .pra-badge {
    font-size: 10px;
    padding: 3px 8px;
    border-radius: 4px;
    font-weight: 600;
    letter-spacing: 0.04em;
    white-space: nowrap;
    text-transform: uppercase;
  }
  .pra-badge-pending { background: #EEF0F3; color: #6B7280; }
  .pra-badge-processing { background: #FFF4E0; color: #B5790C; }
  .pra-badge-resolved { background: #E6F7ED; color: #1E8A4C; }
  .pra-badge-done { background: #E6F7ED; color: #1E8A4C; }
  .pra-badge-escalated { background: #FCEDEC; color: #C4392B; }
  .pra-badge-error { background: #FCEDEC; color: #C4392B; }

  .pra-chip {
    font-size: 11px;
    padding: 3px 8px;
    border-radius: 4px;
    background: #F0F1F3;
    color: #5C6370;
    font-weight: 500;
  }

  .pra-btn {
    border-radius: 6px;
    padding: 9px 16px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    border: 1px solid transparent;
    transition: opacity 0.12s ease, background 0.12s ease;
    font-family: inherit;
  }
  .pra-btn:hover { opacity: 0.88; }
  .pra-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .pra-btn-primary { background: #1A1D24; color: #FFFFFF; }
  .pra-btn-ghost { background: #FFFFFF; border-color: #D8DADF; color: #1A1D24; }
  .pra-btn-ghost:hover { background: #F8F9FA; opacity: 1; }
  .pra-btn-approve { background: #1E8A4C; color: #FFFFFF; }
  .pra-btn-override { background: #FFFFFF; border: 1px solid #C6C6C6; color: #1A1D24; }
  .pra-btn-sm { padding: 7px 12px; font-size: 12px; width: 100%; }

  .pra-muted { color: #8A8F98; }
  .pra-panel {
    background: #FFFFFF;
    border: 1px solid #E4E6EB;
    border-radius: 10px;
    padding: 18px;
  }

  .pra-agent-card {
    border: 1px solid #E4E6EB;
    border-radius: 10px;
    margin-bottom: 0;
    overflow: hidden;
    background: #FFFFFF;
  }
  .pra-agent-head {
    padding: 12px 16px;
    background: #FAFBFC;
    border-bottom: 1px solid #F0F1F3;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .pra-agent-name { font-size: 13px; font-weight: 600; }
  .pra-agent-role { font-size: 11px; color: #8A8F98; margin-top: 1px; }
  .pra-agent-body { padding: 14px 16px; }
  .pra-dot {
    width: 7px; height: 7px; border-radius: 50%;
    display: inline-block; margin-right: 8px; flex-shrink: 0;
  }
  .pra-dot-investigator { background: #3B7DD8; }
  .pra-dot-resolver { background: #B5790C; }
  .pra-dot-reviewer { background: #7C4FD8; }
  .pra-arrow {
    text-align: center;
    color: #C0C4CC;
    font-size: 12px;
    padding: 8px 0;
    letter-spacing: 0.02em;
  }
  .pra-reject-tag {
    display: inline-block;
    background: #FCEDEC; color: #C4392B;
    font-size: 10px; font-weight: 700; letter-spacing: 0.04em;
    padding: 3px 8px; border-radius: 4px; margin-bottom: 8px;
  }
  .pra-approve-tag {
    display: inline-block;
    background: #E6F7ED; color: #1E8A4C;
    font-size: 10px; font-weight: 700; letter-spacing: 0.04em;
    padding: 3px 8px; border-radius: 4px; margin-bottom: 8px;
  }

  .pra-finding {
    font-size: 12.5px;
    color: #4A4F58;
    margin-bottom: 6px;
    line-height: 1.45;
    padding-left: 10px;
    position: relative;
  }
  .pra-finding::before {
    content: '';
    position: absolute;
    left: 0; top: 7px;
    width: 4px; height: 4px;
    border-radius: 50%;
    background: #C0C4CC;
  }

  .pra-waiting {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 16px 18px;
    background: #FFFFFF;
    border: 1px dashed #D8DADF;
    border-radius: 10px;
    color: #8A8F98;
    font-size: 13px;
  }
  .pra-spinner {
    width: 14px; height: 14px;
    border: 2px solid #E4E6EB;
    border-top-color: #3B5BDB;
    border-radius: 50%;
    animation: pra-spin 0.7s linear infinite;
  }
  @keyframes pra-spin { to { transform: rotate(360deg); } }

  .pra-outcome-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
  }
  .pra-outcome-actions { display: flex; gap: 8px; flex-wrap: wrap; }

  .pra-textarea {
    background: #FFFFFF;
    border: 1px solid #D8DADF;
    color: #1A1D24;
    border-radius: 6px;
    padding: 10px 12px;
    font-size: 13px;
    width: 100%;
    resize: vertical;
    font-family: inherit;
    line-height: 1.5;
  }
  .pra-textarea:focus, .pra-input:focus {
    outline: none;
    border-color: #3B5BDB;
    box-shadow: 0 0 0 3px rgba(59, 91, 219, 0.12);
  }
  .pra-input {
    background: #FFFFFF;
    border: 1px solid #D8DADF;
    color: #1A1D24;
    border-radius: 6px;
    padding: 9px 12px;
    font-size: 13px;
    width: 100%;
    font-family: inherit;
  }
  .pra-input::placeholder { color: #B0B0B0; }
  .pra-field-label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #8A8F98;
    margin-bottom: 5px;
    display: block;
    font-weight: 600;
  }

  .pra-overlay {
    position: fixed; inset: 0;
    background: rgba(20, 22, 28, 0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
    backdrop-filter: blur(2px);
  }
  .pra-modal {
    background: #FFFFFF;
    border: 1px solid #E4E6EB;
    border-radius: 12px;
    padding: 24px;
    width: 420px;
    max-width: calc(100vw - 32px);
    box-shadow: 0 16px 48px rgba(0,0,0,0.14);
  }
  .pra-modal-actions { display: flex; gap: 8px; }

  .pra-pg {
    width: 440px;
    max-width: calc(100vw - 24px);
    background: #FFFFFF;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 20px 56px rgba(0,0,0,0.18);
    border: 1px solid #E4E6EB;
  }
  .pra-pg-top {
    background: linear-gradient(135deg, #072654 0%, #0B3A75 55%, #0E4D8C 100%);
    color: #fff;
    padding: 18px 20px 16px;
  }
  .pra-pg-top-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
  }
  .pra-pg-merchant {
    font-size: 13px;
    font-weight: 600;
    opacity: 0.85;
  }
  .pra-pg-order {
    font-size: 11px;
    opacity: 0.65;
    margin-top: 3px;
  }
  .pra-pg-amount {
    font-size: 26px;
    font-weight: 700;
    letter-spacing: -0.03em;
    margin-top: 14px;
  }
  .pra-pg-amount-sub {
    font-size: 11px;
    opacity: 0.7;
    margin-top: 4px;
  }
  .pra-pg-badge {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    background: rgba(255,255,255,0.14);
    padding: 5px 8px;
    border-radius: 6px;
  }
  .pra-pg-body { padding: 16px 18px 18px; }
  .pra-pg-tabs {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 6px;
    margin-bottom: 14px;
  }
  .pra-pg-tab {
    border: 1px solid #E4E6EB;
    background: #FAFBFC;
    border-radius: 8px;
    padding: 10px 8px;
    font-family: inherit;
    font-size: 12px;
    font-weight: 600;
    color: #5C6370;
    cursor: pointer;
  }
  .pra-pg-tab-active {
    background: #EFF6FF;
    border-color: #93C5FD;
    color: #1D4ED8;
  }
  .pra-pg-apps {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin: 8px 0 14px;
  }
  .pra-pg-app {
    border: 1px solid #E4E6EB;
    background: #fff;
    border-radius: 8px;
    padding: 8px 10px;
    font-size: 11px;
    font-weight: 600;
    color: #2A2E36;
    cursor: pointer;
    font-family: inherit;
  }
  .pra-pg-app-active {
    border-color: #93C5FD;
    background: #EFF6FF;
    color: #1D4ED8;
  }
  .pra-pg-row2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .pra-pg-secure {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: #8A8F98;
    margin-top: 12px;
  }
  .pra-pg-steps {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 16px;
    text-align: left;
  }
  .pra-pg-step {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    color: #8A8F98;
  }
  .pra-pg-step-on { color: #1A1D24; font-weight: 600; }
  .pra-pg-step-done { color: #1E8A4C; }
  .pra-pg-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #D8DADF;
    flex-shrink: 0;
  }
  .pra-pg-dot-on { background: #3B7DD8; box-shadow: 0 0 0 4px rgba(59,125,216,0.15); }
  .pra-pg-dot-done { background: #1E8A4C; }
  .pra-upi-status {
    text-align: center;
    padding: 20px 8px 8px;
  }
  .pra-upi-status-icon {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    margin: 0 auto 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    font-weight: 700;
  }
  .pra-upi-status-icon-wait { background: #FFF4E0; color: #B5790C; }
  .pra-upi-status-icon-ok { background: #E6F7ED; color: #1E8A4C; }
  .pra-upi-status-icon-bad { background: #FCEDEC; color: #C4392B; }
  .pra-upi-status-title {
    font-size: 17px;
    font-weight: 700;
    color: #1A1D24;
    margin-bottom: 6px;
  }
  .pra-upi-status-sub {
    font-size: 13px;
    color: #5C6370;
    line-height: 1.45;
  }
  .pra-upi-hint {
    font-size: 11px;
    color: #8A8F98;
    margin-top: 10px;
    line-height: 1.4;
  }

  /* Dashboard */
  .pra-dash {
    flex: 1;
    overflow-y: auto;
    min-height: 0;
    padding: 28px 32px 48px;
  }
  .pra-dash::-webkit-scrollbar { width: 6px; }
  .pra-dash::-webkit-scrollbar-thumb { background: #D8DADF; border-radius: 3px; }
  .pra-dash-inner { max-width: 1120px; margin: 0 auto; }
  .pra-dash-hero {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 28px;
  }
  .pra-dash-hero h1 {
    font-size: 26px;
    font-weight: 700;
    letter-spacing: -0.03em;
    margin: 0 0 6px;
  }
  .pra-dash-hero p {
    margin: 0;
    font-size: 14px;
    color: #8A8F98;
    line-height: 1.45;
    max-width: 520px;
  }
  .pra-kpi-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    margin-bottom: 20px;
  }
  .pra-kpi {
    background: #FFFFFF;
    border: 1px solid #E4E6EB;
    border-radius: 12px;
    padding: 18px 20px;
  }
  .pra-kpi-label {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #8A8F98;
    margin-bottom: 10px;
  }
  .pra-kpi-value {
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 1;
  }
  .pra-kpi-hint {
    font-size: 12px;
    color: #8A8F98;
    margin-top: 8px;
  }
  .pra-grid-2 {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 14px;
    margin-bottom: 14px;
  }
  .pra-grid-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 14px;
    margin-bottom: 14px;
  }
  .pra-card {
    background: #FFFFFF;
    border: 1px solid #E4E6EB;
    border-radius: 12px;
    padding: 20px;
  }
  .pra-card-title {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: -0.01em;
    margin-bottom: 4px;
  }
  .pra-card-sub {
    font-size: 12px;
    color: #8A8F98;
    margin-bottom: 18px;
  }
  .pra-funnel {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .pra-funnel-row {
    display: grid;
    grid-template-columns: 110px 1fr 40px;
    align-items: center;
    gap: 12px;
  }
  .pra-funnel-label {
    font-size: 12px;
    font-weight: 600;
    color: #5C6370;
  }
  .pra-funnel-track {
    height: 28px;
    background: #F4F5F7;
    border-radius: 6px;
    overflow: hidden;
  }
  .pra-funnel-fill {
    height: 100%;
    border-radius: 6px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    font-size: 11px;
    font-weight: 600;
    color: #FFFFFF;
    min-width: fit-content;
    transition: width 0.4s ease;
  }
  .pra-funnel-count {
    font-size: 13px;
    font-weight: 700;
    text-align: right;
    font-variant-numeric: tabular-nums;
  }
  .pra-agent-grid {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .pra-agent-metric {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    padding: 12px;
    background: #FAFBFC;
    border-radius: 8px;
  }
  .pra-agent-metric-dot {
    width: 8px; height: 8px; border-radius: 50%;
    margin-top: 5px; flex-shrink: 0;
  }
  .pra-agent-metric-name { font-size: 13px; font-weight: 600; }
  .pra-agent-metric-desc { font-size: 11px; color: #8A8F98; margin-top: 2px; margin-bottom: 8px; }
  .pra-agent-metric-stats {
    display: flex;
    gap: 16px;
    font-size: 12px;
    color: #5C6370;
  }
  .pra-agent-metric-stats strong { color: #1A1D24; font-weight: 700; }
  .pra-bar-list { display: flex; flex-direction: column; gap: 12px; }
  .pra-bar-row { display: flex; flex-direction: column; gap: 5px; }
  .pra-bar-meta {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }
  .pra-bar-meta span:first-child { font-weight: 600; color: #5C6370; }
  .pra-bar-meta span:last-child { color: #8A8F98; font-variant-numeric: tabular-nums; }
  .pra-bar-track {
    height: 8px;
    background: #F0F1F3;
    border-radius: 4px;
    overflow: hidden;
  }
  .pra-bar-fill {
    height: 100%;
    border-radius: 4px;
    background: #3B5BDB;
  }
  .pra-activity {
    display: flex;
    flex-direction: column;
  }
  .pra-activity-row {
    display: grid;
    grid-template-columns: 1fr auto auto;
    gap: 16px;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #F0F1F3;
    cursor: pointer;
    transition: background 0.1s ease;
  }
  .pra-activity-row:last-child { border-bottom: none; }
  .pra-activity-row:hover { background: #FAFBFC; margin: 0 -8px; padding-left: 8px; padding-right: 8px; border-radius: 6px; }
  .pra-activity-id { font-size: 12px; color: #5C6370; }
  .pra-activity-action { font-size: 13px; font-weight: 600; margin-top: 2px; }
  .pra-activity-class { font-size: 11px; color: #8A8F98; margin-top: 2px; }
  .pra-empty-dash {
    text-align: center;
    padding: 40px 20px;
    color: #8A8F98;
    font-size: 13px;
  }
  @media (max-width: 960px) {
    .pra-kpi-grid { grid-template-columns: repeat(2, 1fr); }
    .pra-grid-2, .pra-grid-3 { grid-template-columns: 1fr; }
  }

  @media (max-width: 900px) {
    .pra-menu-btn, .pra-back-btn { display: inline-flex; }
    .pra-sidebar-close { display: inline-flex; border-color: rgba(255,255,255,0.2); background: transparent; color: #fff; }

    .pra-sidebar {
      position: fixed;
      inset: 0 auto 0 0;
      width: min(280px, 86vw);
      z-index: 60;
      transform: translateX(-105%);
      transition: transform 0.22s ease;
      box-shadow: none;
    }
    .pra-sidebar-open {
      transform: translateX(0);
      box-shadow: 8px 0 32px rgba(0,0,0,0.28);
    }
    .pra-sidebar-backdrop {
      display: block;
      position: fixed;
      inset: 0;
      background: rgba(20, 22, 28, 0.45);
      z-index: 55;
      border: none;
      padding: 0;
      cursor: pointer;
    }

    .pra-header {
      padding: 12px 14px;
      flex-wrap: wrap;
      gap: 10px 14px;
    }
    .pra-header-title { font-size: 15px; }
    .pra-header-sub { display: none; }
    .pra-stats {
      width: 100%;
      gap: 0;
      justify-content: space-between;
      padding-top: 4px;
      border-top: 1px solid #F0F1F3;
    }
    .pra-stats > div { flex: 1; min-width: 0; }
    .pra-stat-value { font-size: 15px; }
    .pra-stat-label { font-size: 10px; }

    .pra-dash { padding: 16px 14px 32px; }
    .pra-dash-hero {
      flex-direction: column;
      align-items: stretch;
      gap: 14px;
      margin-bottom: 18px;
    }
    .pra-dash-hero h1 { font-size: 22px; }
    .pra-dash-hero .pra-btn { width: 100%; }
    .pra-kpi-grid { gap: 10px; }
    .pra-kpi { padding: 14px; }
    .pra-kpi-value { font-size: 22px; }

    .pra-body { flex-direction: column; }
    .pra-queue {
      width: 100%;
      border-right: none;
      display: none;
    }
    .pra-detail { display: none; }
    .pra-mobile-list .pra-queue { display: flex; flex: 1; }
    .pra-mobile-detail .pra-detail { display: flex; flex: 1; }

    .pra-detail-header { padding: 16px 14px; }
    .pra-detail-header-top { flex-direction: column; gap: 8px; }
    .pra-detail-amount { font-size: 20px; }
    .pra-detail-body { padding: 16px 14px 32px; }
    .pra-id-grid { grid-template-columns: 1fr; }
    .pra-tl-item { grid-template-columns: 56px 12px 1fr; gap: 8px; }
    .pra-action-item { flex-direction: column; align-items: flex-start; }
    .pra-audit-row { grid-template-columns: 52px 1fr; gap: 8px; }
    .pra-funnel-row { grid-template-columns: 90px 1fr 32px; gap: 8px; }
    .pra-outcome-actions { width: 100%; }
    .pra-outcome-actions .pra-btn { flex: 1; }
    .pra-detail-actions { flex-wrap: wrap; }
    .pra-detail-actions .pra-btn { flex: 1; min-width: 120px; }

    .pra-modal { width: calc(100vw - 24px); padding: 20px 16px; margin: 12px; }
    .pra-modal-actions { flex-direction: column; }
    .pra-modal-actions .pra-btn { width: 100%; }

    .pra-agent-detail { grid-template-columns: 1fr; }
    .pra-agent-detail .pra-card div[style*="grid-template-columns"] {
      grid-template-columns: 1fr !important;
    }
    .pra-kv-row { grid-template-columns: 1fr; gap: 4px; }
    .pra-example-grid { grid-template-columns: 1fr; }
    .pra-activity-row {
      grid-template-columns: 1fr;
      gap: 8px;
      align-items: flex-start;
    }
  }

  @media (max-width: 480px) {
    .pra-kpi-grid { grid-template-columns: 1fr 1fr; }
    .pra-stats > div:nth-child(3),
    .pra-stats > div:nth-child(4) { display: none; }
  }

  .pra-id-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px 16px;
    margin-top: 14px;
    padding: 12px 14px;
    background: #FAFBFC;
    border: 1px solid #E4E6EB;
    border-radius: 8px;
  }
  .pra-id-item { min-width: 0; }
  .pra-id-k {
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #8A8F98;
    margin-bottom: 2px;
  }
  .pra-id-v {
    font-size: 12px;
    color: #1A1D24;
    word-break: break-all;
  }
  .pra-section-title {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #8A8F98;
    margin: 22px 0 10px;
  }
  .pra-detail-section {
    margin-top: 20px;
    padding-top: 18px;
    border-top: 1px solid #E4E6EB;
  }
  .pra-detail-section .pra-section-title {
    margin-top: 0;
  }
  .pra-detail-section-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
    text-align: left;
    font-family: inherit;
  }
  .pra-detail-section-head .pra-section-title {
    margin: 0;
  }
  .pra-detail-section-chevron {
    color: #8A8F98;
    font-size: 12px;
    flex-shrink: 0;
  }
  .pra-detail-section-body {
    margin-top: 12px;
  }
  .pra-timeline { display: flex; flex-direction: column; gap: 0; }
  .pra-tl-item {
    display: grid;
    grid-template-columns: 72px 14px 1fr;
    gap: 10px;
    position: relative;
  }
  .pra-tl-time {
    font-size: 11px;
    color: #8A8F98;
    text-align: right;
    padding-top: 2px;
    font-variant-numeric: tabular-nums;
  }
  .pra-tl-rail {
    position: relative;
    display: flex;
    justify-content: center;
  }
  .pra-tl-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: #3B5BDB;
    margin-top: 4px;
    z-index: 1;
    flex-shrink: 0;
  }
  .pra-tl-dot-warn { background: #B5790C; }
  .pra-tl-dot-bad { background: #C4392B; }
  .pra-tl-dot-ok { background: #1E8A4C; }
  .pra-tl-rail::after {
    content: '';
    position: absolute;
    top: 12px; bottom: -4px;
    width: 1px; background: #E4E6EB;
  }
  .pra-tl-item:last-child .pra-tl-rail::after { display: none; }
  .pra-tl-body { padding-bottom: 14px; min-width: 0; }
  .pra-tl-title { font-size: 13px; font-weight: 600; }
  .pra-tl-desc { font-size: 12px; color: #5C6370; margin-top: 2px; line-height: 1.45; }
  .pra-action-list { display: flex; flex-direction: column; gap: 8px; }
  .pra-action-item {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 14px;
    background: #FFFFFF;
    border: 1px solid #E4E6EB;
    border-radius: 8px;
  }
  .pra-action-item-active {
    border-color: #3B5BDB;
    background: #F7F9FF;
  }
  .pra-action-name { font-size: 13px; font-weight: 600; }
  .pra-action-desc { font-size: 12px; color: #8A8F98; margin-top: 3px; line-height: 1.4; }
  .pra-action-tag {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 3px 7px;
    border-radius: 4px;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .pra-action-tag-rec { background: #E6F7ED; color: #1E8A4C; }
  .pra-action-tag-alt { background: #EEF0F3; color: #6B7280; }
  .pra-action-tag-risk { background: #FCEDEC; color: #C4392B; }
  .pra-audit { display: flex; flex-direction: column; gap: 0; }
  .pra-audit-row {
    display: grid;
    grid-template-columns: 64px 1fr;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid #F0F1F3;
  }
  .pra-audit-row:last-child { border-bottom: none; }
  .pra-audit-ts { font-size: 11px; color: #8A8F98; padding-top: 2px; }
  .pra-audit-who { font-size: 12px; font-weight: 600; }
  .pra-audit-what { font-size: 12px; color: #5C6370; margin-top: 2px; line-height: 1.4; }
  .pra-msg-preview {
    background: #FAFBFC;
    border: 1px solid #E4E6EB;
    border-radius: 8px;
    padding: 14px;
    font-size: 13px;
    line-height: 1.55;
    color: #2A2E36;
  }
  .pra-msg-channel {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #8A8F98;
    margin-bottom: 8px;
  }
  .pra-tag-row { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
  .pra-mini-tag {
    font-size: 11px;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 4px;
    background: #F0F1F3;
    color: #5C6370;
  }
  .pra-mini-tag-blue { background: #E8F1FC; color: #2B6CB0; }
  .pra-mini-tag-amber { background: #FFF4E0; color: #B5790C; }
  .pra-mini-tag-purple { background: #F3EDFC; color: #7C4FD8; }
  .pra-agent-detail {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-bottom: 14px;
  }
  .pra-agent-detail .pra-card { margin: 0; }
  .pra-kv { display: flex; flex-direction: column; gap: 10px; }
  .pra-kv-row {
    display: grid;
    grid-template-columns: 110px 1fr;
    gap: 10px;
    font-size: 13px;
  }
  .pra-kv-k { color: #8A8F98; font-weight: 600; font-size: 12px; }
  .pra-kv-v { color: #2A2E36; line-height: 1.45; }
  .pra-rule-list { margin: 0; padding-left: 18px; color: #5C6370; font-size: 13px; line-height: 1.55; }
  .pra-rule-list li { margin-bottom: 6px; }
  .pra-example-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
  }
  .pra-example {
    background: #FAFBFC;
    border: 1px solid #E4E6EB;
    border-radius: 8px;
    padding: 12px;
  }
  .pra-example-code {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.03em;
    color: #8A8F98;
    margin-bottom: 6px;
  }
  .pra-example-out { font-size: 13px; font-weight: 600; color: #1A1D24; margin-bottom: 4px; }
  .pra-example-note { font-size: 12px; color: #5C6370; line-height: 1.4; }
  @media (max-width: 960px) {
    .pra-agent-detail, .pra-example-grid { grid-template-columns: 1fr; }
  }

  /* Live agent workflow */
  .pra-live {
    flex: 1;
    overflow-y: auto;
    min-height: 0;
    padding: 28px 32px 48px;
  }
  .pra-live-inner { max-width: 720px; margin: 0 auto; }
  .pra-live-hero {
    margin-bottom: 22px;
  }
  .pra-live-hero h1 {
    font-size: 26px;
    font-weight: 700;
    letter-spacing: -0.03em;
    margin: 0 0 6px;
  }
  .pra-live-hero p {
    margin: 0;
    font-size: 14px;
    color: #8A8F98;
    line-height: 1.5;
    max-width: 560px;
  }
  .pra-live-case {
    background: #FFFFFF;
    border: 1px solid #E4E6EB;
    border-radius: 12px;
    padding: 16px 18px;
    margin-bottom: 18px;
    display: flex;
    justify-content: space-between;
    gap: 16px;
    align-items: flex-start;
    flex-wrap: wrap;
  }
  .pra-live-case-id { font-size: 15px; font-weight: 700; }
  .pra-live-case-meta { font-size: 12px; color: #8A8F98; margin-top: 4px; line-height: 1.45; }
  .pra-live-flow { display: flex; flex-direction: column; align-items: stretch; }
  .pra-stepper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    background: #FFFFFF;
    border: 1px solid #E4E6EB;
    border-radius: 14px;
    padding: 16px 10px 14px;
    margin-bottom: 16px;
    position: relative;
  }
  .pra-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 8px;
    position: relative;
    border: none;
    background: transparent;
    cursor: pointer;
    font-family: inherit;
    padding: 0 4px;
    min-width: 0;
  }
  .pra-step:disabled { cursor: default; opacity: 1; }
  .pra-step-num {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 2px solid #D8DADF;
    background: #FFFFFF;
    color: #8A8F98;
    font-size: 12px;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    transition: all 0.2s ease;
  }
  .pra-step-label {
    font-size: 12px;
    font-weight: 600;
    color: #8A8F98;
    line-height: 1.25;
  }
  .pra-step-sub {
    font-size: 10px;
    color: #B0B5BD;
    margin-top: -4px;
  }
  .pra-step-done .pra-step-num {
    background: #1E8A4C;
    border-color: #1E8A4C;
    color: #FFFFFF;
  }
  .pra-step-done .pra-step-label { color: #1A1D24; }
  .pra-step-active .pra-step-num {
    background: #3B5BDB;
    border-color: #3B5BDB;
    color: #FFFFFF;
    box-shadow: 0 0 0 4px rgba(59, 91, 219, 0.15);
  }
  .pra-step-active .pra-step-label { color: #3B5BDB; }
  .pra-step-active .pra-step-sub { color: #3B5BDB; }
  .pra-step-line {
    position: absolute;
    top: 29px;
    left: calc(12.5% + 14px);
    right: calc(12.5% + 14px);
    height: 2px;
    background: #E4E6EB;
    z-index: 0;
    pointer-events: none;
  }
  .pra-step-line-fill {
    height: 100%;
    background: #1E8A4C;
    transition: width 0.35s ease;
  }
  .pra-live-node {
    background: #FFFFFF;
    border: 1px solid #E4E6EB;
    border-radius: 14px;
    overflow: hidden;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
  .pra-live-node-active {
    border-color: #3B5BDB;
    box-shadow: 0 0 0 3px rgba(59, 91, 219, 0.12);
  }
  .pra-live-node-done { border-color: #D8DADF; }
  .pra-live-node-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 14px 16px;
    background: #FAFBFC;
    border-bottom: 1px solid #F0F1F3;
  }
  .pra-live-node-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    font-weight: 700;
  }
  .pra-live-node-status {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #8A8F98;
  }
  .pra-live-node-status-active { color: #3B5BDB; }
  .pra-live-node-status-done { color: #1E8A4C; }
  .pra-live-node-body { padding: 16px; }
  .pra-live-thinking {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    color: #5C6370;
    margin-bottom: 12px;
  }
  .pra-check-list { display: flex; flex-direction: column; gap: 8px; }
  .pra-check {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    color: #8A8F98;
    transition: color 0.15s ease;
  }
  .pra-check-done { color: #1A1D24; font-weight: 500; }
  .pra-check-mark {
    width: 18px; height: 18px; border-radius: 50%;
    border: 1.5px solid #D8DADF;
    display: inline-flex; align-items: center; justify-content: center;
    flex-shrink: 0; font-size: 11px; color: transparent;
  }
  .pra-check-done .pra-check-mark {
    background: #E6F7ED;
    border-color: #1E8A4C;
    color: #1E8A4C;
  }
  .pra-live-finding-box {
    margin-top: 14px;
    padding: 12px 14px;
    background: #F7F9FF;
    border: 1px solid #D6E0FF;
    border-radius: 10px;
  }
  .pra-live-finding-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #3B5BDB;
    margin-bottom: 6px;
  }
  .pra-live-finding-main {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.02em;
  }
  .pra-live-conf {
    font-size: 13px;
    color: #5C6370;
    margin-top: 4px;
  }
  .pra-live-action {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: 8px;
  }
  .pra-live-reason {
    font-size: 13px;
    color: #5C6370;
    line-height: 1.5;
  }
  .pra-live-reason strong { color: #1A1D24; }
  .pra-live-decision {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }
  .pra-live-risk {
    font-size: 13px;
    color: #5C6370;
    margin-bottom: 10px;
  }
  .pra-live-evidence {
    margin: 0;
    padding-left: 18px;
    font-size: 13px;
    color: #5C6370;
    line-height: 1.55;
  }
  .pra-live-evidence li { margin-bottom: 4px; }
  .pra-live-arrow {
    text-align: center;
    color: #C0C4CC;
    font-size: 18px;
    padding: 8px 0;
    line-height: 1;
  }
  .pra-live-human {
    border-style: dashed;
  }
  .pra-live-cta-row {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 14px;
  }
  @media (max-width: 900px) {
    .pra-live { padding: 16px 14px 32px; }
    .pra-live-hero h1 { font-size: 22px; }
    .pra-live-cta-row .pra-btn { flex: 1; min-width: 140px; }
    .pra-stepper { padding: 14px 6px 12px; }
    .pra-step-label { font-size: 10px; }
    .pra-step-sub { display: none; }
    .pra-step-num { width: 24px; height: 24px; font-size: 11px; }
    .pra-step-line { top: 25px; left: calc(12.5% + 12px); right: calc(12.5% + 12px); }
  }
`;

const EVIDENCE_CHECKS = {
  TIMEOUT_ERROR: [
    "Payment timeline retrieved",
    "Bank RRN matched",
    "Webhook events checked",
    "Customer complaint correlated",
  ],
  SUCCESS: [
    "Payment timeline retrieved",
    "Gateway SUCCESS confirmed",
    "Webhook delivery checked",
    "Merchant order state compared",
  ],
  DUPLICATE_REF: [
    "Payment timeline retrieved",
    "Sibling payment_id scanned",
    "Card fingerprint matched",
    "Order linkage verified",
  ],
  INSUFFICIENT_FUNDS: [
    "Payment timeline retrieved",
    "Issuer decline code read",
    "Settlement movement checked",
    "Complaint queue scanned",
  ],
  RISK_HOLD: [
    "Payment timeline retrieved",
    "Bank RRN matched",
    "Webhook events checked",
    "Device velocity checked",
  ],
  WEBHOOK_DELAY: [
    "Payment timeline retrieved",
    "Gateway capture confirmed",
    "Webhook queue inspected",
    "Merchant endpoint health checked",
  ],
  USER_CANCELLED: [
    "Payment timeline retrieved",
    "UPI collect status read",
    "Authorization window checked",
    "Debit presence verified",
  ],
  CURRENCY_MISMATCH: [
    "Payment timeline retrieved",
    "Quoted currency read",
    "Settlement FX compared",
    "Ledger delta estimated",
  ],
  PARTIAL_REFUND: [
    "Payment timeline retrieved",
    "Original capture amount read",
    "refund_id totals compared",
    "Customer dispute note parsed",
  ],
};

function evidenceChecksFor(txn) {
  return EVIDENCE_CHECKS[txn.gatewayCode] || [
    "Payment timeline retrieved",
    "Gateway code inspected",
    "Webhook events checked",
    "Merchant note parsed",
  ];
}

function riskScoreFor(result) {
  if (!result) return null;
  const rejected = (result.reviews || []).filter((r) => !r.approved).length;
  const conf = result.investigation?.confidence || 0.7;
  if (result.status === "escalated") return Math.min(0.98, Math.round((0.55 + rejected * 0.12 + (1 - conf) * 0.2) * 100) / 100);
  if (rejected > 0) return Math.min(0.95, Math.round((0.45 + rejected * 0.15) * 100) / 100);
  return Math.max(0.12, Math.round((1 - conf) * 0.5 * 100) / 100);
}

const STATUS_LABEL = {
  pending: "Waiting",
  processing: "Working…",
  resolved: "Needs you",
  escalated: "Needs you",
  done: "Done",
  error: "Failed",
};

const PROBLEM_LABEL = {
  TIMEOUT_ERROR: "Money taken, order failed",
  SUCCESS: "Paid, but order not updated",
  DUPLICATE_REF: "Charged twice",
  INSUFFICIENT_FUNDS: "Bank declined — low balance",
  RISK_HOLD: "Held for safety check",
  WEBHOOK_DELAY: "Payment delayed to store",
  USER_CANCELLED: "Customer cancelled checkout",
  CURRENCY_MISMATCH: "Currency amount mismatch",
  PARTIAL_REFUND: "Refund looks incomplete",
  CAPTURED: "Payment successful",
};

const CHECK_LABELS = {
  "Payment timeline retrieved": "Checked payment history",
  "Bank RRN matched": "Checked bank reference",
  "Webhook events checked": "Checked store notifications",
  "Device velocity checked": "Checked unusual activity",
  "Customer complaint correlated": "Read customer complaint",
  "Gateway SUCCESS confirmed": "Confirmed payment succeeded",
  "Webhook delivery checked": "Checked if store got the update",
  "Merchant order state compared": "Compared with store order",
  "Sibling payment_id scanned": "Looked for a second charge",
  "Card fingerprint matched": "Matched the same card",
  "Order linkage verified": "Linked charges to the same order",
  "Issuer decline code read": "Read bank decline reason",
  "Settlement movement checked": "Checked if money moved",
  "Complaint queue scanned": "Checked for complaints",
  "Gateway capture confirmed": "Confirmed money was captured",
  "Webhook queue inspected": "Checked notification queue",
  "Merchant endpoint health checked": "Checked store connection",
  "UPI collect status read": "Checked UPI approval status",
  "Authorization window checked": "Checked approval window",
  "Debit presence verified": "Checked if bank was charged",
  "Quoted currency read": "Checked quoted currency",
  "Settlement FX compared": "Compared currency conversion",
  "Ledger delta estimated": "Estimated the difference",
  "Original capture amount read": "Checked original amount",
  "refund_id totals compared": "Compared refund amounts",
  "Customer dispute note parsed": "Read customer dispute",
  "Gateway code inspected": "Checked payment status code",
  "Merchant note parsed": "Read the case note",
};

function displayStatusKey(status, humanDecision) {
  if (humanDecision) return "done";
  if (status === "resolved" || status === "escalated") return "escalated";
  return status || "pending";
}

function friendlyStatus(status, humanDecision) {
  if (humanDecision === "overridden") return "Edited";
  return STATUS_LABEL[displayStatusKey(status, humanDecision)] || status || "Waiting";
}

function friendlyProblem(code) {
  return PROBLEM_LABEL[code] || code;
}

function friendlyCheck(label) {
  return CHECK_LABELS[label] || label;
}

function confidenceWords(c) {
  if (c == null) return "";
  if (c >= 0.85) return "High confidence";
  if (c >= 0.7) return "Fairly confident";
  if (c >= 0.6) return "Somewhat sure";
  return "Low confidence";
}

const MERCHANTS = [
  { id: "acc_Hk9mP2Qx", name: "UrbanKart Retail" },
  { id: "acc_Lm4nR8Ty", name: "FreshBasket Groceries" },
  { id: "acc_Zp1vC6Wd", name: "FitFuel Supplements" },
];

const METHODS = ["UPI", "Card", "Netbanking", "Wallet"];

const RAZORPAY_ACTIONS = {
  TIMEOUT_ERROR: [
    { name: "Instant Refund", desc: "Refund full capture via Razorpay Refunds API", tag: "rec", tagLabel: "Recommended" },
    { name: "Replay webhook", desc: "Re-send payment.failed / payment.captured to merchant", tag: "alt", tagLabel: "Alt" },
    { name: "Check bank RRN", desc: "Confirm issuer debit before refunding", tag: "alt", tagLabel: "Alt" },
  ],
  SUCCESS: [
    { name: "Reconcile & mark paid", desc: "Force-sync gateway SUCCESS to merchant order", tag: "rec", tagLabel: "Recommended" },
    { name: "Replay payment.captured", desc: "Re-deliver webhook to merchant endpoint", tag: "alt", tagLabel: "Alt" },
  ],
  DUPLICATE_REF: [
    { name: "Refund duplicate capture", desc: "Refund second payment_id only", tag: "rec", tagLabel: "Recommended" },
    { name: "Link payments to order", desc: "Keep primary pay_*, void duplicate", tag: "alt", tagLabel: "Alt" },
  ],
  INSUFFICIENT_FUNDS: [
    { name: "No action needed", desc: "Hard decline — no settlement movement", tag: "rec", tagLabel: "Recommended" },
    { name: "Suggest retry", desc: "Optional customer nudge for alternate method", tag: "alt", tagLabel: "Alt" },
  ],
  RISK_HOLD: [
    { name: "Route to Risk", desc: "Open Risk review with velocity evidence pack", tag: "risk", tagLabel: "Risk" },
    { name: "Keep hold", desc: "Do not auto-release settlement", tag: "rec", tagLabel: "Recommended" },
    { name: "Auto-release hold", desc: "Unsafe without human review", tag: "risk", tagLabel: "Blocked" },
  ],
  WEBHOOK_DELAY: [
    { name: "Force-sync from Razorpay", desc: "Pull payment entity and update merchant", tag: "rec", tagLabel: "Recommended" },
    { name: "Replay webhook", desc: "Re-POST payment.captured to merchant URL", tag: "alt", tagLabel: "Alt" },
  ],
  USER_CANCELLED: [
    { name: "No action needed", desc: "Checkout abandoned before authorization", tag: "rec", tagLabel: "Recommended" },
  ],
  CURRENCY_MISMATCH: [
    { name: "Escalate to Finance ops", desc: "FX delta needs ledger confirmation", tag: "rec", tagLabel: "Recommended" },
    { name: "Partial adjustment refund", desc: "Refund FX difference after finance OK", tag: "alt", tagLabel: "Alt" },
  ],
  PARTIAL_REFUND: [
    { name: "Escalate to ops", desc: "Reconcile gateway vs merchant refund totals", tag: "rec", tagLabel: "Recommended" },
    { name: "Top-up remaining refund", desc: "Issue remaining balance after ledger match", tag: "alt", tagLabel: "Alt" },
  ],
};

function parseAmount(amount) {
  const n = Number(String(amount).replace(/[₹,\s]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function formatINR(n) {
  return `₹${n.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

function randomSuffix(len = 10) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let s = "";
  for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

function buildEvidence(txn) {
  const base = txn.ts || "14:00:00";
  const [h, m, s] = base.split(":").map(Number);
  const t = (offsetSec) => {
    const total = h * 3600 + m * 60 + s + offsetSec;
    const hh = String(Math.floor(total / 3600) % 24).padStart(2, "0");
    const mm = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
    const ss = String(total % 60).padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
  };
  const common = [
    { time: t(-18), title: "Checkout created", desc: `order_id ${txn.orderId} · method ${txn.method}`, tone: "ok" },
    ...(txn.upiId
      ? [{ time: t(-15), title: "UPI collect sent", desc: `Collect request to ${txn.upiId}`, tone: "ok" }]
      : []),
    { time: t(-12), title: "Payment attempted", desc: `payment_id ${txn.id} created on Razorpay`, tone: "ok" },
  ];
  const byCode = {
    TIMEOUT_ERROR: [
      { time: t(-8), title: "Issuer authorization pending", desc: `RRN ${txn.rrn} — bank ACK delayed`, tone: "warn" },
      { time: t(-3), title: "Gateway TIMEOUT_ERROR", desc: "Razorpay marked payment failed; debit may still settle", tone: "bad" },
      { time: t(0), title: "Customer complaint", desc: "Amount deducted in bank SMS, order shows failed", tone: "warn" },
      { time: t(2), title: "Webhook gap", desc: "No payment.captured delivered to merchant endpoint", tone: "bad" },
    ],
    SUCCESS: [
      { time: t(-6), title: "Gateway SUCCESS", desc: `payment.captured at Razorpay · RRN ${txn.rrn}`, tone: "ok" },
      { time: t(-4), title: "Webhook delivery failed", desc: "Merchant endpoint 504 — payment.captured not received", tone: "bad" },
      { time: t(0), title: "Merchant order unpaid", desc: "Order still awaiting payment despite gateway success", tone: "warn" },
    ],
    DUPLICATE_REF: [
      { time: t(-40), title: "Primary capture", desc: `${txn.id} authorized successfully`, tone: "ok" },
      { time: t(-5), title: "Duplicate attempt", desc: `Second payment ${txn.duplicatePaymentId} same card + order`, tone: "warn" },
      { time: t(0), title: "DUPLICATE_REF flagged", desc: "Two charges within 40s on same order_id", tone: "bad" },
    ],
    INSUFFICIENT_FUNDS: [
      { time: t(-4), title: "Issuer decline", desc: "INSUFFICIENT_FUNDS from issuing bank", tone: "bad" },
      { time: t(0), title: "No settlement movement", desc: "No capture / no customer complaint", tone: "ok" },
    ],
    RISK_HOLD: [
      { time: t(-180), title: "Velocity spike", desc: "5 payment attempts in 3 min from same device", tone: "bad" },
      { time: t(-60), title: "Device fingerprint match", desc: `device ${txn.deviceId} · IP ${txn.ip}`, tone: "warn" },
      { time: t(0), title: "RISK_HOLD applied", desc: "Settlement blocked pending Risk review", tone: "bad" },
    ],
    WEBHOOK_DELAY: [
      { time: t(-660), title: "Gateway SUCCESS", desc: `Captured · RRN ${txn.rrn}`, tone: "ok" },
      { time: t(-600), title: "Webhook queued", desc: "payment.captured enqueued for merchant", tone: "warn" },
      { time: t(0), title: "Webhook still undelivered", desc: "11 min SLA breach — merchant system never notified", tone: "bad" },
    ],
    USER_CANCELLED: [
      { time: t(-20), title: "UPI collect raised", desc: "Awaiting customer approval in UPI app", tone: "ok" },
      { time: t(0), title: "USER_CANCELLED", desc: "Checkout closed before UPI approve", tone: "warn" },
    ],
    CURRENCY_MISMATCH: [
      { time: t(-10), title: "Order quoted INR", desc: "Catalog amount locked at checkout", tone: "ok" },
      { time: t(0), title: "Settlement FX mismatch", desc: "Gateway converted with stale FX rate", tone: "bad" },
    ],
    PARTIAL_REFUND: [
      { time: t(-86400), title: "Original capture", desc: `Full amount ${txn.amount}`, tone: "ok" },
      { time: t(-3600), title: "Partial refund posted", desc: `refund_id ${txn.refundId} — less than capture`, tone: "warn" },
      { time: t(0), title: "Customer dispute", desc: "Claims full amount never returned", tone: "bad" },
    ],
    CAPTURED: [
      { time: t(-6), title: "Issuer authorized", desc: `RRN ${txn.rrn}`, tone: "ok" },
      { time: t(-2), title: "Payment captured", desc: "Razorpay marked payment.captured", tone: "ok" },
      { time: t(0), title: "Merchant notified", desc: "Order marked paid · webhook delivered", tone: "ok" },
    ],
  };
  return [...common, ...(byCode[txn.gatewayCode] || [{ time: t(0), title: txn.gatewayCode, desc: txn.note, tone: "warn" }])];
}

function buildAuditFromResult(result) {
  if (!result) return [];
  const entries = [];
  if (result.investigation) {
    entries.push({
      ts: "T+0s",
      who: "Investigator",
      what: `Classified as ${result.investigation.classification} (confidence ${result.investigation.confidence})`,
    });
  }
  (result.proposalHistory || []).forEach((p, i) => {
    entries.push({
      ts: `T+${(i + 1) * 12}s`,
      who: i === 0 ? "Resolver" : `Resolver · revision ${i + 1}`,
      what: `Proposed “${p.action}” — ${p.rationale}`,
    });
    const review = result.reviews?.[i];
    if (review) {
      entries.push({
        ts: `T+${(i + 1) * 12 + 6}s`,
        who: "Risk Reviewer",
        what: `${review.approved ? "Approved" : "Rejected"} — ${review.reviewNote}`,
      });
    }
  });
  if (result.finalStatus === "escalated" || result.status === "escalated") {
    entries.push({
      ts: "T+final",
      who: "Pipeline",
      what: result.escalateReason || "Escalated to human ops",
    });
  }
  if (result.humanDecision) {
    entries.push({
      ts: "Human",
      who: "Ops reviewer",
      what: result.humanDecision === "approved" ? "Approved agent proposal" : "Overrode draft customer message",
    });
  }
  return entries;
}

const INITIAL_TRANSACTIONS = [
  {
    id: "pay_9K2xLQ7mR3",
    orderId: "order_N8a2KpLm9Q",
    refundId: "—",
    settlementId: "setl_pending",
    merchantId: "acc_Hk9mP2Qx",
    merchantName: "UrbanKart Retail",
    method: "UPI",
    rrn: "429918773421",
    deviceId: "dv_7aK2",
    ip: "103.48.22.14",
    amount: "₹4,299.00",
    amountValue: 4299,
    gatewayCode: "TIMEOUT_ERROR",
    note: "Customer says amount was deducted from bank but order still shows 'Payment Failed'.",
    ts: "14:02:11",
  },
  {
    id: "pay_7Hj4NpW2vX",
    orderId: "order_M3b9RtYw2P",
    refundId: "—",
    settlementId: "setl_8Kp2Qa",
    merchantId: "acc_Lm4nR8Ty",
    merchantName: "FreshBasket Groceries",
    method: "Card",
    rrn: "551002338871",
    deviceId: "dv_1cXm",
    ip: "49.36.88.201",
    amount: "₹1,150.00",
    amountValue: 1150,
    gatewayCode: "SUCCESS",
    note: "Order shows unpaid even though gateway logged a success response 6 minutes ago.",
    ts: "14:05:44",
  },
  {
    id: "pay_3Rz8QmT9kL",
    orderId: "order_P4c1UsZx7N",
    refundId: "—",
    settlementId: "setl_pending",
    merchantId: "acc_Zp1vC6Wd",
    merchantName: "FitFuel Supplements",
    method: "Card",
    rrn: "662113449902",
    deviceId: "dv_9pQr",
    ip: "122.15.44.90",
    duplicatePaymentId: "pay_3Rz8QmT9kM",
    amount: "₹899.00",
    amountValue: 899,
    gatewayCode: "DUPLICATE_REF",
    note: "Two charges of the same amount within 40 seconds, same card, same order ID.",
    ts: "14:09:02",
  },
  {
    id: "pay_5Wc1YbF6pN",
    orderId: "order_Q5d2VtAy8R",
    refundId: "—",
    settlementId: "—",
    merchantId: "acc_Hk9mP2Qx",
    merchantName: "UrbanKart Retail",
    method: "Netbanking",
    rrn: "—",
    deviceId: "dv_4hJk",
    ip: "27.59.101.33",
    amount: "₹12,000.00",
    amountValue: 12000,
    gatewayCode: "INSUFFICIENT_FUNDS",
    note: "No customer complaint filed. Standard decline code from issuing bank.",
    ts: "14:11:37",
  },
  {
    id: "pay_2Xa9JgH4sQ",
    orderId: "order_R6e3WuBz9S",
    refundId: "—",
    settlementId: "setl_held",
    merchantId: "acc_Lm4nR8Ty",
    merchantName: "FreshBasket Groceries",
    method: "UPI",
    rrn: "773224550013",
    deviceId: "dv_vel5",
    ip: "103.21.244.12",
    amount: "₹560.00",
    amountValue: 560,
    gatewayCode: "RISK_HOLD",
    note: "Flagged by fraud engine for unusual velocity — 5 payment attempts in 3 minutes from same device.",
    ts: "14:14:20",
  },
  {
    id: "pay_8Uy6MdV3rK",
    orderId: "order_S7f4XvCa1T",
    refundId: "—",
    settlementId: "setl_9Lm3Rb",
    merchantId: "acc_Zp1vC6Wd",
    merchantName: "FitFuel Supplements",
    method: "UPI",
    rrn: "884335661124",
    deviceId: "dv_2nOp",
    ip: "152.58.77.19",
    amount: "₹2,340.00",
    amountValue: 2340,
    gatewayCode: "WEBHOOK_DELAY",
    note: "Payment succeeded at gateway 11 minutes ago, merchant's system never received the status webhook.",
    ts: "14:16:58",
  },
  {
    id: "pay_4Bn2FcX7wZ",
    orderId: "order_T8g5YwDb2U",
    refundId: "—",
    settlementId: "—",
    merchantId: "acc_Hk9mP2Qx",
    merchantName: "UrbanKart Retail",
    method: "UPI",
    rrn: "—",
    deviceId: "dv_6sTu",
    ip: "117.98.44.12",
    amount: "₹75.00",
    amountValue: 75,
    gatewayCode: "USER_CANCELLED",
    note: "Customer closed checkout page before completing UPI approval.",
    ts: "14:19:15",
  },
].map((t) => ({ ...t, paymentStatus: t.paymentStatus || "failed", evidence: buildEvidence(t) }));

const SEED_SUCCESS_PAYMENTS = [
  {
    id: "pay_Ok1SuccessA",
    orderId: "order_OkShop1a",
    refundId: "—",
    settlementId: "setl_Ok1a",
    merchantId: "acc_Hk9mP2Qx",
    merchantName: "UrbanKart Retail",
    method: "UPI",
    upiId: "neha@oksbi",
    upiApp: "GPay",
    customerName: "Neha",
    rrn: "991122334455",
    deviceId: "dv_ok1",
    ip: "103.21.44.10",
    amount: "₹899.00",
    amountValue: 899,
    gatewayCode: "CAPTURED",
    paymentStatus: "success",
    note: "Payment captured successfully at gateway. Order marked paid.",
    ts: "13:48:02",
  },
  {
    id: "pay_Ok2SuccessB",
    orderId: "order_OkShop2b",
    refundId: "—",
    settlementId: "setl_Ok2b",
    merchantId: "acc_Lm4nR8Ty",
    merchantName: "FreshBasket Groceries",
    method: "Card",
    cardLast4: "4242",
    customerName: "Amit",
    rrn: "771122334466",
    deviceId: "dv_ok2",
    ip: "49.36.12.88",
    amount: "₹2,150.00",
    amountValue: 2150,
    gatewayCode: "CAPTURED",
    paymentStatus: "success",
    note: "Card payment authorized and captured. No exception.",
    ts: "13:55:41",
  },
].map((t) => ({ ...t, evidence: buildEvidence(t) }));

const ALL_INITIAL_TRANSACTIONS = [...SEED_SUCCESS_PAYMENTS, ...INITIAL_TRANSACTIONS];

/* Seeded agent runs so the dashboard has meaningful data on first load */
const SEED_RESULTS = {
  pay_9K2xLQ7mR3: {
    status: "resolved",
    investigation: {
      findings: [
        "Gateway returned TIMEOUT_ERROR while bank debit may have succeeded",
        "No success webhook received by merchant within SLA",
        "Customer complaint matches classic auth-timeout pattern",
      ],
      classification: "Bank-side timeout",
      confidence: 0.86,
    },
    proposalHistory: [
      { action: "Instant Refund", rationale: "Timeout with likely debit — refund via Razorpay Refunds API.", draftMessage: "We've initiated an Instant Refund for ₹4,299.00 to your original UPI handle." },
    ],
    proposal: { action: "Instant Refund", rationale: "Timeout with likely debit — refund via Razorpay Refunds API.", draftMessage: "We've initiated an Instant Refund for ₹4,299.00 to your original UPI handle." },
    reviews: [{ attempt: 0, approved: true, reviewNote: "Evidence supports timeout failure; Instant Refund is low-risk." }],
    finalProposal: { action: "Instant Refund", rationale: "Timeout with likely debit — refund via Razorpay Refunds API.", draftMessage: "We've initiated an Instant Refund for ₹4,299.00 to your original UPI handle." },
    humanDecision: "approved",
  },
  pay_7Hj4NpW2vX: {
    status: "resolved",
    investigation: {
      findings: [
        "Gateway logged SUCCESS 6 minutes ago",
        "Merchant order state still unpaid — webhook likely dropped",
        "No duplicate charge indicators",
      ],
      classification: "Webhook delivery delay",
      confidence: 0.91,
    },
    proposalHistory: [
      { action: "Reconcile & mark paid", rationale: "Gateway success is authoritative; force-sync merchant order.", draftMessage: "Payment confirmed on Razorpay. Your FreshBasket order is now marked paid." },
    ],
    proposal: { action: "Reconcile & mark paid", rationale: "Gateway success is authoritative; force-sync merchant order.", draftMessage: "Payment confirmed on Razorpay. Your FreshBasket order is now marked paid." },
    reviews: [{ attempt: 0, approved: true, reviewNote: "Clear SUCCESS at gateway; reconciliation is correct." }],
    finalProposal: { action: "Reconcile & mark paid", rationale: "Gateway success is authoritative; force-sync merchant order.", draftMessage: "Payment confirmed on Razorpay. Your FreshBasket order is now marked paid." },
    humanDecision: "approved",
  },
  pay_3Rz8QmT9kL: {
    status: "resolved",
    investigation: {
      findings: [
        "Two identical charges within 40 seconds",
        "Same card fingerprint and order ID",
        "First charge authorized; second likely client retry",
      ],
      classification: "Duplicate charge",
      confidence: 0.88,
    },
    proposalHistory: [
      { action: "Refund duplicate capture", rationale: "Refund the second payment_id only.", draftMessage: "Duplicate charge detected — refunding ₹899.00." },
      { action: "Refund duplicate capture", rationale: "Confirm primary pay_* then refund only duplicate capture.", draftMessage: "We've refunded the duplicate ₹899.00 charge. Original payment stands." },
    ],
    proposal: { action: "Refund duplicate capture", rationale: "Confirm primary pay_* then refund only duplicate capture.", draftMessage: "We've refunded the duplicate ₹899.00 charge. Original payment stands." },
    reviews: [
      { attempt: 0, approved: false, reviewNote: "Verify which payment_id is primary for the order before refunding." },
      { attempt: 1, approved: true, reviewNote: "Revised proposal correctly targets the duplicate payment_id only." },
    ],
    finalProposal: { action: "Refund duplicate capture", rationale: "Confirm primary pay_* then refund only duplicate capture.", draftMessage: "We've refunded the duplicate ₹899.00 charge. Original payment stands." },
    humanDecision: "approved",
  },
  pay_5Wc1YbF6pN: {
    status: "resolved",
    investigation: {
      findings: [
        "Issuer returned INSUFFICIENT_FUNDS",
        "No customer complaint on file",
        "Single attempt, no velocity anomalies",
      ],
      classification: "Hard decline — NSF",
      confidence: 0.94,
    },
    proposalHistory: [
      { action: "No action needed", rationale: "Standard issuer decline; nothing to remediate.", draftMessage: "Payment declined by bank due to insufficient funds." },
    ],
    proposal: { action: "No action needed", rationale: "Standard issuer decline; nothing to remediate.", draftMessage: "Payment declined by bank due to insufficient funds." },
    reviews: [{ attempt: 0, approved: true, reviewNote: "Correct — NSF declines require no refund or escalation." }],
    finalProposal: { action: "No action needed", rationale: "Standard issuer decline; nothing to remediate.", draftMessage: "Payment declined by bank due to insufficient funds." },
    humanDecision: "approved",
  },
  pay_2Xa9JgH4sQ: {
    status: "escalated",
    escalateReason: "Risk Reviewer did not approve after revisions",
    investigation: {
      findings: [
        "Fraud engine flagged velocity: 5 attempts in 3 minutes",
        "Same device fingerprint across attempts",
        "RISK_HOLD still active — funds not settled",
      ],
      classification: "Fraud / velocity hold",
      confidence: 0.79,
    },
    proposalHistory: [
      { action: "Auto-release hold", rationale: "Customer may be retrying legitimately.", draftMessage: "We've released the payment hold." },
      { action: "Route to Risk", rationale: "Velocity pattern warrants Razorpay Risk review before release.", draftMessage: "Payment under fraud review — team will update within 24h." },
      { action: "Keep hold + Risk review", rationale: "Do not auto-release; attach evidence pack for Risk.", draftMessage: "Your payment is under security review." },
    ],
    proposal: { action: "Keep hold + Risk review", rationale: "Do not auto-release; attach evidence pack for Risk.", draftMessage: "Your payment is under security review." },
    reviews: [
      { attempt: 0, approved: false, reviewNote: "Auto-releasing a velocity hold is high fraud risk." },
      { attempt: 1, approved: false, reviewNote: "Escalation is fine but draft message over-promises SLA." },
      { attempt: 2, approved: false, reviewNote: "Still needs named Risk owner before customer message." },
    ],
    finalProposal: { action: "Keep hold + Risk review", rationale: "Do not auto-release; attach evidence pack for Risk.", draftMessage: "Your payment is under security review." },
  },
};

Object.keys(SEED_RESULTS).forEach((id) => {
  SEED_RESULTS[id].audit = buildAuditFromResult(SEED_RESULTS[id]);
});

const GATEWAY_CODES = [
  "TIMEOUT_ERROR", "SUCCESS", "DUPLICATE_REF", "INSUFFICIENT_FUNDS",
  "RISK_HOLD", "WEBHOOK_DELAY", "USER_CANCELLED", "CURRENCY_MISMATCH", "PARTIAL_REFUND",
];

const NOTE_TEMPLATES = {
  TIMEOUT_ERROR: "Customer says amount was deducted from bank but order still shows 'Payment Failed'.",
  SUCCESS: "Order shows unpaid even though gateway logged a success response a few minutes ago.",
  DUPLICATE_REF: "Two charges of the same amount within under a minute, same card, same order ID.",
  INSUFFICIENT_FUNDS: "No customer complaint filed. Standard decline code from issuing bank.",
  RISK_HOLD: "Flagged by fraud engine for unusual velocity — several payment attempts in a short window from the same device.",
  WEBHOOK_DELAY: "Payment succeeded at gateway some minutes ago, merchant's system never received the status webhook.",
  USER_CANCELLED: "Customer closed checkout page before completing UPI approval.",
  CURRENCY_MISMATCH: "Order was placed in one currency but the gateway processed the charge using the wrong conversion.",
  PARTIAL_REFUND: "Refund shows as processed but customer says they never received the full amount back.",
};

const UPI_APPS = ["GPay", "PhonePe", "Paytm", "BHIM"];
const NETBANKING_BANKS = ["HDFC Bank", "ICICI Bank", "SBI", "Axis Bank", "Kotak"];

const UPI_FAIL_OUTCOMES = [
  { gatewayCode: "TIMEOUT_ERROR", weight: 28, payingMsg: "Waiting for bank confirmation…" },
  { gatewayCode: "INSUFFICIENT_FUNDS", weight: 22, payingMsg: "Checking account balance…" },
  { gatewayCode: "USER_CANCELLED", weight: 18, payingMsg: "Waiting for approval in your UPI app…" },
  { gatewayCode: "RISK_HOLD", weight: 14, payingMsg: "Running a quick safety check…" },
  { gatewayCode: "WEBHOOK_DELAY", weight: 10, payingMsg: "Confirming payment with the store…" },
  { gatewayCode: "DUPLICATE_REF", weight: 8, payingMsg: "Matching this with a recent payment…" },
];

function pickGatewayOutcome(method) {
  // ~15% succeed. Rest fail and create an ops case.
  if (Math.random() < 0.15) {
    return {
      ok: true,
      steps: method === "UPI"
        ? ["Creating Razorpay order", "Sending UPI collect", "Bank authorized", "Payment captured"]
        : method === "Card"
          ? ["Creating Razorpay order", "Contacting card network", "Issuer authorized", "Payment captured"]
          : ["Creating Razorpay order", "Redirecting to bank", "Netbanking authorized", "Payment captured"],
    };
  }
  const total = UPI_FAIL_OUTCOMES.reduce((s, o) => s + o.weight, 0);
  let roll = Math.random() * total;
  let picked = UPI_FAIL_OUTCOMES[0];
  for (const o of UPI_FAIL_OUTCOMES) {
    roll -= o.weight;
    if (roll <= 0) {
      picked = o;
      break;
    }
  }
  const failSteps =
    method === "UPI"
      ? ["Creating Razorpay order", "Sending UPI collect", picked.payingMsg, "Gateway returned failure"]
      : method === "Card"
        ? ["Creating Razorpay order", "Tokenizing card", "Waiting for issuer", "Gateway returned failure"]
        : ["Creating Razorpay order", "Opening netbanking session", "Waiting for bank", "Gateway returned failure"];
  return { ok: false, gatewayCode: picked.gatewayCode, steps: failSteps };
}

function isValidUpiId(vpa) {
  return /^[a-zA-Z0-9._-]{2,}@[a-zA-Z]{2,}$/.test((vpa || "").trim());
}

function formatCardInput(value) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}

function cardLast4(value) {
  const digits = (value || "").replace(/\D/g, "");
  return digits.length >= 4 ? digits.slice(-4) : "";
}

function randomTxnId() {
  const chars = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 11; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `pay_${s}`;
}

function nowTs() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

const LOCAL_PLAYBOOK = {
  TIMEOUT_ERROR: {
    investigation: {
      findings: [
        "Gateway returned TIMEOUT_ERROR while bank debit may have succeeded",
        "No success webhook received by merchant within SLA",
        "Customer complaint matches classic auth-timeout pattern",
      ],
      classification: "Bank-side timeout",
      confidence: 0.86,
    },
    proposals: [
      { action: "Instant Refund", rationale: "Timeout with likely debit — refund via Razorpay Refunds API.", draftMessage: "We've initiated an Instant Refund for {amount} to your original payment method." },
    ],
    reviews: [{ approved: true, reviewNote: "Evidence supports timeout failure; refund is appropriate." }],
  },
  SUCCESS: {
    investigation: {
      findings: [
        "Gateway logged SUCCESS",
        "Merchant order state still unpaid — webhook likely dropped or delayed",
        "No duplicate charge indicators on this payment ID",
      ],
      classification: "Webhook delivery delay",
      confidence: 0.91,
    },
    proposals: [
      { action: "Reconcile & mark paid", rationale: "Gateway success is authoritative; sync merchant state.", draftMessage: "Payment confirmed. Your order is now marked as paid." },
    ],
    reviews: [{ approved: true, reviewNote: "Clear SUCCESS at gateway; reconciliation is the correct action." }],
  },
  DUPLICATE_REF: {
    investigation: {
      findings: [
        "Two identical charges within a short window",
        "Same card fingerprint and order ID",
        "First charge authorized; second likely a client retry",
      ],
      classification: "Duplicate charge",
      confidence: 0.88,
    },
    proposals: [
      { action: "Refund duplicate capture", rationale: "Refund the second payment_id only.", draftMessage: "Duplicate charge detected — refunding {amount}." },
      { action: "Refund duplicate capture", rationale: "Confirm primary pay_* then refund only the duplicate capture.", draftMessage: "We've refunded the duplicate charge. Original payment stands." },
    ],
    reviews: [
      { approved: false, reviewNote: "Need to verify which authorization is the primary order payment before refunding." },
      { approved: true, reviewNote: "Revised proposal correctly targets the duplicate auth only." },
    ],
  },
  INSUFFICIENT_FUNDS: {
    investigation: {
      findings: [
        "Issuer returned INSUFFICIENT_FUNDS",
        "No customer complaint on file",
        "Single attempt with no velocity anomalies",
      ],
      classification: "Hard decline — NSF",
      confidence: 0.94,
    },
    proposals: [
      { action: "No action needed", rationale: "Standard issuer decline; nothing to remediate on merchant side.", draftMessage: "Payment was declined by the bank due to insufficient funds." },
    ],
    reviews: [{ approved: true, reviewNote: "Correct — NSF declines require no refund or escalation." }],
  },
  RISK_HOLD: {
    investigation: {
      findings: [
        "Fraud engine flagged unusual payment velocity",
        "Same device fingerprint across rapid attempts",
        "RISK_HOLD still active — funds not settled",
      ],
      classification: "Fraud / velocity hold",
      confidence: 0.79,
    },
    proposals: [
      { action: "Auto-release hold", rationale: "Customer may be retrying a legitimate checkout.", draftMessage: "We've released the payment hold on your order." },
      { action: "Route to Risk", rationale: "Velocity pattern warrants Razorpay Risk review before release.", draftMessage: "Your payment is under security review. Our team will update you shortly." },
      { action: "Keep hold + Risk review", rationale: "Do not auto-release; attach evidence pack for Risk.", draftMessage: "Your payment is under security review." },
    ],
    reviews: [
      { approved: false, reviewNote: "Auto-releasing a velocity hold is high fraud risk." },
      { approved: false, reviewNote: "Escalation is better, but customer message should not promise a fixed SLA." },
      { approved: false, reviewNote: "Still needs named human ownership before any customer message." },
    ],
  },
  WEBHOOK_DELAY: {
    investigation: {
      findings: [
        "Gateway shows success from several minutes ago",
        "Merchant never received the status webhook",
        "No conflicting decline or refund on the same payment",
      ],
      classification: "Webhook delivery delay",
      confidence: 0.9,
    },
    proposals: [
      { action: "Force-sync from Razorpay", rationale: "Pull payment entity and update merchant order status.", draftMessage: "We've confirmed your payment on Razorpay and updated your order status." },
    ],
    reviews: [{ approved: true, reviewNote: "Force-sync from gateway is low risk and corrects the merchant lag." }],
  },
  USER_CANCELLED: {
    investigation: {
      findings: [
        "Checkout abandoned before UPI / OTP approval",
        "No bank debit associated with this attempt",
        "USER_CANCELLED is a clean decline, not a settlement issue",
      ],
      classification: "User-abandoned checkout",
      confidence: 0.96,
    },
    proposals: [
      { action: "No action needed", rationale: "User cancelled before authorization; no funds moved.", draftMessage: "Your checkout was cancelled before payment completed. No amount was charged." },
    ],
    reviews: [{ approved: true, reviewNote: "Correct — cancelled checkouts need no refund." }],
  },
  CURRENCY_MISMATCH: {
    investigation: {
      findings: [
        "Order currency and gateway settlement currency differ",
        "Conversion applied does not match catalog FX at order time",
        "Customer may have been over/under charged relative to quote",
      ],
      classification: "Currency / FX mismatch",
      confidence: 0.72,
    },
    proposals: [
      { action: "Partial adjustment refund", rationale: "Refund the FX delta to match the quoted amount.", draftMessage: "We've adjusted your charge to match the quoted currency amount." },
      { action: "Escalate to Finance ops", rationale: "FX mismatch needs ledger review before any customer-facing refund.", draftMessage: "We're reviewing a currency discrepancy on your payment with our finance team." },
    ],
    reviews: [
      { approved: false, reviewNote: "Partial refund without finance confirmation risks ledger imbalance." },
      { approved: true, reviewNote: "Escalating to finance before refund is the safer path." },
    ],
  },
  PARTIAL_REFUND: {
    investigation: {
      findings: [
        "Refund record exists but amount is less than original capture",
        "Customer claims full amount was never returned",
        "Gateway and merchant refund totals disagree",
      ],
      classification: "Partial refund dispute",
      confidence: 0.68,
    },
    proposals: [
      { action: "Top-up remaining refund", rationale: "Issue the remaining balance to match original capture.", draftMessage: "We've processed the remaining refund balance to your original payment method." },
      { action: "Escalate to ops", rationale: "Confirm gateway vs merchant refund ledger before topping up.", draftMessage: "We're reviewing your refund totals and will confirm the remaining balance shortly." },
    ],
    reviews: [
      { approved: false, reviewNote: "Do not top up until gateway and merchant ledgers are reconciled." },
      { approved: true, reviewNote: "Ops escalation before further refund is correct." },
    ],
  },
};

function playbookFor(txn) {
  return LOCAL_PLAYBOOK[txn.gatewayCode] || {
    investigation: {
      findings: [
        `Gateway code ${txn.gatewayCode} observed`,
        "Limited structured evidence available in the queue note",
        "Classification is provisional pending richer logs",
      ],
      classification: "Needs manual classification",
      confidence: 0.55,
    },
    proposals: [
      { action: "Escalate to ops", rationale: "Insufficient structured evidence for an automated action.", draftMessage: "We're reviewing this payment manually and will update you soon." },
    ],
    reviews: [{ approved: true, reviewNote: "Low-evidence cases should go to humans." }],
  };
}

function fillAmount(text, amount) {
  return (text || "").replaceAll("{amount}", amount);
}

/** Local multi-agent simulation — the browser cannot call Anthropic directly (no API key + CORS). */
async function runPipeline(txn, onStage) {
  const book = playbookFor(txn);
  const checks = evidenceChecksFor(txn).map((label) => ({ label, done: false }));
  let snapshot = {
    status: "processing",
    reviews: [],
    proposalHistory: [],
    livePhase: "investigator",
    liveChecks: checks,
    liveStatus: "Analyzing evidence…",
  };

  const emit = (patch) => {
    snapshot = { ...snapshot, ...patch };
    if (patch.finalStatus) snapshot.status = patch.finalStatus;
    snapshot.audit = buildAuditFromResult(snapshot);
    onStage({ ...patch, audit: snapshot.audit });
  };

  emit({ livePhase: "investigator", liveChecks: checks.map((c) => ({ ...c })), liveStatus: "Analyzing evidence…" });

  for (let i = 0; i < checks.length; i++) {
    await sleep(420);
    checks[i] = { ...checks[i], done: true };
    emit({ liveChecks: checks.map((c) => ({ ...c })), liveStatus: i === checks.length - 1 ? "Synthesizing finding…" : "Analyzing evidence…" });
  }

  await sleep(500);
  const investigation = { ...book.investigation, findings: [...book.investigation.findings] };
  emit({ investigation, livePhase: "investigator_done", liveStatus: "Finding ready" });

  if (investigation.confidence < LOW_CONFIDENCE_THRESHOLD) {
    await sleep(450);
    emit({
      finalStatus: "escalated",
      escalateReason: "Investigator confidence too low to proceed",
      livePhase: "human",
      liveStatus: "Escalated to human",
    });
    return;
  }

  let proposal = null;
  let reviews = [];
  let proposalHistory = [];
  const maxAttempts = Math.min(MAX_REVISIONS, Math.max(book.proposals.length, book.reviews.length) - 1);

  for (let attempt = 0; attempt <= maxAttempts; attempt++) {
    await sleep(350);
    emit({
      livePhase: "resolver",
      liveStatus: attempt === 0 ? "Proposing action…" : `Revising proposal (${attempt + 1})…`,
      attempt,
    });
    await sleep(700);
    const raw = book.proposals[Math.min(attempt, book.proposals.length - 1)];
    proposal = {
      action: raw.action,
      rationale: raw.rationale,
      draftMessage: fillAmount(raw.draftMessage, txn.amount),
    };
    proposalHistory = [...proposalHistory, proposal];
    emit({ proposal, proposalHistory, attempt, livePhase: "resolver_done", liveStatus: "Proposal ready" });

    await sleep(350);
    emit({ livePhase: "reviewer", liveStatus: "Stress-testing proposal…" });
    await sleep(750);
    const reviewSrc = book.reviews[Math.min(attempt, book.reviews.length - 1)];
    const review = { attempt, approved: reviewSrc.approved, reviewNote: reviewSrc.reviewNote };
    reviews = [...reviews, review];
    emit({
      reviews,
      livePhase: "reviewer_done",
      liveStatus: review.approved ? "Approved" : "Rejected — sending back",
    });

    if (review.approved) {
      await sleep(400);
      emit({
        finalStatus: "resolved",
        finalProposal: proposal,
        livePhase: "human",
        liveStatus: "Awaiting human approval",
      });
      return;
    }
  }

  await sleep(400);
  emit({
    finalStatus: "escalated",
    escalateReason: "Risk Reviewer did not approve after revisions",
    finalProposal: proposal,
    livePhase: "human",
    liveStatus: "Escalated to human",
  });
}

const MAX_REVISIONS = 2;
const LOW_CONFIDENCE_THRESHOLD = 0.6;

function computeMetrics(transactions, results) {
  const pending = transactions.filter((t) => !results[t.id] || results[t.id].status === "pending").length;
  const processing = transactions.filter((t) => results[t.id]?.status === "processing").length;
  const resolved = transactions.filter((t) => results[t.id]?.status === "resolved").length;
  const escalated = transactions.filter((t) => results[t.id]?.status === "escalated").length;
  const processed = resolved + escalated;
  const allResults = Object.values(results);
  const finished = allResults.filter((r) => r.status === "resolved" || r.status === "escalated");
  const revisionCount = finished.reduce((sum, r) => sum + Math.max((r.reviews?.length || 1) - 1, 0), 0);
  const avgConfidence = finished.length
    ? finished.reduce((s, r) => s + (r.investigation?.confidence || 0), 0) / finished.length
    : null;
  const firstPassApprovals = finished.filter((r) => r.reviews?.length === 1 && r.reviews[0]?.approved).length;
  const firstPassRate = finished.length ? Math.round((firstPassApprovals / finished.length) * 100) : null;
  const reviewerRejects = finished.reduce((sum, r) => sum + (r.reviews || []).filter((x) => !x.approved).length, 0);
  const reviewerApproves = finished.reduce((sum, r) => sum + (r.reviews || []).filter((x) => x.approved).length, 0);
  const autoResolved = finished.filter((r) => r.status === "resolved" && r.humanDecision === "approved").length;
  const humanNeeded = transactions.filter((t) => {
    const r = results[t.id];
    if (!r || r.humanDecision) return false;
    return r.status === "escalated" || r.status === "resolved";
  }).length;

  const classCounts = {};
  finished.forEach((r) => {
    const c = r.investigation?.classification || "Unknown";
    classCounts[c] = (classCounts[c] || 0) + 1;
  });
  const classifications = Object.entries(classCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const actionCounts = {};
  finished.forEach((r) => {
    const a = r.finalProposal?.action || r.proposal?.action || (r.status === "escalated" ? "Escalated" : "Unknown");
    actionCounts[a] = (actionCounts[a] || 0) + 1;
  });
  const actions = Object.entries(actionCounts).sort((a, b) => b[1] - a[1]).slice(0, 6);

  const activity = transactions
    .filter((t) => results[t.id] && (results[t.id].status === "resolved" || results[t.id].status === "escalated" || results[t.id].status === "processing"))
    .map((t) => ({
      id: t.id,
      amount: t.amount,
      status: results[t.id].status,
      humanDecision: results[t.id].humanDecision,
      action: results[t.id].finalProposal?.action || results[t.id].proposal?.action || "In progress",
      classification: results[t.id].investigation?.classification || "—",
      confidence: results[t.id].investigation?.confidence,
      revisions: Math.max((results[t.id].reviews?.length || 1) - 1, 0),
    }));

  const atRiskTxns = transactions.filter((t) => {
    const r = results[t.id];
    if (!r) return ["TIMEOUT_ERROR", "DUPLICATE_REF", "RISK_HOLD", "WEBHOOK_DELAY", "PARTIAL_REFUND", "CURRENCY_MISMATCH"].includes(t.gatewayCode);
    if (r.status === "escalated" && !r.humanDecision) return true;
    if (r.status === "resolved" && !r.humanDecision) return true;
    if (r.status === "processing" || r.status === "pending") return ["TIMEOUT_ERROR", "DUPLICATE_REF", "RISK_HOLD", "WEBHOOK_DELAY", "PARTIAL_REFUND", "CURRENCY_MISMATCH"].includes(t.gatewayCode);
    return false;
  });
  const atRiskAmount = atRiskTxns.reduce((s, t) => s + (t.amountValue || parseAmount(t.amount)), 0);
  const recoveredAmount = transactions
    .filter((t) => results[t.id]?.status === "resolved" && results[t.id]?.humanDecision === "approved")
    .filter((t) => /refund|reconcile|force-sync|instant/i.test(results[t.id]?.finalProposal?.action || ""))
    .reduce((s, t) => s + (t.amountValue || parseAmount(t.amount)), 0);

  return {
    pending, processing, resolved, escalated, processed, revisionCount,
    avgConfidence, firstPassRate, reviewerRejects, reviewerApproves,
    autoResolved, humanNeeded, classifications, actions, activity,
    queueSize: transactions.length,
    investigated: finished.filter((r) => r.investigation).length + processing,
    resolvedByResolver: finished.filter((r) => r.proposalHistory?.length).length,
    reviewed: finished.filter((r) => (r.reviews?.length || 0) > 0).length,
    atRiskAmount,
    atRiskCount: atRiskTxns.length,
    recoveredAmount,
  };
}

function phaseRank(phase) {
  const order = {
    idle: 0,
    investigator: 1,
    investigator_done: 2,
    resolver: 3,
    resolver_done: 4,
    reviewer: 5,
    reviewer_done: 6,
    human: 7,
  };
  return order[phase] || 0;
}

function deriveLiveStep(result, phase) {
  if (!result) return 1;
  if (result.status === "resolved" || result.status === "escalated" || phase === "human") return 4;
  if (phase === "reviewer" || phase === "reviewer_done") return 3;
  if (phase === "resolver" || phase === "resolver_done" || (result.proposalHistory || []).length) return 2;
  if (phase === "investigator" || phase === "investigator_done" || result.investigation || result.status === "processing") return 1;
  return 1;
}

function AgentLiveWorkflow({ txn, result, onApprove, onOverride, onRun, compact }) {
  const phase = result?.livePhase || (result?.investigation ? (result.status === "processing" ? "resolver" : "human") : result ? "investigator_done" : "idle");
  const checks = result?.liveChecks || evidenceChecksFor(txn).map((label) => ({ label, done: !!result?.investigation }));
  const invActive = phase === "investigator" || (!result?.investigation && result?.status === "processing");
  const invDone = !!result?.investigation;
  const proposals = result?.proposalHistory || [];
  const reviews = result?.reviews || [];
  const finalAction = result?.finalProposal?.action || result?.proposal?.action;
  const showHuman = result && (result.status === "resolved" || result.status === "escalated" || phase === "human");
  const statusKey = result?.status || "pending";
  const liveStep = deriveLiveStep(result, phase);
  const [viewStep, setViewStep] = useState(liveStep);

  useEffect(() => {
    setViewStep(liveStep);
  }, [liveStep, txn.id, result?.status, result?.livePhase, (result?.reviews || []).length, (result?.proposalHistory || []).length]);

  const step1Done = invDone;
  const step2Done = proposals.length > 0 && (reviews.length > 0 || phase === "reviewer" || phase === "reviewer_done" || showHuman);
  const latestProposal = proposals[proposals.length - 1];
  const latestReview = reviews[reviews.length - 1];
  const step3Done = latestReview?.approved || (showHuman && result?.status === "escalated" && reviews.length > 0) || (showHuman && latestReview);
  const step3ReallyDone = showHuman || (latestReview && (latestReview.approved || reviews.length > 1));
  const step4Done = !!result?.humanDecision;

  const steps = [
    {
      n: 1,
      label: "Fact finder",
      sub: invActive ? "Checking…" : step1Done ? "Done" : "Waiting",
      done: step1Done && liveStep > 1,
      active: liveStep === 1 && statusKey === "processing",
      unlocked: true,
    },
    {
      n: 2,
      label: "Action planner",
      sub: liveStep === 2 && statusKey === "processing" ? "Deciding…" : step2Done || proposals.length ? "Done" : "Waiting",
      done: (proposals.length > 0 && liveStep > 2) || (proposals.length > 0 && showHuman),
      active: liveStep === 2 && statusKey === "processing",
      unlocked: step1Done || liveStep >= 2,
    },
    {
      n: 3,
      label: "Safety check",
      sub: liveStep === 3 && statusKey === "processing" ? "Checking…" : latestReview ? (latestReview.approved ? "Safe" : "Sent back") : "Waiting",
      done: showHuman || (latestReview?.approved && liveStep > 3),
      active: liveStep === 3 && statusKey === "processing",
      unlocked: proposals.length > 0 || liveStep >= 3,
    },
    {
      n: 4,
      label: "Your decision",
      sub: step4Done ? (result.humanDecision === "approved" ? "Approved" : "Edited") : showHuman ? "Needs you" : "Waiting",
      done: step4Done,
      active: showHuman && !step4Done,
      unlocked: showHuman || liveStep >= 4,
    },
  ];

  const linePct = step4Done ? 100 : Math.max(0, ((liveStep - 1) / 3) * 100);

  const resolverActive = phase === "resolver";
  const reviewerActive = phase === "reviewer";

  return (
    <div className="pra-live-flow">
      <div className="pra-live-case" style={compact ? { marginBottom: 14 } : undefined}>
        <div>
          <div className="pra-live-case-id">{friendlyProblem(txn.gatewayCode)}</div>
          <div className="pra-live-case-meta">
            {txn.amount} · Paid via {txn.method} · {txn.merchantName}
            <br />
            {txn.note}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <span className={`pra-badge pra-badge-${displayStatusKey(statusKey, result?.humanDecision)}`}>
            {friendlyStatus(statusKey, result?.humanDecision)}
          </span>
          {onRun && statusKey !== "processing" && statusKey !== "resolved" && statusKey !== "escalated" && (
            <button className="pra-btn pra-btn-primary" onClick={onRun}>
              {statusKey === "error" ? "Try again" : "Start AI review"}
            </button>
          )}
        </div>
      </div>

      <div className="pra-stepper" aria-label="AI review steps">
        <div className="pra-step-line"><div className="pra-step-line-fill" style={{ width: `${linePct}%` }} /></div>
        {steps.map((s) => (
            <button
              key={s.n}
              type="button"
              className={`pra-step ${s.done ? "pra-step-done" : ""} ${(s.active || viewStep === s.n) ? "pra-step-active" : ""}`}
              disabled={!s.unlocked}
              onClick={() => s.unlocked && setViewStep(s.n)}
            >
              <span className="pra-step-num">{s.done ? "✓" : s.n}</span>
              <span className="pra-step-label">{s.label}</span>
              <span className="pra-step-sub">{s.sub}</span>
            </button>
          ))}
      </div>

      {viewStep === 1 && (
        <div className={`pra-live-node ${invActive ? "pra-live-node-active" : invDone ? "pra-live-node-done" : ""}`}>
          <div className="pra-live-node-head">
            <div className="pra-live-node-title">
              <span className="pra-dot pra-dot-investigator" style={{ width: 10, height: 10 }} />
              Fact finder
            </div>
            <div className={`pra-live-node-status ${invActive ? "pra-live-node-status-active" : invDone ? "pra-live-node-status-done" : ""}`}>
              {invActive ? "Checking…" : invDone ? "Done" : "Waiting"}
            </div>
          </div>
          <div className="pra-live-node-body">
            {(invActive || invDone) ? (
              <>
                {invActive && (
                  <div className="pra-live-thinking">
                    <div className="pra-spinner" />
                    Looking through payment records…
                  </div>
                )}
                <div className="pra-check-list">
                  {checks.map((c) => (
                    <div key={c.label} className={`pra-check ${c.done ? "pra-check-done" : ""}`}>
                      <span className="pra-check-mark">{c.done ? "✓" : ""}</span>
                      {friendlyCheck(c.label)}
                    </div>
                  ))}
                </div>
                {invDone && result.investigation && (
                  <div className="pra-live-finding-box">
                    <div className="pra-live-finding-label">What we think happened</div>
                    <div className="pra-live-finding-main">{result.investigation.classification}</div>
                    <div className="pra-live-conf">{confidenceWords(result.investigation.confidence)}</div>
                    <div style={{ marginTop: 10 }}>
                      {result.investigation.findings.map((f, i) => (
                        <div key={i} className="pra-finding">{f}</div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="pra-muted" style={{ fontSize: 13 }}>Press “Start AI review” to begin.</div>
            )}
          </div>
        </div>
      )}

      {viewStep === 2 && (
        <div className={`pra-live-node ${resolverActive ? "pra-live-node-active" : proposals.length ? "pra-live-node-done" : ""}`}>
          <div className="pra-live-node-head">
            <div className="pra-live-node-title">
              <span className="pra-dot pra-dot-resolver" style={{ width: 10, height: 10 }} />
              Action planner{proposals.length > 1 ? ` · try ${proposals.length}` : ""}
            </div>
            <div className={`pra-live-node-status ${resolverActive ? "pra-live-node-status-active" : proposals.length ? "pra-live-node-status-done" : ""}`}>
              {resolverActive ? "Deciding…" : proposals.length ? "Suggestion ready" : "Waiting"}
            </div>
          </div>
          <div className="pra-live-node-body">
            {resolverActive && !latestProposal && (
              <div className="pra-live-thinking">
                <div className="pra-spinner" />
                Choosing the best next step…
              </div>
            )}
            {latestProposal ? (
              <>
                <div className="pra-live-finding-label">Suggested next step</div>
                <div className="pra-live-action">{latestProposal.action}</div>
                <div className="pra-live-reason"><strong>Why:</strong> {latestProposal.rationale}</div>
                {proposals.length > 1 && (
                  <div className="pra-muted" style={{ fontSize: 12, marginTop: 10 }}>
                    Updated after safety check asked for a safer option.
                  </div>
                )}
              </>
            ) : !resolverActive && (
              <div className="pra-muted" style={{ fontSize: 13 }}>Waiting for the fact finder to finish.</div>
            )}
          </div>
        </div>
      )}

      {viewStep === 3 && (
        <div className={`pra-live-node ${reviewerActive ? "pra-live-node-active" : latestReview ? "pra-live-node-done" : ""}`}>
          <div className="pra-live-node-head">
            <div className="pra-live-node-title">
              <span className="pra-dot pra-dot-reviewer" style={{ width: 10, height: 10 }} />
              Safety check
            </div>
            <div className={`pra-live-node-status ${reviewerActive ? "pra-live-node-status-active" : latestReview ? "pra-live-node-status-done" : ""}`}>
              {reviewerActive ? "Checking…" : latestReview ? (latestReview.approved ? "Looks safe" : "Not safe yet") : "Waiting"}
            </div>
          </div>
          <div className="pra-live-node-body">
            {reviewerActive && !latestReview && (
              <div className="pra-live-thinking">
                <div className="pra-spinner" />
                Making sure this won’t cause money or fraud issues…
              </div>
            )}
            {latestReview ? (
              <>
                <div className="pra-live-decision">
                  <span className={latestReview.approved ? "pra-approve-tag" : "pra-reject-tag"} style={{ marginBottom: 0 }}>
                    {latestReview.approved ? "OK TO CONTINUE" : "SEND BACK"}
                  </span>
                </div>
                <div className="pra-live-reason" style={{ marginBottom: 10 }}><strong>Why:</strong> {latestReview.reviewNote}</div>
                <div className="pra-live-finding-label">What it checked</div>
                <ul className="pra-live-evidence">
                  {(result.investigation?.findings || []).slice(0, 3).map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                {reviews.length > 1 && (
                  <div className="pra-muted" style={{ fontSize: 12, marginTop: 10 }}>
                    Checked {reviews.length} times after earlier suggestions were sent back.
                  </div>
                )}
              </>
            ) : !reviewerActive && (
              <div className="pra-muted" style={{ fontSize: 13 }}>Waiting for a suggested action.</div>
            )}
          </div>
        </div>
      )}

      {viewStep === 4 && (
        <div className="pra-live-node pra-live-human pra-live-node-done">
          <div className="pra-live-node-head">
            <div className="pra-live-node-title">
              <span style={{ fontSize: 14 }}>👤</span>
              Your decision
            </div>
            <div className={`pra-live-node-status ${result?.humanDecision ? "pra-live-node-status-done" : "pra-live-node-status-active"}`}>
              {result?.humanDecision ? (result.humanDecision === "approved" ? "Approved" : "Changed") : showHuman ? "Waiting for you" : "Waiting"}
            </div>
          </div>
          <div className="pra-live-node-body">
            {showHuman ? (
              <>
                <div className="pra-live-action" style={{ fontSize: 16 }}>
                  {result.status === "escalated"
                    ? (finalAction ? `Please review: ${finalAction}` : "Please review this case")
                    : `Approve “${finalAction || "the suggestion"}”?`}
                </div>
                <div className="pra-msg-channel" style={{ marginTop: 8 }}>Message to customer</div>
                <div className="pra-msg-preview">
                  {result.finalProposal?.draftMessage || result.proposal?.draftMessage || "No draft yet — handle this manually."}
                </div>
                {!result.humanDecision && onApprove && (
                  <div className="pra-live-cta-row">
                    <button className="pra-btn pra-btn-approve" onClick={onApprove}>Looks good</button>
                    {onOverride && <button className="pra-btn pra-btn-override" onClick={onOverride}>Edit message</button>}
                  </div>
                )}
                {result.humanDecision && (
                  <div className="pra-muted" style={{ fontSize: 12, marginTop: 12 }}>
                    {result.humanDecision === "approved" ? "✓ You approved this" : "✎ You edited the message"}
                  </div>
                )}
                {result.escalateReason && (
                  <div className="pra-muted" style={{ fontSize: 12, marginTop: 10 }}>{result.escalateReason}</div>
                )}
              </>
            ) : (
              <div className="pra-muted" style={{ fontSize: 13 }}>You’ll decide here after the safety check finishes.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Dashboard({ metrics, onOpenQueue, onOpenTxn }) {
  const maxClass = Math.max(1, ...metrics.classifications.map(([, n]) => n));
  const maxAction = Math.max(1, ...metrics.actions.map(([, n]) => n));
  const funnelMax = Math.max(1, metrics.queueSize);

  return (
    <div className="pra-dash">
      <div className="pra-dash-inner">
        <div className="pra-dash-hero">
          <div>
            <h1>Payment problems, sorted</h1>
            <p>
              AI reviews each case, suggests a fix, and asks you only when it needs a human decision.
            </p>
          </div>
          <button className="pra-btn pra-btn-primary" onClick={onOpenQueue}>
            Open cases →
          </button>
        </div>

        <div className="pra-kpi-grid">
          <div className="pra-kpi">
            <div className="pra-kpi-label">₹ at risk</div>
            <div className="pra-kpi-value" style={{ color: "#C4392B" }}>{formatINR(metrics.atRiskAmount)}</div>
            <div className="pra-kpi-hint">{metrics.atRiskCount} open exception{metrics.atRiskCount === 1 ? "" : "s"}</div>
          </div>
          <div className="pra-kpi">
            <div className="pra-kpi-label">Auto-resolved</div>
            <div className="pra-kpi-value" style={{ color: "#1E8A4C" }}>{metrics.resolved}</div>
            <div className="pra-kpi-hint">{formatINR(metrics.recoveredAmount)} cleared by agents</div>
          </div>
          <div className="pra-kpi">
            <div className="pra-kpi-label">Needs you</div>
            <div className="pra-kpi-value" style={{ color: "#C4392B" }}>{metrics.humanNeeded}</div>
            <div className="pra-kpi-hint">Waiting for your decision</div>
          </div>
          <div className="pra-kpi">
            <div className="pra-kpi-label">Avg confidence</div>
            <div className="pra-kpi-value">{metrics.avgConfidence != null ? metrics.avgConfidence.toFixed(2) : "—"}</div>
            <div className="pra-kpi-hint">
              {metrics.firstPassRate != null ? `${metrics.firstPassRate}% first-pass approve` : "No finished runs yet"}
            </div>
          </div>
        </div>

        <div className="pra-grid-2">
          <div className="pra-card">
            <div className="pra-card-title">Pipeline funnel</div>
            <div className="pra-card-sub">How many cases reach each agent stage</div>
            <div className="pra-funnel">
              {[
                { label: "In queue", count: metrics.queueSize, color: "#8A8F98" },
                { label: "Investigated", count: metrics.investigated, color: "#3B7DD8" },
                { label: "Resolved by agent", count: metrics.resolvedByResolver, color: "#B5790C" },
                { label: "Risk reviewed", count: metrics.reviewed, color: "#7C4FD8" },
                { label: "Closed", count: metrics.resolved, color: "#1E8A4C" },
                { label: "Needs you", count: metrics.escalated, color: "#C4392B" },
              ].map((row) => (
                <div className="pra-funnel-row" key={row.label}>
                  <div className="pra-funnel-label">{row.label}</div>
                  <div className="pra-funnel-track">
                    <div
                      className="pra-funnel-fill"
                      style={{
                        width: `${Math.max(8, (row.count / funnelMax) * 100)}%`,
                        background: row.color,
                      }}
                    />
                  </div>
                  <div className="pra-funnel-count">{row.count}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="pra-card">
            <div className="pra-card-title">Agent performance</div>
            <div className="pra-card-sub">What each role is doing in the loop</div>
            <div className="pra-agent-grid">
              <div className="pra-agent-metric">
                <div className="pra-agent-metric-dot" style={{ background: "#3B7DD8" }} />
                <div>
                  <div className="pra-agent-metric-name">Investigator</div>
                  <div className="pra-agent-metric-desc">Facts only · confidence gate at {LOW_CONFIDENCE_THRESHOLD}</div>
                  <div className="pra-agent-metric-stats">
                    <span><strong>{metrics.investigated}</strong> runs</span>
                    <span>avg conf <strong>{metrics.avgConfidence != null ? metrics.avgConfidence.toFixed(2) : "—"}</strong></span>
                  </div>
                </div>
              </div>
              <div className="pra-agent-metric">
                <div className="pra-agent-metric-dot" style={{ background: "#B5790C" }} />
                <div>
                  <div className="pra-agent-metric-name">Resolver</div>
                  <div className="pra-agent-metric-desc">Proposes action · revises on rejection</div>
                  <div className="pra-agent-metric-stats">
                    <span><strong>{metrics.resolvedByResolver}</strong> proposals</span>
                    <span><strong>{metrics.revisionCount}</strong> revisions</span>
                  </div>
                </div>
              </div>
              <div className="pra-agent-metric">
                <div className="pra-agent-metric-dot" style={{ background: "#7C4FD8" }} />
                <div>
                  <div className="pra-agent-metric-name">Risk Reviewer</div>
                  <div className="pra-agent-metric-desc">Skeptical gate before human</div>
                  <div className="pra-agent-metric-stats">
                    <span><strong>{metrics.reviewerApproves}</strong> approved</span>
                    <span><strong>{metrics.reviewerRejects}</strong> rejected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pra-grid-3">
          <div className="pra-card">
            <div className="pra-card-title">Root-cause mix</div>
            <div className="pra-card-sub">Investigator classifications</div>
            {metrics.classifications.length === 0 ? (
              <div className="pra-empty-dash">No finished investigations yet</div>
            ) : (
              <div className="pra-bar-list">
                {metrics.classifications.map(([label, count]) => (
                  <div className="pra-bar-row" key={label}>
                    <div className="pra-bar-meta">
                      <span>{label}</span>
                      <span>{count}</span>
                    </div>
                    <div className="pra-bar-track">
                      <div className="pra-bar-fill" style={{ width: `${(count / maxClass) * 100}%`, background: "#3B7DD8" }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pra-card">
            <div className="pra-card-title">Actions proposed</div>
            <div className="pra-card-sub">Final Resolver outcomes</div>
            {metrics.actions.length === 0 ? (
              <div className="pra-empty-dash">No proposals yet</div>
            ) : (
              <div className="pra-bar-list">
                {metrics.actions.map(([label, count]) => (
                  <div className="pra-bar-row" key={label}>
                    <div className="pra-bar-meta">
                      <span>{label}</span>
                      <span>{count}</span>
                    </div>
                    <div className="pra-bar-track">
                      <div className="pra-bar-fill" style={{ width: `${(count / maxAction) * 100}%`, background: "#B5790C" }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pra-card">
            <div className="pra-card-title">Human handoff</div>
            <div className="pra-card-sub">Where agents stop and people start</div>
            <div className="pra-bar-list" style={{ marginTop: 4 }}>
              <div className="pra-kpi" style={{ padding: "14px 0", border: "none" }}>
                <div className="pra-kpi-label">Needs you</div>
                <div className="pra-kpi-value" style={{ fontSize: 24 }}>{metrics.humanNeeded}</div>
              </div>
              <div className="pra-kpi" style={{ padding: "14px 0", border: "none" }}>
                <div className="pra-kpi-label">Fully auto-closed</div>
                <div className="pra-kpi-value" style={{ fontSize: 24, color: "#1E8A4C" }}>{metrics.autoResolved}</div>
              </div>
              <div className="pra-kpi" style={{ padding: "14px 0", border: "none" }}>
                <div className="pra-kpi-label">First-pass rate</div>
                <div className="pra-kpi-value" style={{ fontSize: 24, color: "#7C4FD8" }}>
                  {metrics.firstPassRate != null ? `${metrics.firstPassRate}%` : "—"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pra-card">
          <div className="pra-card-title">Recent agent activity</div>
          <div className="pra-card-sub">Click a row to open it in the resolution workspace</div>
          {metrics.activity.length === 0 ? (
            <div className="pra-empty-dash">Run the pipeline on a transaction to see activity here</div>
          ) : (
            <div className="pra-activity">
              {metrics.activity.map((row) => (
                <div className="pra-activity-row" key={row.id} onClick={() => onOpenTxn(row.id)}>
                  <div>
                    <div className="pra-mono pra-activity-id">{row.id}</div>
                    <div className="pra-activity-action">{row.action}</div>
                    <div className="pra-activity-class">{row.classification}{row.confidence != null ? ` · conf ${row.confidence}` : ""}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{row.amount}</div>
                    <div className="pra-muted" style={{ fontSize: 11, marginTop: 2 }}>
                      {row.revisions > 0 ? `${row.revisions} revision${row.revisions > 1 ? "s" : ""}` : "first pass"}
                    </div>
                  </div>
                  <span className={`pra-badge pra-badge-${displayStatusKey(row.status, row.humanDecision)}`}>
                    {friendlyStatus(row.status, row.humanDecision)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const AGENT_PROFILES = [
  {
    id: "investigator",
    name: "Investigator",
    color: "#3B7DD8",
    dot: "pra-dot-investigator",
    tagClass: "pra-mini-tag-blue",
    role: "Fact finder",
    mandate: "Establish what actually happened to a Razorpay payment using evidence only. Never propose refunds or customer messages.",
    inputs: ["payment_id / order_id", "gateway code", "webhook timeline", "bank RRN", "device / IP velocity", "merchant complaint note"],
    outputs: ["findings[]", "classification label", "confidence 0–1"],
    tools: ["Payments API", "Orders API", "Webhook logs", "Bank RRN lookup", "Risk velocity signals"],
    must: [
      "Cite evidence from the timeline (RRN, webhook, device)",
      "Lower confidence when signals conflict",
      "Route straight to human if confidence < 0.60",
    ],
    mustNot: [
      "Propose Instant Refund or any customer action",
      "Invent missing gateway fields",
      "Approve or reject a resolution",
    ],
    examples: [
      { code: "TIMEOUT_ERROR", out: "Bank-side timeout", note: "Debit possible, no payment.captured" },
      { code: "SUCCESS", out: "Webhook delivery delay", note: "Gateway ok, merchant unpaid" },
      { code: "RISK_HOLD", out: "Fraud / velocity hold", note: "5 attempts / 3 min, same device" },
    ],
  },
  {
    id: "resolver",
    name: "Resolver",
    color: "#B5790C",
    dot: "pra-dot-resolver",
    tagClass: "pra-mini-tag-amber",
    role: "Action proposer",
    mandate: "Given Investigator findings, pick a concrete Razorpay ops action and draft the customer / merchant message.",
    inputs: ["Investigator findings", "classification + confidence", "prior Risk rejection note (on revision)"],
    outputs: ["action label", "rationale", "draft SMS/email message"],
    tools: ["Refunds API catalog", "Webhook replay", "Force-sync payment", "Risk routing", "Finance escalation"],
    must: [
      "Map to a real Razorpay action (Instant Refund, Replay webhook, Route to Risk…)",
      "Revise meaningfully when Risk Reviewer rejects",
      "Keep customer copy plain and non-committal on SLA unless safe",
    ],
    mustNot: [
      "Ignore a Risk rejection and resubmit the same action",
      "Auto-release RISK_HOLD without human path",
      "Refund NSF / USER_CANCELLED cases",
    ],
    examples: [
      { code: "TIMEOUT_ERROR", out: "Instant Refund", note: "Clear likely debit + failed order" },
      { code: "DUPLICATE_REF", out: "Refund duplicate capture", note: "Second payment_id only" },
      { code: "WEBHOOK_DELAY", out: "Force-sync from Razorpay", note: "Pull entity → mark order paid" },
    ],
  },
  {
    id: "reviewer",
    name: "Risk Reviewer",
    color: "#7C4FD8",
    dot: "pra-dot-reviewer",
    tagClass: "pra-mini-tag-purple",
    role: "Skeptical gate",
    mandate: "Stress-test the Resolver proposal for financial, fraud, and evidence mismatch risk before a human or customer sees it.",
    inputs: ["findings + classification", "proposed action", "draft message"],
    outputs: ["approved true/false", "reviewNote"],
    tools: ["Risk policy checks", "Refund exposure rules", "Fraud velocity thresholds", "Ledger consistency checks"],
    must: [
      "Reject only for real risk (not style nits)",
      "Explain the specific objection in one sentence",
      "Allow up to 2 revision loops, then escalate",
    ],
    mustNot: [
      "Approve auto-release on RISK_HOLD",
      "Approve refunds when primary payment_id is ambiguous",
      "Force a bad proposal through after retries",
    ],
    examples: [
      { code: "RISK_HOLD", out: "Reject → escalate", note: "Blocks auto-release after 3 loops" },
      { code: "DUPLICATE_REF", out: "Reject once", note: "Forces primary payment_id check" },
      { code: "INSUFFICIENT_FUNDS", out: "Approve", note: "No action is correct" },
    ],
  },
];

function AgentsView({ metrics }) {
  const live = {
    investigator: {
      runs: metrics.investigated,
      detail: `avg confidence ${metrics.avgConfidence != null ? metrics.avgConfidence.toFixed(2) : "—"}`,
    },
    resolver: {
      runs: metrics.resolvedByResolver,
      detail: `${metrics.revisionCount} revision loop${metrics.revisionCount === 1 ? "" : "s"}`,
    },
    reviewer: {
      runs: metrics.reviewerApproves + metrics.reviewerRejects,
      detail: `${metrics.reviewerApproves} approved · ${metrics.reviewerRejects} rejected`,
    },
  };

  return (
    <div className="pra-dash">
      <div className="pra-dash-inner">
        <div className="pra-dash-hero">
          <div>
            <h1>Agent roster</h1>
            <p>
              Three specialized Razorpay ops agents. Investigator finds facts, Resolver picks an action,
              Risk Reviewer stress-tests it — then a human approves, overrides, or owns the escalation.
            </p>
          </div>
        </div>

        <div className="pra-kpi-grid" style={{ marginBottom: 14 }}>
          <div className="pra-kpi">
            <div className="pra-kpi-label">Investigations</div>
            <div className="pra-kpi-value" style={{ color: "#3B7DD8" }}>{metrics.investigated}</div>
            <div className="pra-kpi-hint">confidence gate at {LOW_CONFIDENCE_THRESHOLD}</div>
          </div>
          <div className="pra-kpi">
            <div className="pra-kpi-label">Proposals</div>
            <div className="pra-kpi-value" style={{ color: "#B5790C" }}>{metrics.resolvedByResolver}</div>
            <div className="pra-kpi-hint">{metrics.revisionCount} revisions fired</div>
          </div>
          <div className="pra-kpi">
            <div className="pra-kpi-label">Risk decisions</div>
            <div className="pra-kpi-value" style={{ color: "#7C4FD8" }}>{metrics.reviewerApproves + metrics.reviewerRejects}</div>
            <div className="pra-kpi-hint">{metrics.firstPassRate != null ? `${metrics.firstPassRate}% first-pass` : "—"}</div>
          </div>
          <div className="pra-kpi">
            <div className="pra-kpi-label">Human handoffs</div>
            <div className="pra-kpi-value">{metrics.humanNeeded}</div>
            <div className="pra-kpi-hint">{metrics.escalated} escalated · {metrics.autoResolved} auto-closed</div>
          </div>
        </div>

        {AGENT_PROFILES.map((agent) => {
          const stats = live[agent.id];
          return (
            <div key={agent.id} style={{ marginBottom: 14 }}>
              <div className="pra-card" style={{ marginBottom: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <span className={`pra-dot ${agent.dot}`} style={{ width: 10, height: 10 }} />
                      <div className="pra-card-title" style={{ margin: 0, fontSize: 16 }}>{agent.name}</div>
                      <span className={`pra-mini-tag ${agent.tagClass}`}>{agent.role}</span>
                    </div>
                    <div style={{ fontSize: 13, color: "#5C6370", lineHeight: 1.5, maxWidth: 720 }}>{agent.mandate}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="pra-kpi-value" style={{ fontSize: 22, color: agent.color }}>{stats.runs}</div>
                    <div className="pra-kpi-hint">{stats.detail}</div>
                  </div>
                </div>
              </div>

              <div className="pra-agent-detail" style={{ marginTop: 0 }}>
                <div className="pra-card" style={{ borderTopLeftRadius: 0 }}>
                  <div className="pra-card-title">Inputs → outputs</div>
                  <div className="pra-kv" style={{ marginTop: 12 }}>
                    <div className="pra-kv-row">
                      <div className="pra-kv-k">Reads</div>
                      <div className="pra-kv-v">
                        <div className="pra-tag-row" style={{ marginTop: 0 }}>
                          {agent.inputs.map((x) => <span key={x} className="pra-mini-tag">{x}</span>)}
                        </div>
                      </div>
                    </div>
                    <div className="pra-kv-row">
                      <div className="pra-kv-k">Writes</div>
                      <div className="pra-kv-v">
                        <div className="pra-tag-row" style={{ marginTop: 0 }}>
                          {agent.outputs.map((x) => <span key={x} className={`pra-mini-tag ${agent.tagClass}`}>{x}</span>)}
                        </div>
                      </div>
                    </div>
                    <div className="pra-kv-row">
                      <div className="pra-kv-k">Tools</div>
                      <div className="pra-kv-v">
                        <div className="pra-tag-row" style={{ marginTop: 0 }}>
                          {agent.tools.map((x) => <span key={x} className="pra-mini-tag">{x}</span>)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pra-card" style={{ borderTopRightRadius: 0 }}>
                  <div className="pra-card-title">Guardrails</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 12 }}>
                    <div>
                      <div className="pra-field-label" style={{ color: "#1E8A4C" }}>Must</div>
                      <ul className="pra-rule-list">
                        {agent.must.map((x) => <li key={x}>{x}</li>)}
                      </ul>
                    </div>
                    <div>
                      <div className="pra-field-label" style={{ color: "#C4392B" }}>Must not</div>
                      <ul className="pra-rule-list">
                        {agent.mustNot.map((x) => <li key={x}>{x}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pra-card" style={{ marginTop: -14, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                <div className="pra-card-title">Example judgments</div>
                <div className="pra-card-sub">How this agent typically behaves on common Razorpay codes</div>
                <div className="pra-example-grid">
                  {agent.examples.map((ex) => (
                    <div className="pra-example" key={ex.code}>
                      <div className="pra-mono pra-example-code">{ex.code}</div>
                      <div className="pra-example-out">{ex.out}</div>
                      <div className="pra-example-note">{ex.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        <div className="pra-grid-2">
          <div className="pra-card">
            <div className="pra-card-title">Pipeline contract</div>
            <div className="pra-card-sub">Strict handoff order — no skipping unless confidence is too low</div>
            <div className="pra-funnel" style={{ maxWidth: 520 }}>
              {[
                { label: "Investigator", note: "facts + confidence score", color: "#3B7DD8" },
                { label: "Resolver", note: "Razorpay action + draft message", color: "#B5790C" },
                { label: "Risk Reviewer", note: "approve or reject with reason", color: "#7C4FD8" },
                { label: "Human ops", note: "approve / override / own escalation", color: "#1A1D24" },
              ].map((step, i, arr) => (
                <div key={step.label}>
                  <div className="pra-agent-metric">
                    <div className="pra-agent-metric-dot" style={{ background: step.color }} />
                    <div>
                      <div className="pra-agent-metric-name">{step.label}</div>
                      <div className="pra-agent-metric-desc" style={{ marginBottom: 0 }}>{step.note}</div>
                    </div>
                  </div>
                  {i < arr.length - 1 && <div className="pra-arrow">↓</div>}
                </div>
              ))}
            </div>
          </div>

          <div className="pra-card">
            <div className="pra-card-title">Operating rules</div>
            <div className="pra-card-sub">Mock policy for this Razorpay demo</div>
            <ul className="pra-rule-list" style={{ marginTop: 8 }}>
              <li>Confidence below <strong>{LOW_CONFIDENCE_THRESHOLD}</strong> skips Resolver and goes straight to Escalations.</li>
              <li>Risk Reviewer may reject up to <strong>2</strong> times; third failure escalates to human.</li>
              <li>RISK_HOLD never auto-releases — always ends in Risk / human ownership.</li>
              <li>Duplicate charges must name the secondary <span className="pra-mono">payment_id</span> before refund.</li>
              <li>Customer messages are drafts only until a human clicks Approve or Override.</li>
              <li>Every stage is written to the case audit trail for merchant ops review.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconDash() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1" />
      <rect x="9" y="1.5" width="5.5" height="5.5" rx="1" />
      <rect x="1.5" y="9" width="5.5" height="5.5" rx="1" />
      <rect x="9" y="9" width="5.5" height="5.5" rx="1" />
    </svg>
  );
}
function IconQueue() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2.5 4h11M2.5 8h11M2.5 12h7" strokeLinecap="round" />
    </svg>
  );
}
function IconAgents() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="5" r="2.25" />
      <path d="M3.5 13c.6-2.2 2.2-3.25 4.5-3.25S11.9 10.8 12.5 13" strokeLinecap="round" />
    </svg>
  );
}

function IconTxns() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2.5" y="2.5" width="11" height="11" rx="1.5" />
      <path d="M5 6h6M5 8.5h6M5 11h3.5" strokeLinecap="round" />
    </svg>
  );
}

const NAV_ITEMS = [
  { id: "dashboard", label: "Home", section: "Main", Icon: IconDash },
  { id: "workspace", label: "Cases", section: "Main", Icon: IconQueue },
  { id: "transactions", label: "All transactions", section: "Main", Icon: IconTxns },
  { id: "agents", label: "How AI works", section: "Learn", Icon: IconAgents },
];

const PAGE_META = {
  dashboard: { title: "Home", sub: "A quick look at payment problems" },
  workspace: { title: "Cases", sub: "Failed payments that need review" },
  transactions: { title: "All transactions", sub: "Every payment from checkout — paid and failed" },
  agents: { title: "How AI works", sub: "The 3 helpers behind each review" },
};

export default function PaymentResolutionAgent() {
  const [view, setView] = useState("workspace");
  const [transactions, setTransactions] = useState(ALL_INITIAL_TRANSACTIONS);
  const [results, setResults] = useState(SEED_RESULTS);
  const [selectedId, setSelectedId] = useState(INITIAL_TRANSACTIONS[0].id);
  const [overrideText, setOverrideText] = useState("");
  const [overriding, setOverriding] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [payStep, setPayStep] = useState("gateway"); // gateway | paying | result
  const [payMethod, setPayMethod] = useState("upi"); // upi | card | netbanking
  const [payForm, setPayForm] = useState({
    amount: "1,299.00",
    name: "Rahul Sharma",
    upiId: "rahul@okhdfcbank",
    upiApp: "GPay",
    cardNumber: "4111 1111 1111 1111",
    expiry: "12/28",
    cvv: "123",
    bank: "HDFC Bank",
  });
  const [payError, setPayError] = useState("");
  const [payProgress, setPayProgress] = useState({ step: 0, steps: [] });
  const [payResult, setPayResult] = useState(null);
  const [checkoutOrderId, setCheckoutOrderId] = useState(() => `order_${randomSuffix(10)}`);
  const [navOpen, setNavOpen] = useState(false);
  const [mobileShowDetail, setMobileShowDetail] = useState(false);
  const [openSections, setOpenSections] = useState({
    payment: false,
    timeline: false,
    log: false,
  });

  function toggleSection(key) {
    setOpenSections((s) => ({ ...s, [key]: !s[key] }));
  }
  const [queueFilter, setQueueFilter] = useState("all"); // all | needsYou

  const selected = transactions.find((t) => t.id === selectedId);
  const selectedResult = results[selectedId];
  const metrics = computeMetrics(transactions, results);

  function needsYou(txn) {
    if (txn.paymentStatus === "success") return false;
    const r = results[txn.id];
    if (!r || r.humanDecision) return false;
    return r.status === "escalated" || r.status === "resolved";
  }

  const caseTxns = transactions.filter((t) => t.paymentStatus !== "success");
  const needsYouTxns = caseTxns.filter(needsYou);
  const listSource = view === "transactions" ? transactions : caseTxns;
  const displayedTxns =
    view === "workspace" && queueFilter === "needsYou" ? needsYouTxns : listSource;

  function recordPayment({
    amount,
    gatewayCode,
    upiId,
    customerName,
    method = "UPI",
    cardLast4: last4,
    bankName,
    upiApp,
    paymentStatus = "failed",
  }) {
    const amountValue = typeof amount === "number" ? amount : parseAmount(amount);
    const displayAmount = `₹${amountValue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    const merchant = MERCHANTS[Math.floor(Math.random() * MERCHANTS.length)];
    const noteBase =
      paymentStatus === "success"
        ? "Payment captured successfully at gateway. Order marked paid."
        : (NOTE_TEMPLATES[gatewayCode] || "No further context provided.");
    const capturedBits = [
      upiId ? `UPI ${upiId}` : null,
      upiApp ? `via ${upiApp}` : null,
      last4 ? `card •••• ${last4}` : null,
      bankName ? `bank ${bankName}` : null,
      customerName ? `customer ${customerName}` : null,
    ].filter(Boolean);
    const note = capturedBits.length
      ? `${noteBase} Captured from gateway checkout (${capturedBits.join(", ")}).`
      : `${noteBase} Captured from gateway checkout.`;
    const txnBase = {
      id: randomTxnId(),
      orderId: `order_${randomSuffix(10)}`,
      refundId: gatewayCode === "PARTIAL_REFUND" ? `rfnd_${randomSuffix(8)}` : "—",
      settlementId: paymentStatus === "success"
        ? `setl_${randomSuffix(6)}`
        : (["INSUFFICIENT_FUNDS", "USER_CANCELLED"].includes(gatewayCode) ? "—" : `setl_${randomSuffix(6)}`),
      merchantId: merchant.id,
      merchantName: merchant.name,
      method,
      upiId: upiId || undefined,
      upiApp: upiApp || undefined,
      customerName: customerName || undefined,
      cardLast4: last4 || undefined,
      bankName: bankName || undefined,
      rrn: paymentStatus === "success" || !["INSUFFICIENT_FUNDS", "USER_CANCELLED"].includes(gatewayCode)
        ? String(Math.floor(100000000000 + Math.random() * 899999999999))
        : "—",
      deviceId: `dv_${randomSuffix(4)}`,
      ip: `${Math.floor(Math.random() * 200) + 1}.${Math.floor(Math.random() * 200)}.${Math.floor(Math.random() * 200)}.${Math.floor(Math.random() * 200)}`,
      amount: displayAmount,
      amountValue,
      gatewayCode,
      paymentStatus,
      note,
      ts: nowTs(),
      duplicatePaymentId: gatewayCode === "DUPLICATE_REF" ? randomTxnId() : undefined,
    };
    const txn = { ...txnBase, evidence: buildEvidence(txnBase) };
    setTransactions((t) => [txn, ...t]);
    setSelectedId(txn.id);
    setView(paymentStatus === "success" ? "transactions" : "workspace");
    setQueueFilter("all");
    setNavOpen(false);
    return txn;
  }

  function openCheckout() {
    setPayStep("gateway");
    setPayMethod("upi");
    setPayError("");
    setPayResult(null);
    setPayProgress({ step: 0, steps: [] });
    setCheckoutOrderId(`order_${randomSuffix(10)}`);
    setShowCheckout(true);
  }

  function closeCheckout() {
    setShowCheckout(false);
    setPayStep("gateway");
    setPayError("");
    setPayResult(null);
  }

  async function startGatewayPayment() {
    const amountValue = parseAmount(payForm.amount);
    if (!amountValue) {
      setPayError("Enter a valid amount.");
      return;
    }
    if (!payForm.name.trim()) {
      setPayError("Enter the customer name on the payment.");
      return;
    }

    if (payMethod === "upi") {
      if (!isValidUpiId(payForm.upiId)) {
        setPayError("Enter a UPI ID like name@okhdfcbank");
        return;
      }
    } else if (payMethod === "card") {
      const digits = payForm.cardNumber.replace(/\D/g, "");
      if (digits.length < 16) {
        setPayError("Enter a 16-digit card number (demo).");
        return;
      }
      if (!/^\d{2}\/\d{2}$/.test(payForm.expiry.trim())) {
        setPayError("Enter expiry as MM/YY");
        return;
      }
      if (!/^\d{3,4}$/.test(payForm.cvv.trim())) {
        setPayError("Enter a valid CVV");
        return;
      }
    } else if (payMethod === "netbanking") {
      if (!payForm.bank) {
        setPayError("Pick a bank");
        return;
      }
    }

    setPayError("");
    const methodLabel = payMethod === "upi" ? "UPI" : payMethod === "card" ? "Card" : "Netbanking";
    const outcome = pickGatewayOutcome(methodLabel);
    setPayProgress({ step: 0, steps: outcome.steps });
    setPayStep("paying");

    for (let i = 0; i < outcome.steps.length; i++) {
      setPayProgress({ step: i, steps: outcome.steps });
      await sleep(i === outcome.steps.length - 1 ? 700 : 850);
    }
    setPayProgress({ step: outcome.steps.length - 1, steps: outcome.steps });

    const payPayload = {
      amount: amountValue,
      upiId: payMethod === "upi" ? payForm.upiId.trim() : undefined,
      upiApp: payMethod === "upi" ? payForm.upiApp : undefined,
      customerName: payForm.name.trim(),
      method: methodLabel,
      cardLast4: payMethod === "card" ? cardLast4(payForm.cardNumber) : undefined,
      bankName: payMethod === "netbanking" ? payForm.bank : undefined,
    };

    if (outcome.ok) {
      const txn = recordPayment({
        ...payPayload,
        gatewayCode: "CAPTURED",
        paymentStatus: "success",
      });
      setPayResult({ ok: true, method: methodLabel, txnId: txn.id });
      setPayStep("result");
      return;
    }

    const txn = recordPayment({
      ...payPayload,
      gatewayCode: outcome.gatewayCode,
      paymentStatus: "failed",
    });
    setPayResult({ ok: false, gatewayCode: outcome.gatewayCode, txnId: txn.id, method: methodLabel });
    setPayStep("result");
  }

  function openPaymentRecord() {
    if (payResult?.txnId) {
      setSelectedId(payResult.txnId);
      setMobileShowDetail(true);
      setView(payResult.ok ? "transactions" : "workspace");
    }
    closeCheckout();
  }

  async function runAgent(txn) {
    setResults((r) => ({ ...r, [txn.id]: { status: "processing", reviews: [] } }));
    try {
      await runPipeline(txn, (patch) => {
        setResults((r) => {
          const current = r[txn.id] || { status: "processing", reviews: [] };
          const merged = { ...current, ...patch };
          if (patch.finalStatus) merged.status = patch.finalStatus;
          else if (current.status !== "escalated" && current.status !== "resolved") merged.status = "processing";
          return { ...r, [txn.id]: merged };
        });
      });
    } catch (e) {
      setResults((r) => ({ ...r, [txn.id]: { status: "error", error: "Pipeline call failed. Try again." } }));
    }
  }

  function approve(id = selectedId) {
    setResults((r) => {
      const next = { ...r[id], humanDecision: "approved" };
      next.audit = buildAuditFromResult(next);
      return { ...r, [id]: next };
    });
  }

  function beginOverride(id = selectedId) {
    const r = results[id];
    setSelectedId(id);
    setOverriding(true);
    setOverrideText(r?.finalProposal?.draftMessage || r?.proposal?.draftMessage || "");
  }

  function submitOverride() {
    setResults((r) => {
      const next = {
        ...r[selectedId],
        humanDecision: "overridden",
        finalProposal: { ...(r[selectedId].finalProposal || r[selectedId].proposal), draftMessage: overrideText },
      };
      next.audit = buildAuditFromResult(next);
      return { ...r, [selectedId]: next };
    });
    setOverriding(false);
  }

  function selectTxn(id) {
    setSelectedId(id);
    setOverriding(false);
    setOverrideText("");
    setMobileShowDetail(true);
  }

  function openTxnFromDash(id) {
    selectTxn(id);
    setView("workspace");
    setNavOpen(false);
  }

  function goToView(nextView) {
    setView(nextView);
    setNavOpen(false);
    setMobileShowDetail(false);
  }

  const status = selectedResult?.status || "pending";
  const page = PAGE_META[view] || PAGE_META.dashboard;
  const navCounts = {
    workspace: caseTxns.length,
    transactions: transactions.length,
  };

  let lastSection = null;
  const workspaceMode = mobileShowDetail ? "pra-mobile-detail" : "pra-mobile-list";

  return (
    <div className="pra-root">
      <style>{STYLE}</style>

      {navOpen && <button type="button" className="pra-sidebar-backdrop" aria-label="Close menu" onClick={() => setNavOpen(false)} />}

      <aside className={`pra-sidebar ${navOpen ? "pra-sidebar-open" : ""}`}>
        <div className="pra-sidebar-brand" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
          <div>
            <div className="pra-sidebar-brand-name">Payment helper</div>
            <div className="pra-sidebar-brand-sub">AI reviews payment problems</div>
          </div>
          <button type="button" className="pra-sidebar-close" aria-label="Close menu" onClick={() => setNavOpen(false)}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" /></svg>
          </button>
        </div>
        <nav className="pra-sidebar-nav">
          {NAV_ITEMS.map((item) => {
            const showSection = item.section !== lastSection;
            lastSection = item.section;
            const count = navCounts[item.id];
            return (
              <div key={item.id}>
                {showSection && <div className="pra-sidebar-section">{item.section}</div>}
                <button
                  className={`pra-side-item ${view === item.id ? "pra-side-item-active" : ""}`}
                  onClick={() => goToView(item.id)}
                >
                  <span className="pra-side-icon"><item.Icon /></span>
                  <span className="pra-side-label">{item.label}</span>
                  {count > 0 && (
                    <span className="pra-side-count">{count}</span>
                  )}
                </button>
              </div>
            );
          })}
        </nav>
        <div className="pra-sidebar-foot">
          AI checks · You decide
        </div>
      </aside>

      <div className="pra-main">
        <header className="pra-header">
          <div className="pra-header-left">
            <button type="button" className="pra-menu-btn" aria-label="Open menu" onClick={() => setNavOpen(true)}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2.5 4h11M2.5 8h11M2.5 12h11" strokeLinecap="round" /></svg>
            </button>
            {(view === "workspace" || view === "transactions") && mobileShowDetail && (
              <button type="button" className="pra-back-btn" aria-label="Back to list" onClick={() => setMobileShowDetail(false)}>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 3.5 4.5 8 10 12.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            )}
            <div style={{ minWidth: 0 }}>
              <div className="pra-header-title">{page.title}</div>
              <div className="pra-header-sub">{page.sub}</div>
            </div>
          </div>
          <div className="pra-stats">
            <div>
              <div className="pra-stat-value" style={{ color: "#C4392B" }}>{formatINR(metrics.atRiskAmount)}</div>
              <div className="pra-stat-label">₹ at risk</div>
            </div>
            <div>
              <div className="pra-stat-value" style={{ color: "#C4392B" }}>{needsYouTxns.length}</div>
              <div className="pra-stat-label">Needs you</div>
            </div>
            <div>
              <div className="pra-stat-value">{caseTxns.length}</div>
              <div className="pra-stat-label">Cases</div>
            </div>
            <div>
              <div className="pra-stat-value">{transactions.length}</div>
              <div className="pra-stat-label">Payments</div>
            </div>
          </div>
        </header>

        {view === "dashboard" && (
          <Dashboard
            metrics={metrics}
            onOpenQueue={() => { setView("workspace"); setMobileShowDetail(false); setNavOpen(false); }}
            onOpenTxn={openTxnFromDash}
          />
        )}

        {view === "agents" && <AgentsView metrics={metrics} />}

        {(view === "workspace" || view === "transactions") && (
        <div className={`pra-body ${workspaceMode}`}>
          <aside className="pra-queue">
            <div className="pra-queue-toolbar">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
                {view === "workspace" ? (
                  <div className="pra-filter-row">
                    <button
                      type="button"
                      className={`pra-filter-btn ${queueFilter === "all" ? "pra-filter-btn-active" : ""}`}
                      onClick={() => setQueueFilter("all")}
                    >
                      All<span className="pra-filter-count">{caseTxns.length}</span>
                    </button>
                    <button
                      type="button"
                      className={`pra-filter-btn ${queueFilter === "needsYou" ? "pra-filter-btn-active" : ""}`}
                      onClick={() => {
                        setQueueFilter("needsYou");
                        if (needsYouTxns.length && !needsYouTxns.find((t) => t.id === selectedId)) {
                          setSelectedId(needsYouTxns[0].id);
                          setOverriding(false);
                          setOverrideText("");
                        }
                      }}
                    >
                      Needs you
                      {needsYouTxns.length > 0 && <span className="pra-filter-count">{needsYouTxns.length}</span>}
                    </button>
                  </div>
                ) : (
                  <div className="pra-muted" style={{ fontSize: 12, padding: "4px 2px" }}>
                    {transactions.length} payment{transactions.length === 1 ? "" : "s"}
                  </div>
                )}
                <button className="pra-btn pra-btn-ghost pra-btn-sm" onClick={openCheckout}>
                  Pay now
                </button>
              </div>
            </div>
            <div className="pra-queue-list">
              {displayedTxns.length === 0 && (
                <div className="pra-muted" style={{ padding: 20, fontSize: 13 }}>
                  {view === "workspace"
                    ? (queueFilter === "needsYou" ? "Nothing needs you right now." : "No failed cases yet.")
                    : "No payments yet. Tap Pay now to try checkout."}
                </div>
              )}
              {displayedTxns.map((t) => {
                const r = results[t.id];
                const rowStatus = r?.status || "pending";
                const isPaid = t.paymentStatus === "success";
                return (
                  <div
                    key={t.id}
                    onClick={() => selectTxn(t.id)}
                    className={`pra-row ${selectedId === t.id ? "pra-row-active" : ""}`}
                  >
                    <div className="pra-row-top">
                      <span className="pra-row-id" style={{ fontWeight: 600, color: "#1A1D24" }}>{friendlyProblem(t.gatewayCode)}</span>
                      {isPaid ? (
                        <span className="pra-badge pra-badge-done">Paid</span>
                      ) : (
                        <span className={`pra-badge pra-badge-${displayStatusKey(rowStatus, r?.humanDecision)}`}>
                          {friendlyStatus(rowStatus, r?.humanDecision)}
                        </span>
                      )}
                    </div>
                    <div className="pra-row-amount">{t.amount}</div>
                    <div className="pra-row-code">{t.merchantName || "Store"} · {t.method}{isPaid ? "" : " · case"}</div>
                  </div>
                );
              })}
            </div>
          </aside>

          <main className="pra-detail">
            {(!selected || !displayedTxns.find((t) => t.id === selectedId)) && (
              <div className="pra-detail-empty">
                {view === "transactions" ? "Pick a payment to see details" : "Pick a failed payment from the list"}
              </div>
            )}

            {selected && displayedTxns.find((t) => t.id === selectedId) && (
            <>
              <div className="pra-detail-header">
                <div className="pra-detail-header-top">
                  <div>
                    <div className="pra-detail-id" style={{ fontFamily: "inherit" }}>{friendlyProblem(selected.gatewayCode)}</div>
                    <div className="pra-detail-meta">
                      {selected.paymentStatus === "success" ? (
                        <span className="pra-badge pra-badge-done">Paid</span>
                      ) : (
                        <span className={`pra-badge pra-badge-${displayStatusKey(status, selectedResult?.humanDecision)}`}>
                          {friendlyStatus(status, selectedResult?.humanDecision)}
                        </span>
                      )}
                      <span className="pra-chip">{selected.method}</span>
                      <span className="pra-muted" style={{ fontSize: 12 }}>{selected.merchantName}</span>
                    </div>
                  </div>
                  <div className="pra-detail-amount">{selected.amount}</div>
                </div>
                <p className="pra-detail-note">{selected.note}</p>
                {selected.paymentStatus !== "success" && selectedResult?.status === "processing" && (
                  <div className="pra-waiting" style={{ marginTop: 12, padding: "10px 12px" }}>
                    <div className="pra-spinner" />
                    AI is reviewing this case — scroll down to watch each step
                  </div>
                )}
              </div>

              <div className="pra-detail-body">
                <div className="pra-detail-inner" style={{ maxWidth: 720 }}>
                  {selected.paymentStatus === "success" ? (
                    <div className="pra-muted" style={{ fontSize: 13, marginBottom: 8, lineHeight: 1.45 }}>
                      This payment succeeded — it stays in All transactions only. No AI case was opened.
                    </div>
                  ) : (
                    <>
                      <div className="pra-section-title" style={{ marginTop: 0 }}>AI review</div>
                      <p className="pra-muted" style={{ fontSize: 13, marginBottom: 14, lineHeight: 1.45 }}>
                        Follow the 4 steps below. The blue step is happening now.
                      </p>

                      {selectedResult?.status === "error" && (
                        <div style={{ color: "#C4392B", fontSize: 13, marginBottom: 12 }}>
                          Something went wrong. Tap “Try again” to retry.
                        </div>
                      )}

                      <AgentLiveWorkflow
                        txn={selected}
                        result={selectedResult}
                        compact
                        onRun={selectedResult?.status === "processing" ? undefined : () => runAgent(selected)}
                        onApprove={selectedResult && !selectedResult.humanDecision && (selectedResult.status === "resolved" || selectedResult.status === "escalated") ? () => approve() : undefined}
                        onOverride={selectedResult && !selectedResult.humanDecision && (selectedResult.status === "resolved" || selectedResult.status === "escalated") ? () => beginOverride() : undefined}
                      />
                    </>
                  )}

                  <div className="pra-detail-section">
                    <button type="button" className="pra-detail-section-head" onClick={() => toggleSection("payment")}>
                      <div className="pra-section-title">Payment reference</div>
                      <span className="pra-detail-section-chevron">{openSections.payment ? "▾" : "▸"}</span>
                    </button>
                    {openSections.payment && (
                      <div className="pra-detail-section-body">
                        <div className="pra-id-grid" style={{ marginTop: 0 }}>
                          <div className="pra-id-item"><div className="pra-id-k">Payment</div><div className="pra-mono pra-id-v">{selected.id}</div></div>
                          <div className="pra-id-item"><div className="pra-id-k">Order</div><div className="pra-mono pra-id-v">{selected.orderId}</div></div>
                          <div className="pra-id-item"><div className="pra-id-k">Store account</div><div className="pra-mono pra-id-v">{selected.merchantId}</div></div>
                          <div className="pra-id-item"><div className="pra-id-k">Bank reference</div><div className="pra-mono pra-id-v">{selected.rrn}</div></div>
                          {selected.upiId && (
                            <div className="pra-id-item"><div className="pra-id-k">UPI ID</div><div className="pra-mono pra-id-v">{selected.upiId}</div></div>
                          )}
                          {selected.upiApp && (
                            <div className="pra-id-item"><div className="pra-id-k">UPI app</div><div className="pra-id-v">{selected.upiApp}</div></div>
                          )}
                          {selected.cardLast4 && (
                            <div className="pra-id-item"><div className="pra-id-k">Card</div><div className="pra-mono pra-id-v">•••• {selected.cardLast4}</div></div>
                          )}
                          {selected.bankName && (
                            <div className="pra-id-item"><div className="pra-id-k">Bank</div><div className="pra-id-v">{selected.bankName}</div></div>
                          )}
                          {selected.customerName && (
                            <div className="pra-id-item"><div className="pra-id-k">Customer</div><div className="pra-id-v">{selected.customerName}</div></div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pra-detail-section">
                    <button type="button" className="pra-detail-section-head" onClick={() => toggleSection("timeline")}>
                      <div className="pra-section-title">What happened</div>
                      <span className="pra-detail-section-chevron">{openSections.timeline ? "▾" : "▸"}</span>
                    </button>
                    {openSections.timeline && (
                      <div className="pra-detail-section-body">
                        <div className="pra-card" style={{ padding: "16px 16px 4px" }}>
                          <div className="pra-timeline">
                            {(selected.evidence || []).map((ev, i) => (
                              <div className="pra-tl-item" key={i}>
                                <div className="pra-mono pra-tl-time">{ev.time}</div>
                                <div className="pra-tl-rail">
                                  <div className={`pra-tl-dot ${ev.tone === "ok" ? "pra-tl-dot-ok" : ev.tone === "bad" ? "pra-tl-dot-bad" : "pra-tl-dot-warn"}`} />
                                </div>
                                <div className="pra-tl-body">
                                  <div className="pra-tl-title">{ev.title}</div>
                                  <div className="pra-tl-desc">{ev.desc}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {selectedResult && (selectedResult.audit?.length > 0 || selectedResult.investigation) && (
                    <div className="pra-detail-section">
                      <button type="button" className="pra-detail-section-head" onClick={() => toggleSection("log")}>
                        <div className="pra-section-title">Step-by-step log</div>
                        <span className="pra-detail-section-chevron">{openSections.log ? "▾" : "▸"}</span>
                      </button>
                      {openSections.log && (
                        <div className="pra-detail-section-body">
                          <div className="pra-card">
                            <div className="pra-audit">
                              {(selectedResult.audit || buildAuditFromResult(selectedResult)).map((entry, i) => (
                                <div className="pra-audit-row" key={i}>
                                  <div className="pra-mono pra-audit-ts">{entry.ts}</div>
                                  <div>
                                    <div className="pra-audit-who">{entry.who}</div>
                                    <div className="pra-audit-what">{entry.what}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
            )}
          </main>
        </div>
        )}

        {overriding && (
          <div className="pra-overlay" onClick={() => setOverriding(false)}>
            <div className="pra-modal" onClick={(e) => e.stopPropagation()}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Edit the customer message</div>
              <textarea
                className="pra-textarea"
                rows={4}
                value={overrideText}
                onChange={(e) => setOverrideText(e.target.value)}
                autoFocus
              />
              <div className="pra-modal-actions" style={{ marginTop: 14 }}>
                <button className="pra-btn pra-btn-primary" style={{ flex: 1 }} onClick={submitOverride}>Submit override</button>
                <button className="pra-btn pra-btn-ghost" onClick={() => setOverriding(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {showCheckout && (
          <div className="pra-overlay" onClick={() => { if (payStep !== "paying") closeCheckout(); }}>
            <div className="pra-pg" onClick={(e) => e.stopPropagation()}>
              <div className="pra-pg-top">
                <div className="pra-pg-top-row">
                  <div>
                    <div className="pra-pg-merchant">UrbanKart Retail</div>
                    <div className="pra-pg-order">{checkoutOrderId}</div>
                  </div>
                  <div className="pra-pg-badge">Razorpay · demo</div>
                </div>
                <div className="pra-pg-amount">
                  ₹{parseAmount(payForm.amount)
                    ? parseAmount(payForm.amount).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    : payForm.amount}
                </div>
                <div className="pra-pg-amount-sub">Live checkout simulation · no real money moved</div>
              </div>

              <div className="pra-pg-body">
                {payStep === "gateway" && (
                  <>
                    <div className="pra-pg-tabs">
                      {[
                        { id: "upi", label: "UPI" },
                        { id: "card", label: "Card" },
                        { id: "netbanking", label: "Netbanking" },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          type="button"
                          className={`pra-pg-tab ${payMethod === tab.id ? "pra-pg-tab-active" : ""}`}
                          onClick={() => { setPayMethod(tab.id); setPayError(""); }}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    <span className="pra-field-label">Amount (₹)</span>
                    <input
                      className="pra-input"
                      value={payForm.amount}
                      onChange={(e) => setPayForm((f) => ({ ...f, amount: e.target.value }))}
                      style={{ marginBottom: 12 }}
                    />

                    <span className="pra-field-label">Customer name</span>
                    <input
                      className="pra-input"
                      value={payForm.name}
                      onChange={(e) => setPayForm((f) => ({ ...f, name: e.target.value }))}
                      style={{ marginBottom: 12 }}
                    />

                    {payMethod === "upi" && (
                      <>
                        <span className="pra-field-label">Pay using</span>
                        <div className="pra-pg-apps">
                          {UPI_APPS.map((app) => (
                            <button
                              key={app}
                              type="button"
                              className={`pra-pg-app ${payForm.upiApp === app ? "pra-pg-app-active" : ""}`}
                              onClick={() => setPayForm((f) => ({ ...f, upiApp: app }))}
                            >
                              {app}
                            </button>
                          ))}
                        </div>
                        <span className="pra-field-label">UPI ID / VPA</span>
                        <input
                          className="pra-input"
                          placeholder="name@okhdfcbank"
                          value={payForm.upiId}
                          onChange={(e) => setPayForm((f) => ({ ...f, upiId: e.target.value }))}
                          style={{ marginBottom: 4 }}
                        />
                      </>
                    )}

                    {payMethod === "card" && (
                      <>
                        <span className="pra-field-label">Card number</span>
                        <input
                          className="pra-input"
                          inputMode="numeric"
                          placeholder="4111 1111 1111 1111"
                          value={payForm.cardNumber}
                          onChange={(e) => setPayForm((f) => ({ ...f, cardNumber: formatCardInput(e.target.value) }))}
                          style={{ marginBottom: 12 }}
                        />
                        <div className="pra-pg-row2">
                          <div>
                            <span className="pra-field-label">Expiry</span>
                            <input
                              className="pra-input"
                              placeholder="MM/YY"
                              value={payForm.expiry}
                              onChange={(e) => setPayForm((f) => ({ ...f, expiry: e.target.value }))}
                            />
                          </div>
                          <div>
                            <span className="pra-field-label">CVV</span>
                            <input
                              className="pra-input"
                              inputMode="numeric"
                              placeholder="123"
                              value={payForm.cvv}
                              onChange={(e) => setPayForm((f) => ({ ...f, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {payMethod === "netbanking" && (
                      <>
                        <span className="pra-field-label">Select bank</span>
                        <select
                          className="pra-input"
                          value={payForm.bank}
                          onChange={(e) => setPayForm((f) => ({ ...f, bank: e.target.value }))}
                          style={{ marginBottom: 4 }}
                        >
                          {NETBANKING_BANKS.map((b) => <option key={b} value={b}>{b}</option>)}
                        </select>
                      </>
                    )}

                    <div className="pra-upi-hint">
                      Gateway runs live stages (order → authorize → capture). Failures become Cases with the details you entered.
                    </div>

                    <div className="pra-modal-actions" style={{ marginTop: 16 }}>
                      <button className="pra-btn pra-btn-primary" style={{ flex: 1 }} onClick={startGatewayPayment}>
                        Pay ₹{payForm.amount}
                      </button>
                      <button className="pra-btn pra-btn-ghost" onClick={closeCheckout}>Cancel</button>
                    </div>
                    {payError && (
                      <div style={{ color: "#C4392B", fontSize: 12, marginTop: 12 }}>{payError}</div>
                    )}
                    <div className="pra-pg-secure">🔒 Secured checkout · simulated issuer response</div>
                  </>
                )}

                {payStep === "paying" && (
                  <div className="pra-upi-status">
                    <div className="pra-upi-status-icon pra-upi-status-icon-wait">
                      <div className="pra-spinner" style={{ margin: 0 }} />
                    </div>
                    <div className="pra-upi-status-title">Processing payment</div>
                    <div className="pra-upi-status-sub">Talking to the payment gateway…</div>
                    <div className="pra-pg-steps">
                      {payProgress.steps.map((label, i) => {
                        const done = i < payProgress.step;
                        const on = i === payProgress.step;
                        return (
                          <div key={label} className={`pra-pg-step ${done ? "pra-pg-step-done" : ""} ${on ? "pra-pg-step-on" : ""}`}>
                            <span className={`pra-pg-dot ${done ? "pra-pg-dot-done" : ""} ${on ? "pra-pg-dot-on" : ""}`} />
                            {label}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {payStep === "result" && payResult?.ok && (
                  <div className="pra-upi-status">
                    <div className="pra-upi-status-icon pra-upi-status-icon-ok">✓</div>
                    <div className="pra-upi-status-title">Payment successful</div>
                    <div className="pra-upi-status-sub">
                      Captured via {payResult.method}. Saved under All transactions — no Cases entry.
                    </div>
                    <div className="pra-modal-actions" style={{ marginTop: 20 }}>
                      <button className="pra-btn pra-btn-primary" style={{ flex: 1 }} onClick={openPaymentRecord}>
                        View payment
                      </button>
                      <button className="pra-btn pra-btn-ghost" onClick={closeCheckout}>Done</button>
                    </div>
                  </div>
                )}

                {payStep === "result" && payResult && !payResult.ok && (
                  <div className="pra-upi-status">
                    <div className="pra-upi-status-icon pra-upi-status-icon-bad">!</div>
                    <div className="pra-upi-status-title">Payment failed</div>
                    <div className="pra-upi-status-sub">
                      {friendlyProblem(payResult.gatewayCode)}. Added to All transactions and opened as a Case.
                    </div>
                    <div className="pra-modal-actions" style={{ marginTop: 20 }}>
                      <button className="pra-btn pra-btn-primary" style={{ flex: 1 }} onClick={openPaymentRecord}>
                        Open case
                      </button>
                      <button className="pra-btn pra-btn-ghost" onClick={closeCheckout}>Close</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

