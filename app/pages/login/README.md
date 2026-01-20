# Login Page Documentation

## Summary

The login page (`index.vue`) is a responsive authentication interface built with Nuxt 3, DaisyUI, and Tailwind CSS. It features Google OAuth integration, email/password login, and adaptive dark/light theme support.

## Page Structure

**Route:** `/login`

**Layout:** `app` layout

**Components Used:**

- `AppThemeToggle` - Theme switcher (light/dark mode)
- `Icon` - Nuxt Icon component for email icon

## Features

### 1. Theme Toggle

- Positioned in top-right corner with responsive placement
- Background container: `bg-base-100` with rounded corners
- Desktop: `top-10 right-20` with `p-5` padding
- Mobile: `top-5 right-5` with `p-4` padding
- Z-index applied for proper layering

### 2. Header Section

- **Logo**: SplitEase SVG logo (80x80px)
- **Heading**: "Welcome to SplitEase"
  - Mobile: 16px
  - Desktop: 24px (md breakpoint)
- **Subheading**: "Split expenses seamlessly with your group"
- Centered with `max-w-[480px]` container

### 3. Authentication Card

- White card with rounded corners (`rounded-[20px]`)
- Border: `border-gray-100/20` for subtle outline
- Padding: `p-10`, Gap: `gap-8`

### 4. Google Sign-In Button

- DaisyUI button with responsive sizing
- Google icon (24px) positioned on left
- Border: `border-gray-600`
- Text: "Continue with Google"
- Sizes:
  - Mobile/Small: `btn-md`
  - Large: `btn-lg`
  - Extra Large: `btn-xl`

### 5. Divider

- Horizontal lines with centered text
- Text: "Or continue with email"
- Lines: 1px height with `bg-base-content/20`
- Gap: `gap-4` between elements

### 6. Email/Password Form

**Email Field:**

- Label: "Email address" (left-aligned)
- Icon: Material Symbols email icon (`alternate-email-rounded`)
  - Positioned absolutely at `left-2 top-[33px]`
  - Size: 20px (w-5 h-5)
- Input:
  - Placeholder: "you@example.com"
  - Height: `h-14` (56px)
  - Padding-left: `pl-7` for icon spacing
  - Border: `border-base-content/20`
  - Focus: `focus:border-primary`

**Password Field:**

- Label: "Password" (left side)
- "Forgot password?" link (right side, green `#10b981`)
- Input:
  - Placeholder: """"""""""
  - Type: password
  - Height: `h-14`
  - Border: `border-base-base/20` (Note: possible typo)
  - Focus: `focus:border-primary`

### 7. Sign In Button

- Full-width button (`w-full`)
- Color: `btn-success` (green)
- Height: `h-14`
- Font: semibold, base size
- Rounded: `rounded-lg`
- Top margin: `mt-2`

### 8. Sign Up Link

- Centered text: "Don't have an account?"
- "Sign up" link in green (`#10b981`)
- Hover: underline effect

### 9. Terms Agreement

- Bottom text outside the card
- "By signing in, you agree to our Terms and Service"
- Links have hover underline effect

## Styling Details

**Color Scheme:**

- Primary Green: `#10b981`
- Background: `bg-base-200` (hero)
- Card: `bg-base-100`
- Text: `text-base-content` with opacity variants

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

## Accessibility

- Semantic HTML with proper labels
- Form inputs have associated labels
- Links have hover states
- Placeholder text for inputs
- Focus states on inputs (`focus:border-primary`)

## Theme Support

The page fully supports DaisyUI's light/dark theme modes:

- Uses semantic color classes (`bg-base-100`, `text-base-content`)
- Theme toggle component in top-right
- Automatic color adaptation based on user preference
