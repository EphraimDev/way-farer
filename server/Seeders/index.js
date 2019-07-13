import pool from '../model/db';

const text = `DELETE FROM booking trip bus users CASCADE;
INSERT INTO users(
    user_id,
    firstname, 
    lastname,
    status,
    email,
    password,
    img,
    created_at
) VALUES(
    '116e6a3c-2528-f165-f78c-94435cea4ab5',
    'Chima',
    'Amodu',
    'false',
    'chima@amodu.com',
    'password',
    'https://img.buzzfeed.com/buzzfeed-static/static/2017-03/20/16/campaign_images/buzzfeed-prod-fastlane-01/build-a-perfect-man-and-well-reveal-your-emotiona-2-24401-1490040929-0_dblbig.jpg',
    '23:30 PM',
    '2018-09-06T00:47:03.687Z'
);
INSERT INTO bus(
    bus_id
    user_id,
    number_plate, 
    manufacturer,
    model,
    year,
    capacity,
    color,
    img,
    created_at
) VALUES(
    'be151b77-1cbe-431e-0783-f0706489c8aa',
    '116e6a3c-2528-f165-f78c-94435cea4ab5',
    'Ahmed',
    'Fred',
    'Ghana',
    2009,
    5,
    'white'
    'https://i.kinja-img.com/gawker-media/image/upload/s--_DBGLHVf--/c_scale,f_auto,fl_progressive,q_80,w_800/eibgv7kctah62iddzywm.jpg',
    '2018-07-04 22:46:19'
);
INSERT INTO trip
  (
      trip_id,
      bus_id,
      user_id,
      origin,
      destination,
      trip_date,
      trip_time,
      fare,
      status,
      created_at
  ) VALUES(
    'a7e48835-9e8c-5f03-494e-cbdbc975f5ec',
    'be151b77-1cbe-431e-0783-f0706489c8aa',
    '116e6a3c-2528-f165-f78c-94435cea4ab5',
    'Ebuka',
    'Jerry',
    'Nigeria',
    '2018-07-05 22:46:19',
    '22:46:19',
    '500',
    'Cancelled',
    '2018-07-05 22:46:19'
);
INSERT INTO booking
  (
    booking_id,
    trip_id,
    user_id,
    seat_number,
    created_at,
  ) VALUES(
    'be151b77-1cbe-431e-0783-f0706489c9aa',
    'a7e48835-9e8c-5f03-494e-cbdbc975f5ec',
    '116e6a3c-2528-f165-f78c-94435cea4ab5',
    3,
    '2018-07-05 22:46:19'
)`;

pool
  .query(text)
  .then((res) => {
    console.log(res);
    pool.end();
  })
  .catch((err) => {
    console.log(err);
    pool.end();
  });