import React from "react";
import One from "../assets/One.svg";
import Two from "../assets/Two.svg";
import Three from "../assets/Three.svg";
import Four from "../assets/Four.svg";
import Five from "../assets/Five.svg";
import Six from "../assets/Six.svg";

export default function Die(props) {

    let backgroundImage
    
    if (props.value === 1) {
        backgroundImage = `url("${One}")`
    } else if (props.value === 2) {
        backgroundImage = `url("${Two}")`
    } else if (props.value === 3) {
        backgroundImage = `url("${Three}")`
    } else if (props.value === 4) {
        backgroundImage = `url("${Four}")`
    } else if (props.value === 5) {
        backgroundImage = `url("${Five}")`
    } else if (props.value === 6) {
        backgroundImage = `url("${Six}")`
    }
    

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white",

        //styling button to look like dice from here on
        backgroundImage,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '2.5rem',
        height: '2.5rem'
    }

    return (
        <button
            className={props.shake && !props.isHeld ? "shake" : null} 
            style={styles} 
            onClick={() => props.hold(props.id)}
            aria-pressed={props.isHeld}    // Is the button pressed or not, passed booleon value of isHeld
            aria-label={`Die with the value of ${props.value}, ${props.isHeld ? "held" : "not held"}`}  // Reads out for assistive tech "Die with the value of *, held or not held"
        ></button>
    )
}