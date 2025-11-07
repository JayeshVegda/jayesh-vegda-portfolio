# Publishing Guide

This guide will help you publish your portfolio to GitHub.

## Pre-Publishing Checklist

✅ **Completed:**
- Removed console.log statements
- Updated README.md with your information
- Created .env.example file
- Enhanced .gitignore
- Updated package.json metadata
- Fixed icon import issues

## Steps to Publish

### 1. Initialize Git Repository (if not already done)

```bash
git init
```

### 2. Add All Files

```bash
git add .
```

### 3. Create Initial Commit

```bash
git commit -m "Initial commit: Portfolio website with glassmorphism design"
```

### 4. Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `minimal-next-portfolio` (or your preferred name)
3. Description: "Modern portfolio website built with Next.js 14, TypeScript, and Tailwind CSS"
4. Choose Public or Private
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### 5. Connect and Push to GitHub

```bash
git remote add origin https://github.com/jayeshvegda/minimal-next-portfolio.git
git branch -M main
git push -u origin main
```

### 6. Verify Upload

Visit your repository on GitHub to verify all files are uploaded correctly.

## Important Notes

- ✅ `.env` file is already in `.gitignore` - your secrets are safe
- ✅ `.env.example` is included - others can see what variables are needed
- ✅ Build artifacts are excluded
- ✅ Node modules are excluded

## After Publishing

1. Update the repository URL in `package.json` if needed
2. Update the repository URL in `README.md` if needed
3. Add repository topics/tags on GitHub for better discoverability
4. Consider adding a LICENSE file if you want to make it open source

## Deployment

After pushing to GitHub, you can deploy to:
- **Vercel** (Recommended): Connect your GitHub repo for automatic deployments
- **Netlify**: Similar to Vercel
- **Other platforms**: Follow Next.js deployment guides

## Environment Variables

Remember to set environment variables in your hosting platform:
- `GOOGLE_FORM_LINK`
- `GOOGLE_FORM_FIELD_ID_*`
- `NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID`
- `NEXT_PUBLIC_RESUME_LINK`

