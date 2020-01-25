# FROM node as builder
# # Create app directory
# RUN mkdir /app
# WORKDIR /app
# # Install app dependencies
# COPY ./package.json ./
# COPY ./yarn.lock ./

# # RUN npm install -g yarn
# COPY . .
# RUN yarn install --network-timeout 1000000 
# # Copy app source code
# ARG REACT_APP_API_HOST

# ENV REACT_APP_API_HOST $REACT_APP_API_HOST


# #Expose port and start applicationa
# RUN yarn run build

# FROM nginx 
# EXPOSE 3000
# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder /app/build /usr/share/nginx/html
# # CMD [ "nginx",'-g','daemon off;' ]
FROM node
# Create app directory
WORKDIR /app
# Install app dependencies
COPY /package.json ./
COPY /yarn.lock ./

# RUN npm install -g yarn
# RUN ["apt-get", "update"]
# RUN ["apt-get", "install", "-y", "vim"]
RUN yarn install --network-timeout 1000000 
# Copy app source code
COPY . .

#Expose port and start applicationa
CMD ["yarn", "start"]