# Signup Page Documentation

## Summary

The signup page (`index.vue`) is a responsive user registration interface built with Nuxt 3, DaisyUI, and Tailwind CSS. It features Google OAuth integration, email/password registration with validation, and adaptive dark/light theme support.

## Page Structure

**Route:** `/signup`

**Layout:** `app` layout

**Components Used:**

- `AppThemeToggle` - Theme switcher (light/dark mode)
- `Icon` - Nuxt Icon component for form field icons

## Features

### 1. Theme Toggle

- Positioned in top-right corner with responsive placement
- Background container: `bg-base-100` with rounded corners (`rounded-[20px]`)
- Desktop: `top-10 right-20` with `p-5` padding
- Mobile: `top-5 right-5` with `p-4` padding
- Z-index applied for proper layering

### 2. Header Section

- **Logo**: SplitEase SVG logo (80x80px)
- **Heading**: "Welcome to SplitEase"
  - Mobile: 16px
  - Desktop: 24px (md breakpoint)
- **Subheading**: "Join SplitEase and start splitting expenses"
- Centered with `max-w-[480px]` container

### 3. Authentication Card

- White card with rounded corners (`rounded-[20px]`)
- Border: `border-gray-100/20` for subtle outline
- Padding: `p-10`, Gap: `gap-8`

### 4. Google Sign-Up Button

- DaisyUI button with responsive sizing
- Google icon (20px) positioned on left
- Border: `border-gray-600`
- Text: "Continue with Google"
- Sizes:
  - Mobile/Small: `btn-md`
  - Large: `btn-lg`
  - Extra Large: `btn-xl`

### 5. Divider

- Horizontal lines with centered text
- Text: "Or register with email"
- Lines: 1px height with `bg-base-content/20`
- Gap: `gap-4` between elements

### 6. Registration Form

**Full Name Field:**

- Label: "Full name" (left-aligned)
- Icon: Material Symbols person icon (`person-outline-rounded`)
  - Positioned absolutely at `left-2 top-[33px]`
  - Size: 20px (w-5 h-5)
- Input:
  - Placeholder: "John Doe"
  - Height: `h-14` (56px)
  - Padding-left: `pl-7` for icon spacing
  - Border: `border-base-content/20`
  - Focus: `focus:outline-[#10b981]`
- Validation: Required field

**Email Field:**

- Label: "Email address" (left-aligned)
- Icon: Material Symbols email icon (`alternate-email-rounded`)
- Input:
  - Placeholder: "you@example.com"
  - Height: `h-14`
  - Padding-left: `pl-7`
- Validation: Required, valid email format (regex pattern)

**Password Field:**

- Label: "Password"
- Icon: Material Symbols lock icon (`lock-outline-rounded`)
- Input:
  - Placeholder: "••••••••"
  - Type: password
  - Height: `h-14`
- Validation: Required field

**Confirm Password Field:**

- Label: "Confirm password"
- Icon: Material Symbols lock icon (`lock-outline-rounded`)
- Input:
  - Placeholder: "••••••••"
  - Type: password
  - Height: `h-14`
- Validation: Required, must match password field

### 7. Form Validation

The form includes client-side validation with the following rules:

- **Full Name**: Required (cannot be empty or whitespace)
- **Email**: Required, must match valid email regex pattern
- **Password**: Required
- **Confirm Password**: Required, must match password field

Error states:

- Fields display red border (`border-red-500`) when validation fails
- Error messages appear below fields in red (`text-red-500 text-sm`)
- Validation triggers on form submission

### 8. Create Account Button

- Full-width button (`w-full`)
- Color: `btn-success` (green)
- Height: `h-14`
- Font: semibold, base size (xl on large screens)
- Rounded: `rounded-lg`
- Top margin: `mt-2`
- Text: "Create an Account"

### 9. Sign In Link

- Centered text: "Already have an account?"
- "Sign in" link in green (`#10b981`)
- Hover: underline effect
- Links to `/login` page

### 10. Terms Agreement

- Bottom text outside the card
- "By signing in, you agree to our Terms and Service"
- Links have hover underline effect

## Styling Details

**Color Scheme:**

- Primary Green: `#10b981`
- Background: `bg-base-200` (hero)
- Card: `bg-base-100`
- Text: `text-base-content` with opacity variants
- Error: `text-red-500`, `border-red-500`

**Responsive Breakpoints:**

- Mobile: Default styles
- Medium (md): Adjusted padding and font sizes
- Large (lg): Larger button sizes and positioning
- Extra Large (xl): Maximum button size

**Layout:**

- Container: `max-w-[480px]` for consistent width
- Form elements: `max-w-md` (448px)
- All content centered with `mx-auto`
- Flexbox with column direction

## Typography

**Font Family:** DM Sans (from global CSS)

**Text Sizes:**

- Labels: `text-sm`
- Body: `text-base`
- Heading: `text-[24px]` on desktop
- Small text: `text-sm` for links/notes
- Button (lg): `text-xl`

## Accessibility

- Semantic HTML with proper labels
- Form inputs have associated labels
- Links have hover states
- Placeholder text for inputs
- Focus states on inputs (`focus:outline-[#10b981]`)
- Error messages for screen readers
- Validation feedback with visual indicators

## Theme Support

The page fully supports DaisyUI's light/dark theme modes:

- Uses semantic color classes (`bg-base-100`, `text-base-content`)
- Theme toggle component in top-right
- Automatic color adaptation based on user preference
