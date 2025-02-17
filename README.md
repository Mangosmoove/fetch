# Fetch Front End Takehome

## Local testing
1. after cloning this project, add an .env file to both ./server and ./client in the root directory
2. for the client env, add this line: VITE_API_BASE_URL: http://localhost8000
3. for the server env, add these envs: DEV_LINK=http://localhost:5173 & NODE_ENV=dev
4. in the client directory, run `npm run dev` to run the client code
5. in the server directory, run `npm start` to run the server code