# SkinCraft API

An API for retrieving Minecraft player information, skins, and capes.

## Features

- Get player profiles including name history
- View player skins with tags and usage statistics
- Access player capes with detailed descriptions
- Browse a complete database of Minecraft capes

## API Endpoints

- `/api/user/:identifier/profile` - Get complete player profile
- `/api/user/:identifier/capes` - Get player's capes
- `/api/user/:identifier/skins` - Get player's skins
- `/api/capes` - List all known Minecraft capes

## Deployment on Vercel

### Prerequisites

- A [GitHub](https://github.com) account
- A [Vercel](https://vercel.com) account (can be created with GitHub)
- [Git](https://git-scm.com) installed locally

### Deployment Steps

1. Create a new repository on GitHub and push your code:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/skincraft-api.git
git push -u origin main
```

2. Go to [Vercel Dashboard](https://vercel.com/dashboard)

3. Click "Add New" > "Project"

4. Import your GitHub repository

5. Configure the project:

   - Framework Preset: Node.js
   - Root Directory: ./
   - Build Command: npm run vercel-build
   - Output Directory: public
   - Install Command: npm install

6. Click "Deploy"

## Development

### Local Setup

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run in production mode
npm start
```

### Environment Variables

No environment variables are required for basic operation.

## License

MIT
