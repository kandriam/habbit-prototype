How to Run
1. In terminal window, run
    ng serve
2. In a separate terminal, run
    json-server --watch db.json
2. Go to http://localhost:4200/


Features
- Home page
    - Displays all habits
- Habit page
    - Details
    - Calendar

RoadMap (later to be own md)
[x] Edit habits
[x] Add habits
    - Generate unique id
    - post habit
[x] Delete habits (waiting on add habits)
[x] Calendar and habit tracker (1 year)
    [x] Make today distingc
[x] Multiline descriptions
[ ] Proggy/Track per day
    [x] Tracker with length of instancesperday
    [x] user can +/- throughout the day
    [-] Reset on new day/Start of every day with 0/instancesperday
    [-] Once completed, mark as complete on today's date
[ ] Sort home view
[x] Mark/Toggle today as complete button
[-] Every x days/weeks/months on x weekdays/dates
[x] Different years
[ ] Calendar on home page
    [ ] Multiple habits on one main calendar
    [ ] select which habits
[ ] Progress tasks (Tasks that have no calendar and are just % done)


Notes:
- Why ids in json are strings and not numbers?
    - Angular/HTTP seems to be converting numbers to strings when handling JSON responses. I have spent hours trying to dodge this with conversions, it has not worked yet.
    - I don't know why this isn't an issue with timesperinstance