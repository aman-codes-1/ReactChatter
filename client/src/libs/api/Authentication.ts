import { apiRoutes, callApi } from '../../helpers';

type Auth = {
  code?: string;
};

class Authentication {
  public async googleLogin({ code }: Auth) {
    return new Promise((resolve, reject) => {
      callApi({
        method: 'POST',
        url: apiRoutes.AuthGoogleLogin,
        data: { code },
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public async googleVerifyToken() {
    return new Promise((resolve, reject) => {
      callApi({
        method: 'POST',
        url: apiRoutes.AuthGoogleVerifyToken,
        withCredentials: true,
      })
        .then((data) => {
          resolve(data);
        })
        .catch(async (err) => {
          await this.googleLogout();
          reject(err);
        });
    });
  }

  public async googleLogout() {
    return new Promise((resolve, reject) => {
      callApi({
        method: 'POST',
        url: apiRoutes.AuthGoogleLogout,
        withCredentials: true,
      })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default Authentication;
