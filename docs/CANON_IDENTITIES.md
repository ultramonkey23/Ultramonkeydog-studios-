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
      "spec_version": "v14",
      "spec_commit": "a941f189ddfbb4817d5e0fe49a07aca9e5d327dd",
      "pin_text": "voidwalking.json v14",
      "required_markers": [
        "non-human",
        "singularity",
        "stellar nucleus",
        "obsidian crescents"
      ],
      "superseded_markers": [
        "masked courier",
        "live-wire palm",
        "porcelain death mask",
        "accretion disk",
        "star-machine",
        "cathedral mecha",
        "cathedral-mecha"
      ]
    }
  ]
}
```

Note: the song and its lyrics have not been rewritten. The obsolete v13 porcelain-mask description applied to the *character design*, not to the music. In v14 the Voidwalker is a non-human stellar singularity with a white nucleus, detached obsidian crescents, and torn violet spacetime ribbons. The film is finished; the official public video link is a separate release step.
