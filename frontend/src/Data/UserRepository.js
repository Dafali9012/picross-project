import CrudApi from "./CrudApi.js";

export default class UserRepository {
  // id and name are optional 
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.path = "http://localhost:8082/api/user";
    this.crudApi = new CrudApi(this.path);
    this.user = null;
    this.usersList = [];
  }

  setUser(user){
    this.user = user;
  }

  getUserById(id = this.id) {
     this.crudApi.getById(id).then((data) => {
      this.setUser(data);
    });
  }

  getUserByName(name = this.name){
    this.crudApi.getByName(name).then((data) =>{
      this.setUser(data);
    })
  }

  getUsersList(){
    this.crudApi.getAll().then((data)=> {
      data.forEach( e =>{
        this.usersList.push(e)
      })
    })
  }

  addNewUser(user){
    this.crudApi.addNew(user).then((response) => {
      this.setUser(response)
    })
  }
}
