const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser'); // เพิ่ม body-parser

const booksData = require('./books.json'); // นำเข้าข้อมูลหนังสือจากไฟล์ books.json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// เพิ่มเส้นทางใหม่โดยใช้พารามิเตอร์สำหรับ ID
app.get('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id); // ดึง ID ที่ส่งมาจาก request
  const book = booksData.book.find(book => book.id === bookId); // ค้นหาหนังสือ ID

  if (book) {
    res.json(book); // ส่งข้อมูลของหนังสือที่พบ
  } else {
    res.status(404).json({ message: 'Book not found' }); // ส่งข้อความว่าหนังสือไม่พบเมื่อไม่พบ ID ที่ร้องขอ
  }
});


app.get('/', (req, res) => {
  res.json(booksData.book);
});

app.post('/books', (req, res) => {
  // รับข้อมูลที่ส่งมาจาก request เพื่อสร้างหนังสือใหม่
  const newBook = req.body; // ตัวอย่างการรับข้อมูลจาก body (ต้องใช้ body-parser middleware)

  // เพิ่มหนังสือใหม่ลงใน booksData
  booksData.book.push(newBook);

  // บันทึกข้อมูลลงในไฟล์ books.json (ต้องการการจัดการไฟล์แบบอื่น เช่น fs)
  // ...

  res.json(newBook); // ส่งข้อมูลของหนังสือใหม่ที่ถูกเพิ่ม
});


app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id); // ดึง ID ที่ต้องการแก้ไขจาก request
  const updatedBook = req.body; // ข้อมูลใหม่ที่จะใช้ในการแก้ไข

  // ค้นหาหนังสือที่ต้องการแก้ไขจาก booksData
  const bookToUpdate = booksData.book.find(book => book.id === bookId);

  if (bookToUpdate) {
    // ทำการอัปเดตข้อมูลหนังสือ
    Object.assign(bookToUpdate, updatedBook);

    // บันทึกข้อมูลลงในไฟล์ books.json (ต้องการการจัดการไฟล์แบบอื่น เช่น fs)
    // ...

    res.json(bookToUpdate); // ส่งข้อมูลของหนังสือที่ถูกอัปเดต
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});


app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id); // ดึง ID ที่ต้องการลบจาก request

  // ค้นหาหนังสือที่ต้องการลบจาก booksData
  const bookIndex = booksData.book.findIndex(book => book.id === bookId);

  if (bookIndex !== -1) {
    // ทำการลบข้อมูลหนังสือออกจาก booksData
    booksData.book.splice(bookIndex, 1);

    // บันทึกข้อมูลลงในไฟล์ books.json (ต้องการการจัดการไฟล์แบบอื่น เช่น fs)
    // ...

    res.json({ message: 'Book deleted' });
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
