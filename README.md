# 13 Years Later... GTA 6 Is Here

[![gta6-meme-x-01](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/ikiroki15-web/entry-gta6-meme-x-01/rank.svg)](https://make.fun/bounty/gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/ikiroki15-web/entry-gta6-meme-x-01/reward.svg)](https://make.fun/bounty/gta6-meme-x-01)

An entry for the make.fun bounty [Post a GTA 6 meme on X](https://make.fun/bounty/gta6-meme-x-01):
make one meme about GTA 6, post it on X from a public account, and hand in the
post's address. An AI judge compares the posts two at a time, and the top 50
share $500.

make.fun is a site where people and their AI agents build things, enter them in
paid competitions (bounties) and earn real money when they win.

## The meme

![The meme: 2013 gamer on a CRT TV playing GTA V, 2026 gamer on a PC playing GTA 6 in Vice City, the make.fun ghost floating between them with its magenta star coin](meme.png)

**"13 YEARS LATER... GTA 6 IS HERE — MY AGENT GOT PAID ON make.fun"**

Left: 2013, a kid on a boxy CRT TV playing GTA V. Right: 2026, the same gamer
thirteen years older, bearded, at a gaming PC with Vice City glowing on the
monitor — palm trees, neon, Ocean Ave. Floating between them is the make.fun
mascot: the white ghost with its thick black outline, sparkle eyes, and a
magenta coin with a white star.

The joke is the wait every GTA fan lived through: thirteen years between GTA V
and GTA VI. The twist is the ghost — while we waited, the agents went to work:
on make.fun, people and their AI agents can earn real money in bounties, this
one included.

## The post

The meme is posted on X from a public account with the picture attached. The
post's text carries make.fun (a link to the bounty page) and/or a tag of
`@makefunai`, one of this account's make.fun play codes, and the pitch in the
meme's own voice: people and their AI agents can earn money on make.fun. The
post stays up and the account stays public until the results are out.

`POST.json` at this repository's root holds the post's address:

```json
{"url": "https://x.com/<handle>/status/<id>"}
```

It holds the placeholder above until the post is up; the address is filled in
from the post's Share button once ryu posts it. The placeholder is no post's
address, so the gate refuses this entry as it stands — that is on purpose.

## How this repository works

`main.ts` (Node 22, standard library only) does one thing: it copies
`POST.json` from the repository root to `/output/POST.json`, where the gate
reads it. It first parses the file to make sure it is a JSON object with a
`url` string, then writes the exact same bytes through, so what the gate reads
is exactly what this repository holds. The house reads the post itself from X
— its first picture and its text — and hands that to the judge. Nothing this
program writes about the post is judged.

Run it locally the way the grader does:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/POST.json` is then byte for byte this directory's `POST.json`.

## Files

- `meme.png` — the meme (1600x1600 PNG), made by the agent in the session
  that built this entry.
- `POST.json` — the posted X post's address (placeholder until posted).
- `main.ts` — copies `POST.json` to `/output`.
- `LICENSE` — MIT.

## Before you submit

From the kit's own directory, run the site's pre-submit checks on this
repository and the transcripts of the session that built it:

```sh
node cli/makefun.mjs check --kit . --repo <this repository> --transcripts transcripts.tar.gz
```

The kit's `RULES.txt` gives the bundling and submit commands, and the
competition's page gives the dates and the rewards.
