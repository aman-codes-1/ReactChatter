# ReactChatter

## A full-stack real-time messaging chat application built using React.js, Typescript, Material UI, Nest.js, GraphQL Subscriptions, BullMQ, and Redis

Visit the website <https://reactchatter.in>

## Key Features

### Frontend

- **Real-time Messaging**: Instant, seamless communication with real-time updates.  
- **Friend Requests via Email**: Users can connect by sending and accepting friend requests through email invitations.  
- **Responsive UI with Material UI & Styled Components**: A visually appealing, adaptive interface built with industry-standard design libraries.  
- **Secure Google Authentication (Redirect UX Mode)**: Safe and seamless user authentication using Google's OAuth with a redirect-based user experience.  
- **Protected Routes for Enhanced Security**: Ensuring only authorized users can access sensitive areas of the application.  
- **State Management with Context API**: Efficient global state handling for streamlined data flow and improved performance.  
- **Reusable Custom Hooks**: Modular, reusable hooks for cleaner and more maintainable code.  
- **Optimized Conditional Rendering**: Efficient UI updates based on user interactions and application state.  
- **Generic, Reusable Components**: Scalable and maintainable UI elements designed for flexibility and reusability.

### Backend

- **Optimized Database Queries with MongoDB Aggregation**: Efficient data retrieval and processing using MongoDB’s powerful aggregation framework, allowing to group, filter, and manipulate data to find and address duplicates effectively.
- **Session-Based Authentication with Secure Cookies (HttpOnly, SameSite, Secure)**: Enhancing security by using encrypted, HttpOnly cookies to store JWT and session tokens, preventing XSS and CSRF attacks.
- **Real-time User Presence Tracking**: Display online/offline and last-seen status for improved user engagement.  
- **Message Scheduling & Processing with BullMQ and Redis**: Reliable message queuing and background job processing for seamless delivery.  
- **Guaranteed Message Delivery on User Reconnection**: Ensuring messages reach users as soon as they come online.  
- **Read/Unread Message Tracking**: Enhancing message reliability and user experience with proper delivery status indicators.  
- **Instant Notifications for Incoming Data**: Real-time alerts when new messages or updates are received.

### Deployment

- **Reverse Proxy with Nginx**: Streamlines traffic routing, secure connections with SSL termination, and load distribution optimization for enhanced security and performance.  
- **Cloudflare Tunnel for Secure Self-Hosting**: Establishing encrypted tunnels to expose services securely without port forwarding and for accessing services running locally.
- **Automatic SSL Management**: Seamless SSL certificate provisioning and renewal for secure HTTPS connections.  
- **Custom Domain & Subdomain Routing**: Flexible domain management for organizing and scaling application services.

## Feedback

If you have any feedback, please reach out to me at <aman.codes0@gmail.com>.
