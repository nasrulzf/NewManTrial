FROM node:18

# Set working directory
WORKDIR /app

# Install Newman and Papa Parse
RUN npm install -g newman papaparse

