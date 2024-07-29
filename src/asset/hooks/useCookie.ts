const Cookies = require("js-cookie");

Cookies.remove("name");

export const useCookie = () => {
  return {
    get: (name: string) => {
      const data = Cookies.get(name);
      return data ? JSON.parse(data) : null;
    },
    set: (name: string, value: any) => Cookies.set(name, JSON.stringify(value)),
    remove: (name: string) => Cookies.remove(name),
  };
};
