<!-- filepath: d:\github\Nezto\docs\api.md -->
# Backend API Documentation

This document provides detailed information about the backend API for the Nezto application.

## Base URL

All API endpoints are relative to the following base URL: `/api`

## Authentication

Most API endpoints require authentication using a JSON Web Token (JWT). The token should be included in the `Authorization` header as a Bearer token or as a cookie named `token`.

- **Obtaining a Token**: Users can obtain a token by authenticating via Google OAuth.
- **Sending a Token**:
    - **Header**: `Authorization: Bearer <YOUR_JWT_TOKEN>`
    - **Cookie**: `token=<YOUR_JWT_TOKEN>`

## API Endpoints

The API is organized into the following resources:

1.  [Authentication (`/auth`)](#authentication-auth)
2.  [Laundry Services (`/laundry`)](#laundry-services-laundry)
3.  [Orders (`/order`)](#orders-order)
4.  [Services (`/services`)](#services-services)
5.  [Users (`/user`)](#users-user)

---

### Authentication (`/auth`)

Handles user authentication and session management.

#### 1. Authenticate User

-   **Endpoint**: `GET /auth/`
-   **Description**: Checks if the user is authenticated by verifying the JWT token (from cookie or Authorization header).
-   **Access**: Public (verifies existing token)
-   **Success Response**:
    -   **Status**: `200 OK`
    -   **Body**: User object (decoded from JWT)
        ```json
        {
            "id": "user_id",
            "email": "user@example.com",
            "name": "User Name",
            "picture": "url_to_picture",
            "role": "user",
            "iat": 1678886400,
            "exp": 1678972800
        }
        ```
-   **Error Response**:
    -   **Status**: `401 Unauthorized`
    -   **Body**:
        ```json
        {
            "message": "Invalid authentication",
            "error": "jwt expired"
        }
        ```

#### 2. Log In / Initiate Google OAuth

-   **Endpoint**: `GET /auth/login`
-   **Description**: Redirects the user to the Google OAuth consent screen.
-   **Access**: Public
-   **Success Response**:
    -   **Status**: `302 Found` (Redirect to Google)
-   **Error Response**: (Handled by Google or server configuration issues)

#### 3. Google OAuth Callback

-   **Endpoint**: `GET /auth/google`
-   **Description**: Handles the callback from Google OAuth. Verifies the `code` query parameter, fetches user information from Google, creates or updates the user in the database, generates a JWT, sets it in a cookie (`token`), and redirects the user to the client endpoint.
-   **Access**: Public (Callback URL)
-   **Request Query Parameters**:
    -   `code` (string, required): The authorization code from Google.
-   **Success Response**:
    -   **Status**: `302 Found` (Redirect to `client.ENDPOINT`)
    -   **Headers**: Sets `token` header and `token` cookie.
-   **Error Response**:
    -   **Status**: `401 Unauthorized`
        ```json
        { "message": "Invalid authentication", "error": "code not found in query" }
        ```
        ```json
        { "message": "Invalid authentication" }
        ```
    -   **Status**: `500 Internal Server Error`
        ```json
        { "code": 500, "message": "server error", "error": "Error message details" }
        ```

#### 4. Log Out

-   **Endpoint**: `GET /auth/logout`
-   **Description**: Clears the `token` cookie, effectively logging out the user from the current device. If `all=true` query parameter is present, it also clears the token from the user's record in the database, logging them out from all devices.
-   **Access**: Authenticated
-   **Request Query Parameters**:
    -   `all` (boolean, optional): If `true`, logs out from all devices.
-   **Success Response**:
    -   **Status**: `200 OK`
        ```json
        { "message": "logged out" }
        ```
        or
        ```json
        { "message": "logged out from all devices" }
        ```
-   **Error Response**:
    -   **Status**: `500 Internal Server Error`
        ```json
        { "message": "server error", "error": "Error message details" }
        ```

---

### Laundry Services (`/laundry`)

Manages laundry service listings and operations.

#### 1. Get All Laundry Services

-   **Endpoint**: `GET /laundry/`
-   **Description**: Retrieves a list of all laundry services, populating owner details.
-   **Access**: Public
-   **Success Response**:
    -   **Status**: `200 OK`
    -   **Body**:
        ```json
        {
            "success": true,
            "count": 1,
            "data": [
                {
                    "_id": "laundry_service_id",
                    "status": true,
                    "location": { "type": "Point", "coordinates": [12.34, 56.78] },
                    "owner": {
                        "_id": "owner_user_id",
                        "name": "Owner Name",
                        "email": "owner@example.com",
                        "phone": "1234567890"
                    },
                    "rating": 4.5,
                    "createdAt": "2023-01-01T00:00:00.000Z",
                    "updatedAt": "2023-01-01T00:00:00.000Z"
                }
            ]
        }
        ```
        If no services are found:
        ```json
        {
            "success": true,
            "count": 0,
            "message": "No laundry services found",
            "data": []
        }
        ```
-   **Error Response**:
    -   **Status**: `500 Internal Server Error`
        ```json
        {
            "success": false,
            "message": "Server error while fetching laundry services",
            "error": "Error message details"
        }
        ```

#### 2. Get Laundry Service by ID

-   **Endpoint**: `GET /laundry/:id`
-   **Description**: Retrieves a specific laundry service by its ID, populating owner details.
-   **Access**: Public
-   **Path Parameters**:
    -   `id` (string, required): The ID of the laundry service.
-   **Success Response**:
    -   **Status**: `200 OK`
    -   **Body**:
        ```json
        {
            "success": true,
            "data": {
                "_id": "laundry_service_id",
                "status": true,
                "location": { "type": "Point", "coordinates": [12.34, 56.78] },
                "owner": {
                    "_id": "owner_user_id",
                    "name": "Owner Name",
                    "email": "owner@example.com",
                    "phone": "1234567890"
                },
                "rating": 4.5
                // ... other fields
            }
        }
        ```
-   **Error Response**:
    -   **Status**: `404 Not Found`
        ```json
        { "success": false, "message": "Laundry service not found" }
        ```
    -   **Status**: `400 Bad Request` (Invalid ID format)
        ```json
        { "success": false, "message": "Invalid ID format" }
        ```
    -   **Status**: `500 Internal Server Error`
        ```json
        {
            "success": false,
            "message": "Server error while fetching laundry service",
            "error": "Error message details"
        }
        ```

#### 3. Create New Laundry Service

-   **Endpoint**: `POST /laundry/`
-   **Description**: Creates a new laundry service. The owner is set to the authenticated user.
-   **Access**: Authenticated (User with 'user' role, implicitly owner)
-   **Request Body**:
    ```json
    {
        "status": true, // optional, defaults to true
        "location": {
            "type": "Point", // required
            "coordinates": [12.345, 67.890] // required, [longitude, latitude]
        }
    }
    ```
-   **Success Response**:
    -   **Status**: `201 Created`
    -   **Body**:
        ```json
        {
            "success": true,
            "message": "Laundry service created successfully",
            "data": {
                "_id": "new_laundry_service_id",
                "status": true,
                "location": { "type": "Point", "coordinates": [12.345, 67.890] },
                "owner": "authenticated_user_id",
                "rating": 0
                // ... other fields
            }
        }
        ```
-   **Error Response**:
    -   **Status**: `400 Bad Request` (Invalid location data)
        ```json
        {
            "success": false,
            "message": "Please provide valid location data with type and coordinates"
        }
        ```
    -   **Status**: `500 Internal Server Error`
        ```json
        {
            "success": false,
            "message": "Server error while creating laundry service",
            "error": "Error message details"
        }
        ```

#### 4. Update Laundry Service

-   **Endpoint**: `PUT /laundry/:id`
-   **Description**: Updates an existing laundry service. Only the owner of the service can perform this action.
-   **Access**: Owner
-   **Path Parameters**:
    -   `id` (string, required): The ID of the laundry service.
-   **Request Body**: (Fields to update)
    ```json
    {
        "status": false,
        "location": { "type": "Point", "coordinates": [-73.987, 40.748] },
        "rating": 4.8 // Note: Rating update might be better handled by a dedicated endpoint
    }
    ```
-   **Success Response**:
    -   **Status**: `200 OK`
    -   **Body**:
        ```json
        {
            "success": true,
            "message": "Laundry service updated successfully",
            "data": { /* updated laundry service object */ }
        }
        ```
-   **Error Response**:
    -   **Status**: `404 Not Found`
    -   **Status**: `403 Forbidden` (Not the owner)
    -   **Status**: `400 Bad Request` (Invalid ID format)
    -   **Status**: `500 Internal Server Error`

#### 5. Delete Laundry Service

-   **Endpoint**: `DELETE /laundry/:id`
-   **Description**: Deletes a laundry service. Only the owner can perform this action.
-   **Access**: Owner
-   **Path Parameters**:
    -   `id` (string, required): The ID of the laundry service.
-   **Success Response**:
    -   **Status**: `200 OK`
    -   **Body**:
        ```json
        { "success": true, "message": "Laundry service deleted successfully" }
        ```
-   **Error Response**:
    -   **Status**: `404 Not Found`
    -   **Status**: `403 Forbidden` (Not the owner)
    -   **Status**: `400 Bad Request` (Invalid ID format)
    -   **Status**: `500 Internal Server Error`

#### 6. Get Nearby Laundry Services

-   **Endpoint**: `GET /laundry/nearby`
-   **Description**: Finds laundry services within a specified distance from given coordinates.
-   **Access**: Public
-   **Request Query Parameters**:
    -   `lat` (number, required): Latitude of the center point.
    -   `lng` (number, required): Longitude of the center point.
    -   `distance` (number, optional): Maximum distance in meters (default: 5000).
-   **Success Response**:
    -   **Status**: `200 OK`
    -   **Body**:
        ```json
        {
            "success": true,
            "count": 1, // number of nearby services found
            "data": [ /* array of laundry service objects */ ]
        }
        ```
-   **Error Response**:
    -   **Status**: `400 Bad Request` (Missing lat/lng)
        ```json
        { "success": false, "message": "Please provide latitude and longitude coordinates" }
        ```
    -   **Status**: `500 Internal Server Error`

#### 7. Update Laundry Service Rating

-   **Endpoint**: `PATCH /laundry/:id/rating`
-   **Description**: Updates the rating of a specific laundry service.
-   **Access**: Authenticated (User with 'user' role)
-   **Path Parameters**:
    -   `id` (string, required): The ID of the laundry service.
-   **Request Body**:
    ```json
    {
        "rating": 4.5 // number, required, between 0 and 5
    }
    ```
-   **Success Response**:
    -   **Status**: `200 OK`
    -   **Body**:
        ```json
        {
            "success": true,
            "message": "Laundry service rating updated successfully",
            "data": { /* updated laundry service object */ }
        }
        ```
-   **Error Response**:
    -   **Status**: `400 Bad Request` (Invalid rating value or ID format)
    -   **Status**: `404 Not Found`
    -   **Status**: `500 Internal Server Error`

#### 8. Toggle Laundry Service Status

-   **Endpoint**: `PATCH /laundry/:id/toggle-status`
-   **Description**: Toggles the active/inactive status of a laundry service.
-   **Access**: Owner
-   **Path Parameters**:
    -   `id` (string, required): The ID of the laundry service.
-   **Success Response**:
    -   **Status**: `200 OK`
    -   **Body**:
        ```json
        {
            "success": true,
            "message": "Laundry service activated successfully", // or "deactivated"
            "data": { /* updated laundry service object with new status */ }
        }
        ```
-   **Error Response**:
    -   **Status**: `404 Not Found`
    -   **Status**: `403 Forbidden` (Not the owner)
    -   **Status**: `400 Bad Request` (Invalid ID format)
    -   **Status**: `500 Internal Server Error`

---

### Orders (`/order`)

Manages orders for laundry services. This section describes a complex order flow involving users, vendors, and riders, with OTP verification steps.

#### 1. Create New Order

-   **Endpoint**: `POST /order/`
-   **Description**: Creates a new order. Initially, the order status is "pending". Notifies the vendor via socket.
-   **Access**: Authenticated
-   **Request Body**:
    ```json
    {
        "price": 25.50,
        "type": "wash_and_fold", // e.g., "wash_and_fold", "dry_cleaning"
        "user": "user_id", // ID of the user placing the order
        "vendor": "vendor_user_id", // ID of the vendor (laundry service owner)
        "pick_time": "2025-05-20T10:00:00.000Z",
        "drop_time": "2025-05-22T14:00:00.000Z"
    }
    ```
-   **Success Response**:
    -   **Status**: `201 Created`
    -   **Body**:
        ```json
        {
            "statusCode": 201,
            "data": { /* created order object */ },
            "message": "Order created successfully. Waiting for vendor acceptance.",
            "success": true
        }
        ```
-   **Error Response**:
    -   **Status**: `400 Bad Request` (Missing fields)
    -   **Status**: `404 Not Found` (User or Vendor not found)
    -   **Status**: `500 Internal Server Error`

#### 2. Vendor Accepts Order

-   **Endpoint**: `POST /order/:id/accept/vendor` (Example, actual route might differ based on `orderHandler.js` structure, assuming `vendorAcceptOrder` is mapped)
-   **Description**: Vendor accepts the order. Generates a `user_otp`, updates order status to "accepted", and notifies nearby riders.
-   **Access**: Authenticated (Vendor)
-   **Path Parameters**:
    -   `id` (string, required): The ID of the order.
-   **Request Body**:
    ```json
    {
        "vendorId": "vendor_user_id" // ID of the authenticated vendor
    }
    ```
-   **Success Response**:
    -   **Status**: `200 OK`
    -   **Body**:
        ```json
        {
            "statusCode": 200,
            "data": { /* updated order object with user_otp and status "accepted" */ },
            "message": "Order accepted by vendor. User OTP generated. Searching for riders.",
            "success": true
        }
        ```
-   **Error Response**:
    -   **Status**: `400 Bad Request` (Invalid order state)
    -   **Status**: `403 Forbidden` (Not authorized vendor)
    -   **Status**: `404 Not Found` (Order or User location not found)
    -   **Status**: `500 Internal Server Error`

#### 3. Rider Accepts Order

-   **Endpoint**: `POST /order/:id/accept/rider` (Example, actual route might differ)
-   **Description**: Rider accepts the order. Assigns the rider to the order, updates status to "rider_assigned", and notifies the user with the `user_otp`.
-   **Access**: Authenticated (Rider)
-   **Path Parameters**:
    -   `id` (string, required): The ID of the order.
-   **Request Body**:
    ```json
    {
        "riderId": "rider_user_id" // ID of the authenticated rider
    }
    ```
-   **Success Response**:
    -   **Status**: `200 OK`
    -   **Body**:
        ```json
        {
            "statusCode": 200,
            "data": { /* updated order object with rider and status "rider_assigned" */ },
            "message": "Rider assigned. User notified with OTP.",
            "success": true
        }
        ```
-   **Error Response**:
    -   **Status**: `400 Bad Request` (Invalid order state)
    -   **Status**: `404 Not Found` (Order or Rider not found)
    -   **Status**: `500 Internal Server Error`

#### 4. Verify User OTP (Rider Collects Laundry)

-   **Endpoint**: `POST /order/:id/verify/user_otp` (Example, actual route might differ)
-   **Description**: Rider verifies the `user_otp` provided by the user upon laundry collection. Generates `vendor_otp`, updates status to "user_verified", and notifies the vendor.
-   **Access**: Authenticated (Rider)
-   **Path Parameters**:
    -   `id` (string, required): The ID of the order.
-   **Request Body**:
    ```json
    {
        "otp": "123456" // User OTP
    }
    ```
-   **Success Response**:
    -   **Status**: `200 OK`
    -   **Body**:
        ```json
        {
            "statusCode": 200,
            "data": { /* updated order object with vendor_otp and status "user_verified" */ },
            "message": "User OTP verified. Vendor OTP generated.",
            "success": true
        }
        ```
-   **Error Response**:
    -   **Status**: `400 Bad Request` (Invalid order state or Invalid OTP)
    -   **Status**: `404 Not Found` (Order not found)
    -   **Status**: `500 Internal Server Error`

#### 5. Verify Vendor OTP (Rider Delivers Laundry)

-   **Endpoint**: `POST /order/:id/verify/vendor_otp` (Example, actual route might differ)
-   **Description**: Rider verifies the `vendor_otp` provided by the vendor upon laundry delivery. Updates status to "completed" and notifies all parties.
-   **Access**: Authenticated (Rider)
-   **Path Parameters**:
    -   `id` (string, required): The ID of the order.
-   **Request Body**:
    ```json
    {
        "otp": "654321" // Vendor OTP
    }
    ```
-   **Success Response**:
    -   **Status**: `200 OK`
    -   **Body**:
        ```json
        {
            "statusCode": 200,
            "data": { /* updated order object with status "completed" and completed_at timestamp */ },
            "message": "Vendor OTP verified. Order completed successfully.",
            "success": true
        }
        ```
-   **Error Response**:
    -   **Status**: `400 Bad Request` (Invalid order state or Invalid OTP)
    -   **Status**: `404 Not Found` (Order not found)
    -   **Status**: `500 Internal Server Error`

#### 6. Get All Orders

-   **Endpoint**: `GET /order/`
-   **Description**: Retrieves all orders with populated user, vendor, and rider details. Supports filtering.
-   **Access**: Authenticated (Admin or relevant user based on filters)
-   **Request Query Parameters**:
    -   `status` (string, optional): Filter by order status (e.g., "pending", "completed").
    -   `type` (string, optional): Filter by order type.
    -   `vendor_id` (string, optional): Filter by vendor ID.
    -   `user_id` (string, optional): Filter by user ID.
-   **Success Response**:
    -   **Status**: `200 OK`
    -   **Body**:
        ```json
        {
            "statusCode": 200,
            "data": [ /* array of sanitized order objects */ ],
            "message": "Orders fetched successfully",
            "success": true
        }
        ```
-   **Error Response**:
    -   **Status**: `500 Internal Server Error`

#### 7. Get Order by ID

-   **Endpoint**: `GET /order/:id`
-   **Description**: Retrieves a specific order by its ID with populated details and calculated distance if applicable.
-   **Access**: Authenticated (User involved in the order or Admin)
-   **Path Parameters**:
    -   `id` (string, required): The ID of the order.
-   **Success Response**:
    -   **Status**: `200 OK`
    -   **Body**:
        ```json
        {
            "statusCode": 200,
            "data": { /* sanitized order object with user, vendor, rider details and distance_km */ },
            "message": "Order fetched successfully",
            "success": true
        }
        ```
-   **Error Response**:
    -   **Status**: `400 Bad Request` (Invalid order ID format)
    -   **Status**: `404 Not Found` (Order not found)
    -   **Status**: `500 Internal Server Error`

#### 8. Update Order by ID

-   **Endpoint**: `PUT /order/:id`
-   **Description**: Updates an order. (General purpose update, specific fields can be updated).
-   **Access**: Authenticated (Admin or specific roles depending on implementation)
-   **Path Parameters**:
    -   `id` (string, required): The ID of the order.
-   **Request Body**: (Fields to update)
    ```json
    {
        "price": 30.00,
        "status": "on_hold"
        // other fields like type, rider, pick_time, drop_time
    }
    ```
-   **Success Response**:
    -   **Status**: `200 OK`
    -   **Body**:
        ```json
        {
            "statusCode": 200,
            "data": { /* updated order object */ },
            "message": "Order updated successfully",
            "success": true
        }
        ```
-   **Error Response**:
    -   **Status**: `400 Bad Request` (Invalid order ID)
    -   **Status**: `404 Not Found` (Order not found)
    -   **Status**: `500 Internal Server Error`

#### 9. Delete Order by ID

-   **Endpoint**: `DELETE /order/:id`
-   **Description**: Deletes an order by its ID.
-   **Access**: Authenticated (Admin or specific roles)
-   **Path Parameters**:
    -   `id` (string, required): The ID of the order.
-   **Success Response**:
    -   **Status**: `200 OK`
    -   **Body**:
        ```json
        {
            "statusCode": 200,
            "data": {},
            "message": "Order deleted successfully",
            "success": true
        }
        ```
-   **Error Response**:
    -   **Status**: `400 Bad Request` (Invalid order ID)
    -   **Status**: `404 Not Found` (Order not found)
    -   **Status**: `500 Internal Server Error`

---

### Services (`/services`)

Manages general services offered (potentially broader than just laundry).

#### 1. Get All Services

-   **Endpoint**: `GET /services/`
-   **Description**: Retrieves a list of all services. Supports filtering by category and pagination.
-   **Access**: Public
-   **Request Query Parameters**:
    -   `category` (string, optional): Filter services by category.
    -   `page` (number, optional): Page number for pagination (10 items per page).
-   **Success Response**:
    -   **Status**: `200 OK`
    -   **Body**:
        ```json
        {
            "success": true,
            "count": 1,
            "data": [
                {
                    "serviceId": "SVC001",
                    "name": "Express Wash",
                    "description": "Quick wash and dry.",
                    "price": 15.99,
                    "category": "Laundry",
                    "popular": true,
                    "turnaround": "24 hours",
                    "icon": "url_to_icon.svg",
                    "isActive": true
                    // ... other fields
                }
            ]
        }
        ```
-   **Error Response**:
    -   **Status**: `500 Internal Server Error`
        ```json
        { "success": false, "message": "Server Error", "error": "Error message details" }
        ```

#### 2. Get Service by ID

-   **Endpoint**: `GET /services/:id`
-   **Description**: Retrieves a single service by its `serviceId`.
-   **Access**: Public
-   **Path Parameters**:
    -   `id` (string, required): The `serviceId` of the service.
-   **Success Response**:
    -   **Status**: `200 OK`
    -   **Body**:
        ```json
        {
            "success": true,
            "data": { /* service object */ }
        }
        ```
-   **Error Response**:
    -   **Status**: `404 Not Found`
        ```json
        { "success": false, "message": "Service not found" }
        ```
    -   **Status**: `500 Internal Server Error`

#### 3. Create New Service

-   **Endpoint**: `POST /services/`
-   **Description**: Creates a new service.
-   **Access**: Admin
-   **Request Body**:
    ```json
    {
        "serviceId": "SVC002", // required, unique
        "name": "Dry Cleaning Deluxe", // required
        "description": "Full dry cleaning service for delicate items.", // required
        "price": 29.99, // required
        "category": "Dry Cleaning", // required
        "popular": false, // optional, defaults to false
        "turnaround": "48 hours", // optional
        "icon": "url_to_another_icon.svg" // optional
    }
    ```
-   **Success Response**:
    -   **Status**: `201 Created`
    -   **Body**:
        ```json
        {
            "success": true,
            "message": "Service created successfully",
            "data": { /* created service object */ }
        }
        ```
-   **Error Response**:
    -   **Status**: `400 Bad Request` (Service with this ID already exists or missing required fields)
    -   **Status**: `500 Internal Server Error`

#### 4. Update Service

-   **Endpoint**: `PUT /services/:id`
-   **Description**: Updates an existing service by its `serviceId`.
-   **Access**: Admin
-   **Path Parameters**:
    -   `id` (string, required): The `serviceId` of the service.
-   **Request Body**: (Fields to update)
    ```json
    {
        "price": 32.99,
        "popular": true
    }
    ```
-   **Success Response**:
    -   **Status**: `200 OK`
    -   **Body**:
        ```json
        {
            "success": true,
            "message": "Service updated successfully",
            "data": { /* updated service object */ }
        }
        ```
-   **Error Response**:
    -   **Status**: `404 Not Found`
    -   **Status**: `500 Internal Server Error`

#### 5. Delete Service

-   **Endpoint**: `DELETE /services/:id`
-   **Description**: Deletes a service by its `serviceId`.
-   **Access**: Admin
-   **Path Parameters**:
    -   `id` (string, required): The `serviceId` of the service.
-   **Success Response**:
    -   **Status**: `200 OK`
    -   **Body**:
        ```json
        { "success": true, "message": "Service deleted successfully" }
        ```
-   **Error Response**:
    -   **Status**: `404 Not Found`
    -   **Status**: `500 Internal Server Error`

#### 6. Toggle Service Active Status

-   **Endpoint**: `PATCH /services/:id/toggle-status`
-   **Description**: Toggles the `isActive` status of a service by its `serviceId`.
-   **Access**: Admin
-   **Path Parameters**:
    -   `id` (string, required): The `serviceId` of the service.
-   **Success Response**:
    -   **Status**: `200 OK`
    -   **Body**:
        ```json
        {
            "success": true,
            "message": "Service activated successfully", // or "deactivated"
            "data": { /* updated service object with new isActive status */ }
        }
        ```
-   **Error Response**:
    -   **Status**: `404 Not Found`
    -   **Status**: `500 Internal Server Error`

#### 7. Get Popular Services

-   **Endpoint**: `GET /services/popular`
-   **Description**: Retrieves a list of all services marked as popular and active.
-   **Access**: Public
-   **Success Response**:
    -   **Status**: `200 OK`
    -   **Body**:
        ```json
        {
            "success": true,
            "count": 1, // number of popular services
            "data": [ /* array of popular and active service objects */ ]
        }
        ```
-   **Error Response**:
    -   **Status**: `500 Internal Server Error`

---

### Users (`/user`)

Manages user accounts.

#### 1. Get All Users

-   **Endpoint**: `GET /user/`
-   **Description**: Retrieves a list of all users. Token is excluded from the response.
-   **Access**: Admin
-   **Success Response**:
    -   **Status**: `200 OK`
    -   **Body**:
        ```json
        {
            "statusCode": 200,
            "data": {
                "users": [
                    {
                        "_id": "user_id_1",
                        "name": "Admin User",
                        "email": "admin@example.com",
                        "picture": "url_to_pic_1",
                        "role": ["admin", "user"]
                        // ... other non-sensitive fields
                    },
                    {
                        "_id": "user_id_2",
                        "name": "Regular User",
                        "email": "user@example.com",
                        "picture": "url_to_pic_2",
                        "role": ["user"]
                    }
                ],
                "count": 2
            },
            "message": "Users fetched successfully",
            "success": true
        }
        ```
-   **Error Response**:
    -   **Status**: `500 Internal Server Error`
        ```json
        { "statusCode": 500, "data": {}, "message": "Failed to fetch users", "error": "Error message details", "success": false }
        ```

#### 2. Get User by ID

-   **Endpoint**: `GET /user/:id`
-   **Description**: Retrieves a specific user by their ID. Token is excluded.
-   **Access**: Authenticated (User can fetch their own profile, Admin can fetch any)
-   **Path Parameters**:
    -   `id` (string, required): The ID of the user.
-   **Success Response**:
    -   **Status**: `200 OK`
    -   **Body**:
        ```json
        {
            "statusCode": 200,
            "data": {
                "user": {
                    "_id": "user_id",
                    "name": "User Name",
                    "email": "user@example.com",
                    "picture": "url_to_picture",
                    "role": ["user"]
                    // ... other non-sensitive fields
                }
            },
            "message": "User fetched successfully",
            "success": true
        }
        ```
-   **Error Response**:
    -   **Status**: `404 Not Found`
        ```json
        { "statusCode": 404, "data": {}, "message": "User not found", "success": false }
        ```
    -   **Status**: `500 Internal Server Error`

#### 3. Update User by ID

-   **Endpoint**: `PATCH /user/:id`
-   **Description**: Updates a user's information (name, picture, location, role).
-   **Access**: Authenticated (User can update their own profile, Admin can update any and change roles)
-   **Path Parameters**:
    -   `id` (string, required): The ID of the user to update.
-   **Request Body**: (Fields to update)
    ```json
    {
        "name": "Updated Name",
        "picture": "new_picture_url.jpg",
        "location": { "type": "Point", "coordinates": [10.12, 20.34] },
        "role": ["user", "vendor"] // Admin only for role changes
    }
    ```
-   **Success Response**:
    -   **Status**: `200 OK`
    -   **Body**:
        ```json
        {
            "statusCode": 200,
            "data": {
                "user": { /* updated user object, token excluded */ }
            },
            "message": "User updated successfully",
            "success": true
        }
        ```
-   **Error Response**:
    -   **Status**: `404 Not Found`
    -   **Status**: `500 Internal Server Error` (e.g., validation error for role)

#### 4. Delete User by ID

-   **Endpoint**: `DELETE /user/:id`
-   **Description**: Deletes a user by their ID.
-   **Access**: Admin
-   **Path Parameters**:
    -   `id` (string, required): The ID of the user to delete.
-   **Success Response**:
    -   **Status**: `200 OK`
    -   **Body**:
        ```json
        {
            "statusCode": 200,
            "data": {},
            "message": "User deleted successfully",
            "success": true
        }
        ```
-   **Error Response**:
    -   **Status**: `404 Not Found`
    -   **Status**: `500 Internal Server Error`

---
**Note**:
- `isOwner` middleware implies that the authenticated user's ID must match the `owner` field of the resource (e.g., Laundry service).
- `hasRole('role_name')` middleware checks if the authenticated user has the specified role. `hasRole()` without arguments likely checks for basic authentication.
- The Order API endpoints involving vendor/rider acceptance and OTP verification (`/accept/vendor`, `/accept/rider`, `/verify/user_otp`, `/verify/vendor_otp`) are illustrative based on the controller function names. The exact route paths should be confirmed from `orderRoute.js` or the main router configuration if they are not standard CRUD operations on `/order/:id/`. The current `orderRoute.js` only shows CRUD operations. These more specific operations might be part of the `updateOrderById` logic based on `status` changes or dedicated routes not shown. For this documentation, I've assumed they might be sub-resources or specific action routes for clarity of the flow described in `orderHandler.js`. If these are handled within the `PUT /order/:id` endpoint, the request body for that endpoint would need to be more complex to signify these specific actions.
