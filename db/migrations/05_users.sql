CREATE TABLE users (
  userid SERIAL PRIMARY KEY,
  firstname varchar(50),
  surname varchar(50),
  email varchar(100) UNIQUE,
  password varchar(140),
  locationid int,
  statusid int,
  managerid int,
  createdat timestamptz NOT NULL DEFAULT NOW(),
  FOREIGN KEY (locationid) REFERENCES locations(locationid),
  FOREIGN KEY (statusid) REFERENCES statuses(statusid),
  FOREIGN KEY (managerid) REFERENCES users(userid)
);
