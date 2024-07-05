class ReviewRequestModel {
    rating: number;
    bookId: number;
    reviewDescription?:string;

    constructor(reviewDescription:string, rating:number, bookId:number) {
        this.rating = rating;
        this.bookId = bookId;
        this.reviewDescription = reviewDescription;
    }
}

export default ReviewRequestModel;