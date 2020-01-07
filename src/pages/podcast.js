
import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { scale, rhythm } from "../utils/typography"
import { useSpring, animated } from 'react-spring'


const Podcast = ({ podcastTitle, podcastContent, podcasts, limit }) => {

  const animationProps = useSpring({ to: { opacity: 1, position: 'absolute', top: '0px' }, from: { position: 'absolute', opacity: 0, top: '75px' }, config: { friction: 18, }, delay: 1000 })
  return (
    <div style={{
      position: 'relative',
    }}>
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
            to={`/podcast`}
          >
            {podcastTitle}
          </Link>
        </h1>
        {/* <p>{podcastContent}</p> */}
        {podcasts.slice(0, limit).map(item =>
          <div className="podcast" style={{ marginBottom: '3rem' }}>
            <iframe title={`${item.item.link.replace('episodes', 'embed/episodes')}/a-ah2h7l`} src={`${item.item.link.replace('episodes', 'embed/episodes')}/a-ah2h7l`} height="102px" width="400px" frameborder="0" scrolling="no" style={{ marginBottom: '.2rem', marginLeft: '-1rem' }} />
            <blockquote dangerouslySetInnerHTML={{ __html: item.item.content }} />
            {/* {item.item.content}</blockquote> */}
          </div>
        )}

        {/* <iframe src="https://anchor.fm/onebreathatatime/embed/episodes/Rollercoaster-Crashing-Down-e4tfrk/a-ah2h7l" height="102px" width="400px" frameborder="0" scrolling="no"></iframe> */}
      </animated.div>
    </div >
  )
}
class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const podcasts = data.anchorPodcast.items
    // const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Podcast podcastTitle='One Breath At a Time' podcastContent='Listen Today' podcasts={podcasts} limit={200} />
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    anchorPodcast {
      id
      items {
        item {
          link
          content
        }
      }
    }
  }
`
