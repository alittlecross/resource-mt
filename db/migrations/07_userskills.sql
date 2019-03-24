CREATE TABLE userskills (
  userid int,
  skillid int,
  FOREIGN KEY (userid) REFERENCES users(userid),
  FOREIGN KEY (skillid) REFERENCES skills(skillid),
  PRIMARY KEY (userid, skillid)
);
