CREATE TABLE posts (
  postid SERIAL PRIMARY KEY,
  userid int,
  content varchar(1000),
  createdat timestamptz NOT NULL DEFAULT NOW(),
  FOREIGN KEY (userid) REFERENCES users(userid)
);