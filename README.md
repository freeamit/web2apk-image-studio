# Web2APK Image Studio

A comprehensive image studio application for converting web applications into Android APK packages. This tool streamlines the process of turning web-based projects into native Android applications with advanced image processing and packaging capabilities.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Web to APK Conversion**: Seamlessly convert web applications to Android APK files
- **Image Processing**: Advanced image manipulation and optimization tools
- **Project Management**: Organize and manage multiple projects
- **Packaging Tools**: Built-in APK packaging and signing utilities
- **Cross-platform Support**: Works on Windows, macOS, and Linux
- **Batch Processing**: Convert multiple applications simultaneously

## Prerequisites

Before setting up Web2APK Image Studio, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v6.0.0 or higher) - Included with Node.js
- **Git** - [Download](https://git-scm.com/)
- **Java Development Kit (JDK)** (v8 or higher) - Required for APK building
- **Android SDK** - For APK compilation and packaging
- **Gradle** (v6.0 or higher) - For build management

### Optional Requirements

- **Docker** - For containerized deployment
- **Python** (v3.7 or higher) - For helper scripts

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

### 3. Environment Configuration

Create a `.env` file in the project root directory:

```bash
cp .env.example .env
```

Edit `.env` and configure the following variables:

```env
# Application Settings
APP_NAME=Web2APK Image Studio
APP_VERSION=1.0.0
NODE_ENV=development
PORT=3000

# Paths
ANDROID_SDK_PATH=/path/to/android/sdk
JAVA_HOME=/path/to/java/home
GRADLE_HOME=/path/to/gradle

# Build Settings
APK_OUTPUT_DIR=./build/apk
TEMP_BUILD_DIR=./build/temp
LOG_LEVEL=info

# API Configuration
API_HOST=localhost
API_PORT=3000
API_TIMEOUT=30000
```

### 4. Verify Installation

```bash
npm run verify
```

This will check that all prerequisites are properly installed and configured.

## Configuration

### Android SDK Setup

1. **Download Android SDK**: Install via Android Studio or download command-line tools
2. **Set ANDROID_SDK_PATH**: Update your `.env` file with the SDK location
3. **Install Build Tools**: 
   ```bash
   $ANDROID_SDK_PATH/tools/bin/sdkmanager "build-tools;31.0.0"
   $ANDROID_SDK_PATH/tools/bin/sdkmanager "platforms;android-31"
   ```

### Java Configuration

Ensure JAVA_HOME points to your JDK installation:

```bash
# macOS/Linux
export JAVA_HOME=$(/usr/libexec/java_home)

# Windows
set JAVA_HOME=C:\Program Files\Java\jdk-11
```

### Gradle Configuration

Initialize Gradle wrapper:

```bash
gradle wrapper --gradle-version 6.9
```

## Deployment

### Development Deployment

1. **Start the development server**:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

2. **View logs**:
   ```bash
   npm run logs
   ```

### Production Deployment

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Start the production server**:
   ```bash
   npm start
   ```

3. **Setup reverse proxy** (recommended with Nginx):
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Docker Deployment

1. **Build Docker image**:
   ```bash
   docker build -t web2apk-image-studio:latest .
   ```

2. **Run container**:
   ```bash
   docker run -d \
     -p 3000:3000 \
     -v /path/to/android/sdk:/android/sdk \
     -e ANDROID_SDK_PATH=/android/sdk \
     --name web2apk \
     web2apk-image-studio:latest
   ```

3. **Docker Compose** (if available):
   ```bash
   docker-compose up -d
   ```

### Cloud Deployment (Heroku)

1. **Install Heroku CLI**:
   ```bash
   npm install -g heroku
   ```

2. **Login and create app**:
   ```bash
   heroku login
   heroku create your-app-name
   ```

3. **Configure buildpack**:
   ```bash
   heroku buildpacks:add heroku/jvm
   heroku buildpacks:add heroku/nodejs
   ```

4. **Set environment variables**:
   ```bash
   heroku config:set ANDROID_SDK_PATH=/app/.android-sdk
   ```

5. **Deploy**:
   ```bash
   git push heroku main
   ```

## Usage

### Basic Conversion

1. **Open the web interface**: Navigate to `http://localhost:3000`
2. **Select web application**: Choose the source web app or enter URL
3. **Configure settings**: Set APK name, version, permissions, etc.
4. **Process**: Click "Convert to APK" and wait for completion
5. **Download**: Save the generated APK file

### Command Line Interface

```bash
# Convert single application
npm run convert -- --input ./web-app --output ./output.apk

# Batch convert multiple apps
npm run batch-convert -- --config batch-config.json

# Process images
npm run process-images -- --input ./images --output ./optimized

# Sign APK
npm run sign-apk -- --apk ./app.apk --keystore ./key.jks --password yourpassword
```

### Configuration Files

Create `config.json` for project-specific settings:

```json
{
  "project": {
    "name": "MyApp",
    "version": "1.0.0",
    "packageName": "com.example.myapp"
  },
  "apk": {
    "minSdk": 21,
    "targetSdk": 31,
    "permissions": ["INTERNET", "ACCESS_NETWORK_STATE"],
    "features": ["android.hardware.screen.portrait"]
  },
  "images": {
    "optimize": true,
    "compression": "high"
  }
}
```

## Troubleshooting

### Common Issues

**Issue**: "ANDROID_SDK_PATH not found"
- **Solution**: Verify the Android SDK path in `.env` file and ensure it exists

**Issue**: "Java not found"
- **Solution**: Set JAVA_HOME environment variable and restart terminal

**Issue**: Build timeout
- **Solution**: Increase timeout in `.env`: `API_TIMEOUT=60000`

**Issue**: APK signing fails
- **Solution**: Verify keystore file exists and password is correct

**Issue**: Port 3000 already in use
- **Solution**: Change port in `.env` or kill existing process: `lsof -ti:3000 | xargs kill -9`

### Debugging

Enable debug mode for more detailed logging:

```bash
DEBUG=web2apk:* npm run dev
```

View logs in real-time:

```bash
tail -f logs/app.log
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

Please ensure:
- Code follows the existing style guide
- Tests pass: `npm test`
- Documentation is updated

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or suggestions:
- **GitHub Issues**: [Report a bug](https://github.com/freeamit/web2apk-image-studio/issues)
- **Email**: support@example.com
- **Documentation**: [Wiki](https://github.com/freeamit/web2apk-image-studio/wiki)

## Changelog

### Version 1.0.0 (2025-12-30)
- Initial release
- Web to APK conversion functionality
- Image processing capabilities
- Docker support
- Comprehensive documentation

---

**Last Updated**: 2025-12-30

Made with ❤️ by the Web2APK Team
