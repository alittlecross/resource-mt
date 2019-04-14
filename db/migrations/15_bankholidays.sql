CREATE TABLE bankholidays (
  holidaydate date PRIMARY KEY,
  descriptionid int,
  FOREIGN KEY (descriptionid) REFERENCES descriptions(descriptionid)
);
