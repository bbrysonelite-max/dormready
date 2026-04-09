import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  turbopack: {
    // Allow imports from agent-1-data (sibling directory)
    root: path.join(__dirname, '..'),
  },
}

export default nextConfig
