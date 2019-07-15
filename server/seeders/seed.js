import pool from '../model/db';

const text =
`INSERT INTO users(
    first_name, 
    last_name,
    is_admin,
    email,
    password,
    img,
    created_at
) VALUES(
    'Chima',
    'Amodu',
    false,
    'chima@amodu.com',
    'password',
    'https://img.buzzfeed.com/buzzfeed-static/static/2017-03/20/16/campaign_images/buzzfeed-prod-fastlane-01/build-a-perfect-man-and-well-reveal-your-emotiona-2-24401-1490040929-0_dblbig.jpg',
    '2018-09-06T00:47:03.687Z'
);

INSERT INTO bus(
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
  1,
  'Ahmed',
  'Fred',
  'Ghana',
  2009,
  5,
  'white',
  'https://i.kinja-img.com/gawker-media/image/upload/s--_DBGLHVf--/c_scale,f_auto,fl_progressive,q_80,w_800/eibgv7kctah62iddzywm.jpg',
  '2018-07-04 22:46:19'
);
INSERT INTO trip
(
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
  1,
  1,
  'Ebuka',
  'Jerry',
  '2018-07-05 22:46:19',
  '22:46:19',
  '500',
  'Cancelled',
  '2018-07-05 22:46:19'
);
INSERT INTO booking
(
  trip_id,
  user_id,
  seat_number,
  created_at
) VALUES(
  1,
  1,
  3,
  '2018-07-05 22:46:19'
)`;

pool
  .query(text)
  .then((res) => {
    pool.end();
  })
  .catch((err) => {
    pool.end();
  });