CREATE TABLE leave (
  leaveid SERIAL PRIMARY KEY,
  personid int,
  leavedate date,
  typeid int,
  durationid int,
  approved boolean NOT NULL default false,
  FOREIGN KEY (typeid) REFERENCES leavetypes(typeid),
  FOREIGN KEY (durationid) REFERENCES durations(durationid)
);
