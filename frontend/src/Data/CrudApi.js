export default class CrudApi {
  constructor(path) {
    this.path = path;
    this.data = {};
  }

  getById(id) {
    return this.httpFetch(`${this.path}/${id}`);
  }

  getByName(name) {
    return this.httpFetch(`${this.path}/name=${name}`);
  }

  getAll() {
    return this.httpFetch(`${this.path}/all`);
  }

  async addNew(dataObject) {
    try {
      const response = await fetch(`${this.path}`, {
        method: "POST",
        body: JSON.stringify(dataObject),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      const data = await response.json();
      return data;
    } catch (err) {
      return console.log(err);
    }
  }

  async httpFetch(path) {
    try {
      const response = await fetch(path);
      const json = await response.json();
      return json;
    } catch (err) {
      console.log("Fetch Error: " + err.message);
    }
  }
}
