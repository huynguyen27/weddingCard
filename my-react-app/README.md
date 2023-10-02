# Wedding Card App

This is a specialized web application designed to manage wedding invitations and guest information. It's built using React, React Router, and Firebase.

## Getting Started

1. **Clone the repository**
    ```bash
    git clone <repository-url>
    ```

2. **Install Dependencies**
    ```bash
    cd <project-folder>
    npm install
    ```

3. **Setup Environment Variables**
    Create a `.env` file in the project root and populate it with your Firebase credentials.
    ```
    REACT_APP_API_KEY=<your-api-key>
    REACT_APP_AUTH_DOMAIN=<your-auth-domain>
    ...
    ```

4. **Run the App**
    ```bash
    npm start
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Features

- Dynamic routing based on guest IDs.
- Firestore database integration for robust data management.
- Responsive and intuitive UI.

## Available Scripts

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`
Runs unit tests in interactive watch mode. Read more on [running tests](https://facebook.github.io/create-react-app/docs/running-tests).

### `npm run build`
Generates a production-ready build of the application. Your app will be optimized and ready for deployment.

## Environment Variables

- `REACT_APP_API_KEY`: Firebase API Key
- `REACT_APP_AUTH_DOMAIN`: Firebase Auth Domain
- ...

## Deployment

Deploying this project can be done in various ways like using Vercel, Netlify or custom servers. Make sure to set the environment variables properly for production.

## Troubleshooting

If you face any issues related to Firebase permissions, ensure your `.env` file is correctly set up and that your Firebase rules are configured to allow necessary read/write operations.

## Contributing

Please read our [Contributing Guide](CONTRIBUTING.md) for details on the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

