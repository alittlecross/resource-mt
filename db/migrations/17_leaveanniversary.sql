CREATE TABLE leaveanniversary (
  anniversaryid SERIAL PRIMARY KEY,
  personid int,
  anniversarydate date DEFAULT NOW()
  broughtforward int,
  allowance float DEFAULT 31.5,
  FOREIGN KEY (personid) REFERENCES people(personid)
);
