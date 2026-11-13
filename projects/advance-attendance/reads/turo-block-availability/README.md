# Turo — Block availability (Mobbin, iOS, read 2026-10-01)

Source: https://mobbin.com/flows/de3a86dc-2c44-44b6-b8b2-6c4c479b408e

1. **Idea.** Availability is on by default; the host selects several days in a calendar row (each gets a check) and blocks them in one action; a toast confirms *Your availability has been updated*.
2. **Idea vs skin.** Borrowable: multi-day selection as checked day cells, *block* as the exception action, one confirmation toast. Skin: purple, prices under days, a sheet with a dropdown.
3. **Against the expert.** Fine as an idea — big day cells, one action. Fails on the dropdown and the price clutter.
4. **Tier.** DatePicker `strip` multi-select is a core change (the strip is `single` today). Toast exists.
