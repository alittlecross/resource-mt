CREATE TABLE leave (
  leaveid SERIAL PRIMARY KEY,
  personid int,
  leavedate date,
  typeid int,
  durationid int,
  statusid int,
  FOREIGN KEY (typeid) REFERENCES leavetypes(typeid),
  FOREIGN KEY (durationid) REFERENCES durations(durationid)
);
