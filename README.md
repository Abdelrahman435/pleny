# Restaurant API – Part 1

##  Overview

NestJS RESTful API for managing restaurant data.  
Includes Swagger documentation for easy testing and endpoint exploration.

---

## How to Run

```bash
# Clone the repository
git clone https://github.com/Abdelrahman435/pleny.git

# Move to the project folder
cd pleny

# Install dependencies
npm install

# Run the server
npm run start:dev
Open Swagger at:

bash
Copy code
http://localhost:4000/api

 Example Request
json
Copy code
POST /restaurants
{
  "nameAr": "كرم الشام",
  "nameEn": "Karam Elsham",
  "slugName": "any2",
  "cuisines": ["shawarma"],
  "location": {
    "type": "Point",
    "coordinates": [31.2357, 30.0444]
  }
}

Tech Stack
bash
Copy code
- NestJS
- TypeScript
- MongoDB
- Mongoose
- Swagger (OpenAPI)
```
