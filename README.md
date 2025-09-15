
# Real-Time Currency Converter App

---

## Getting Started

### 1. Clone the project
```bash
git clone <your_repo_url>
cd currency-converter
````

### 2. Setup Environment Variables

Create a `.env` file inside the **server** folder:

```
API_KEY=your_api_key_here
```

You can get a free API key from [ExchangeRate API](https://v6.exchangerate-api.com).

### 3. Install Dependencies

Open two terminals (one for server, one for client) and install packages:

```bash
# Server
cd server
npm install

# Client
cd ../client
npm install
```

### 4. Run the Project

In two separate terminals, run:

```bash
# Start server
cd server
node index.js

# Start client
cd client
npm start
```

---

## Notes

* Server runs on **[http://localhost:5000](http://localhost:5000)** (or the port defined in your server).
* Client runs on **[http://localhost:3000](http://localhost:3000)**.

