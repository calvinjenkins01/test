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
- Content pillars (CJ's chosen four, everything fits one of these):
  1. Things you didn't know (signature discovery countdowns)
  2. AI news with a take (day-of speed, developer perspective)
  3. Technical authority (software developer + cybersecurity angles,
     credibility line "I'm a software developer" in scripts)
  4. How-to workflows (practical AI recipes: exact prompts, settings,
     step by step tasks people can copy)
- Every video ends with a usable takeaway (prompt to copy, setting to
  change, thing to try) plus an engineered CTA (comment bait, send this
  to, or save this)
- Every TikTok and IG caption STARTS with a comment keyword line, e.g.
  Comment "SLIDES" and I'll reply with the exact prompt, then the rest of
  the caption. The keyword must promise something CJ can actually deliver
  (in replies now; via auto DM once the ManyChat funnel exists)
- Two layer hooks: the SPOKEN hook carries the TikTok search phrase; the
  ON SCREEN text is a separate short curiosity line, 4 to 8 words, bold
  claim or curiosity gap, never a descriptive title
- IG captions use only 3 to 4 targeted hashtags (TikTok can carry 4 to 5)
- Daily habit: after replying to own comments, CJ leaves 3 to 5 smart
  comments on bigger AI creator accounts (free discovery)
- Visual style: terminal aesthetic (default card style "terminal" in x-autoposter,
  matching carousel-maker slides)

## System overview
- daily-sms/: writes today.txt every morning at 4:00am and 5:30am Phoenix
  (11:00 and 12:30 UTC); CJ's iPhone Shortcut fetches it at 6am and texts it
  to him. Update schedule.json every Sunday during the planning session with
  the new week.
- carousel-maker/: renders slide decks for TikTok photo posts + IG carousels.
- x-autoposter/: full X automation (currently off; CJ pastes articles manually).
