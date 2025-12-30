# Web2APK Image Studio

A comprehensive image processing and conversion tool designed to facilitate the transformation of web-based content into APK applications with optimized media handling.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Deployment Instructions](#deployment-instructions)
- [Configuration](#configuration)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Overview

Web2APK Image Studio is a powerful tool that streamlines the process of converting web applications into Android APK files with integrated image optimization and processing capabilities. It provides automated workflows for handling various image formats and resolutions commonly needed in mobile applications.

## Features

- **Image Conversion**: Convert images between multiple formats (PNG, JPG, WebP, etc.)
- **Batch Processing**: Process multiple images simultaneously
- **Optimization**: Reduce file sizes while maintaining quality
- **Resizing & Scaling**: Automatically scale images for different device resolutions
- **Format Conversion**: Transform web-based media for APK compatibility
- **Quality Control**: Built-in validation and quality assurance tools

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v14.0.0 or higher
- **npm** or **yarn**: Latest version
- **Docker**: v20.0.0 or higher (for containerized deployment)
- **Git**: Latest version
- **Python**: v3.8+ (if using Python-based image processing tools)
- **ImageMagick** or **libvips**: For advanced image processing

### System Requirements

- **OS**: Linux, macOS, or Windows with WSL2
- **RAM**: Minimum 2GB, recommended 4GB+
- **Disk Space**: At least 500MB free space

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/freeamit/web2apk-image-studio.git
cd web2apk-image-studio
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Application Settings
NODE_ENV=development
PORT=3000
LOG_LEVEL=info

# Image Processing
MAX_IMAGE_SIZE=52428800
SUPPORTED_FORMATS=png,jpg,jpeg,webp,gif
OPTIMIZATION_QUALITY=85

# API Keys (if required)
API_KEY=your_api_key_here

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=web2apk
DB_USER=postgres
DB_PASSWORD=your_password

# Storage
STORAGE_PATH=./uploads
OUTPUT_PATH=./output
```

### 4. Install System Dependencies

**For Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install imagemagick libvips python3 python3-pip
```

**For macOS:**
```bash
brew install imagemagick libvips python3
```

**For Windows:**
Download and install from official sources:
- ImageMagick: https://imagemagick.org/script/download.php
- libvips: https://github.com/libvips/libvips

### 5. Initialize Database (if applicable)

```bash
npm run db:migrate
npm run db:seed
```

### 6. Verify Installation

```bash
npm run test
npm run health-check
```

## Deployment Instructions

### Option 1: Traditional Server Deployment

#### 1. Build the Application

```bash
npm run build
```

#### 2. Start the Application

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm run start
```

The application will be available at `http://localhost:3000`

#### 3. Process Management

Using PM2 for production:

```bash
# Install PM2 globally
npm install -g pm2

# Start application with PM2
pm2 start npm --name "web2apk-studio" -- start

# Monitor
pm2 monit

# Logs
pm2 logs web2apk-studio

# Restart
pm2 restart web2apk-studio

# Stop
pm2 stop web2apk-studio
```

### Option 2: Docker Deployment

#### 1. Build Docker Image

```bash
docker build -t web2apk-image-studio:latest .
```

#### 2. Run Docker Container

```bash
docker run -d \
  --name web2apk-studio \
  -p 3000:3000 \
  -v $(pwd)/uploads:/app/uploads \
  -v $(pwd)/output:/app/output \
  --env-file .env \
  web2apk-image-studio:latest
```

#### 3. Docker Compose (Recommended)

```bash
docker-compose up -d
```

View logs:
```bash
docker-compose logs -f web2apk-studio
```

#### 4. Manage Container

```bash
# Stop
docker-compose down

# Rebuild and restart
docker-compose up -d --build

# Execute commands
docker-compose exec web2apk-studio npm run db:migrate
```

### Option 3: Cloud Deployment

#### Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create web2apk-image-studio

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set API_KEY=your_api_key

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

#### AWS EC2

1. Launch an EC2 instance (Ubuntu 20.04 LTS recommended)
2. SSH into the instance
3. Follow the Traditional Server Deployment steps
4. Configure security groups to allow ports 80, 443, and 3000
5. Set up Nginx as a reverse proxy

#### Google Cloud Run

```bash
# Build and push image
gcloud builds submit --tag gcr.io/PROJECT_ID/web2apk-studio

# Deploy
gcloud run deploy web2apk-studio \
  --image gcr.io/PROJECT_ID/web2apk-studio \
  --platform managed \
  --region us-central1
```

## Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| NODE_ENV | development | Environment mode |
| PORT | 3000 | Application port |
| LOG_LEVEL | info | Logging level |
| MAX_IMAGE_SIZE | 52428800 | Max upload size (bytes) |
| OPTIMIZATION_QUALITY | 85 | Image quality (1-100) |
| STORAGE_PATH | ./uploads | Upload directory |
| OUTPUT_PATH | ./output | Output directory |

### API Configuration

If your application uses external APIs:

```env
API_ENDPOINT=https://api.example.com
API_VERSION=v1
API_TIMEOUT=30000
```

## Usage

### Command Line Interface

```bash
# Process a single image
npm run process --image=path/to/image.jpg --format=png

# Batch process
npm run process-batch --input=./images --output=./optimized

# Generate reports
npm run generate-report --date=2025-12-30

# List available formats
npm run list-formats
```

### API Endpoints

```bash
# Health check
curl http://localhost:3000/health

# Upload and convert image
curl -X POST \
  -F "image=@image.jpg" \
  -F "format=png" \
  http://localhost:3000/api/convert

# Get processing status
curl http://localhost:3000/api/status/:jobId
```

## Troubleshooting

### Common Issues

#### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>

# Or change port
PORT=3001 npm start
```

#### Image Processing Errors

```bash
# Verify ImageMagick installation
convert --version

# Check libvips installation
vips --version

# Reinstall dependencies
npm install --force
```

#### Docker Issues

```bash
# Check container logs
docker logs web2apk-studio

# Rebuild with no cache
docker-compose build --no-cache

# Clean up containers
docker-compose down -v
```

#### Database Connection

```bash
# Test database connection
npm run db:test

# Check connection string in .env
# Format: postgresql://user:password@host:port/database
```

### Debug Mode

```bash
# Run with debug logging
DEBUG=* npm start

# Run tests with coverage
npm run test:coverage

# Run linter
npm run lint
```

## Performance Optimization

### Caching

Enable caching for processed images:

```env
CACHE_ENABLED=true
CACHE_TTL=86400
CACHE_PROVIDER=redis
```

### Compression

Adjust compression settings:

```env
COMPRESSION_LEVEL=9
COMPRESSION_ENABLED=true
```

### Scaling

For production environments:

```bash
# Use clustering
NODE_CLUSTER=true
CLUSTER_WORKERS=4
```

## Security

- Always use HTTPS in production
- Validate and sanitize all user inputs
- Keep dependencies updated: `npm audit fix`
- Implement rate limiting
- Use strong environment variable secrets
- Regularly scan for vulnerabilities: `npm audit`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a pull request

## Support

For issues, questions, or suggestions:

- **Issues**: https://github.com/freeamit/web2apk-image-studio/issues
- **Discussions**: https://github.com/freeamit/web2apk-image-studio/discussions
- **Email**: support@example.com

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Last Updated**: December 30, 2025

**Maintained by**: freeamit
