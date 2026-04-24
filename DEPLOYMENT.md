# GitHub Pages Deployment Guide

This guide will help you deploy your Research Dashboard to GitHub Pages.

## Setup Steps

### 1. Create a GitHub Repository

1. Create a new repository on GitHub
2. Initialize your local repository and push:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

### 2. Configure Base Path (Important!)

Open `vite.config.ts` and update the `base` setting:

**For Project Pages** (username.github.io/repo-name):
```typescript
base: '/YOUR-REPO-NAME/',
```

**For User/Organization Pages** (username.github.io):
```typescript
base: './',  // This is already set
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
4. The workflow file (`.github/workflows/deploy.yml`) will automatically deploy your site

### 4. Manual Deployment (Alternative)

If you prefer to deploy manually without GitHub Actions:

1. Build the project:
```bash
pnpm install
pnpm run build
```

2. The build output will be in the `dist` folder

3. Deploy the `dist` folder contents to GitHub Pages:
   - Option A: Use the `gh-pages` package
   - Option B: Push the `dist` folder to a `gh-pages` branch manually

## Troubleshooting

### 404 Errors for Assets

If you see 404 errors for CSS/JS files:
- Check that `base` in `vite.config.ts` matches your deployment URL
- For `username.github.io/repo-name`, use `base: '/repo-name/'`
- For `username.github.io`, use `base: './'`

### GitHub Actions Not Running

1. Ensure GitHub Actions is enabled in your repository settings
2. Check the Actions tab for error logs
3. Verify the workflow file is in `.github/workflows/deploy.yml`

### Build Failures

If the build fails locally:
```bash
# Clear cache and reinstall
rm -rf node_modules dist
pnpm install
pnpm run build
```

## Local Preview

To preview the production build locally:

```bash
pnpm run build
pnpm run preview
```

This will start a local server serving the production build.

## Additional Configuration

### Custom Domain

To use a custom domain:

1. Add a `CNAME` file to the `public` folder with your domain name
2. Configure DNS settings with your domain provider
3. Enable HTTPS in GitHub Pages settings

### Google Sheets Embeds

Make sure your Google Sheets are set to "Anyone with the link can view" for public access.

To get the embed URL:
1. Open your Google Sheet
2. Go to **File** → **Share** → **Publish to web**
3. Choose "Embed" and copy the URL
4. Use this URL in the `GoogleSheetEmbed` component

## Need Help?

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
