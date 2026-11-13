# DoorDash Dasher — Schedule (Mobbin, iOS, read 2026-10-01)

Source: https://mobbin.com/flows/7f950431-4f7d-4309-99d9-f7ce6abab6b6 · https://mobbin.com/flows/b23594e3-4bda-495a-ae7e-205a5ab55ee0

1. **Idea.** A worker reserves when she will work from a week strip; one screen holds *Available* (what she could take) and *Scheduled* (what she has taken) as two views of the same week.
2. **Idea vs skin.** Borrowable: week strip with today marked, two views of one week, blocks as time ranges on the day, the schedule reached from Home by a calendar icon beside the main action. Skin: red/black, hour-by-hour timeline, time wheels (`04`) — a wheel is the control `date-picker.md` forbids.
3. **Against the expert.** Reading-heavy (dates written in full, *12/8/2025, 6:00 PM*), a timeline of empty hours, and the ask is pull, not push — she must remember to go there. Survives only as the *week strip + two views* idea.
4. **Tier.** Composition of DatePicker `strip` / WeekStrip + Tabs `segmented`. Nothing new.
