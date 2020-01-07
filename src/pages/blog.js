
import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { scale, rhythm } from "../utils/typography"
import { useSpring, animated } from 'react-spring'


class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    console.log(posts)

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        {posts.map(({ node }) => {
          console.log('node', node)
          const title = node.frontmatter.title || node.frontmatter.slug
          return (
            <article key={node.frontmatter.slug}>
              <header>
                <h3
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <Link style={{ boxShadow: `none` }} to={node.frontmatter.slug}>
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
        })}
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
  allMarkdownRemark {
    edges {
      node {
        id
        frontmatter {
          title
          date
          description
          slug
        }
      }
    }
  }
}


`
