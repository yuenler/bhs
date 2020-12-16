let user = {};

export function set(newUser) {
  user = newUser;
}

export default new Proxy({}, {
  get(_target, property) {
    if (user !== null && user !== undefined && user.hasOwnProperty(property)) {
      return user[property];
    }
    return undefined;
  }
})