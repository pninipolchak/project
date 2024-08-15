FROM node:14
# --- NETFREE CERT INTSALL ---
ADD https://netfree.link/dl/unix-ca.sh /home/netfree-unix-ca.sh 
RUN cat  /home/netfree-unix-ca.sh | sh
ENV NODE_EXTRA_CA_CERTS=/etc/ca-bundle.crt
ENV REQUESTS_CA_BUNDLE=/etc/ca-bundle.crt
ENV SSL_CERT_FILE=/etc/ca-bundle.crt
# --- END NETFREE CERT INTSALL ---
WORKDIR /app

COPY package*.json ./

RUN npm fund 

# RUN npm list 

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

# docker run -p 3000:3000 my-react-app


# # Use an official Node.js image as the base image for the build stage
# FROM node:14 as builder

# # Set the working directory in the container
# WORKDIR /app

# # Run the create-react-app command
# RUN npx create-react-app my-app

# # Set the working directory to the newly created app
# WORKDIR /app/my-app

# # Build the React app
# RUN npm run build

# # Use a smaller nginx image as the base image for the final stage
# FROM nginx:alpine

# # Copy the build output from the previous stage to the nginx server
# COPY --from=builder /app/my-app/build /usr/share/nginx/html

# # Expose port 3000
# EXPOSE 3000

# # Update the default nginx configuration to listen on port 3000
# RUN sed -i -e 's/80/3000/g' /etc/nginx/conf.d/default.conf

# # Start nginx on port 3000
# CMD ["nginx", "-g", "daemon off;"]

