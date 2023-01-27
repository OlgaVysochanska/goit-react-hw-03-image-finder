import { Component } from 'react';
import axios from 'axios';
import { Audio } from 'react-loader-spinner';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';

export class App extends Component {
  state = {
    keyWord: '',
    images: [],
    page: 1,
    error: null,
    loading: false,
    showModal: false,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { keyWord, page } = this.state;
    if (prevState.keyWord !== keyWord || prevState.page !== page) {
      const API_KEY = '31910898-50bf1f8c70306f6b7b25ce5eb';
      this.setState({ loading: true });

      axios
        .get(
          `https://pixabay.com/api/?q=${keyWord}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(({ data }) => {
          this.setState(({ images }) => ({
            images: [...images, ...data.hits],
          }));
        })
        .catch(error => {
          this.setState({ error: error.message });
        })
        .finally(this.setState({ loading: false }));
    }
  }

  onSubmitForm = data => {
    this.setState({ keyWord: data, images: [], page: 1 });
  };

  onImageClick = data => {
    this.setState({
      largeImageURL: data,
      showModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      largeImageURL: '',
    });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { loading, images, largeImageURL, showModal } = this.state;
    const { onSubmitForm, onImageClick, closeModal, loadMore } = this;
    return (
      <>
        <Searchbar onSubmit={onSubmitForm} />

        {loading && (
          <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="loading"
          />
        )}

        {images.length > 0 && (
          <>
            <ImageGallery images={images} onImageClick={onImageClick} />
            <Button loadMore={loadMore} />
          </>
        )}

        {showModal && (
          <Modal close={closeModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
      </>
    );
  }
}
