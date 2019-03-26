CREATE TABLE personroles (
  personid int,
  roleid int,
  FOREIGN KEY (personid) REFERENCES people(personid),
  FOREIGN KEY (roleid) REFERENCES roles(roleid),
  PRIMARY KEY (personid, roleid)
);
