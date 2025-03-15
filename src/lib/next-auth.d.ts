// src/types/next-auth.d.ts
import { ProfileExtension } from './types';
import { User, Session } from 'next-auth';
import AdapterUser from '@auth/core/adapters';
import { JWT } from 'next-auth/jwt';
import { ObjectId } from 'mongodb';

declare module 'next-auth' {
    interface User extends DefaultUser {
        extension_id: ObjectId;
    }

    interface Session {
        user: User & {
            extension?: ProfileExtension | null;
        };
    }
}

declare module '@auth/core/adapters' {
    interface AdapterUser {
        extension_id: ObjectId;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        extension_id: ObjectId;
    }
}
