import React from "react";
import initialiseChessBoard from "../helpers/InitiliserChessBoard";
import '../index.css';
import Board from "./Board.js";
import FallenSoldierBlock from "./FallenSoldierBlock";

export default class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            squares: initialiseChessBoard(),
            whiteFallenSoldiers: [],
            blackFallenSoldiers: [],
            player: 1,
            sourceSelection: -1,
            status: '',
            turn: 'white'
        }
    }

    handleClick(i) {
        const squares = [...this.state.squares];

        if (this.state.sourceSelection === -1) {
            if (!squares[i] || squares[i].player !== this.state.player) {
                this.setState({status: "Wrong selection. Choose player " + this.state.player + " pieces."});
                if (squares[i]) {
                    squares[i].style = {...squares[i].style, backgroundColor: ""};
                }
            }
            else {
                squares[i].style = {...squares[i].style, backgroundColor: "RGB(111,143,114)"}
                this.setState({
                    status: "Choose destination for the selected piece",
                    sourceSelection: i
                });
            }
            return;
        }
        squares[this.state.sourceSelection].style = { ...squares[this.state.sourceSelection].style, backgroundColor: "" };
        

        if (this.state.sourceSelection > -1) {
            delete squares[this.state.sourceSelection].style.backgroundColor;
            if (squares[i] && squares[i].player === this.state.player) {
                this.setState({
                    staus: "Wrong selection. Choose valid source and destionation again.",
                    sourceSelection: -1,
                });
            }
            else {
                
                const squares = this.state.squares.slice();
                const whiteFallenSoldiers = this.state.whiteFallenSoldiers.slice();
                const blackFallenSoldiers = this.state.blackFallenSoldiers.slice();
                const isDestEnemyOccupied = squares[i] ? true : false;
                const isMovePossible = squares[this.state.sourceSelection].isMovePossible(this.state.sourceSelection, i, isDestEnemyOccupied);
                const srcToDestPath = squares[this.state.sourceSelection].getSrcToDestPath(this.state.sourceSelection, i);
                const isMoveLegal = this.isMoveLegal(srcToDestPath);
                

                if (isMovePossible && isMoveLegal) {
                    if (squares[i] !== null) {
                        if (squares[i].player === 1) {
                            whiteFallenSoldiers.push(squares[i]);
                        }
                        else {
                            blackFallenSoldiers.push(squares[i]);
                        }
                    }
                    console.log("whiteFallenSoldiers", whiteFallenSoldiers);
                    console.log("blackFallenSoldiers", blackFallenSoldiers);
                    squares[i] = squares[this.state.sourceSelection];
                    squares[this.state.sourceSelection] = null;
                    let player = this.state.player === 1 ? 2 : 1;
                    let turn = this.state.turn === 'white' ? 'black' : 'white';
                    this.setState({ 
                        sourceSelection: -1,
                        squares: squares,
                        whiteFallenSoldiers: whiteFallenSoldiers,
                        blackFallenSoldiers: blackFallenSoldiers,
                        player: player,
                        status: '',
                        turn: turn
                    });
                }
                else {
                    this.setState({
                        status: "Wrong selection. Choose valid source and destionation again.",
                        sourceSelection: -1,
                    });
                }
            }
        }
    }

    ifMoveLegal(srcToDestPath) {
        let isLegal = true;
        for (let i = 0; i < srcToDestPath.length; i++) {
            if (this.state.squares[srcToDestPath[i]] !== null) {
                isLegal = false;
            }
        }
        return isLegal;
    }

    render() {

        return (
            <div>
                <div className="game">
                    <div className="game-board">
                        <Board
                            squares = {this.state.squares}
                            onClick = {(i) => this.handleClick(i)}
                        />
                    </div>
                    <div className="game-info">
                        <h3>Turn</h3>
                        <div 
                            id="player-turn-box" style={{backgroundColor: this.state.turn}}>

                        </div>
                        <div className="game-status">
                            {this.state.status}
                        </div>
                        <div className="fallen-soldier-block">
                            {
                                <FallenSoldierBlock
                                    whiteFallenSoldiers = {this.state.whiteFallenSoldiers}
                                    blackFallenSoldiers = {this.state.blackFallenSoldiers}
                                />
                            }   
                        </div>
                    </div>
                </div>

                <div className="icons-attribution">
                <div> <small> Chess Icons And Favicon (extracted) By en:User:Cburnett [<a href="http://www.gnu.org/copyleft/fdl.html">GFDL</a>, <a href="http://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA-3.0</a>, <a href="http://opensource.org/licenses/bsd-license.php">BSD</a> or <a href="http://www.gnu.org/licenses/gpl.html">GPL</a>], <a href="https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces">via Wikimedia Commons</a> </small></div>

                </div>
            </div>
        );
    }

}