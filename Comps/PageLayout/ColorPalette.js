import React, { useState } from "react";

const ColorPalette = ({ setTheme }) => {

    const [color1, setColor1] = useState(true);
    const [color2, setColor2] = useState(false);
    const [color3, setColor3] = useState(false);
    const [color4, setColor4] = useState(false);
    const [color5, setColor5] = useState(false);
    const [color6, setColor6] = useState(false);

    const toggleColor1 = (e) => {
        e.preventDefault()

        if (!color1) {
            setColor1(true)
        }

        if (color2) {
            setColor2(false)
        }

        if (color3) {
            setColor3(false)
        }

        if (color4) {
            setColor4(false)
        }

        if (color5) {
            setColor5(false)
        }

        if (color6) {
            setColor6(false)
        }

    }

    const toggleColor2 = (e) => {
        e.preventDefault()

        if (!color2) {
            setColor2(true)
        }

        if (color1) {
            setColor1(false)
        }

        if (color3) {
            setColor3(false)
        }

        if (color4) {
            setColor4(false)
        }

        if (color5) {
            setColor5(false)
        }

        if (color6) {
            setColor6(false)
        }

    }

    const toggleColor3 = (e) => {
        e.preventDefault()

        if (!color3) {
            setColor3(true)
        }

        if (color1) {
            setColor1(false)
        }

        if (color2) {
            setColor2(false)
        }

        if (color4) {
            setColor4(false)
        }

        if (color5) {
            setColor5(false)
        }

        if (color6) {
            setColor6(false)
        }

    }

    const toggleColor4 = (e) => {
        e.preventDefault()

        if (!color4) {
            setColor4(true)
        }

        if (color1) {
            setColor1(false)
        }

        if (color2) {
            setColor2(false)
        }

        if (color3) {
            setColor3(false)
        }

        if (color5) {
            setColor5(false)
        }

        if (color6) {
            setColor6(false)
        }

    }

    const toggleColor5 = (e) => {
        e.preventDefault()

        if (!color5) {
            setColor5(true)
        }

        if (color1) {
            setColor1(false)
        }

        if (color2) {
            setColor2(false)
        }

        if (color3) {
            setColor3(false)
        }

        if (color4) {
            setColor4(false)
        }

        if (color6) {
            setColor6(false)
        }

    }

    const toggleColor6 = (e) => {
        e.preventDefault()

        if (!color6) {
            setColor6(true)
        }

        if (color1) {
            setColor1(false)
        }

        if (color2) {
            setColor2(false)
        }

        if (color3) {
            setColor3(false)
        }

        if (color4) {
            setColor4(false)
        }

        if (color5) {
            setColor5(false)
        }

    }

    return (
        <div className="color-palette">

            <button
                onClick={(e) => {
                    setTheme("blue")
                    toggleColor1(e)
                }}
                aria-label='color1'
                className="color-palette-button color-palette-button__1">

                <span className={`color-palette-button__inner ${color1 ? "is-active" : ""}`}>
                    color1
                </span>

            </button>

            <button
                onClick={(e) => {
                    setTheme("orange")
                    toggleColor2(e)
                }}
                aria-label='color2'
                className="color-palette-button color-palette-button__2">

                <span className={`color-palette-button__inner ${color2 ? "is-active" : ""}`}>
                    color2
                </span>

            </button>

            <button
                onClick={(e) => {
                    setTheme("green")
                    toggleColor3(e)
                }}
                aria-label='color3'
                className="color-palette-button color-palette-button__3">

                <span className={`color-palette-button__inner ${color3 ? "is-active" : ""}`}>
                    color3
                </span>

            </button>

            <button
                onClick={(e) => {
                    setTheme("light-green")
                    toggleColor4(e)
                }}
                aria-label='color4'
                className="color-palette-button color-palette-button__4">

                <span className={`color-palette-button__inner ${color4 ? "is-active" : ""}`}>
                    color4
                </span>

            </button>

            <button
                onClick={(e) => {
                    setTheme("grey")
                    toggleColor5(e)
                }}
                aria-label='color5'
                className="color-palette-button color-palette-button__5">

                <span className={`color-palette-button__inner ${color5 ? "is-active" : ""}`}>
                    color5
                </span>

            </button>

            <button
                onClick={(e) => {
                    setTheme("black")
                    toggleColor6(e)
                }}
                aria-label='color6'
                className="color-palette-button color-palette-button__6">

                <span className={`color-palette-button__inner ${color6 ? "is-active" : ""}`}>
                    color6
                </span>

            </button>

        </div>
    );
}

export default ColorPalette;