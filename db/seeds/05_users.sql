INSERT INTO users (firstname, surname, email, password)
VALUES
  ('Alan', 'Slee', 'alan.slee@defra.gov.uk', 'password'),
  ('Nicholas', 'Blows', 'nicholas.blows@rpa.gov.uk', 'password'),
  ('Paul', 'Doyle', 'paul.doyle@rpa.gov.uk', 'password'),
  ('Lee', 'Gordon', 'lee.gordon@rpa.gov.uk', 'password'),
  ('Ian', 'Noonan', 'ian.noonan@rpa.gov.uk', 'password'),
  ('Matthew', 'Quinton', 'matthew.quinton@rpa.gov.uk', 'password'),
  ('John', 'Watson', 'john.watson@rpa.gov.uk', 'password'),
  ('Scott', 'Dormand', 'scott.dormand@rpa.gov.uk', 'password'),
  ('Fay', 'Toward', 'fay.toward@rpa.gov.uk', 'password'),
  ('Paul', 'Fazackerley', 'paul.fazackerley@rpa.gov.uk', 'password'),
  ('Tim', 'Butterworth', 'tim.butterworth@rpa.gov.uk', 'password'),
  ('Marc', 'Solomon', 'marc.solomon@rpa.gov.uk', 'password'),
  ('Jonathan', 'Drake', 'jonathan.drake@defra.gov.uk', 'password');

UPDATE users
SET locationid = locations.locationid
FROM locations
WHERE users.email = 'alan.slee@defra.gov.uk' AND locations.location = 'York'
    OR users.email = 'nicholas.blows@rpa.gov.uk' AND locations.location = 'York'
    OR users.email = 'paul.doyle@rpa.gov.uk' AND locations.location = 'York'
    OR users.email = 'lee.gordon@rpa.gov.uk' AND locations.location = 'Newcastle'
    OR users.email = 'ian.noonan@rpa.gov.uk' AND locations.location = 'York'
    OR users.email = 'matthew.quinton@rpa.gov.uk' AND locations.location = 'York'
    OR users.email = 'john.watson@rpa.gov.uk' AND locations.location = 'Newcastle'
    OR users.email = 'scott.dormand@rpa.gov.uk' AND locations.location = 'Newcastle'
    OR users.email = 'fay.toward@rpa.gov.uk' AND locations.location = 'Newcastle'
    OR users.email = 'paul.fazackerley@rpa.gov.uk' AND locations.location = 'Newcastle'
    OR users.email = 'tim.butterworth@rpa.gov.uk' AND locations.location = 'York'
    OR users.email = 'marc.solomon@rpa.gov.uk' AND locations.location = 'York'
    OR users.email = 'jonathan.drake@defra.gov.uk' AND locations.location = 'Newcastle';

UPDATE users
SET statusid = statuses.statusid
FROM statuses
WHERE users.email = 'alan.slee@defra.gov.uk' AND statuses.status = 'Permanent'
    OR users.email = 'nicholas.blows@rpa.gov.uk' AND statuses.status = 'Permanent'
    OR users.email = 'paul.doyle@rpa.gov.uk' AND statuses.status = 'Permanent'
    OR users.email = 'lee.gordon@rpa.gov.uk' AND statuses.status = 'Permanent'
    OR users.email = 'ian.noonan@rpa.gov.uk' AND statuses.status = 'Permanent'
    OR users.email = 'matthew.quinton@rpa.gov.uk' AND statuses.status = 'Permanent'
    OR users.email = 'john.watson@rpa.gov.uk' AND statuses.status = 'Permanent'
    OR users.email = 'scott.dormand@rpa.gov.uk' AND statuses.status = 'Permanent'
    OR users.email = 'fay.toward@rpa.gov.uk' AND statuses.status = 'Permanent'
    OR users.email = 'paul.fazackerley@rpa.gov.uk' AND statuses.status = 'Permanent'
    OR users.email = 'tim.butterworth@rpa.gov.uk' AND statuses.status = 'Permanent'
    OR users.email = 'marc.solomon@rpa.gov.uk' AND statuses.status = 'Permanent'
    OR users.email = 'jonathan.drake@defra.gov.uk' AND statuses.status = 'Permanent';

UPDATE users A
SET managerid = B.userid
FROM users B
WHERE A.email = 'alan.slee@defra.gov.uk' AND B.email = 'alan.slee@defra.gov.uk'
    OR A.email = 'nicholas.blows@rpa.gov.uk' AND B.email = 'alan.slee@defra.gov.uk'
    OR A.email = 'paul.doyle@rpa.gov.uk' AND B.email = 'alan.slee@defra.gov.uk'
    OR A.email = 'lee.gordon@rpa.gov.uk' AND B.email = 'alan.slee@defra.gov.uk'
    OR A.email = 'ian.noonan@rpa.gov.uk' AND B.email = 'alan.slee@defra.gov.uk'
    OR A.email = 'matthew.quinton@rpa.gov.uk' AND B.email = 'alan.slee@defra.gov.uk'
    OR A.email = 'john.watson@rpa.gov.uk' AND B.email = 'alan.slee@defra.gov.uk'
    OR A.email = 'scott.dormand@rpa.gov.uk' AND B.email = 'alan.slee@defra.gov.uk'
    OR A.email = 'fay.toward@rpa.gov.uk' AND B.email = 'alan.slee@defra.gov.uk'
    OR A.email = 'paul.fazackerley@rpa.gov.uk' AND B.email = 'alan.slee@defra.gov.uk'
    OR A.email = 'tim.butterworth@rpa.gov.uk' AND B.email = 'alan.slee@defra.gov.uk'
    OR A.email = 'marc.solomon@rpa.gov.uk' AND B.email = 'alan.slee@defra.gov.uk'
    OR A.email = 'jonathan.drake@defra.gov.uk' AND B.email = 'alan.slee@defra.gov.uk';
    