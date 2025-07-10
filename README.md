# 🏦 Currency Management Application

Một hệ thống quản lý tiền tệ đầy đủ được xây dựng với **React Native**, **ReactJS**, và **Spring Boot** trong kiến trúc **monorepo**.

## 🚀 Tính năng chính

- **📱 Mobile App**: React Native với Expo, hiển thị danh sách tiền tệ với giao diện native
- **🌐 Web App**: ReactJS + Vite với thiết kế modern và responsive
- **⚡ Backend API**: Spring Boot với REST API và PostgreSQL
- **🐳 Docker**: Containerization hoàn chỉnh với Docker Compose
- **📦 Monorepo**: Yarn workspace để quản lý code đa nền tảng

## 🏗️ Kiến trúc hệ thống

```
currency-management/
├── apps/
│   ├── backend/       # Spring Boot API (Java 17)
│   ├── web/           # ReactJS + Vite frontend
│   └── mobile/        # React Native + Expo app
├── docker/
│   ├── backend.Dockerfile
│   ├── web.Dockerfile
│   ├── nginx.conf
│   └── db-init.sql
├── docker-compose.yml
├── package.json       # Yarn workspace config
└── README.md
```

## 🛠️ Công nghệ sử dụng

| Component | Technology Stack |
|-----------|------------------|
| **Mobile** | React Native + Expo + TypeScript |
| **Web** | ReactJS + Vite + TypeScript |
| **Backend** | Java 17 + Spring Boot + JPA |
| **Database** | PostgreSQL |
| **API Documentation** | OpenAPI 3.0 + Swagger UI |
| **Container** | Docker + Docker Compose |
| **Package Manager** | Yarn Workspaces |

## 📋 Yêu cầu hệ thống

- **Docker** và **Docker Compose**
- **Node.js** 18+ và **Yarn**
- **Java 17** (nếu chạy backend local)
- **Expo CLI** (nếu chạy mobile local)

## 🚀 Hướng dẫn cài đặt và chạy

### 1. Clone repository

```bash
git clone <repository-url>
cd currency-management
```

### 2. Cài đặt dependencies

```bash
yarn install
```

### 3. Chạy với Docker (Khuyến nghị)

```bash
# Khởi động toàn bộ hệ thống
docker-compose up --build

# Chạy trong background
docker-compose up -d --build
```

### 4. Truy cập ứng dụng

- **Web App**: http://localhost:5173
- **Backend API**: http://localhost:8080/api/currencies
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **API Documentation**: http://localhost:8080/api-docs
- **PostgreSQL**: localhost:5432

### 5. Chạy Mobile App (Local)

```bash
# Cài đặt Expo CLI nếu chưa có
npm install -g @expo/cli

# Chạy mobile app
cd apps/mobile
yarn start

# Hoặc
yarn android  # Cho Android
yarn ios      # Cho iOS
```

