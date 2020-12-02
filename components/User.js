let user = {};

export function set(newUser) {
  user = newUser;
}

export default new Proxy(user, {
  get(_target, property) {
    return user[property];
  }
})