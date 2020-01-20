import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Quote from "../components/quote"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { scale, rhythm } from "../utils/typography"
import { useSpring, animated } from 'react-spring'


const Podcast = ({ podcastTitle, podcastContent, podcasts }) => {

  const animationProps = useSpring({ to: { opacity: 1, position: 'relative', top: '0px' }, from: { opacity: 0, top: '75px' }, config: { friction: 18, }, delay: 1000 })
  return (
    <div style={{
      position: 'relative',
      minHeight: `50vh`,
      backgroundColor: `rgba(0, 0, 0, 0.05)`,
      margin: 0,
      width: `calc(100% + 5rem)`,
      left: `-2rem`,
      padding: `2rem`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '10rem',
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
        {podcasts.slice(0, 1).map(item =>
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


const Blog = ({ posts }) => {

  const animationProps = useSpring({ to: { opacity: 1, position: 'relative', top: '0px' }, from: { opacity: 0, top: '75px' }, config: { friction: 18, }, delay: 1500 })
  return (

    <div style={{
      position: 'relative',
      minHeight: `50vh`,
      backgroundColor: `rgba(0, 0, 0, 0.10)`,
      margin: 0,
      width: `calc(100% + 5rem)`,
      left: `-2rem`,
      padding: `2rem`,
      display: 'flex',
      // justifyContent: 'center',
      alignItems: 'center',
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
            to={`/blog`}
          >
            Blog
          </Link>
        </h1>
        {
          posts.map(({ node }) => {
            const date_obj = new Date(node.frontmatter.date)
            const date = date_obj.toUTCString().split(':')[0].slice(0, -3)
            console.log(date)
            const title = node.frontmatter.title || node.fields.slug
            return (
              <article key={node.fields.slug}>
                <header>
                  <h3
                    style={{
                      marginBottom: rhythm(1 / 4),
                    }}
                  >
                    <Link style={{ boxShadow: `none`, color: `#555` }} to={node.fields.slug}>
                      {title}
                    </Link>
                  </h3>
                  <small>{date}</small>
                  <p>{node.frontmatter.description}</p>
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
          })
        }
      </animated.div>
    </div >
  )
}



class Index extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const podcasts = data.anchorPodcast.items
    const posts = data.allMarkdownRemark.edges
    console.log(posts)

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Quote />
        <Bio />
        <Podcast podcastTitle='One Breath At a Time' podcastContent='Listen Today' podcasts={podcasts} />
        <Blog posts={posts} />
      </Layout>
    )
  }
}

export default Index

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
    allMarkdownRemark {
      edges {
      node {
      frontmatter {
      title
            date
description
}
          fields {
      slug
    }
        }
    
  }
}
}
`         