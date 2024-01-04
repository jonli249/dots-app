import NextAuth from './next-auth';
import Providers from 'next-auth/providers';
import app from './realm'; // Import your Realm app instance

export default NextAuth({
  providers: [
    Providers.Credentials({
      // The name to display on the sign-in form (you can customize this)
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          const { username, password } = credentials;
          const realmCredentials = Realm.Credentials.emailPassword(username, password);
          const user = await app.logIn(realmCredentials);

          if (user) {
            // Map Realm user data to the structure expected by next-auth
            const mappedUser = {
              id: user.id,
              name: user.profile.name, // Adjust based on your Realm user profile structure
              email: user.profile.email, // Adjust based on your Realm user profile structure
            };

            return Promise.resolve(mappedUser);
          } else {
            return Promise.resolve(null);
          }
        } catch (error) {
          console.error('Authentication error:', error);
          return Promise.resolve(null);
        }
      },
    }),
  ],
  callbacks: {
    async session(session, user) {
      session.user.id = user.id;
      return Promise.resolve(session);
    },
  },
  session: {
    jwt: true, // Enable JSON Web Token (JWT) support for sessions
    maxAge: 30 * 24 * 60 * 60, // Session max age in seconds (e.g., 30 days)
  },
  pages: {
    signIn: '/auth/signin', // Custom sign-in page
    signOut: '/auth/signout', // Custom sign-out page
    error: '/auth/error', // Custom error page
    verifyRequest: '/auth/verify-request', // Custom verification request page
  },
  callbacks: {
    async redirect(url, baseUrl) {
      // Customize the redirection behavior
      return baseUrl;
    },
  },
  // Customize other configuration options as needed
});

