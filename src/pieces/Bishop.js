import Piece from "../piece";


export default class Bishop extends Piece {
    constructor(player) {
        super(player, (player === 1? "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg"));
    }

    isMovePossible(src, dest) {
        return (Math.abs(src - dest) % 9 === 0 ||
                Math.abs(src - dest) % 7 === 0);
    }

    getSrcToDestPath(src, dest) {
        let path = [];
        let pathStart;
        let pathEnd;
        let increamentBy;

        
        if (src > dest) {
            pathStart = dest;
            pathEnd = src;
        } else {
            pathStart = src;
            pathEnd = dest;
        }

        if (Math.abs(src - dest) % 9 === 0) {
            increamentBy = 9;
            pathStart += 9;
        } else {
            increamentBy = 7;
            pathStart += 7;
        }

        for (let i = pathStart; i < pathEnd; i += increamentBy) {
            path.push(i);
        }

        return path;
    }
}