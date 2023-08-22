import { BookTypeId } from '../types/bookType';

const filterBooks = (books: BookTypeId[], searchTerm: string) => {
  let filteredBooks = [...books];

  if (searchTerm !== '') {
    filteredBooks = filteredBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }

  return filteredBooks;
};

export default filterBooks;
