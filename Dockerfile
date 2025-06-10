# Use a small Node.js base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy all necessary project files
COPY . .

# Expose your app port
EXPOSE 4000

# Start the server
CMD ["node", "server.js"]
