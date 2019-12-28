import React from "react"
import styled from "styled-components"
import { useSpring, animated } from 'react-spring'

const QuoteStyle = styled.div`
margin: 1rem auto;
text-align: center;
position: relative;
font-size: 1.5rem;
color: #333;

.quotes {
    font-size: 3rem;
    color: #888;
    line-height: 1rem;
    padding: 1rem;
}
p {
    margin: 0 0 4rem 3rem;
    padding: 0;
}
p:first-child {
    margin: 4rem 8rem 0 0;
}
em {
    color: rgba(200, 90, 130)
}
`

const Quote = () => {
    const animationLeft = useSpring({
        to:
        {
            opacity: 1,
            right: '0px'
        },
        from: {
            opacity: 0,
            right: '75px'
        },
        config: { friction: 18, }, delay: 800
    })
    const animationRight = useSpring({
        to:
        {
            opacity: 1,
            left: '0px'
        },
        from: {
            opacity: 0,
            left: '75px'
        },
        config: { friction: 18, }, delay: 1200
    })

    return (
        <QuoteStyle>
            <animated.p style={{ ...animationLeft, position: 'relative' }}>
                <span className="quotes">“</span>
                Live Each Day
            </animated.p >
            <animated.p style={{ ...animationRight, position: 'relative' }}>
                One <em>Breath</em> at a Time
        <span className="quotes">”</span>
            </animated.p >
        </QuoteStyle >

    )
}

export default Quote