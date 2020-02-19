import axios from 'axios';
import { stringify } from 'query-string';
import { COMMENTS } from './db/comments';
import { USERS } from './db/users';
import { User } from './models/user';

export const rootValue = {
  authenticate: async ({ code }: { code: string }) => {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: 'http://localhost:3000',
        scope: 'user-read-private user-read-email'
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic ' +
            Buffer.from(
              `bb091685278c48a6bd694ab6c0b51395:7ec553a28e464a2dbd42fecb9fd8be02`
            ).toString('base64')
        }
      }
    );
    return { access_token: 'Bearer ' + response.data.access_token };
  },
  getArtists: async ({ term }: any, req: any) => {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?type=artist&q=${term}`,
      {
        headers: {
          Authorization: req.headers.authorization
        }
      }
    );
    return {
      artists: response.data.artists.items.map((item: any) => item.name)
    };
  },
  getUsers: () => {
    return USERS.map(user => ({
      ...user,
      comments: COMMENTS.filter(comment => comment.userId === user.id)
    }));
  },
  getUser: ({ id }: { id: string }) => ({
    ...USERS.find(user => user.id === id),
    comments: COMMENTS.filter(comment => comment.userId === id)
  }),
  addUser: ({ user }: { user: User }) => {
    const id = (Math.max(...USERS.map(user => +user.id)) + 1).toString();
    USERS.push({ id, ...user });
  },
  deleteUser: ({ id }: { id: string }) => {
    const index = USERS.findIndex(user => user.id === id);
    USERS.splice(index, 1);
    return USERS;
  }
};
