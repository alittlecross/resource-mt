CREATE TABLE leaveyear (
  yearid SERIAL PRIMARY KEY,
  personid int,
  startdate date,
  enddate date,
  current boolean default TRUE,
  broughtforward int,
  allowance float,
  FOREIGN KEY (personid) REFERENCES people(personid)
);
