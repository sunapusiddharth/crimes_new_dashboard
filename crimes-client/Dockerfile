FROM node as builder
# Create app directory
WORKDIR /app
# Install app dependencies
COPY ./package.json ./
COPY ./yarn.lock ./

# RUN npm install -g yarn

RUN yarn install --network-timeout 1000000 
# Copy app source code
COPY . .

#Expose port and start applicationa
CMD ["yarn","run", "build"]

FROM nginx 
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html