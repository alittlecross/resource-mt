
CREATE TABLE users (
  userid SERIAL PRIMARY KEY,
  firstname varchar(50),
  surname varchar(50),
  email varchar(100),
  password varchar(140),
  dob date,
  sexid int,
  profilepictureurl varchar(255),
  createdat timestamptz NOT NULL DEFAULT NOW(),
  FOREIGN KEY (sexid) REFERENCES sex(sexid)
);
