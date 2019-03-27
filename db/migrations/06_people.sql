CREATE TABLE people (
  personid SERIAL PRIMARY KEY,
  staffid varchar(10) UNIQUE,
  firstname varchar(50),
  surname varchar(50),
  email varchar(100) UNIQUE,
  password varchar(140),
  gradeid int,
  locationid int,
  managerid int,
  roleid int,
  statusid int,
  createdat timestamptz NOT NULL DEFAULT NOW(),
  FOREIGN KEY (gradeid) REFERENCES grades(gradeid),
  FOREIGN KEY (locationid) REFERENCES locations(locationid),
  FOREIGN KEY (managerid) REFERENCES people(personid),
  FOREIGN KEY (roleid) REFERENCES roles(roleid),
  FOREIGN KEY (statusid) REFERENCES statuses(statusid)
);
