"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, AlertTriangle, Calendar, Clock } from "lucide-react"

interface BlogPost {
  id: string
  slug: string
  title: string
  summary: string
  content: string
  date: string
  type: "alert" | "news" | "update"
  urgent?: boolean
  image?: string
  readTime?: string
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://api.jsonbin.io/v3/b/68acca6743b1c97be92a0196", {
          headers: {
            "X-Master-Key": "$2a$10$your-api-key-here", // You'll need to add your actual API key
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch blog posts")
        }

        const data = await response.json()
        setPosts(data.record.posts || [])
      } catch (err) {
        setError("Failed to load blog posts. Please try again later.")
        console.error("Error fetching posts:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">SASSA Updates & News</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed with the latest SASSA news, policy updates, and important announcements affecting social
            grants in South Africa.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
                {/* Post Image */}
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 relative overflow-hidden">
                  {post.image ? (
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-blue-400">
                        <Calendar className="w-12 h-12" />
                      </div>
                    </div>
                  )}

                  {/* Post Type Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        post.type === "alert"
                          ? "bg-red-100 text-red-800"
                          : post.type === "news"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {post.type === "alert" && <AlertTriangle className="w-3 h-3 mr-1" />}
                      {post.type.toUpperCase()}
                    </span>
                  </div>

                  {/* Urgent Badge */}
                  {post.urgent && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-500 text-black">
                        URGENT
                      </span>
                    </div>
                  )}
                </div>

                {/* Post Content */}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.summary}</p>

                  {/* Post Meta */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
                      </div>
                      {post.readTime && (
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{post.readTime}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts available</h3>
            <p className="text-gray-600">Check back later for the latest SASSA updates.</p>
          </div>
        )}
      </div>
    </div>
  )
}
