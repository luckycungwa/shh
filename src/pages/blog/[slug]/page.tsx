"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { ArrowLeft, Calendar, Clock, AlertTriangle, Share2 } from "lucide-react"

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
  author?: string
}

export default function BlogDetailPage() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch("https://api.jsonbin.io/v3/b/68acca6743b1c97be92a0196", {
          headers: {
            "X-Master-Key": "$2a$10$your-api-key-here", // You'll need to add your actual API key
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch blog post")
        }

        const data = await response.json()
        const posts = data.record.posts || []
        const foundPost = posts.find((p: BlogPost) => p.slug === params.slug)

        if (!foundPost) {
          setError("Blog post not found")
          return
        }

        setPost(foundPost)
      } catch (err) {
        setError("Failed to load blog post. Please try again later.")
        console.error("Error fetching post:", err)
      } finally {
        setIsLoading(false)
      }
    }

    if (params.slug) {
      fetchPost()
    }
  }, [params.slug])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Post Not Found</h1>
            <p className="text-gray-600 mb-6">{error || "The blog post you are looking for does not exist."}</p>
            <Link
              href="/blog"
              className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center text-yellow-500 hover:text-yellow-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Updates
          </Link>

          <div className="flex items-center space-x-4 mb-4">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                post.type === "alert"
                  ? "bg-red-100 text-red-800"
                  : post.type === "news"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
              }`}
            >
              {post.type === "alert" && <AlertTriangle className="w-4 h-4 mr-1" />}
              {post.type.toUpperCase()}
            </span>

            {post.urgent && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-500 text-black">
                URGENT
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

          <div className="flex items-center space-x-6 text-gray-600">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            {post.readTime && (
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>{post.readTime}</span>
              </div>
            )}

            {post.author && (
              <div>
                <span>By {post.author}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="aspect-video bg-gradient-to-br from-yellow-100 to-yellow-200 relative">
        {post.image ? (
          <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <Calendar className="w-24 h-24 mx-auto mb-4 text-yellow-400" />
              <p className="text-yellow-500 text-lg font-medium">SASSA Update</p>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            {/* Summary */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
              <p className="text-lg text-yellow-800 font-medium mb-0">{post.summary}</p>
            </div>

            {/* Content */}
            <div className="text-gray-700 leading-relaxed">
              {post.content.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Share this update</h3>
                <p className="text-gray-600">Help others stay informed about SASSA updates</p>
              </div>

              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: post.title,
                      text: post.summary,
                      url: window.location.href,
                    })
                  } else {
                    navigator.clipboard.writeText(window.location.href)
                    alert("Link copied to clipboard!")
                  }
                }}
                className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
