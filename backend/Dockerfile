FROM node
# Create app directory
WORKDIR /app
# Install app dependencies
COPY /package.json ./

# RUN npm install -g yarn
# RUN ["apt-get", "update"]
# RUN ["apt-get", "install", "-y", "vim"]
RUN npm install 
# Copy app source code
COPY . .

#Expose port and start applicationa
CMD ["npm","run", "dev"]