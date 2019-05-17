CREATE TABLE leaveyear (
  yearid SERIAL PRIMARY KEY,
  personid int,
  startdate date DEFAULT NOW(),
  enddate date DEFAULT NOW() + interval '1 year' - interval '1 day',
  current boolean default TRUE,
  broughtforward float default 0.0,
  allowance float default 25.0,
  FOREIGN KEY (personid) REFERENCES people(personid)
);
