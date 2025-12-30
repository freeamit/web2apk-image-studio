# Web2APK Image Studio

A comprehensive image processing and APK generation studio for converting web applications into Android APK files.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Deployment](#deployment)
- [Configuration](#configuration)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Features

- Web-to-APK conversion
- Image processing and optimization
- Android APK generation
- Cross-platform compatibility
- Automated build pipeline

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher)
- **Java Development Kit (JDK)** (v8 or higher)
- **Android SDK** (API level 21 or higher)
- **Git**
- **Docker** (optional, for containerized deployment)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/freeamit/web2apk-image-studio.git
cd web2apk-image-studio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
NODE_ENV=development
PORT=3000
LOG_LEVEL=info

# Android Configuration
ANDROID_SDK_PATH=/path/to/android-sdk
JAVA_HOME=/path/to/java

# Image Processing
MAX_IMAGE_SIZE=10485760
SUPPORTED_FORMATS=jpg,png,gif,webp

# API Configuration
API_TIMEOUT=30000
API_RATE_LIMIT=100
```

### 4. Initialize Database (if applicable)

```bash
npm run db:init
```

### 5. Run Development Server

```bash
npm run dev
```

The application should now be running at `http://localhost:3000`

## Deployment

### Local Deployment

#### Using npm

```bash
# Build the project
npm run build

# Start the production server
npm start
```

#### Using Docker

```bash
# Build the Docker image
docker build -t web2apk-image-studio:latest .

# Run the Docker container
docker run -d -p 3000:3000 --name web2apk-studio web2apk-image-studio:latest
```

### Cloud Deployment

#### Deploy to Heroku

```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create a new Heroku app
heroku create web2apk-image-studio

# Deploy the application
git push heroku main

# View logs
heroku logs --tail
```

#### Deploy to AWS

1. Create an EC2 instance or use Elastic Beanstalk
2. Install Node.js and required dependencies
3. Clone the repository
4. Configure environment variables
5. Run the application using a process manager (PM2 recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Start the application with PM2
pm2 start npm --name "web2apk-studio" -- start

# Enable startup on reboot
pm2 startup
pm2 save
```

#### Deploy to Docker/Kubernetes

```bash
# Build and tag the image
docker build -t web2apk-image-studio:latest .
docker tag web2apk-image-studio:latest your-registry/web2apk-image-studio:latest

# Push to registry
docker push your-registry/web2apk-image-studio:latest

# Deploy using kubectl
kubectl apply -f deployment.yaml
```

## Configuration

### Android SDK Configuration

Set up Android SDK paths:

```bash
export ANDROID_SDK_PATH="/path/to/android-sdk"
export PATH=$PATH:$ANDROID_SDK_PATH/tools:$ANDROID_SDK_PATH/platform-tools
```

### Image Processing Settings

Modify image processing parameters in `config/image-config.js`:

```javascript
module.exports = {
  maxWidth: 1920,
  maxHeight: 1080,
  quality: 85,
  format: 'webp',
  optimization: {
    enabled: true,
    level: 'high'
  }
};
```

## Usage

### Command Line Interface

```bash
# Convert web app to APK
npm run web2apk --url https://example.com --output ./build

# Process images
npm run process-images --input ./images --output ./processed

# Generate APK
npm run build-apk --manifest ./config/manifest.json
```

### API Endpoints

#### Convert Web to APK
```
POST /api/convert
Content-Type: application/json

{
  "url": "https://example.com",
  "appName": "My App",
  "packageName": "com.example.myapp",
  "versionCode": 1,
  "versionName": "1.0.0"
}
```

#### Process Images
```
POST /api/process-image
Content-Type: multipart/form-data

file: [image file]
width: 1920
height: 1080
quality: 85
```

## Troubleshooting

### Issue: "Android SDK not found"

**Solution:**
```bash
# Set the correct path to Android SDK
export ANDROID_SDK_PATH="/your/actual/path/to/android-sdk"

# Verify the installation
ls $ANDROID_SDK_PATH/platforms
```

### Issue: "Port 3000 already in use"

**Solution:**
```bash
# Use a different port
PORT=3001 npm run dev

# Or find and kill the process
lsof -i :3000
kill -9 <PID>
```

### Issue: "Out of memory" during build

**Solution:**
```bash
# Increase Node.js memory allocation
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

### Issue: Image processing fails

**Solution:**
- Check image format compatibility
- Verify image file size doesn't exceed `MAX_IMAGE_SIZE`
- Ensure all required image libraries are installed

```bash
npm install sharp imagemin imagemin-mozjpeg imagemin-pngquant
```

## Development

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Building for Production

```bash
# Create production build
npm run build

# Analyze bundle size
npm run build:analyze
```

## Project Structure

```
web2apk-image-studio/
├── src/
│   ├── api/
│   ├── core/
│   ├── utils/
│   └── index.js
├── config/
│   ├── image-config.js
│   └── app-config.js
├── tests/
├── public/
├── .env.example
├── package.json
├── Dockerfile
└── README.md
```

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For issues and questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Contact the development team

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Changelog

### Version 1.0.0 (Current)
- Initial release
- Web-to-APK conversion functionality
- Image processing capabilities
- API endpoints for conversion and processing

---

**Last Updated:** December 30, 2025

**Maintainer:** [freeamit](https://github.com/freeamit)
