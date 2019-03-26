CREATE TABLE personskills (
  personid int,
  skillid int,
  FOREIGN KEY (personid) REFERENCES people(personid),
  FOREIGN KEY (skillid) REFERENCES skills(skillid),
  PRIMARY KEY (personid, skillid)
);
