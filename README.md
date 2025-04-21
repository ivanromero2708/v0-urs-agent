# URS Multi-Agent Frontend

A Next.js frontend for a multi-agent URS (User Requirements Specification) system. This application allows users to interact with AI agents to generate, edit, and export URS documents.

## Features

- **Chat Interface with File Upload**: Communicate with AI agents and upload files for analysis
- **Agent Workflow Dashboard**: Navigate through different sections of the URS
- **Section Cards Grid**: View and manage URS sections
- **Section Editor**: Edit and refine agent-generated content
- **Export & Preview**: Export the URS document in different formats

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **State Management**: Zustand
- **File Uploads**: react-dropzone
- **Icons**: lucide-react

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/urs-multi-agent.git
   cd urs-multi-agent
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Backend Integration

This frontend is designed to work with a FastAPI backend that implements a LangGraph Python state-graph. The backend should provide the following endpoints:

- **Upload endpoint**: `POST /api/upload` - Saves files and returns URL+metadata
- **Chat endpoint**: `POST /api/chat` - Forwards messages to LangGraph agent graph
- **Section runner**: `POST /api/section/:name/run` - Triggers specific graph node
- **Export endpoint**: `GET /api/export` - Returns full URS as JSON or PDF

### Environment Configuration

Create a `.env.local` file in the root directory with the following variables:

\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:8000
\`\`\`

Replace the URL with your FastAPI backend URL.

## Deployment

### Build for Production

\`\`\`bash
npm run build
# or
yarn build
\`\`\`

### Start Production Server

\`\`\`bash
npm run start
# or
yarn start
\`\`\`

### Deploy to Vercel

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com).

1. Push your code to a Git repository (GitHub, GitLab, BitBucket)
2. Import the project in Vercel
3. Add environment variables
4. Deploy

## Project Structure

\`\`\`
urs-multi-agent/
├── app/                  # Next.js App Router
│   ├── chat/             # Chat page
│   ├── export/           # Export page
│   ├── overview/         # Overview page
│   ├── sections/         # Section pages
│   ├── globals.css       # Global styles
│   └── layout.tsx        # Root layout
├── components/           # React components
│   ├── chat/             # Chat components
│   ├── export/           # Export components
│   ├── sections/         # Section components
│   ├── ui/               # UI components (shadcn/ui)
│   ├── breadcrumb.tsx    # Breadcrumb component
│   ├── header.tsx        # Header component
│   └── sidebar.tsx       # Sidebar component
├── lib/                  # Utility functions and types
│   ├── stores/           # Zustand stores
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Utility functions
├── public/               # Static assets
├── .env.local            # Environment variables
├── next.config.js        # Next.js configuration
├── package.json          # Dependencies
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
\`\`\`

## License

This project is licensed under the MIT License - see the LICENSE file for details.
