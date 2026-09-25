// Public builds have no private token lists, but the offline server still
// checks these arrays when every player connects.
window.atlas = window.atlas || {};
if (!Array.isArray(window.atlas.a)) window.atlas.a = [];
if (!Array.isArray(window.atlas.c)) window.atlas.c = [];