## 📱 Demo Video
[![Demo video](https://i.ibb.co/HpBTV0Rk/Screenshot-2025-07-10-at-07-42-22.png)](https://drive.google.com/file/d/1OflkRBlFywQRpdclfFuPUruhmbMR62AJ/view?usp=sharing)

### Web Application
- Giao diện web responsive với design hiện đại
- Hiển thị danh sách tiền tệ với tỷ giá
- Loading states và error handling

### Mobile Application  
- Native UI components
- Pull-to-refresh functionality
- Smooth animations và transitions

## 🗃️ Dữ liệu mẫu

Hệ thống tự động khởi tạo với 11 loại tiền tệ:

| Currency | Name | Symbol | Exchange Rate |
|----------|------|--------|---------------|
| USD | United States Dollar | $ | 1.0 |
| EUR | Euro | € | 0.92 |
| JPY | Japanese Yen | ¥ | 110.0 |
| GBP | British Pound | £ | 0.78 |
| AUD | Australian Dollar | A$ | 1.35 |
| CAD | Canadian Dollar | C$ | 1.30 |
| CHF | Swiss Franc | CHF | 0.89 |
| CNY | Chinese Yuan | ¥ | 7.12 |
| KRW | South Korean Won | ₩ | 1320.0 |
| INR | Indian Rupee | ₹ | 83.1 |
| VND | Vietnamese Dong | ₫ | 24500.0 |

## 🔌 API Endpoints

### GET `/api/currencies`
Lấy danh sách tất cả tiền tệ

**Response:**
```json
[
  {
    "id": 1,
    "code": "USD",
    "name": "United States Dollar", 
    "symbol": "$",
    "exchangeRate": 1.0000,
    "createdAt": "2024-01-01T10:30:00",
    "updatedAt": "2024-01-01T10:30:00"
  },
  {
    "id": 2,
    "code": "EUR",
    "name": "Euro",
    "symbol": "€",
    "exchangeRate": 0.9200,
    "createdAt": "2024-01-01T10:30:00",
    "updatedAt": "2024-01-01T10:30:00"
  }
]
```

### GET `/api/currencies/paged`
Lấy danh sách tiền tệ có phân trang

**Query Parameters:**
- `page` (optional): Số trang (bắt đầu từ 0, default: 0)
- `size` (optional): Số lượng phần tử mỗi trang (default: 10)
- `sortBy` (optional): Sắp xếp theo trường nào (default: "code")
- `sortDir` (optional): Hướng sắp xếp "asc" hoặc "desc" (default: "asc")

**Example:** `/api/currencies/paged?page=0&size=5&sortBy=name&sortDir=asc`

**Response:**
```json
{
  "content": [
    {
      "id": 1,
      "code": "USD",
      "name": "United States Dollar",
      "symbol": "$",
      "exchangeRate": 1.0000,
      "createdAt": "2024-01-01T10:30:00",
      "updatedAt": "2024-01-01T10:30:00"
    }
  ],
  "page": 0,
  "size": 5,
  "totalElements": 11,
  "totalPages": 3,
  "first": true,
  "last": false,
  "numberOfElements": 5,
  "empty": false
}
```

### GET `/api/currencies/{code}`
Lấy thông tin tiền tệ theo mã

**Path Parameters:**
- `code`: Mã tiền tệ (VD: USD, EUR, VND)

**Response:**
```json
{
  "id": 1,
  "code": "USD",
  "name": "United States Dollar",
  "symbol": "$", 
  "exchangeRate": 1.0000,
  "createdAt": "2024-01-01T10:30:00",
  "updatedAt": "2024-01-01T10:30:00"
}
```

### POST `/api/currencies`
Tạo tiền tệ mới

**Request Body:**
```json
{
  "code": "SGD",
  "name": "Singapore Dollar",
  "symbol": "S$",
  "exchangeRate": 1.3500
}
```

**Response:**
```json
{
  "id": 12,
  "code": "SGD",
  "name": "Singapore Dollar",
  "symbol": "S$",
  "exchangeRate": 1.3500,
  "createdAt": "2024-01-01T10:30:00",
  "updatedAt": "2024-01-01T10:30:00"
}
```

### PUT `/api/currencies/{id}`
Cập nhật thông tin tiền tệ

**Path Parameters:**
- `id`: ID của tiền tệ cần cập nhật

**Request Body:**
```json
{
  "code": "EUR",
  "name": "Euro",
  "symbol": "€",
  "exchangeRate": 0.8500
}
```

**Response:**
```json
{
  "id": 2,
  "code": "EUR",
  "name": "Euro",
  "symbol": "€",
  "exchangeRate": 0.8500,
  "createdAt": "2024-01-01T10:30:00",
  "updatedAt": "2024-01-01T15:45:00"
}
```

### DELETE `/api/currencies/{id}`
Xóa tiền tệ khỏi hệ thống

**Path Parameters:**
- `id`: ID của tiền tệ cần xóa

**Response:** 
- Status Code: 204 (No Content)

### Error Responses

**400 Bad Request:**
```json
{
  "timestamp": "2024-01-01T10:30:00.000+00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/currencies"
}
```

**404 Not Found:**
```json
{
  "timestamp": "2024-01-01T10:30:00.000+00:00",
  "status": 404,
  "error": "Not Found",
  "message": "Currency not found",
  "path": "/api/currencies/XYZ"
  }
  ```

## 📚 API Documentation

Hệ thống tích hợp **Swagger UI** để cung cấp documentation tương tác cho API:

- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **OpenAPI JSON**: http://localhost:8080/api-docs

### Tính năng Swagger UI:
- Xem tất cả endpoints với mô tả chi tiết
- Test API trực tiếp từ giao diện web
- Xem schema của request/response
- Tự động generate code examples
- Validation dữ liệu đầu vào

### Sử dụng Swagger UI:
1. Khởi động backend server
2. Truy cập http://localhost:8080/swagger-ui.html
3. Chọn endpoint muốn test
4. Nhấn "Try it out" để nhập dữ liệu
5. Nhấn "Execute" để gửi request

## 🔧 Development Commands

```bash
# Cài đặt dependencies cho tất cả packages
yarn install

# Chạy web app (development)
cd apps/web && yarn dev

# Chạy mobile app
cd apps/mobile && yarn start
```

## 🐳 Docker Commands

```bash
# Build và chạy tất cả services
docker-compose up --build

# Chạy specific service
docker-compose up postgres backend

# Stop tất cả services
docker-compose down

# View logs
docker-compose logs -f backend

# Rebuild một service
docker-compose up --build web
```

## 📁 Project Structure Details

### Backend (Spring Boot)
- **Entity**: JPA entities cho database mapping
- **Repository**: Data access layer với Spring Data JPA
- **Service**: Business logic layer
- **Controller**: REST API endpoints với CORS support

### Web (ReactJS + Vite)
- **Components**: React components với TypeScript
- **Services**: API client với Axios
- **Styles**: CSS modules với modern design

### Mobile (React Native + Expo)
- **Components**: Native UI components
- **Services**: API integration cho mobile
- **Navigation**: Screen management

## 🔒 Cấu hình bảo mật

- CORS được cấu hình cho development
- Database credentials trong environment variables
- API endpoints được bảo vệ với validation

## 🚀 Deployment

### Production Deployment
1. Update environment variables trong docker-compose.yml
2. Configure reverse proxy (nginx) cho production
3. Setup SSL certificates
4. Configure database backup strategy

### Mobile App Deployment
1. Build APK/IPA với Expo
2. Submit lên App Store/Google Play
3. Configure production API endpoints
---

**Lưu ý**: Đây là project demo cho mục đích đánh giá kỹ năng. Trong production, cần thêm authentication, authorization, error handling, logging, monitoring, và testing coverage.

### Liên hệ
Nếu bạn có bất kỳ câu hỏi nào hoặc cần làm rõ về bất kỳ giải pháp nào, xin vui lòng liên hệ với tôi qua:
Email: nguyenthuy220495@gmail.com

### Cảm ơn bạn đã xem xét đơn ứng tuyển của tôi cho vị trí Senior FrontEnd Developer.