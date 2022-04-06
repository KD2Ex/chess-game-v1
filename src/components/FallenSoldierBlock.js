import { calculateNewValue } from "@testing-library/user-event/dist/utils";
import React from "react";
import '../index.css';
import Square from "./Square.js";


export default class FallenSoldierBlock extends React.Component {

    renderSquare(square, i, squareShade) {
        return (
            <Square
                piece = {square}
                style = {square.style}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.props.whiteFallenSoliers.map((ws, index) => {
                        this.renderSquare(ws, index);
                    })}
                </div>
                <div className="board-row">
                    {this.props.blackFallenSoliers.map((bs, index) => {
                        this.renderSquare(bs, index);
                    })}
                </div>
            </div>
        );
    }
}