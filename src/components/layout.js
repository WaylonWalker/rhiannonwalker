import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"

import { useSpring, animated } from 'react-spring'
import styled from "styled-components"

const LayoutStyle = styled.div`
@media (prefers-color-scheme: dark) {
// background: #555;
}
`

const Title = ({ title }) => {
  const animationProps = useSpring({ opacity: 1, position: 'relative', top: '0px', from: { opacity: 0, fontSize: 0, top: '-75px' }, config: { friction: 18 } })
  return (
    <animated.div style={animationProps}>
      <h1
        style={{
          ...scale(1),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    </animated.div>
  )
}
class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (<Title title={title} />
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <LayoutStyle>
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(24),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          <header>{header}</header>
          <main>{children}</main>
          {/* <footer>
          © {new Date().getFullYear()}
        </footer> */}
        </div>
      </LayoutStyle>
    )
  }
}

export default Layout
