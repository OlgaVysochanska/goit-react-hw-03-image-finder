import { Component } from 'react';

import { Searchbar } from 'components/Searchbar/Searchbar';

export class App extends Component {

  onSubmitForm = () => {
  
  }

  render () {
    <>
      <Searchbar onSubmit={onSubmitForm} />
    </>
  }
}

// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

// key 31910898-50bf1f8c70306f6b7b25ce5eb