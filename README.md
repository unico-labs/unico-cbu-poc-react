<div align="center">
  <img src="./src/assets/logo-home.svg" alt="Unico Logo" width="200"/>
  <h1>Unico SDK By Unico - React</h1>
  <p><em>Proof of Concept for testing Unico SDK integration in different display modes</em></p>
</div>

---

## 📋 Overview

This React application serves as a **Proof of Concept (PoC)** for client testing of the **Unico SDK** integration. It demonstrates three different ways to implement and display the SDK flow:

- **🪟 Modal Test** - SDK displayed in overlay modal on page
- **📺 Fullscreen Test** - SDK taking up the entire browser screen
- **🖼️ Iframe Box Test** - SDK embedded in a box on the page

## ✨ Features

### 🏠 **Home Screen**
- Clean and modern interface with Unico branding
- Three mode selection buttons with intuitive icons
- Direct link to official documentation
- Responsive design for all devices

### 🪟 **Modal Mode**
- SDK opens in a translucent overlay modal
- Modal can be closed manually or automatically upon completion
- Proper state management and cleanup

### 📺 **Fullscreen Mode**  
- SDK expands to occupy the entire browser window
- Controls are hidden during fullscreen operation
- Automatic return to normal view upon completion

### 🖼️ **Iframe Box Mode**
- SDK embedded within a container on the page
- Traditional integration approach
- Manual control with Init/Open/Close buttons

## 🚀 Getting Started

### Prerequisites
- **Node.js** (version 16 or higher)
- **npm** or **yarn**
- **Unico Service Account** with test environment access
- **Valid Token and Transaction ID** from Unico API

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd unico-cbu-poc-react
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:4200` (or the port shown in terminal)

### Usage

1. **Select a Test Mode:** Choose from Modal, Fullscreen, or Iframe Box
2. **Enter Credentials:** Input your Token and Transaction ID
3. **Initialize SDK:** Click "Initialize SDK" (if available)
4. **Start Flow:** Click the respective "Open" button to begin the Unico flow
5. **Complete Process:** Follow the Unico SDK flow to completion

### Project Structure
```
src/
├── components/
│   ├── HomeScreen.jsx      # Main selection screen
│   ├── ModalTest.jsx       # Modal implementation
│   ├── FullscreenTest.jsx  # Fullscreen implementation
│   └── IframeTest.jsx      # Iframe implementation
├── assets/
│   └── logo-home.svg       # Unico logo
├── App.jsx                 # Main app component with routing
├── index.css               # Global styles
└── main.jsx                # App entry point
```

### SDK Integration
The application uses the official Unico SDK (`idpay-b2b-sdk`) with proper initialization:

```javascript
import { ByUnicoSDK } from "idpay-b2b-sdk";

// Initialize SDK
ByUnicoSDK.init({
  env: "uat",        // Test environment
  token: yourToken,  // Your API token
});

// Open flow
ByUnicoSDK.open({
  transactionId: yourTransactionId,
  token: yourToken,
  onFinish: (result) => {
    console.log('Flow completed:', result);
  }
});
```

## 📚 Documentation

For detailed implementation guidelines and API reference, visit the official Unico documentation:

**📖 [Official Documentation](https://devcenter.unico.io/idcloud/integracao/integracao-by-unico/controlando-a-experiencia/sdk#como-comecar)**

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Compatibility

### Minimum Versions
- **React:** 16+
- **Node.js:** 16+

### Supported Devices
Check the [official device compatibility list](https://devcenter.unico.io/idcloud/integracao/integracao-by-unico/visao-geral#dispositivos-compativeis) for tested devices.


## 📞 Support

For technical support and project integration assistance:
- Contact your Unico project manager
- Reach out to Unico support team
- Consult the [Developer Center](https://devcenter.unico.io/)

---

<div align="center">
  <p>Built with ❤️ for Unico clients</p>
  <p><em>© 2024 Unico. All rights reserved.</em></p>
</div>
