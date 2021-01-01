import CrudApi from './CrudApi.js';

export default class PuzzleRepository{
    constructor(){
    this.path = "http://localhost:8082/api/puzzle";
    this.crudApi = new CrudApi(this.path);
    this.puzzle = null;
    }

    setPuzzle(puzzle){
        this.puzzle = puzzle;
    }

    getPuzzleById(id){
        this.crudApi.getById(id).then((puzzle) =>{
            this.setPuzzle(puzzle);
        });
    }

    getPuzzleByName(name){
        this.crudApi.getByName(name).then((puzzle) => {
          this.setPuzzle(puzzle);
        });
    }

    getPuzzleList(){
        let list = [];
         this.crudApi.getAll().then((puzzleList) => {
            puzzleList.forEach((puzzle) => {
                puzzle.data = JSON.parse(puzzle.data);
                list.push(puzzle);
            })
         });
         return list;
    }

    addNewPuzzle(puzzle){
        this.crudApi.addNew(puzzle).then((puzzle) => {
            return puzzle;
        });
    }
}
