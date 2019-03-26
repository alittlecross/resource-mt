INSERT INTO personroles
SELECT people.personid, roles.roleid
FROM people, roles
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
   OR people.email = 'marc.solomon@rpa.gov.uk' AND roles.role = 'Database Analyst'
   OR people.email = 'jonathan.drake@defra.gov.uk' AND roles.role = 'Systems Administrator';