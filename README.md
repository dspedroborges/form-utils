# @form-utils/form-utils.js

Form utilities with zero dependencies. Just add attributes to your HTML elements - the library handles the rest.

## Installation

```html
<script src="form-utils.min.js"></script>
```

## Size

- **minified:** ~9.2KB
- **compressed (gzip):** ~3.1KB

## Quick Start

```html
<input mask="999.999.999-99" placeholder="000.000.000-00">
<input lowercase placeholder="type here">
<input uppercase placeholder="TYPE HERE">
<input type="file" accept="image/*">
<input type="password" name="password">
<button show-password="password"></button>

<script src="form-utils.min.js"></script>
```

---

## Features

### Input Masks

Add the `mask` attribute to format input values.

```html
<input mask="999.999.999-99" placeholder="000.000.000-00">
<input mask="(99) 99999-9999" placeholder="(00) 00000-0000">
<input mask="AAA-9999" placeholder="ABC-1234">
```

| Character | Description |
|----------|-------------|
| `9` | Digit (0-9) |
| `A` | Letter (a-z, A-Z) |
| `*` | Any character |

### Case Transform

Auto-transform input as you type.

```html
<input lowercase placeholder="type here">
<input uppercase placeholder="TYPE HERE">
<input capitalize placeholder="john doe">
```

### File Preview

Auto-preview images and videos when selected.

```html
<input type="file" name="upload" accept="image/*">
<div file-preview="upload"></div>
<input type="file" name="video" accept="video/*">
<div file-preview="video"></div>
```

### Float Fields

Decimal number input with formatting.

```html
<input float min="10" max="9999">
```

### Copyable Fields

Add a copy button to any input.

```html
<input value="abc123" name="api-key">
<button copy-input="api-key">Copy</button>
<button copy-input="api-key" copy-input-update="Copied!">Copy</button>
```

### Password Helpers

Show/hide toggle and strength meter for password fields.

```html
<input type="password" name="password">
<button show-password="password"></button>
<span strength="password" strength-messages="Weak;Medium;Strong;Very Strong"></span>
```

### Auto Trim

Automatically trim whitespace on blur (enabled for all inputs).

### File Preview

Preview files when selected.

```html
<input type="file" name="upload" accept="image/*">
<div file-preview="upload"></div>
```

### Copy Button

Add a copy button to any input.

```html
<input value="abc123" name="api-key">
<button copy-input="api-key">Copy</button>
<button copy-input="api-key" copy-input-update="Copied!">Copy</button>
```

### Show/Hide Password

Toggle password visibility.

```html
<input type="password" name="password">
<button show-password="password"></button>
```

### Countdown Timer

Display a countdown to a specific date/time.

```html
<div countdown="2025-12-31T23:59:59"></div>
<div countdown="2025-12-31T23:59:59" countdown-days="d" countdown-hours="h" countdown-minutes="m" countdown-seconds="s"></div>
```

### Clear Input Button

Add a button to clear an input field.

```html
<input type="text" name="search">
<button clear-input="search">Clear</button>
```

### Character Counter

Display character count for inputs.

```html
<textarea name="bio" maxlength="200"></textarea>
<span count-char="bio" count-char-max="200"></span>
```

### Form Autosave

Automatically save form data to localStorage.

```html
<form autosave="my-form">
  <input name="email">
  <textarea name="message"></textarea>
</form>
```

### Dirty Warning

Show warning when leaving page with unsaved changes.

```html
<form dirty-warning>
  <input name="data">
</form>
```

### Only Letters

Restrict input to letters only.

```html
<input only-letters placeholder="letters only">
```

### Only Numbers

Restrict input to numbers only.

```html
<input only-numbers placeholder="numbers only">
```

### Error Display

Programmatically show validation errors.

```javascript
error('email', 'Please enter a valid email');
```

---

## Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Form Utilities Examples</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body { font-family: system-ui, sans-serif; padding: 24px; max-width: 900px; margin: auto; }
    section { margin-bottom: 40px; }
    h2 { margin-bottom: 12px; }
    .field { margin-bottom: 12px; display: flex; flex-direction: column; gap: 4px; }
  </style>
</head>
<body>

  <h1>Form Utilities Demo</h1>

  <section>
    <h2>Masks</h2>

    <div class="field">
      <label>CPF (999.999.999-99)</label>
      <input name="cpf" mask="999.999.999-99" placeholder="000.000.000-00">
    </div>

    <div class="field">
      <label>Phone ((99) 99999-9999)</label>
      <input name="phone" mask="(99) 99999-9999" placeholder="(00) 00000-0000">
    </div>

    <div class="field">
      <label>License Plate (AAA-9999)</label>
      <input name="plate" mask="AAA-9999" placeholder="ABC-1234">
    </div>
  </section>

  <section>
    <h2>Case Transform</h2>

    <div class="field">
      <label>Lowercase</label>
      <input lowercase placeholder="TYPE HERE">
    </div>

    <div class="field">
      <label>Uppercase</label>
      <input uppercase placeholder="type here">
    </div>

    <div class="field">
      <label>Capitalize</label>
      <input capitalize placeholder="john doe">
    </div>
  </section>

  <section>
    <h2>File Preview</h2>

    <div class="field">
      <label>Upload image</label>
      <input type="file" name="image-upload" accept="image/*">
      <div file-preview="image-upload"></div>
    </div>

    <div class="field">
      <label>Upload video</label>
      <input type="file" name="video-upload" accept="video/*">
      <div file-preview="video-upload"></div>
    </div>
  </section>

  <section>
    <h2>Float Field</h2>

    <div class="field">
      <label>Price (min 10, max 9999)</label>
      <input float min="10" max="9999">
    </div>
  </section>

  <section>
    <h2>Copyable</h2>

    <div class="field">
      <label>API Key</label>
      <input name="api-key" value="abc123xyz">
      <button copy-input="api-key">Copy</button>
    </div>
  </section>

  <section>
    <h2>Password Helper</h2>

    <div class="field">
      <label>Password with toggle</label>
      <input type="password" name="password">
      <button show-password="password">Show</button>
    </div>

    <div class="field">
      <label>Password with strength</label>
      <input type="password" name="password-strength">
      <span strength="password-strength" strength-messages="Weak;Medium;Strong;Very Strong"></span>
    </div>
  </section>

  <section>
    <h2>Auto Trim</h2>

    <div class="field">
      <label>Trim on blur</label>
      <input placeholder="   extra spaces   ">
    </div>
  </section>

  <script src="form-utils.min.js"></script>

</body>
</html>
```

---

## Browser Support

Any modern browser. Chrome, Firefox, Safari, Edge all work.

## License

MIT
