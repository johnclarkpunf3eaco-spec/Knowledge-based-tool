const pages = [
  { "title": "Fraud", "url": "Fraud.html", "keywords": ["fraud", "scam", "fake", "identity theft"] },
  { "title": "Special Payment Arrangement", "url": "SPA.html", "keywords": ["special payment arrangement", "payment plan", "spa", "payment", "P rating"] },
  { "title": "Convenience Fee", "url": "conveniencefee.html", "keywords": ["fee", "extra charge", "processing", "$1", "1 dollar"] },
  { "title": "Refunds", "url": "refunds.html", "keywords": ["refund", "money back", "credit", "duplicate"] },
  { "title": "Interpreter", "url": "interpreter.html", "keywords": ["language", "translation", "interpreter", "communication support"] },
  { "title": "Settlement Offer", "url": "settlement-offer.html", "keywords": ["settle", "offer", "negotiation", "days past due", "dpd", "further delinquent", "50%", "75%"] },
  { "title": "ACH Return Codes", "url": "achretcodes.html", "keywords": ["ach", "return codes", "bank", "r01", "r02", "r03", "r04", "r05", "r06", "r07", "r08", "r09", "r10", "r12", "r13", "r16"] },
  { "title": "ACH Payment Process", "url": "achprocess.html", "keywords": ["ach", "processing", "payments", "routing", "bank"] },
  { "title": "Autopay Revoke", "url": "aprevoke.html", "keywords": ["authorization revoke", "ap revoke", "script", "autopay", "revocation"] },
  { "title": "Card Payment Processing", "url": "ccprcs.html", "keywords": ["credit card", "process", "cvv", "debit card", "card"] },
  { "title": "Collections Disposition", "url": "collections-disposition.html", "keywords": ["collections", "accounts"] },
  { "title": "Contact Info", "url": "contactinfo.html", "keywords": ["contact", "support", "phone", "email","email", "e-mail", "e mail", "merchant", "bko", "bankruptcy", "account management", "number", "main", "support", "national debt holdings", "ndh", "matador", "address", "sold"] },
  { "title": "DNC Procedure", "url": "DNC-Procedure.html", "keywords": ["do not call", "procedure", "harassment", "cease all communication", "contact me through"] },
  { "title": "Deceased", "url": "deceased.html", "keywords": ["deceased", "account close", "dead", "death"] },
  { "title": "Due Date Change", "url": "dueDateChange.html", "keywords": ["due date", "change", "payment date", "move due date", "change due date"] },
  { "title": "EPO", "url": "epo.html", "keywords": ["epo", "early payoff", "early pay off", "30%"] },
  { "title": "Frequency Change", "url": "freqchange.html", "keywords": ["frequency", "change","Monthly", "Semi-Monthly", "Semi Monthly", "Bi-weekly", "bi weekly", "weekly"] },
  { "title": "Legal Mention", "url": "legal-mention.html", "keywords": ["legal", "notice", "attorney", "BBB", "Better Business bureau", "attorney", "court", "attorney general", "lawsuit", "report"] },
  { "title": "Merchandise Recovery", "url": "merchandise-recovery.html", "keywords": ["merchandise", "recovery", "MR", "merchandise recovery", "return", "shipping label"] },
  { "title": "Protection Plan", "url": "protection-plan.html", "keywords": ["protection", "plan", "insurance", "aon", "contact info"] },
  { "title": "Rating", "url": "Rating.html", "keywords": ["rating", "review", "pending", "payment arrangement", "confirmed bankruptcy", "p rating", "C rating", "B rating", "d rating", "e rating", "f rating", "g rating", "j rating", "l rating", "m rating", "r rating", "s rating", "u rating", "sold rating"] },
  { "title": "Rerun", "url": "rerun.html", "keywords": ["rerun", "retry payment", "nsf", "non sufficient funds", "non-sufficient funds", "reprocess", "re-initiation", "reinitiation"] },
  { "title": "Sold Accounts", "url": "sold-accounts.html", "keywords": ["sold accounts", "debt", "ndh", "national debt holdings", "matador"] },
  { "title": "Trustpilot", "url": "trustpilot.html", "keywords": ["trustpilot", "reviews"] },
  { "title": "Troubleshooting", "url": "troubleshooting.html", "keywords": ["troubleshoot", "fix", "support"] },
  { "title": "90-Day Promotional Offer", "url": "ninety.html", "keywords": ["90", "promotion", "offer", "reinstatement", "settlement"] },
  { "title": "Bankruptcy", "url": "bko.html", "keywords": ["bankruptcy", "chapter", "attorney", "bko", "filing", "case number", "chapter 13", "chapter 7"] },
  { "title": "Quality Companion Guide", "url": "quality-guide.html", "keywords": ["quality", "autofail", "markdown", "guide", "call handling"] }
];

const searchInput = document.getElementById("search-input");
const suggestionsBox = document.getElementById("suggestions");

// detect if we are already inside query-data
const isInQueryFolder = window.location.pathname.includes("query-data/");
const basePath = isInQueryFolder ? "" : "query-data/";

function showSuggestions(query) {
  suggestionsBox.innerHTML = "";
  if (!query) {
    suggestionsBox.style.display = "none";
    return;
  }

  const lowerQuery = query.toLowerCase();
  const matches = pages.filter(page =>
    page.title.toLowerCase().includes(lowerQuery) ||
    (page.keywords && page.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery)))
  );

  if (matches.length === 0) {
    suggestionsBox.style.display = "none";
    return;
  }

  function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, "<strong>$1</strong>");
  }

  matches.forEach(match => {
    const item = document.createElement("div");
    item.classList.add("suggestion-item");
    item.innerHTML = highlightMatch(match.title, lowerQuery);

    item.addEventListener("click", () => {
      window.open(basePath + match.url);
      suggestionsBox.style.display = "none";
    });

    suggestionsBox.appendChild(item);
  });

  suggestionsBox.style.display = "block";
}

searchInput.addEventListener("input", e => showSuggestions(e.target.value));
searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const query = searchInput.value.toLowerCase();
    const match = pages.find(page =>
      page.title.toLowerCase() === query ||
      (page.keywords && page.keywords.includes(query))
    );
    if (match) {
      console.log("Opening:", basePath + match.url);
      window.open(basePath + match.url);
    }
    suggestionsBox.style.display = "none";
  }
});
