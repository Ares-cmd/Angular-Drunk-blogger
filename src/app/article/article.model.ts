import{post} from './posts.model';
export class article{
    public id:number;
    public title:string;
    public posts?:post[];
    constructor(id:number,title:string,posts:post[]){
        this.id=id;
        this.title=title;
        this.posts=posts;
    }
}
