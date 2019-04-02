INSERT INTO people (staffid, firstname, surname, email)
VALUES
  ('302151', 'Alan', 'Slee', 'alan.slee@defra.gov.uk'),
  ('992810', 'Nicholas', 'Blows', 'nicholas.blows@rpa.gov.uk'),
  ('992746', 'Paul', 'Doyle', 'paul.doyle@rpa.gov.uk'),
  ('992772', 'Lee', 'Gordon', 'lee.gordon@rpa.gov.uk'),
  ('992874', 'Ian', 'Noonan', 'ian.noonan@rpa.gov.uk'),
  ('992918', 'Matthew', 'Quinton', 'matthew.quinton@rpa.gov.uk'),
  ('992809', 'John', 'Watson', 'john.watson@rpa.gov.uk'),
  ('992742', 'Scott', 'Dormand', 'scott.dormand@rpa.gov.uk'),
  ('992827', 'Fay', 'Toward', 'fay.toward@rpa.gov.uk'),
  ('992749', 'Paul', 'Fazackerley', 'paul.fazackerley@rpa.gov.uk'),
  ('992893', 'Tim', 'Butterworth', 'tim.butterworth@rpa.gov.uk'),
  ('992829', 'Mike', 'Johnson', 'mike.johnson@rpa.gov.uk'),
  ('992856', 'Marc', 'Solomon', 'marc.solomon@rpa.gov.uk'),
  ('169899', 'Jonathan', 'Drake', 'jonathan.drake@defra.gov.uk');

UPDATE people
SET gradeid = grades.gradeid
FROM grades
WHERE people.email = 'alan.slee@defra.gov.uk' AND grades.grade = 'G7'
   OR people.email = 'nicholas.blows@rpa.gov.uk' AND grades.grade = 'SEO'
   OR people.email = 'paul.doyle@rpa.gov.uk' AND grades.grade = 'SEO'
   OR people.email = 'lee.gordon@rpa.gov.uk' AND grades.grade = 'SEO'
   OR people.email = 'ian.noonan@rpa.gov.uk' AND grades.grade = 'SEO'
   OR people.email = 'matthew.quinton@rpa.gov.uk' AND grades.grade = 'SEO'
   OR people.email = 'john.watson@rpa.gov.uk' AND grades.grade = 'SEO'
   OR people.email = 'scott.dormand@rpa.gov.uk' AND grades.grade = 'HEO'
   OR people.email = 'fay.toward@rpa.gov.uk' AND grades.grade = 'HEO'
   OR people.email = 'paul.fazackerley@rpa.gov.uk' AND grades.grade = 'EO'
   OR people.email = 'tim.butterworth@rpa.gov.uk' AND grades.grade = 'HEO'
   OR people.email = 'mike.johnson@rpa.gov.uk' AND grades.grade = 'SEO'
   OR people.email = 'marc.solomon@rpa.gov.uk' AND grades.grade = 'SEO'
   OR people.email = 'jonathan.drake@defra.gov.uk' AND grades.grade = 'HEO';

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
   OR people.email = 'mike.johnson@rpa.gov.uk' AND locations.location = 'York'
   OR people.email = 'marc.solomon@rpa.gov.uk' AND locations.location = 'York'
   OR people.email = 'jonathan.drake@defra.gov.uk' AND locations.location = 'Newcastle';

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
   OR A.email = 'mike.johnson@rpa.gov.uk' AND B.email = 'alan.slee@defra.gov.uk'
   OR A.email = 'marc.solomon@rpa.gov.uk' AND B.email = 'alan.slee@defra.gov.uk'
   OR A.email = 'jonathan.drake@defra.gov.uk' AND B.email = 'alan.slee@defra.gov.uk';

UPDATE people
SET roleid = roles.roleid
FROM roles
WHERE people.email = 'alan.slee@defra.gov.uk' AND roles.role = 'Resource Manager'
   OR people.email = 'nicholas.blows@rpa.gov.uk' AND roles.role = 'Senior Developer'
   OR people.email = 'paul.doyle@rpa.gov.uk' AND roles.role = 'Senior Developer'
   OR people.email = 'lee.gordon@rpa.gov.uk' AND roles.role = 'Senior Developer'
   OR people.email = 'ian.noonan@rpa.gov.uk' AND roles.role = 'Senior Developer'
   OR people.email = 'matthew.quinton@rpa.gov.uk' AND roles.role = 'Senior Developer'
   OR people.email = 'john.watson@rpa.gov.uk' AND roles.role = 'Senior Developer'
   OR people.email = 'scott.dormand@rpa.gov.uk' AND roles.role = 'Developer'
   OR people.email = 'fay.toward@rpa.gov.uk' AND roles.role = 'Developer'
   OR people.email = 'paul.fazackerley@rpa.gov.uk' AND roles.role = 'Apprentice Developer'
   OR people.email = 'tim.butterworth@rpa.gov.uk' AND roles.role = 'Database Analyst'
   OR people.email = 'mike.johnson@rpa.gov.uk' AND roles.role = 'Database Analyst'
   OR people.email = 'marc.solomon@rpa.gov.uk' AND roles.role = 'Database Analyst'
   OR people.email = 'jonathan.drake@defra.gov.uk' AND roles.role = 'Systems Administrator';

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
   OR people.email = 'mike.johnson@rpa.gov.uk' AND statuses.status = 'Permanent'
   OR people.email = 'marc.solomon@rpa.gov.uk' AND statuses.status = 'Permanent'
   OR people.email = 'jonathan.drake@defra.gov.uk' AND statuses.status = 'Permanent';    
