const express = require('express');
const cors = require('cors');
const app = express();

const booksData = require('./books.json');

app.use(cors()); // ใช้ CORS middleware ก่อนการเรียกใช้เส้นทาง

// สร้างเส้นทางสำหรับ API endpoint เพื่อรับข้อมูลหนังสือทั้งหมด
app.get('/books.json', (req, res) => {
  res.json(booksData.book); // ส่งข้อมูลหนังสือทั้งหมดกลับเป็น JSON
});

const PORT = process.env.PORT || 3000; // กำหนดพอร์ต

// เริ่ม Express server และรอการเชื่อมต่อ
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

