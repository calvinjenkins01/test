# CJ Content System Rules

## Writing style: ABSOLUTE RULES
- NEVER use dashes of any kind in ANY generated content. This means the hyphen "-",
  the en dash "–", and the em dash "—". Applies to everything: X posts, TikTok and
  Instagram captions, carousel slide text, video scripts, daily text messages,
  articles, image text, and any other content CJ will publish or read.
  Use commas, periods, colons, or reword the sentence instead.
  (Hyphens in code, filenames, and flags are fine. This rule is about content.)

## Brand
- Handle: @techyai_cj (TikTok, Instagram, X)
- Niche: AI news, Claude, ChatGPT, building things with AI
- Signature format: "Things you didn't know" countdown videos
- Visual style: terminal aesthetic (default card style "terminal" in x-autoposter,
  matching carousel-maker slides)

## System overview
- daily-sms/: writes today.txt every morning at 6am Phoenix (13:00 UTC); CJ's
  iPhone Shortcut fetches it at 7am and texts it to him. Update schedule.json
  every Sunday during the planning session with the new week.
- carousel-maker/: renders slide decks for TikTok photo posts + IG carousels.
- x-autoposter/: full X automation (currently off; CJ pastes articles manually).
