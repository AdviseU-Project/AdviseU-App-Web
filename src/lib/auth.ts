import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import client from './mongodb';
import authConfig from './auth.config';
import { defaultExtension, ProfileExtension } from './types';
import { ObjectId } from 'mongodb';

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: MongoDBAdapter(client),
    session: { strategy: 'jwt' },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // Just store the extension ID reference
                token.extension_id = user.extension_id || null;
            } else if (!token.extension_id && token.sub) {
                // Fetch from DB if missing
                const db = (await client).db();
                const dbUser = await db.collection('users').findOne({ _id: new ObjectId(token.sub) });
                token.extension_id = dbUser?.extension_id || null;
            }

            return token;
        },
        async session({ session, token }) {
            if (token.extension_id) {
                const db = (await client).db();
                // Fetch the extension data from the extensions collection
                const extension = await db.collection('extensions').findOne({
                    _id: new ObjectId(token.extension_id),
                });
                session.user.extension = extension as ProfileExtension | null;
            }
            if (token.sub) {
                session.user.id = token.sub;
            }
            return session;
        },
    },
    ...authConfig,
    events: {
        async createUser({ user }) {
            const db = (await client).db();
            const userId = new ObjectId(user.id);

            // Create the extension document
            const extensionResult = await db.collection('extensions').insertOne({
                ...defaultExtension,
                user_id: userId, // Reference back to the user
            });

            // Update the user with just the extension ID reference
            await db
                .collection('users')
                .updateOne({ _id: userId }, { $set: { extension_id: extensionResult.insertedId } });
        },
    },
});
