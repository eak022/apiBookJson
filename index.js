const express = require('express');
const cors = require('cors');
const app = express();

const booksData = require('./books.json'); // นำเข้าข้อมูลหนังสือจากไฟล์ books.json

app.use(cors());

app.get('/', (req, res) => {
  res.json(booksData.book);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
