# 🎨 Gemini Image Editor

A powerful and intuitive web application that allows users to upload their images and edit them using natural language text prompts. Powered by Google's Gemini 2.5 Flash Image model, this tool makes sophisticated image manipulation accessible to everyone.

## 📸 Screenshot

<img src="https://storage.googleapis.com/aidevs/prompt-eng/gemini-image-editor-screenshot.png" alt="Gemini Image Editor Screenshot" width="700">

## ✨ Features

- **Multi-Image Upload**: Upload multiple images (PNG, JPG, WEBP) at once.
- **Image Gallery**: View all your uploaded images in a clean gallery and easily switch between them.
- **AI-Powered Editing**: Simply describe the changes you want, from applying filters and changing styles to removing backgrounds.
- **Quick Prompts**: Get started quickly with a list of suggested editing ideas.
- **Side-by-Side View**: Instantly compare your original image with the AI-generated result.
- **Responsive Design**: A sleek, modern, and fully responsive interface built with Tailwind CSS.
- **Clear Feedback**: See loading states during image generation and receive clear error messages if something goes wrong.

## 🚀 How to Use

1.  **Upload Images**: Click the upload area to select one or more images from your device.
2.  **Select an Image**: Your uploaded images will appear in the "Your Gallery" section. Click on an image to select it for editing.
3.  **Describe Your Edit**:
    -   Type a detailed prompt into the text area (e.g., "Make the sky a vibrant sunset orange," "Add a cat wearing sunglasses," or "Change the style to a watercolor painting").
    -   Alternatively, click one of the "Quick Ideas" buttons to use a pre-made prompt.
4.  **Generate**: Click the **✨ Generate Image** button and wait for the AI to work its magic.
5.  **View the Result**: Your edited image will appear in the "Edited" panel.

## 🛠️ Tech Stack

-   **Frontend**: React, TypeScript
-   **AI Model**: Google Gemini 2.5 Flash Image (`gemini-2.5-flash-image`) via the `@google/genai` SDK
-   **Styling**: Tailwind CSS
-   **Bundler/Dev Environment**: The application is set up to run in an environment with esbuild or a similar modern bundler.

## ⚙️ Setup and Configuration

This application requires a Google Gemini API key to function.

### Environment Variables

The application expects the API key to be available as an environment variable named `API_KEY`.

```
API_KEY="YOUR_GOOGLE_GEMINI_API_KEY"
```

When running in a compatible development environment, this variable will be automatically sourced, and you can start using the application immediately. Ensure your API key has the necessary permissions to use the Gemini API.
