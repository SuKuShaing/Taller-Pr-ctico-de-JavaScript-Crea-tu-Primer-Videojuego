/*
 * Reglas:
 * El final de cada nivel debe ser el inicio del siguiente
 */

const emojis = {
	"-": " ",
	O: "🚪",
	X: "💣",
	I: "🎁",
	PLAYER: "💀",
	BOMB_COLLISION: "🔥",
	GAME_OVER: "👎",
	WIN: "🏆",
    HEART: "❤️"
};

const maps = [];
maps.push(`
    IXXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    OXXXXXXXXX
`);
maps.push(`
    O--XXXXXXX
    X--XXXXXXX
    XX----XXXX
    X--XX-XXXX
    X-XXX--XXX
    X-XXXX-XXX
    XX--XX--XX
    XX--XXX-XX
    XXXX---IXX
    XXXXXXXXXX
    `);
maps.push(`
    I-----XXXX
    XXXXX-XXXX
    XX----XXXX
    XX-XXXXXXX
    XX-----XXX
    XXXXXX-XXX
    XX-----XXX
    XX-XXXXXXX
    XX-----OXX
    XXXXXXXXXX
`);
maps.push(`
    O--------X
    XXXXX-XX-X
    XX----XX--
    ---XXXXXX-
    -XX----XX-
    -XX-XX-XX-
    ----X--XX-
    XX--X--IX-
    XX-XXXXXX-
    ----------
`);
maps.push(`
    ----X----X
    -X-XX-XX-X
    -X----XX--
    -X-XXXXXX-
    -X--I--XX-
    -XXXXXXXX-
    -X--XX----
    -X--X--OX-
    -XXXXXXXX-
    ----------
`);
maps.push(`
    X-------IX
    --XXXXXXXX
    -X--------
    -X-XXXXXX-
    -X--O---X-
    -XXXXXXXX-
    -XXXXX----
    -XXXXX--XX
    -XXXXX--XX
    ----------
`);
maps.push(`
    XXXXXXX-OX
    -XXXXX--XX
    -X-----XXI
    -X-XX-XXX-
    ---X--XXX-
    -XX--XXXX-
    -X--XXX---
    X--XXX--XX
    --XXXX--XX
    ----------
`);
maps.push(`
    ----------
    -XXXXXXXX-
    -X------XO
    -X-------X
    -X-XXXXX-X
    -X-XI--X-X
    -X-XXX-X-X
    -X-----X-X
    -XXXXXXX-X
    ---------X
`);
maps.push(`
    ----------
    -X-XXXXXX-
    -X-XXXXXXX
    -X--------
    -XXXXXXXX-
    ---XO-----
    -XXXXX-XXX
    -X-----XXX
    -XXXXXXXXX
    ---------I
`);
maps.push(`
    ---X------
    XXXXXXXXX-
    -XI--XXXX-
    -X-----XX-
    -XXXXX-XX-
    ---XXX-XX-
    -X-XXX-XX-
    -X-----X--
    -XXXXXXX-X
    ---------O
`);
