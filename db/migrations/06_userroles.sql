CREATE TABLE userroles (
  userid int,
  roleid int,
  FOREIGN KEY (userid) REFERENCES users(userid),
  FOREIGN KEY (roleid) REFERENCES roles(roleid),
  PRIMARY KEY (userid, roleid)
);
