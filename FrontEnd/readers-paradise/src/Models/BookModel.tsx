class BookModel {
    id: number;
    title: string;
    author?: string;
    description?: string;
    img?: string;
    copies?: number;
    copiesAvailable?:number;
    category?: string;

    constructor(id: number, title: string, author: string, description: string, img: string, copies: number, copiesAvailable:number, category: string) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.img = img;
        this.copies = copies;
        this.copiesAvailable = copies;
        this.category = category;
    }
}
export default BookModel;