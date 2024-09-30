# horizon-frontend

# Next.js Project Setup

## Prerequisites

- Node.js
- npm or yarn

## Setup Instructions

1. **Clone the repository:**

   ```sh
   git clone https://github.com/pillows/horizon-frontend
   cd horizon-frontend
   ```

2. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   ```

3. **Add environment variables:**

   - Ensure the `.env.local` file in the root directory of the project contains the following line:
     ```properties
     NEXT_PUBLIC_BACKEND_URL=http://ec2-54-242-134-147.compute-1.amazonaws.com:4000
     ```

4. **Run the development server:**

   ```sh
   npm run dev
   # or
   yarn dev
   ```

5. **Open the application:**
   - Open your browser and navigate to `http://localhost:3000`.

## Additional Commands

- **Build the application:**

  ```sh
  npm run build
  # or
  yarn build
  ```

- **Start the application:**

  ```sh
  npm start
  # or
  yarn start
  ```

- **Run tests:**
  ```sh
  npm test
  # or
  yarn test
  ```

## Troubleshooting

- Ensure Node.js and npm/yarn are installed and up to date.
- Verify that the `.env.local` file contains the correct environment variables.
- Check the terminal output for any errors during installation or running the server.
