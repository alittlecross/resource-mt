## Resource MT

A resource management tool.

[Visit Project Ketchup on Heroku][1]

[1]: https://project-ketchup.herokuapp.com

## Getting started

Assuming you have `git` installed, in the location of your choice, in Terminal:

`git clone git@github.com:alittlecross/project-ketchup.git`

`cd` into the `project-ketchup` folder.

Assuming you have Node.js and NPM installed, in that same location, in Terminal:

`npm install`

## Database Setup

Assuming you have `Homebrew` installed, in Terminal:

```
brew install postgresql

ln -sfv /usr/local/opt/postgresql/*.plist ~/Library/LaunchAgents
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist

psql postgres
```

Then paste the SQL script `CREATE DATABASE ketchup;`

Close postgres with `\q`

In Terminal:

`npm run migrations`

To populate the database with seed data, in Terminal:

`npm run seeds`

Store local environmental variables by pasting each of the following into Terminal (if you have already set up user names, passwords, or changed the defaults for postgres, these should be entered beside the '=''s):

```
export PKDATABASE=ketchup
export PKHOST=
export PKPASSWORD=
export PKPORT=
export PKUSER=

export SESSIONSECRET='this can be anything you like'
export URL=http://localhost:3000/
```

To use the 'forgot your password' functionality, store additional local environmental variables for an email account:

```
export NMHOST='this is the host of the email account, for example, smtp.office365.com'
export NMPASS='this is the email account password'
export NMPORT='this is the port for the host, typically 587 but can vary'
export NMUSER='this is the email address itself'
```

## Local Usage

In that same location, in Terminal:

`npm start`

Then in the browser of your choice:

`http://localhost:3000/`

## Running tests

`npm test`

## Linting

JavaScript files have been linted throughout the project using `StandardJS`
