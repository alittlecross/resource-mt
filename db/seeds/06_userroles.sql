INSERT INTO userroles
SELECT users.userid, roles.roleid
FROM users, roles
WHERE users.email = 'alan.slee@defra.gov.uk' AND roles.role = 'Resource Manager'
    OR users.email = 'alan.slee@defra.gov.uk' AND roles.role = 'Manager'
    OR users.email = 'nicholas.blows@rpa.gov.uk' AND roles.role = 'Senior Developer'
    OR users.email = 'paul.doyle@rpa.gov.uk' AND roles.role = 'Senior Developer'
    OR users.email = 'lee.gordon@rpa.gov.uk' AND roles.role = 'Senior Developer'
    OR users.email = 'ian.noonan@rpa.gov.uk' AND roles.role = 'Senior Developer'
    OR users.email = 'matthew.quinton@rpa.gov.uk' AND roles.role = 'Senior Developer'
    OR users.email = 'john.watson@rpa.gov.uk' AND roles.role = 'Senior Developer'
    OR users.email = 'scott.dormand@rpa.gov.uk' AND roles.role = 'Developer'
    OR users.email = 'fay.toward@rpa.gov.uk' AND roles.role = 'Developer'
    OR users.email = 'paul.fazackerley@rpa.gov.uk' AND roles.role = 'Apprentice Developer'
    OR users.email = 'tim.butterworth@rpa.gov.uk' AND roles.role = 'Database Analyst'
    OR users.email = 'marc.solomon@rpa.gov.uk' AND roles.role = 'Database Analyst'
    OR users.email = 'jonathan.drake@defra.gov.uk' AND roles.role = 'Systems Administrator';