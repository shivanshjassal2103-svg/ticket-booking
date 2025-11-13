# 🎟️ Concurrent Ticket Booking System with Seat Locking and Confirmation  

## 📌 Objective  
Learn how to implement a **ticket booking system in Node.js** that safely handles **concurrent seat reservation requests** using a **seat locking mechanism**.  

## 🚀 Features  
- View available seats  
- Lock a seat temporarily (1 minute timeout)  
- Confirm a locked seat  
- Prevents double booking (race condition safe)  
- Automatic lock expiry after 1 minute  

## 🛠️ Tech Stack  
- Node.js  
- Express.js  

## 📂 Project Structure  
```
.
├── index.js        # Main server file
├── package.json    # Dependencies
└── README.md       # Documentation
```

## ▶️ Setup Instructions  
1. Clone the repo:  
   ```bash
   git clone https://github.com/your-username/ticket-booking-system.git
   cd ticket-booking-system
   ```

2. Install dependencies:  
   ```bash
   npm install
   ```

3. Start the server:  
   ```bash
   node index.js
   ```

4. Server runs at:  
   ```
   http://localhost:3000
   ```

---

## 📡 API Endpoints  

### 1️⃣ Get All Seats  
```http
GET http://localhost:3000/seats
```
**Response:**  
```json
[
  { "id": 1, "status": "available" },
  { "id": 2, "status": "available" },
  { "id": 3, "status": "available" },
  { "id": 4, "status": "available" }
]
```

---

### 2️⃣ Lock a Seat  
```http
POST http://localhost:3000/lock/6
```
**Response:**  
```json
{ "message": "Seat 6 is locked successfully. Confirm within 1 minute" }
```

---

### 3️⃣ Confirm Booking  
```http
POST http://localhost:3000/confirm/6
```
**Response:**  
```json
{ "message": "Seat 6 booked successfully" }
```

---

### 4️⃣ Error: Confirm Without Lock  
```http
POST http://localhost:3000/confirm/2
```
**Response:**  
```json
{ "message": "Seat is not locked and cannot be booked" }
```

---

## 📸 Output  

Here are the sample outputs when running the project:  

![Output 1](/output/output_1.png)  
![Output 2](/output/output_2.png)  
![Output 3](/output/output_3.png)  
![Output 4](/output/output_4.png)  
