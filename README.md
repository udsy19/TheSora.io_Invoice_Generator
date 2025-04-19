# Sora Invoice and Contract Generator

## Project info

A professional tool for photographers to generate branded invoices and contracts.

## How can I edit this code?

There are several ways of editing your application.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Login System Integration

The application uses Auth0 for authentication. The login page provides secure access to the invoice and contract generator tools.

## Email Document Feature

The application includes an email feature that allows you to send invoices and contracts directly to clients as PDF attachments. The system uses EmailJS to send emails directly from the browser.

### Setup EmailJS

1. Sign up for a free account at [EmailJS](https://www.emailjs.com/)
2. Create a new email service (e.g., Gmail, Outlook)
3. Create an email template with the following variables:
   - `to_email`: Client's email address
   - `to_name`: Client's name
   - `from_name`: Your business name
   - `doc_type`: Type of document (invoice or contract)
   - `invoice_number`: The invoice number
   - `due_amount`: The total amount due
   - `issue_date`: When the invoice was issued
   - `due_date`: When payment is due
   - `business_contact`: Your contact information
   - `has_attachment`: Boolean indicating if there's an attachment
   - `attachment_name`: The name of the attached file

4. The PDF document is automatically attached when you click the "Email Invoice" or "Email Contract" button.

5. Update the credentials in `src/utils/emailService.ts` with your EmailJS details:
   ```typescript
   const EMAIL_SERVICE_ID = 'your_service_id';
   const EMAIL_TEMPLATE_ID = 'your_template_id';
   const EMAIL_PUBLIC_KEY = 'your_public_key';
   ```

These credentials can be found in your EmailJS dashboard.