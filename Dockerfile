# Use Node.js version 20.2.0 as the base image
FROM node:20.2.0

# Set the working directory in the container
WORKDIR /usr/src

# Copy package.json and package-lock.json to workdir
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on (if needed)
EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]
