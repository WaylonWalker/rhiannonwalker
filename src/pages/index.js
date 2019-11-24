import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { scale, rhythm } from "../utils/typography"
import { useSpring, animated } from 'react-spring'


const Podcast = ({ podcastTitle, podcastContent, podcasts }) => {

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
        {podcasts.map(item =>
          <div className="podcast" style={{ marginBottom: '3rem' }}>
            <iframe src={`${item.item.link.replace('episodes', 'embed/episodes')}/a-ah2h7l`} height="102px" width="400px" frameborder="0" scrolling="no" style={{ marginBottom: '.2rem', marginLeft: '-1rem' }} />
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
    console.log('data: ', data)
    const podcasts = data.anchorPodcast.items
    console.log('podcasts: ', podcasts)
    // const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <Podcast podcastTitle='she runs a podcast' podcastContent='Listen Today' podcasts={podcasts} />
        {/* {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <article key={node.fields.slug}>
              <header>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small>{node.frontmatter.date}</small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </article>
          )
        })} */}
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

    // }
    // allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
    //   edges {
    //     node {
    //       excerpt
    //       fields {
    //         slug
    //       }
    //       frontmatter {
    //         date(formatString: "MMMM DD, YYYY")
    //         title
    //         description
    //       }
    //     }
    //   }
