# Prelude

This is about how to run the mock API demo, with the mock API server and the app.



# Starting the Web App and Mock API Server

1. At the repo root, run `npm run packages:install`. This should run successfully. If not, the process fails.
2. Start the mock API server by `cd packages/middle-layer-api-mock-server` (from repo root), then run npm start. This should start it at `localhost:8081`.
3. Start the web server by `cd packages/app` (from repo root), then run npm start. This should start it at `localhost:3000`.
4. Open the web browser at `localhost:3000`.

To reset the data,

5. Restart the mock API server by stopping the process started in 3., then start it again by doing 3..



# Switching Ports

Change the port number in:

- `packages/middle-layer-api-mock-front-end-adapter`
- `packages/middle-layer-api-mock-server`

Then run "Starting the Web App and Mock API Server" again, starting from step 1. (an install/build is required for the change to take effect).



# ROADMAP

- Change mock-API-server port from 8081 to something less likely to collide with other apps
- Change web-API-server port from 3000 to something less likely to collide with other apps
