/**
 * js/tax-calendar.js
 * PH BIR Tax Calendar 2026.
 *
 * Data source: BIR-linked 2026 Interactive Digital Tax Calendar
 * (tinyurl.com/2026BIRDigitalTaxCalendar -> testtaxcalendar.my.canva.site)
 * Cross-checked against the official BIR Tax Reminder dataset where available.
 * Generated on 2026-05-03.
 */

const DEADLINE_KINDS = {
  // 🟠 Filing / Submission
  "submission":                    { label: "Submission",                       color: "#c2410c", bg: "#eaf2ff", group: "filing" },
  "e-submission":                  { label: "e-Submission",                     color: "#c2410c", bg: "#eaf2ff", group: "filing" },
  "e-filing":                      { label: "e-Filing",                         color: "#c2410c", bg: "#eaf2ff", group: "filing" },
  // 🟢 Payment / Remittance
  "e-payment":                     { label: "e-Payment",                        color: "#15803d", bg: "#e9f8ee", group: "payment" },
  "filing-payment":                { label: "Filing & Payment",                 color: "#15803d", bg: "#e9f8ee", group: "payment" },
  "e-filing-payment":              { label: "e-Filing & Payment",               color: "#15803d", bg: "#e9f8ee", group: "payment" },
  "e-filing-e-payment":            { label: "e-Filing & e-Payment",             color: "#15803d", bg: "#e9f8ee", group: "payment" },
  "filing-payment-remittance":     { label: "Filing & Payment/Remittance",      color: "#15803d", bg: "#e9f8ee", group: "payment" },
  "e-filing-payment-remittance":   { label: "e-Filing & Payment/Remittance",    color: "#15803d", bg: "#e9f8ee", group: "payment" },
  "e-filing-e-payment-remittance": { label: "e-Filing & e-Payment/Remittance",  color: "#15803d", bg: "#e9f8ee", group: "payment" },
  // 🔵 Administrative
  "registration":                  { label: "Registration",                     color: "#2563eb", bg: "#fff3e8", group: "admin" },
  "distribution":                  { label: "Distribution",                     color: "#2563eb", bg: "#fff3e8", group: "admin" },
};

