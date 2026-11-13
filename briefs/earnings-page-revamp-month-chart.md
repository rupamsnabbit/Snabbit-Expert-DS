# MonthBars — six months of net earnings, as bars

Tier 3 · Proposed 2026-10-05 · asked by `projects/earnings-page-revamp` (design lead's Paper comment: *money you've made with us → on clicking we show some graphs*)

## Why core does not fit

`ProgressBar` shows one value against one goal; `Statement` lists amounts in rows; `WeekStrip` is seven days of one week. Nothing in core compares **months to each other**, which is the one thing a graph is for here.

## What it is

Six vertical bars, one per month, oldest left. The current month's bar is `bgBrand`; past months are `borderDefault`. Each bar carries its amount above it as `Caption` `textSecondary` (`tnum`, ₹ always) and its month below as `Caption`. Bars are `radius.full`, `spacing.3` apart, height proportional to the largest month (the largest bar fills the chart height). No axis, no gridlines, no legend, no tooltip — the numbers are printed, so nothing needs a tap.

Two sizes: **`S`** (sparkline) — 6 bars × 4 dp, 32 dp tall, no labels, inside a Card beside an Amount; **`M`** — 6 bars × 24 dp, 120 dp tall, labelled, on its own screen.

## Tokens

`bgBrand` · `borderDefault` · `textSecondary` · `radius.full` · `spacing.3` gap · Caption. No new tokens.

## States

default · loading (Skeleton bars at 60 %) · fewer than six months (bars for the months she has; the rest absent, never ₹0) · zero month (a 2 dp `borderDefault` stub, labelled, so the month is not missing).

## Accessibility

Read as a list: *"October, thirty-two thousand rupees … March, fifty thousand rupees, this month."* Current month is colour + the word *this month* in the spoken form. Bars are not targets.

## Promotion

Rule of three: Rewards (coins by week) and Referral (friends by month) are the next candidates. If either adopts it, this becomes `components/month-bars.md`.
