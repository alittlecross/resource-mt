class Person {
  static personObject (data) {
    return {
      userId: data.userid,
      firstName: data.firstname,
      surname: data.surname,
      email: data.email,
      roles: [],
      location: data.location,
      status: data.status,
      manager: data.manager,
      skills: []
    }
  }

  static buildPersonObjects (data) {
    let people = []
    data.forEach((row) => {
      if (row.kind === 'details') {
        people.push(this.personObject(row))
      } else if (row.kind === 'role') {
        let result = people.find((x) => x.userId === row.userid)
        result.roles.push(row.role)
      } else {
        let result = people.find((x) => x.userId === row.userid)
        result.skills.push(row.skill)
      }
    })
    return people
  }
}

module.exports = Person
