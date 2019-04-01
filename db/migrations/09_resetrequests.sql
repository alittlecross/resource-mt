CREATE TABLE resetrequests (
  email varchar(100),
  hash varchar(140),
  FOREIGN KEY (email) REFERENCES people(email)
);
