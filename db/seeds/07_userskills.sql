INSERT INTO userskills
SELECT users.userid, skills.skillid
FROM users, skills
WHERE users.email = 'nicholas.blows@rpa.gov.uk' AND skills.skill = 'C#'
    OR users.email = 'nicholas.blows@rpa.gov.uk' AND skills.skill = 'SQL'
    OR users.email = 'paul.doyle@rpa.gov.uk' AND skills.skill = 'C#'
    OR users.email = 'paul.doyle@rpa.gov.uk' AND skills.skill = 'SQL'
    OR users.email = 'lee.gordon@rpa.gov.uk' AND skills.skill = 'C#'
    OR users.email = 'lee.gordon@rpa.gov.uk' AND skills.skill = 'SQL'
    OR users.email = 'ian.noonan@rpa.gov.uk' AND skills.skill = 'C#'
    OR users.email = 'ian.noonan@rpa.gov.uk' AND skills.skill = 'SQL'
    OR users.email = 'matthew.quinton@rpa.gov.uk' AND skills.skill = 'C#'
    OR users.email = 'matthew.quinton@rpa.gov.uk' AND skills.skill = 'SQL'
    OR users.email = 'john.watson@rpa.gov.uk' AND skills.skill = 'C#'
    OR users.email = 'john.watson@rpa.gov.uk' AND skills.skill = 'SQL'
    OR users.email = 'john.watson@rpa.gov.uk' AND skills.skill = 'Node.js'
    OR users.email = 'scott.dormand@rpa.gov.uk' AND skills.skill = 'C#'
    OR users.email = 'scott.dormand@rpa.gov.uk' AND skills.skill = 'SQL'
    OR users.email = 'fay.toward@rpa.gov.uk' AND skills.skill = 'C#'
    OR users.email = 'fay.toward@rpa.gov.uk' AND skills.skill = 'SQL'
    OR users.email = 'fay.toward@rpa.gov.uk' AND skills.skill = 'Node.js'
    OR users.email = 'paul.fazackerley@rpa.gov.uk' AND skills.skill = 'Node.js'
    OR users.email = 'paul.fazackerley@rpa.gov.uk' AND skills.skill = 'SQL'
    OR users.email = 'tim.butterworth@rpa.gov.uk' AND skills.skill = 'SQL'
    OR users.email = 'marc.solomon@rpa.gov.uk' AND skills.skill = 'SQL';