class HistoryModel {
    id: number;
    userEmail: string;
    checkOutDate: string;
    returnDate: string;
    title: string;
    author: string;
    description: string;
    img: string;

    constructor(id: number, userEmail: string, checkOutDate: string, returnDate: string, title: string, author: string, description: string, img: string) {
        this.id = id;
        this.userEmail = userEmail;
        this.checkOutDate = checkOutDate;
        this.returnDate = returnDate;
        this.title = title;
        this.author = author;
        this.description = description;
        this.img = img;
    }
}
export default HistoryModel;