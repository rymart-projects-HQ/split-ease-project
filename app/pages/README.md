# Pages

File-based routing. Each `.vue` file or directory with `index.vue` becomes a route.

## Current Routes

| File                     | Route           | Description         |
| ------------------------ | --------------- | ------------------- |
| `index.vue`              | `/`             | Landing page        |
| `login/index.vue`        | `/login`        | User login          |
| `signup/index.vue`       | `/signup`       | User registration   |
| `dashboard/index.vue`    | `/dashboard`    | User dashboard      |
| `landing-page/index.vue` | `/landing-page` | Alternative landing |

## Authentication Pages

### Login (`/login`)

- Email and password authentication
- Google OAuth button (placeholder)
- Form validation with error messages
- Loading state during submission
- Links to signup and forgot password

### Signup (`/signup`)

- Full name, email, password, confirm password fields
- Password requirements: minimum 8 characters
- Form validation with inline errors
- Loading state during submission
- Link to login page

### Shared Features

Both authentication pages include:

- `isLoading` state for form submission tracking
- Inputs disabled during submission
- Button shows loading text ("Logging In" / "Creating Account")
- Logo linked to home page
- Proper `<form>` elements with `@submit.prevent`

## Dynamic Routes (Future)

- `groups/[id].vue` → `/groups/:id`
