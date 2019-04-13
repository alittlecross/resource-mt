CREATE TABLE bankholidays (
  holidaydate timestamptz PRIMARY KEY,
  descriptionid int,
  FOREIGN KEY (descriptionid) REFERENCES descriptions(descriptionid)
);
