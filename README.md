# 🛒 Farmer's Market Web Application

A MERN stack-based web application that connects farmers and buyers. Farmers can list products, and buyers can browse, request, and purchase them. The system manages authentication, product listings, order requests, and status tracking.

---

## 📁 Project Structure

```
farmer-market-app/
├── Frontend(Client)/                # React frontend
│   ├── src/
│   │   ├── components/    # Shared components like Navbar and Buyer and Farmer specific pages
│   │   ├── App.js         # Main routing file
│   │   └── index.js
│   └── package.json       # React dependencies
├── Backend(Server)/
│   ├── models/            # Mongoose models
│   │   ├── Buyer.js
│   │   ├── Farmer.js
│   │   ├── Product.js
│   │   └── Request.js
│   ├── routes/            # API route handlers
│   │   ├── buyerRoutes.js
│   │   ├── farmerRoutes.js
│   │   ├── productRoutes.js
│   │   └── requestRoutes.js
│   ├── server.js          # Express server entry point
│   └── package.json       # Backend dependencies
```

---

## ⚙️ Technologies Used

- **Frontend**: React.js, Axios, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Styling**: CSS (with page-specific stylesheets)

---

## 🚀 Features

### 👨‍🌾 Farmer
- Register and login
- Add and manage products (with image, price, quantity)
- View requests from buyers
- Mark requests as Accepted or Rejected
- View sold products in the "Sold" page

### 🧑‍🌾 Buyer
- Register and login
- View farmers and their listed products
- Request products
- View request status (Pending, Accepted)
- Cancel pending requests
- View bought products in the "Bought" page (if Accepted)

---

## 🧪 Installation Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/farmer-market-app.git
cd farmer-market-app
```

### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file (if using env variables), or set MongoDB URI directly in `server.js`:

```js
mongoose.connect('mongodb://localhost:27017/farmer_market')
```

Start the server:

```bash
node server.js
```

### 3. Setup the Frontend

```bash
cd ../frontend
npm install
npm start
```

Frontend will run on `http://localhost:3000`.

---

## 🔗 API Endpoints (Examples)

### Farmers
- `POST /api/farmers/register`
- `POST /api/farmers/login`
- `GET /api/farmers/:phone`

### Buyers
- `POST /api/buyers/register`
- `POST /api/buyers/login`

### Products
- `POST /api/products`
- `GET /api/products/:farmerPhone`

### Requests
- `POST /api/requests`
- `GET /api/requests/buyer/:buyerPhone`
- `GET /api/requests/:farmerPhone`
- `DELETE /api/requests/:id`
- `PATCH /api/requests/:id`

---

## 📝 Future Improvements

- Email notifications
- Chat functionality between buyer and farmer
- Sorting/filtering products

---

## 🧑‍💻 Author

Made with ❤️ by Bhargavi
