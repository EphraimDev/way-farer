const query = {
  createUser: 'INSERT INTO users(email,first_name,last_name,password,img,is_admin,created_at) values($1,$2,$3,$4,$5,$6,$7)',
  text: 'SELECT * FROM users WHERE email = $1',
  addBus: `INSERT INTO bus(user_id, number_plate, manufacturer, model, year, capacity, color, img, created_at) values($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
};

export default query;
