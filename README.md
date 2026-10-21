# Web2APK Image Studio

An early-stage, MIT-licensed developer toolkit for **browser-based image editing** and preparing **Android packaging configuration**. Maintained by freeamit as part of PixelSynx Labs' open-source experiments.

> **Current status: v0.1 MVP.** The Android Starter exports a configuration JSON, **not a compiled APK**. The app does not yet provide a Web-to-APK build service, signing, image-processing API, or Docker deployment. Those are future possibilities, not completed features.

## Features

- Import PNG, JPEG, or WebP files (up to 15 MB)
- Preview images locally, resize to specified dimensions, optionally preserve aspect ratio
- Export PNG, JPEG, or WebP with configurable lossy quality
- Validate HTTPS website origins and Android package names
- Download a JSON configuration for a future Android Trusted Web Activity build
- Mobile-responsive UI; image processing happens in the browser

## Development

Requirements: Node.js 18 or newer and npm.

```bash
git clone https://github.com/freeamit/web2apk-image-studio.git
cd web2apk-image-studio
npm install
npm run dev
```

Open the local URL printed by Vite.

## Tests and production build

```bash
npm test
npm run build
npm run preview
```

Five unit tests cover dimension validation, package name validation, HTTPS requirements, and configuration generation. Browser UI integration and an actual Android build must still be independently verified.

## Security and limitations

- Image conversion runs in your browser; do not confuse this with a hosted file-processing service.
- Use only images you have rights to process.
- Android Trusted Web Activities additionally require Android project generation, a secure build/signing workflow, and verified Digital Asset Links (`assetlinks.json`).
- Never commit private API keys, credentials, or proprietary content.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) and open an issue before major feature changes.

## License

MIT – see [LICENSE](LICENSE).
