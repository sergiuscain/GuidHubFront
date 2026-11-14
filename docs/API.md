# GuidHubFront — API-шпаргалка

> Полный OpenAPI — в бэкенде (Scalar). Здесь только то, что реально использует фронт.

## База
- Dev: `https://localhost:7028/api/v1`
- Все запросы: `credentials: 'include'` (JWT в HttpOnly cookie).
- Формат: JSON.

## Auth
- `POST /auth/telegram` — тело `TelegramAuthData` (id, firstName, lastName, username, photoUrl, authDate, hash).
- `POST /auth/logout`
- `POST /auth/dev-login` — только dev, тело `{ username }`.

## Users
- `GET /users/me` — текущий пользователь + роли (в т.ч. Guide).
- `PUT /users/me` — `UpdateMyProfileCommand` (userId, firstName, lastName, middleName, phone, email, dateOfBirth, bloodType, isProfilePublic).
- `DELETE /users/me` — soft-delete.
- `PATCH /users/me/privacy` — `{ isPublic }`.
- `GET /users/me/children`
- `POST /users/me/children` — `{ fullName, dateOfBirth }`.
- `DELETE /users/me/children/{childId}`

## Guides
- `POST /guides/become` — `{ bio, paymentDetails }`.

## Public
- `GET /public/users/{username}`

## Geography
- `GET /geography/countries`
- `GET /geography/countries/{countryId}/regions`
- `GET /geography/regions/{regionId}/cities`
- `GET /geography/cities/{cityId}/locations`
- `POST /geography/cities/{cityId}/locations` — `{ name, description }` (гид).
- `POST /geography/requests` — `{ requestedText, comment }` (гид).

## Tours
- `POST /tours/events` — `CreateEventRequest` (гид).
- `POST /tours/events/{eventId}/publish` (гид).
- `DELETE /tours/events/{eventId}` (гид).
- `GET /tours/events/{eventId}` (публичный).
- `GET /tours/guides/{guideId}/events` (публичный).

## Slots
- `GET /slots/events/{eventId}` (публичный).
- `POST /slots/events/{eventId}` — `{ startsAt, capacity }` (гид).
- `POST /slots/{slotId}/cancel` (гид).

## Bookings
- `POST /bookings` — `CreateBookingRequest` (slotId, eventId, guideId, adultsCount, childrenCount, phone, comment, children[]).