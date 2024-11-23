# Use the latest Node.js LTS image as the base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and lock files
COPY package.json bun.lockb ./

# Install Bun for faster dependency management
RUN npm install -g bun && bun install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application
CMD ["bun", "run", "start"]