const TAX_DEADLINES = {
  "2026-01-01": [
    {
      "kind": "submission",
      "form": "",
      "label": "Consolidated Return of All Transactions based on the Reconciled Data of Stockbrokers",
      "period": "December 16-31, 2025"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Engagement Letters and Renewals or Subsequent Agreements for Financial Audit by Independent CPAs",
      "period": "Fiscal Year beginning March 1, 2026"
    }
  ],
  "2026-01-05": [
    {
      "kind": "submission",
      "form": "",
      "label": "Summary Report of Certification issued by the President of the National Home Mortgage Finance Corporation (NHMFC)",
      "period": "Month of December 2025"
    },
    {
      "kind": "e-filing-payment",
      "form": "2000",
      "label": "BIR Form 2000 (Monthly Documentary Stamp Tax Declaration/Return)",
      "period": "Month of December 2025"
    },
    {
      "kind": "e-filing-payment",
      "form": "2000-OT",
      "label": "BIR Form 2000-OT (Documentary Stamp Tax Declaration/Return One-Time Transactions)",
      "period": "Month of December 2025"
    }
  ],
  "2026-01-08": [
    {
      "kind": "submission",
      "form": "",
      "label": "All Transcript Sheets of Official Register Books (ORBs) used by Dealers/Manufacturers/Toll Manufacturers/Assemblers/Importers of Alcohol Products, Tobacco Products, Petroleum Products, Non-Essential Goods, Sweetened Beverage Products, Mineral Products & Automobiles",
      "period": "Month of December 2025"
    },
    {
      "kind": "e-submission",
      "form": "",
      "label": "Monthly e-Sales Report for All Taxpayers using CRM/POS and/or Other Similar Business Machines whose last digit of 9-digit TIN is Even Number",
      "period": "Month of December 2025"
    }
  ],
  "2026-01-10": [
    {
      "kind": "submission",
      "form": "",
      "label": "List of Buyers of Sugar (Annex H) Together with a Copy of Certificate of Advance Payment of VAT (Annex E) made by each buyer appearing in the List by a Sugar Cooperative",
      "period": "Month of December 2025"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Information Return on Releases of Refined Sugar (Annex F) by the Proprietor or Operator of a Sugar Refinery or Mill",
      "period": "Month of December 2025"
    },
    {
      "kind": "e-submission",
      "form": "",
      "label": "Monthly e-Sales Report for All Taxpayers using CRM/POS and/or Other Similar Business Machines whose last digit of 9-digit TIN is Odd Number",
      "period": "Month of December 2025"
    },
    {
      "kind": "e-filing-payment-remittance",
      "form": "2200-M",
      "label": "BIR Form 2200-M Excise Tax Return for the Amount of Excise Taxes Collected from Payment Made to Sellers of Metallic Minerals",
      "period": "Month of December 2025"
    },
    {
      "kind": "e-filing-payment",
      "form": "2200-C",
      "label": "BIR Form 2200-C (Excise Tax Return for Cosmetic Procedures) with Monthly Summary of Cosmetic Procedures Performed",
      "period": "Month of December 2025"
    },
    {
      "kind": "e-filing-payment",
      "form": "1600-VT, 1600-PT",
      "label": "BIR Form 1600-VT (Monthly Remittance Return of Value-Added Tax) and/or 1600-PT (Other Percentage Taxes Withheld) and Monthly Alphalist of Payees (MAP) - eFPS & Non-eFPS Filers",
      "period": "Month of December 2025"
    },
    {
      "kind": "e-filing-payment",
      "form": "1606",
      "label": "BIR Form 1606 (Withholding Tax Remittance Return for Onerous Transfer of Real Property Other Than Capital Asset Including Taxable and Exempt)",
      "period": "Month of December 2025"
    },
    {
      "kind": "e-filing-e-payment-remittance",
      "form": "1600-VT, 1600-PT",
      "label": "BIR Form 1600-VT (Monthly Remittance Return of Value-Added Tax) and/or 1600-PT (Other Percentage Taxes Withheld) - National Government Agencies (NGAs)",
      "period": "Month of December 2025"
    }
  ],
  "2026-01-11": [
    {
      "kind": "e-filing",
      "form": "1601-C",
      "label": "BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - eFPS Filers under Group E",
      "period": "Month of December 2025"
    }
  ],
  "2026-01-12": [
    {
      "kind": "e-filing",
      "form": "1601-C",
      "label": "BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - eFPS Filers under Group D",
      "period": "Month of December 2025"
    }
  ],
  "2026-01-13": [
    {
      "kind": "e-filing",
      "form": "1601-C",
      "label": "BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - eFPS Filers under Group C",
      "period": "Month of December 2025"
    }
  ],
  "2026-01-14": [
    {
      "kind": "e-filing",
      "form": "1601-C",
      "label": "BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - eFPS Filers under Group B",
      "period": "Month of December 2025"
    }
  ],
  "2026-01-15": [
    {
      "kind": "registration",
      "form": "",
      "label": "Permanently Bound Loose-Leaf Books of Accounts/Invoices and Other Accounting Records",
      "period": "Calendar Year ending December 31, 2025"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Notarized Income Payee's Sworn Declaration of Gross Sales with required attachments of Individuals to the Payor or Withholding Agent (Annex B1 for Several Income Payors and Annex B2 for Lone Income Payor)",
      "period": "Calendar Year 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "the List of Medical Practitioners",
      "period": "For the Quarter ending December 31, 2025"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Quarterly List (with Monthly Breakdown) of Contractors (Annex A-3) of Gov't. Contracts entered into by the Provinces/Cities/ Municipalities/Barangays",
      "period": "For the Quarter ending December 31, 2025"
    },
    {
      "kind": "e-filing-payment",
      "form": "1601-C",
      "label": "BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - Non-eFPS Filers",
      "period": "Month of December 2025"
    },
    {
      "kind": "e-filing-payment",
      "form": "2200-M",
      "label": "BIR Form 2200-M (Excise Tax Return for Mineral Products)",
      "period": "For the Quarter ending December 31, 2025"
    },
    {
      "kind": "e-filing-payment",
      "form": "1702-RT, 1702-EX, 1702-MX",
      "label": "BIR Form 1702 - RT/1702 - EX/1702 - MX",
      "period": "Fiscal Year ending September 30, 2025"
    },
    {
      "kind": "e-filing-payment",
      "form": "1707-A",
      "label": "BIR Form 1707-A (Annual Capital Gains Tax Return For Onerous Transfer of Shares of Stock Not Traded Through the Local Stock Exchange) - by Corporate Taxpayers",
      "period": "Fiscal Year ending September 30, 2025"
    },
    {
      "kind": "e-filing",
      "form": "1601-C",
      "label": "BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - eFPS Filers under Group A",
      "period": "Month of December 2025"
    },
    {
      "kind": "e-filing-e-payment-remittance",
      "form": "1601-C",
      "label": "BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - National Government Agencies (NGAs)",
      "period": "Month of December 2025"
    }
  ],
  "2026-01-16": [
    {
      "kind": "submission",
      "form": "",
      "label": "Consolidated Return of All Transactions based on the Reconciled Data of Stockbrokers",
      "period": "January 1-15, 2026"
    }
  ],
  "2026-01-20": [
    {
      "kind": "submission",
      "form": "",
      "label": "Quarterly Information on OCWs or OFWs Remittances Exempt from DST furnished by the Local Banks and Non-Bank Money Transfer Agents",
      "period": "For the Quarter ending December 31, 2025"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Quarterly Report of Printer",
      "period": "For the Quarter ending December 31, 2025"
    },
    {
      "kind": "e-filing-payment",
      "form": "1600-WP",
      "label": "BIR Form 1600-WP (Remittance Return of Percentage Tax on Winnings and Prizes Withheld by Race Track Operators) - eFPS & Non-eFPS Filers",
      "period": "Month of December 2025"
    },
    {
      "kind": "e-payment",
      "form": "1601-C",
      "label": "BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - eFPS Filers under Group E, D, C, B & A",
      "period": "Month of December 2025"
    }
  ],
  "2026-01-25": [
    {
      "kind": "submission",
      "form": "",
      "label": "Quarterly Summary List of Sales/Purchases/Importations by a VAT Registered Taxpayers - Non-eFPS Filers",
      "period": "For the Quarter ending December 31, 2025"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Sworn Statement of Manufacturer's or Importer's Volume of Sales of each particular Brand of Alcohol Products, Tobacco Products and Sweetened Beverage Products",
      "period": "For the Quarter ending December 31, 2025"
    },
    {
      "kind": "e-filing-payment",
      "form": "2550Q",
      "label": "BIR Form 2550Q (Quarterly Value-Added Tax Return) - eFPS & Non-eFPS Filers",
      "period": "For the Quarter ending December 31, 2025"
    },
    {
      "kind": "e-filing-payment",
      "form": "2551Q",
      "label": "BIR Form 2551Q (Quarterly Percentage Tax Return) - eFPS & Non-eFPS Filers",
      "period": "For the Quarter ending December 31, 2025"
    },
    {
      "kind": "e-filing-payment",
      "form": "2550-DS",
      "label": "BIR Form 2550-DS (Value-Added Tax (VAT) Return for Nonresident Digital Service Provider)",
      "period": "For the Quarter ending December 31, 2025"
    }
  ],
  "2026-01-29": [
    {
      "kind": "e-filing-payment",
      "form": "1702Q",
      "label": "BIR Form 1702Q (Quarterly Income Tax Return For Corporations, Partnerships and Other Non-Individual Taxpayers) and Summary Alphalist of Withholding Taxes (SAWT)",
      "period": "Fiscal Quarter ending November 30, 2025"
    }
  ],
  "2026-01-30": [
    {
      "kind": "submission",
      "form": "1702-RT, 1702-EX, 1702-MX, 1709",
      "label": "Proof of e-Filed BIR Form 1702-RT/1702-EX/1702-MX with Audited Financial Statements (AFS), 1709 (if applicable), and Other Attachments through Electronic Audited Financial Statements (eAFS)",
      "period": "Fiscal Year ending September 30, 2025"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "the Soft Copies of Inventory List and Schedules stored and saved in DVD-R/USB properly labeled together with a Notarized Sworn Declaration",
      "period": "Calendar Year ending December 31, 2025"
    },
    {
      "kind": "e-submission",
      "form": "",
      "label": "Quarterly Summary List of Sales/ Purchases/Importations by a VAT Registered Taxpayers - eFPS Filers",
      "period": "For the Quarter ending December 31, 2025"
    },
    {
      "kind": "registration",
      "form": "",
      "label": "Computerized Books of Accounts and Other Accounting Records",
      "period": "Calendar Year ending December 31, 2025"
    }
  ],
  "2026-01-31": [
    {
      "kind": "distribution",
      "form": "2316",
      "label": "BIR Form 2316 (Certificate of Compensation Payment/Tax Withheld",
      "period": "For Compensation Payment With or Without Tax Withheld) to the Employees- Calendar Year 2025"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Sworn Declaration of Motels & Other Similar Establishments",
      "period": "Taxable Year 2025"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Sworn Statement by Senior Citizens whose Annual Income does not exceed the poverty level as determined by NEDA thru the NSCB",
      "period": "Taxable Year 2025"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Annual Information by all Accredited Tax Agents/Practitioners to be submitted to RNAB/RRAB",
      "period": "Taxable Year 2025"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Annual Alphabetical List of Professionals/Persons who were issued Professional/Occupational Tax Receipt (PTR/OTR) by LGUs (Annex A-2)",
      "period": "Calendar Year ending December 31, 2025"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Sworn Certification from the International Carrier stating that there is no change in the Domestic Laws of its Home Country Granting Income Tax Exemption to Philippine Carriers",
      "period": "Calendar Year 2026 for Exemptions issued in 2025"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Notarized Income Payor/Withholding Agent's Sworn Declaration with List of Payees Not Subjected To Withholding Tax (Annex B1 for Several Income Payors and Annex B2 for Lone Income Payor)",
      "period": "Calendar Year 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Contract of Lease and Lessee Information Statement and Other Attachments by Lessors/Sub-Lessors of Commercial Establishments, Buildings or Spaces for Tenants",
      "period": "2nd Semester of 2025"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Sworn Statement by every Lessee/Concessionaire/Owner/Operator of Mines or Quarry/Processor of Minerals/Producers or Manufacturers of Mineral Products",
      "period": "2nd Semester of 2025"
    },
    {
      "kind": "e-filing",
      "form": "1604-C, 1604-F",
      "label": "BIR Form 1604-C (Annual Information Return of Income Taxes Withheld on Compensation) and/or BIR Form 1604-F (Annual Information Return of Income Payments Subjected to Final Withholding Taxes) and Related Alphalist",
      "period": "Calendar Year 2025"
    },
    {
      "kind": "e-filing-payment",
      "form": "1601-EQ",
      "label": "BIR Form 1601-EQ (Quarterly Remittance Return of Creditable Income Taxes Withheld-Expanded) and Quarterly Alphalist of Payees (QAP) - eFPS & Non-eFPS Filers",
      "period": "For the Quarter ending December 31, 2025"
    },
    {
      "kind": "e-filing-payment",
      "form": "1601-FQ",
      "label": "BIR Form 1601-FQ (Quarterly Remittance Return of Final Income Taxes Withheld) and Quarterly Alphalist of Payees (QAP) - eFPS & Non-eFPS Filers",
      "period": "For the Quarter ending December 31, 2025"
    },
    {
      "kind": "e-filing-payment",
      "form": "1602Q",
      "label": "BIR Form 1602Q (Quarterly Remittance Return of Final Taxes Withheld on Interest Paid on Deposits and Yield on Deposit Substitutes/Trusts/Etc.) - eFPS & Non-eFPS Filers",
      "period": "For the Quarter ending December 31, 2025"
    },
    {
      "kind": "e-filing-payment",
      "form": "1603Q",
      "label": "BIR Form 1603Q (Quarterly Remittance Return of Final Income Taxes Withheld on Fringe Benefits Paid to Employees Other Than Rank and File) - eFPS & Non-eFPS Filers",
      "period": "For the Quarter ending December 31, 2025"
    },
    {
      "kind": "e-filing-payment",
      "form": "1621",
      "label": "BIR Form 1621 (Quarterly Remittance Return of Tax Withheld on the Amount Withdrawn from Decedent's Deposit Account) - eFPS & Non-eFPS Filers",
      "period": "For the Quarter ending December 31, 2025"
    }
  ],
  "2026-02-01": [
    {
      "kind": "submission",
      "form": "",
      "label": "Consolidated Return of All Transactions based on the Reconciled Data of Stockbrokers",
      "period": "January 16-31, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Engagement Letters and Renewals or Subsequent Agreements for Financial Audit by Independent CPAs",
      "period": "Fiscal Year beginning April 1, 2026"
    }
  ],
  "2026-02-05": [
    {
      "kind": "submission",
      "form": "",
      "label": "Summary Report of Certification issued by the President of the National Home Mortgage Finance Corporation (NHMFC)",
      "period": "Month of January 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2000",
      "label": "BIR Form 2000 (Monthly Documentary Stamp Tax Declaration/Return)",
      "period": "Month of January 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2000-OT",
      "label": "BIR Form 2000-OT (Documentary Stamp Tax Declaration/Return One-Time Transactions)",
      "period": "Month of January 2026"
    }
  ],
  "2026-02-08": [
    {
      "kind": "submission",
      "form": "",
      "label": "All Transcript Sheets of Official Register Books (ORBs) used by Dealers/ Manufacturers/Toll Manufacturers/Assemblers/Importers of Alcohol Products, Tobacco Products, Petroleum Products, Non-Essential Goods, Sweetened Beverage Products, Mineral Products & Automobiles",
      "period": "Month of January 2026"
    },
    {
      "kind": "e-submission",
      "form": "",
      "label": "Monthly e-Sales Report for All Taxpayers using CRM/POS and/or Other Similar Business Machines whose last digit of 9-digit TIN is Even Number",
      "period": "Month of January 2026"
    }
  ],
  "2026-02-10": [
    {
      "kind": "submission",
      "form": "",
      "label": "List of Buyers of Sugar (Annex H) Together with a Copy of Certificate of Advance Payment of VAT (Annex E) made by each buyer appearing in the List by a Sugar Cooperative",
      "period": "Month of January 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Information Return on Releases of Refined Sugar (Annex F) by the Proprietor or Operator of a Sugar Refinery or Mill",
      "period": "Month of January 2026"
    },
    {
      "kind": "e-submission",
      "form": "",
      "label": "Monthly e-Sales Report for All Taxpayers using CRM/POS and/or Other Similar Business Machines whose last digit of 9-digit TIN is Odd Number",
      "period": "Month of January 2026"
    },
    {
      "kind": "e-filing-payment-remittance",
      "form": "2200-M",
      "label": "BIR Form 2200-M Excise Tax Return for the Amount of Excise Taxes Collected from Payment Made to Sellers of Metallic Minerals",
      "period": "Month of January 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - Non-eFPS Filers",
      "period": "Month of January 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2200-C",
      "label": "BIR Form 2200-C (Excise Tax Return for Cosmetic Procedures) with Monthly Summary of Cosmetic Procedures Performed",
      "period": "Month of January 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1600-VT, 1600-PT",
      "label": "BIR Form 1600-VT (Monthly Remittance Return of Value-Added Tax) and/or 1600-PT (Other Percentage Taxes Withheld) and Monthly Alphalist of Payees (MAP) - eFPS & Non-eFPS Filers",
      "period": "Month of January 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1606",
      "label": "BIR Form 1606 (Withholding Tax Remittance Return for Onerous Transfer of Real Property Other Than Capital Asset Including Taxable and Exempt)",
      "period": "Month of January 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "0620",
      "label": "BIR Form 0620 (Monthly Remittance Form of Tax Withheld on the Amount Withdrawn from the Decedent's Deposit Account) - eFPS & Non-eFPS Filers",
      "period": "Month of January 2026"
    },
    {
      "kind": "e-filing-e-payment-remittance",
      "form": "1600-VT, 1600-PT, 1601-C",
      "label": "BIR Form 1600-VT (Monthly Remittance Return of Value-Added Tax) and/or 1600-PT (Other Percentage Taxes Withheld) and BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - National Government Agencies (NGAs)",
      "period": "Month of January 2026"
    }
  ],
  "2026-02-11": [
    {
      "kind": "e-filing",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group E",
      "period": "Month of January 2026"
    }
  ],
  "2026-02-12": [
    {
      "kind": "e-filing",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group D",
      "period": "Month of January 2026"
    }
  ],
  "2026-02-13": [
    {
      "kind": "e-filing",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group C",
      "period": "Month of January 2026"
    }
  ],
  "2026-02-14": [
    {
      "kind": "e-filing",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group B",
      "period": "Month of January 2026"
    }
  ],
  "2026-02-15": [
    {
      "kind": "registration",
      "form": "",
      "label": "Permanently Bound Loose-Leaf Books of Accounts/Invoices and Other Accounting Records",
      "period": "Fiscal Year ending January 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1702-RT, 1702-EX, 1702-MX",
      "label": "BIR Form 1702 - RT/1702 - EX/1702 - MX",
      "period": "Fiscal Year ending October 31, 2025"
    },
    {
      "kind": "e-filing-payment",
      "form": "1707-A",
      "label": "BIR Form 1707-A (Annual Capital Gains Tax Return For Onerous Transfer of Shares of Stock Not Traded Through the Local Stock Exchange) - by Corporate Taxpayers",
      "period": "Fiscal Year ending October 31, 2025"
    },
    {
      "kind": "e-filing-e-payment",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group A",
      "period": "Month of January 2026"
    },
    {
      "kind": "e-payment",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group E, D, C & B",
      "period": "Month of January 2026"
    }
  ],
  "2026-02-16": [
    {
      "kind": "submission",
      "form": "",
      "label": "Consolidated Return of All Transactions based on the Reconciled Data of Stockbrokers",
      "period": "February 1-15, 2026"
    }
  ],
  "2026-02-20": [
    {
      "kind": "e-filing-payment",
      "form": "1600-WP",
      "label": "BIR Form 1600-WP (Remittance Return of Percentage Tax on Winnings and Prizes Withheld by Racetrack Operators) - eFPS & Non-eFPS Filers",
      "period": "Month of January 2026"
    }
  ],
  "2026-02-25": [
    {
      "kind": "submission",
      "form": "",
      "label": "Quarterly Summary List of Sales/Purchases/Importations by a VAT Registered Taxpayers",
      "period": "Non-eFPS Filers- Fiscal Quarter ending January 31, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Sworn Statement of Manufacturer's or Importer's Volume of Sales of each particular Brand of Alcohol Products, Tobacco Products and Sweetened Beverage Products",
      "period": "Fiscal Quarter ending January 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2550Q",
      "label": "BIR Form 2550Q (Quarterly Value-Added Tax Return) - eFPS & Non-eFPS Filers",
      "period": "Fiscal Quarter ending January 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2551Q",
      "label": "BIR Form 2551Q (Quarterly Percentage Tax Return) - eFPS & Non-eFPS Filers",
      "period": "Fiscal Quarter ending January 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2550-DS",
      "label": "BIR Form 2550-DS (Value-Added Tax (VAT) Return for Nonresident Digital Service Provider)",
      "period": "Fiscal Quarter ending January 31, 2026"
    }
  ],
  "2026-02-28": [
    {
      "kind": "submission",
      "form": "2316",
      "label": "the Duplicate Copy of BIR Form 2316 (Certificate of Compensation Payment/Tax Withheld-For Compensation Payment With or Without Tax Withheld) Duly Signed by the Employees Covered by Substituted Filing",
      "period": "Calendar Year 2025"
    }
  ],
  "2026-03-01": [
    {
      "kind": "submission",
      "form": "",
      "label": "Consolidated Return of All Transactions based on the Reconciled Data of Stockbrokers",
      "period": "February 16-28, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Engagement Letters and Renewals or Subsequent Agreements for Financial Audit by Independent CPAs",
      "period": "Fiscal Year beginning May 1, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Annual Alphabetical List of Taxpayers - Annex A-1 (Individual/Corporations) who were issued Provincial/city/Municipal/Barangay Permits to engage in business",
      "period": "Calendar Year ending December 31, 2025"
    },
    {
      "kind": "e-filing",
      "form": "1604-E",
      "label": "BIR Form 1604-E (Annual Information Return of Creditable Income Taxes Withheld-Expanded/Income Payments Exempt from Withholding Tax) and Related Alphalist",
      "period": "Calendar Year ending December 31, 2025"
    },
    {
      "kind": "e-filing-payment",
      "form": "1702Q",
      "label": "BIR Form 1702Q (Quarterly Income Tax Return For Corporations, Partnerships and Other Non-Individual Taxpayers) and Summary Alphalist of Withholding Taxes (SAWT)",
      "period": "For the Fiscal Quarter ending December 31, 2025"
    }
  ],
  "2026-03-02": [
    {
      "kind": "registration",
      "form": "",
      "label": "Computerized Books of Accounts and Other Accounting Records",
      "period": "Calendar Year ending January 31, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "the soft copies of the Inventory List and Schedules stored and saved in DVD-R/USB properly labeled together with Notarized Sworn Declaration",
      "period": "Fiscal Year ending January 31, 2026"
    },
    {
      "kind": "submission",
      "form": "1702-RT, 1702-EX, 1702-MX, 1709",
      "label": "Proof of eFiled BIR Form 1702-RT/1702-EX/1702-MX with Audited Financial Statements (AFS), 1709 (if applicable), and Other Attachments through Electronic Audited Financial Statements (eAFS)",
      "period": "Fiscal Year ending October 31, 2025"
    },
    {
      "kind": "e-submission",
      "form": "",
      "label": "Quarterly Summary List of Sales/Purchases/Importations by a VAT Registered Taxpayers - eFPS Filers",
      "period": "Fiscal Quarter ending January 31, 2026"
    }
  ],
  "2026-03-05": [
    {
      "kind": "submission",
      "form": "",
      "label": "Summary Report of Certification issued by the President of the National Home Mortgage Finance Corporation (NHMFC)",
      "period": "Month of February 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2000",
      "label": "BIR Form 2000 (Monthly Documentary Stamp Tax Declaration/Return)",
      "period": "Month of February 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2000-OT",
      "label": "BIR Form 2000-OT (Documentary Stamp Tax Declaration/Return One-Time Transactions)",
      "period": "Month of February 2026"
    }
  ],
  "2026-03-08": [
    {
      "kind": "submission",
      "form": "",
      "label": "All Transcript Sheets of Official Register Books (ORBs) used by Dealers/Manufacturers/Toll Manufacturers/Assemblers/Importers of Alcohol Products, Tobacco Products, Petroleum Products, Non-Essential Goods, Sweetened Beverage Products, Mineral Products & Automobiles",
      "period": "Month of February 2026"
    },
    {
      "kind": "e-submission",
      "form": "",
      "label": "Monthly e-Sales Report for All Taxpayers using CRM/POS and/or Other Similar Business Machines whose last digit of 9-digit TIN is Even Number",
      "period": "Month of February 2026"
    }
  ],
  "2026-03-10": [
    {
      "kind": "submission",
      "form": "",
      "label": "List of Buyers of Sugar (Annex H) Together with a Copy of Certificate of Advance Payment of VAT (Annex E) made by each buyer appearing in the List by a Sugar Cooperative",
      "period": "Month of February 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Information Return on Releases of Refined Sugar (Annex F) by the Proprietor or Operator of a Sugar Refinery or Mill",
      "period": "Month of February 2026"
    },
    {
      "kind": "e-submission",
      "form": "",
      "label": "Monthly e-Sales Report for All Taxpayers using CRM/POS and/or Other Similar Business Machines whose last digit of 9-digit TIN is Odd Number",
      "period": "Month of February 2026"
    },
    {
      "kind": "e-filing-payment-remittance",
      "form": "2200-M",
      "label": "BIR Form 2200-M Excise Tax Return for the Amount of Excise Taxes Collected from Payment Made to Sellers of Metallic Minerals",
      "period": "Month of February 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - Non-eFPS Filers",
      "period": "Month of February 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2200-C",
      "label": "BIR Form 2200-C (Excise Tax Return for Cosmetic Procedures) with Monthly Summary of Cosmetic Procedures Performed",
      "period": "Month of February 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1600-VT, 1600-PT",
      "label": "BIR Form 1600-VT (Monthly Remittance Return of Value-Added Tax) and/or 1600-PT (Other Percentage Taxes Withheld) and Monthly Alphalist of Payees (MAP) - eFPS & Non-eFPS Filers",
      "period": "Month of February 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1606",
      "label": "BIR Form 1606 (Withholding Tax Remittance Return for Onerous Transfer of Real Property Other Than Capital Asset Including Taxable and Exempt)",
      "period": "Month of February 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "0620",
      "label": "BIR Form 0620 (Monthly Remittance Form of Tax Withheld on the Amount Withdrawn from the Decedent's Deposit Account) - eFPS & Non-eFPS Filers",
      "period": "Month of February 2026"
    },
    {
      "kind": "e-filing-e-payment-remittance",
      "form": "1600-VT, 1600-PT, 1601-C",
      "label": "BIR Form 1600-VT (Monthly Remittance Return of Value-Added Tax) and/or 1600-PT (Other Percentage Taxes Withheld) and BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - National Government Agencies (NGAs)",
      "period": "Month of February 2026"
    }
  ],
  "2026-03-11": [
    {
      "kind": "e-filing",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group E",
      "period": "Month of February 2026"
    }
  ],
  "2026-03-12": [
    {
      "kind": "e-filing",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group D",
      "period": "Month of February 2026"
    }
  ],
  "2026-03-13": [
    {
      "kind": "e-filing",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group C",
      "period": "Month of February 2026"
    }
  ],
  "2026-03-14": [
    {
      "kind": "e-filing",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS filers under Group B",
      "period": "Month of February 2026"
    }
  ],
  "2026-03-15": [
    {
      "kind": "registration",
      "form": "",
      "label": "Permanently Bound Loose-Leaf Books of Accounts/Invoices and Other Accounting Records",
      "period": "Fiscal Year ending February 28, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1702-RT, 1702-EX, 1702-MX",
      "label": "BIR Form 1702 - RT/1702 - EX/1702 - MX",
      "period": "Fiscal Year ending November 30, 2025"
    },
    {
      "kind": "e-filing-payment",
      "form": "1707-A",
      "label": "BIR Form 1707-A (Annual Capital Gains Tax Return For Onerous Transfer of Shares of Stock Not Traded Through the Local Stock Exchange) - by Corporate Taxpayers",
      "period": "Fiscal Year ending November 30, 2025"
    },
    {
      "kind": "e-filing-e-payment",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group A",
      "period": "Month of February 2026"
    },
    {
      "kind": "e-payment",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group E, D,C & B",
      "period": "Month of February 2026"
    }
  ],
  "2026-03-16": [
    {
      "kind": "submission",
      "form": "",
      "label": "Consolidated Return of All Transactions based on the Reconciled Data of Stockbrokers",
      "period": "March 1-15, 2026"
    }
  ],
  "2026-03-20": [
    {
      "kind": "e-filing-payment",
      "form": "1600-WP",
      "label": "BIR Form 1600-WP (Remittance Return of Percentage Tax on Winnings and Prizes Withheld by Racetrack Operators) - eFPS & Non-eFPS Filers",
      "period": "Month of February 2026"
    }
  ],
  "2026-03-25": [
    {
      "kind": "submission",
      "form": "",
      "label": "Quarterly Summary Lists of Sales/Purchases/Importations by a VAT Registered Taxpayers - Non-eFPS Filers",
      "period": "Fiscal Quarter ending February 28, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Sworn Statement of Manufacturer's or Importer's Volume of Sales of each particular Brand of Alcohol Products, Tobacco Products and Sweetened Beverage Products",
      "period": "Fiscal Quarter ending February 28, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2550Q",
      "label": "BIR Form 2550Q (Quarterly Value-Added Tax Return) - eFPS & Non-eFPS Filers",
      "period": "Fiscal Quarter ending February 28, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2551Q",
      "label": "BIR Form 2551Q (Quarterly Percentage Tax Return) - eFPS & Non-eFPS Filers",
      "period": "Fiscal Quarter ending February 28, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2550-DS",
      "label": "BIR Form 2550-DS (Value-Added Tax (VAT) Return for Nonresident Digital Service Provider)",
      "period": "Fiscal Quarter ending February 28, 2026"
    }
  ],
  "2026-03-30": [
    {
      "kind": "submission",
      "form": "1702-RT, 1702-EX, 1702-MX, 1709",
      "label": "Proof of eFiled BIR Form 1702 - RT/1702 - EX/1702 - MX with Audited Financial Statements (AFS), 1709 (if applicable), and Other Attachments through Electronic Audited Financial Statements (eAFS)",
      "period": "Fiscal Year ending November 30, 2025"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "the Soft Copies of Inventory List and Schedules stored and saved in DVD-R/USB properly labeled together with Notarized Sworn Declaration- Fiscal Year ending February 28, 2026",
      "period": ""
    },
    {
      "kind": "e-submission",
      "form": "",
      "label": "Quarterly Summary List of Sales/Purchases/Importations by a VAT Registered Taxpayers - eFPS Filers",
      "period": "Fiscal Quarter ending February 28, 2026"
    },
    {
      "kind": "registration",
      "form": "",
      "label": "Computerized Books of Accounts and Other Accounting Records",
      "period": "Fiscal Year ending February 28, 2026"
    }
  ],
  "2026-04-01": [
    {
      "kind": "e-filing-payment",
      "form": "1702Q",
      "label": "BIR Form 1702Q (Quarterly Income Tax Return For Corporations, Partnerships and Other Non-Individual Taxpayers) and Summary Alphalist of Withholding Taxes (SAWT)",
      "period": "Fiscal Quarter ending January 31, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Consolidated Return of All Transactions based on the Reconciled Data of Stockbrokers",
      "period": "March 16-31, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Engagement Letters and Renewals or Subsequent Agreements for Financial Audit by Independent CPAs",
      "period": "Fiscal Year beginning June 1, 2026"
    }
  ],
  "2026-04-05": [
    {
      "kind": "submission",
      "form": "",
      "label": "Summary Report of Certification issued by the President of the National Home Mortgage Finance Corporation (NHMFC)",
      "period": "Month of March 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2000",
      "label": "BIR Form 2000 (Monthly Documentary Stamp Tax Declaration/Return)",
      "period": "Month of March 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2000-OT",
      "label": "BIR Form 2000-OT (Documentary Stamp Tax Declaration/Return One-Time Transactions)",
      "period": "Month of March 2026"
    }
  ],
  "2026-04-08": [
    {
      "kind": "submission",
      "form": "",
      "label": "All Transcript Sheets of Official Register Books (ORBs) used by Dealers/Manufacturers/Toll Manufacturers/Assemblers/Importers of Alcohol Products, Tobacco Products, Petroleum Products, Non-Essential Goods, Sweetened Beverage Products, Mineral Products & Automobiles",
      "period": "Month of March 2026"
    },
    {
      "kind": "e-submission",
      "form": "",
      "label": "Monthly e-Sales Report for All Taxpayers using CRM/POS and/or Other Similar Business Machines whose last digit of 9-digit TIN is Even Number",
      "period": "Month of March 2026"
    }
  ],
  "2026-04-10": [
    {
      "kind": "submission",
      "form": "",
      "label": "List of Buyers of Sugar (Annex H) Together with a Copy of Certificate of Advance Payment of VAT (Annex E) made by each buyer appearing in the List by a Sugar Cooperative",
      "period": "Month of March 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Information Return on Releases of Refined Sugar (Annex F) by the Proprietor or Operator of a Sugar Refinery or Mill",
      "period": "Month of March 2026"
    },
    {
      "kind": "e-submission",
      "form": "",
      "label": "Monthly e-Sales Report for All Taxpayers using CRM/POS and/or Other Similar Business Machines whose last digit of 9-digit TIN is Odd Number",
      "period": "Month of March 2026"
    },
    {
      "kind": "e-filing-payment-remittance",
      "form": "2200-M",
      "label": "BIR Form 2200-M Excise Tax Return for the Amount of Excise Taxes Collected from Payment Made to Sellers of Metallic Minerals",
      "period": "Month of March 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1601-C",
      "label": "BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - Non-eFPS Filers",
      "period": "Month of March 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2200-C",
      "label": "BIR Form 2200-C (Excise Tax Return for Cosmetic Procedures) with Monthly Summary of Cosmetic Procedures Performed",
      "period": "Month of March 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1600-VT, 1600-PT",
      "label": "BIR Form 1600-VT (Monthly Remittance Return of Value-Added Tax) and/or 1600-PT (Other Percentage Taxes Withheld) and Monthly Alphalist of Payees (MAP) - eFPS & Non-eFPS Filers",
      "period": "Month of March 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1606",
      "label": "BIR Form 1606 (Withholding Tax Remittance Return for Onerous Transfer of Real Property Other Than Capital Asset Including Taxable and Exempt)",
      "period": "Month of March 2026"
    },
    {
      "kind": "e-filing-e-payment-remittance",
      "form": "1600-VT, 1600-PT, 1601-C",
      "label": "BIR Form 1600-VT (Monthly Remittance Return of Value-Added Tax) and/or 1600-PT (Other Percentage Taxes Withheld) and BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - National Government Agencies (NGAs)",
      "period": "Month of March 2026"
    }
  ],
  "2026-04-11": [
    {
      "kind": "e-filing",
      "form": "1601-C",
      "label": "BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - eFPS Filers under Group E",
      "period": "Month of March 2026"
    }
  ],
  "2026-04-12": [
    {
      "kind": "e-filing",
      "form": "1601-C",
      "label": "BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - eFPS Filers under Group D",
      "period": "Month of March 2026"
    }
  ],
  "2026-04-13": [
    {
      "kind": "e-filing",
      "form": "1601-C",
      "label": "BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - eFPS Filers under Group C",
      "period": "Month of March 2026"
    }
  ],
  "2026-04-14": [
    {
      "kind": "e-filing",
      "form": "1601-C",
      "label": "BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - eFPS Filers under Group B",
      "period": "Month of March 2026"
    }
  ],
  "2026-04-15": [
    {
      "kind": "registration",
      "form": "",
      "label": "Permanently Bound Loose-Leaf Books of Accounts/Invoices and Other Accounting Records",
      "period": "Fiscal Year ending March 31, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Updated Master List of newly registered taxpayers & taxpayers whose business permits were renewed from LGUs thru its Local Treasurer",
      "period": "Calendar Year ending December 31, 2025 and 2026 Renewals"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Master List of Retired Businesses from LGU thru its Local Treasurer",
      "period": "Calendar Year ending December 31, 2025"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "the List of Medical Practitioners",
      "period": "For the Quarter ending March 31, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Quarterly List - Annex A-3 (with Monthly Breakdown) of Contractors of Gov't. Contracts entered into by the Provinces/Cities/Municipalities/Barangays",
      "period": "For the Quarter ending March 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1702-RT, 1702-EX, 1702-MX",
      "label": "BIR Form 1702 - RT/ 1702 - EX/ 1702 - MX",
      "period": "Calendar Year ending December 31, 2025"
    },
    {
      "kind": "e-filing-payment",
      "form": "1707-A",
      "label": "BIR Form 1707-A (Annual Capital Gains Tax Return For Onerous Transfer of Shares of Stock Not Traded Through the Local Stock Exchange) - by Individual & Corporate Taxpayers",
      "period": "Calendar Year ending December 31, 2025"
    },
    {
      "kind": "e-filing-payment",
      "form": "2200-M",
      "label": "BIR Form 2200-M (Excise Tax Return for Mineral Products)",
      "period": "For the Quarter ending March 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1700, 1701, 1701A",
      "label": "BIR Forms 1700, 1701, 1701-MS & 1701A",
      "period": "Calendar Year ending December 31, 2025"
    },
    {
      "kind": "e-filing-e-payment",
      "form": "1601-C",
      "label": "BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - eFPS Filers under Group A",
      "period": "Month of March 2026"
    },
    {
      "kind": "e-payment",
      "form": "1601-C",
      "label": "BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - eFPS Filers under Group E, D,C & B",
      "period": "Month of March 2026"
    }
  ],
  "2026-04-16": [
    {
      "kind": "submission",
      "form": "",
      "label": "Consolidated Return of All Transactions based on the Reconciled Data of Stockbrokers",
      "period": "April 1-15, 2026"
    }
  ],
  "2026-04-20": [
    {
      "kind": "submission",
      "form": "",
      "label": "Quarterly Information on OCWs or OFWs Remittances Exempt from DST furnished by the Local Banks & Non-Bank Money Transfer Agents",
      "period": "For the Quarter ending March 31, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Quarterly Report of Printer",
      "period": "For the Quarter ending March 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1600",
      "label": "BIR Form 1600 WP (Remittance Return of Percentage Tax on Winnings and Prizes Withheld by Race Track Operators) - eFPS & Non-eFPS Filers",
      "period": "Month of March 2026"
    }
  ],
  "2026-04-25": [
    {
      "kind": "submission",
      "form": "",
      "label": "Quarterly Summary List of Sales/Purchases/Importations by a VAT Registered Taxpayers - Non-eFPS Filers",
      "period": "For the Quarter ending March 31, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Sworn Statement of Manufacturer's or Importer's Volume of Sales of each particular Brand of Alcohol Products, Tobacco Products and Sweetened Beverage Products",
      "period": "For the Quarter ending March 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2550Q",
      "label": "BIR Form 2550Q (Quarterly Value-Added Tax Return) - eFPS & Non-eFPS Filers",
      "period": "For the Quarter ending March 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2551Q",
      "label": "BIR Form 2551Q (Quarterly Percentage Tax Return) - eFPS & Non-eFPS Filers",
      "period": "For the Quarter ending March 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2550-DS",
      "label": "BIR Form 2550-DS (Value-Added Tax (VAT) Return for Nonresident Digital Service Provider)",
      "period": "For the Quarter ending March 31, 2026"
    }
  ],
  "2026-04-29": [
    {
      "kind": "e-filing-payment",
      "form": "1702Q",
      "label": "BIR Form 1702Q (Quarterly Income Tax Return For Corporations, Partnerships and Other Non-Individual Taxpayers) and Summary Alphalist of Withholding Taxes (SAWT)",
      "period": "Fiscal Quarter ending February 28, 2026"
    }
  ],
  "2026-04-30": [
    {
      "kind": "submission",
      "form": "1700, 1701, 1701A",
      "label": "Attachments to e-Filed BIR Forms 1700, 1701, 1701-MS and 1701A",
      "period": "Calendar Year 2025"
    },
    {
      "kind": "submission",
      "form": "1702-RT, 1702-EX, 1702-MX, 1709",
      "label": "Proof of eFiled BIR Form 1702 - RT/1702 - EX/1702 - MX with Audited Financial Statements (AFS), 1709 (if applicable), and Other Attachments through Electronic Audited Financial Statements (eAFS)",
      "period": "Calendar Year 2025"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "the soft copies of Inventory List and Schedules stored and saved in DVD-R/USB properly labeled together with Notarized Sworn Declaration",
      "period": "Fiscal Year ending March 31, 2026"
    },
    {
      "kind": "e-submission",
      "form": "",
      "label": "Quarterly Summary List of Sales/Purchases/Importations by a VAT Registered Taxpayers - eFPS Filers",
      "period": "For the Quarter ending March 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1601-EQ",
      "label": "BIR Form 1601-EQ (Quarterly Remittance Return of Creditable Income Taxes Withheld-Expanded) and Quarterly Alphalist of Payees (QAP) - eFPS & Non-eFPS Filers",
      "period": "For the Quarter ending March 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1601-FQ",
      "label": "BIR Form 1601-FQ (Quarterly Remittance Return of Final Income Taxes Withheld) and Quarterly Alphalist of Payees (QAP) - eFPS & Non-eFPS Filers",
      "period": "For the Quarter ending March 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1602Q",
      "label": "BIR Form 1602Q (Quarterly Remittance Return of Final Taxes Withheld on Interest Paid on Deposits and Yield on Deposit Substitutes/Trusts/Etc.) - eFPS & Non-eFPS Filers",
      "period": "For the Quarter ending March 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1603Q",
      "label": "BIR Form 1603Q (Quarterly Remittance Return of Final Income Taxes Withheld on Fringe Benefits Paid to Employees Other Than Rank and File) - eFPS & Non-eFPS Filers",
      "period": "For the Quarter ending March 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1621",
      "label": "BIR Form 1621 (Quarterly Remittance Return of Tax Withheld on the Amount Withdrawn from Decedent's Deposit Account) - eFPS & Non-eFPS Filers",
      "period": "For the Quarter ending March 31, 2026"
    },
    {
      "kind": "registration",
      "form": "",
      "label": "Computerized Books of Accounts and Other Accounting Records",
      "period": "Fiscal Year ending March 31, 2026"
    }
  ],
  "2026-05-01": [
    {
      "kind": "submission",
      "form": "",
      "label": "Consolidated Returns of All Transactions based on the Reconciled Data of Stockbrokers",
      "period": "April 16-30, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Engagement Letters and Renewals or Subsequent Agreements for Financial Audit by Independent CPAs",
      "period": "Fiscal Year beginning July 1, 2026"
    }
  ],
  "2026-05-05": [
    {
      "kind": "submission",
      "form": "",
      "label": "Summary Report of Certification issued by the President of the National Home Mortgage Finance Corporation (NHMFC)",
      "period": "Month of April 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2000",
      "label": "BIR Form 2000 (Monthly Documentary Stamp Tax Declaration/Return)",
      "period": "Month of April 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2000-OT",
      "label": "BIR Form 2000-OT (Documentary Stamp Tax Declaration/Return One-Time Transactions)",
      "period": "Month of April 2026"
    }
  ],
  "2026-05-08": [
    {
      "kind": "submission",
      "form": "",
      "label": "All Transcript Sheets of Official Register Books (ORBs) used by Dealers/Manufacturers/Toll Manufacturers/Assemblers/Importers of Alcohol Products, Tobacco Products, Petroleum Products, Non-Essential Goods, Sweetened Beverage Products, Mineral Products & Automobiles",
      "period": "Month of April 2026"
    },
    {
      "kind": "e-submission",
      "form": "",
      "label": "Monthly e-Sales Report for All Taxpayers using CRM/POS and/or Other Similar Business Machines whose last digit of 9-digit TIN is Even Number",
      "period": "Month of April 2026"
    }
  ],
  "2026-05-10": [
    {
      "kind": "submission",
      "form": "",
      "label": "List of Buyers of Sugar (Annex H) Together with a Copy of Certificate of Advance Payment of VAT (Annex E) made by each buyer appearing in the List by a Sugar Cooperative",
      "period": "Month of April 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Information Return on Releases of Refined Sugar (Annex F) by the Proprietor or Operator of a Sugar Refinery or Mill",
      "period": "Month of April 2026"
    },
    {
      "kind": "e-submission",
      "form": "",
      "label": "Monthly e-Sales Report for All Taxpayers using CRM/POS and/or Other Similar Business Machines whose last digit of 9-digit TIN is Odd Number",
      "period": "Month of April 2026"
    },
    {
      "kind": "e-filing-payment-remittance",
      "form": "2200-M",
      "label": "BIR Form 2200-M Excise Tax Return for the Amount of Excise Taxes Collected from Payment Made to Sellers of Metallic Minerals",
      "period": "Month of April 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - Non-eFPS Filers",
      "period": "Month of April 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2200-C",
      "label": "BIR Form 2200-C (Excise Tax Return for Cosmetic Procedures) with Monthly Summary of Cosmetic Procedures Performed",
      "period": "Month of April 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1600-VT, 1600-PT",
      "label": "BIR Form 1600-VT (Monthly Remittance Return of Value-Added Tax) and/or 1600-PT (Other Percentage Taxes Withheld) and Monthly Alphalist of Payees (MAP) - eFPS & Non-eFPS Filers",
      "period": "Month of April 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1606",
      "label": "BIR Form 1606 (Withholding Tax Remittance Return for Onerous Transfer of Real Property Other Than Capital Asset Including Taxable and Exempt)",
      "period": "Month of April 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "0620",
      "label": "BIR Form 0620 (Monthly Remittance Form of Tax Withheld on the Amount Withdrawn from the Decedent's Deposit Account) - eFPS & Non-eFPS Filers",
      "period": "Month of April 2026"
    },
    {
      "kind": "e-filing-e-payment-remittance",
      "form": "1600-VT, 1600-PT, 1601-C",
      "label": "BIR Form 1600-VT (Monthly Remittance Return of Value-Added Tax) and/or 1600-PT (Other Percentage Taxes Withheld) and BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - National Government Agencies (NGAs)",
      "period": "Month of April 2026"
    }
  ],
  "2026-05-11": [
    {
      "kind": "e-filing",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group E",
      "period": "Month of April 2026"
    }
  ],
  "2026-05-12": [
    {
      "kind": "e-filing",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group D",
      "period": "Month of April 2026"
    }
  ],
  "2026-05-13": [
    {
      "kind": "e-filing",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group C",
      "period": "Month of April 2026"
    }
  ],
  "2026-05-14": [
    {
      "kind": "e-filing",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group B",
      "period": "Month of April 2026"
    }
  ],
  "2026-05-15": [
    {
      "kind": "registration",
      "form": "",
      "label": "Permanently Bound Loose-Leaf Books of Accounts/Invoices and Other Accounting Records",
      "period": "Fiscal Year ending April 30, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1702-RT, 1702-EX, 1702-MX",
      "label": "BIR Form 1702 - RT/1702 - EX/1702 - MX",
      "period": "Fiscal Year ending January 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1707-A",
      "label": "BIR Form 1707-A (Annual Capital Gains Tax Return For Onerous Transfer of Shares of Stock Not Traded Through the Local Stock Exchange) - by Corporate Taxpayers",
      "period": "Fiscal Year ending January 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1701Q",
      "label": "BIR Form 1701Q (Quarterly Income Tax Return For Individuals, Estates & Trusts) and Summary Alphalist of Withholding Taxes (SAWT) - eFPS & Non-eFPS Filers",
      "period": "For the Quarter ending March 31, 2026"
    },
    {
      "kind": "e-filing-e-payment",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group A",
      "period": "Month of April 2026"
    },
    {
      "kind": "e-payment",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group E, D, C & B",
      "period": "Month of April 2026"
    }
  ],
  "2026-05-16": [
    {
      "kind": "submission",
      "form": "",
      "label": "Consolidated Return of All Transactions based on the Reconciled Data of Stockbrokers",
      "period": "May 1-15, 2026"
    }
  ],
  "2026-05-20": [
    {
      "kind": "e-filing-payment",
      "form": "1600",
      "label": "BIR Form 1600 WP (Remittance Return of Percentage Tax on Winnings and Prizes Withheld by Race Track Operators) - eFPS & Non-eFPS Filers",
      "period": "Month of April 2026"
    }
  ],
  "2026-05-25": [
    {
      "kind": "submission",
      "form": "",
      "label": "Quarterly Summary List of Sales/Purchases/Importations by a VAT Registered Taxpayers - Non-eFPS Filers",
      "period": "Fiscal Quarter ending April 30, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Sworn Statement of Manufacturer's or Importer's Volume of Sales of each particular Brand of Alcohol Products, Tobacco Products and Sweetened Beverage Products",
      "period": "Fiscal Quarter ending April 30, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2550Q",
      "label": "BIR Form 2550Q (Quarterly Value-Added Tax Return) - eFPS & Non-eFPS Filers",
      "period": "Fiscal Quarter ending April 30, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2551Q",
      "label": "BIR Form 2551Q (Quarterly Percentage Tax Return) - eFPS & Non-eFPS Filers",
      "period": "Fiscal Quarter ending April 30, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2550-DS",
      "label": "BIR Form 2550-DS (Value-Added Tax (VAT) Return for Nonresident Digital Service Provider)",
      "period": "Fiscal Quarter ending April 30, 2026"
    }
  ],
  "2026-05-30": [
    {
      "kind": "submission",
      "form": "1702-RT, 1702-EX, 1702-MX, 1709",
      "label": "Proof of eFiled BIR Form 1702 - RT/1702 - EX/1702 - MX with Audited Financial Statements (AFS), 1709 (if applicable), and Other Attachments through Electronic Audited Financial Statements (eAFS)",
      "period": "Fiscal Year ending January 31, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "the soft copies of Inventory List and Schedules stored and saved in DVD-R/USB properly labeled together with Notarized Sworn Declaration",
      "period": "Fiscal Year ending April 30, 2026"
    },
    {
      "kind": "e-submission",
      "form": "",
      "label": "Quarterly Summary List of Sales/Purchases/Importations by a VAT Registered Taxpayers - eFPS Filers",
      "period": "Fiscal Quarter ending April 30, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1702Q",
      "label": "BIR Form 1702Q (Quarterly Income Tax Return For Corporations, Partnerships and Other Non-Individual Taxpayers) and Summary Alphalist of Withholding Taxes (SAWT)",
      "period": "For the Quarter ending March 31, 2026"
    },
    {
      "kind": "registration",
      "form": "",
      "label": "Computerized Books of Accounts and Other Accounting Records",
      "period": "Fiscal Year ending April 30, 2026"
    }
  ],
  "2026-06-01": [
    {
      "kind": "submission",
      "form": "",
      "label": "Consolidated Returns of All Transactions based on the Reconciled Data of the Stockbrokers",
      "period": "May 16-31, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Engagement Letters and Renewals or Subsequent Agreements for Financial Audit by Independent CPAs",
      "period": "Fiscal Year beginning August 1, 2026"
    }
  ],
  "2026-06-05": [
    {
      "kind": "submission",
      "form": "",
      "label": "Summary Report of Certification issued by the President of the National Home Mortgage Finance Corporation (NHMFC)",
      "period": "Month of May 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2000",
      "label": "BIR Form 2000 (Monthly Documentary Stamp Tax Declaration/Return)",
      "period": "Month of May 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2000-OT",
      "label": "BIR Form 2000-OT (Documentary Stamp Tax Declaration/Return One-Time Transactions)",
      "period": "Month of May 2026"
    }
  ],
  "2026-06-08": [
    {
      "kind": "submission",
      "form": "",
      "label": "All Transcript Sheets of Official Register Books (ORBs) used by Dealers/Manufacturers/Toll Manufacturers/Assemblers/Importers of Alcohol Products, Tobacco Products, Petroleum Products, Non-Essential Goods, Sweetened Beverage Products, Mineral Products & Automobiles",
      "period": "Month of May 2026"
    },
    {
      "kind": "e-submission",
      "form": "",
      "label": "Monthly e-Sales Report for All Taxpayers using CRM/POS and/or Other Similar Business Machines whose last digit of 9-digit TIN is Even Number",
      "period": "Month of May 2026"
    }
  ],
  "2026-06-10": [
    {
      "kind": "submission",
      "form": "",
      "label": "List of Buyers of Sugar (Annex H) Together with a Copy of Certificate of Advance Payment of VAT (Annex E) made by each buyer appearing in the List by a Sugar Cooperative",
      "period": "Month of May 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Information Return on Releases of Refined Sugar (Annex F) by the Proprietor or Operator of a Sugar Refinery or Mill",
      "period": "Month of May 2026"
    },
    {
      "kind": "e-submission",
      "form": "",
      "label": "Monthly e-Sales Report for All Taxpayers using CRM/POS and/or Other Similar Business Machines whose last digit of 9-digit TIN is Odd Number",
      "period": "Month of May 2026"
    },
    {
      "kind": "e-filing-payment-remittance",
      "form": "2200-M",
      "label": "BIR Form 2200-M Excise Tax Return for the Amount of Excise Taxes Collected from Payment Made to Sellers of Metallic Minerals",
      "period": "Month of May 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - Non-eFPS Filers",
      "period": "Month of May 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2200-C",
      "label": "BIR Form 2200-C (Excise Tax Return for Cosmetic Procedures) with Monthly Summary of Cosmetic Procedures Performed",
      "period": "Month of May 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1600-VT, 1600-PT",
      "label": "BIR Form 1600-VT (Monthly Remittance Return of Value-Added Tax) and/or 1600-PT (Other Percentage Taxes Withheld) and Monthly Alphalist of Payees (MAP) - eFPS & Non-eFPS Filers",
      "period": "Month of May 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1606",
      "label": "BIR Form 1606 (Withholding Tax Remittance Return for Onerous Transfer of Real Property Other Than Capital Asset Including Taxable and Exempt)",
      "period": "Month of May 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "0620",
      "label": "BIR Form 0620 (Monthly Remittance Form of Tax Withheld on the Amount Withdrawn from the Decedent's Deposit Account) - eFPS & Non-eFPS Filers",
      "period": "Month of May 2026"
    },
    {
      "kind": "e-filing-e-payment-remittance",
      "form": "1600-VT, 1600-PT, 1601-C",
      "label": "BIR Form 1600-VT (Monthly Remittance Return of Value-Added Tax) and/or 1600-PT (Other Percentage Taxes Withheld) and BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - National Government Agencies (NGAs)",
      "period": "Month of May 2026"
    }
  ],
  "2026-06-11": [
    {
      "kind": "e-filing",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group E",
      "period": "Month of May 2026"
    }
  ],
  "2026-06-12": [
    {
      "kind": "e-filing",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group D",
      "period": "Month of May 2026"
    }
  ],
  "2026-06-13": [
    {
      "kind": "e-filing",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group C",
      "period": "Month of May 2026"
    }
  ],
  "2026-06-14": [
    {
      "kind": "e-filing",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group B",
      "period": "Month of May 2026"
    }
  ],
  "2026-06-15": [
    {
      "kind": "registration",
      "form": "",
      "label": "Permanently Bound Loose-Leaf Books of Accounts/Invoices and Other Accounting Records",
      "period": "Fiscal Year ending May 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1702-RT, 1702-EX, 1702-MX",
      "label": "BIR Form 1702 - RT/1702 - EX/1702 - MX",
      "period": "Fiscal Year ending February 28, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1707-A",
      "label": "BIR Form 1707-A (Annual Capital Gains Tax Return For Onerous Transfer of Shares of Stock Not Traded Through the Local Stock Exchange) - by Corporate Taxpayers",
      "period": "Fiscal Year ending February 28, 2026"
    },
    {
      "kind": "e-filing-e-payment",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group A",
      "period": "Month of May 2026"
    },
    {
      "kind": "e-payment",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group E, D, C & B",
      "period": "Month of May 2026"
    }
  ],
  "2026-06-16": [
    {
      "kind": "submission",
      "form": "",
      "label": "Consolidated Return of All Transactions based on the Reconciled Data of Stockbrokers",
      "period": "June 1-15, 2026"
    }
  ],
  "2026-06-20": [
    {
      "kind": "e-filing-payment",
      "form": "1600",
      "label": "BIR Form 1600 WP (Remittance Return of Percentage Tax on Winnings and Prizes Withheld by Race Track Operators) - eFPS & Non-eFPS Filers",
      "period": "Month of May 2026"
    }
  ],
  "2026-06-25": [
    {
      "kind": "submission",
      "form": "",
      "label": "Quarterly Summary List of Sales/Purchases/Importations by a VAT Registered Taxpayers - Non-eFPS Filers",
      "period": "Fiscal Quarter ending May 31, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Sworn Statement of Manufacturer's or Importer's Volume of Sales of each particular Brand of Alcohol Products, Tobacco Products and Sweetened Beverage Products",
      "period": "Fiscal Quarter ending May 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2550Q",
      "label": "BIR Form 2550Q (Quarterly Value-Added Tax Return) - eFPS & Non-eFPS Filers",
      "period": "Fiscal Quarter ending May 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2551Q",
      "label": "BIR Form 2551Q (Quarterly Percentage Tax Return) - eFPS & Non-eFPS Filers",
      "period": "Fiscal Quarter ending May 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2550-DS",
      "label": "BIR Form 2550-DS (Value-Added Tax (VAT) Return for Nonresident Digital Service Provider)",
      "period": "Fiscal Quarter ending May 31, 2026"
    }
  ],
  "2026-06-29": [
    {
      "kind": "e-filing-payment",
      "form": "1702Q",
      "label": "BIR Form 1702Q (Quarterly Income Tax Return For Corporations, Partnerships and Other Non-Individual Taxpayers) and Summary Alphalist of Withholding Taxes (SAWT)",
      "period": "Fiscal Quarter ending April 30, 2026"
    }
  ],
  "2026-06-30": [
    {
      "kind": "submission",
      "form": "",
      "label": "Manufacturers'/Assemblers'/Importers' Sworn Statement of each Particular Brand/Model of Automobile, Alcohol Products, Tobacco Products and Sweetened Beverage Products",
      "period": "1st Semester of 2026"
    },
    {
      "kind": "submission",
      "form": "1702-RT, 1702-EX, 1702-MX, 1709",
      "label": "Proof of eFiled BIR Form 1702 - RT/1702 - EX/1702 - MX with Audited Financial Statements (AFS), 1709 (if applicable), and Other Attachments through Electronic Audited Financial Statements (eAFS)",
      "period": "Fiscal Year ending February 28, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "the soft copies of Inventory List and Schedules stored and saved in DVD-R/USB properly labeled together with Notarized Sworn Declaration",
      "period": "Fiscal Year ending May 31, 2026"
    },
    {
      "kind": "e-submission",
      "form": "",
      "label": "Quarterly Summary List of Sales/Purchases/ Importations by a VAT Registered Taxpayers - eFPS Filers",
      "period": "Fiscal Quarter ending May 31, 2026"
    },
    {
      "kind": "registration",
      "form": "",
      "label": "Computerized Books of Accounts and Other Accounting Records",
      "period": "Fiscal Year ending May 31, 2026"
    }
  ],
  "2026-07-01": [
    {
      "kind": "submission",
      "form": "",
      "label": "Consolidated Return of All Transactions based on the Reconciled Data of Stockbrokers",
      "period": "June 16-30, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Engagement Letters and Renewals or Subsequent Agreements for Financial Audit by Independent CPAs",
      "period": "Fiscal Year beginning September 1, 2026"
    }
  ],
  "2026-07-05": [
    {
      "kind": "submission",
      "form": "",
      "label": "Summary Report of Certification issued by the President of the National Home Mortgage Finance Corporation (NHMFC)",
      "period": "Month of June 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2000",
      "label": "BIR Form 2000 (Monthly Documentary Stamp Tax Declaration/Return)",
      "period": "Month of June 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2000-OT",
      "label": "BIR Form 2000-OT (Documentary Stamp Tax Declaration/Return One-Time Transactions)",
      "period": "Month of June 2026"
    }
  ],
  "2026-07-08": [
    {
      "kind": "submission",
      "form": "",
      "label": "All Transcript Sheets of Official Register Books (ORBs) used by Dealers/Manufacturers/Toll Manufacturers/Assemblers/Importers of Alcohol Products, Tobacco Products, Petroleum Products, Non-Essential Goods, Sweetened Beverage Products, Mineral Products & Automobiles",
      "period": "Month of June 2026"
    },
    {
      "kind": "e-submission",
      "form": "",
      "label": "Monthly e-Sales Report for All Taxpayers using CRM/POS and/or Other Similar Business Machines whose last digit of 9-digit TIN is Even Number",
      "period": "Month of June 2026"
    }
  ],
  "2026-07-10": [
    {
      "kind": "submission",
      "form": "",
      "label": "List of Buyers of Sugar (Annex H) Together with a Copy of Certificate of Advance Payment of VAT (Annex E) made by each buyer appearing in the List by a Sugar Cooperative",
      "period": "Month of June 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Information Return on Releases of Refined Sugar (Annex F) by the Proprietor or Operator of a Sugar Refinery or Mill",
      "period": "Month of June 2026"
    },
    {
      "kind": "e-submission",
      "form": "",
      "label": "Monthly e-Sales Report for All Taxpayers using CRM/POS and/or Other Similar Business Machines whose last digit of 9-digit TIN is Odd Number",
      "period": "Month of June 2026"
    },
    {
      "kind": "e-filing-payment-remittance",
      "form": "2200-M",
      "label": "BIR Form 2200-M Excise Tax Return for the Amount of Excise Taxes Collected from Payment Made to Sellers of Metallic Minerals",
      "period": "Month of June 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1601-C",
      "label": "BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - Non-eFPS Filers",
      "period": "Month of June 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2200-C",
      "label": "BIR Form 2200-C (Excise Tax Return for Cosmetic Procedures) with Monthly Summary of Cosmetic Procedures Performed",
      "period": "Month of June 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1600-VT, 1600-PT",
      "label": "BIR Form 1600-VT (Monthly Remittance Return of Value-Added Tax) and/or 1600-PT (Other Percentage Taxes Withheld) and Monthly Alphalist of Payees (MAP) - eFPS & Non-eFPS Filers",
      "period": "Month of June 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1606",
      "label": "BIR Form 1606 (Withholding Tax Remittance Return for Onerous Transfer of Real Property Other Than Capital Asset Including Taxable and Exempt)",
      "period": "Month of June 2026"
    },
    {
      "kind": "e-filing-e-payment-remittance",
      "form": "1600-VT, 1600-PT, 1601-C",
      "label": "BIR Form 1600-VT (Monthly Remittance Return of Value-Added Tax) and/or 1600-PT (Other Percentage Taxes Withheld) and BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - National Government Agencies (NGAs)",
      "period": "Month of June 2026"
    }
  ],
  "2026-07-11": [
    {
      "kind": "e-filing",
      "form": "1601-C",
      "label": "BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - eFPS Filers under Group E",
      "period": "Month of June 2026"
    }
  ],
  "2026-07-12": [
    {
      "kind": "e-filing",
      "form": "1601-C",
      "label": "BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - eFPS Filers under Group D",
      "period": "Month of June 2026"
    }
  ],
  "2026-07-13": [
    {
      "kind": "e-filing",
      "form": "1601-C",
      "label": "BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - eFPS Filers under Group C",
      "period": "Month of June 2026"
    }
  ],
  "2026-07-14": [
    {
      "kind": "e-filing",
      "form": "1601-C",
      "label": "BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - eFPS Filers under Group B",
      "period": "Month of June 2026"
    }
  ],
  "2026-07-15": [
    {
      "kind": "registration",
      "form": "",
      "label": "Permanently Bound Loose-Leaf Books of Accounts/Invoices and Other Accounting Records",
      "period": "Fiscal Year ending June 30, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "the List of Medical Practitioners",
      "period": "For the Quarter ending June 30, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Quarterly List (with Monthly Breakdown) of Contractors (Annex A-3) of Gov't. Contracts entered into by the Provinces/Cities/Municipalities/Barangays",
      "period": "For the Quarter ending June 30, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1702-RT, 1702-EX, 1702-MX",
      "label": "BIR Form 1702 - RT / 1702 - EX / 1702 - MX",
      "period": "Fiscal Year ending March 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1707-A",
      "label": "BIR Form 1707-A (Annual Capital Gains Tax Return for Onerous Transfer of Shares of Stock Not Traded Through the Local Stock Exchange) - by Corporate Taxpayers",
      "period": "Fiscal Year ending March 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2200-M",
      "label": "BIR Form 2200-M (Excise Tax Return for Mineral Products)",
      "period": "For the Quarter ending June 30, 2026"
    },
    {
      "kind": "e-filing-e-payment",
      "form": "1601-C",
      "label": "BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - eFPS Filers under Group A",
      "period": "Month of June 2026"
    },
    {
      "kind": "e-payment",
      "form": "1601-C",
      "label": "BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - eFPS Filers under Group E, D ,C & B",
      "period": "Month of June 2026"
    }
  ],
  "2026-07-16": [
    {
      "kind": "submission",
      "form": "",
      "label": "Consolidated Return of All Transactions based on the Reconciled Data of Stockbrokers",
      "period": "July 1-15, 2026"
    }
  ],
  "2026-07-20": [
    {
      "kind": "submission",
      "form": "",
      "label": "Quarterly Information on OCWs or OFWs Remittances Exempt from DST furnished by the Local Banks & Non-Bank Money Transfer Agents",
      "period": "For the Quarter ending June 30, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Quarterly Report of Printer",
      "period": "For the Quarter ending June 30, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1600",
      "label": "BIR Form 1600 WP (Remittance Return of Percentage Tax on Winnings and Prizes Withheld by Race Track Operators) - eFPS & Non-eFPS Filers",
      "period": "Month of June 2026"
    }
  ],
  "2026-07-25": [
    {
      "kind": "submission",
      "form": "",
      "label": "Quarterly Summary List of Sales/Purchases/Importations by a VAT Registered Taxpayers - Non-eFPS Filers",
      "period": "For the Quarter ending June 30, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Sworn Statement of Manufacturer's or Importer's Volume of Sales of each particular Brand of Alcohol Products, Tobacco Products and Sweetened Beverage Products",
      "period": "For the Quarter ending June 30, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2550Q",
      "label": "BIR Form 2550Q (Quarterly Value-Added Tax Return) - eFPS & Non-eFPS Filers",
      "period": "For the Quarter ending June 30, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2551Q",
      "label": "BIR Form 2551Q (Quarterly Percentage Tax Return) - eFPS & Non-eFPS Filers",
      "period": "For the Quarter ending June 30, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2550-DS",
      "label": "BIR Form 2550-DS (Value-Added Tax (VAT) Return for Nonresident Digital Service Provider)",
      "period": "For the Quarter ending June 30, 2026"
    }
  ],
  "2026-07-30": [
    {
      "kind": "submission",
      "form": "1702-RT, 1702-EX, 1702-MX, 1709",
      "label": "Proof of eFiled BIR Form 1702 - RT/1702 - EX/1702 - MX with Audited Financial Statements (AFS), 1709 (if applicable), and Other Attachments through Electronic Audited Financial Statements (eAFS)",
      "period": "Fiscal Year ending March 31, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "the Soft Copies of Inventory List and Schedules stored and saved in DVD-R/USB properly labeled together with Notarized Sworn Declaration",
      "period": "Fiscal Year ending June 30, 2026"
    },
    {
      "kind": "e-submission",
      "form": "",
      "label": "Quarterly Summary List of Sales/Purchases/Importations by a VAT Registered Taxpayers - eFPS Filers",
      "period": "For the Quarter ending June 30, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1702Q",
      "label": "BIR Form 1702Q (Quarterly Income Tax Return For Corporations, Partnerships and Other Non-Individual Taxpayers) and Summary Alphalist of Withholding Taxes (SAWT)",
      "period": "Fiscal Quarter ending May 31, 2026"
    },
    {
      "kind": "registration",
      "form": "",
      "label": "Computerized Books of Accounts and Other Accounting Records",
      "period": "Fiscal Year ending June 30, 2026"
    }
  ],
  "2026-07-31": [
    {
      "kind": "submission",
      "form": "",
      "label": "Contract of Lease and Lessee Information Statement and Other Attachments by Lessors/Sub-Lessors of Commercial Establishments, Buildings or Spaces for Tenants",
      "period": "1st Semester of 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Sworn Statement by every Lessee/Concessionaire/Owner or Operator of Mines & Quarry/Processor of Minerals/Producer or Manufacturer of Mineral Products",
      "period": "1st Semester of 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1601-EQ",
      "label": "BIR Form 1601-EQ (Quarterly Remittance Return of Creditable Income Taxes Withheld-Expanded) and Quarterly Alphalist of Payees (QAP) - eFPS & Non-eFPS Filers",
      "period": "For the Quarter ending June 30, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1601-FQ",
      "label": "BIR Form 1601-FQ (Quarterly Remittance Return of Final Income Taxes Withheld) and Quarterly Alphalist of Payees (QAP) - eFPS & Non-eFPS Filers",
      "period": "For the Quarter ending June 30, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1602Q",
      "label": "BIR Form 1602Q (Quarterly Remittance Return of Final Taxes Withheld on Interest Paid on Deposits and Yield on Deposit Substitutes/Trusts/Etc.) - eFPS & Non-eFPS Filers",
      "period": "For the Quarter ending June 30, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1603Q",
      "label": "BIR Form 1603Q (Quarterly Remittance Return of Final Income Taxes Withheld on Fringe Benefits Paid to Employees Other Than Rank and File) - eFPS & Non-eFPS Filers",
      "period": "For the Quarter ending June 30, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1621",
      "label": "BIR Form 1621 (Quarterly Remittance Return of Tax Withheld on the Amount Withdrawn from Decedent's Deposit Account) - eFPS & Non-eFPS Filers",
      "period": "For the Quarter ending June 30, 2026"
    }
  ],
  "2026-08-01": [
    {
      "kind": "submission",
      "form": "",
      "label": "Consolidated Returns of All Transactions based on the Reconciled Data of Stockbrokers",
      "period": "July 16-31, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Engagement Letters and Renewals or Subsequent Agreements for Financial Audit by Independent CPAs",
      "period": "Fiscal Year beginning October 1, 2026"
    }
  ],
  "2026-08-05": [
    {
      "kind": "submission",
      "form": "",
      "label": "Summary Report of Certification issued by the President of the National Home Mortgage Finance Corporation (NHMFC)",
      "period": "Month of July 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2000",
      "label": "BIR Form 2000 (Monthly Documentary Stamp Tax Declaration/Return)",
      "period": "Month of July 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2000-OT",
      "label": "BIR Form 2000-OT (Documentary Stamp Tax Declaration/Return One-Time Transactions)",
      "period": "Month of July 2026"
    }
  ],
  "2026-08-08": [
    {
      "kind": "submission",
      "form": "",
      "label": "All Transcript Sheets of Official Register Books (ORBs) used by Dealers/Manufacturers/Toll Manufacturers/Assemblers/Importers of Alcohol Products, Tobacco Products, Petroleum Products, Non-Essential Goods, Sweetened Beverage Products, Mineral Products & Automobiles",
      "period": "Month of July 2026"
    },
    {
      "kind": "e-submission",
      "form": "",
      "label": "Monthly e-Sales Report for All Taxpayers using CRM/POS and/or Other Similar Business Machines whose last digit of 9-digit TIN is Even Number",
      "period": "Month of July 2026"
    }
  ],
  "2026-08-10": [
    {
      "kind": "submission",
      "form": "",
      "label": "List of Buyers of Sugar (Annex H) Together with a Copy of Certificate of Advance Payment of VAT (Annex E) made by each buyer appearing in the List by a Sugar Cooperative",
      "period": "Month of July 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Information Return on Releases of Refined Sugar (Annex F) by the Proprietor or Operator of a Sugar Refinery or Mill",
      "period": "Month of July 2026"
    },
    {
      "kind": "e-submission",
      "form": "",
      "label": "Monthly e-Sales Report for All Taxpayers using CRM/POS and/or Other Similar Business Machines whose last digit of 9-digit TIN is Odd Number",
      "period": "Month of July 2026"
    },
    {
      "kind": "e-filing-payment-remittance",
      "form": "2200-M",
      "label": "BIR Form 2200-M Excise Tax Return for the Amount of Excise Taxes Collected from Payment Made to Sellers of Metallic Minerals",
      "period": "Month of July 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - Non-eFPS Filers",
      "period": "Month of July 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2200-C",
      "label": "BIR Form 2200-C (Excise Tax Return for Cosmetic Procedures) with Monthly Summary of Cosmetic Procedures Performed",
      "period": "Month of July 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1600-VT, 1600-PT",
      "label": "BIR Form 1600-VT (Monthly Remittance Return of Value-Added Tax) and/or 1600-PT (Other Percentage Taxes Withheld) and Monthly Alphalist of Payees (MAP) - eFPS & Non-eFPS Filers",
      "period": "Month of July 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1606",
      "label": "BIR Form 1606 (Withholding Tax Remittance Return for Onerous Transfer of Real Property Other Than Capital Asset Including Taxable and Exempt)",
      "period": "Month of July 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "0620",
      "label": "BIR Form 0620 (Monthly Remittance Form of Tax Withheld on the Amount Withdrawn from the Decedent's Deposit Account) - eFPS & Non-eFPS Filers",
      "period": "Month of July 2026"
    },
    {
      "kind": "e-filing-e-payment-remittance",
      "form": "1600-VT, 1600-PT, 1601-C",
      "label": "BIR Form 1600-VT (Monthly Remittance Return of Value-Added Tax) and/or 1600-PT (Other Percentage Taxes Withheld) and BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - National Government Agencies (NGAs)",
      "period": "Month of July 2026"
    }
  ],
  "2026-08-11": [
    {
      "kind": "e-filing",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group E",
      "period": "Month of July 2026"
    }
  ],
  "2026-08-12": [
    {
      "kind": "e-filing",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group D",
      "period": "Month of July 2026"
    }
  ],
  "2026-08-13": [
    {
      "kind": "e-filing",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group C",
      "period": "Month of July 2026"
    }
  ],
  "2026-08-14": [
    {
      "kind": "e-filing",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group B",
      "period": "Month of July 2026"
    }
  ],
  "2026-08-15": [
    {
      "kind": "registration",
      "form": "",
      "label": "Permanently Bound Loose-Leaf Books of Accounts/Invoices and Other Accounting Records",
      "period": "Fiscal Year ending July 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1702-RT, 1702-EX, 1702-MX",
      "label": "BIR Form 1702 - RT/1702 - EX/1702 - MX",
      "period": "Fiscal Year ending April 30, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1707-A",
      "label": "BIR Form 1707-A (Annual Capital Gains Tax Return For Onerous Transfer of Shares of Stock Not Traded Through the Local Stock Exchange) - by Corporate Taxpayers",
      "period": "Fiscal Year ending April 30, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1701Q",
      "label": "BIR Form 1701Q (Quarterly Income Tax Return For Individuals, Estates & Trusts) and Summary Alphalist of Withholding Taxes (SAWT) - eFPS & Non-eFPS Filers",
      "period": "For the Quarter ending June 30, 2026"
    },
    {
      "kind": "e-filing-e-payment",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group A",
      "period": "Month of July 2026"
    },
    {
      "kind": "e-payment",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group E, D, C & B",
      "period": "Month of July 2026"
    }
  ],
  "2026-08-16": [
    {
      "kind": "submission",
      "form": "",
      "label": "Consolidated Return of All Transactions based on the Reconciled Data of Stockbrokers",
      "period": "August 1-15, 2026"
    }
  ],
  "2026-08-20": [
    {
      "kind": "e-filing-payment",
      "form": "1600",
      "label": "BIR Form 1600 WP (Remittance Return of Percentage Tax on Winnings and Prizes Withheld by Race Track Operators) - eFPS & Non-eFPS Filers",
      "period": "Month of July 2026"
    }
  ],
  "2026-08-25": [
    {
      "kind": "submission",
      "form": "",
      "label": "Quarterly Summary List of Sales/Purchases/Importations by a VAT Registered Taxpayers - Non-eFPS Filers",
      "period": "Fiscal Quarter ending July 31, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Sworn Statement of Manufacturer's or Importer's Volume of Sales of each particular Brand of Alcohol Products, Tobacco Products and Sweetened Beverage Products",
      "period": "Fiscal Quarter ending July 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2550Q",
      "label": "BIR Form 2550Q (Quarterly Value-Added Tax Return) - eFPS & Non-eFPS Filers",
      "period": "Fiscal Quarter ending July 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2551Q",
      "label": "BIR Form 2551Q (Quarterly Percentage Tax Return) - eFPS & Non-eFPS Filers",
      "period": "Fiscal Quarter ending July 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2550-DS",
      "label": "BIR Form 2550-DS (Value-Added Tax (VAT) Return for Nonresident Digital Service Provider)",
      "period": "Fiscal Quarter ending July 31, 2026"
    }
  ],
  "2026-08-29": [
    {
      "kind": "e-filing-payment",
      "form": "1702Q",
      "label": "BIR Form 1702Q (Quarterly Income Tax Return For Corporations, Partnerships and Other Non-Individual Taxpayers) and Summary Alphalist of Withholding Taxes (SAWT)",
      "period": "For the Quarter ending June 30, 2026"
    }
  ],
  "2026-08-30": [
    {
      "kind": "submission",
      "form": "1702-RT, 1702-EX, 1702-MX, 1709",
      "label": "Proof of eFiled BIR Form 1702 - RT/1702 - EX/1702 - MX with Audited Financial Statements (AFS), 1709 (if applicable), and Other Attachments through Electronic Audited Financial Statements (eAFS)",
      "period": "Fiscal Year ending April 30, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "the soft copies of Inventory List and Schedules stored and saved in DVD-R/USB properly labeled together with Notarized Sworn Declaration",
      "period": "Fiscal Year ending July 31, 2026"
    },
    {
      "kind": "e-submission",
      "form": "",
      "label": "Quarterly Summary List of Sales/Purchases/Importations by a VAT Registered Taxpayers - eFPS Filers",
      "period": "Fiscal Quarter ending July 31, 2026"
    },
    {
      "kind": "registration",
      "form": "",
      "label": "Computerized Books of Accounts and Other Accounting Records",
      "period": "Fiscal Year ending July 31, 2026"
    }
  ],
  "2026-09-01": [
    {
      "kind": "submission",
      "form": "",
      "label": "Consolidated Return of All Transactions based on Reconciled Data of Stockbrokers",
      "period": "August 16-31, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Engagement Letters and Renewals or Subsequent Agreements for Financial Audit by Independent CPAs",
      "period": "Fiscal Year beginning November 1, 2026"
    }
  ],
  "2026-09-05": [
    {
      "kind": "submission",
      "form": "",
      "label": "Summary Report of Certification issued by the President of the National Home Mortgage Finance Corporation (NHMFC)",
      "period": "Month of August 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2000",
      "label": "BIR Form 2000 (Monthly Documentary Stamp Tax Declaration/Return)",
      "period": "Month of August 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2000-OT",
      "label": "BIR Form 2000-OT (Documentary Stamp Tax Declaration/Return One-Time Transactions)",
      "period": "Month of August 2026"
    }
  ],
  "2026-09-08": [
    {
      "kind": "submission",
      "form": "",
      "label": "All Transcript Sheets Official Register Books (ORBs) used by Dealers/Manufacturers/Toll Manufacturers/Assemblers/Importers of Alcohol Products, Tobacco Products, Petroleum Products, Non-Essential Goods, Sweetened Beverage Products, Mineral Products & Automobiles",
      "period": "Month of August 2026"
    },
    {
      "kind": "e-submission",
      "form": "",
      "label": "Monthly e-Sales Report for All Taxpayers using CRM/POS and/or Other Similar Business Machines whose last digit of 9-digit TIN is Even Number",
      "period": "Month of August 2026"
    }
  ],
  "2026-09-10": [
    {
      "kind": "submission",
      "form": "",
      "label": "List of Buyers of Sugar (Annex H) Together with a Copy of Certificate of Advance Payment of VAT (Annex E) made by each buyer appearing in the List by a Sugar Cooperative",
      "period": "Month of August 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Information Return on Releases of Refined Sugar (Annex F) by the Proprietor or Operator of a Sugar Refinery or Mill",
      "period": "Month of August 2026"
    },
    {
      "kind": "e-submission",
      "form": "",
      "label": "Monthly e-Sales Report for All Taxpayers using CRM/POS and/or Other Similar Business Machines whose last digit of 9-digit TIN is Odd Number",
      "period": "Month of August 2026"
    },
    {
      "kind": "e-filing-payment-remittance",
      "form": "2200-M",
      "label": "BIR Form 2200-M Excise Tax Return for the Amount of Excise Taxes Collected from Payment Made to Sellers of Metallic Minerals",
      "period": "Month of August 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - Non-eFPS Filers",
      "period": "Month of August 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2200-C",
      "label": "BIR Form 2200-C (Excise Tax Return for Cosmetic Procedures) with Monthly Summary of Cosmetic Procedures Performed",
      "period": "Month of August 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1600-VT, 1600-PT",
      "label": "BIR Form 1600-VT (Monthly Remittance Return of Value-Added Tax) and/or 1600-PT (Other Percentage Taxes Withheld) and Monthly Alphalist of Payees (MAP) - eFPS & Non-eFPS Filers",
      "period": "Month of August 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1606",
      "label": "BIR Form 1606 (Withholding Tax Remittance Return for Onerous Transfer of Real Property Other Than Capital Asset Including Taxable and Exempt)",
      "period": "Month of August 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "0620",
      "label": "BIR Form 0620 (Monthly Remittance Form of Tax Withheld on the Amount Withdrawn from the Decedent's Deposit Account) - eFPS & Non-eFPS Filers",
      "period": "Month of August 2026"
    },
    {
      "kind": "e-filing-e-payment-remittance",
      "form": "1600-VT, 1600-PT, 1601-C",
      "label": "BIR Form 1600-VT (Monthly Remittance Return of Value-Added Tax) and/or 1600-PT (Other Percentage Taxes Withheld) and BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - National Government Agencies (NGAs)",
      "period": "Month of August 2026"
    }
  ],
  "2026-09-11": [
    {
      "kind": "e-filing",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group E",
      "period": "Month of August 2026"
    }
  ],
  "2026-09-12": [
    {
      "kind": "e-filing",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group D",
      "period": "Month of August 2026"
    }
  ],
  "2026-09-13": [
    {
      "kind": "e-filing",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group C",
      "period": "Month of August 2026"
    }
  ],
  "2026-09-14": [
    {
      "kind": "e-filing",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group B",
      "period": "Month of August 2026"
    }
  ],
  "2026-09-15": [
    {
      "kind": "registration",
      "form": "",
      "label": "Permanently Bound Loose-Leaf Books of Accounts/Invoices and Other Accounting Records",
      "period": "Fiscal Year ending August 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1702-RT, 1702-EX, 1702-MX",
      "label": "BIR Form 1702 - RT/ 1702 - EX/ 1702 - MX",
      "period": "Fiscal Year ending May 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1707-A",
      "label": "BIR Form 1707-A (Annual Capital Gains Tax Return For Onerous Transfer of Shares of Stock Not Traded Through the Local Stock Exchange) - by Corporate Taxpayers",
      "period": "Fiscal Year ending May 31, 2026"
    },
    {
      "kind": "e-filing-e-payment",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group A",
      "period": "Month of August 2026"
    },
    {
      "kind": "e-payment",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group E, D, C, & B",
      "period": "Month of August 2026"
    }
  ],
  "2026-09-16": [
    {
      "kind": "submission",
      "form": "",
      "label": "Consolidated Return of All Transactions based on the Reconciled Data of Stockbrokers",
      "period": "September 1-15, 2026"
    }
  ],
  "2026-09-20": [
    {
      "kind": "e-filing-payment",
      "form": "1600",
      "label": "BIR Form 1600 WP (Remittance Return of Percentage Tax on Winnings and Prizes Withheld by Race Track Operators) - eFPS & Non-eFPS Filers",
      "period": "Month of August 2026"
    }
  ],
  "2026-09-25": [
    {
      "kind": "submission",
      "form": "",
      "label": "Quarterly Summary List of Sales/Purchases/Importations by a VAT Registered Taxpayer - Non-eFPS Filers",
      "period": "Fiscal Quarter ending August 31, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Sworn Statement of Manufacturer's or Importer's Volume of Sales of each particular Brand of Alcohol Products, Tobacco Products and Sweetened Beverage Products",
      "period": "Fiscal Quarter ending August 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2550Q",
      "label": "BIR Form 2550Q (Quarterly Value-Added Tax Return) - eFPS & Non-eFPS Filers",
      "period": "Fiscal Quarter ending August 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2551Q",
      "label": "BIR Form 2551Q (Quarterly Percentage Tax Return) - eFPS & Non-eFPS Filers",
      "period": "Fiscal Quarter ending August 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2550-DS",
      "label": "BIR Form 2550-DS (Value-Added Tax (VAT) Return for Nonresident Digital Service Provider)",
      "period": "Fiscal Quarter ending August 31, 2026"
    }
  ],
  "2026-09-29": [
    {
      "kind": "e-filing-payment",
      "form": "1702Q",
      "label": "BIR Form 1702Q (Quarterly Income Tax Return For Corporations, Partnerships and Other Non-Individual Taxpayers) and Summary Alphalist of Withholding Taxes (SAWT)",
      "period": "Fiscal Quarter ending July 31, 2026"
    }
  ],
  "2026-09-30": [
    {
      "kind": "submission",
      "form": "1702-RT, 1702-EX, 1702-MX, 1709",
      "label": "Proof of eFiled BIR Form 1702 - RT/1702 - EX/1702 - MX with Audited Financial Statements (AFS), 1709 (if applicable), and Other Attachments through Electronic Audited Financial Statements (eAFS)",
      "period": "Fiscal Year ending May 31, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "the Soft Copies of Inventory List and Schedules stored and saved in DVD-R/USB properly labeled together with Notarized Sworn Declaration",
      "period": "Fiscal Year ending August 31, 2026"
    },
    {
      "kind": "e-submission",
      "form": "",
      "label": "Quarterly Summary List of Sales/Purchases/Importations by a VAT Registered Taxpayers - eFPS Filers",
      "period": "Fiscal Quarter ending August 31, 2026"
    },
    {
      "kind": "registration",
      "form": "",
      "label": "Computerized Books of Accounts and Other Accounting Records",
      "period": "Fiscal Year ending August 31, 2026"
    }
  ],
  "2026-10-01": [
    {
      "kind": "submission",
      "form": "",
      "label": "Consolidated Return of All Transactions based on the Reconciled Data of Stockbrokers",
      "period": "September 16-30, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Engagement Letters and Renewals or Subsequent Agreements for Financial Audit by Independent CPAs",
      "period": "Fiscal Year beginning December 1, 2026"
    }
  ],
  "2026-10-05": [
    {
      "kind": "submission",
      "form": "",
      "label": "Summary Report of Certification issued by the President of the National Home Mortgage Finance Corporation (NHMFC)",
      "period": "Month of September 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2000",
      "label": "BIR Form 2000 (Monthly Documentary Stamp Tax Declaration/Return)",
      "period": "Month of September 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2000-OT",
      "label": "BIR Form 2000-OT (Documentary Stamp Tax Declaration/Return One-Time Transactions)",
      "period": "Month of September 2026"
    }
  ],
  "2026-10-08": [
    {
      "kind": "submission",
      "form": "",
      "label": "All Transcript Sheets of Official Register Books (ORBs) used by Dealers/Manufacturers/Toll Manufacturers/Assemblers/Importers of Alcohol Products, Tobacco Products, Petroleum Products, Non-Essential Goods, Sweetened Beverage Products, Mineral Products & Automobiles",
      "period": "Month of September 2026"
    },
    {
      "kind": "e-submission",
      "form": "",
      "label": "Monthly e-Sales Report for All Taxpayers using CRM/POS and/or Other Similar Business Machines whose last digit of 9-digit TIN is Even Number",
      "period": "Month of September 2026"
    }
  ],
  "2026-10-10": [
    {
      "kind": "submission",
      "form": "",
      "label": "List of Buyers of Sugar (Annex H) Together with a Copy of Certificate of Advance Payment of VAT (Annex E) made by each buyer appearing in the List by a Sugar Cooperative",
      "period": "Month of September 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Information Return on Releases of Refined Sugar (Annex F) by the Proprietor or Operator of a Sugar Refinery or Mill",
      "period": "Month of September 2026"
    },
    {
      "kind": "e-submission",
      "form": "",
      "label": "Monthly e-Sales Report for All Taxpayers using CRM/POS and/or Other Similar Business Machines whose last digit of 9-digit TIN is Odd Number",
      "period": "Month of September 2026"
    },
    {
      "kind": "e-filing-payment-remittance",
      "form": "2200-M",
      "label": "BIR Form 2200-M Excise Tax Return for the Amount of Excise Taxes Collected from Payment made to Sellers of Metallic Minerals",
      "period": "Month of September 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1601-C",
      "label": "BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - Non-eFPS Filers",
      "period": "Month of September 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2200-C",
      "label": "BIR Form 2200-C (Excise Tax Return for Cosmetic Procedures) with Monthly Summary of Cosmetic Procedures Performed",
      "period": "Month of September 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1600-VT, 1600-PT",
      "label": "BIR Form 1600-VT (Monthly Remittance Return of Value-Added Tax) and/or 1600-PT (Other Percentage Taxes Withheld) and Monthly Alphalist of Payees (MAP) - eFPS & Non-eFPS Filers",
      "period": "Month of September 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1606",
      "label": "BIR Form 1606 (Withholding Tax Remittance Return for Onerous Transfer of Real Property Other Than Capital Asset Including Taxable and Exempt)",
      "period": "Month of September 2026"
    },
    {
      "kind": "e-filing-e-payment-remittance",
      "form": "1600-VT, 1600-PT, 1601-C",
      "label": "BIR Form 1600-VT (Monthly Remittance Return of Value-Added Tax) and/or 1600-PT (Other Percentage Taxes Withheld) and BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - National Government Agencies (NGAs)",
      "period": "Month of September 2026"
    }
  ],
  "2026-10-11": [
    {
      "kind": "e-filing",
      "form": "1601-C",
      "label": "BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - eFPS Filers under Group E",
      "period": "Month of September 2026"
    }
  ],
  "2026-10-12": [
    {
      "kind": "e-filing",
      "form": "1601-C",
      "label": "BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - eFPS Filers under Group D",
      "period": "Month of September 2026"
    }
  ],
  "2026-10-13": [
    {
      "kind": "e-filing",
      "form": "1601-C",
      "label": "BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - eFPS Filers under Group C",
      "period": "Month of September 2026"
    }
  ],
  "2026-10-14": [
    {
      "kind": "e-filing",
      "form": "1601-C",
      "label": "BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - eFPS Filers under Group B",
      "period": "Month of September 2026"
    }
  ],
  "2026-10-15": [
    {
      "kind": "registration",
      "form": "",
      "label": "Permanently Bound Loose-Leaf Books of Accounts/Invoices and Other Accounting Records",
      "period": "Fiscal Year ending September 30, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "the List of Medical Practitioners",
      "period": "For the Quarter ending September 30, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Quarterly List (with Monthly Breakdown) of Contractors (Annex A-3) of Gov't. Contracts entered into by the Provinces/Cities/Municipalities/ Barangays",
      "period": "For the Quarter ending September 30, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1702-RT, 1702-EX, 1702-MX",
      "label": "BIR Form 1702 - RT/1702 - EX/ 1702 - MX",
      "period": "Fiscal Year ending June 30, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1707-A",
      "label": "BIR Form 1707-A (Annual Capital Gains Tax Return for Onerous Transfer of Shares of Stock Not Traded Through the Local Stock Exchange) - by Corporate Taxpayers",
      "period": "Fiscal Year ending June 30, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2200-M",
      "label": "BIR Form 2200-M (Excise Tax Return for Mineral Products)",
      "period": "For the Quarter ending September 30, 2025"
    },
    {
      "kind": "e-filing-e-payment",
      "form": "1601-C",
      "label": "BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - eFPS Filers under Group A",
      "period": "Month of September 2026"
    },
    {
      "kind": "e-payment",
      "form": "",
      "label": "/PAYMENT of the 2nd Installment of Income Tax Due for Individual Taxpayers",
      "period": "Calendar Year 2025"
    },
    {
      "kind": "e-payment",
      "form": "1601-C",
      "label": "BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - eFPS Filers under Group E, D, C & B",
      "period": "Month of September 2026"
    }
  ],
  "2026-10-16": [
    {
      "kind": "submission",
      "form": "",
      "label": "Consolidated Return of All Transactions based on the Reconciled Data of Stockbrokers",
      "period": "October 1-15, 2026"
    }
  ],
  "2026-10-20": [
    {
      "kind": "submission",
      "form": "",
      "label": "Quarterly Information on OCWs or OFWs Remittances Exempt from DST furnished by the Local Banks & Non-Banks Money Transfer Agents",
      "period": "For the Quarter ending September 30, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Quarterly Report of Printer",
      "period": "For the Quarter ending September 30, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1600",
      "label": "BIR Form 1600 WP (Remittance Return of Percentage Tax on Winnings and Prizes Withheld by Race Track Operators) - eFPS & Non-eFPS Filers",
      "period": "Month of September 2026"
    }
  ],
  "2026-10-25": [
    {
      "kind": "submission",
      "form": "",
      "label": "Quarterly Summary List of Sales/Purchases/ Importations by a VAT Registered Taxpayers - Non-eFPS Filers",
      "period": "For the Quarter ending September 30, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Sworn Statement of Manufacturer's or Importer's Volume of Sales of each particular Brand of Alcohol Products, Tobacco Products and Sweetened Beverage Products",
      "period": "For the Quarter ending September 30, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2550Q",
      "label": "BIR Form 2550Q (Quarterly Value-Added Tax Return) - eFPS & Non-eFPS Filers",
      "period": "For the Quarter ending September 30, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2551Q",
      "label": "BIR Form 2551Q (Quarterly Percentage Tax Return) - eFPS & Non-eFPS Filers",
      "period": "For the Quarter ending September 30, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2550-DS",
      "label": "BIR Form 2550-DS (Value-Added Tax (VAT) Return for Nonresident Digital Service Provider)",
      "period": "For the Quarter ending September 30, 2026"
    }
  ],
  "2026-10-30": [
    {
      "kind": "submission",
      "form": "1702-RT, 1702-EX, 1702-MX, 1709",
      "label": "Proof of eFiled BIR Form 1702 - RT/ 1702 - EX/ 1702 -MX with Audited Financial Statements (AFS), 1709 (if applicable), and Other Attachments through Electronic Audited Financial Statements (eAFS)",
      "period": "Fiscal Year ending June 30, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "the Soft Copies of Inventory List and Schedules stored and saved in DVD-R/USB properly labeled together with Notarized Sworn Declaration",
      "period": "Fiscal Year ending September 30, 2026"
    },
    {
      "kind": "e-submission",
      "form": "",
      "label": "Quarterly Summary List of Sales/Purchases/Importations by a VAT Registered Taxpayers - eFPS Filers",
      "period": "For the Quarter ending September 30, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1702Q",
      "label": "BIR Form 1702Q (Quarterly Income Tax Return For Corporations, Partnerships and Other Non-Individual Taxpayers) and Summary Alphalist of Withholding Taxes (SAWT)",
      "period": "Fiscal Quarter ending August 31, 2026"
    },
    {
      "kind": "registration",
      "form": "",
      "label": "Computerized Books of Accounts and Other Accounting Records",
      "period": "Fiscal Year ending September 30, 2026"
    }
  ],
  "2026-10-31": [
    {
      "kind": "e-filing-payment",
      "form": "1601-EQ",
      "label": "BIR Form 1601-EQ (Quarterly Remittance Return of Creditable Income Taxes Withheld-Expanded) and Quarterly Alphalist of Payees (QAP) - eFPS & Non-eFPS Filers",
      "period": "For the Quarter ending September 30, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1601-FQ",
      "label": "BIR Form 1601-FQ (Quarterly Remittance Return of Final Income Taxes Withheld) and Quarterly Alphalist of Payees (QAP) - eFPS & Non-eFPS Filers",
      "period": "For the Quarter ending September 30, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1602Q",
      "label": "BIR Form 1602Q (Quarterly Remittance Return of Final Taxes Withheld on Interest Paid on Deposits and Yield on Deposit Substitutes/Trusts/Etc.) - eFPS & Non-eFPS Filers",
      "period": "For the Quarter ending September 30, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1603Q",
      "label": "BIR Form 1603Q (Quarterly Remittance Return of Final Income Taxes Withheld on Fringe Benefits Paid to Employees Other Than Rank and File) - eFPS & Non-eFPS Filers",
      "period": "For the Quarter ending September 30, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1621",
      "label": "BIR Form 1621 (Quarterly Remittance Return of Tax Withheld on the Amount Withdrawn from Decedent's Deposit Account) - eFPS & Non-eFPS Filers",
      "period": "For the Quarter ending September 30, 2026"
    }
  ],
  "2026-11-01": [
    {
      "kind": "submission",
      "form": "",
      "label": "Consolidated Return of All Transactions based on Reconciled Data of Stockbrokers",
      "period": "October 16-31, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Engagement Letters and Renewals or Subsequent Agreements for Financial Audit by Independent CPAs",
      "period": "Calendar Year beginning January 1, 2027"
    }
  ],
  "2026-11-05": [
    {
      "kind": "submission",
      "form": "",
      "label": "Summary Report of Certification issued by the President of the National Home Mortgage Finance Corporation (NHMFC)",
      "period": "Month of October 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2000",
      "label": "2000 (Monthly Documentary Stamp Tax Declaration/Return)",
      "period": "Month of October 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2000-OT",
      "label": "2000-OT (Documentary Stamp Tax Declaration/Return One-Time Transactions)",
      "period": "Month of October 2026"
    }
  ],
  "2026-11-08": [
    {
      "kind": "submission",
      "form": "",
      "label": "All Transcript Sheets of Official Register Books (ORBs) used by Dealers/Manufacturers/Toll Manufacturers/Assemblers/Importers of Alcohol Products, Tobacco Products, Petroleum Products, Non-Essential Goods, Sweetened Beverage Products, Mineral Products & Automobiles",
      "period": "Month of October 2026"
    },
    {
      "kind": "e-submission",
      "form": "",
      "label": "Monthly e-Sales Report for All Taxpayers using CRM/POS and/or Other Similar Business Machines whose last digit of 9-digit TIN is Even Number",
      "period": "Month of October 2026"
    }
  ],
  "2026-11-10": [
    {
      "kind": "submission",
      "form": "",
      "label": "List of Buyers of Sugar (Annex H) Together with a Copy of Certificate of Advance Payment of VAT (Annex E) made by each buyer appearing in the List by a Sugar Cooperative",
      "period": "Month of October 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Information Return on Releases of Refined Sugar (Annex F) by the Proprietor or Operator of a Sugar Refinery or Mill",
      "period": "Month of October 2026"
    },
    {
      "kind": "e-submission",
      "form": "",
      "label": "Monthly e-Sales Report for All Taxpayers using CRM/POS and/or Other Similar Business Machines whose last digit of 9-digit TIN is Odd Number",
      "period": "Month of October 2026"
    },
    {
      "kind": "e-filing-payment-remittance",
      "form": "2200-M",
      "label": "BIR Form 2200-M Excise Tax Return for the Amount of Excise Taxes Collected from Payment Made to Sellers of Metallic Minerals",
      "period": "Month of October 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - Non-eFPS Filers",
      "period": "Month of October 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2200-C",
      "label": "BIR Form 2200-C (Excise Tax Return for Cosmetic Procedures) with Monthly Summary of Cosmetic Procedures Performed",
      "period": "Month of October 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1600-VT, 1600-PT",
      "label": "BIR Form 1600-VT (Monthly Remittance Return of Value-Added Tax) and/or 1600-PT (Other Percentage Taxes Withheld) and Monthly Alphalist of Payees (MAP) - eFPS & Non-eFPS Filers",
      "period": "Month of October 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1606",
      "label": "BIR Form 1606 (Withholding Tax Remittance Return for Onerous Transfer of Real Property Other Than Capital Asset Including Taxable and Exempt)",
      "period": "Month of October 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "0620",
      "label": "BIR Form 0620 (Monthly Remittance Form of Tax Withheld on the Amount Withdrawn from the Decedent's Deposit Account) - eFPS & Non-eFPS Filers",
      "period": "Month of October 2026"
    },
    {
      "kind": "e-filing-e-payment-remittance",
      "form": "1600-VT, 1600-PT, 1601-C",
      "label": "BIR Form 1600-VT (Monthly Remittance Return of Value-Added Tax) and/or 1600-PT (Other Percentage Taxes Withheld) and BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - National Government Agencies (NGAs)",
      "period": "Month of October 2026"
    }
  ],
  "2026-11-11": [
    {
      "kind": "e-filing",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group E",
      "period": "Month of October 2026"
    }
  ],
  "2026-11-12": [
    {
      "kind": "e-filing",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group D",
      "period": "Month of October 2026"
    }
  ],
  "2026-11-13": [
    {
      "kind": "e-filing",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group C",
      "period": "Month of October 2026"
    }
  ],
  "2026-11-14": [
    {
      "kind": "e-filing",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group B",
      "period": "Month of October 2026"
    }
  ],
  "2026-11-15": [
    {
      "kind": "registration",
      "form": "",
      "label": "Permanently Bound Loose-Leaf Books of Accounts/Invoices and Other Accounting Records",
      "period": "Fiscal Year ending October 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1702-RT, 1702-EX, 1702-MX",
      "label": "BIR Form 1702 - RT/ 1702 - EX/1702 - MX",
      "period": "Fiscal Year ending July 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1707-A",
      "label": "BIR Form 1707-A (Annual Capital Gains Tax Return For Onerous Transfer of Shares of Stock Not Traded Through the Local Stock Exchange) - by Corporate Taxpayers",
      "period": "Fiscal Year ending July 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1701Q",
      "label": "BIR Form 1701Q (Quarterly Income Tax Return For Individuals, Estates & Trusts) and Summary Alphalist of Withholding Taxes (SAWT) - eFPS & Non-eFPS Filers",
      "period": "For the Quarter ending September 30, 2026"
    },
    {
      "kind": "e-filing-e-payment",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group A",
      "period": "Month of October 2026"
    },
    {
      "kind": "e-payment",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group E, D, C & B",
      "period": "Month of October 2026"
    }
  ],
  "2026-11-16": [
    {
      "kind": "submission",
      "form": "",
      "label": "Consolidated Return of All Transactions based on the Reconciled Data of Stockbrokers",
      "period": "November 1-15, 2026"
    }
  ],
  "2026-11-20": [
    {
      "kind": "e-filing-payment",
      "form": "1600",
      "label": "BIR Form 1600 WP (Remittance Return of Percentage Tax on Winnings and Prizes Withheld by Race Track Operators) - eFPS & Non-eFPS Filers",
      "period": "Month of October 2026"
    }
  ],
  "2026-11-25": [
    {
      "kind": "submission",
      "form": "",
      "label": "Quarterly Summary List of Sales/Purchases/Importations by a VAT Registered Taxpayers - Non-eFPS Filers",
      "period": "Fiscal Quarter ending October 31, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Sworn Statement of Manufacturer's or Importer's Volume of Sales of each particular Brand of Alcohol Products, Tobacco Products and Sweetened Beverage Products",
      "period": "Fiscal Quarter ending October 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2550Q",
      "label": "BIR Form 2550Q (Quarterly Value-Added Tax Return) - eFPS & Non-eFPS Filers",
      "period": "Fiscal Quarter ending October 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2551Q",
      "label": "BIR Form 2551Q (Quarterly Percentage Tax Return) - eFPS & Non-eFPS Filers",
      "period": "Fiscal Quarter ending October 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2550-DS",
      "label": "BIR Form 2550-DS (Value-Added Tax (VAT) Return for Nonresident Digital Service Provider)",
      "period": "Fiscal Quarter ending October 30, 2026"
    }
  ],
  "2026-11-29": [
    {
      "kind": "e-filing-payment",
      "form": "1702Q",
      "label": "BIR Form 1702Q (Quarterly Income Tax Return For Corporations, Partnerships and Other Non-Individual Taxpayers) and Summary Alphalist of Withholding Taxes (SAWT)",
      "period": "For the Quarter ending September 30, 2026"
    }
  ],
  "2026-11-30": [
    {
      "kind": "submission",
      "form": "1702-RT, 1702-EX, 1702-MX, 1709",
      "label": "Proof of eFiled BIR Form 1702 - RT/1702 - EX/1702 - MX with Audited Financial Statements (AFS), 1709 (if applicable), and Other Attachments through Electronic Audited Financial Statements (eAFS)",
      "period": "Fiscal Year ending July 31, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "the soft copies of Inventory List and Schedules stored and saved in DVD-R/USB properly labeled together with Notarized Sworn Declaration",
      "period": "Fiscal Year ending October 31, 2026"
    },
    {
      "kind": "e-submission",
      "form": "",
      "label": "Quarterly Summary List of Sales/Purchases/ Importations by a VAT Registered Taxpayers - eFPS Filers",
      "period": "Fiscal Quarter ending October 31, 2026"
    },
    {
      "kind": "registration",
      "form": "",
      "label": "Computerized Books of Accounts and Other Accounting Records",
      "period": "Fiscal Year ending October 31, 2026"
    }
  ],
  "2026-12-01": [
    {
      "kind": "submission",
      "form": "",
      "label": "Consolidated Return of All Transactions based on the Reconciled Data of Stockbrokers",
      "period": "November 16-30, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Engagement Letters and Renewals or Subsequent Agreements for Financial Audit by Independent CPAs",
      "period": "Fiscal Year beginning February 1, 2027"
    }
  ],
  "2026-12-05": [
    {
      "kind": "submission",
      "form": "",
      "label": "Summary Report of Certification issued by the President of the National Home Mortgage Finance Corporation (NHMFC)",
      "period": "Month of November 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2000",
      "label": "BIR Form 2000 (Monthly Documentary Stamp Tax Declaration/Return)",
      "period": "Month of November 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2000-OT",
      "label": "BIR Form 2000-OT (Documentary Stamp Tax Declaration/Return One-Time Transactions)",
      "period": "Month of November 2026"
    }
  ],
  "2026-12-08": [
    {
      "kind": "submission",
      "form": "",
      "label": "All Transcript Sheets of Official Register Books (ORBs) used by Dealers/ Manufacturers/Toll Manufacturers/Assemblers/Importers of Alcohol Products, Tobacco Products, Petroleum Products, Non-Essential Goods, Sweetened Beverage Products, Mineral Products & Automobiles",
      "period": "Month of November 2026"
    },
    {
      "kind": "e-submission",
      "form": "",
      "label": "Monthly e-Sales Report for All Taxpayers using CRM/POS and/or Other Similar Business Machines whose last digit of 9-digit TIN is Even Number",
      "period": "Month of November 2026"
    }
  ],
  "2026-12-10": [
    {
      "kind": "submission",
      "form": "",
      "label": "List of Buyers of Sugar (Annex H) Together with a Copy of Certificate of Advance Payment of VAT (Annex E) made by each buyer appearing in the List by a Sugar Cooperative",
      "period": "Month of November 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Information Return on Releases of Refined Sugar (Annex F) by the Proprietor or Operator of a Sugar Refinery or Mill",
      "period": "Month of November 2026"
    },
    {
      "kind": "e-submission",
      "form": "",
      "label": "Monthly e-Sales Report for All Taxpayers using CRM/POS and/or Other Similar Business Machines whose last digit of 9-digit TIN is Odd Number",
      "period": "Month of November 2026"
    },
    {
      "kind": "e-filing-payment-remittance",
      "form": "2200-M",
      "label": "BIR Form 2200-M Excise Tax Return for the Amount of Excise Taxes Collected from Payment Made to Sellers of Metallic Minerals",
      "period": "Month of November 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - Non-eFPS Filers",
      "period": "Month of November 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2200-C",
      "label": "BIR Form 2200-C (Excise Tax Return for Cosmetic Procedures) with Monthly Summary of Cosmetic Procedures Performed",
      "period": "Month of November 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1600-VT, 1600-PT",
      "label": "BIR Form 1600-VT (Monthly Remittance Return of Value-Added Tax) and/or 1600-PT (Other Percentage Taxes Withheld) and Monthly Alphalist of Payees (MAP) - eFPS & Non-eFPS Filers",
      "period": "Month of November 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1606",
      "label": "BIR Form 1606 (Withholding Tax Remittance Return for Onerous Transfer of Real Property Other Than Capital Asset Including Taxable and Exempt)",
      "period": "Month of November 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "0620",
      "label": "BIR Form 0620 (Monthly Remittance Form of Tax Withheld on the Amount Withdrawn from the Decedent's Deposit Account) - eFPS & Non-eFPS Filers",
      "period": "Month of November 2026"
    },
    {
      "kind": "e-filing-e-payment-remittance",
      "form": "1600-VT, 1600-PT, 1601-C",
      "label": "BIR Form 1600-VT (Monthly Remittance Return of Value-Added Tax) and/or 1600-PT (Other Percentage Taxes Withheld) and BIR Form 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) - National Government Agencies (NGAs)",
      "period": "Month of November 2026"
    }
  ],
  "2026-12-11": [
    {
      "kind": "e-filing",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group E",
      "period": "Month of November 2026"
    }
  ],
  "2026-12-12": [
    {
      "kind": "e-filing",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group D",
      "period": "Month of November 2026"
    }
  ],
  "2026-12-13": [
    {
      "kind": "e-filing",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group C",
      "period": "Month of November 2026"
    }
  ],
  "2026-12-14": [
    {
      "kind": "e-filing",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group B",
      "period": "Month of November 2026"
    }
  ],
  "2026-12-15": [
    {
      "kind": "registration",
      "form": "",
      "label": "Permanently Bound Loose-Leaf Books of Accounts/Invoices and Other Accounting Records",
      "period": "Fiscal Year ending November 30, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1702-RT, 1702-EX, 1702-MX",
      "label": "BIR Form 1702 - RT / 1702 - EX / 1702 - MX",
      "period": "Fiscal Year ending August 31, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1707-A",
      "label": "BIR Form 1707-A (Annual Capital Gains Tax Return For Onerous Transfer of Shares of Stock Not Traded Through the Local Stock Exchange) - by Corporate Taxpayers",
      "period": "Fiscal Year ending August 31, 2026"
    },
    {
      "kind": "e-filing-e-payment",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group A",
      "period": "Month of November 2026"
    },
    {
      "kind": "e-payment",
      "form": "1601-C, 0619-E, 0619-F",
      "label": "BIR Forms 1601-C (Monthly Remittance Return of Income Taxes Withheld on Compensation) and/or 0619-E (Monthly Remittance Form of Creditable Income Taxes Withheld-Expanded) and/or 0619-F (Monthly Remittance Form of Final Income Taxes Withheld) - eFPS Filers under Group E, D, C & B",
      "period": "Month of November 2026"
    }
  ],
  "2026-12-16": [
    {
      "kind": "submission",
      "form": "",
      "label": "Consolidated Return of All Transactions based on the Reconciled Data of Stockbrokers",
      "period": "December 1-15, 2026"
    }
  ],
  "2026-12-20": [
    {
      "kind": "e-filing-payment",
      "form": "1600-WP",
      "label": "BIR Form 1600-WP (Remittance Return of Percentage Tax on Winnings and Prizes Withheld by Racetrack Operators) - eFPS & Non-eFPS Filers",
      "period": "Month of November 2026"
    }
  ],
  "2026-12-25": [
    {
      "kind": "submission",
      "form": "",
      "label": "Quarterly Summary List of Sales/Purchases/Importations by a VAT Registered Taxpayers",
      "period": "Non-eFPS Filers- Fiscal Quarter ending November 30, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "Sworn Statement of Manufacturer's or Importer's Volume of Sales of each particular Brand of Alcohol Products, Tobacco Products and Sweetened Beverage Products",
      "period": "Fiscal Quarter ending November 30, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2550Q",
      "label": "BIR Form 2550Q (Quarterly Value-Added Tax Return) - eFPS & Non-eFPS Filers",
      "period": "Fiscal Quarter ending November 30, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2551Q",
      "label": "BIR Form 2551Q (Quarterly Percentage Tax Return) - eFPS & Non-eFPS Filers",
      "period": "Fiscal Quarter ending November 30, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "2550-DS",
      "label": "BIR Form 2550-DS (Value-Added Tax (VAT) Return for Nonresident Digital Service Provider)",
      "period": "Fiscal Quarter ending November 30, 2026"
    }
  ],
  "2026-12-30": [
    {
      "kind": "submission",
      "form": "1702-RT, 1702-EX, 1702-MX, 1709",
      "label": "Proof of eFiled BIR Form 1702 - RT/1702 - EX/1702 - MX with Audited Financial Statements (AFS), 1709 (if applicable), and Other Attachments through Electronic Audited Financial Statements (eAFS)",
      "period": "Fiscal Year ending August 31, 2026"
    },
    {
      "kind": "submission",
      "form": "",
      "label": "the soft copies of Inventory List and Schedules stored and saved in DVD-R/USB properly labeled together with Notarized Sworn Declaration",
      "period": "Fiscal Year ending November 30, 2026"
    },
    {
      "kind": "e-submission",
      "form": "",
      "label": "Quarterly Summary List of Sales/Purchases/ Importations by a VAT Registered Taxpayers- eFPS Filers",
      "period": "Fiscal Quarter ending November 30, 2026"
    },
    {
      "kind": "e-filing-payment",
      "form": "1702Q",
      "label": "BIR Form 1702Q (Quarterly Income Tax Return For Corporations, Partnerships and Other Non-Individual Taxpayers) and Summary Alphalist of Withholding Taxes (SAWT)",
      "period": "Fiscal Quarter ending October 31, 2026"
    },
    {
      "kind": "registration",
      "form": "",
      "label": "Computerized Books of Accounts and Other Accounting Records",
      "period": "Fiscal Year ending November 30, 2026"
    }
  ],
  "2026-12-31": [
    {
      "kind": "submission",
      "form": "",
      "label": "Manufacturers'/Assemblers'/Importers' Sworn Statement of each Particular Brand/Model of Automobile, Alcohol Products, Tobacco Products and Sweetened Beverage Products",
      "period": "2nd Semester of 2026"
    }
  ]
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function padZ(n) {
  return String(n).padStart(2, "0");
}

function dateKey(y, m, d) {
  return `${y}-${padZ(m + 1)}-${padZ(d)}`;
}

function escapeHTML(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function kindInfo(kind) {
  return DEADLINE_KINDS[kind] || { label: "Deadline", color: "#607083", bg: "#eef2f7" };
}

function kindStyle(kind) {
  const info = kindInfo(kind);
  return `--kind-color: ${info.color}; --kind-bg: ${info.bg};`;
}

function getDeadlineKinds(items) {
  return [...new Set((items || []).map(item => item.kind))];
}

function formatDateLabel(key, withYear = true) {
  const [y, m, d] = key.split("-").map(Number);
  return withYear ? `${MONTHS[m - 1]} ${d}, ${y}` : `${d} ${MONTHS[m - 1]}`;
}

function renderKindChip(kind) {
  const info = kindInfo(kind);
  return `<span class="kind-chip" style="${kindStyle(kind)}">${escapeHTML(info.label)}</span>`;
}

function renderLegend() {
  const legend = document.getElementById("cal-legend");
  if (!legend) return;

  const usedKinds = [...new Set(Object.values(TAX_DEADLINES).flat().map(item => item.kind))]
    .sort((a, b) => kindInfo(a).label.localeCompare(kindInfo(b).label));

  legend.innerHTML = usedKinds.map(kind => {
    const info = kindInfo(kind);
    return `
      <span class="legend-item">
        <span class="legend-dot" style="background: ${info.color}"></span>
        <span>${escapeHTML(info.label)}</span>
      </span>
    `;
  }).join("") + `
    <span class="legend-item">
      <span class="legend-dot dot-today"></span>
      <span>Today</span>
    </span>
  `;
}

// ── Date detail modal ───────────────────────────────
const dateModalOverlay = document.getElementById("date-modal-overlay");
const dateModalTitle   = document.getElementById("date-modal-title");
const dateModalCount   = document.getElementById("date-modal-count");
const dateModalBody    = document.getElementById("date-modal-body");
const dateModalClose   = document.getElementById("date-modal-close");

let selectedCell = null;

function openDateModal(key, items, cell) {
  // Highlight selected cell
  if (selectedCell) selectedCell.classList.remove("cal-selected");
  selectedCell = cell;
  cell.classList.add("cal-selected");

  const [y, m, d] = key.split("-").map(Number);
  dateModalTitle.textContent = `${MONTHS[m - 1]} ${d}, ${y}`;
  dateModalCount.textContent = `${items.length} deadline${items.length !== 1 ? "s" : ""} on this date`;

  dateModalBody.innerHTML = items.map(item => `
    <div class="tt-item" style="${kindStyle(item.kind)}">
      ${renderKindChip(item.kind)}
      ${item.form ? `<div class="tt-form">${escapeHTML(item.form)}</div>` : ""}
      <div class="tt-label">${escapeHTML(item.label)}</div>
      ${item.period ? `<div class="tt-period">${escapeHTML(item.period)}</div>` : ""}
    </div>
  `).join("");

  dateModalOverlay.classList.add("open");
  dateModalBody.scrollTop = 0;
  dateModalClose.focus();
}

function closeDateModal() {
  dateModalOverlay.classList.remove("open");
  if (selectedCell) {
    selectedCell.classList.remove("cal-selected");
    selectedCell = null;
  }
}

dateModalClose.addEventListener("click", closeDateModal);
dateModalOverlay.addEventListener("click", e => {
  if (e.target === dateModalOverlay) closeDateModal();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeDateModal();
});

const today = new Date();
let calYear = 2026;
let calMonth = today.getFullYear() === 2026 ? today.getMonth() : 0;

function renderCalendar() {
  const grid = document.getElementById("cal-grid");
  const title = document.getElementById("cal-title");
  grid.innerHTML = "";
  title.textContent = `${MONTHS[calMonth]} ${calYear}`;

  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement("div");
    blank.className = "cal-cell empty";
    grid.appendChild(blank);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const key = dateKey(calYear, calMonth, d);
    const items = TAX_DEADLINES[key] || [];
    const kinds = getDeadlineKinds(items);
    const primaryKind = kinds[0];

    const cell = document.createElement("div");
    cell.className = "cal-cell";
    cell.innerHTML = `<span class="cal-day-number">${d}</span>`;

    const isToday = (
      d === today.getDate() &&
      calMonth === today.getMonth() &&
      calYear === today.getFullYear()
    );

    if (isToday) cell.classList.add("cal-today");

    if (items.length) {
      cell.classList.add("has-deadline");
      cell.style.setProperty("--kind-color", kindInfo(primaryKind).color);
      cell.insertAdjacentHTML("beforeend", `
        <span class="cal-kind-dots">
          ${kinds.slice(0, 4).map(kind => `<span class="cal-kind-dot" style="background: ${kindInfo(kind).color}"></span>`).join("")}
        </span>
      `);
      cell.addEventListener("mouseenter", e => showTooltip(e, items, d));
      cell.addEventListener("mouseleave", hideTooltip);
      cell.addEventListener("click", () => {
        hideTooltip();
        openDateModal(key, items, cell);
      });
    }

    grid.appendChild(cell);
  }

  updateBottomPanels();
}

document.getElementById("cal-prev").addEventListener("click", () => {
  closeDateModal();
  if (--calMonth < 0) {
    calMonth = 11;
    calYear--;
  }
  renderCalendar();
});

document.getElementById("cal-next").addEventListener("click", () => {
  closeDateModal();
  if (++calMonth > 11) {
    calMonth = 0;
    calYear++;
  }
  renderCalendar();
});

const tooltip = document.getElementById("cal-tooltip");

function showTooltip(e, items, day) {
  const lines = items.map(item => `
    <div class="tt-item" style="${kindStyle(item.kind)}">
      ${renderKindChip(item.kind)}
      ${item.form ? `<div class="tt-form">${escapeHTML(item.form)}</div>` : ""}
      <div class="tt-label">${escapeHTML(item.label)}</div>
      ${item.period ? `<div class="tt-period">${escapeHTML(item.period)}</div>` : ""}
    </div>
  `).join("");

  tooltip.innerHTML = `<div class="tt-date">${MONTHS[calMonth]} ${day}, ${calYear}</div>${lines}`;
  tooltip.style.display = "block";
  positionTooltip(e);
}

function hideTooltip() {
  tooltip.style.display = "none";
}

document.addEventListener("mousemove", e => {
  if (tooltip.style.display === "block") positionTooltip(e);
});

function positionTooltip(e) {
  const tw = tooltip.offsetWidth;
  const th = tooltip.offsetHeight;
  let x = e.clientX + 14;
  let y = e.clientY + 14;
  if (x + tw > window.innerWidth - 10) x = e.clientX - tw - 14;
  if (y + th > window.innerHeight - 10) y = e.clientY - th - 14;
  tooltip.style.left = x + "px";
  tooltip.style.top = Math.max(10, y) + "px";
}

function updateBottomPanels() {
  renderUpcoming();
  renderMonthDeadlines();
}

function renderDeadlineItem(item) {
  return `
    <div class="dl-info">
      <div class="dl-meta">
        ${renderKindChip(item.kind)}
        ${item.form ? `<span class="dl-form-pill">${escapeHTML(item.form)}</span>` : ""}
      </div>
      <div class="dl-desc">${escapeHTML(item.label)}</div>
      ${item.period ? `<div class="dl-period">${escapeHTML(item.period)}</div>` : ""}
    </div>
  `;
}

function getDaysBetween(dateKey) {
  const [y, m, d] = dateKey.split("-").map(Number);
  const target = new Date(y, m - 1, d);
  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.round((target - todayMidnight) / 86400000);
}

function dateBadgeClass(days) {
  if (days <= 3)  return "badge-urgent";
  if (days <= 10) return "badge-soon";
  return "badge-upcoming";
}

function renderUpcoming() {
  const list = document.getElementById("upcoming-list");
  list.innerHTML = "";

  const todayStr = `${today.getFullYear()}-${padZ(today.getMonth() + 1)}-${padZ(today.getDate())}`;
  const sorted = Object.keys(TAX_DEADLINES).filter(k => k >= todayStr).sort().slice(0, 8);

  if (!sorted.length) {
    list.innerHTML = '<div class="no-deadlines">No upcoming deadlines found.</div>';
    return;
  }

  sorted.forEach(key => {
    const items = TAX_DEADLINES[key];
    const primaryKind = getDeadlineKinds(items)[0];
    const days = getDaysBetween(key);
    const badgeClass = dateBadgeClass(days);

    const firstItem = items[0];
    let formsTitle = "";
    if (firstItem.form) {
      const nums = firstItem.form.split(",").map(s => s.trim()).slice(0, 3);
      formsTitle = nums.map(n => `BIR Form ${n}`).join(", ");
    } else {
      formsTitle = kindInfo(primaryKind).label.toUpperCase();
    }

    const maxLen = 80;
    const descFull = firstItem.label;
    const descShort = descFull.length > maxLen ? descFull.slice(0, maxLen - 1) + "…" : descFull;
    const extra = items.length - 1;
    const moreTag = extra > 0 ? ` <span class="dl-more-tag">+${extra} more</span>` : "";

    // Build expanded items HTML
    const itemsHTML = items.map(item => `
      <div class="dl-card-item" style="${kindStyle(item.kind)}">
        <div class="dl-card-item-meta">
          ${renderKindChip(item.kind)}
          ${item.form ? `<span class="dl-form-pill">${escapeHTML(item.form)}</span>` : ""}
        </div>
        <div class="dl-card-item-label">${escapeHTML(item.label)}</div>
        ${item.period ? `<div class="dl-card-item-period">${escapeHTML(item.period)}</div>` : ""}
      </div>
    `).join("");

    const card = document.createElement("div");
    card.className = "dl-date-card";
    card.setAttribute("style", kindStyle(primaryKind));
    card.innerHTML = `
      <div class="dl-date-card-summary">
        <div class="dl-date-card-content">
          <div class="dl-forms-title">${escapeHTML(formsTitle)}</div>
          <div class="dl-card-desc">${escapeHTML(descShort)}${moreTag}</div>
          ${firstItem.period ? `<div class="dl-card-period">${escapeHTML(firstItem.period)}</div>` : ""}
        </div>
        <div class="dl-date-badge-wrap">
          <div class="dl-date-badge ${badgeClass}">${formatDateLabel(key)}</div>
        </div>
        <i class="fas fa-chevron-down dl-chevron"></i>
      </div>
      <div class="dl-card-items">${itemsHTML}</div>
    `;

    card.querySelector(".dl-date-card-summary").addEventListener("click", () => {
      card.classList.toggle("is-open");
    });

    list.appendChild(card);
  });
}

function renderMonthDeadlines() {
  const list = document.getElementById("month-list");
  const label = document.getElementById("month-box-label");
  list.innerHTML = "";
  label.textContent = `${MONTHS[calMonth]} ${calYear}`;

  const prefix = `${calYear}-${padZ(calMonth + 1)}`;
  const keys = Object.keys(TAX_DEADLINES).filter(k => k.startsWith(prefix)).sort();

  if (!keys.length) {
    list.innerHTML = '<div class="no-deadlines">No deadlines for this month.</div>';
    return;
  }

  keys.forEach(key => {
    const group = document.createElement("div");
    group.className = "dl-date-group";
    group.innerHTML = `<div class="dl-group-date">${formatDateLabel(key, false)} <span>${TAX_DEADLINES[key].length} deadlines</span></div>`;

    TAX_DEADLINES[key].forEach(item => {
      const row = document.createElement("div");
      row.className = "dl-row";
      row.setAttribute("style", kindStyle(item.kind));
      row.innerHTML = renderDeadlineItem(item);
      group.appendChild(row);
    });

    list.appendChild(group);
  });
}

renderLegend();
renderCalendar();

console.info("Loaded BIR Tax Calendar 2026", {"dates":167,"items":519});
