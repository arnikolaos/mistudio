# MI Architects — site atmosphere checkpoint

Date: 2026-11-18

Before this update: commit `2dfa219`, preserved by annotated Git tag `checkpoint/pre-site-atmosphere-20261118` in the `mistudio` publishing repository.

This update adds shared static grain and desktop mouse light to the published MI Architects pages and generated Construction pages. Development and its existing origami canvas are unchanged. The Construction Explore link now enters from 12px above over 400ms after the letter reveal, and remains at full opacity.

The atmosphere is restricted to header/text surfaces, leaves project photographs and galleries clear, ignores pointer events, and does not alter page geometry. Mouse light is disabled on touch devices and under reduced motion. There is no continuous animation loop or new dependency.

Workflow: edit in `MI Architects New`, run static checks, copy only changed files to `/Volumes/PHILIPS/GitHub/GitHub/mistudio`, review, commit and push. Future generated project pages inherit the atmosphere through `scripts/build_construction.py`.

Recovery: inspect the named tag to retrieve the pre-change version. For a published rollback, revert the atmosphere update commit and push the revert; avoid resetting shared branch history. Keep the local editing folder synchronized with any rollback.

Verification: JavaScript/Python syntax, generated links/assets, module inclusion/exclusion, Development byte comparison, and Git whitespace checks. Visual browser testing remains with the owner.

Manual review: the Explore entrance should play once and stay visible; subtle grain and mouse light should appear on text/header regions; photographs, menus, links and forms should behave normally. Test phone, reduced motion, keyboard focus and a narrow desktop window. Development should look exactly as before.
