---
title: "ReadMe"
---
# How to Run
1. In terminal window, run
    `ng serve`
2. In a separate terminal, run
    `json-server --watch db.json`
2. Go to [http://localhost:4200/](http://localhost:4200/)


# Features
- Home page
    - Displays all habits
- Habit page
    - Details
    - Calendar


# Notes
- Why ids in json are strings and not numbers?
    - Angular/HTTP seems to be converting numbers to strings when handling JSON responses. I have spent hours trying to dodge this with conversions, it has not worked yet.
    - I don't know why this isn't an issue with timesperinstance