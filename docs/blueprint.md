# **App Name**: Zemen Merchant Hub

## Core Features:

- Merchant Onboarding: Digital onboarding for merchants with KYC document upload and branch-based maker-checker workflow, complying with NBE regulations and AML/KYC requirements. Integrates branch roles (Maker & Approver) to manage onboarding requests.
- Operator Management: Enables merchants to add, edit, deactivate/block, and remove operators/sales agents. Tracks operator performance (sales volume, transaction count, success rate) and reassign operators between merchants/branches. The system allows specifying sales personnel (e.g., bartenders) who accept payments, linking them to specific operators or branches (e.g., CMC branch cafe).
- Dynamic QR Code Generation: Generates dynamic QR codes for specific transaction amounts, following EMVCo Merchant-Presented Mode and the Ethiopian Interoperable QR Standard (EIPQRC). Includes displaying QR codes with amount, merchant name, transaction reference, and expiry (5-10 min).
- OTP-Based Payment: Generates unique OTPs (6-8 digits) with a 120-second validity timer for transactions. Verifies OTP entered by the operator against customer-provided OTP via SMS. Includes security measures such as OTP hashing and rate-limiting.
- Real-time Transaction Monitoring: Monitor the status of ongoing payments via QR or OTP. If any anomaly is detected the central Bank Admin should receive the message. A generative AI tool decides when the pattern is unusual. 
- Reconciliation and Settlement: Daily reconciliation screen to view unsettled transactions and mark as reconciled. Supports auto-reconciliation for QR/instant payments and manual reconciliation for OTP cases. Merchants can initiate dispute/chargeback processes.
- Reporting and Analytics: Provides comprehensive reports at different user levels (Operator, Merchant Admin, Branch, Bank Central) on sales, transactions, onboarding stats, and fraud trends. Allows report filtering by date range, operator, merchant, branch, status, and amount range. Export formats include PDF, Excel, CSV.
- Role-Based Access Control: Implements role-based access control (RBAC) to restrict access to sensitive data and functionalities based on user roles (Bank Admin, Branch User, Merchant Admin, Operator).
- Secure Login: Provides secure login functionality with username/password authentication. Supports two-factor authentication (2FA) for enhanced security.
- Two-Step Approvals: Enforces two-step approvals for critical operations such as merchant onboarding, operator management, and fund transfers.

## Style Guidelines:

- Primary color: #D02149
- Background color: #f2f3f3
- Accent color: #040708
- Headline font: 'Playfair', serif, for an elegant, fashionable, high-end feel.
- Body font: 'PT Sans', sans-serif. Note: currently only Google Fonts are supported.
- Clean, modern icons to represent various functions (payments, reports, users). Ensure icons are intuitive and accessible.
- Well-spaced, intuitive layouts with clear navigation. Use of cards for information blocks to maintain order and clarity.
- Use GoogleFonts.poppins
- Very modern UI with clean lines, generous whitespace, and a focus on user experience. Incorporate subtle animations and transitions to enhance interactivity.