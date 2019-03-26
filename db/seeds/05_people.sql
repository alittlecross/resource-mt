INSERT INTO people (firstname, surname, email, password)
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

UPDATE people
SET locationid = locations.locationid
FROM locations
WHERE people.email = 'alan.slee@defra.gov.uk' AND locations.location = 'York'
   OR people.email = 'nicholas.blows@rpa.gov.uk' AND locations.location = 'York'
   OR people.email = 'paul.doyle@rpa.gov.uk' AND locations.location = 'York'
   OR people.email = 'lee.gordon@rpa.gov.uk' AND locations.location = 'Newcastle'
   OR people.email = 'ian.noonan@rpa.gov.uk' AND locations.location = 'York'
   OR people.email = 'matthew.quinton@rpa.gov.uk' AND locations.location = 'York'
   OR people.email = 'john.watson@rpa.gov.uk' AND locations.location = 'Newcastle'
   OR people.email = 'scott.dormand@rpa.gov.uk' AND locations.location = 'Newcastle'
   OR people.email = 'fay.toward@rpa.gov.uk' AND locations.location = 'Newcastle'
   OR people.email = 'paul.fazackerley@rpa.gov.uk' AND locations.location = 'Newcastle'
   OR people.email = 'tim.butterworth@rpa.gov.uk' AND locations.location = 'York'
   OR people.email = 'marc.solomon@rpa.gov.uk' AND locations.location = 'York'
   OR people.email = 'jonathan.drake@defra.gov.uk' AND locations.location = 'Newcastle';

UPDATE people
SET statusid = statuses.statusid
FROM statuses
WHERE people.email = 'alan.slee@defra.gov.uk' AND statuses.status = 'Permanent'
   OR people.email = 'nicholas.blows@rpa.gov.uk' AND statuses.status = 'Permanent'
   OR people.email = 'paul.doyle@rpa.gov.uk' AND statuses.status = 'Permanent'
   OR people.email = 'lee.gordon@rpa.gov.uk' AND statuses.status = 'Permanent'
   OR people.email = 'ian.noonan@rpa.gov.uk' AND statuses.status = 'Permanent'
   OR people.email = 'matthew.quinton@rpa.gov.uk' AND statuses.status = 'Permanent'
   OR people.email = 'john.watson@rpa.gov.uk' AND statuses.status = 'Permanent'
   OR people.email = 'scott.dormand@rpa.gov.uk' AND statuses.status = 'Permanent'
   OR people.email = 'fay.toward@rpa.gov.uk' AND statuses.status = 'Permanent'
   OR people.email = 'paul.fazackerley@rpa.gov.uk' AND statuses.status = 'Permanent'
   OR people.email = 'tim.butterworth@rpa.gov.uk' AND statuses.status = 'Permanent'
   OR people.email = 'marc.solomon@rpa.gov.uk' AND statuses.status = 'Permanent'
   OR people.email = 'jonathan.drake@defra.gov.uk' AND statuses.status = 'Permanent';

UPDATE people A
SET managerid = B.personid
FROM people B
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
    