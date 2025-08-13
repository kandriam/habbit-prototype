HOW RUN
1. In terminal window, run
    ng serve
2. In a separate terminal, run
    json-server --watch db.json
2. Go to http://localhost:4200/

RoadMap (later to be own md)
[x] Edit habits
[x] Add habits
    - Generate unique id
    - post habit
[x] Delete habits (waiting on add habits)
[ ] Multiline descriptions
[ ] Sort home view
[ ] Track per day
    - Tracker with length of instancesperday
    - Start of every day with 0/instancesperday
    - user can +/- throughout the day
[ ] Calendar and habit tracker (1 year)
[ ] Every x days/weeks/months on x weekdays/dates

Notes:
- Why ids in json are strings and not numbers?
    - Angular/HTTP seems to be converting numbers to strings when handling JSON responses. I have spent hours trying to dodge this with conversions, it has not worked yet.