[![Build Status](https://travis-ci.com/EphraimDev/way-farer.svg?branch=develop)](https://travis-ci.com/EphraimDev/way-farer)  [![Coverage Status](https://coveralls.io/repos/github/EphraimDev/way-farer/badge.svg?branch=develop)](https://coveralls.io/github/EphraimDev/way-farer?branch=develop)  [![Maintainability](https://api.codeclimate.com/v1/badges/83a5af859e99685c1d14/maintainability)](https://codeclimate.com/github/EphraimDev/way-farer/maintainability)  [![Test Coverage](https://api.codeclimate.com/v1/badges/83a5af859e99685c1d14/test_coverage)](https://codeclimate.com/github/EphraimDev/way-farer/test_coverage)

# way-farer

### Style guide

[Airbnb ](https://github.com/airbnb/javascript)(Javascript style guide)

### Tech stack

- [Nodejs](https://nodejs.org/en/)
- [Expressjs](https://expressjs.com/)
- [Mocha](https://mochajs.org/)
- [Chai](http://www.chaijs.com/)
- [PostgreSQL](https://www.postgresql.org/)

### Features

- Users can create an account and log in.
- Authenticated users can update their profile
- Authenticated users can view all trips.
- Authenticated users can view all bookings.
- Authenticated admins can create trips.
- Authenticated admins can update trips.
- Authenticated admins can delete trips.
- Authenticated users can book trips.
- Authenticated users can edit bookings.
- Authenticated users can delete bookings.
- Authenticated users can search for trips by origin or destination or both.

## Installing

#### Prerequisites

Ensure you have **NodeJS** installed by entering `node -v` on your terminal
If you don't have **NodeJS** installed go to the [NodeJS Website](http://nodejs.org), and follow the download instructions

Ensure you have **Postgresql server** installed on your local machine by entering `postgres -V` on your terminal
If you don't have **PostgreSQL** installed, go to the [PostgreSQL website](https://www.postgresql.org/) and follow the download instructions

To install this app

```
git clone https://github.com/EphraimDev/way-farer.git
```

cd into the project folder and install the required dependencies

```
npm install
```
Set up PostgreSQL database

```
Open the pgAdmin app on your local machine and create a database
```

Create a `.env` file by running `cp .env.sample .env` on your terminal

Update your `.env` file with the necessary informations

Create tables using your terminal

```
npm run db:migrations
```

Seed the database

```
npm run db:seed
```

Run server

```
npm run start:dev
```

## Running the tests

To run test cases

```
npm run test:db
```

### To view the documentation
localhost:4000

### Working Routes

<table>
<thead>
<tr>
<th>Endpoint</th>
<th>Functionality</th>
</tr>
</thead>
<tbody>
<tr>
<td>POST api/v1/auth/signup</td>
<td>Create new user</td>
</tr>
<tr>
<td>POST api/v1/auth/signin</td>
<td>Sign in user</td>
</tr>
<tr>
<td>POST api/v1/bus</td>
<td>Create new buss</td>
</tr>
<tr>
<td>POST api/v1/trips</td>
<td>Create new trip</td>
</tr>
<tr>
<td>DELETE api/v1/trips/:tripId</td>
<td>Cancel a trip</td>
</tr>
<tr>
<td>GET api/v1/trips</td>
<td>Fetch all trips</td>
</tr>
<tr>
<td>GET api/v1/trips/search?</td>
<td>Search for trips by origin or destination</td>
</tr>
<tr>
<td>PUT api/v1/trips/:tripId</td>
<td>Update a trip</td>
</tr>
<tr>
<td>POST api/v1/bookings</td>
<td>Book a trip</td>
</tr>
<tr>
<td>GET api/v1/bookings</td>
<td>Fetch all bookings</td>
</tr>
<tr>
<td>DELETE api/v1/bookings/:bookingId</td>
<td>Cancel a booking</td>
</tr>
</tbody></table>

## License

This projects is under the ISC LICENSE

## Author 

[Ephraim Aigbefo](https://github.com/EphraimDev)

## Acknowledgements

- [Andela](http://andela.com)
- [Google Search](https://google.com)
- [Stackoverflow](stackoverflow.com)
- [Postgresql Tutorial](http://www.postgresqltutorial.com/)
