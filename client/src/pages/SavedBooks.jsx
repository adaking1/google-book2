import { 
    Container,
    Card,
    Button,
    Row,
    Col
} from 'react-bootstrap';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';

const SavedBooks = () => {
    const { loading, data } = useQuery(GET_ME);
    const [deleteBook, { error }] = useMutation(REMOVE_BOOK);
    const userData = data?.me || {};
    if (userData.SavedBooks) {
        const bookIds = [];
        userData.SavedBooks.map((book) => bookIds.push(book.bookId));
        localStorage.setItem('saved_books', JSON.stringify(bookIds));
    }

    const handleDeleteBook = async (bookId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }
        try {
            const { data } = deleteBook({
                variables: { bookId }
            });
            removeBookId(bookId);
            localStorage.setItem('saved_books', bookId);
        }
        catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return <h2>LOADING...</h2>
    }

    return (
        <>
            <div fluid="true" className="text-light bg-dark p-5">
            <Container>
              <h1>Viewing saved books!</h1>
            </Container>
          </div>
          <Container>
            <h2 className='pt-5'>
              {userData.savedBooks.length
                ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
                : 'You have no saved books!'}
            </h2>
            <Row>
              {userData.savedBooks.map((book) => {
                return (
                  <Col key={book.bookId} md="4">
                    <Card  border='dark'>
                      {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                      <Card.Body>
                        <Card.Title>{book.title}</Card.Title>
                        <p className='small'>Authors: {book.authors}</p>
                        <Card.Text>{book.description}</Card.Text>
                        <a href={book.link} target="_blank" rel="noreferrer">Google-Books link</a>
                        <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                          Delete this Book!
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </>
    )
};

export default SavedBooks;