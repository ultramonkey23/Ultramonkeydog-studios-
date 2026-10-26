# Studio Canon Identities (cross-repository identity truth)

Creative identity prose on this site is a CLAIM about a canon owned by another
repository. Every identity-bearing project card must (a) match the current
canon markers below, (b) carry the canon pin in its evidence note, and (c) keep
superseded identity language out of the whole public surface. The gate is
`scripts/canon-identity-check.mjs`, wired into `npm run boundary:check`.

When a canon moves (a new spec version replaces the old identity), update THIS
contract (spec_version, spec_commit, markers) and the card copy in the same
change. A gate failure after a canon move is the gate doing its job.

```json
{
  "schema": "studio_canon_identity_v1",
  "canons": [
    {
      "id": "voidwalking",
      "source_repo": "ultramonkey23/voidwalking",
      "source_file": "voidwalking.json",
      "source_field": "identity",
      "spec_version": "v13",
      "spec_commit": "ce74ac0",
      "pin_text": "voidwalking.json v13",
      "required_markers": [
        "non-human",
        "singularity",
        "accretion disk",
        "porcelain death mask"
      ],
      "superseded_markers": [
        "masked courier",
        "live-wire palm",
        "star-machine",
        "cathedral mecha",
        "cathedral-mecha"
      ]
    }
  ]
}
```

Note: the sung lyric refrain "live-wire hymn" is artist canon (the master and
lyrics are unchanged by visual identity revisions) and is deliberately NOT a
superseded marker. The superseded claim was the CHARACTER identity: a masked
courier with a live-wire palm. Current canon (spec v13): a fundamentally
non-human dimensional singularity entity - an ancient cracked porcelain death
mask floating in a black gravitational accretion disk, zero human silhouette.
